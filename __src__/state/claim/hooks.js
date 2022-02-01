import { CurrencyAmount } from '@uniswap/sdk-core';
import JSBI from 'jsbi';
import { useEffect, useState } from 'react';
import { UNI } from '../../constants/tokens';
import { useMerkleDistributorContract } from '../../hooks/useContract';
import { useActiveWeb3React } from '../../hooks/web3';
import { isAddress } from '../../utils';
import { calculateGasMargin } from '../../utils/calculateGasMargin';
import { useSingleCallResult } from '../multicall/hooks';
import { TransactionType } from '../transactions/actions';
import { useTransactionAdder } from '../transactions/hooks';
let FETCH_CLAIM_MAPPING_PROMISE = null;

function fetchClaimMapping() {
  var _FETCH_CLAIM_MAPPING_;

  return (_FETCH_CLAIM_MAPPING_ = FETCH_CLAIM_MAPPING_PROMISE) !== null && _FETCH_CLAIM_MAPPING_ !== void 0 ? _FETCH_CLAIM_MAPPING_ : FETCH_CLAIM_MAPPING_PROMISE = fetch(`https://raw.githubusercontent.com/Uniswap/mrkl-drop-data-chunks/final/chunks/mapping.json`).then(res => res.json()).catch(error => {
    console.error('Failed to get claims mapping', error);
    FETCH_CLAIM_MAPPING_PROMISE = null;
  });
}

const FETCH_CLAIM_FILE_PROMISES = {};

function fetchClaimFile(key) {
  var _FETCH_CLAIM_FILE_PRO;

  return (_FETCH_CLAIM_FILE_PRO = FETCH_CLAIM_FILE_PROMISES[key]) !== null && _FETCH_CLAIM_FILE_PRO !== void 0 ? _FETCH_CLAIM_FILE_PRO : FETCH_CLAIM_FILE_PROMISES[key] = fetch(`https://raw.githubusercontent.com/Uniswap/mrkl-drop-data-chunks/final/chunks/${key}.json`).then(res => res.json()).catch(error => {
    console.error(`Failed to get claim file mapping for starting address ${key}`, error);
    delete FETCH_CLAIM_FILE_PROMISES[key];
  });
}

const FETCH_CLAIM_PROMISES = {}; // returns the claim for the given address, or null if not valid

function fetchClaim(account) {
  var _FETCH_CLAIM_PROMISES;

  const formatted = isAddress(account);
  if (!formatted) return Promise.reject(new Error('Invalid address'));
  return (_FETCH_CLAIM_PROMISES = FETCH_CLAIM_PROMISES[account]) !== null && _FETCH_CLAIM_PROMISES !== void 0 ? _FETCH_CLAIM_PROMISES : FETCH_CLAIM_PROMISES[account] = fetchClaimMapping().then(mapping => {
    const sorted = Object.keys(mapping).sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1);

    for (const startingAddress of sorted) {
      const lastAddress = mapping[startingAddress];

      if (startingAddress.toLowerCase() <= formatted.toLowerCase()) {
        if (formatted.toLowerCase() <= lastAddress.toLowerCase()) {
          return startingAddress;
        }
      } else {
        throw new Error(`Claim for ${formatted} was not found in partial search`);
      }
    }

    throw new Error(`Claim for ${formatted} was not found after searching all mappings`);
  }).then(fetchClaimFile).then(result => {
    if (result[formatted]) return result[formatted];
    throw new Error(`Claim for ${formatted} was not found in claim file!`);
  }).catch(error => {
    console.debug('Claim fetch failed', error);
    throw error;
  });
} // parse distributorContract blob and detect if user has claim data
// null means we know it does not


export function useUserClaimData(account) {
  const {
    chainId
  } = useActiveWeb3React();
  const [claimInfo, setClaimInfo] = useState({});
  useEffect(() => {
    if (!account || chainId !== 1) return;
    fetchClaim(account).then(accountClaimInfo => setClaimInfo(claimInfo => {
      return { ...claimInfo,
        [account]: accountClaimInfo
      };
    })).catch(() => {
      setClaimInfo(claimInfo => {
        return { ...claimInfo,
          [account]: null
        };
      });
    });
  }, [account, chainId]);
  return account && chainId === 1 ? claimInfo[account] : null;
} // check if user is in blob and has not yet claimed UNI

export function useUserHasAvailableClaim(account) {
  var _isClaimedResult$resu;

  const userClaimData = useUserClaimData(account);
  const distributorContract = useMerkleDistributorContract();
  const isClaimedResult = useSingleCallResult(distributorContract, 'isClaimed', [userClaimData === null || userClaimData === void 0 ? void 0 : userClaimData.index]); // user is in blob and contract marks as unclaimed

  return Boolean(userClaimData && !isClaimedResult.loading && ((_isClaimedResult$resu = isClaimedResult.result) === null || _isClaimedResult$resu === void 0 ? void 0 : _isClaimedResult$resu[0]) === false);
}
export function useUserUnclaimedAmount(account) {
  const {
    chainId
  } = useActiveWeb3React();
  const userClaimData = useUserClaimData(account);
  const canClaim = useUserHasAvailableClaim(account);
  const uni = chainId ? UNI[chainId] : undefined;
  if (!uni) return undefined;

  if (!canClaim || !userClaimData) {
    return CurrencyAmount.fromRawAmount(uni, JSBI.BigInt(0));
  }

  return CurrencyAmount.fromRawAmount(uni, JSBI.BigInt(userClaimData.amount));
}
export function useClaimCallback(account) {
  // get claim data for this account
  const {
    library,
    chainId
  } = useActiveWeb3React();
  const claimData = useUserClaimData(account); // used for popup summary

  const unclaimedAmount = useUserUnclaimedAmount(account);
  const addTransaction = useTransactionAdder();
  const distributorContract = useMerkleDistributorContract();

  const claimCallback = async function () {
    if (!claimData || !account || !library || !chainId || !distributorContract) return;
    const args = [claimData.index, account, claimData.amount, claimData.proof];
    return distributorContract.estimateGas['claim'](...args, {}).then(estimatedGasLimit => {
      return distributorContract.claim(...args, {
        value: null,
        gasLimit: calculateGasMargin(estimatedGasLimit)
      }).then(response => {
        addTransaction(response, {
          type: TransactionType.CLAIM,
          recipient: account,
          uniAmountRaw: unclaimedAmount === null || unclaimedAmount === void 0 ? void 0 : unclaimedAmount.quotient.toString()
        });
        return response.hash;
      });
    });
  };

  return {
    claimCallback
  };
}