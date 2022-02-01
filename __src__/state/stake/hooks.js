import { Trans } from "@lingui/react";
import { Interface } from '@ethersproject/abi';
import { abi as STAKING_REWARDS_ABI } from '@uniswap/liquidity-staker/build/StakingRewards.json';
import { CurrencyAmount } from '@uniswap/sdk-core';
import { Pair } from '@uniswap/v2-sdk';
import useCurrentBlockTimestamp from "../../hooks/useCurrentBlockTimestamp";
import JSBI from 'jsbi';
import { useMemo } from 'react';
import { DAI, UNI, USDC, USDT, WBTC, WETH9_EXTENDED } from "../../constants/tokens";
import { useActiveWeb3React } from "../../hooks/web3";
import { NEVER_RELOAD, useMultipleContractSingleData } from "../multicall/hooks";
import { tryParseAmount } from "../swap/hooks";
import { jsx as _jsx } from "react/jsx-runtime";
const STAKING_REWARDS_INTERFACE = new Interface(STAKING_REWARDS_ABI);
export const STAKING_GENESIS = 1600387200;
export const REWARDS_DURATION_DAYS = 60;
export const STAKING_REWARDS_INFO = {
  1: [{
    tokens: [WETH9_EXTENDED[1], DAI],
    stakingRewardAddress: '0xa1484C3aa22a66C62b77E0AE78E15258bd0cB711'
  }, {
    tokens: [WETH9_EXTENDED[1], USDC],
    stakingRewardAddress: '0x7FBa4B8Dc5E7616e59622806932DBea72537A56b'
  }, {
    tokens: [WETH9_EXTENDED[1], USDT],
    stakingRewardAddress: '0x6C3e4cb2E96B01F4b866965A91ed4437839A121a'
  }, {
    tokens: [WETH9_EXTENDED[1], WBTC],
    stakingRewardAddress: '0xCA35e32e7926b96A9988f61d510E038108d8068e'
  }]
};
// gets the staking info from the network for the active chain id
export function useStakingInfo(pairToFilterBy) {
  const {
    chainId,
    account
  } = useActiveWeb3React(); // detect if staking is ended

  const currentBlockTimestamp = useCurrentBlockTimestamp();
  const info = useMemo(() => {
    var _STAKING_REWARDS_INFO, _STAKING_REWARDS_INFO2;

    return chainId ? (_STAKING_REWARDS_INFO = (_STAKING_REWARDS_INFO2 = STAKING_REWARDS_INFO[chainId]) === null || _STAKING_REWARDS_INFO2 === void 0 ? void 0 : _STAKING_REWARDS_INFO2.filter(stakingRewardInfo => pairToFilterBy === undefined ? true : pairToFilterBy === null ? false : pairToFilterBy.involvesToken(stakingRewardInfo.tokens[0]) && pairToFilterBy.involvesToken(stakingRewardInfo.tokens[1]))) !== null && _STAKING_REWARDS_INFO !== void 0 ? _STAKING_REWARDS_INFO : [] : [];
  }, [chainId, pairToFilterBy]);
  const uni = chainId ? UNI[chainId] : undefined;
  const rewardsAddresses = useMemo(() => info.map(_ref => {
    let {
      stakingRewardAddress
    } = _ref;
    return stakingRewardAddress;
  }), [info]);
  const accountArg = useMemo(() => [account !== null && account !== void 0 ? account : undefined], [account]); // get all the info from the staking rewards contracts

  const balances = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'balanceOf', accountArg);
  const earnedAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'earned', accountArg);
  const totalSupplies = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'totalSupply'); // tokens per second, constants

  const rewardRates = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'rewardRate', undefined, NEVER_RELOAD);
  const periodFinishes = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'periodFinish', undefined, NEVER_RELOAD);
  return useMemo(() => {
    if (!chainId || !uni) return [];
    return rewardsAddresses.reduce((memo, rewardsAddress, index) => {
      // these two are dependent on account
      const balanceState = balances[index];
      const earnedAmountState = earnedAmounts[index]; // these get fetched regardless of account

      const totalSupplyState = totalSupplies[index];
      const rewardRateState = rewardRates[index];
      const periodFinishState = periodFinishes[index];

      if ( // these may be undefined if not logged in
      !(balanceState !== null && balanceState !== void 0 && balanceState.loading) && !(earnedAmountState !== null && earnedAmountState !== void 0 && earnedAmountState.loading) && // always need these
      totalSupplyState && !totalSupplyState.loading && rewardRateState && !rewardRateState.loading && periodFinishState && !periodFinishState.loading) {
        var _balanceState$result$, _balanceState$result, _totalSupplyState$res, _rewardRateState$resu, _periodFinishState$re, _periodFinishState$re2, _earnedAmountState$re, _earnedAmountState$re2;

        if (balanceState !== null && balanceState !== void 0 && balanceState.error || earnedAmountState !== null && earnedAmountState !== void 0 && earnedAmountState.error || totalSupplyState.error || rewardRateState.error || periodFinishState.error) {
          console.error('Failed to load staking rewards info');
          return memo;
        } // get the LP token


        const tokens = info[index].tokens;
        const dummyPair = new Pair(CurrencyAmount.fromRawAmount(tokens[0], '0'), CurrencyAmount.fromRawAmount(tokens[1], '0')); // check for account, if no account set to 0

        const stakedAmount = CurrencyAmount.fromRawAmount(dummyPair.liquidityToken, JSBI.BigInt((_balanceState$result$ = balanceState === null || balanceState === void 0 ? void 0 : (_balanceState$result = balanceState.result) === null || _balanceState$result === void 0 ? void 0 : _balanceState$result[0]) !== null && _balanceState$result$ !== void 0 ? _balanceState$result$ : 0));
        const totalStakedAmount = CurrencyAmount.fromRawAmount(dummyPair.liquidityToken, JSBI.BigInt((_totalSupplyState$res = totalSupplyState.result) === null || _totalSupplyState$res === void 0 ? void 0 : _totalSupplyState$res[0]));
        const totalRewardRate = CurrencyAmount.fromRawAmount(uni, JSBI.BigInt((_rewardRateState$resu = rewardRateState.result) === null || _rewardRateState$resu === void 0 ? void 0 : _rewardRateState$resu[0]));

        const getHypotheticalRewardRate = (stakedAmount, totalStakedAmount, totalRewardRate) => {
          return CurrencyAmount.fromRawAmount(uni, JSBI.greaterThan(totalStakedAmount.quotient, JSBI.BigInt(0)) ? JSBI.divide(JSBI.multiply(totalRewardRate.quotient, stakedAmount.quotient), totalStakedAmount.quotient) : JSBI.BigInt(0));
        };

        const individualRewardRate = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRate);
        const periodFinishSeconds = (_periodFinishState$re = periodFinishState.result) === null || _periodFinishState$re === void 0 ? void 0 : (_periodFinishState$re2 = _periodFinishState$re[0]) === null || _periodFinishState$re2 === void 0 ? void 0 : _periodFinishState$re2.toNumber();
        const periodFinishMs = periodFinishSeconds * 1000; // compare period end timestamp vs current block timestamp (in seconds)

        const active = periodFinishSeconds && currentBlockTimestamp ? periodFinishSeconds > currentBlockTimestamp.toNumber() : true;
        memo.push({
          stakingRewardAddress: rewardsAddress,
          tokens: info[index].tokens,
          periodFinish: periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
          earnedAmount: CurrencyAmount.fromRawAmount(uni, JSBI.BigInt((_earnedAmountState$re = earnedAmountState === null || earnedAmountState === void 0 ? void 0 : (_earnedAmountState$re2 = earnedAmountState.result) === null || _earnedAmountState$re2 === void 0 ? void 0 : _earnedAmountState$re2[0]) !== null && _earnedAmountState$re !== void 0 ? _earnedAmountState$re : 0)),
          rewardRate: individualRewardRate,
          totalRewardRate,
          stakedAmount,
          totalStakedAmount,
          getHypotheticalRewardRate,
          active
        });
      }

      return memo;
    }, []);
  }, [balances, chainId, currentBlockTimestamp, earnedAmounts, info, periodFinishes, rewardRates, rewardsAddresses, totalSupplies, uni]);
}
export function useTotalUniEarned() {
  const {
    chainId
  } = useActiveWeb3React();
  const uni = chainId ? UNI[chainId] : undefined;
  const stakingInfos = useStakingInfo();
  return useMemo(() => {
    var _stakingInfos$reduce;

    if (!uni) return undefined;
    return (_stakingInfos$reduce = stakingInfos === null || stakingInfos === void 0 ? void 0 : stakingInfos.reduce((accumulator, stakingInfo) => accumulator.add(stakingInfo.earnedAmount), CurrencyAmount.fromRawAmount(uni, '0'))) !== null && _stakingInfos$reduce !== void 0 ? _stakingInfos$reduce : CurrencyAmount.fromRawAmount(uni, '0');
  }, [stakingInfos, uni]);
} // based on typed value

export function useDerivedStakeInfo(typedValue, stakingToken, userLiquidityUnstaked) {
  const {
    account
  } = useActiveWeb3React();
  const parsedInput = tryParseAmount(typedValue, stakingToken);
  const parsedAmount = parsedInput && userLiquidityUnstaked && JSBI.lessThanOrEqual(parsedInput.quotient, userLiquidityUnstaked.quotient) ? parsedInput : undefined;
  let error;

  if (!account) {
    error = /*#__PURE__*/_jsx(Trans, {
      id: "Connect Wallet"
    });
  }

  if (!parsedAmount) {
    var _error;

    error = (_error = error) !== null && _error !== void 0 ? _error : /*#__PURE__*/_jsx(Trans, {
      id: "Enter an amount"
    });
  }

  return {
    parsedAmount,
    error
  };
}