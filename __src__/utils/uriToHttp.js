/**
 * Given a URI that may be ipfs, ipns, http, https, or data protocol, return the fetch-able http(s) URLs for the same content
 * @param uri to convert to fetch-able http url
 */
export default function uriToHttp(uri) {
  var _uri$match, _uri$match2, _uri$match3;

  const protocol = uri.split(':')[0].toLowerCase();

  switch (protocol) {
    case 'data':
      return [uri];

    case 'https':
      return [uri];

    case 'http':
      return ['https' + uri.substr(4), uri];

    case 'ipfs':
      const hash = (_uri$match = uri.match(/^ipfs:(\/\/)?(.*)$/i)) === null || _uri$match === void 0 ? void 0 : _uri$match[2];
      return [`https://cloudflare-ipfs.com/ipfs/${hash}/`, `https://ipfs.io/ipfs/${hash}/`];

    case 'ipns':
      const name = (_uri$match2 = uri.match(/^ipns:(\/\/)?(.*)$/i)) === null || _uri$match2 === void 0 ? void 0 : _uri$match2[2];
      return [`https://cloudflare-ipfs.com/ipns/${name}/`, `https://ipfs.io/ipns/${name}/`];

    case 'ar':
      const tx = (_uri$match3 = uri.match(/^ar:(\/\/)?(.*)$/i)) === null || _uri$match3 === void 0 ? void 0 : _uri$match3[2];
      return [`https://arweave.net/${tx}`];

    default:
      return [];
  }
}