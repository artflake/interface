import { BigNumber } from '@ethersproject/bignumber';
import { CurrencyAmount, Token } from '@uniswap/sdk-core';
import JSBI from 'jsbi';
import { ZERO_ADDRESS } from '../constants/misc';
import { computeUniCirculation } from './computeUniCirculation';
describe('computeUniCirculation', () => {
  const token = new Token(4, ZERO_ADDRESS, 18);

  function expandTo18Decimals(num) {
    return JSBI.multiply(JSBI.BigInt(num), JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18)));
  }

  function tokenAmount(num) {
    return CurrencyAmount.fromRawAmount(token, expandTo18Decimals(num));
  }

  it('before staking', () => {
    expect(computeUniCirculation(token, BigNumber.from(0), undefined)).toEqual(tokenAmount(150000000));
    expect(computeUniCirculation(token, BigNumber.from(1600387200), undefined)).toEqual(tokenAmount(150000000));
  });
  it('mid staking', () => {
    expect(computeUniCirculation(token, BigNumber.from(1600387200 + 15 * 24 * 60 * 60), undefined)).toEqual(tokenAmount(155000000));
  });
  it('after staking and treasury vesting cliff', () => {
    expect(computeUniCirculation(token, BigNumber.from(1600387200 + 60 * 24 * 60 * 60), undefined)).toEqual(tokenAmount(224575341));
  });
  it('subtracts unclaimed uni', () => {
    expect(computeUniCirculation(token, BigNumber.from(1600387200 + 15 * 24 * 60 * 60), tokenAmount(1000))).toEqual(tokenAmount(154999000));
  });
});