import { Token } from '@uniswap/sdk-core';
import { tryParsePrice } from './utils';
describe('hooks', () => {
  describe('#tryParsePrice', () => {
    it('should return undefined if amount is not a number', () => {
      const baseToken = new Token(1, '0x6b175474e89094c44da98b954eedeac495271d0f', 6);
      const quoteToken = new Token(1, '0x1b175474e89094c44da98b954eedeac495271d0f', 6);
      expect(tryParsePrice(undefined, undefined, undefined)).toBeUndefined();
      expect(tryParsePrice(baseToken, quoteToken)).toBeUndefined();
      expect(tryParsePrice(baseToken, quoteToken, '')).toBeUndefined();
      expect(tryParsePrice(baseToken, quoteToken, 'abc.123')).toBeUndefined();
      expect(tryParsePrice(baseToken, quoteToken, '1.2.3')).toBeUndefined();
      expect(tryParsePrice(baseToken, quoteToken, '20.')).toEqual(undefined);
    });
    it('should return a price when decimals are the same', () => {
      var _tryParsePrice, _tryParsePrice2, _tryParsePrice3, _tryParsePrice4, _tryParsePrice5, _tryParsePrice6, _tryParsePrice7;

      const baseToken = new Token(1, '0x6b175474e89094c44da98b954eedeac495271d0f', 6);
      const quoteToken = new Token(1, '0x1b175474e89094c44da98b954eedeac495271d0f', 6);
      expect((_tryParsePrice = tryParsePrice(baseToken, quoteToken, '20')) === null || _tryParsePrice === void 0 ? void 0 : _tryParsePrice.toSignificant(6)).toEqual('20');
      expect((_tryParsePrice2 = tryParsePrice(baseToken, quoteToken, '20.05')) === null || _tryParsePrice2 === void 0 ? void 0 : _tryParsePrice2.toSignificant(6)).toEqual('20.05');
      expect((_tryParsePrice3 = tryParsePrice(baseToken, quoteToken, '20.123456789')) === null || _tryParsePrice3 === void 0 ? void 0 : _tryParsePrice3.toSignificant(6)).toEqual('20.1235');
      expect((_tryParsePrice4 = tryParsePrice(baseToken, quoteToken, '0.123456789')) === null || _tryParsePrice4 === void 0 ? void 0 : _tryParsePrice4.toSignificant(6)).toEqual('0.123457');
      expect((_tryParsePrice5 = tryParsePrice(baseToken, quoteToken, '.123456789')) === null || _tryParsePrice5 === void 0 ? void 0 : _tryParsePrice5.toSignificant(6)).toEqual('0.123457');
      expect((_tryParsePrice6 = tryParsePrice(baseToken, quoteToken, (2 ** 128).toLocaleString('fullwide', {
        useGrouping: false
      }))) === null || _tryParsePrice6 === void 0 ? void 0 : _tryParsePrice6.toSignificant(6)).toEqual('340282000000000000000000000000000000000');
      expect((_tryParsePrice7 = tryParsePrice(baseToken, quoteToken,
      /* ~2^-128 */
      '0.000000000000000000000000000587747')) === null || _tryParsePrice7 === void 0 ? void 0 : _tryParsePrice7.toSignificant(6)).toEqual('0.000000000000000000000000000587747');
    });
    it('should return a price when decimals are different', () => {
      var _tryParsePrice8, _tryParsePrice9, _tryParsePrice10, _tryParsePrice11, _tryParsePrice12, _tryParsePrice13, _tryParsePrice14;

      const baseToken = new Token(1, '0x6b175474e89094c44da98b954eedeac495271d0f', 2);
      const quoteToken = new Token(1, '0x1b175474e89094c44da98b954eedeac495271d0f', 4);
      expect((_tryParsePrice8 = tryParsePrice(baseToken, quoteToken, '20')) === null || _tryParsePrice8 === void 0 ? void 0 : _tryParsePrice8.toSignificant(6)).toEqual('20');
      expect((_tryParsePrice9 = tryParsePrice(baseToken, quoteToken, '20.05')) === null || _tryParsePrice9 === void 0 ? void 0 : _tryParsePrice9.toSignificant(6)).toEqual('20.05');
      expect((_tryParsePrice10 = tryParsePrice(baseToken, quoteToken, '20.123456789')) === null || _tryParsePrice10 === void 0 ? void 0 : _tryParsePrice10.toSignificant(6)).toEqual('20.1235');
      expect((_tryParsePrice11 = tryParsePrice(baseToken, quoteToken, '0.123456789')) === null || _tryParsePrice11 === void 0 ? void 0 : _tryParsePrice11.toSignificant(6)).toEqual('0.123457');
      expect((_tryParsePrice12 = tryParsePrice(baseToken, quoteToken, '.123456789')) === null || _tryParsePrice12 === void 0 ? void 0 : _tryParsePrice12.toSignificant(6)).toEqual('0.123457');
      expect((_tryParsePrice13 = tryParsePrice(baseToken, quoteToken, (2 ** 128).toLocaleString('fullwide', {
        useGrouping: false
      }))) === null || _tryParsePrice13 === void 0 ? void 0 : _tryParsePrice13.toSignificant(6)).toEqual('340282000000000000000000000000000000000');
      expect((_tryParsePrice14 = tryParsePrice(baseToken, quoteToken,
      /* ~2^-128 */
      '0.000000000000000000000000000587747')) === null || _tryParsePrice14 === void 0 ? void 0 : _tryParsePrice14.toSignificant(6)).toEqual('0.000000000000000000000000000587747');
    });
  });
});