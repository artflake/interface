import { splitSignature } from '@ethersproject/bytes';
import { Trade as V2Trade } from '@uniswap/v2-sdk';
import { Trade as V3Trade } from '@uniswap/v3-sdk';
import JSBI from 'jsbi';
import { useMemo, useState } from 'react';
import { SWAP_ROUTER_ADDRESSES } from '../constants/addresses';
import { DAI, UNI, USDC } from '../constants/tokens';
import { useSingleCallResult } from '../state/multicall/hooks';
import { useEIP2612Contract } from './useContract';
import useIsArgentWallet from './useIsArgentWallet';
import useTransactionDeadline from './useTransactionDeadline';
import { useActiveWeb3React } from './web3';
var PermitType; // 20 minutes to submit after signing

(function (PermitType) {
  PermitType[PermitType["AMOUNT"] = 1] = "AMOUNT";
  PermitType[PermitType["ALLOWED"] = 2] = "ALLOWED";
})(PermitType || (PermitType = {}));

const PERMIT_VALIDITY_BUFFER = 20 * 60;
// todo: read this information from extensions on token lists or elsewhere (permit registry?)
const PERMITTABLE_TOKENS = {
  1: {
    [USDC.address]: {
      type: PermitType.AMOUNT,
      name: 'USD Coin',
      version: '2'
    },
    [DAI.address]: {
      type: PermitType.ALLOWED,
      name: 'Dai Stablecoin',
      version: '1'
    },
    [UNI[1].address]: {
      type: PermitType.AMOUNT,
      name: 'Uniswap'
    }
  },
  4: {
    '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735': {
      type: PermitType.ALLOWED,
      name: 'Dai Stablecoin',
      version: '1'
    },
    [UNI[4].address]: {
      type: PermitType.AMOUNT,
      name: 'Uniswap'
    }
  },
  3: {
    [UNI[3].address]: {
      type: PermitType.AMOUNT,
      name: 'Uniswap'
    },
    '0x07865c6E87B9F70255377e024ace6630C1Eaa37F': {
      type: PermitType.AMOUNT,
      name: 'USD Coin',
      version: '2'
    }
  },
  5: {
    [UNI[5].address]: {
      type: PermitType.AMOUNT,
      name: 'Uniswap'
    }
  },
  42: {
    [UNI[42].address]: {
      type: PermitType.AMOUNT,
      name: 'Uniswap'
    }
  }
};
export let UseERC20PermitState;

(function (UseERC20PermitState) {
  UseERC20PermitState[UseERC20PermitState["NOT_APPLICABLE"] = 0] = "NOT_APPLICABLE";
  UseERC20PermitState[UseERC20PermitState["LOADING"] = 1] = "LOADING";
  UseERC20PermitState[UseERC20PermitState["NOT_SIGNED"] = 2] = "NOT_SIGNED";
  UseERC20PermitState[UseERC20PermitState["SIGNED"] = 3] = "SIGNED";
})(UseERC20PermitState || (UseERC20PermitState = {}));

const EIP712_DOMAIN_TYPE = [{
  name: 'name',
  type: 'string'
}, {
  name: 'version',
  type: 'string'
}, {
  name: 'chainId',
  type: 'uint256'
}, {
  name: 'verifyingContract',
  type: 'address'
}];
const EIP712_DOMAIN_TYPE_NO_VERSION = [{
  name: 'name',
  type: 'string'
}, {
  name: 'chainId',
  type: 'uint256'
}, {
  name: 'verifyingContract',
  type: 'address'
}];
const EIP2612_TYPE = [{
  name: 'owner',
  type: 'address'
}, {
  name: 'spender',
  type: 'address'
}, {
  name: 'value',
  type: 'uint256'
}, {
  name: 'nonce',
  type: 'uint256'
}, {
  name: 'deadline',
  type: 'uint256'
}];
const PERMIT_ALLOWED_TYPE = [{
  name: 'holder',
  type: 'address'
}, {
  name: 'spender',
  type: 'address'
}, {
  name: 'nonce',
  type: 'uint256'
}, {
  name: 'expiry',
  type: 'uint256'
}, {
  name: 'allowed',
  type: 'bool'
}];

function useERC20Permit(currencyAmount, spender, overridePermitInfo) {
  var _currencyAmount$curre, _PERMITTABLE_TOKENS$c;

  const {
    account,
    chainId,
    library
  } = useActiveWeb3React();
  const transactionDeadline = useTransactionDeadline();
  const tokenAddress = currencyAmount !== null && currencyAmount !== void 0 && (_currencyAmount$curre = currencyAmount.currency) !== null && _currencyAmount$curre !== void 0 && _currencyAmount$curre.isToken ? currencyAmount.currency.address : undefined;
  const eip2612Contract = useEIP2612Contract(tokenAddress);
  const isArgentWallet = useIsArgentWallet();
  const nonceInputs = useMemo(() => [account !== null && account !== void 0 ? account : undefined], [account]);
  const tokenNonceState = useSingleCallResult(eip2612Contract, 'nonces', nonceInputs);
  const permitInfo = overridePermitInfo !== null && overridePermitInfo !== void 0 ? overridePermitInfo : chainId && tokenAddress ? (_PERMITTABLE_TOKENS$c = PERMITTABLE_TOKENS[chainId]) === null || _PERMITTABLE_TOKENS$c === void 0 ? void 0 : _PERMITTABLE_TOKENS$c[tokenAddress] : undefined;
  const [signatureData, setSignatureData] = useState(null);
  return useMemo(() => {
    var _tokenNonceState$resu, _tokenNonceState$resu2;

    if (isArgentWallet || !currencyAmount || !eip2612Contract || !account || !chainId || !transactionDeadline || !library || !tokenNonceState.valid || !tokenAddress || !spender || !permitInfo) {
      return {
        state: UseERC20PermitState.NOT_APPLICABLE,
        signatureData: null,
        gatherPermitSignature: null
      };
    }

    const nonceNumber = (_tokenNonceState$resu = tokenNonceState.result) === null || _tokenNonceState$resu === void 0 ? void 0 : (_tokenNonceState$resu2 = _tokenNonceState$resu[0]) === null || _tokenNonceState$resu2 === void 0 ? void 0 : _tokenNonceState$resu2.toNumber();

    if (tokenNonceState.loading || typeof nonceNumber !== 'number') {
      return {
        state: UseERC20PermitState.LOADING,
        signatureData: null,
        gatherPermitSignature: null
      };
    }

    const isSignatureDataValid = signatureData && signatureData.owner === account && signatureData.deadline >= transactionDeadline.toNumber() && signatureData.tokenAddress === tokenAddress && signatureData.nonce === nonceNumber && signatureData.spender === spender && ('allowed' in signatureData || JSBI.equal(JSBI.BigInt(signatureData.amount), currencyAmount.quotient));
    return {
      state: isSignatureDataValid ? UseERC20PermitState.SIGNED : UseERC20PermitState.NOT_SIGNED,
      signatureData: isSignatureDataValid ? signatureData : null,
      gatherPermitSignature: async function gatherPermitSignature() {
        const allowed = permitInfo.type === PermitType.ALLOWED;
        const signatureDeadline = transactionDeadline.toNumber() + PERMIT_VALIDITY_BUFFER;
        const value = currencyAmount.quotient.toString();
        const message = allowed ? {
          holder: account,
          spender,
          allowed,
          nonce: nonceNumber,
          expiry: signatureDeadline
        } : {
          owner: account,
          spender,
          value,
          nonce: nonceNumber,
          deadline: signatureDeadline
        };
        const domain = permitInfo.version ? {
          name: permitInfo.name,
          version: permitInfo.version,
          verifyingContract: tokenAddress,
          chainId
        } : {
          name: permitInfo.name,
          verifyingContract: tokenAddress,
          chainId
        };
        const data = JSON.stringify({
          types: {
            EIP712Domain: permitInfo.version ? EIP712_DOMAIN_TYPE : EIP712_DOMAIN_TYPE_NO_VERSION,
            Permit: allowed ? PERMIT_ALLOWED_TYPE : EIP2612_TYPE
          },
          domain,
          primaryType: 'Permit',
          message
        });
        return library.send('eth_signTypedData_v4', [account, data]).then(splitSignature).then(signature => {
          setSignatureData({
            v: signature.v,
            r: signature.r,
            s: signature.s,
            deadline: signatureDeadline,
            ...(allowed ? {
              allowed
            } : {
              amount: value
            }),
            nonce: nonceNumber,
            chainId,
            owner: account,
            spender,
            tokenAddress,
            permitType: permitInfo.type
          });
        });
      }
    };
  }, [currencyAmount, eip2612Contract, account, chainId, isArgentWallet, transactionDeadline, library, tokenNonceState.loading, tokenNonceState.valid, tokenNonceState.result, tokenAddress, spender, permitInfo, signatureData]);
}

const REMOVE_V2_LIQUIDITY_PERMIT_INFO = {
  version: '1',
  name: 'Uniswap V2',
  type: PermitType.AMOUNT
};
export function useV2LiquidityTokenPermit(liquidityAmount, spender) {
  return useERC20Permit(liquidityAmount, spender, REMOVE_V2_LIQUIDITY_PERMIT_INFO);
}
export function useERC20PermitFromTrade(trade, allowedSlippage) {
  const {
    chainId
  } = useActiveWeb3React();
  const swapRouterAddress = chainId ? SWAP_ROUTER_ADDRESSES[chainId] : undefined;
  const amountToApprove = useMemo(() => trade ? trade.maximumAmountIn(allowedSlippage) : undefined, [trade, allowedSlippage]);
  return useERC20Permit(amountToApprove, // v2 router does not support
  trade instanceof V2Trade ? undefined : trade instanceof V3Trade ? swapRouterAddress : undefined, null);
}