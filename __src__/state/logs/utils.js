/**
 * Converts a filter to the corresponding string key
 * @param filter the filter to convert
 */
export function filterToKey(filter) {
  var _filter$address, _filter$topics$map$jo, _filter$topics, _filter$topics$map;

  return `${(_filter$address = filter.address) !== null && _filter$address !== void 0 ? _filter$address : ''}:${(_filter$topics$map$jo = (_filter$topics = filter.topics) === null || _filter$topics === void 0 ? void 0 : (_filter$topics$map = _filter$topics.map(topic => topic ? Array.isArray(topic) ? topic.join(';') : topic : '\0')) === null || _filter$topics$map === void 0 ? void 0 : _filter$topics$map.join('-')) !== null && _filter$topics$map$jo !== void 0 ? _filter$topics$map$jo : ''}`;
}
/**
 * Convert a filter key to the corresponding filter
 * @param key key to convert
 */

export function keyToFilter(key) {
  const pcs = key.split(':');
  const address = pcs[0];
  const topics = pcs[1].split('-').map(topic => {
    if (topic === '\0') return null;
    const parts = topic.split(';');
    if (parts.length === 1) return parts[0];
    return parts;
  });
  return {
    address: address.length === 0 ? undefined : address,
    topics
  };
}