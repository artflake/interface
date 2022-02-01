var _ref, _ref2, _parseLocale2;

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from 'constants/locales';
import { useMemo } from 'react';
import store from 'state';
import { useUserLocale } from 'state/user/hooks';
import useParsedQueryString from './useParsedQueryString';
import { parsedQueryString } from './useParsedQueryString';
/**
 * Given a locale string (e.g. from user agent), return the best match for corresponding SupportedLocale
 * @param maybeSupportedLocale the fuzzy locale identifier
 */

function parseLocale(maybeSupportedLocale) {
  if (typeof maybeSupportedLocale !== 'string') return undefined;
  const lowerMaybeSupportedLocale = maybeSupportedLocale.toLowerCase();
  return SUPPORTED_LOCALES.find(locale => locale.toLowerCase() === lowerMaybeSupportedLocale || locale.split('-')[0] === lowerMaybeSupportedLocale);
}
/**
 * Returns the supported locale read from the user agent (navigator)
 */


export function navigatorLocale() {
  if (!navigator.language) return undefined;
  const [language, region] = navigator.language.split('-');

  if (region) {
    var _parseLocale;

    return (_parseLocale = parseLocale(`${language}-${region.toUpperCase()}`)) !== null && _parseLocale !== void 0 ? _parseLocale : parseLocale(language);
  }

  return parseLocale(language);
}

function storeLocale() {
  var _store$getState$user$;

  return (_store$getState$user$ = store.getState().user.userLocale) !== null && _store$getState$user$ !== void 0 ? _store$getState$user$ : undefined;
}

export const initialLocale = (_ref = (_ref2 = (_parseLocale2 = parseLocale(parsedQueryString().lng)) !== null && _parseLocale2 !== void 0 ? _parseLocale2 : storeLocale()) !== null && _ref2 !== void 0 ? _ref2 : navigatorLocale()) !== null && _ref !== void 0 ? _ref : DEFAULT_LOCALE;

function useUrlLocale() {
  const parsed = useParsedQueryString();
  return parseLocale(parsed.lng);
}
/**
 * Returns the currently active locale, from a combination of user agent, query string, and user settings stored in redux
 * Stores the query string locale in redux (if set) to persist across sessions
 */


export function useActiveLocale() {
  const urlLocale = useUrlLocale();
  const userLocale = useUserLocale();
  return useMemo(() => {
    var _ref3, _ref4;

    return (_ref3 = (_ref4 = urlLocale !== null && urlLocale !== void 0 ? urlLocale : userLocale) !== null && _ref4 !== void 0 ? _ref4 : navigatorLocale()) !== null && _ref3 !== void 0 ? _ref3 : DEFAULT_LOCALE;
  }, [urlLocale, userLocale]);
}