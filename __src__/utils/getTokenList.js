import contenthashToUri from './contenthashToUri';
import { parseENSAddress } from './parseENSAddress';
import uriToHttp from './uriToHttp'; // lazily get the validator the first time it is used

const getTokenListValidator = (() => {
  let tokenListValidator;
  return () => {
    if (!tokenListValidator) {
      tokenListValidator = new Promise(async resolve => {
        const [ajv, schema] = await Promise.all([import('ajv'), import('@uniswap/token-lists/src/tokenlist.schema.json')]);
        const validator = new ajv.default({
          allErrors: true
        }).compile(schema);
        resolve(validator);
      });
    }

    return tokenListValidator;
  };
})();
/**
 * Contains the logic for resolving a list URL to a validated token list
 * @param listUrl list url
 * @param resolveENSContentHash resolves an ens name to a contenthash
 */


export default async function getTokenList(listUrl, resolveENSContentHash) {
  const tokenListValidator = getTokenListValidator();
  const parsedENS = parseENSAddress(listUrl);
  let urls;

  if (parsedENS) {
    var _parsedENS$ensPath;

    let contentHashUri;

    try {
      contentHashUri = await resolveENSContentHash(parsedENS.ensName);
    } catch (error) {
      console.debug(`Failed to resolve ENS name: ${parsedENS.ensName}`, error);
      throw new Error(`Failed to resolve ENS name: ${parsedENS.ensName}`);
    }

    let translatedUri;

    try {
      translatedUri = contenthashToUri(contentHashUri);
    } catch (error) {
      console.debug('Failed to translate contenthash to URI', contentHashUri);
      throw new Error(`Failed to translate contenthash to URI: ${contentHashUri}`);
    }

    urls = uriToHttp(`${translatedUri}${(_parsedENS$ensPath = parsedENS.ensPath) !== null && _parsedENS$ensPath !== void 0 ? _parsedENS$ensPath : ''}`);
  } else {
    urls = uriToHttp(listUrl);
  }

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const isLast = i === urls.length - 1;
    let response;

    try {
      response = await fetch(url, {
        credentials: 'omit'
      });
    } catch (error) {
      console.debug('Failed to fetch list', listUrl, error);
      if (isLast) throw new Error(`Failed to download list ${listUrl}`);
      continue;
    }

    if (!response.ok) {
      if (isLast) throw new Error(`Failed to download list ${listUrl}`);
      continue;
    }

    const [json, validator] = await Promise.all([response.json(), tokenListValidator]);

    if (!validator(json)) {
      var _validator$errors$red, _validator$errors;

      const validationErrors = (_validator$errors$red = (_validator$errors = validator.errors) === null || _validator$errors === void 0 ? void 0 : _validator$errors.reduce((memo, error) => {
        var _error$message;

        const add = `${error.dataPath} ${(_error$message = error.message) !== null && _error$message !== void 0 ? _error$message : ''}`;
        return memo.length > 0 ? `${memo}; ${add}` : `${add}`;
      }, '')) !== null && _validator$errors$red !== void 0 ? _validator$errors$red : 'unknown error';
      throw new Error(`Token list failed validation: ${validationErrors}`);
    }

    return json;
  }

  throw new Error('Unrecognized list URL protocol.');
}