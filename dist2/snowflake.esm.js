import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import styled, { keyframes, css, createGlobalStyle, ThemeProvider as ThemeProvider$1, ThemeContext, useTheme as useTheme$1 } from 'styled-components/macro';
import * as React from 'react';
import React__default, { useMemo, useEffect, useState, useCallback, useContext, useRef, useLayoutEffect, memo, Suspense } from 'react';
import { useDispatch, useSelector, shallowEqual, Provider } from 'react-redux';
import { createAction, createSlice, nanoid, createReducer, configureStore } from '@reduxjs/toolkit';
import qs, { parse, stringify } from 'qs';
import { useLocation, Link as Link$1, NavLink, Redirect, Route as Route$2, Switch, HashRouter } from 'react-router-dom';
import { getAddress, isAddress as isAddress$1 } from '@ethersproject/address';
import { Trans, t, Plural } from '@lingui/macro';
import { Text as Text$1, Box as Box$1 } from 'rebass';
import { AddressZero, MaxUint256 } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { namehash } from '@ethersproject/hash';
import { useWeb3React, UnsupportedChainIdError, createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import ms from 'ms.macro';
import { Web3Provider } from '@ethersproject/providers';
import { FortmaticConnector as FortmaticConnector$1 } from '@web3-react/fortmatic-connector';
import { AbstractConnector } from '@web3-react/abstract-connector';
import invariant from 'tiny-invariant';
import { Percent, Token, WETH9, Ether, CurrencyAmount, TradeType, Price, Fraction } from '@uniswap/sdk-core';
import JSBI from 'jsbi';
import { UAParser } from 'ua-parser-js';
import { createMulticall, NEVER_RELOAD } from '@uniswap/redux-multicall';
import { FACTORY_ADDRESS, Pair, computePairAddress, Trade, Router } from '@uniswap/v2-sdk';
import { FACTORY_ADDRESS as FACTORY_ADDRESS$1, Route as Route$1, Pool as Pool$1, Trade as Trade$1, computePoolAddress, FeeAmount, SwapQuoter, toHex, SwapRouter } from '@uniswap/v3-sdk';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref } from 'firebase/database';
import { arrayify, hexStripZeros, splitSignature } from '@ethersproject/bytes';
import { parseBytes32String } from '@ethersproject/strings';
import { X, ExternalLink as ExternalLink$1, Trash, Check, ArrowDown, Info, HelpCircle, Coffee, MessageCircle, Globe, Moon, Sun, BookOpen, FileText, ChevronLeft, AlertTriangle, CheckCircle, Copy as Copy$1, Triangle, ArrowLeft, ArrowRight, Activity, ArrowDownCircle, ChevronDown, AlertOctagon, Heart, AlertCircle, Slash, Edit, Settings, Lock, ArrowUpCircle } from 'react-feather';
import ReactGA from 'react-ga';
import { Box, Button as Button$1 } from 'rebass/styled-components';
import { darken, transparentize, readableColor, shade } from 'polished';
import ReactConfetti from 'react-confetti';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import { animated, useTransition, useSpring } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { createApi, fetchBaseQuery, skipToken, setupListeners } from '@reduxjs/toolkit/query/react';
import { save, load } from 'redux-localstorage-simple';
import { gql, GraphQLClient, ClientError } from 'graphql-request';
import { getVersionUpgrade, VersionUpgrade, minVersionBump } from '@uniswap/token-lists';
import { parseUnits } from '@ethersproject/units';
import { Interface } from '@ethersproject/abi';
import useScrollPosition from '@react-hook/window-scroll';
import Portal from '@reach/portal';
import { usePopper } from 'react-popper';
import jazzicon from '@metamask/jazzicon';
import copy from 'copy-to-clipboard';
import { BigNumber } from '@ethersproject/bignumber';
import { useSpring as useSpring$1 } from 'react-spring/web';
import CID from 'cids';
import { getNameFromData, rmPrefix } from 'multicodec';
import { decode, toB58String } from 'multihashes';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import Vibrant from 'node-vibrant/lib/bundle';
import { hex } from 'wcag-contrast';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { af, ar, ca, cs, da, de, el, en, es, fi, fr, he, hu, id, it, ja, ko, nl, no, pl, pt, ro, ru, sr, sv, sw, tr, uk, vi, zh } from 'make-plural/plurals';

function _mergeNamespaces(n, m) {
  m.forEach(function (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default' && !(k in n)) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  });
  return Object.freeze(n);
}

// This optional code is used to register a service worker.
// register() is not called by default.
// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.
// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://cra.link/PWA
const isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
function registerValidSW(swUrl, config) {
    navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
        registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
                return;
            }
            installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                        // At this point, the updated precached content has been fetched,
                        // but the previous service worker will still serve the older
                        // content until all client tabs are closed.
                        console.log('New content is available and will be used when all ' +
                            'tabs for this page are closed. See https://cra.link/PWA.');
                        // Execute callback
                        if (config && config.onUpdate) {
                            config.onUpdate(registration);
                        }
                    }
                    else {
                        // At this point, everything has been precached.
                        // It's the perfect time to display a
                        // "Content is cached for offline use." message.
                        console.log('Content is cached for offline use.');
                        // Execute callback
                        if (config && config.onSuccess) {
                            config.onSuccess(registration);
                        }
                    }
                }
            };
        };
    })
        .catch((error) => {
        console.error('Error during service worker registration:', error);
    });
}
function checkValidServiceWorker(swUrl, config) {
    // Check if the service worker can be found. If it can't reload the page.
    fetch(swUrl, {
        headers: { 'Service-Worker': 'script' },
    })
        .then((response) => {
        // Ensure service worker exists, and that we really are getting a JS file.
        const contentType = response.headers.get('content-type');
        if (response.status === 404 || (contentType != null && contentType.indexOf('javascript') === -1)) {
            // No service worker found. Probably a different app. Reload the page.
            navigator.serviceWorker.ready.then((registration) => {
                registration.unregister().then(() => {
                    window.location.reload();
                });
            });
        }
        else {
            // Service worker found. Proceed as normal.
            registerValidSW(swUrl, config);
        }
    })
        .catch(() => {
        console.log('No internet connection found. App is running in offline mode.');
    });
}
function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        // The URL constructor is available in all browsers that support SW.
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            // Our service worker won't work if PUBLIC_URL is on a different origin
            // from what our page is served on. This might happen if a CDN is used to
            // serve assets; see https://github.com/facebook/create-react-app/issues/2374
            return;
        }
        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
            if (isLocalhost) {
                // This is running on localhost. Let's check if a service worker still exists or not.
                checkValidServiceWorker(swUrl, config);
                // Add some additional logging to localhost, pointing developers to the
                // service worker/PWA documentation.
                navigator.serviceWorker.ready.then(() => {
                    console.log('This web app is being served cache-first by a service ' +
                        'worker. To learn more, visit https://cra.link/PWA');
                });
            }
            else {
                // Is not localhost. Just register service worker
                registerValidSW(swUrl, config);
            }
        });
    }
}
function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => {
            registration.unregister();
        })
            .catch((error) => {
            console.error(error.message);
        });
    }
}

var serviceWorkerRegistration = /*#__PURE__*/Object.freeze({
  __proto__: null,
  register: register,
  unregister: unregister
});

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const rotate$2 = keyframes `
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const StyledSVG = styled.svg `
  animation: 2s ${rotate$2} linear infinite;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  path {
    stroke: ${({ stroke, theme }) => stroke !== null && stroke !== void 0 ? stroke : theme.primary1};
  }
`;
/**
 * Takes in custom size and stroke for circle color, default to primary color as fill,
 * need ...rest for layered styles on top
 */
function Loader(_a) {
    var { size = '16px', stroke } = _a, rest = __rest(_a, ["size", "stroke"]);
    return (jsx(StyledSVG, Object.assign({ viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", size: size, stroke: stroke }, rest, { children: jsx("path", { d: "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, void 0) }), void 0));
}

const useAppDispatch = () => useDispatch();
const useAppSelector = useSelector;

const updateMatchesDarkMode = createAction('user/updateMatchesDarkMode');
const updateArbitrumAlphaAcknowledged = createAction('user/updateArbitrumAlphaAcknowledged');
const updateOptimismAlphaAcknowledged = createAction('user/updateOptimismAlphaAcknowledged');
const updateUserDarkMode = createAction('user/updateUserDarkMode');
const updateUserExpertMode = createAction('user/updateUserExpertMode');
const updateUserLocale = createAction('user/updateUserLocale');
const updateUserClientSideRouter = createAction('user/updateUserClientSideRouter');
const updateHideClosedPositions = createAction('user/hideClosedPositions');
const updateUserSlippageTolerance = createAction('user/updateUserSlippageTolerance');
const updateUserDeadline = createAction('user/updateUserDeadline');
const addSerializedToken = createAction('user/addSerializedToken');
const removeSerializedToken = createAction('user/removeSerializedToken');
const addSerializedPair = createAction('user/addSerializedPair');
const removeSerializedPair = createAction('user/removeSerializedPair');

function parsedQueryString(search) {
    if (!search) {
        // react-router-dom places search string in the hash
        const hash = window.location.hash;
        search = hash.substr(hash.indexOf('?'));
    }
    return search && search.length > 1 ? parse(search, { parseArrays: false, ignoreQueryPrefix: true }) : {};
}
function useParsedQueryString() {
    const { search } = useLocation();
    return useMemo(() => parsedQueryString(search), [search]);
}

function ApeModeQueryParamReader() {
    useApeModeQueryParamReader();
    return null;
}
function useApeModeQueryParamReader() {
    const dispatch = useAppDispatch();
    const { ape } = useParsedQueryString();
    useEffect(() => {
        if (typeof ape !== 'string')
            return;
        if (ape === '' || ape.toLowerCase() === 'true') {
            dispatch(updateUserExpertMode({ userExpertMode: true }));
        }
    });
}

var Circle$1 = "data:image/svg+xml,%3Csvg%20width%3D%2294%22%20height%3D%2294%22%20viewBox%3D%220%200%2094%2094%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%20%20%3Cpath%20d%3D%22M92%2047C92%2022.1472%2071.8528%202%2047%202C22.1472%202%202%2022.1472%202%2047C2%2071.8528%2022.1472%2092%2047%2092%22%20stroke%3D%22%232172E5%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E";

var tokenLogo = "data:image/png;base64,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";

// returns the checksummed address if the address is valid, otherwise returns false
function isAddress(value) {
    try {
        return getAddress(value);
    }
    catch (_a) {
        return false;
    }
}
// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
function shortenAddress(address, chars = 4) {
    const parsed = isAddress(address);
    if (!parsed) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}
// account is not optional
function getSigner(library, account) {
    return library.getSigner(account).connectUnchecked();
}
// account is optional
function getProviderOrSigner(library, account) {
    return account ? getSigner(library, account) : library;
}
// account is optional
function getContract(address, ABI, library, account) {
    if (!isAddress(address) || address === AddressZero) {
        throw Error(`Invalid 'address' parameter '${address}'.`);
    }
    return new Contract(address, ABI, getProviderOrSigner(library, account));
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function isTokenOnList(tokenAddressMap, token) {
    var _a;
    return Boolean((token === null || token === void 0 ? void 0 : token.isToken) && ((_a = tokenAddressMap[token.chainId]) === null || _a === void 0 ? void 0 : _a[token.address]));
}

function safeNamehash(name) {
    if (name === undefined)
        return undefined;
    try {
        return namehash(name);
    }
    catch (error) {
        console.debug(error);
        return undefined;
    }
}

var _path$4, _path2$1, _path3$1, _path4, _path5, _path6, _path7, _path8, _path9;

function _extends$6() { _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }

const SvgLogo = props => /*#__PURE__*/React.createElement("svg", _extends$6({
  width: 14,
  height: 15,
  viewBox: "0 0 14 15",
  fill: "black",
  xmlns: "http://www.w3.org/2000/svg"
}, props), /*#__PURE__*/React.createElement("g", {
  style: {
    mixBlendMode: "darken"
  }
}, _path$4 || (_path$4 = /*#__PURE__*/React.createElement("path", {
  d: "M4.15217 1.55141C3.96412 1.52242 3.95619 1.51902 4.04468 1.5055C4.21427 1.47958 4.61472 1.51491 4.89067 1.58012C5.53489 1.73232 6.12109 2.12221 6.74683 2.81466L6.91307 2.99862L7.15088 2.96062C8.15274 2.8006 9.17194 2.92778 10.0244 3.31918C10.2589 3.42686 10.6287 3.64121 10.6749 3.69629C10.6896 3.71384 10.7166 3.82684 10.7349 3.94742C10.7982 4.36458 10.7665 4.68434 10.6382 4.92317C10.5683 5.05313 10.5644 5.09432 10.6114 5.20554C10.6489 5.2943 10.7534 5.35999 10.8569 5.35985C11.0687 5.35956 11.2968 5.0192 11.4024 4.54561L11.4444 4.3575L11.5275 4.45109C11.9835 4.96459 12.3417 5.66488 12.4032 6.16335L12.4192 6.29332L12.3426 6.17517C12.2107 5.97186 12.0781 5.83346 11.9084 5.72183C11.6024 5.52062 11.2789 5.45215 10.4222 5.40727C9.64839 5.36675 9.21045 5.30106 8.77621 5.16032C8.03738 4.9209 7.66493 4.60204 6.78729 3.4576C6.39748 2.94928 6.15654 2.66804 5.91687 2.44155C5.37228 1.92691 4.83716 1.65701 4.15217 1.55141Z"
})), _path2$1 || (_path2$1 = /*#__PURE__*/React.createElement("path", {
  d: "M10.8494 2.68637C10.8689 2.34575 10.9153 2.12108 11.0088 1.9159C11.0458 1.83469 11.0804 1.76822 11.0858 1.76822C11.0911 1.76822 11.075 1.82816 11.05 1.90142C10.9821 2.10054 10.9709 2.3729 11.0177 2.68978C11.0771 3.09184 11.1109 3.14985 11.5385 3.58416C11.739 3.78788 11.9723 4.0448 12.0568 4.15511L12.2106 4.35568L12.0568 4.21234C11.8688 4.03705 11.4364 3.6952 11.3409 3.64633C11.2768 3.61356 11.2673 3.61413 11.2278 3.65321C11.1914 3.68922 11.1837 3.74333 11.1787 3.99915C11.1708 4.39786 11.1161 4.65377 10.9842 4.90965C10.9128 5.04805 10.9015 5.01851 10.9661 4.8623C11.0143 4.74566 11.0192 4.69439 11.0189 4.30842C11.0181 3.53291 10.9255 3.34647 10.3823 3.02709C10.2447 2.94618 10.0179 2.8295 9.87839 2.76778C9.73887 2.70606 9.62805 2.6523 9.63208 2.64828C9.64746 2.63307 10.1772 2.78675 10.3905 2.86828C10.7077 2.98954 10.76 3.00526 10.7985 2.99063C10.8244 2.98082 10.8369 2.90608 10.8494 2.68637Z"
})), _path3$1 || (_path3$1 = /*#__PURE__*/React.createElement("path", {
  d: "M4.51745 4.01304C4.13569 3.49066 3.89948 2.68973 3.95062 2.091L3.96643 1.90572L4.05333 1.92148C4.21652 1.95106 4.49789 2.05515 4.62964 2.13469C4.9912 2.35293 5.14773 2.64027 5.30697 3.37811C5.35362 3.59423 5.41482 3.8388 5.44298 3.9216C5.48831 4.05487 5.65962 4.36617 5.7989 4.56834C5.89922 4.71395 5.83258 4.78295 5.61082 4.76305C5.27215 4.73267 4.8134 4.41799 4.51745 4.01304Z"
})), _path4 || (_path4 = /*#__PURE__*/React.createElement("path", {
  d: "M10.3863 7.90088C8.60224 7.18693 7.97389 6.56721 7.97389 5.52157C7.97389 5.36769 7.97922 5.24179 7.98571 5.24179C7.99221 5.24179 8.06124 5.29257 8.1391 5.35465C8.50088 5.64305 8.906 5.76623 10.0275 5.92885C10.6875 6.02455 11.0589 6.10185 11.4015 6.21477C12.4904 6.57371 13.1641 7.30212 13.3248 8.29426C13.3715 8.58255 13.3441 9.12317 13.2684 9.4081C13.2087 9.63315 13.0263 10.0388 12.9779 10.0544C12.9645 10.0587 12.9514 10.0076 12.9479 9.93809C12.9296 9.56554 12.7402 9.20285 12.4221 8.93116C12.0604 8.62227 11.5745 8.37633 10.3863 7.90088Z"
})), _path5 || (_path5 = /*#__PURE__*/React.createElement("path", {
  d: "M9.13385 8.19748C9.11149 8.06527 9.07272 7.89643 9.04769 7.82228L9.00217 7.68748L9.08672 7.7818C9.20374 7.91233 9.2962 8.07937 9.37457 8.30185C9.43438 8.47165 9.44111 8.52215 9.44066 8.79807C9.4402 9.06896 9.43273 9.12575 9.3775 9.27858C9.29042 9.51959 9.18233 9.69048 9.00097 9.87391C8.67507 10.2036 8.25607 10.3861 7.65143 10.4618C7.54633 10.4749 7.24 10.4971 6.97069 10.511C6.292 10.5461 5.84531 10.6186 5.44393 10.7587C5.38623 10.7788 5.3347 10.7911 5.32947 10.7859C5.31323 10.7698 5.58651 10.6079 5.81223 10.4998C6.1305 10.3474 6.44733 10.2643 7.15719 10.1468C7.50785 10.0887 7.86998 10.0183 7.96194 9.99029C8.83033 9.72566 9.27671 9.04276 9.13385 8.19748Z"
})), _path6 || (_path6 = /*#__PURE__*/React.createElement("path", {
  d: "M9.95169 9.64109C9.71465 9.13463 9.66022 8.64564 9.79009 8.18961C9.80399 8.14088 9.82632 8.101 9.83976 8.101C9.85319 8.101 9.90913 8.13105 9.96404 8.16777C10.0733 8.24086 10.2924 8.36395 10.876 8.68023C11.6043 9.0749 12.0196 9.3805 12.302 9.72965C12.5493 10.0354 12.7023 10.3837 12.776 10.8084C12.8177 11.0489 12.7932 11.6277 12.7311 11.8699C12.5353 12.6337 12.0802 13.2336 11.4311 13.5837C11.336 13.635 11.2506 13.6771 11.2414 13.6773C11.2321 13.6775 11.2668 13.5899 11.3184 13.4827C11.5367 13.029 11.5616 12.5877 11.3965 12.0965C11.2954 11.7957 11.0893 11.4287 10.6732 10.8084C10.1893 10.0873 10.0707 9.89539 9.95169 9.64109Z"
})), _path7 || (_path7 = /*#__PURE__*/React.createElement("path", {
  d: "M3.25046 12.3737C3.91252 11.8181 4.73629 11.4234 5.48666 11.3022C5.81005 11.25 6.34877 11.2707 6.64823 11.3469C7.12824 11.469 7.55763 11.7425 7.78094 12.0683C7.99918 12.3867 8.09281 12.6642 8.19029 13.2816C8.22875 13.5252 8.27057 13.7697 8.28323 13.8251C8.35644 14.1451 8.4989 14.4008 8.67544 14.5293C8.95583 14.7333 9.43865 14.7459 9.91362 14.5618C9.99423 14.5305 10.0642 14.5089 10.0691 14.5138C10.0864 14.5308 9.84719 14.6899 9.67847 14.7737C9.45143 14.8864 9.2709 14.93 9.03102 14.93C8.59601 14.93 8.23486 14.7101 7.9335 14.2616C7.87419 14.1733 7.7409 13.909 7.63729 13.6741C7.3191 12.9528 7.16199 12.7331 6.79255 12.4926C6.47104 12.2834 6.05641 12.2459 5.74449 12.3979C5.33475 12.5976 5.22043 13.118 5.51389 13.4478C5.63053 13.5789 5.84803 13.6919 6.02588 13.7139C6.35861 13.7551 6.64455 13.5035 6.64455 13.1696C6.64455 12.9528 6.56071 12.8291 6.34966 12.7344C6.0614 12.6051 5.75156 12.7562 5.75304 13.0254C5.75368 13.1402 5.80396 13.2122 5.91971 13.2643C5.99397 13.2977 5.99569 13.3003 5.93514 13.2878C5.67066 13.2333 5.6087 12.9164 5.82135 12.706C6.07667 12.4535 6.60461 12.5649 6.78591 12.9097C6.86208 13.0545 6.87092 13.3429 6.80451 13.517C6.6559 13.9068 6.22256 14.1117 5.78297 14.0002C5.48368 13.9242 5.36181 13.842 5.00097 13.4726C4.37395 12.8306 4.13053 12.7062 3.22657 12.566L3.05335 12.5391L3.25046 12.3737Z"
})), _path8 || (_path8 = /*#__PURE__*/React.createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M0.308383 0.883984C2.40235 3.40996 3.84457 4.45213 4.00484 4.67231C4.13717 4.85412 4.08737 5.01757 3.86067 5.14567C3.7346 5.21689 3.47541 5.28905 3.34564 5.28905C3.19887 5.28905 3.14847 5.23278 3.14847 5.23278C3.06337 5.15255 3.01544 5.16658 2.5784 4.39555C1.97166 3.45981 1.46389 2.68357 1.45004 2.67057C1.41801 2.64052 1.41856 2.64153 2.51654 4.59413C2.69394 5.0011 2.55182 5.15049 2.55182 5.20845C2.55182 5.32636 2.51946 5.38834 2.37311 5.55059C2.12914 5.8211 2.02008 6.12505 1.94135 6.7541C1.8531 7.45926 1.60492 7.95737 0.917156 8.80989C0.514562 9.30893 0.448686 9.4004 0.3471 9.60153C0.219144 9.85482 0.183961 9.99669 0.169701 10.3165C0.154629 10.6547 0.183983 10.8732 0.287934 11.1965C0.378939 11.4796 0.473932 11.6665 0.716778 12.0403C0.926351 12.3629 1.04702 12.6027 1.04702 12.6965C1.04702 12.7711 1.06136 12.7712 1.38611 12.6983C2.16328 12.5239 2.79434 12.2171 3.14925 11.8411C3.36891 11.6084 3.42048 11.4799 3.42215 11.1611C3.42325 10.9525 3.41587 10.9088 3.35914 10.7888C3.2668 10.5935 3.09869 10.4311 2.72817 10.1794C2.2427 9.84953 2.03534 9.58398 1.97807 9.21878C1.93108 8.91913 1.98559 8.70771 2.25416 8.14825C2.53214 7.56916 2.60103 7.32239 2.64763 6.73869C2.67773 6.36158 2.71941 6.21286 2.82842 6.09348C2.94212 5.969 3.04447 5.92684 3.32584 5.88863C3.78457 5.82635 4.07667 5.70839 4.31677 5.48849C4.52505 5.29772 4.61221 5.11391 4.62558 4.8372L4.63574 4.62747L4.51934 4.49259C4.09783 4.00411 0.0261003 0.5 0.000160437 0.5C-0.00538105 0.5 0.133325 0.672804 0.308383 0.883984ZM1.28364 10.6992C1.37894 10.5314 1.3283 10.3158 1.16889 10.2104C1.01827 10.1109 0.78428 10.1578 0.78428 10.2875C0.78428 10.3271 0.806303 10.3559 0.855937 10.3813C0.939514 10.424 0.945581 10.4721 0.879823 10.5703C0.81323 10.6698 0.818604 10.7573 0.894991 10.8167C1.0181 10.9125 1.19237 10.8598 1.28364 10.6992Z"
})), _path9 || (_path9 = /*#__PURE__*/React.createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M4.92523 5.99865C4.70988 6.06439 4.50054 6.29124 4.43574 6.5291C4.39621 6.67421 4.41864 6.92875 4.47785 7.00736C4.57351 7.13433 4.66602 7.16778 4.91651 7.16603C5.40693 7.16263 5.83327 6.95358 5.88284 6.69224C5.92347 6.47801 5.73622 6.18112 5.4783 6.05078C5.34521 5.98355 5.06217 5.95688 4.92523 5.99865ZM5.49853 6.44422C5.57416 6.33741 5.54107 6.22198 5.41245 6.14391C5.1675 5.99525 4.79708 6.11827 4.79708 6.34826C4.79708 6.46274 4.99025 6.58765 5.16731 6.58765C5.28516 6.58765 5.44644 6.5178 5.49853 6.44422Z"
}))));
var UNISWAP_LOGO_URL = "data:image/svg+xml,%3Csvg%20width%3D%2214%22%20height%3D%2215%22%20viewBox%3D%220%200%2014%2015%22%20fill%3D%22black%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20style%3D%22mix-blend-mode%3Adarken%22%3E%3Cpath%20d%3D%22M4.15217%201.55141C3.96412%201.52242%203.95619%201.51902%204.04468%201.5055C4.21427%201.47958%204.61472%201.51491%204.89067%201.58012C5.53489%201.73232%206.12109%202.12221%206.74683%202.81466L6.91307%202.99862L7.15088%202.96062C8.15274%202.8006%209.17194%202.92778%2010.0244%203.31918C10.2589%203.42686%2010.6287%203.64121%2010.6749%203.69629C10.6896%203.71384%2010.7166%203.82684%2010.7349%203.94742C10.7982%204.36458%2010.7665%204.68434%2010.6382%204.92317C10.5683%205.05313%2010.5644%205.09432%2010.6114%205.20554C10.6489%205.2943%2010.7534%205.35999%2010.8569%205.35985C11.0687%205.35956%2011.2968%205.0192%2011.4024%204.54561L11.4444%204.3575L11.5275%204.45109C11.9835%204.96459%2012.3417%205.66488%2012.4032%206.16335L12.4192%206.29332L12.3426%206.17517C12.2107%205.97186%2012.0781%205.83346%2011.9084%205.72183C11.6024%205.52062%2011.2789%205.45215%2010.4222%205.40727C9.64839%205.36675%209.21045%205.30106%208.77621%205.16032C8.03738%204.9209%207.66493%204.60204%206.78729%203.4576C6.39748%202.94928%206.15654%202.66804%205.91687%202.44155C5.37228%201.92691%204.83716%201.65701%204.15217%201.55141Z%22%2F%3E%3Cpath%20d%3D%22M10.8494%202.68637C10.8689%202.34575%2010.9153%202.12108%2011.0088%201.9159C11.0458%201.83469%2011.0804%201.76822%2011.0858%201.76822C11.0911%201.76822%2011.075%201.82816%2011.05%201.90142C10.9821%202.10054%2010.9709%202.3729%2011.0177%202.68978C11.0771%203.09184%2011.1109%203.14985%2011.5385%203.58416C11.739%203.78788%2011.9723%204.0448%2012.0568%204.15511L12.2106%204.35568L12.0568%204.21234C11.8688%204.03705%2011.4364%203.6952%2011.3409%203.64633C11.2768%203.61356%2011.2673%203.61413%2011.2278%203.65321C11.1914%203.68922%2011.1837%203.74333%2011.1787%203.99915C11.1708%204.39786%2011.1161%204.65377%2010.9842%204.90965C10.9128%205.04805%2010.9015%205.01851%2010.9661%204.8623C11.0143%204.74566%2011.0192%204.69439%2011.0189%204.30842C11.0181%203.53291%2010.9255%203.34647%2010.3823%203.02709C10.2447%202.94618%2010.0179%202.8295%209.87839%202.76778C9.73887%202.70606%209.62805%202.6523%209.63208%202.64828C9.64746%202.63307%2010.1772%202.78675%2010.3905%202.86828C10.7077%202.98954%2010.76%203.00526%2010.7985%202.99063C10.8244%202.98082%2010.8369%202.90608%2010.8494%202.68637Z%22%2F%3E%3Cpath%20d%3D%22M4.51745%204.01304C4.13569%203.49066%203.89948%202.68973%203.95062%202.091L3.96643%201.90572L4.05333%201.92148C4.21652%201.95106%204.49789%202.05515%204.62964%202.13469C4.9912%202.35293%205.14773%202.64027%205.30697%203.37811C5.35362%203.59423%205.41482%203.8388%205.44298%203.9216C5.48831%204.05487%205.65962%204.36617%205.7989%204.56834C5.89922%204.71395%205.83258%204.78295%205.61082%204.76305C5.27215%204.73267%204.8134%204.41799%204.51745%204.01304Z%22%2F%3E%3Cpath%20d%3D%22M10.3863%207.90088C8.60224%207.18693%207.97389%206.56721%207.97389%205.52157C7.97389%205.36769%207.97922%205.24179%207.98571%205.24179C7.99221%205.24179%208.06124%205.29257%208.1391%205.35465C8.50088%205.64305%208.906%205.76623%2010.0275%205.92885C10.6875%206.02455%2011.0589%206.10185%2011.4015%206.21477C12.4904%206.57371%2013.1641%207.30212%2013.3248%208.29426C13.3715%208.58255%2013.3441%209.12317%2013.2684%209.4081C13.2087%209.63315%2013.0263%2010.0388%2012.9779%2010.0544C12.9645%2010.0587%2012.9514%2010.0076%2012.9479%209.93809C12.9296%209.56554%2012.7402%209.20285%2012.4221%208.93116C12.0604%208.62227%2011.5745%208.37633%2010.3863%207.90088Z%22%2F%3E%3Cpath%20d%3D%22M9.13385%208.19748C9.11149%208.06527%209.07272%207.89643%209.04769%207.82228L9.00217%207.68748L9.08672%207.7818C9.20374%207.91233%209.2962%208.07937%209.37457%208.30185C9.43438%208.47165%209.44111%208.52215%209.44066%208.79807C9.4402%209.06896%209.43273%209.12575%209.3775%209.27858C9.29042%209.51959%209.18233%209.69048%209.00097%209.87391C8.67507%2010.2036%208.25607%2010.3861%207.65143%2010.4618C7.54633%2010.4749%207.24%2010.4971%206.97069%2010.511C6.292%2010.5461%205.84531%2010.6186%205.44393%2010.7587C5.38623%2010.7788%205.3347%2010.7911%205.32947%2010.7859C5.31323%2010.7698%205.58651%2010.6079%205.81223%2010.4998C6.1305%2010.3474%206.44733%2010.2643%207.15719%2010.1468C7.50785%2010.0887%207.86998%2010.0183%207.96194%209.99029C8.83033%209.72566%209.27671%209.04276%209.13385%208.19748Z%22%2F%3E%3Cpath%20d%3D%22M9.95169%209.64109C9.71465%209.13463%209.66022%208.64564%209.79009%208.18961C9.80399%208.14088%209.82632%208.101%209.83976%208.101C9.85319%208.101%209.90913%208.13105%209.96404%208.16777C10.0733%208.24086%2010.2924%208.36395%2010.876%208.68023C11.6043%209.0749%2012.0196%209.3805%2012.302%209.72965C12.5493%2010.0354%2012.7023%2010.3837%2012.776%2010.8084C12.8177%2011.0489%2012.7932%2011.6277%2012.7311%2011.8699C12.5353%2012.6337%2012.0802%2013.2336%2011.4311%2013.5837C11.336%2013.635%2011.2506%2013.6771%2011.2414%2013.6773C11.2321%2013.6775%2011.2668%2013.5899%2011.3184%2013.4827C11.5367%2013.029%2011.5616%2012.5877%2011.3965%2012.0965C11.2954%2011.7957%2011.0893%2011.4287%2010.6732%2010.8084C10.1893%2010.0873%2010.0707%209.89539%209.95169%209.64109Z%22%2F%3E%3Cpath%20d%3D%22M3.25046%2012.3737C3.91252%2011.8181%204.73629%2011.4234%205.48666%2011.3022C5.81005%2011.25%206.34877%2011.2707%206.64823%2011.3469C7.12824%2011.469%207.55763%2011.7425%207.78094%2012.0683C7.99918%2012.3867%208.09281%2012.6642%208.19029%2013.2816C8.22875%2013.5252%208.27057%2013.7697%208.28323%2013.8251C8.35644%2014.1451%208.4989%2014.4008%208.67544%2014.5293C8.95583%2014.7333%209.43865%2014.7459%209.91362%2014.5618C9.99423%2014.5305%2010.0642%2014.5089%2010.0691%2014.5138C10.0864%2014.5308%209.84719%2014.6899%209.67847%2014.7737C9.45143%2014.8864%209.2709%2014.93%209.03102%2014.93C8.59601%2014.93%208.23486%2014.7101%207.9335%2014.2616C7.87419%2014.1733%207.7409%2013.909%207.63729%2013.6741C7.3191%2012.9528%207.16199%2012.7331%206.79255%2012.4926C6.47104%2012.2834%206.05641%2012.2459%205.74449%2012.3979C5.33475%2012.5976%205.22043%2013.118%205.51389%2013.4478C5.63053%2013.5789%205.84803%2013.6919%206.02588%2013.7139C6.35861%2013.7551%206.64455%2013.5035%206.64455%2013.1696C6.64455%2012.9528%206.56071%2012.8291%206.34966%2012.7344C6.0614%2012.6051%205.75156%2012.7562%205.75304%2013.0254C5.75368%2013.1402%205.80396%2013.2122%205.91971%2013.2643C5.99397%2013.2977%205.99569%2013.3003%205.93514%2013.2878C5.67066%2013.2333%205.6087%2012.9164%205.82135%2012.706C6.07667%2012.4535%206.60461%2012.5649%206.78591%2012.9097C6.86208%2013.0545%206.87092%2013.3429%206.80451%2013.517C6.6559%2013.9068%206.22256%2014.1117%205.78297%2014.0002C5.48368%2013.9242%205.36181%2013.842%205.00097%2013.4726C4.37395%2012.8306%204.13053%2012.7062%203.22657%2012.566L3.05335%2012.5391L3.25046%2012.3737Z%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0.308383%200.883984C2.40235%203.40996%203.84457%204.45213%204.00484%204.67231C4.13717%204.85412%204.08737%205.01757%203.86067%205.14567C3.7346%205.21689%203.47541%205.28905%203.34564%205.28905C3.19887%205.28905%203.14847%205.23278%203.14847%205.23278C3.06337%205.15255%203.01544%205.16658%202.5784%204.39555C1.97166%203.45981%201.46389%202.68357%201.45004%202.67057C1.41801%202.64052%201.41856%202.64153%202.51654%204.59413C2.69394%205.0011%202.55182%205.15049%202.55182%205.20845C2.55182%205.32636%202.51946%205.38834%202.37311%205.55059C2.12914%205.8211%202.02008%206.12505%201.94135%206.7541C1.8531%207.45926%201.60492%207.95737%200.917156%208.80989C0.514562%209.30893%200.448686%209.4004%200.3471%209.60153C0.219144%209.85482%200.183961%209.99669%200.169701%2010.3165C0.154629%2010.6547%200.183983%2010.8732%200.287934%2011.1965C0.378939%2011.4796%200.473932%2011.6665%200.716778%2012.0403C0.926351%2012.3629%201.04702%2012.6027%201.04702%2012.6965C1.04702%2012.7711%201.06136%2012.7712%201.38611%2012.6983C2.16328%2012.5239%202.79434%2012.2171%203.14925%2011.8411C3.36891%2011.6084%203.42048%2011.4799%203.42215%2011.1611C3.42325%2010.9525%203.41587%2010.9088%203.35914%2010.7888C3.2668%2010.5935%203.09869%2010.4311%202.72817%2010.1794C2.2427%209.84953%202.03534%209.58398%201.97807%209.21878C1.93108%208.91913%201.98559%208.70771%202.25416%208.14825C2.53214%207.56916%202.60103%207.32239%202.64763%206.73869C2.67773%206.36158%202.71941%206.21286%202.82842%206.09348C2.94212%205.969%203.04447%205.92684%203.32584%205.88863C3.78457%205.82635%204.07667%205.70839%204.31677%205.48849C4.52505%205.29772%204.61221%205.11391%204.62558%204.8372L4.63574%204.62747L4.51934%204.49259C4.09783%204.00411%200.0261003%200.5%200.000160437%200.5C-0.00538105%200.5%200.133325%200.672804%200.308383%200.883984ZM1.28364%2010.6992C1.37894%2010.5314%201.3283%2010.3158%201.16889%2010.2104C1.01827%2010.1109%200.78428%2010.1578%200.78428%2010.2875C0.78428%2010.3271%200.806303%2010.3559%200.855937%2010.3813C0.939514%2010.424%200.945581%2010.4721%200.879823%2010.5703C0.81323%2010.6698%200.818604%2010.7573%200.894991%2010.8167C1.0181%2010.9125%201.19237%2010.8598%201.28364%2010.6992Z%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4.92523%205.99865C4.70988%206.06439%204.50054%206.29124%204.43574%206.5291C4.39621%206.67421%204.41864%206.92875%204.47785%207.00736C4.57351%207.13433%204.66602%207.16778%204.91651%207.16603C5.40693%207.16263%205.83327%206.95358%205.88284%206.69224C5.92347%206.47801%205.73622%206.18112%205.4783%206.05078C5.34521%205.98355%205.06217%205.95688%204.92523%205.99865ZM5.49853%206.44422C5.57416%206.33741%205.54107%206.22198%205.41245%206.14391C5.1675%205.99525%204.79708%206.11827%204.79708%206.34826C4.79708%206.46274%204.99025%206.58765%205.16731%206.58765C5.28516%206.58765%205.44644%206.5178%205.49853%206.44422Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E";

var EthereumLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAADxdJREFUeJztXVtzFMcVplwuP8VVeYmf7HJ+RKqSl/AQP6X8H+yqXUEIjhMnQY5jO9oVCIzA5mowdzAYG4xAGAyWLC5G3IyDL8gOASUYKrarYGZWC7qi23b6692VV6uZ7e6ZnT3di07VV6JUaLfnnG+6z+lz+vScOXUoL6SzP52/2PtlQ9p7piHlLU2k3P2JJqcjkXLO8589/OdN/tPjvx8VEP8Wv+sp/J8O/A3+Fp+Bz8JnUj/XrPjIwjT7ybxm57fJlLsy2eR2cwPe4QZksYB/Nr4D34XvxHdTP/8DJ+k0e4S/lb9Jpr2WZJNzgRtjPDaDS4DvFmPgY8GYMDZq/dStNKQzv0qmnA1c6RkqgysQIoMxYqzU+qoLWZDO/jyZdl7lir1ObdwQZLiOseMZqPVonSTS7i+4AtsTTW6O2pDR4ebEs/Bnotar8dKw2Pk1n0I76Y0W16zgdOIZqfVsnCSbvaeEB2+AkWpCBEQS/Jmp9U4u3Fl6nIdWB6gNQgb+7NABtR1qLjxcejiZdhfxKXGA3AjUswHXAXQBnVDbpSbCPeO5fAr8hlrxpgE6gW6o7ROb5N96Z3l9ePZxgUcMXEd1NxssbMk8kWxyztEr2A5AV3XjGySb3acTSLYYoFjL4EF31PYLLXwaeyiZcltnp/woEJtIrdAltT21BEkR7tnuo1dgfQC6tCbRlGh1H02k3C5qpalg/bt3WdOGDPk4lACdct1S27eiLEgPPMbDmcvkylLAgiUOc/sm2LHuITavmX48KoBun1828DNqO/tKsiX7JF+zeqmVpIqPzg2xyckc++Sfw2ImoB6POtxe6Jra3tMEb75Nxv/Hmxk2MZGbIsCpz4bZn1d45OPSIQF0Tm13IViXbJn2i+i9NcYgRQIA+zsGyMelA6Fzap8AnqktDl8RO9r7WVFKCQAs3dJHPj4tcN2TRQcizrcs1Hv+NZf1D04GEqDj/JBwDqnHqYNCiFj7fYL8Jg+9AnTQfXmYlUo5AYAtbffIx6lNAm6L2hpfbO/atcO3dGsfy+VyUgIAL66yySEE3FzNto2R2ElYtrffkHbYd7fHWbkEEeDQyUHk6cnHrQkPtonV+CKla2FWDx6+nwQRAFi5K0s+bl3ANrGmkvP5fPoH1cFfX/fYyP2cNgG6Lg6z55a55OPXJgG3UVzGn2vbug98fvW+r/FlBADePtJPPn59iKKS6lYW5ad++8q4Vu+5G2h8FQIAr663JFlUAtiqqksBZ1Uj9UPp4neLHeb0TUQmwNEzg2xemv559OE2VsX4KE2ysXoXhpOJCgGAdXttShblAZtVpayMe5Zt1A+ji5fXZdj4uL/jF4YApy4NsxdaLXQIue2iGb/Ze4r6IcLg6rejUuPrEAB47yO7kkVTJIhyAsnG41rYylUVHQIAizdZlixqyh9DC2V8HGKkHrwuELffHZiUWz4kAVBEAueS+jl1EepAqo2ndLFW64guAYBNB2xMFjmdWsbHWXbqQesC0zMMGjcBgEVv2JYs4tDpT5BvzmDAoBWBxM2tH8a0jB+FAAe77EsWwaZKxkdLE9u2fPce65dbu4oEAFp32JYscnNK7WrQ14Z+sOpAMefwiLrjVy0CdF0cYguX2rU3ANtKCWBTdS9wqWcklPGjEgDYcdiuZBEaV1U0PtqbUQ9SB6/vyoY2fjUIALy81q5kUcUWduhxRz1AVcxvdthtb2aVT60JcOT0oKg4otaHKmBjX+OLA50GN2Esx+FT8mRPLQgAIO1MrQ91ArgZ31JytDqlHpwqXlrjsbExvZg/TgKcvDTM/rjcHocQtp45/ae9FuqBqeLr/6gle2pFAAChKLVeVAFbzyRAk3OBemAq2LhfPdlTSwIA6Y12JItg62nGR9tzyq7bqljY4rK+e5WrfCgJcPzskHBOqfUkJQC39bRW9+h9Tz0oFXx8Yahqxo+DAMCGfXY4hLB5SfjnrqQekAypjRntZA8FAU5/NixK0an1JQNsXrL+m1/4ceM7/WRPJcExsas3Rtn7nQNVJ8GBj82vHppWKBLrNStVAOrzqyWjPHzEWQGEbjBW81t9bPn2LNt9tF/UE1SLBMu2Ge4QcpsL4+MyJPLBVADi68HhcMmeUrnbP8kufDUyw8ggQBHoD7Dt4D3WyX2NqASAv/L7Fnr9VYK4CAs3YlEPpBLOfxk+2QP5wRlnZy7ztTnAUKUEKGLJpj72JnfmUFoehQTbDpldPQTb8/Xfe5Z6IEHA1BxWem+N8rdd/ib7EaAUq/dkxZoelgTYtaTWYxBwJR7y/8uoB+IHnMbB26sjY+M59uU1vr5/qj6FywhQxIodWfbOh/2ioZQOAZCzMLV6CLafU7hUkXww5Wjr8j/S7Sdo+3LxyojSGx+WAFN+wtY+tp1P7V0afsIbbxtaPcRtb2T1b+Mqj90flcf8t91x1v158PoeBwGKWLy5j23kfsIxBT/h5KfDoj8RtV7LIaqFTcwBfHUt+Eg35L//G2WnqxSyhSVAKdZwP+FgV2U/Yc9R85JFIieQwH25BgymCHTt9JPxiRy7ch3xe/QQrdoEKGLlzqzICgb5CQb2Je6ZU7g0mXogAmjR5mWnJ3uwB3Dp65nxu4kEKGIZ9xN2tN9jJy5OJ6txfYm57TEDGNPwCdm0otzJTLCzX+T31uMwfJwEmNpP2NLHNu2/y453/0gEw/oSe3MK16dTD2Sqf+/N78diN3qtCDDlMG7qY2v33mWHTg6Y1ZeY294YAhw7Ozi1P19L1IIA0/yEXdxpfMeQWUAQwJAlAClUtHOrdwL8fW3GpBPGnlFOIIDp8lh3dT19EwiAJe4PprWdKziBRoWBALaB1/JpEhsothMAdYJY8w3dDhZh4HkDBuIL7J7t+qDfWgKg57BRYV85uO0xA3SQD0SCl9ZkRP9eWwjwyrqM8bUABXQYkwySpU0xhb62Lcs6z5u7E4idPpUDIn8ypeOYSAYZkg5esTPLPr0yIu2+gd1CnA3QTcvGSYA0B6IY2TpfXNLQxo5a30BDyluKI2HPUA+kCHj/qNlDDl0WKsGxevd49LAxqvGxPM2XjBV+AJpNYp/DpJ1AURBiUkkYvP9i9S9yAnjTZX+DaffoJ+H9g7CGR1j3nEKDCIS12OLGd6HGwaRoQJSEmVYU+rfVHhu+/2MR6LWbo+JMQGUmO6Lo4kSIsDFMWKfSNRRLWWnJOdrPm3aAVBSFmlgWXt7sEQc4kB+QKRBv5Pb2e7ERAIUqssbROL629eDMMSzZbFiZeLEs3NSDISjhLpeh4Umx7ssaMiD+bpMUaOgQAE6b7DYxjAkdS7ouzoxScFUdtT7LMe1giIlHw/AmORn/g6AoFlWps0OdP7p7hiUA/AuVUi74A+gU4vf5KC2XOYkkBCg9Gmbq4VBMm0gRBwkqgGX7B1A+PO+ggpKgsO4vK+VhHXwBVAAFkQuhqqk3kE07HGry8XDU5FcStIWHl40Zo9LnwH9AXZ6MAHBCZUe8EaLiFLBsL2LVbjOrgWccDze5QQTeQpX27zj6tV3hJM4r6zPsg5Lpemr7lv9eRiIA5V4dCruR+wxuLz+jQYTpLWIwHQ8MqZ0P/Pb7MdYiuQMYpMLOI87vIcRU2ZrFUnPwhNp+A7arTb5xzLdFjOlNorCTpio4+o0zhSBOpc+EZy+LKJDD33lYLyNpYPXvNPg2ibKhTRzqA3QE9wUiHAzTtgXx/po9+jUJpreTD2wTlw8HzW4UCY/e7wpYmSCc1NmDRxQQpioJOQzTbxgLbBSZXwbMbxWLmDtsj8B/3RiteA8gMnr7QtYlItEjW3JMQMVWsflZwL1OPUgZEM6FFWwrI2dQWp+H4o3NB/S2kMuBo+zUepFB2ixaEMCSdvFf/Lvy+UGZIKpAW5hiNBDF+Cae+/MlgEq7eFsujMAWbdSegdXoEoZNKFmewAwoXhhRWAasuDIGTRuitI57kNrFK18ZA7Hp0qgPz4RvHhmVACZV90ihc2lUfhYwr3GEHxrS4XsIRiEAchQmVfdUgva1cRCbLo58sayKKG4CIOdvWnVPxZckzMWRYhYwsFAkCDpXxkYlgHHVPRUQ+upYQQDLLo/W7SkYhgAoOaN+Ti0CRLk8GpJIOQeoH0IVSOfeCagiqgYBUH1sYnVPILjtIhkf0pDOPM6diAHyh1EEpufxClVEYQmA4o9Gi66Mhc1gu8gEgCTT7iLqB9KBrIooDAGM7fUXRABus6oYH5JOs4e5M/EN9UNpsF+0gq8WAd4zuLrH9/m5rWCzqhEAkkw7c23YIi4CmTl0EI1KAFHdY9UVsW4Otqqq8UtIsJz+AdWBJhNRCYD0M/Vz6AA2isX4kPxS4JyjfkgdVKoikhHgrfctC/m4bao+9ZfLwpbMEwlDGkupoFIVUSUCtJ80v7qnDB5sE6vxi5Jsdp+2yR9AFdCoTxVREAEwaxjTy08JfN3nNqmJ8adIkHJb6R9cHbt9qoiCCIBOJNTj1QFsUVPjQ/ha8xCPNfdRP7wOcFmUjAC7j9hR3TNlfG4D2KLmBCiQ4JFEyu2iVoIqyquIyglgT3VPAVz3gSXetZJEq/tossm9TK4MRbSWVBGVEwDtXqjHpwqhc657UuMXZUF64DHuiPRSK0UVOLJdTgCcPKIelzrcXuic2u7TJNmSfdIWEhSriIoEsKm6BzqGrqnt7StgpS3LAc7to+MIqntMvM/HD9CtcW9+uWBdssUxxDk+dPGiHocSoFNT1nyZiIOmloWIJqMQ6tF6+7oi9gnEZpE9O4bmwc1Bh2RxfjUkv21sT+7AIHg1396NS5CksC2LSAnoqmaJnVqJSCWLeoLZJSEYophjeewpXUpBtYpN5WW1AnQSWyWPaQKGc7Y32lRtHJvhhQ7cxrp+64NElJw3OW3URqB76522qpVu2yw4vWLTMbTohne7I5/YqUfBIUZbTiWHMjx/ttAHNR8kwVn2fJOKeogYxGZOu/b5/FnJt6vJ9yyyI8tYZvhejF25LcusVBa0N0OPO5ObWWJsGKO0FdushBckRdDqFP1u0fSYsss5vluMgY8FY7IuYVMPgrbn6H2PCxBEJBHn9Tf8s4UHz78L3zmj5fqsmCG4DAk3YiWbvGfFvYgpdz888EJL/J7Chdkerk8XEP8Wv+vJzyo8EsHf8L/FZ+Czpi5YqjP5P2ey0rAsl+yGAAAAAElFTkSuQmCC";

var arbitrumLogoUrl = "data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3C!DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%220%200%20470.287%20514.251%22%20enable-background%3D%22new%200%200%20470.287%20514.251%22%20xml%3Aspace%3D%22preserve%22%3E%3Cg%20id%3D%22Background%22%3E%3C%2Fg%3E%3Cg%20id%3D%22Logos_and_symbols%22%3E%20%3Cg%20id%3D%22SYMBOL_VER_3%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_3_3_%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_4%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_4_1_%22%3E%20%20%3Cg%20id%3D%22SYMBOL_VER_4_3_%22%3E%20%20%3C%2Fg%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_5_1_%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22off_2_1_%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22VER_3_1_%22%3E%20%20%3Cg%20id%3D%22SYMBOL_VER_2_1_%22%3E%20%20%3C%2Fg%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22VER_3%22%3E%20%20%3Cg%20id%3D%22SYMBOL_VER_2%22%3E%20%20%3C%2Fg%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22off_2%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_5%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_1%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_1_1_%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_1-1_3_%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_1-1_2_%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_1-1%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_1-1_1_%22%3E%20%20%3Cg%20id%3D%22_x31_-3%22%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22Symbol_-_Original_14_%22%3E%20%20%20%3Cpath%20fill%3D%22%232D374B%22%20d%3D%22M291.134%2C237.469l35.654-60.5l96.103%2C149.684l0.046%2C28.727l-0.313-197.672%20%20%20%20c-0.228-4.832-2.794-9.252-6.887-11.859L242.715%2C46.324c-4.045-1.99-9.18-1.967-13.22%2C0.063c-0.546%2C0.272-1.06%2C0.57-1.548%2C0.895%20%20%20%20l-0.604%2C0.379L59.399%2C144.983l-0.651%2C0.296c-0.838%2C0.385-1.686%2C0.875-2.48%2C1.444c-3.185%2C2.283-5.299%2C5.66-5.983%2C9.448%20%20%20%20c-0.103%2C0.574-0.179%2C1.158-0.214%2C1.749l0.264%2C161.083l89.515-138.745c11.271-18.397%2C35.825-24.323%2C58.62-24.001l26.753%2C0.706%20%20%20%20L67.588%2C409.765l18.582%2C10.697L245.692%2C157.22l70.51-0.256L157.091%2C426.849l66.306%2C38.138l7.922%2C4.556%20%20%20%20c3.351%2C1.362%2C7.302%2C1.431%2C10.681%2C0.21l175.453-101.678l-33.544%2C19.438L291.134%2C237.469z%20M304.736%2C433.395l-66.969-105.108%20%20%20%20l40.881-69.371l87.952%2C138.628L304.736%2C433.395z%22%2F%3E%20%20%20%3Cpolygon%20fill%3D%22%2328A0F0%22%20points%3D%22237.768%2C328.286%20304.736%2C433.395%20366.601%2C397.543%20278.648%2C258.915%20%20%20%20%22%2F%3E%20%20%20%3Cpath%20fill%3D%22%2328A0F0%22%20d%3D%22M422.937%2C355.379l-0.046-28.727l-96.103-149.684l-35.654%2C60.5l92.774%2C150.043l33.544-19.438%20%20%20%20c3.29-2.673%2C5.281-6.594%2C5.49-10.825L422.937%2C355.379z%22%2F%3E%20%20%20%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M20.219%2C382.469l47.369%2C27.296l157.634-252.801l-26.753-0.706c-22.795-0.322-47.35%2C5.604-58.62%2C24.001%20%20%20%20L50.334%2C319.004l-30.115%2C46.271V382.469z%22%2F%3E%20%20%20%3Cpolygon%20fill%3D%22%23FFFFFF%22%20points%3D%22316.202%2C156.964%20245.692%2C157.22%2086.17%2C420.462%20141.928%2C452.565%20157.091%2C426.849%20%20%20%20%22%2F%3E%20%20%20%3Cpath%20fill%3D%22%2396BEDC%22%20d%3D%22M452.65%2C156.601c-0.59-14.746-8.574-28.245-21.08-36.104L256.28%2C19.692%20%20%20%20c-12.371-6.229-27.825-6.237-40.218-0.004c-1.465%2C0.739-170.465%2C98.752-170.465%2C98.752c-2.339%2C1.122-4.592%2C2.458-6.711%2C3.975%20%20%20%20c-11.164%2C8.001-17.969%2C20.435-18.668%2C34.095v208.765l30.115-46.271L50.07%2C157.921c0.035-0.589%2C0.109-1.169%2C0.214-1.741%20%20%20%20c0.681-3.79%2C2.797-7.171%2C5.983-9.456c0.795-0.569%2C172.682-100.064%2C173.228-100.337c4.04-2.029%2C9.175-2.053%2C13.22-0.063%20%20%20%20l173.022%2C99.523c4.093%2C2.607%2C6.659%2C7.027%2C6.887%2C11.859v199.542c-0.209%2C4.231-1.882%2C8.152-5.172%2C10.825l-33.544%2C19.438%20%20%20%20l-17.308%2C10.031l-61.864%2C35.852l-62.737%2C36.357c-3.379%2C1.221-7.33%2C1.152-10.681-0.21l-74.228-42.693l-15.163%2C25.717%20%20%20%20l66.706%2C38.406c2.206%2C1.255%2C4.171%2C2.367%2C5.784%2C3.272c2.497%2C1.4%2C4.199%2C2.337%2C4.8%2C2.629c4.741%2C2.303%2C11.563%2C3.643%2C17.71%2C3.643%20%20%20%20c5.636%2C0%2C11.132-1.035%2C16.332-3.072l182.225-105.531c10.459-8.104%2C16.612-20.325%2C17.166-33.564V156.601z%22%2F%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22Symbol_-_Original_13_%22%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22Symbol_-_Original_6_%22%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22Symbol_-_Original_4_%22%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22One_color_version_-_White_3_%22%3E%20%20%20%3Cg%20id%3D%22Symbol_-_Original_15_%22%3E%20%20%20%3C%2Fg%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22One_color_version_-_White%22%3E%20%20%20%3Cg%20id%3D%22Symbol_-_Original%22%3E%20%20%20%3C%2Fg%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22Symbol_-_Monochromatic_3_%22%3E%20%20%20%3Cg%20id%3D%22_x33__7_%22%3E%20%20%20%3C%2Fg%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22Symbol_-_Monochromatic%22%3E%20%20%20%3Cg%20id%3D%22_x33__3_%22%3E%20%20%20%3C%2Fg%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22_x33__2_%22%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22_x33__1_%22%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22_x33_%22%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22Symbol_-_Original_10_%22%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22Symbol_-_Original_1_%22%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22Symbol_-_Original_2_%22%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22_x34__1_%22%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22Symbol_-_Monochromatic_2_%22%3E%20%20%20%3Cg%20id%3D%22_x33__6_%22%3E%20%20%20%3C%2Fg%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22One_color_version_-_White_2_%22%3E%20%20%20%3Cg%20id%3D%22Symbol_-_Original_11_%22%3E%20%20%20%3C%2Fg%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22Symbol_-_Original_5_%22%3E%20%20%20%3Cg%20id%3D%22Symbol_-_Original_12_%22%3E%20%20%20%3C%2Fg%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22One_color_version_-_White_1_%22%3E%20%20%20%3Cg%20id%3D%22Symbol_-_Original_9_%22%3E%20%20%20%3C%2Fg%3E%20%20%3C%2Fg%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_1_2_%22%3E%20%20%3Cg%20id%3D%22SYMBOL_VER_2_4_%22%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22SYMBOL_VER_2-1-1_1_%22%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22SYMBOL_VER_2-2-1_1_%22%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22SYMBOL_VER_2-3-1_4_%22%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22New_Symbol_1_%22%3E%20%20%20%3Cg%20id%3D%22SYMBOL_VER_2-3-1_3_%22%3E%20%20%20%3C%2Fg%3E%20%20%3C%2Fg%3E%20%20%3Cg%20id%3D%22New_Symbol%22%3E%20%20%20%3Cg%20id%3D%22SYMBOL_VER_2-3-1_1_%22%3E%20%20%20%3C%2Fg%3E%20%20%3C%2Fg%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_2_2_%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_4_2_%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_3_2_%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_3_1_%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_1-1-1_1_%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_1-1-1%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_1-1-1_2_2_%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_1-1-1_2%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_1-1-1_2_1_%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22Symbol_-_Original_7_%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22Symbol_-_Original_8_%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_2-1-1%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_2-2-1%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_2-3-1%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_5-1_1_%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_5-1%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_5-2_1_%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22SYMBOL_VER_5-2%22%3E%20%3C%2Fg%3E%20%3Cg%20id%3D%22Symbol_-_Monochromatic_1_%22%3E%20%20%3Cg%20id%3D%22_x33__4_%22%3E%20%20%3C%2Fg%3E%20%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";

var optimismLogoUrl = "data:image/svg+xml,%3Csvg%20width%3D%22170%22%20height%3D%22168%22%20viewBox%3D%220%200%20170%20168%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url%28%23clip0%29%22%3E%3Cpath%20opacity%3D%220.6%22%20d%3D%22M85.05%20168C132.022%20168%20170.1%20130.105%20170.1%2083.3593C170.1%2036.6135%200%2036.6135%200%2083.3593C0%20130.105%2038.0782%20168%2085.05%20168Z%22%20fill%3D%22%23FF505F%22%2F%3E%3Cpath%20opacity%3D%220.6%22%20d%3D%22M85.05%20168C132.022%20168%20170.1%20130.105%20170.1%2083.3593C170.1%2036.6135%200%2036.6135%200%2083.3593C0%20130.105%2038.0782%20168%2085.05%20168Z%22%20fill%3D%22%23FF0320%22%2F%3E%3Cpath%20d%3D%22M85.05%200C132.022%200%20170.1%2037.8949%20170.1%2084.6407C170.1%20131.386%200%20131.386%200%2084.6407C0%2037.8949%2038.0782%200%2085.05%200Z%22%20fill%3D%22white%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M144.665%2064.0394L112.444%2012.3742L89.0263%2078.9477L144.665%2064.0394Z%22%20fill%3D%22%23FF4E65%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M143.777%2064.215L112.444%2012.3742L165.349%2058.4347L143.777%2064.215Z%22%20fill%3D%22white%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M144.551%2063.613L142.479%20124.467L88.912%2078.5213L144.551%2063.613Z%22%20fill%3D%22%23D0001A%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M143.663%2063.7886L142.479%20124.467L165.235%2058.0083L143.663%2063.7886Z%22%20fill%3D%22%23FF697B%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CclipPath%20id%3D%22clip0%22%3E%3Crect%20width%3D%22170%22%20height%3D%22168%22%20fill%3D%22white%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E";

const UNI_LIST = 'https://tokens.uniswap.org';
const AAVE_LIST = 'tokenlist.aave.eth';
const BA_LIST = 'https://raw.githubusercontent.com/The-Blockchain-Association/sec-notice-list/master/ba-sec-list.json';
const CMC_ALL_LIST = 'https://api.coinmarketcap.com/data-api/v3/uniswap/all.json';
const COINGECKO_LIST = 'https://tokens.coingecko.com/uniswap/all.json';
const COMPOUND_LIST = 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json';
const GEMINI_LIST = 'https://www.gemini.com/uniswap/manifest.json';
const ARBITRUM_LIST = 'https://bridge.arbitrum.io/token-list-42161.json';
const KLEROS_LIST = 't2crtokens.eth';
const OPTIMISM_LIST = 'https://static.optimism.io/optimism.tokenlist.json';
const ROLL_LIST = 'https://app.tryroll.com/tokens.json';
const SET_LIST = 'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/set.tokenlist.json';
const WRAPPED_LIST = 'wrapped.tokensoft.eth';
const UNSUPPORTED_LIST_URLS = [BA_LIST];
// this is the default list of lists that are exposed to users
// lower index == higher priority for token import
const DEFAULT_LIST_OF_LISTS_TO_DISPLAY = [
    UNI_LIST,
    COMPOUND_LIST,
    AAVE_LIST,
    CMC_ALL_LIST,
    COINGECKO_LIST,
    KLEROS_LIST,
    GEMINI_LIST,
    WRAPPED_LIST,
    SET_LIST,
    ROLL_LIST,
    ARBITRUM_LIST,
    OPTIMISM_LIST,
];
const DEFAULT_LIST_OF_LISTS = [
    ...DEFAULT_LIST_OF_LISTS_TO_DISPLAY,
    ...UNSUPPORTED_LIST_URLS, // need to load dynamic unsupported tokens as well
];
// default lists to be 'active' aka searched across
const DEFAULT_ACTIVE_LIST_URLS = [UNI_LIST, GEMINI_LIST];

var SupportedChainId;
(function (SupportedChainId) {
    SupportedChainId[SupportedChainId["MAINNET"] = 1] = "MAINNET";
    SupportedChainId[SupportedChainId["ROPSTEN"] = 3] = "ROPSTEN";
    SupportedChainId[SupportedChainId["RINKEBY"] = 4] = "RINKEBY";
    SupportedChainId[SupportedChainId["GOERLI"] = 5] = "GOERLI";
    SupportedChainId[SupportedChainId["KOVAN"] = 42] = "KOVAN";
    SupportedChainId[SupportedChainId["ARBITRUM_ONE"] = 42161] = "ARBITRUM_ONE";
    SupportedChainId[SupportedChainId["ARBITRUM_RINKEBY"] = 421611] = "ARBITRUM_RINKEBY";
    SupportedChainId[SupportedChainId["OPTIMISM"] = 10] = "OPTIMISM";
    SupportedChainId[SupportedChainId["OPTIMISTIC_KOVAN"] = 69] = "OPTIMISTIC_KOVAN";
})(SupportedChainId || (SupportedChainId = {}));
const ALL_SUPPORTED_CHAIN_IDS = [
    SupportedChainId.MAINNET,
    SupportedChainId.ROPSTEN,
    SupportedChainId.RINKEBY,
    SupportedChainId.GOERLI,
    SupportedChainId.KOVAN,
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.ARBITRUM_RINKEBY,
    SupportedChainId.OPTIMISM,
    SupportedChainId.OPTIMISTIC_KOVAN,
];
const L1_CHAIN_IDS = [
    SupportedChainId.MAINNET,
    SupportedChainId.ROPSTEN,
    SupportedChainId.RINKEBY,
    SupportedChainId.GOERLI,
    SupportedChainId.KOVAN,
];
const L2_CHAIN_IDS = [
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.ARBITRUM_RINKEBY,
    SupportedChainId.OPTIMISM,
    SupportedChainId.OPTIMISTIC_KOVAN,
];
const CHAIN_INFO = {
    [SupportedChainId.ARBITRUM_ONE]: {
        blockWaitMsBeforeWarning: ms `10m`,
        bridge: 'https://bridge.arbitrum.io/',
        defaultListUrl: ARBITRUM_LIST,
        docs: 'https://offchainlabs.com/',
        explorer: 'https://arbiscan.io/',
        infoLink: 'https://info.uniswap.org/#/arbitrum/',
        label: 'Arbitrum',
        logoUrl: arbitrumLogoUrl,
        nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
        rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    },
    [SupportedChainId.ARBITRUM_RINKEBY]: {
        blockWaitMsBeforeWarning: ms `10m`,
        bridge: 'https://bridge.arbitrum.io/',
        defaultListUrl: ARBITRUM_LIST,
        docs: 'https://offchainlabs.com/',
        explorer: 'https://rinkeby-explorer.arbitrum.io/',
        infoLink: 'https://info.uniswap.org/#/arbitrum/',
        label: 'Arbitrum Rinkeby',
        logoUrl: arbitrumLogoUrl,
        nativeCurrency: { name: 'Rinkeby ArbETH', symbol: 'rinkArbETH', decimals: 18 },
        rpcUrls: ['https://rinkeby.arbitrum.io/rpc'],
    },
    [SupportedChainId.MAINNET]: {
        docs: 'https://docs.uniswap.org/',
        explorer: 'https://etherscan.io/',
        infoLink: 'https://info.uniswap.org/#/',
        label: 'Ethereum',
        logoUrl: EthereumLogo,
        nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    },
    [SupportedChainId.RINKEBY]: {
        docs: 'https://docs.uniswap.org/',
        explorer: 'https://rinkeby.etherscan.io/',
        infoLink: 'https://info.uniswap.org/#/',
        label: 'Rinkeby',
        nativeCurrency: { name: 'Rinkeby ETH', symbol: 'rinkETH', decimals: 18 },
    },
    [SupportedChainId.ROPSTEN]: {
        docs: 'https://docs.uniswap.org/',
        explorer: 'https://ropsten.etherscan.io/',
        infoLink: 'https://info.uniswap.org/#/',
        label: 'Ropsten',
        nativeCurrency: { name: 'Ropsten ETH', symbol: 'ropETH', decimals: 18 },
    },
    [SupportedChainId.KOVAN]: {
        docs: 'https://docs.uniswap.org/',
        explorer: 'https://kovan.etherscan.io/',
        infoLink: 'https://info.uniswap.org/#/',
        label: 'Kovan',
        nativeCurrency: { name: 'Kovan ETH', symbol: 'kovETH', decimals: 18 },
    },
    [SupportedChainId.GOERLI]: {
        docs: 'https://docs.uniswap.org/',
        explorer: 'https://goerli.etherscan.io/',
        infoLink: 'https://info.uniswap.org/#/',
        label: 'Görli',
        nativeCurrency: { name: 'Görli ETH', symbol: 'görETH', decimals: 18 },
    },
    [SupportedChainId.OPTIMISM]: {
        blockWaitMsBeforeWarning: ms `15m`,
        bridge: 'https://gateway.optimism.io/',
        defaultListUrl: OPTIMISM_LIST,
        docs: 'https://optimism.io/',
        explorer: 'https://optimistic.etherscan.io/',
        infoLink: 'https://info.uniswap.org/#/optimism/',
        label: 'OΞ',
        logoUrl: optimismLogoUrl,
        nativeCurrency: { name: 'Optimistic ETH', symbol: 'ETH', decimals: 18 },
        rpcUrls: ['https://mainnet.optimism.io'],
    },
    [SupportedChainId.OPTIMISTIC_KOVAN]: {
        blockWaitMsBeforeWarning: ms `15m`,
        bridge: 'https://gateway.optimism.io/',
        defaultListUrl: OPTIMISM_LIST,
        docs: 'https://optimism.io/',
        explorer: 'https://optimistic.etherscan.io/',
        infoLink: 'https://info.uniswap.org/#/optimism/',
        label: 'Optimistic Kovan',
        rpcUrls: ['https://kovan.optimism.io'],
        logoUrl: optimismLogoUrl,
        nativeCurrency: { name: 'Optimistic kovETH', symbol: 'kovOpETH', decimals: 18 },
    },
};
const ARBITRUM_HELP_CENTER_LINK = 'https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum';
const OPTIMISM_HELP_CENTER_LINK = 'https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ';

const NETWORK_POLLING_INTERVALS = {
    [SupportedChainId.ARBITRUM_ONE]: ms `1s`,
    [SupportedChainId.ARBITRUM_RINKEBY]: ms `1s`,
    [SupportedChainId.OPTIMISM]: ms `1s`,
    [SupportedChainId.OPTIMISTIC_KOVAN]: ms `1s`,
};
function getLibrary(provider) {
    const library = new Web3Provider(provider, typeof provider.chainId === 'number'
        ? provider.chainId
        : typeof provider.chainId === 'string'
            ? parseInt(provider.chainId)
            : 'any');
    library.pollingInterval = 15000;
    library.detectNetwork().then((network) => {
        const networkPollingInterval = NETWORK_POLLING_INTERVALS[network.chainId];
        if (networkPollingInterval) {
            console.debug('Setting polling interval', networkPollingInterval);
            library.pollingInterval = networkPollingInterval;
        }
    });
    return library;
}

const OVERLAY_READY = 'OVERLAY_READY';
const CHAIN_ID_NETWORK_ARGUMENT = {
    1: undefined,
    3: 'ropsten',
    4: 'rinkeby',
    42: 'kovan',
};
class FortmaticConnector extends FortmaticConnector$1 {
    activate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.fortmatic) {
                const { default: Fortmatic } = yield Promise.resolve().then(function () { return fortmatic$1; });
                const { apiKey, chainId } = this;
                if (chainId in CHAIN_ID_NETWORK_ARGUMENT) {
                    this.fortmatic = new Fortmatic(apiKey, CHAIN_ID_NETWORK_ARGUMENT[chainId]);
                }
                else {
                    throw new Error(`Unsupported network ID: ${chainId}`);
                }
            }
            const provider = this.fortmatic.getProvider();
            const pollForOverlayReady = new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (provider.overlayReady) {
                        clearInterval(interval);
                        this.emit(OVERLAY_READY);
                        resolve();
                    }
                }, 200);
            });
            const [account] = yield Promise.all([
                provider.enable().then((accounts) => accounts[0]),
                pollForOverlayReady,
            ]);
            return { provider: this.fortmatic.getProvider(), chainId: this.chainId, account };
        });
    }
}

class RequestError extends Error {
    constructor(message, code, data) {
        super(message);
        this.code = code;
        this.data = data;
    }
}
class MiniRpcProvider {
    constructor(chainId, url, batchWaitTimeMs) {
        this.isMetaMask = false;
        this.nextId = 1;
        this.batchTimeoutId = null;
        this.batch = [];
        this.clearBatch = () => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            console.debug('Clearing batch', this.batch);
            const batch = this.batch;
            this.batch = [];
            this.batchTimeoutId = null;
            let response;
            try {
                response = yield fetch(this.url, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json', accept: 'application/json' },
                    body: JSON.stringify(batch.map((item) => item.request)),
                });
            }
            catch (error) {
                batch.forEach(({ reject }) => reject(new Error('Failed to send batch call')));
                return;
            }
            if (!response.ok) {
                batch.forEach(({ reject }) => reject(new RequestError(`${response.status}: ${response.statusText}`, -32000)));
                return;
            }
            let json;
            try {
                json = yield response.json();
            }
            catch (error) {
                batch.forEach(({ reject }) => reject(new Error('Failed to parse JSON response')));
                return;
            }
            const byKey = batch.reduce((memo, current) => {
                memo[current.request.id] = current;
                return memo;
            }, {});
            for (const result of json) {
                const { resolve, reject, request: { method }, } = byKey[result.id];
                if ('error' in result) {
                    reject(new RequestError((_a = result === null || result === void 0 ? void 0 : result.error) === null || _a === void 0 ? void 0 : _a.message, (_b = result === null || result === void 0 ? void 0 : result.error) === null || _b === void 0 ? void 0 : _b.code, (_c = result === null || result === void 0 ? void 0 : result.error) === null || _c === void 0 ? void 0 : _c.data));
                }
                else if ('result' in result && resolve) {
                    resolve(result.result);
                }
                else {
                    reject(new RequestError(`Received unexpected JSON-RPC response to ${method} request.`, -32000, result));
                }
            }
        });
        this.sendAsync = (request, callback) => {
            this.request(request.method, request.params)
                .then((result) => callback(null, { jsonrpc: '2.0', id: request.id, result }))
                .catch((error) => callback(error, null));
        };
        this.request = (method, params) => __awaiter(this, void 0, void 0, function* () {
            var _d;
            if (typeof method !== 'string') {
                return this.request(method.method, method.params);
            }
            if (method === 'eth_chainId') {
                return `0x${this.chainId.toString(16)}`;
            }
            const promise = new Promise((resolve, reject) => {
                this.batch.push({
                    request: {
                        jsonrpc: '2.0',
                        id: this.nextId++,
                        method,
                        params,
                    },
                    resolve,
                    reject,
                });
            });
            this.batchTimeoutId = (_d = this.batchTimeoutId) !== null && _d !== void 0 ? _d : setTimeout(this.clearBatch, this.batchWaitTimeMs);
            return promise;
        });
        this.chainId = chainId;
        this.url = url;
        const parsed = new URL(url);
        this.host = parsed.host;
        this.path = parsed.pathname;
        // how long to wait to batch calls
        this.batchWaitTimeMs = batchWaitTimeMs !== null && batchWaitTimeMs !== void 0 ? batchWaitTimeMs : 50;
    }
}
class NetworkConnector extends AbstractConnector {
    constructor({ urls, defaultChainId }) {
        invariant(defaultChainId || Object.keys(urls).length === 1, 'defaultChainId is a required argument with >1 url');
        super({ supportedChainIds: Object.keys(urls).map((k) => Number(k)) });
        this.currentChainId = defaultChainId || Number(Object.keys(urls)[0]);
        this.providers = Object.keys(urls).reduce((accumulator, chainId) => {
            accumulator[Number(chainId)] = new MiniRpcProvider(Number(chainId), urls[Number(chainId)]);
            return accumulator;
        }, {});
    }
    get provider() {
        return this.providers[this.currentChainId];
    }
    activate() {
        return __awaiter(this, void 0, void 0, function* () {
            return { provider: this.providers[this.currentChainId], chainId: this.currentChainId, account: null };
        });
    }
    getProvider() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.providers[this.currentChainId];
        });
    }
    getChainId() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.currentChainId;
        });
    }
    getAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    deactivate() {
        return;
    }
}

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
const FORMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY;
const PORTIS_ID = process.env.REACT_APP_PORTIS_ID;
if (typeof INFURA_KEY === 'undefined') {
    throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`);
}
const NETWORK_URLS = {
    [SupportedChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
    [SupportedChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
    [SupportedChainId.ROPSTEN]: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
    [SupportedChainId.GOERLI]: `https://goerli.infura.io/v3/${INFURA_KEY}`,
    [SupportedChainId.KOVAN]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
    [SupportedChainId.OPTIMISM]: `https://optimism-mainnet.infura.io/v3/${INFURA_KEY}`,
    [SupportedChainId.OPTIMISTIC_KOVAN]: `https://optimism-kovan.infura.io/v3/${INFURA_KEY}`,
    [SupportedChainId.ARBITRUM_ONE]: `https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY}`,
    [SupportedChainId.ARBITRUM_RINKEBY]: `https://arbitrum-rinkeby.infura.io/v3/${INFURA_KEY}`,
};
const network = new NetworkConnector({
    urls: NETWORK_URLS,
    defaultChainId: 1,
});
let networkLibrary;
function getNetworkLibrary() {
    return (networkLibrary = networkLibrary !== null && networkLibrary !== void 0 ? networkLibrary : getLibrary(network.provider));
}
const injected = new InjectedConnector({
    supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
});
const gnosisSafe = new SafeAppConnector();
const walletconnect = new WalletConnectConnector({
    supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
    rpc: NETWORK_URLS,
    qrcode: true,
});
// mainnet only
const fortmatic$2 = new FortmaticConnector({
    apiKey: FORMATIC_KEY !== null && FORMATIC_KEY !== void 0 ? FORMATIC_KEY : '',
    chainId: 1,
});
// mainnet only
const portis = new PortisConnector({
    dAppId: PORTIS_ID !== null && PORTIS_ID !== void 0 ? PORTIS_ID : '',
    networks: [1],
});
// mainnet only
const walletlink = new WalletLinkConnector({
    url: NETWORK_URLS[SupportedChainId.MAINNET],
    appName: 'Uniswap',
    appLogoUrl: UNISWAP_LOGO_URL,
});

const NetworkContextName = 'NETWORK';
const IS_IN_IFRAME = window.parent !== window;
// 30 minutes, denominated in seconds
const DEFAULT_DEADLINE_FROM_NOW = 60 * 30;
const L2_DEADLINE_FROM_NOW = 60 * 5;
// transaction popup dismisal amounts
const DEFAULT_TXN_DISMISS_MS = 25000;
const L2_TXN_DISMISS_MS = 5000;
// used for rewards deadlines
JSBI.BigInt(60 * 60 * 24 * 7);
JSBI.BigInt(0);
// one basis JSBI.BigInt
const BIPS_BASE = JSBI.BigInt(10000);
new Percent(JSBI.BigInt(1), BIPS_BASE);
// used for warning states
const ALLOWED_PRICE_IMPACT_LOW = new Percent(JSBI.BigInt(100), BIPS_BASE); // 1%
const ALLOWED_PRICE_IMPACT_MEDIUM = new Percent(JSBI.BigInt(300), BIPS_BASE); // 3%
const ALLOWED_PRICE_IMPACT_HIGH = new Percent(JSBI.BigInt(500), BIPS_BASE); // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN = new Percent(JSBI.BigInt(1000), BIPS_BASE); // 10%
// for non expert mode disable swaps above this
const BLOCKED_PRICE_IMPACT_NON_EXPERT = new Percent(JSBI.BigInt(1500), BIPS_BASE); // 15%
const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), BIPS_BASE);
const ZERO_PERCENT = new Percent('0');
const TWO_PERCENT = new Percent(JSBI.BigInt(200), BIPS_BASE);
const ONE_HUNDRED_PERCENT$1 = new Percent('1');

const parser = new UAParser(window.navigator.userAgent);
const { type: type$1 } = parser.getDevice();
const userAgent = parser.getResult();
const isMobile = type$1 === 'mobile' || type$1 === 'tablet';

function useActiveWeb3React() {
    const context = useWeb3React();
    const contextNetwork = useWeb3React(NetworkContextName);
    return context.active ? context : contextNetwork;
}
function useEagerConnect() {
    const { activate, active } = useWeb3React();
    const [tried, setTried] = useState(false);
    // gnosisSafe.isSafeApp() races a timeout against postMessage, so it delays pageload if we are not in a safe app;
    // if we are not embedded in an iframe, it is not worth checking
    const [triedSafe, setTriedSafe] = useState(!IS_IN_IFRAME);
    // first, try connecting to a gnosis safe
    useEffect(() => {
        if (!triedSafe) {
            gnosisSafe.isSafeApp().then((loadedInSafe) => {
                if (loadedInSafe) {
                    activate(gnosisSafe, undefined, true).catch(() => {
                        setTriedSafe(true);
                    });
                }
                else {
                    setTriedSafe(true);
                }
            });
        }
    }, [activate, setTriedSafe, triedSafe]);
    // then, if that fails, try connecting to an injected connector
    useEffect(() => {
        if (!active && triedSafe) {
            injected.isAuthorized().then((isAuthorized) => {
                if (isAuthorized) {
                    activate(injected, undefined, true).catch(() => {
                        setTried(true);
                    });
                }
                else {
                    if (isMobile && window.ethereum) {
                        activate(injected, undefined, true).catch(() => {
                            setTried(true);
                        });
                    }
                    else {
                        setTried(true);
                    }
                }
            });
        }
    }, [activate, active, triedSafe]);
    // wait until we get confirmation of a connection to flip the flag
    useEffect(() => {
        if (active) {
            setTried(true);
        }
    }, [active]);
    return tried;
}
/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
function useInactiveListener(suppress = false) {
    const { active, error, activate } = useWeb3React();
    useEffect(() => {
        const { ethereum } = window;
        if (ethereum && ethereum.on && !active && !error && !suppress) {
            const handleChainChanged = () => {
                // eat errors
                activate(injected, undefined, true).catch((error) => {
                    console.error('Failed to activate after chain changed', error);
                });
            };
            const handleAccountsChanged = (accounts) => {
                if (accounts.length > 0) {
                    // eat errors
                    activate(injected, undefined, true).catch((error) => {
                        console.error('Failed to activate after accounts changed', error);
                    });
                }
            };
            ethereum.on('chainChanged', handleChainChanged);
            ethereum.on('accountsChanged', handleAccountsChanged);
            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener('chainChanged', handleChainChanged);
                    ethereum.removeListener('accountsChanged', handleAccountsChanged);
                }
            };
        }
        return undefined;
    }, [active, error, suppress, activate]);
}

var ApplicationModal;
(function (ApplicationModal) {
    ApplicationModal[ApplicationModal["WALLET"] = 0] = "WALLET";
    ApplicationModal[ApplicationModal["SETTINGS"] = 1] = "SETTINGS";
    ApplicationModal[ApplicationModal["SELF_CLAIM"] = 2] = "SELF_CLAIM";
    ApplicationModal[ApplicationModal["ADDRESS_CLAIM"] = 3] = "ADDRESS_CLAIM";
    ApplicationModal[ApplicationModal["CLAIM_POPUP"] = 4] = "CLAIM_POPUP";
    ApplicationModal[ApplicationModal["MENU"] = 5] = "MENU";
    ApplicationModal[ApplicationModal["DELEGATE"] = 6] = "DELEGATE";
    ApplicationModal[ApplicationModal["VOTE"] = 7] = "VOTE";
    ApplicationModal[ApplicationModal["POOL_OVERVIEW_OPTIONS"] = 8] = "POOL_OVERVIEW_OPTIONS";
    ApplicationModal[ApplicationModal["NETWORK_SELECTOR"] = 9] = "NETWORK_SELECTOR";
    ApplicationModal[ApplicationModal["PRIVACY_POLICY"] = 10] = "PRIVACY_POLICY";
})(ApplicationModal || (ApplicationModal = {}));
const initialState$8 = {
    blockNumber: {},
    chainId: null,
    implements3085: false,
    openModal: null,
    popupList: [],
};
const applicationSlice = createSlice({
    name: 'application',
    initialState: initialState$8,
    reducers: {
        updateChainId(state, action) {
            const { chainId } = action.payload;
            state.chainId = chainId;
        },
        updateBlockNumber(state, action) {
            const { chainId, blockNumber } = action.payload;
            if (typeof state.blockNumber[chainId] !== 'number') {
                state.blockNumber[chainId] = blockNumber;
            }
            else {
                state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId]);
            }
        },
        setOpenModal(state, action) {
            state.openModal = action.payload;
        },
        addPopup(state, { payload: { content, key, removeAfterMs = DEFAULT_TXN_DISMISS_MS } }) {
            state.popupList = (key ? state.popupList.filter((popup) => popup.key !== key) : state.popupList).concat([
                {
                    key: key || nanoid(),
                    show: true,
                    content,
                    removeAfterMs,
                },
            ]);
        },
        removePopup(state, { payload: { key } }) {
            state.popupList.forEach((p) => {
                if (p.key === key) {
                    p.show = false;
                }
            });
        },
        setImplements3085(state, { payload: { implements3085 } }) {
            state.implements3085 = implements3085;
        },
    },
});
const { updateChainId, updateBlockNumber, setOpenModal, addPopup, removePopup, setImplements3085 } = applicationSlice.actions;
var application = applicationSlice.reducer;

function useBlockNumber() {
    const { chainId } = useActiveWeb3React();
    return useAppSelector((state) => state.application.blockNumber[chainId !== null && chainId !== void 0 ? chainId : -1]);
}
function useModalOpen(modal) {
    const openModal = useAppSelector((state) => state.application.openModal);
    return openModal === modal;
}
function useToggleModal(modal) {
    const open = useModalOpen(modal);
    const dispatch = useAppDispatch();
    return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open]);
}
function useWalletModalToggle() {
    return useToggleModal(ApplicationModal.WALLET);
}
function useToggleSettingsMenu() {
    return useToggleModal(ApplicationModal.SETTINGS);
}
function useShowClaimPopup() {
    return useModalOpen(ApplicationModal.CLAIM_POPUP);
}
function useToggleShowClaimPopup() {
    return useToggleModal(ApplicationModal.CLAIM_POPUP);
}
function useToggleSelfClaimModal() {
    return useToggleModal(ApplicationModal.SELF_CLAIM);
}
function useTogglePrivacyPolicy() {
    return useToggleModal(ApplicationModal.PRIVACY_POLICY);
}
// returns a function that allows adding a popup
function useAddPopup() {
    const dispatch = useAppDispatch();
    return useCallback((content, key, removeAfterMs) => {
        dispatch(addPopup({ content, key, removeAfterMs: removeAfterMs !== null && removeAfterMs !== void 0 ? removeAfterMs : DEFAULT_TXN_DISMISS_MS }));
    }, [dispatch]);
}
// returns a function that allows removing a popup via its key
function useRemovePopup() {
    const dispatch = useAppDispatch();
    return useCallback((key) => {
        dispatch(removePopup({ key }));
    }, [dispatch]);
}
// get the list of active popups
function useActivePopups() {
    const list = useAppSelector((state) => state.application.popupList);
    return useMemo(() => list.filter((item) => item.show), [list]);
}

// Create a multicall instance with default settings
const multicall = createMulticall();

const { useMultipleContractSingleData: _useMultipleContractSingleData, useSingleCallResult: _useSingleCallResult, useSingleContractMultipleData: _useSingleContractMultipleData, useSingleContractWithCallData: _useSingleContractWithCallData, } = multicall.hooks;
function useMultipleContractSingleData(...args) {
    const { chainId, latestBlock } = useCallContext();
    return _useMultipleContractSingleData(chainId, latestBlock, ...args);
}
function useSingleCallResult(...args) {
    const { chainId, latestBlock } = useCallContext();
    return _useSingleCallResult(chainId, latestBlock, ...args);
}
function useSingleContractMultipleData(...args) {
    const { chainId, latestBlock } = useCallContext();
    return _useSingleContractMultipleData(chainId, latestBlock, ...args);
}
function useSingleContractWithCallData(...args) {
    const { chainId, latestBlock } = useCallContext();
    return _useSingleContractWithCallData(chainId, latestBlock, ...args);
}
function useCallContext() {
    const { chainId } = useActiveWeb3React();
    const latestBlock = useBlockNumber();
    return { chainId, latestBlock };
}

/**
 * Returns true if the string value is zero in hex
 * @param hexNumberString
 */
function isZero(hexNumberString) {
    return /^0x0*$/.test(hexNumberString);
}

var abi$6 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_rewardsDistribution",
				type: "address"
			},
			{
				internalType: "address",
				name: "_rewardsToken",
				type: "address"
			},
			{
				internalType: "address",
				name: "_stakingToken",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "reward",
				type: "uint256"
			}
		],
		name: "RewardAdded",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "reward",
				type: "uint256"
			}
		],
		name: "RewardPaid",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "Staked",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "user",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "Withdrawn",
		type: "event"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address"
			}
		],
		name: "earned",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "exit",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "getReward",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "getRewardForDuration",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "lastTimeRewardApplicable",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "lastUpdateTime",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "reward",
				type: "uint256"
			}
		],
		name: "notifyRewardAmount",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "periodFinish",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "rewardPerToken",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "rewardPerTokenStored",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "rewardRate",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "rewards",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "rewardsDistribution",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "rewardsDuration",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "rewardsToken",
		outputs: [
			{
				internalType: "contract IERC20",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "stake",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "stakeWithPermit",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "stakingToken",
		outputs: [
			{
				internalType: "contract IERC20",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "userRewardPerTokenPaid",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "withdraw",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	}
];

var abi$5 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "token_",
				type: "address"
			},
			{
				internalType: "bytes32",
				name: "merkleRoot_",
				type: "bytes32"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "index",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "Claimed",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "index",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "account",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			},
			{
				internalType: "bytes32[]",
				name: "merkleProof",
				type: "bytes32[]"
			}
		],
		name: "claim",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "index",
				type: "uint256"
			}
		],
		name: "isClaimed",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "merkleRoot",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "token",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];

var abi$4 = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Burn",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		name: "Mint",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Swap",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			}
		],
		name: "Sync",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		constant: true,
		inputs: [
		],
		name: "DOMAIN_SEPARATOR",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "MINIMUM_LIQUIDITY",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "PERMIT_TYPEHASH",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "burn",
		outputs: [
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "getReserves",
		outputs: [
			{
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			},
			{
				internalType: "uint32",
				name: "blockTimestampLast",
				type: "uint32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "initialize",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "kLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "mint",
		outputs: [
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "nonces",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "permit",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "price0CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "price1CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "skim",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "swap",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "sync",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "token0",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "token1",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	}
];

var abi$3 = [
	{
		inputs: [
		],
		name: "WETH",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountADesired",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBDesired",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "addLiquidity",
		outputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountTokenDesired",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "addLiquidityETH",
		outputs: [
			{
				internalType: "uint256",
				name: "amountToken",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveOut",
				type: "uint256"
			}
		],
		name: "getAmountIn",
		outputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveOut",
				type: "uint256"
			}
		],
		name: "getAmountOut",
		outputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			}
		],
		name: "getAmountsIn",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			}
		],
		name: "getAmountsOut",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "reserveB",
				type: "uint256"
			}
		],
		name: "quote",
		outputs: [
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "removeLiquidity",
		outputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "removeLiquidityETH",
		outputs: [
			{
				internalType: "uint256",
				name: "amountToken",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "removeLiquidityETHSupportingFeeOnTransferTokens",
		outputs: [
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "approveMax",
				type: "bool"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "removeLiquidityETHWithPermit",
		outputs: [
			{
				internalType: "uint256",
				name: "amountToken",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountTokenMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountETHMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "approveMax",
				type: "bool"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
		outputs: [
			{
				internalType: "uint256",
				name: "amountETH",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenA",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenB",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountAMin",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountBMin",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "bool",
				name: "approveMax",
				type: "bool"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "removeLiquidityWithPermit",
		outputs: [
			{
				internalType: "uint256",
				name: "amountA",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountB",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapETHForExactTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactETHForTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForETH",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountInMax",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapTokensForExactETH",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountInMax",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			}
		],
		name: "swapTokensForExactTokens",
		outputs: [
			{
				internalType: "uint256[]",
				name: "amounts",
				type: "uint256[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

var abi$2 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_factory",
				type: "address"
			},
			{
				internalType: "address",
				name: "_WETH9",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		inputs: [
		],
		name: "WETH9",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes",
				name: "path",
				type: "bytes"
			},
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		name: "quoteExactInput",
		outputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenIn",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenOut",
				type: "address"
			},
			{
				internalType: "uint24",
				name: "fee",
				type: "uint24"
			},
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint160",
				name: "sqrtPriceLimitX96",
				type: "uint160"
			}
		],
		name: "quoteExactInputSingle",
		outputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes",
				name: "path",
				type: "bytes"
			},
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		name: "quoteExactOutput",
		outputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "tokenIn",
				type: "address"
			},
			{
				internalType: "address",
				name: "tokenOut",
				type: "address"
			},
			{
				internalType: "uint24",
				name: "fee",
				type: "uint24"
			},
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint160",
				name: "sqrtPriceLimitX96",
				type: "uint160"
			}
		],
		name: "quoteExactOutputSingle",
		outputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "int256",
				name: "amount0Delta",
				type: "int256"
			},
			{
				internalType: "int256",
				name: "amount1Delta",
				type: "int256"
			},
			{
				internalType: "bytes",
				name: "path",
				type: "bytes"
			}
		],
		name: "uniswapV3SwapCallback",
		outputs: [
		],
		stateMutability: "view",
		type: "function"
	}
];

var abi$1 = [
	{
		inputs: [
		],
		name: "getCurrentBlockTimestamp",
		outputs: [
			{
				internalType: "uint256",
				name: "timestamp",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "addr",
				type: "address"
			}
		],
		name: "getEthBalance",
		outputs: [
			{
				internalType: "uint256",
				name: "balance",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "target",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "gasLimit",
						type: "uint256"
					},
					{
						internalType: "bytes",
						name: "callData",
						type: "bytes"
					}
				],
				internalType: "struct UniswapInterfaceMulticall.Call[]",
				name: "calls",
				type: "tuple[]"
			}
		],
		name: "multicall",
		outputs: [
			{
				internalType: "uint256",
				name: "blockNumber",
				type: "uint256"
			},
			{
				components: [
					{
						internalType: "bool",
						name: "success",
						type: "bool"
					},
					{
						internalType: "uint256",
						name: "gasUsed",
						type: "uint256"
					},
					{
						internalType: "bytes",
						name: "returnData",
						type: "bytes"
					}
				],
				internalType: "struct UniswapInterfaceMulticall.Result[]",
				name: "returnData",
				type: "tuple[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

var ARGENT_WALLET_DETECTOR_ABI = [
	{
		inputs: [
			{
				internalType: "bytes32[]",
				name: "_codes",
				type: "bytes32[]"
			},
			{
				internalType: "address[]",
				name: "_implementations",
				type: "address[]"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "code",
				type: "bytes32"
			}
		],
		name: "CodeAdded",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "implementation",
				type: "address"
			}
		],
		name: "ImplementationAdded",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "_newOwner",
				type: "address"
			}
		],
		name: "OwnerChanged",
		type: "event"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		name: "acceptedCodes",
		outputs: [
			{
				internalType: "bool",
				name: "exists",
				type: "bool"
			},
			{
				internalType: "uint128",
				name: "index",
				type: "uint128"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "acceptedImplementations",
		outputs: [
			{
				internalType: "bool",
				name: "exists",
				type: "bool"
			},
			{
				internalType: "uint128",
				name: "index",
				type: "uint128"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "_code",
				type: "bytes32"
			}
		],
		name: "addCode",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_argentWallet",
				type: "address"
			}
		],
		name: "addCodeAndImplementationFromWallet",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_impl",
				type: "address"
			}
		],
		name: "addImplementation",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_newOwner",
				type: "address"
			}
		],
		name: "changeOwner",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getCodes",
		outputs: [
			{
				internalType: "bytes32[]",
				name: "",
				type: "bytes32[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getImplementations",
		outputs: [
			{
				internalType: "address[]",
				name: "",
				type: "address[]"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_wallet",
				type: "address"
			}
		],
		name: "isArgentWallet",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];

var EIP_2612 = [
	{
		constant: true,
		inputs: [
			{
				name: "owner",
				type: "address"
			}
		],
		name: "nonces",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "DOMAIN_SEPARATOR",
		outputs: [
			{
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var ENS_PUBLIC_RESOLVER_ABI = [
	{
		inputs: [
			{
				internalType: "contract ENS",
				name: "_ens",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "contentType",
				type: "uint256"
			}
		],
		name: "ABIChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "address",
				name: "a",
				type: "address"
			}
		],
		name: "AddrChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "coinType",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "newAddress",
				type: "bytes"
			}
		],
		name: "AddressChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "target",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "isAuthorised",
				type: "bool"
			}
		],
		name: "AuthorisationChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "hash",
				type: "bytes"
			}
		],
		name: "ContenthashChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "name",
				type: "bytes"
			},
			{
				indexed: false,
				internalType: "uint16",
				name: "resource",
				type: "uint16"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "record",
				type: "bytes"
			}
		],
		name: "DNSRecordChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "bytes",
				name: "name",
				type: "bytes"
			},
			{
				indexed: false,
				internalType: "uint16",
				name: "resource",
				type: "uint16"
			}
		],
		name: "DNSRecordDeleted",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "DNSZoneCleared",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "bytes4",
				name: "interfaceID",
				type: "bytes4"
			},
			{
				indexed: false,
				internalType: "address",
				name: "implementer",
				type: "address"
			}
		],
		name: "InterfaceChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "string",
				name: "name",
				type: "string"
			}
		],
		name: "NameChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "bytes32",
				name: "x",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "bytes32",
				name: "y",
				type: "bytes32"
			}
		],
		name: "PubkeyChanged",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "string",
				name: "indexedKey",
				type: "string"
			},
			{
				indexed: false,
				internalType: "string",
				name: "key",
				type: "string"
			}
		],
		name: "TextChanged",
		type: "event"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "uint256",
				name: "contentTypes",
				type: "uint256"
			}
		],
		name: "ABI",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "addr",
		outputs: [
			{
				internalType: "address payable",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "authorisations",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "clearDNSZone",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "contenthash",
		outputs: [
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "name",
				type: "bytes32"
			},
			{
				internalType: "uint16",
				name: "resource",
				type: "uint16"
			}
		],
		name: "dnsRecord",
		outputs: [
			{
				internalType: "bytes",
				name: "",
				type: "bytes"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "name",
				type: "bytes32"
			}
		],
		name: "hasDNSRecords",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes4",
				name: "interfaceID",
				type: "bytes4"
			}
		],
		name: "interfaceImplementer",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "pubkey",
		outputs: [
			{
				internalType: "bytes32",
				name: "x",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "y",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "uint256",
				name: "contentType",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "setABI",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "uint256",
				name: "coinType",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "a",
				type: "bytes"
			}
		],
		name: "setAddr",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "a",
				type: "address"
			}
		],
		name: "setAddr",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "target",
				type: "address"
			},
			{
				internalType: "bool",
				name: "isAuthorised",
				type: "bool"
			}
		],
		name: "setAuthorisation",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes",
				name: "hash",
				type: "bytes"
			}
		],
		name: "setContenthash",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "setDNSRecords",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes4",
				name: "interfaceID",
				type: "bytes4"
			},
			{
				internalType: "address",
				name: "implementer",
				type: "address"
			}
		],
		name: "setInterface",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "string",
				name: "name",
				type: "string"
			}
		],
		name: "setName",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "x",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "y",
				type: "bytes32"
			}
		],
		name: "setPubkey",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "string",
				name: "key",
				type: "string"
			},
			{
				internalType: "string",
				name: "value",
				type: "string"
			}
		],
		name: "setText",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceID",
				type: "bytes4"
			}
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "pure",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "string",
				name: "key",
				type: "string"
			}
		],
		name: "text",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var ENS_ABI = [
	{
		inputs: [
			{
				internalType: "contract ENS",
				name: "_old",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "approved",
				type: "bool"
			}
		],
		name: "ApprovalForAll",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "label",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "NewOwner",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "address",
				name: "resolver",
				type: "address"
			}
		],
		name: "NewResolver",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "uint64",
				name: "ttl",
				type: "uint64"
			}
		],
		name: "NewTTL",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				indexed: false,
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "operator",
				type: "address"
			}
		],
		name: "isApprovedForAll",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "old",
		outputs: [
			{
				internalType: "contract ENS",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "recordExists",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "resolver",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				internalType: "bool",
				name: "approved",
				type: "bool"
			}
		],
		name: "setApprovalForAll",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "setOwner",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "resolver",
				type: "address"
			},
			{
				internalType: "uint64",
				name: "ttl",
				type: "uint64"
			}
		],
		name: "setRecord",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "resolver",
				type: "address"
			}
		],
		name: "setResolver",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "label",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "setSubnodeOwner",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "label",
				type: "bytes32"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "resolver",
				type: "address"
			},
			{
				internalType: "uint64",
				name: "ttl",
				type: "uint64"
			}
		],
		name: "setSubnodeRecord",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			},
			{
				internalType: "uint64",
				name: "ttl",
				type: "uint64"
			}
		],
		name: "setTTL",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "bytes32",
				name: "node",
				type: "bytes32"
			}
		],
		name: "ttl",
		outputs: [
			{
				internalType: "uint64",
				name: "",
				type: "uint64"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var ERC20ABI = [
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "_spender",
				type: "address"
			},
			{
				name: "_value",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "_from",
				type: "address"
			},
			{
				name: "_to",
				type: "address"
			},
			{
				name: "_value",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "_owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				name: "balance",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "_to",
				type: "address"
			},
			{
				name: "_value",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "_owner",
				type: "address"
			},
			{
				name: "_spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		payable: true,
		stateMutability: "payable",
		type: "fallback"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	}
];

var ERC20_BYTES32_ABI = [
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var ERC721_ABI = [
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "ownerOf",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "tokenURI",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];

var ERC1155_ABI = [
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "_owner",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "_id",
				type: "uint256"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "uint256",
				name: "_id",
				type: "uint256"
			}
		],
		name: "uri",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var WETH_ABI = [
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "guy",
				type: "address"
			},
			{
				name: "wad",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "src",
				type: "address"
			},
			{
				name: "dst",
				type: "address"
			},
			{
				name: "wad",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "wad",
				type: "uint256"
			}
		],
		name: "withdraw",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "dst",
				type: "address"
			},
			{
				name: "wad",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "deposit",
		outputs: [
		],
		payable: true,
		stateMutability: "payable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "",
				type: "address"
			},
			{
				name: "",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		payable: true,
		stateMutability: "payable",
		type: "fallback"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "src",
				type: "address"
			},
			{
				indexed: true,
				name: "guy",
				type: "address"
			},
			{
				indexed: false,
				name: "wad",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "src",
				type: "address"
			},
			{
				indexed: true,
				name: "dst",
				type: "address"
			},
			{
				indexed: false,
				name: "wad",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "dst",
				type: "address"
			},
			{
				indexed: false,
				name: "wad",
				type: "uint256"
			}
		],
		name: "Deposit",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "src",
				type: "address"
			},
			{
				indexed: false,
				name: "wad",
				type: "uint256"
			}
		],
		name: "Withdrawal",
		type: "event"
	}
];

function constructSameAddressMap(address, additionalNetworks = []) {
    return L1_CHAIN_IDS
        .concat(additionalNetworks)
        .reduce((memo, chainId) => {
        memo[chainId] = address;
        return memo;
    }, {});
}

const UNI_ADDRESS = constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984');
const MULTICALL_ADDRESS = Object.assign(Object.assign({}, constructSameAddressMap('0x1F98415757620B543A52E61c46B32eB19261F984', [
    SupportedChainId.OPTIMISTIC_KOVAN,
    SupportedChainId.OPTIMISM,
])), { [SupportedChainId.ARBITRUM_ONE]: '0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB', [SupportedChainId.ARBITRUM_RINKEBY]: '0xa501c031958F579dB7676fF1CE78AD305794d579' });
const V2_FACTORY_ADDRESSES = constructSameAddressMap(FACTORY_ADDRESS);
const V2_ROUTER_ADDRESS = constructSameAddressMap('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D');
/**
 * The oldest V0 governance address
 */
constructSameAddressMap('0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F');
/**
 * The older V1 governance address
 */
({
    [SupportedChainId.MAINNET]: '0xC4e172459f1E7939D522503B81AFAaC1014CE6F6',
});
/**
 * The latest governor bravo that is currently admin of timelock
 */
({
    [SupportedChainId.MAINNET]: '0x408ED6354d4973f66138C91495F2f2FCbd8724C3',
});
constructSameAddressMap('0x1a9C8182C09F50C8318d769245beA52c32BE35BC');
const MERKLE_DISTRIBUTOR_ADDRESS = {
    [SupportedChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e',
};
const ARGENT_WALLET_DETECTOR_ADDRESS = {
    [SupportedChainId.MAINNET]: '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8',
};
const V3_CORE_FACTORY_ADDRESSES = constructSameAddressMap(FACTORY_ADDRESS$1, [
    SupportedChainId.OPTIMISM,
    SupportedChainId.OPTIMISTIC_KOVAN,
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.ARBITRUM_RINKEBY,
]);
const QUOTER_ADDRESSES = constructSameAddressMap('0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6', [
    SupportedChainId.OPTIMISM,
    SupportedChainId.OPTIMISTIC_KOVAN,
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.ARBITRUM_RINKEBY,
]);
constructSameAddressMap('0xC36442b4a4522E871399CD717aBDD847Ab11FE88', [
    SupportedChainId.OPTIMISM,
    SupportedChainId.OPTIMISTIC_KOVAN,
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.ARBITRUM_RINKEBY,
]);
const ENS_REGISTRAR_ADDRESSES = {
    [SupportedChainId.MAINNET]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    [SupportedChainId.ROPSTEN]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    [SupportedChainId.GOERLI]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    [SupportedChainId.RINKEBY]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
};
const SOCKS_CONTROLLER_ADDRESSES = {
    [SupportedChainId.MAINNET]: '0x65770b5283117639760beA3F867b69b3697a91dd',
};
const SWAP_ROUTER_ADDRESSES = constructSameAddressMap('0xE592427A0AEce92De3Edee1F18E0157C05861564', [
    SupportedChainId.OPTIMISM,
    SupportedChainId.OPTIMISTIC_KOVAN,
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.ARBITRUM_RINKEBY,
]);
constructSameAddressMap('0xA5644E29708357803b5A882D272c41cC0dF92B34', [
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.ARBITRUM_RINKEBY,
]);

const AMPL = new Token(SupportedChainId.MAINNET, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth');
const DAI = new Token(SupportedChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin');
const DAI_ARBITRUM_ONE = new Token(SupportedChainId.ARBITRUM_ONE, '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', 18, 'DAI', 'Dai stable coin');
const DAI_OPTIMISM = new Token(SupportedChainId.OPTIMISM, '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', 18, 'DAI', 'Dai stable coin');
const USDC = new Token(SupportedChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C');
const USDC_ARBITRUM = new Token(SupportedChainId.ARBITRUM_ONE, '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', 6, 'USDC', 'USD//C');
const USDC_OPTIMISM = new Token(SupportedChainId.OPTIMISM, '0x7F5c764cBc14f9669B88837ca1490cCa17c31607', 6, 'USDC', 'USD//C');
const USDT = new Token(SupportedChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD');
const USDT_ARBITRUM_ONE = new Token(SupportedChainId.ARBITRUM_ONE, '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', 6, 'USDT', 'Tether USD');
const USDT_OPTIMISM = new Token(SupportedChainId.OPTIMISM, '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58', 6, 'USDT', 'Tether USD');
const WBTC = new Token(SupportedChainId.MAINNET, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped BTC');
const WBTC_ARBITRUM_ONE = new Token(SupportedChainId.ARBITRUM_ONE, '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f', 8, 'WBTC', 'Wrapped BTC');
const WBTC_OPTIMISM = new Token(SupportedChainId.OPTIMISM, '0x68f180fcCe6836688e9084f035309E29Bf0A2095', 8, 'WBTC', 'Wrapped BTC');
const FEI = new Token(SupportedChainId.MAINNET, '0x956F47F50A910163D8BF957Cf5846D573E7f87CA', 18, 'FEI', 'Fei USD');
const TRIBE = new Token(SupportedChainId.MAINNET, '0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B', 18, 'TRIBE', 'Tribe');
const FRAX = new Token(SupportedChainId.MAINNET, '0x853d955aCEf822Db058eb8505911ED77F175b99e', 18, 'FRAX', 'Frax');
const FXS = new Token(SupportedChainId.MAINNET, '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0', 18, 'FXS', 'Frax Share');
const renBTC = new Token(SupportedChainId.MAINNET, '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D', 8, 'renBTC', 'renBTC');
const ETH2X_FLI = new Token(SupportedChainId.MAINNET, '0xAa6E8127831c9DE45ae56bB1b0d4D4Da6e5665BD', 18, 'ETH2x-FLI', 'ETH 2x Flexible Leverage Index');
const sETH2 = new Token(SupportedChainId.MAINNET, '0xFe2e637202056d30016725477c5da089Ab0A043A', 18, 'sETH2', 'StakeWise Staked ETH2');
const rETH2 = new Token(SupportedChainId.MAINNET, '0x20BC832ca081b91433ff6c17f85701B6e92486c5', 18, 'rETH2', 'StakeWise Reward ETH2');
const SWISE = new Token(SupportedChainId.MAINNET, '0x48C3399719B582dD63eB5AADf12A40B4C3f52FA2', 18, 'SWISE', 'StakeWise');
const UNI = {
    [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, UNI_ADDRESS[1], 18, 'UNI', 'Uniswap'),
    [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, UNI_ADDRESS[4], 18, 'UNI', 'Uniswap'),
    [SupportedChainId.ROPSTEN]: new Token(SupportedChainId.ROPSTEN, UNI_ADDRESS[3], 18, 'UNI', 'Uniswap'),
    [SupportedChainId.GOERLI]: new Token(SupportedChainId.GOERLI, UNI_ADDRESS[5], 18, 'UNI', 'Uniswap'),
    [SupportedChainId.KOVAN]: new Token(SupportedChainId.KOVAN, UNI_ADDRESS[42], 18, 'UNI', 'Uniswap'),
};
const WETH9_EXTENDED = Object.assign(Object.assign({}, WETH9), { [SupportedChainId.OPTIMISM]: new Token(SupportedChainId.OPTIMISM, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'), [SupportedChainId.OPTIMISTIC_KOVAN]: new Token(SupportedChainId.OPTIMISTIC_KOVAN, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'), [SupportedChainId.ARBITRUM_ONE]: new Token(SupportedChainId.ARBITRUM_ONE, '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', 18, 'WETH', 'Wrapped Ether'), [SupportedChainId.ARBITRUM_RINKEBY]: new Token(SupportedChainId.ARBITRUM_RINKEBY, '0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681', 18, 'WETH', 'Wrapped Ether') });
class ExtendedEther extends Ether {
    get wrapped() {
        if (this.chainId in WETH9_EXTENDED)
            return WETH9_EXTENDED[this.chainId];
        throw new Error('Unsupported chain ID');
    }
    static onChain(chainId) {
        var _a;
        return (_a = this._cachedEther[chainId]) !== null && _a !== void 0 ? _a : (this._cachedEther[chainId] = new ExtendedEther(chainId));
    }
}
ExtendedEther._cachedEther = {};

// returns null on errors
function useContract(addressOrAddressMap, ABI, withSignerIfPossible = true) {
    const { library, account, chainId } = useActiveWeb3React();
    return useMemo(() => {
        if (!addressOrAddressMap || !ABI || !library || !chainId)
            return null;
        let address;
        if (typeof addressOrAddressMap === 'string')
            address = addressOrAddressMap;
        else
            address = addressOrAddressMap[chainId];
        if (!address)
            return null;
        try {
            return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined);
        }
        catch (error) {
            console.error('Failed to get contract', error);
            return null;
        }
    }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]);
}
function useTokenContract(tokenAddress, withSignerIfPossible) {
    return useContract(tokenAddress, ERC20ABI, withSignerIfPossible);
}
function useWETHContract(withSignerIfPossible) {
    var _a;
    const { chainId } = useActiveWeb3React();
    return useContract(chainId ? (_a = WETH9_EXTENDED[chainId]) === null || _a === void 0 ? void 0 : _a.address : undefined, WETH_ABI, withSignerIfPossible);
}
function useERC721Contract(nftAddress) {
    return useContract(nftAddress, ERC721_ABI, false);
}
function useERC1155Contract(nftAddress) {
    return useContract(nftAddress, ERC1155_ABI, false);
}
function useArgentWalletDetectorContract() {
    return useContract(ARGENT_WALLET_DETECTOR_ADDRESS, ARGENT_WALLET_DETECTOR_ABI, false);
}
function useENSRegistrarContract(withSignerIfPossible) {
    return useContract(ENS_REGISTRAR_ADDRESSES, ENS_ABI, withSignerIfPossible);
}
function useENSResolverContract(address, withSignerIfPossible) {
    return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible);
}
function useBytes32TokenContract(tokenAddress, withSignerIfPossible) {
    return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible);
}
function useEIP2612Contract(tokenAddress) {
    return useContract(tokenAddress, EIP_2612, false);
}
function useV2RouterContract() {
    return useContract(V2_ROUTER_ADDRESS, abi$3, true);
}
function useMulticall2Contract() {
    return useContract(MULTICALL_ADDRESS, abi$1, false);
}
function useMerkleDistributorContract() {
    return useContract(MERKLE_DISTRIBUTOR_ADDRESS, abi$5, true);
}
function useV3Quoter() {
    return useContract(QUOTER_ADDRESSES, abi$2);
}

// modified from https://usehooks.com/useDebounce/
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

/**
 * Does a lookup for an ENS name to find its address.
 */
function useENSAddress(ensName) {
    var _a;
    const debouncedName = useDebounce(ensName, 200);
    const ensNodeArgument = useMemo(() => [debouncedName === null ? undefined : safeNamehash(debouncedName)], [debouncedName]);
    const registrarContract = useENSRegistrarContract(false);
    const resolverAddress = useSingleCallResult(registrarContract, 'resolver', ensNodeArgument);
    const resolverAddressResult = (_a = resolverAddress.result) === null || _a === void 0 ? void 0 : _a[0];
    const resolverContract = useENSResolverContract(resolverAddressResult && !isZero(resolverAddressResult) ? resolverAddressResult : undefined, false);
    const addr = useSingleCallResult(resolverContract, 'addr', ensNodeArgument);
    const changed = debouncedName !== ensName;
    return useMemo(() => {
        var _a, _b;
        return ({
            address: changed ? null : (_b = (_a = addr.result) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null,
            loading: changed || resolverAddress.loading || addr.loading,
        });
    }, [addr.loading, addr.result, changed, resolverAddress.loading]);
}

/**
 * Does a reverse lookup for an address to find its ENS name.
 * Note this is not the same as looking up an ENS name to find an address.
 */
function useENSName(address) {
    var _a;
    const debouncedAddress = useDebounce(address, 200);
    const ensNodeArgument = useMemo(() => {
        if (!debouncedAddress || !isAddress(debouncedAddress))
            return [undefined];
        return [namehash(`${debouncedAddress.toLowerCase().substr(2)}.addr.reverse`)];
    }, [debouncedAddress]);
    const registrarContract = useENSRegistrarContract(false);
    const resolverAddress = useSingleCallResult(registrarContract, 'resolver', ensNodeArgument);
    const resolverAddressResult = (_a = resolverAddress.result) === null || _a === void 0 ? void 0 : _a[0];
    const resolverContract = useENSResolverContract(resolverAddressResult && !isZero(resolverAddressResult) ? resolverAddressResult : undefined, false);
    const name = useSingleCallResult(resolverContract, 'name', ensNodeArgument);
    const changed = debouncedAddress !== address;
    return useMemo(() => {
        var _a, _b;
        return ({
            ENSName: changed ? null : (_b = (_a = name.result) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null,
            loading: changed || resolverAddress.loading || name.loading,
        });
    }, [changed, name.loading, name.result, resolverAddress.loading]);
}

/**
 * Given a name or address, does a lookup to resolve to an address and name
 * @param nameOrAddress ENS name or address
 */
function useENS(nameOrAddress) {
    const validated = isAddress(nameOrAddress);
    const reverseLookup = useENSName(validated ? validated : undefined);
    const lookup = useENSAddress(nameOrAddress);
    return useMemo(() => ({
        loading: reverseLookup.loading || lookup.loading,
        address: validated ? validated : lookup.address,
        name: reverseLookup.ENSName ? reverseLookup.ENSName : !validated && lookup.address ? nameOrAddress || null : null,
    }), [lookup.address, lookup.loading, nameOrAddress, reverseLookup.ENSName, reverseLookup.loading, validated]);
}

/**
 * Returns the gas value plus a margin for unexpected or variable gas costs
 * @param value the gas value to pad
 */
function calculateGasMargin(value) {
    return value.mul(120).div(100);
}

/**
 * Be careful adding to this enum, always assign a unique value (typescript will not prevent duplicate values).
 * These values is persisted in state and if you change the value it will cause errors
 */
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["APPROVAL"] = 0] = "APPROVAL";
    TransactionType[TransactionType["SWAP"] = 1] = "SWAP";
    TransactionType[TransactionType["DEPOSIT_LIQUIDITY_STAKING"] = 2] = "DEPOSIT_LIQUIDITY_STAKING";
    TransactionType[TransactionType["WITHDRAW_LIQUIDITY_STAKING"] = 3] = "WITHDRAW_LIQUIDITY_STAKING";
    TransactionType[TransactionType["CLAIM"] = 4] = "CLAIM";
    TransactionType[TransactionType["VOTE"] = 5] = "VOTE";
    TransactionType[TransactionType["DELEGATE"] = 6] = "DELEGATE";
    TransactionType[TransactionType["WRAP"] = 7] = "WRAP";
    TransactionType[TransactionType["CREATE_V3_POOL"] = 8] = "CREATE_V3_POOL";
    TransactionType[TransactionType["ADD_LIQUIDITY_V3_POOL"] = 9] = "ADD_LIQUIDITY_V3_POOL";
    TransactionType[TransactionType["ADD_LIQUIDITY_V2_POOL"] = 10] = "ADD_LIQUIDITY_V2_POOL";
    TransactionType[TransactionType["MIGRATE_LIQUIDITY_V3"] = 11] = "MIGRATE_LIQUIDITY_V3";
    TransactionType[TransactionType["COLLECT_FEES"] = 12] = "COLLECT_FEES";
    TransactionType[TransactionType["REMOVE_LIQUIDITY_V3"] = 13] = "REMOVE_LIQUIDITY_V3";
    TransactionType[TransactionType["SUBMIT_PROPOSAL"] = 14] = "SUBMIT_PROPOSAL";
})(TransactionType || (TransactionType = {}));
const addTransaction = createAction('transactions/addTransaction');
const clearAllTransactions = createAction('transactions/clearAllTransactions');
const finalizeTransaction = createAction('transactions/finalizeTransaction');
const checkedTransaction = createAction('transactions/checkedTransaction');

const SUPPORTED_TRANSACTION_TYPES = [
    TransactionType.ADD_LIQUIDITY_V2_POOL,
    TransactionType.ADD_LIQUIDITY_V3_POOL,
    TransactionType.CREATE_V3_POOL,
    TransactionType.REMOVE_LIQUIDITY_V3,
    TransactionType.SWAP,
];
const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_KEY;
const firebaseEnabled = typeof FIREBASE_API_KEY !== 'undefined';
if (firebaseEnabled)
    initializeFirebase();
function useMonitoringEventCallback() {
    const { chainId } = useActiveWeb3React();
    return useCallback(function log(type, { transactionResponse, walletAddress, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!firebaseEnabled)
                return;
            const db = getDatabase();
            if (!walletAddress) {
                console.debug('Wallet address required to log monitoring events.');
                return;
            }
            try {
                push(ref(db, 'trm'), {
                    chainId,
                    origin: window.location.origin,
                    timestamp: Date.now(),
                    tx: transactionResponse,
                    type,
                    walletAddress,
                });
            }
            catch (e) {
                console.debug('Error adding document: ', e);
            }
        });
    }, [chainId]);
}
function useTransactionMonitoringEventCallback() {
    const { account } = useActiveWeb3React();
    const log = useMonitoringEventCallback();
    return useCallback((info, transactionResponse) => {
        if (SUPPORTED_TRANSACTION_TYPES.includes(info.type)) {
            log(TransactionType[info.type], {
                transactionResponse: (({ hash, v, r, s }) => ({ hash, v, r, s }))(transactionResponse),
                walletAddress: account !== null && account !== void 0 ? account : undefined,
            });
        }
    }, [account, log]);
}
function useWalletConnectMonitoringEventCallback() {
    const log = useMonitoringEventCallback();
    return useCallback((walletAddress) => {
        log('WALLET_CONNECTED', { transactionResponse: { hash: '', r: '', s: '', v: -1 }, walletAddress });
    }, [log]);
}
function initializeFirebase() {
    initializeApp({
        apiKey: process.env.REACT_APP_FIREBASE_KEY,
        authDomain: 'interface-monitoring.firebaseapp.com',
        databaseURL: 'https://interface-monitoring-default-rtdb.firebaseio.com',
        projectId: 'interface-monitoring',
        storageBucket: 'interface-monitoring.appspot.com',
        messagingSenderId: '968187720053',
        appId: '1:968187720053:web:acedf72dce629d470be33c',
    });
}

// helper that can take a ethers library transaction response and add it to the list of transactions
function useTransactionAdder() {
    const { chainId, account } = useActiveWeb3React();
    const dispatch = useAppDispatch();
    const logMonitoringEvent = useTransactionMonitoringEventCallback();
    return useCallback((response, info) => {
        if (!account)
            return;
        if (!chainId)
            return;
        const { hash } = response;
        if (!hash) {
            throw Error('No transaction hash found.');
        }
        dispatch(addTransaction({ hash, from: account, info, chainId }));
        logMonitoringEvent(info, response);
    }, [account, chainId, dispatch, logMonitoringEvent]);
}
// returns all the transactions for the current chain
function useAllTransactions() {
    var _a;
    const { chainId } = useActiveWeb3React();
    const state = useAppSelector((state) => state.transactions);
    return chainId ? (_a = state[chainId]) !== null && _a !== void 0 ? _a : {} : {};
}
function useTransaction(transactionHash) {
    const allTransactions = useAllTransactions();
    if (!transactionHash) {
        return undefined;
    }
    return allTransactions[transactionHash];
}
function useIsTransactionPending(transactionHash) {
    const transactions = useAllTransactions();
    if (!transactionHash || !transactions[transactionHash])
        return false;
    return !transactions[transactionHash].receipt;
}
function useIsTransactionConfirmed(transactionHash) {
    const transactions = useAllTransactions();
    if (!transactionHash || !transactions[transactionHash])
        return false;
    return Boolean(transactions[transactionHash].receipt);
}
/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
function isTransactionRecent(tx) {
    return new Date().getTime() - tx.addedTime < 86400000;
}
// returns whether a token has a pending approval transaction
function useHasPendingApproval(tokenAddress, spender) {
    const allTransactions = useAllTransactions();
    return useMemo(() => typeof tokenAddress === 'string' &&
        typeof spender === 'string' &&
        Object.keys(allTransactions).some((hash) => {
            const tx = allTransactions[hash];
            if (!tx)
                return false;
            if (tx.receipt) {
                return false;
            }
            else {
                if (tx.info.type !== TransactionType.APPROVAL)
                    return false;
                return tx.info.spender === spender && tx.info.tokenAddress === tokenAddress && isTransactionRecent(tx);
            }
        }), [allTransactions, spender, tokenAddress]);
}
// watch for submissions to claim
// return null if not done loading, return undefined if not found
function useUserHasSubmittedClaim(account) {
    const allTransactions = useAllTransactions();
    // get the txn if it has been submitted
    const claimTxn = useMemo(() => {
        const txnIndex = Object.keys(allTransactions).find((hash) => {
            const tx = allTransactions[hash];
            return tx.info.type === TransactionType.CLAIM && tx.info.recipient === account;
        });
        return txnIndex && allTransactions[txnIndex] ? allTransactions[txnIndex] : undefined;
    }, [account, allTransactions]);
    return { claimSubmitted: Boolean(claimTxn), claimTxn };
}

let FETCH_CLAIM_MAPPING_PROMISE = null;
function fetchClaimMapping() {
    return (FETCH_CLAIM_MAPPING_PROMISE !== null && FETCH_CLAIM_MAPPING_PROMISE !== void 0 ? FETCH_CLAIM_MAPPING_PROMISE : (FETCH_CLAIM_MAPPING_PROMISE = fetch(`https://raw.githubusercontent.com/Uniswap/mrkl-drop-data-chunks/final/chunks/mapping.json`)
        .then((res) => res.json())
        .catch((error) => {
        console.error('Failed to get claims mapping', error);
        FETCH_CLAIM_MAPPING_PROMISE = null;
    })));
}
const FETCH_CLAIM_FILE_PROMISES = {};
function fetchClaimFile(key) {
    var _a;
    return ((_a = FETCH_CLAIM_FILE_PROMISES[key]) !== null && _a !== void 0 ? _a : (FETCH_CLAIM_FILE_PROMISES[key] = fetch(`https://raw.githubusercontent.com/Uniswap/mrkl-drop-data-chunks/final/chunks/${key}.json`)
        .then((res) => res.json())
        .catch((error) => {
        console.error(`Failed to get claim file mapping for starting address ${key}`, error);
        delete FETCH_CLAIM_FILE_PROMISES[key];
    })));
}
const FETCH_CLAIM_PROMISES = {};
// returns the claim for the given address, or null if not valid
function fetchClaim(account) {
    var _a;
    const formatted = isAddress(account);
    if (!formatted)
        return Promise.reject(new Error('Invalid address'));
    return ((_a = FETCH_CLAIM_PROMISES[account]) !== null && _a !== void 0 ? _a : (FETCH_CLAIM_PROMISES[account] = fetchClaimMapping()
        .then((mapping) => {
        const sorted = Object.keys(mapping).sort((a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1));
        for (const startingAddress of sorted) {
            const lastAddress = mapping[startingAddress];
            if (startingAddress.toLowerCase() <= formatted.toLowerCase()) {
                if (formatted.toLowerCase() <= lastAddress.toLowerCase()) {
                    return startingAddress;
                }
            }
            else {
                throw new Error(`Claim for ${formatted} was not found in partial search`);
            }
        }
        throw new Error(`Claim for ${formatted} was not found after searching all mappings`);
    })
        .then(fetchClaimFile)
        .then((result) => {
        if (result[formatted])
            return result[formatted];
        throw new Error(`Claim for ${formatted} was not found in claim file!`);
    })
        .catch((error) => {
        console.debug('Claim fetch failed', error);
        throw error;
    })));
}
// parse distributorContract blob and detect if user has claim data
// null means we know it does not
function useUserClaimData(account) {
    const { chainId } = useActiveWeb3React();
    const [claimInfo, setClaimInfo] = useState({});
    useEffect(() => {
        if (!account || chainId !== 1)
            return;
        fetchClaim(account)
            .then((accountClaimInfo) => setClaimInfo((claimInfo) => {
            return Object.assign(Object.assign({}, claimInfo), { [account]: accountClaimInfo });
        }))
            .catch(() => {
            setClaimInfo((claimInfo) => {
                return Object.assign(Object.assign({}, claimInfo), { [account]: null });
            });
        });
    }, [account, chainId]);
    return account && chainId === 1 ? claimInfo[account] : null;
}
// check if user is in blob and has not yet claimed UNI
function useUserHasAvailableClaim(account) {
    var _a;
    const userClaimData = useUserClaimData(account);
    const distributorContract = useMerkleDistributorContract();
    const isClaimedResult = useSingleCallResult(distributorContract, 'isClaimed', [userClaimData === null || userClaimData === void 0 ? void 0 : userClaimData.index]);
    // user is in blob and contract marks as unclaimed
    return Boolean(userClaimData && !isClaimedResult.loading && ((_a = isClaimedResult.result) === null || _a === void 0 ? void 0 : _a[0]) === false);
}
function useUserUnclaimedAmount(account) {
    const { chainId } = useActiveWeb3React();
    const userClaimData = useUserClaimData(account);
    const canClaim = useUserHasAvailableClaim(account);
    const uni = chainId ? UNI[chainId] : undefined;
    if (!uni)
        return undefined;
    if (!canClaim || !userClaimData) {
        return CurrencyAmount.fromRawAmount(uni, JSBI.BigInt(0));
    }
    return CurrencyAmount.fromRawAmount(uni, JSBI.BigInt(userClaimData.amount));
}
function useClaimCallback(account) {
    // get claim data for this account
    const { library, chainId } = useActiveWeb3React();
    const claimData = useUserClaimData(account);
    // used for popup summary
    const unclaimedAmount = useUserUnclaimedAmount(account);
    const addTransaction = useTransactionAdder();
    const distributorContract = useMerkleDistributorContract();
    const claimCallback = function () {
        return __awaiter(this, void 0, void 0, function* () {
            if (!claimData || !account || !library || !chainId || !distributorContract)
                return;
            const args = [claimData.index, account, claimData.amount, claimData.proof];
            return distributorContract.estimateGas['claim'](...args, {}).then((estimatedGasLimit) => {
                return distributorContract
                    .claim(...args, { value: null, gasLimit: calculateGasMargin(estimatedGasLimit) })
                    .then((response) => {
                    addTransaction(response, {
                        type: TransactionType.CLAIM,
                        recipient: account,
                        uniAmountRaw: unclaimedAmount === null || unclaimedAmount === void 0 ? void 0 : unclaimedAmount.quotient.toString(),
                    });
                    return response.hash;
                });
            });
        });
    };
    return { claimCallback };
}

// a list of tokens by chain
const WETH_ONLY = Object.fromEntries(Object.entries(WETH9_EXTENDED).map(([key, value]) => [key, [value]]));
// used to construct intermediary pairs for trading
const BASES_TO_CHECK_TRADES_AGAINST = Object.assign(Object.assign({}, WETH_ONLY), { [SupportedChainId.MAINNET]: [...WETH_ONLY[SupportedChainId.MAINNET], DAI, USDC, USDT, WBTC], [SupportedChainId.OPTIMISM]: [...WETH_ONLY[SupportedChainId.OPTIMISM], DAI_OPTIMISM, USDT_OPTIMISM, WBTC_OPTIMISM], [SupportedChainId.ARBITRUM_ONE]: [
        ...WETH_ONLY[SupportedChainId.ARBITRUM_ONE],
        DAI_ARBITRUM_ONE,
        USDT_ARBITRUM_ONE,
        WBTC_ARBITRUM_ONE,
    ] });
const ADDITIONAL_BASES = {
    [SupportedChainId.MAINNET]: {
        '0xF16E4d813f4DcfDe4c5b44f305c908742De84eF0': [ETH2X_FLI],
        [rETH2.address]: [sETH2],
        [SWISE.address]: [sETH2],
        [FEI.address]: [TRIBE],
        [TRIBE.address]: [FEI],
        [FRAX.address]: [FXS],
        [FXS.address]: [FRAX],
        [WBTC.address]: [renBTC],
        [renBTC.address]: [WBTC],
    },
};
/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
const CUSTOM_BASES = {
    [SupportedChainId.MAINNET]: {
        [AMPL.address]: [DAI, WETH9_EXTENDED[SupportedChainId.MAINNET]],
    },
};
/**
 * Shows up in the currency select for swap and add liquidity
 */
const COMMON_BASES = {
    [SupportedChainId.MAINNET]: [
        ExtendedEther.onChain(SupportedChainId.MAINNET),
        DAI,
        USDC,
        USDT,
        WBTC,
        WETH9_EXTENDED[SupportedChainId.MAINNET],
    ],
    [SupportedChainId.ROPSTEN]: [
        ExtendedEther.onChain(SupportedChainId.ROPSTEN),
        WETH9_EXTENDED[SupportedChainId.ROPSTEN],
    ],
    [SupportedChainId.RINKEBY]: [
        ExtendedEther.onChain(SupportedChainId.RINKEBY),
        WETH9_EXTENDED[SupportedChainId.RINKEBY],
    ],
    [SupportedChainId.GOERLI]: [ExtendedEther.onChain(SupportedChainId.GOERLI), WETH9_EXTENDED[SupportedChainId.GOERLI]],
    [SupportedChainId.KOVAN]: [ExtendedEther.onChain(SupportedChainId.KOVAN), WETH9_EXTENDED[SupportedChainId.KOVAN]],
    [SupportedChainId.ARBITRUM_ONE]: [
        ExtendedEther.onChain(SupportedChainId.ARBITRUM_ONE),
        DAI_ARBITRUM_ONE,
        USDC_ARBITRUM,
        USDT_ARBITRUM_ONE,
        WBTC_ARBITRUM_ONE,
        WETH9_EXTENDED[SupportedChainId.ARBITRUM_ONE],
    ],
    [SupportedChainId.ARBITRUM_RINKEBY]: [
        ExtendedEther.onChain(SupportedChainId.ARBITRUM_RINKEBY),
        WETH9_EXTENDED[SupportedChainId.ARBITRUM_RINKEBY],
    ],
    [SupportedChainId.OPTIMISM]: [
        ExtendedEther.onChain(SupportedChainId.OPTIMISM),
        DAI_OPTIMISM,
        USDC_OPTIMISM,
        USDT_OPTIMISM,
        WBTC_OPTIMISM,
    ],
    [SupportedChainId.OPTIMISTIC_KOVAN]: [ExtendedEther.onChain(SupportedChainId.OPTIMISTIC_KOVAN)],
};
// used to construct the list of all pairs we consider by default in the frontend
Object.assign(Object.assign({}, WETH_ONLY), { [SupportedChainId.MAINNET]: [...WETH_ONLY[SupportedChainId.MAINNET], DAI, USDC, USDT, WBTC] });
({
    [SupportedChainId.MAINNET]: [
        [
            new Token(SupportedChainId.MAINNET, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
            new Token(SupportedChainId.MAINNET, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin'),
        ],
        [USDC, USDT],
        [DAI, USDT],
    ],
});

const alwaysTrue = () => true;
/**
 * Create a filter function to apply to a token for whether it matches a particular search query
 * @param search the search query to apply to the token
 */
function createTokenFilterFunction(search) {
    const searchingAddress = isAddress(search);
    if (searchingAddress) {
        const lower = searchingAddress.toLowerCase();
        return (t) => ('isToken' in t ? searchingAddress === t.address : lower === t.address.toLowerCase());
    }
    const lowerSearchParts = search
        .toLowerCase()
        .split(/\s+/)
        .filter((s) => s.length > 0);
    if (lowerSearchParts.length === 0)
        return alwaysTrue;
    const matchesSearch = (s) => {
        const sParts = s
            .toLowerCase()
            .split(/\s+/)
            .filter((s) => s.length > 0);
        return lowerSearchParts.every((p) => p.length === 0 || sParts.some((sp) => sp.startsWith(p) || sp.endsWith(p)));
    };
    return ({ name, symbol }) => Boolean((symbol && matchesSearch(symbol)) || (name && matchesSearch(name)));
}
function filterTokens(tokens, search) {
    return tokens.filter(createTokenFilterFunction(search));
}
function useSortedTokensByQuery(tokens, searchQuery) {
    return useMemo(() => {
        if (!tokens) {
            return [];
        }
        const symbolMatch = searchQuery
            .toLowerCase()
            .split(/\s+/)
            .filter((s) => s.length > 0);
        if (symbolMatch.length > 1) {
            return tokens;
        }
        const exactMatches = [];
        const symbolSubtrings = [];
        const rest = [];
        // sort tokens by exact match -> subtring on symbol match -> rest
        tokens.map((token) => {
            var _a, _b;
            if (((_a = token.symbol) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === symbolMatch[0]) {
                return exactMatches.push(token);
            }
            else if ((_b = token.symbol) === null || _b === void 0 ? void 0 : _b.toLowerCase().startsWith(searchQuery.toLowerCase().trim())) {
                return symbolSubtrings.push(token);
            }
            else {
                return rest.push(token);
            }
        });
        return [...exactMatches, ...symbolSubtrings, ...rest];
    }, [tokens, searchQuery]);
}

const DEFAULT_LIST_PRIORITIES = DEFAULT_LIST_OF_LISTS.reduce((memo, listUrl, index) => {
    memo[listUrl] = index + 1;
    return memo;
}, {});
// use ordering of default list of lists to assign priority
function sortByListPriority(urlA, urlB) {
    if (DEFAULT_LIST_PRIORITIES[urlA] && DEFAULT_LIST_PRIORITIES[urlB]) {
        return DEFAULT_LIST_PRIORITIES[urlA] - DEFAULT_LIST_PRIORITIES[urlB];
    }
    return 0;
}

var name$1 = "Broken Token List";
var timestamp$1 = "2021-01-05T20:47:02.923Z";
var version$1 = {
	major: 1,
	minor: 0,
	patch: 0
};
var tags$1 = {
};
var logoURI$1 = "ipfs://QmNa8mQkrNKp1WEEeGjFezDmDeodkWRevGFN8JCV7b4Xir";
var keywords$1 = [
	"uniswap",
	"broken"
];
var tokens$1 = [
	{
		name: "UNI HODL",
		address: "0x4bf5dc91E2555449293D7824028Eb8Fe5879B689",
		symbol: "UniH",
		decimals: 18,
		chainId: 1,
		logoURI: ""
	}
];
var BROKEN_LIST = {
	name: name$1,
	timestamp: timestamp$1,
	version: version$1,
	tags: tags$1,
	logoURI: logoURI$1,
	keywords: keywords$1,
	tokens: tokens$1
};

var name = "Unsupported Tokens";
var timestamp = "2021-01-05T20:47:02.923Z";
var version = {
	major: 1,
	minor: 0,
	patch: 0
};
var tags = {
};
var logoURI = "ipfs://QmNa8mQkrNKp1WEEeGjFezDmDeodkWRevGFN8JCV7b4Xir";
var keywords = [
	"uniswap",
	"unsupported"
];
var tokens = [
	{
		name: "Gold Tether",
		address: "0x4922a015c4407F87432B179bb209e125432E4a2A",
		symbol: "XAUt",
		decimals: 6,
		chainId: 1,
		logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x4922a015c4407F87432B179bb209e125432E4a2A/logo.png"
	},
	{
		name: "Grump Cat",
		address: "0x93B2FfF814FCaEFFB01406e80B4Ecd89Ca6A021b",
		symbol: "GRUMPY",
		decimals: 9,
		chainId: 1,
		logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x4922a015c4407F87432B179bb209e125432E4a2A/logo.png"
	},
	{
		name: "apeUSD-UMA Synthetic USD (Dec 2021)",
		address: "0xfA5e27893aee4805283D86e4283Da64F8c72dd56",
		symbol: "apeUSD-UMA-DEC21",
		decimals: 18,
		chainId: 1,
		logoURI: ""
	},
	{
		chainId: 1,
		address: "0xc6b11850241c5127eab73af4b6c68bc267cbbff4",
		name: "oWETHp Put 360 DEC2520",
		symbol: "oWETH-360P-12/25/20",
		decimals: 7
	},
	{
		chainId: 1,
		name: "oYFIp Put 25000 OCT0220",
		address: "0x452b421be5b30f0c6ad8c3f03c06bdaab4f5c56c",
		symbol: "oYFI-25000P-10/02/20",
		decimals: 7
	},
	{
		chainId: 1,
		name: "oWETHp Put 360 OCT3020",
		address: "0x0578779e746d7186253a36cf651ea786acfcf087",
		symbol: "oWETH-360P-10/30/20",
		decimals: 7
	},
	{
		chainId: 1,
		name: "ETHc Call 500 OCT3020",
		address: "0xf9aba2e43fb19184408ea3b572a0fd672946f87b",
		symbol: "oETH-500C-10/30/20",
		decimals: 6
	},
	{
		chainId: 1,
		name: "oBALp Put 22 OCT0220",
		address: "0xdb0991dfc7e828b5a2837dc82d68e16490562c8d",
		symbol: "oBAL-22P-10/02/20",
		decimals: 7
	},
	{
		chainId: 1,
		name: "oCOMPp Put 150 SEP2520",
		address: "0xe951ebe6b4420ab3f4844cf36dedd263d095b416",
		symbol: "oCOMP-150P-09/25/20",
		decimals: 7
	},
	{
		chainId: 1,
		name: "oCRVp Put 3 SEP252020",
		address: "0x9215bd49b59748419eac6bad9dbe247df06ebdb9",
		symbol: "oCRV-3P-09/25/20",
		decimals: 7
	},
	{
		chainId: 1,
		name: "oETHp Put 180 SEP2520",
		address: "0xE3A2c34Fa2F59ffa95C4ACd1E5663633d45Bc3AD",
		symbol: "oETH-180P-09/25/20",
		decimals: 7
	},
	{
		chainId: 1,
		name: "oETHc Call 400 SEP2520",
		address: "0x05977EBC26825C0CD6097E0Ad7204721516711Eb",
		symbol: "oETH-400C-09/25/20",
		decimals: 7
	},
	{
		chainId: 1,
		name: "oWETHp Put 380 SEP1820",
		address: "0x31f88266301b08631f9f0e33fd5c43c2a5d1e5b2",
		symbol: "oWETH-380P-09/18/20",
		decimals: 7
	},
	{
		chainId: 1,
		name: "oYFIp Put 8500 SEP1820",
		address: "0xd1cec2f67fdc4c60e0963515dfc3343f31e32e47",
		symbol: "oYFI-8500P-09/18/20",
		decimals: 7
	},
	{
		chainId: 1,
		name: "oWETHp Put 370 SEP1120",
		address: "0x15844029b2c2bf24506e9937739a9a912f1e4354",
		symbol: "oWETH-370P-09/11/20",
		decimals: 7
	},
	{
		chainId: 1,
		name: "oWETHp Put 400 SEP0420",
		address: "0x5562c33c383f6386be4f6dcdbd35a3a99bbcfde6",
		symbol: "oWETH-400P-09/04/20",
		decimals: 7
	},
	{
		chainId: 1,
		name: "oETHp Put 200 AUG2820",
		address: "0x3CBFC1397deF0602c2d211c70A1c0c38CEDB5448",
		symbol: "oWETH-400P-09/04/20",
		decimals: 7
	},
	{
		chainId: 1,
		name: "Opyn cDai Insurance",
		symbol: "ocDai",
		address: "0x98cc3bd6af1880fcfda17ac477b2f612980e5e33",
		decimals: 8
	},
	{
		chainId: 1,
		name: "Opyn cUSDC Insurance",
		symbol: "ocUSDC",
		address: "0x8ED9f862363fFdFD3a07546e618214b6D59F03d4",
		decimals: 8
	},
	{
		chainId: 1,
		address: "0x176C674Ee533C6139B0dc8b458D72A93dCB3e705",
		symbol: "iAAVE",
		name: "Synth Inverse Aave",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iAAVE.svg",
		tags: [
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x8A8079c7149B8A1611e5C5d978DCA3bE16545F83",
		symbol: "iADA",
		name: "Synth Inverse Cardano",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iADA.svg",
		tags: [
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xAFD870F32CE54EfdBF677466B612bf8ad164454B",
		symbol: "iBNB",
		name: "Synth Inverse Binance Coin",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iBNB.svg",
		tags: [
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xD6014EA05BDe904448B743833dDF07c3C7837481",
		symbol: "iBTC",
		name: "Synth Inverse Bitcoin",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iBTC.svg",
		tags: [
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x336213e1DDFC69f4701Fc3F86F4ef4A160c1159d",
		symbol: "iCEX",
		name: "Synth Inverse Centralised Exchange Index",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iCEX.svg",
		tags: [
			"index",
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x6345728B1ccE16E6f8C509950b5c84FFF88530d9",
		symbol: "iCOMP",
		name: "Synth Inverse Compound",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iCOMP.svg",
		tags: [
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xCB98f42221b2C251A4E74A1609722eE09f0cc08E",
		symbol: "iDASH",
		name: "Synth Inverse Dash",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iDASH.svg",
		tags: [
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x14d10003807AC60d07BB0ba82cAeaC8d2087c157",
		symbol: "iDEFI",
		name: "Synth Inverse DeFi Index",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iDEFI.svg",
		tags: [
			"index",
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x46a97629C9C1F58De6EC18C7F536e7E6d6A6ecDe",
		symbol: "iDOT",
		name: "Synth Inverse Polkadot",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iDOT.svg",
		tags: [
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xF4EebDD0704021eF2a6Bbe993fdf93030Cd784b4",
		symbol: "iEOS",
		name: "Synth Inverse EOS",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iEOS.svg",
		tags: [
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xd50c1746D835d2770dDA3703B69187bFfeB14126",
		symbol: "iETC",
		name: "Synth Inverse Ethereum Classic",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iETC.svg",
		tags: [
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xA9859874e1743A32409f75bB11549892138BBA1E",
		symbol: "iETH",
		name: "Synth Inverse Ether",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iETH.svg",
		tags: [
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x2d7aC061fc3db53c39fe1607fB8cec1B2C162B01",
		symbol: "iLINK",
		name: "Synth Inverse Chainlink",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iLINK.svg",
		tags: [
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x79da1431150C9b82D2E5dfc1C68B33216846851e",
		symbol: "iLTC",
		name: "Synth Inverse Litecoin",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iLTC.svg",
		tags: [
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xA5a5DF41883Cdc00c4cCC6E8097130535399d9a3",
		symbol: "iOIL",
		name: "Synth Inverse Perpetual Oil Futures",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iOIL.svg",
		tags: [
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x0fEd38108bdb8e62ef7b5680E8E0726E2F29e0De",
		symbol: "iREN",
		name: "Synth Inverse Ren",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iREN.svg",
		tags: [
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xC5807183a9661A533CB08CbC297594a0B864dc12",
		symbol: "iTRX",
		name: "Synth Inverse TRON",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iTRX.svg",
		tags: [
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x36A00FF9072570eF4B9292117850B8FE08d96cce",
		symbol: "iUNI",
		name: "Synth Inverse Uniswap",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iUNI.svg",
		tags: [
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x4AdF728E2Df4945082cDD6053869f51278fae196",
		symbol: "iXMR",
		name: "Synth Inverse Monero",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iXMR.svg",
		tags: [
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x27269b3e45A4D3E79A3D6BFeE0C8fB13d0D711A6",
		symbol: "iXRP",
		name: "Synth Inverse Ripple",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iXRP.svg",
		tags: [
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x8deef89058090ac5655A99EEB451a4f9183D1678",
		symbol: "iXTZ",
		name: "Synth Inverse Tezos",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iXTZ.svg",
		tags: [
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x592244301CeA952d6daB2fdC1fE6bd9E53917306",
		symbol: "iYFI",
		name: "Synth Inverse yearn.finance",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/iYFI.svg",
		tags: [
			"inverse",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xcD39b5434a0A92cf47D1F567a7dF84bE356814F0",
		symbol: "s1INCH",
		name: "Synth 1inch",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/s1INCH.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x7537AAe01f3B218DAE75e10d952473823F961B87",
		symbol: "sAAPL",
		name: "Synth Apple",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sAAPL.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xd2dF355C19471c8bd7D8A3aa27Ff4e26A21b4076",
		symbol: "sAAVE",
		name: "Synth Aave",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sAAVE.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xe36E2D3c7c34281FA3bC737950a68571736880A1",
		symbol: "sADA",
		name: "Synth Cardano",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sADA.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x9CF7E61853ea30A41b02169391b393B901eac457",
		symbol: "sAMZN",
		name: "Synth Amazon",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sAMZN.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xF48e200EAF9906362BB1442fca31e0835773b8B4",
		symbol: "sAUD",
		name: "Synth Australian Dollars",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sAUD.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x617aeCB6137B5108D1E7D4918e3725C8cEbdB848",
		symbol: "sBNB",
		name: "Synth Binance Coin",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sBNB.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xfE18be6b3Bd88A2D2A7f928d00292E7a9963CfC6",
		symbol: "sBTC",
		name: "Synth Bitcoin",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sBTC.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xeABACD844A196D7Faf3CE596edeBF9900341B420",
		symbol: "sCEX",
		name: "Synth Centralised Exchange Index",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sCEX.svg",
		tags: [
			"index",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x0F83287FF768D1c1e17a42F44d644D7F22e8ee1d",
		symbol: "sCHF",
		name: "Synth Swiss Franc",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sCHF.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x9EeF4CA7aB9fa8bc0650127341C2d3F707a40f8A",
		symbol: "sCOIN",
		name: "Synth Coinbase",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sCOIN.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xEb029507d3e043DD6C87F2917C4E82B902c35618",
		symbol: "sCOMP",
		name: "Synth Compound",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sCOMP.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xD38aEb759891882e78E957c80656572503D8c1B1",
		symbol: "sCRV",
		name: "Synth Curve DAO Token",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sCRV.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xfE33ae95A9f0DA8A845aF33516EDc240DCD711d6",
		symbol: "sDASH",
		name: "Synth Dash",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sDASH.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xe1aFe1Fd76Fd88f78cBf599ea1846231B8bA3B6B",
		symbol: "sDEFI",
		name: "Synth DeFi Index",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sDEFI.svg",
		tags: [
			"index",
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x1715AC0743102BF5Cd58EfBB6Cf2dC2685d967b6",
		symbol: "sDOT",
		name: "Synth Polkadot",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sDOT.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x88C8Cf3A212c0369698D13FE98Fcb76620389841",
		symbol: "sEOS",
		name: "Synth EOS",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sEOS.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x22602469d704BfFb0936c7A7cfcD18f7aA269375",
		symbol: "sETC",
		name: "Synth Ethereum Classic",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sETC.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x5e74C9036fb86BD7eCdcb084a0673EFc32eA31cb",
		symbol: "sETH",
		name: "Synth Ether",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sETH.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xD71eCFF9342A5Ced620049e616c5035F1dB98620",
		symbol: "sEUR",
		name: "Synth Euros",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sEUR.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xf50B5e535F62a56A9BD2d8e2434204E726c027Fa",
		symbol: "sFB",
		name: "Synth Facebook",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sFB.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x23348160D7f5aca21195dF2b70f28Fce2B0be9fC",
		symbol: "sFTSE",
		name: "Synth FTSE 100 Index",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sFTSE.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x97fe22E7341a0Cd8Db6F6C021A24Dc8f4DAD855F",
		symbol: "sGBP",
		name: "Synth Pound Sterling",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sGBP.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xC63B8ECCE56aB9C46184eC6aB85e4771fEa4c8AD",
		symbol: "sGOOG",
		name: "Synth Alphabet",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sGOOG.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xF6b1C627e95BFc3c1b4c9B825a032Ff0fBf3e07d",
		symbol: "sJPY",
		name: "Synth Japanese Yen",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sJPY.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x269895a3dF4D73b077Fc823dD6dA1B95f72Aaf9B",
		symbol: "sKRW",
		name: "Synth South Korean Won",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sKRW.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xbBC455cb4F1B9e4bFC4B73970d360c8f032EfEE6",
		symbol: "sLINK",
		name: "Synth Chainlink",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sLINK.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xC14103C2141E842e228FBaC594579e798616ce7A",
		symbol: "sLTC",
		name: "Synth Litecoin",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sLTC.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x745a824D6aBBD236AA794b5530062778A6Ad7523",
		symbol: "sMSFT",
		name: "Synth Microsoft",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sMSFT.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x5A7E3c07604EB515C16b36cd51906a65f021F609",
		symbol: "sNFLX",
		name: "Synth Netflix",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sNFLX.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x757de3ac6B830a931eF178C6634c5C551773155c",
		symbol: "sNIKKEI",
		name: "Synth Nikkei 225 Index",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sNIKKEI.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x6d16cF3EC5F763d4d99cB0B0b110eefD93B11B56",
		symbol: "sOIL",
		name: "Synth Perpetual Oil Futures",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sOIL.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xD31533E8d0f3DF62060e94B3F1318137bB6E3525",
		symbol: "sREN",
		name: "Synth Ren",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sREN.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x0352557B007A4Aae1511C114409b932F06F9E2f4",
		symbol: "sRUNE",
		name: "Synth THORChain",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sRUNE.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xf2E08356588EC5cd9E437552Da87C0076b4970B0",
		symbol: "sTRX",
		name: "Synth TRON",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sTRX.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x918dA91Ccbc32B7a6A0cc4eCd5987bbab6E31e6D",
		symbol: "sTSLA",
		name: "Synth Tesla",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sTSLA.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x30635297E450b930f8693297eBa160D9e6c8eBcf",
		symbol: "sUNI",
		name: "Synth Uniswap",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sUNI.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x6A22e5e94388464181578Aa7A6B869e00fE27846",
		symbol: "sXAG",
		name: "Synth Silver Ounce",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sXAG.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x261EfCdD24CeA98652B9700800a13DfBca4103fF",
		symbol: "sXAU",
		name: "Synth Gold Ounce",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sXAU.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x5299d6F7472DCc137D7f3C4BcfBBB514BaBF341A",
		symbol: "sXMR",
		name: "Synth Monero",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sXMR.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0xa2B0fDe6D710e201d0d608e924A484d1A5fEd57c",
		symbol: "sXRP",
		name: "Synth Ripple",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sXRP.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x2e59005c5c0f0a4D77CcA82653d48b46322EE5Cd",
		symbol: "sXTZ",
		name: "Synth Tezos",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sXTZ.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x992058B7DB08F9734d84485bfbC243C4ee6954A7",
		symbol: "sYFI",
		name: "Synth yearn.finance",
		decimals: 18,
		logoURI: "https://raw.githubusercontent.com/Synthetixio/synthetix-assets/v2.0.10/synths/sYFI.svg",
		tags: [
			"synth"
		]
	},
	{
		chainId: 1,
		address: "0x81ab848898b5ffD3354dbbEfb333D5D183eEDcB5",
		name: "yUSD Synthetic Expiring 1 September 2020",
		symbol: "yUSDSEP20",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0xB2FdD60AD80ca7bA89B9BAb3b5336c2601C020b4",
		name: "yUSD Synthetic Expiring 1 October 2020",
		symbol: "yUSDOCT20",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x208d174775dc39fe18b1b374972f77ddec6c0f73",
		name: "uUSDrBTC Synthetic Expiring 1 Oct 2020",
		symbol: "uUSDrBTC-OCT",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0xf06ddacf71e2992e2122a1a0168c6967afdf63ce",
		name: "uUSDrBTC Synthetic Expiring 31 Dec 2020",
		symbol: "uUSDrBTC-DEC",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0xd16c79c8a39d44b2f3eb45d2019cd6a42b03e2a9",
		name: "uUSDwETH Synthetic Expiring 31 Dec 2020",
		symbol: "uUSDwETH-DEC",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x3d995510f8d82c2ea341845932b5ddde0bead9a3",
		name: "uGAS-JAN21 Token Expiring 31 Jan 2021",
		symbol: "uGAS-JAN21",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x90f802c7e8fb5d40b0de583e34c065a3bd2020d8",
		name: "YD-ETH-MAR21 Token Expiring 31 Mar 2021",
		symbol: "YD-ETH-MAR21",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x002f0b1a71c5730cf2f4da1970a889207bdb6d0d",
		name: "YD-BTC-MAR21 Token Expiring 31 Mar 2021",
		symbol: "YD-BTC-MAR21",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x1062ad0e59fa67fa0b27369113098cc941dd0d5f",
		name: "UMA 35 Call Expirying 30 Apr 2021",
		symbol: "UMAc35-0421",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0xf93340b1a3adf7eedcaec25fae8171d4b736e89f",
		name: "pxUSD Synthetic USD Expiring 1 April 2021",
		symbol: "pxUSD_MAR2021",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x84bd083b1c8bf929f39c98bc17cf518f40154f58",
		name: "Mario Cash Synthetic Token Expiring 15 January 2021",
		symbol: "Mario Cash-JAN-2021",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x81fab276aec924fbde190cf379783526d413cf70",
		name: "uGAS-FEB21 Token Expiring 28 Feb 2021",
		symbol: "uGAS-FEB21",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x4e110603e70b0b5f1c403ee543b37e1f1244cf28",
		name: "uGAS-MAR21 Token Expiring 31 Mar 2021",
		symbol: "uGAS-MAR21",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0xcf55a7f92d5e0c6683debbc1fc20c0a6e056df13",
		name: "Zelda Elastic Cash",
		symbol: "Zelda Elastic Cash",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x654eebac62240e6c56bab5f6adf7cfa74a894510",
		name: "Zelda Spring Nuts Cash",
		symbol: "Zelda Spring Nuts Cash",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0xa48920cc1ad85d8ea13af5d7be180c0338c306dd",
		name: "Zelda Summer Nuts Cash",
		symbol: "Zelda Summer Nuts Cash",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x249a198d59b57fda5dda90630febc86fd8c7594c",
		name: "Zelda Whirlwind Cash",
		symbol: "Zelda Whirlwind Cash",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x5ed1406873c9eb91f6f9a67ac4e152387c1132e7",
		name: "Zelda Reinforced Cash",
		symbol: "Zelda Reinforced Cash",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x8104c9f13118320eefe5fbea8a44d600b85981ef",
		name: "Mini Mario Summer Cash",
		symbol: "Mini Mario Summer Cash",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x69746c719e59674b147df25f50e7cfa0673cb625",
		name: "Mini Mario Spring Cash",
		symbol: "Mini Mario Spring Cash",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x6b1257641d18791141f025eab36fb567c4b564ff",
		name: "Bitcoin Dominance Token 31 March 2021",
		symbol: "BTCDOM-MAR2021",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x4e83b6287588a96321b2661c5e041845ff7814af",
		name: "Altcoin Dominance Token 31 March 2021",
		symbol: "ALTDOM-MAR2021",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x59fec83ec709c893aedd1a144cf1828eb04127cd",
		name: "pxGOLD Synthetic GOLD Expiring 31 May 2021",
		symbol: "pxGOLD_MAY2021",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x89337BFb7938804c3776C9FB921EccAf5ab76758",
		name: "Compound Annualized Rate Future Expiring 28 March 2021",
		symbol: "CAR-USDC-MAR21",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0xec58d3aefc9aaa2e0036fa65f70d569f49d9d1ed",
		name: "uSTONKS Index Token April 2021",
		symbol: "uSTONKS_APR21",
		decimals: 6
	},
	{
		chainId: 1,
		address: "0xa6B9d7E3d76cF23549293Fb22c488E0Ea591A44e",
		name: "uGAS-JUN21 Token Expiring 30 Jun 2021",
		symbol: "uGAS-JUN21",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0xe813b65da6c38a04591aed3f082d32db7d53c382",
		name: "Yield Dollar [WETH Dec 2021]",
		symbol: "YD-ETH-DEC21",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x4b606e9eb2228c70f44453afe5a73e1fea258ce1",
		name: "pxUSD Synthetic USD Expiring 31 Mar 2022",
		symbol: "pxUSD_MAR2022",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x5247c0db4044fb6f97f32c7e1b48758019a5a912",
		name: "pxGOLD Synthetic Gold Expiring 31 Mar 2022",
		symbol: "pxGOLD_MAR2022",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x56fb1acaff95c0b6ebcd17c8361a63d98b1a5a11",
		name: "uForex CNYUSD Synthetic Token April 2021",
		symbol: "uCNYUSD-APR",
		decimals: 6
	},
	{
		chainId: 1,
		address: "0xd49fa405dce086c65d66ca1ca41f8e98583812b4",
		name: "uForex EURUSD Synthetic Token April 2021",
		symbol: "uEURUSD-APR",
		decimals: 6
	},
	{
		chainId: 1,
		address: "0x29dddacba3b231ee8d673dd0f0fa759ea145561b",
		name: "DEFI_PULSE_TOTAL_TVL Synthetic Token Expiring 15 April 2021",
		symbol: "TVL_ALL_APRIL15",
		decimals: 6
	},
	{
		chainId: 1,
		address: "0xcbe430927370e95b4b10cfc702c6017ec7abefc3",
		name: "Yield Dollar [WETH Jun 2021]",
		symbol: "YD-ETH-JUN21",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x4b7fb448df91c8ed973494f8c8c4f12daf3a8521",
		name: "Yield Dollar [renBTC Jun 2021]",
		symbol: "YD-BTC-JUN21",
		decimals: 8
	},
	{
		chainId: 1,
		address: "0x3108c33b6fb38efedaefd8b5f7ca01d5f5c7372d",
		name: "Yield Dollar UMA 21",
		symbol: "yUMA21",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x0cae9e4d663793c2a2A0b211c1Cf4bBca2B9cAa7",
		name: "Mirrored Amazon",
		symbol: "MAMZN",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x31c63146a635EB7465e5853020b39713AC356991",
		name: "M US Oil",
		symbol: "MUSO",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x59A921Db27Dd6d4d974745B7FfC5c33932653442",
		name: "M Google",
		symbol: "MGOOGL",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0xf72FCd9DCF0190923Fadd44811E240Ef4533fc86",
		name: "Mirrored ProShares",
		symbol: "MVIXY",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x56aA298a19C93c6801FDde870fA63EF75Cc0aF72",
		name: "Mirrored Alibaba",
		symbol: "MBABA",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x0e99cC0535BB6251F6679Fa6E65d6d3b430e840B",
		name: "Mirrored Facebook",
		symbol: "MFB",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x13B02c8dE71680e71F0820c996E4bE43c2F57d15",
		name: "Mirrored Invesco QQ",
		symbol: "MQQQ",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x41BbEDd7286dAab5910a1f15d12CBda839852BD7",
		name: "Mirrored Microsoft",
		symbol: "MMSFT",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x9d1555d8cB3C846Bb4f7D5B1B1080872c3166676",
		name: "Mirrored iShares Si",
		symbol: "MSLV",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x21cA39943E91d704678F5D00b6616650F066fD63",
		name: "Mirrored Tesla",
		symbol: "MTSLA",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0xe82bbB62fA81d0701643d1675FB50ec52fD3Df92",
		name: "DYDX Token",
		symbol: "DYDX",
		decimals: 18
	},
	{
		chainId: 10,
		address: "0xE405de8F52ba7559f9df3C368500B6E6ae6Cee49",
		name: "sETH",
		symbol: "Synth Ether",
		decimals: 18
	},
	{
		chainId: 10,
		address: "0x298B9B95708152ff6968aafd889c6586e9169f1D",
		name: "sBTC",
		symbol: "Synth Bitcoin",
		decimals: 18
	},
	{
		chainId: 10,
		address: "0xc5Db22719A06418028A40A9B5E9A7c02959D0d08",
		name: "sLINK",
		symbol: "Synth Link",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x6B60eE11b73230045cF9095E6e43AE9Ea638e172",
		name: "Shatner",
		symbol: "SHAT",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x7277a44D1325D81Ac58893002a1B40a41bea43fe",
		name: "FAANG Index",
		symbol: "FAANG",
		decimals: 18
	},
	{
		chainId: 1,
		address: "0x76175599887730786bdA1545D0D7AcE8737fEBB1",
		name: "ENS DAO",
		symbol: "ENS",
		decimals: 18
	}
];
var UNSUPPORTED_TOKEN_LIST = {
	name: name,
	timestamp: timestamp,
	version: version,
	tags: tags,
	logoURI: logoURI,
	keywords: keywords,
	tokens: tokens
};

/**
 * Token instances created from token info on a token list.
 */
class WrappedTokenInfo {
    constructor(tokenInfo, list) {
        this.isNative = false;
        this.isToken = true;
        this._checksummedAddress = null;
        this._tags = null;
        this.tokenInfo = tokenInfo;
        this.list = list;
    }
    get address() {
        if (this._checksummedAddress)
            return this._checksummedAddress;
        const checksummedAddress = isAddress(this.tokenInfo.address);
        if (!checksummedAddress)
            throw new Error(`Invalid token address: ${this.tokenInfo.address}`);
        return (this._checksummedAddress = checksummedAddress);
    }
    get chainId() {
        return this.tokenInfo.chainId;
    }
    get decimals() {
        return this.tokenInfo.decimals;
    }
    get name() {
        return this.tokenInfo.name;
    }
    get symbol() {
        return this.tokenInfo.symbol;
    }
    get logoURI() {
        return this.tokenInfo.logoURI;
    }
    get tags() {
        if (this._tags !== null)
            return this._tags;
        if (!this.tokenInfo.tags)
            return (this._tags = []);
        const listTags = this.list.tags;
        if (!listTags)
            return (this._tags = []);
        return (this._tags = this.tokenInfo.tags.map((tagId) => {
            return Object.assign(Object.assign({}, listTags[tagId]), { id: tagId });
        }));
    }
    equals(other) {
        return other.chainId === this.chainId && other.isToken && other.address.toLowerCase() === this.address.toLowerCase();
    }
    sortsBefore(other) {
        if (this.equals(other))
            throw new Error('Addresses should not be equal');
        return this.address.toLowerCase() < other.address.toLowerCase();
    }
    get wrapped() {
        return this;
    }
}

const listCache = typeof WeakMap !== 'undefined' ? new WeakMap() : null;
function listToTokenMap(list) {
    const result = listCache === null || listCache === void 0 ? void 0 : listCache.get(list);
    if (result)
        return result;
    const map = list.tokens.reduce((tokenMap, tokenInfo) => {
        var _a;
        const token = new WrappedTokenInfo(tokenInfo, list);
        if (((_a = tokenMap[token.chainId]) === null || _a === void 0 ? void 0 : _a[token.address]) !== undefined) {
            console.error(`Duplicate token! ${token.address}`);
            return tokenMap;
        }
        if (!tokenMap[token.chainId])
            tokenMap[token.chainId] = {};
        tokenMap[token.chainId][token.address] = {
            token,
            list,
        };
        return tokenMap;
    }, {});
    listCache === null || listCache === void 0 ? void 0 : listCache.set(list, map);
    return map;
}
function useAllLists() {
    return useAppSelector((state) => state.lists.byUrl);
}
/**
 * Combine the tokens in map2 with the tokens on map1, where tokens on map1 take precedence
 * @param map1 the base token map
 * @param map2 the map of additioanl tokens to add to the base map
 */
function combineMaps(map1, map2) {
    const chainIds = Object.keys(Object.keys(map1)
        .concat(Object.keys(map2))
        .reduce((memo, value) => {
        memo[value] = true;
        return memo;
    }, {})).map((id) => parseInt(id));
    return chainIds.reduce((memo, chainId) => {
        memo[chainId] = Object.assign(Object.assign({}, map2[chainId]), map1[chainId]);
        return memo;
    }, {});
}
// merge tokens contained within lists from urls
function useCombinedTokenMapFromUrls(urls) {
    const lists = useAllLists();
    return useMemo(() => {
        if (!urls)
            return {};
        return (urls
            .slice()
            // sort by priority so top priority goes last
            .sort(sortByListPriority)
            .reduce((allTokens, currentUrl) => {
            var _a;
            const current = (_a = lists[currentUrl]) === null || _a === void 0 ? void 0 : _a.current;
            if (!current)
                return allTokens;
            try {
                return combineMaps(allTokens, listToTokenMap(current));
            }
            catch (error) {
                console.error('Could not show token list due to error', error);
                return allTokens;
            }
        }, {}));
    }, [lists, urls]);
}
// filter out unsupported lists
function useActiveListUrls() {
    const activeListUrls = useAppSelector((state) => state.lists.activeListUrls);
    return useMemo(() => activeListUrls === null || activeListUrls === void 0 ? void 0 : activeListUrls.filter((url) => !UNSUPPORTED_LIST_URLS.includes(url)), [activeListUrls]);
}
function useInactiveListUrls() {
    const lists = useAllLists();
    const allActiveListUrls = useActiveListUrls();
    return useMemo(() => Object.keys(lists).filter((url) => !(allActiveListUrls === null || allActiveListUrls === void 0 ? void 0 : allActiveListUrls.includes(url)) && !UNSUPPORTED_LIST_URLS.includes(url)), [lists, allActiveListUrls]);
}
// get all the tokens from active lists, combine with local default tokens
function useCombinedActiveList() {
    const activeListUrls = useActiveListUrls();
    const activeTokens = useCombinedTokenMapFromUrls(activeListUrls);
    return activeTokens;
}
// list of tokens not supported on interface for various reasons, used to show warnings and prevent swaps and adds
function useUnsupportedTokenList() {
    // get hard-coded broken tokens
    const brokenListMap = useMemo(() => listToTokenMap(BROKEN_LIST), []);
    // get hard-coded list of unsupported tokens
    const localUnsupportedListMap = useMemo(() => listToTokenMap(UNSUPPORTED_TOKEN_LIST), []);
    // get dynamic list of unsupported tokens
    const loadedUnsupportedListMap = useCombinedTokenMapFromUrls(UNSUPPORTED_LIST_URLS);
    // format into one token address map
    return useMemo(() => combineMaps(brokenListMap, combineMaps(localUnsupportedListMap, loadedUnsupportedListMap)), [brokenListMap, localUnsupportedListMap, loadedUnsupportedListMap]);
}
function useIsListActive(url) {
    const activeListUrls = useActiveListUrls();
    return Boolean(activeListUrls === null || activeListUrls === void 0 ? void 0 : activeListUrls.includes(url));
}

// reduce token map into standard address <-> Token mapping, optionally include user added tokens
function useTokensFromMap(tokenMap, includeUserAdded) {
    const { chainId } = useActiveWeb3React();
    const userAddedTokens = useUserAddedTokens();
    return useMemo(() => {
        var _a;
        if (!chainId)
            return {};
        // reduce to just tokens
        const mapWithoutUrls = Object.keys((_a = tokenMap[chainId]) !== null && _a !== void 0 ? _a : {}).reduce((newMap, address) => {
            newMap[address] = tokenMap[chainId][address].token;
            return newMap;
        }, {});
        if (includeUserAdded) {
            return (userAddedTokens
                // reduce into all ALL_TOKENS filtered by the current chain
                .reduce((tokenMap, token) => {
                tokenMap[token.address] = token;
                return tokenMap;
            }, Object.assign({}, mapWithoutUrls)));
        }
        return mapWithoutUrls;
    }, [chainId, userAddedTokens, tokenMap, includeUserAdded]);
}
function useAllTokens() {
    const allTokens = useCombinedActiveList();
    return useTokensFromMap(allTokens, true);
}
function useUnsupportedTokens() {
    const { chainId } = useActiveWeb3React();
    const listsByUrl = useAllLists();
    const unsupportedTokensMap = useUnsupportedTokenList();
    const unsupportedTokens = useTokensFromMap(unsupportedTokensMap, false);
    // checks the default L2 lists to see if `bridgeInfo` has an L1 address value that is unsupported
    const l2InferredBlockedTokens = useMemo(() => {
        if (!chainId || !L2_CHAIN_IDS.includes(chainId)) {
            return {};
        }
        if (!listsByUrl) {
            return {};
        }
        const listUrl = CHAIN_INFO[chainId].defaultListUrl;
        const { current: list } = listsByUrl[listUrl];
        if (!list) {
            return {};
        }
        const unsupportedSet = new Set(Object.keys(unsupportedTokens));
        return list.tokens.reduce((acc, tokenInfo) => {
            var _a;
            const bridgeInfo = (_a = tokenInfo.extensions) === null || _a === void 0 ? void 0 : _a.bridgeInfo;
            if (bridgeInfo &&
                bridgeInfo[SupportedChainId.MAINNET] &&
                bridgeInfo[SupportedChainId.MAINNET].tokenAddress &&
                unsupportedSet.has(bridgeInfo[SupportedChainId.MAINNET].tokenAddress)) {
                const address = bridgeInfo[SupportedChainId.MAINNET].tokenAddress;
                // don't rely on decimals--it's possible that a token could be bridged w/ different decimals on the L2
                return Object.assign(Object.assign({}, acc), { [address]: new Token(SupportedChainId.MAINNET, address, tokenInfo.decimals) });
            }
            return acc;
        }, {});
    }, [chainId, listsByUrl, unsupportedTokens]);
    return Object.assign(Object.assign({}, unsupportedTokens), l2InferredBlockedTokens);
}
function useSearchInactiveTokenLists(search, minResults = 10) {
    const lists = useAllLists();
    const inactiveUrls = useInactiveListUrls();
    const { chainId } = useActiveWeb3React();
    const activeTokens = useAllTokens();
    return useMemo(() => {
        if (!search || search.trim().length === 0)
            return [];
        const tokenFilter = createTokenFilterFunction(search);
        const result = [];
        const addressSet = {};
        for (const url of inactiveUrls) {
            const list = lists[url].current;
            if (!list)
                continue;
            for (const tokenInfo of list.tokens) {
                if (tokenInfo.chainId === chainId && tokenFilter(tokenInfo)) {
                    const wrapped = new WrappedTokenInfo(tokenInfo, list);
                    if (!(wrapped.address in activeTokens) && !addressSet[wrapped.address]) {
                        addressSet[wrapped.address] = true;
                        result.push(wrapped);
                        if (result.length >= minResults)
                            return result;
                    }
                }
            }
        }
        return result;
    }, [activeTokens, chainId, inactiveUrls, lists, minResults, search]);
}
function useIsTokenActive(token) {
    const activeTokens = useAllTokens();
    if (!activeTokens || !token) {
        return false;
    }
    return !!activeTokens[token.address];
}
// Check if currency is included in custom list from user storage
function useIsUserAddedToken(currency) {
    const userAddedTokens = useUserAddedTokens();
    if (!currency) {
        return false;
    }
    return !!userAddedTokens.find((token) => currency.equals(token));
}
// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/;
function parseStringOrBytes32(str, bytes32, defaultValue) {
    return str && str.length > 0
        ? str
        : // need to check for proper bytes string and valid terminator
            bytes32 && BYTES32_REGEX.test(bytes32) && arrayify(bytes32)[31] === 0
                ? parseBytes32String(bytes32)
                : defaultValue;
}
// undefined if invalid or does not exist
// null if loading or null was passed
// otherwise returns the token
function useToken(tokenAddress) {
    const { chainId } = useActiveWeb3React();
    const tokens = useAllTokens();
    const address = isAddress(tokenAddress);
    const tokenContract = useTokenContract(address ? address : undefined, false);
    const tokenContractBytes32 = useBytes32TokenContract(address ? address : undefined, false);
    const token = address ? tokens[address] : undefined;
    const tokenName = useSingleCallResult(token ? undefined : tokenContract, 'name', undefined, NEVER_RELOAD);
    const tokenNameBytes32 = useSingleCallResult(token ? undefined : tokenContractBytes32, 'name', undefined, NEVER_RELOAD);
    const symbol = useSingleCallResult(token ? undefined : tokenContract, 'symbol', undefined, NEVER_RELOAD);
    const symbolBytes32 = useSingleCallResult(token ? undefined : tokenContractBytes32, 'symbol', undefined, NEVER_RELOAD);
    const decimals = useSingleCallResult(token ? undefined : tokenContract, 'decimals', undefined, NEVER_RELOAD);
    return useMemo(() => {
        var _a, _b, _c, _d;
        if (token)
            return token;
        if (tokenAddress === null)
            return null;
        if (!chainId || !address)
            return undefined;
        if (decimals.loading || symbol.loading || tokenName.loading)
            return null;
        if (decimals.result) {
            return new Token(chainId, address, decimals.result[0], parseStringOrBytes32((_a = symbol.result) === null || _a === void 0 ? void 0 : _a[0], (_b = symbolBytes32.result) === null || _b === void 0 ? void 0 : _b[0], 'UNKNOWN'), parseStringOrBytes32((_c = tokenName.result) === null || _c === void 0 ? void 0 : _c[0], (_d = tokenNameBytes32.result) === null || _d === void 0 ? void 0 : _d[0], 'Unknown Token'));
        }
        return undefined;
    }, [
        address,
        chainId,
        decimals.loading,
        decimals.result,
        symbol.loading,
        symbol.result,
        symbolBytes32.result,
        token,
        tokenAddress,
        tokenName.loading,
        tokenName.result,
        tokenNameBytes32.result,
    ]);
}
function useCurrency(currencyId) {
    var _a;
    const { chainId } = useActiveWeb3React();
    const isETH = (currencyId === null || currencyId === void 0 ? void 0 : currencyId.toUpperCase()) === 'ETH';
    const token = useToken(isETH ? undefined : currencyId);
    const extendedEther = useMemo(() => chainId
        ? ExtendedEther.onChain(chainId)
        : // display mainnet when not connected
            ExtendedEther.onChain(SupportedChainId.MAINNET), [chainId]);
    const weth = chainId ? WETH9_EXTENDED[chainId] : undefined;
    if (currencyId === null || currencyId === undefined)
        return currencyId;
    if (((_a = weth === null || weth === void 0 ? void 0 : weth.address) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === (currencyId === null || currencyId === void 0 ? void 0 : currencyId.toUpperCase()))
        return weth;
    return isETH ? extendedEther : token;
}

function serializeToken(token) {
    return {
        chainId: token.chainId,
        address: token.address,
        decimals: token.decimals,
        symbol: token.symbol,
        name: token.name,
    };
}
function deserializeToken(serializedToken) {
    return new Token(serializedToken.chainId, serializedToken.address, serializedToken.decimals, serializedToken.symbol, serializedToken.name);
}
function useIsDarkMode() {
    const { userDarkMode, matchesDarkMode } = useAppSelector(({ user: { matchesDarkMode, userDarkMode } }) => ({
        userDarkMode,
        matchesDarkMode,
    }), shallowEqual);
    return userDarkMode === null ? matchesDarkMode : userDarkMode;
}
function useDarkModeManager() {
    const dispatch = useAppDispatch();
    const darkMode = useIsDarkMode();
    const toggleSetDarkMode = useCallback(() => {
        dispatch(updateUserDarkMode({ userDarkMode: !darkMode }));
    }, [darkMode, dispatch]);
    return [darkMode, toggleSetDarkMode];
}
function useUserLocale() {
    return useAppSelector((state) => state.user.userLocale);
}
function useUserLocaleManager() {
    const dispatch = useAppDispatch();
    const locale = useUserLocale();
    const setLocale = useCallback((newLocale) => {
        dispatch(updateUserLocale({ userLocale: newLocale }));
    }, [dispatch]);
    return [locale, setLocale];
}
function useIsExpertMode() {
    return useAppSelector((state) => state.user.userExpertMode);
}
function useExpertModeManager() {
    const dispatch = useAppDispatch();
    const expertMode = useIsExpertMode();
    const toggleSetExpertMode = useCallback(() => {
        dispatch(updateUserExpertMode({ userExpertMode: !expertMode }));
    }, [expertMode, dispatch]);
    return [expertMode, toggleSetExpertMode];
}
function useClientSideRouter() {
    const dispatch = useAppDispatch();
    const clientSideRouter = useAppSelector((state) => Boolean(state.user.userClientSideRouter));
    const setClientSideRouter = useCallback((newClientSideRouter) => {
        dispatch(updateUserClientSideRouter({ userClientSideRouter: newClientSideRouter }));
    }, [dispatch]);
    return [clientSideRouter, setClientSideRouter];
}
function useRoutingAPIEnabled() {
    const { chainId } = useActiveWeb3React();
    const [clientSideRouter] = useClientSideRouter();
    return chainId === SupportedChainId.MAINNET && !clientSideRouter;
}
function useSetUserSlippageTolerance() {
    const dispatch = useAppDispatch();
    return useCallback((userSlippageTolerance) => {
        let value;
        try {
            value =
                userSlippageTolerance === 'auto' ? 'auto' : JSBI.toNumber(userSlippageTolerance.multiply(10000).quotient);
        }
        catch (error) {
            value = 'auto';
        }
        dispatch(updateUserSlippageTolerance({
            userSlippageTolerance: value,
        }));
    }, [dispatch]);
}
/**
 * Return the user's slippage tolerance, from the redux store, and a function to update the slippage tolerance
 */
function useUserSlippageTolerance() {
    const userSlippageTolerance = useAppSelector((state) => {
        return state.user.userSlippageTolerance;
    });
    return useMemo(() => (userSlippageTolerance === 'auto' ? 'auto' : new Percent(userSlippageTolerance, 10000)), [userSlippageTolerance]);
}
/**
 * Same as above but replaces the auto with a default value
 * @param defaultSlippageTolerance the default value to replace auto with
 */
function useUserSlippageToleranceWithDefault(defaultSlippageTolerance) {
    const allowedSlippage = useUserSlippageTolerance();
    return useMemo(() => (allowedSlippage === 'auto' ? defaultSlippageTolerance : allowedSlippage), [allowedSlippage, defaultSlippageTolerance]);
}
function useUserTransactionTTL() {
    const { chainId } = useActiveWeb3React();
    const dispatch = useAppDispatch();
    const userDeadline = useAppSelector((state) => state.user.userDeadline);
    const onL2 = Boolean(chainId && L2_CHAIN_IDS.includes(chainId));
    const deadline = onL2 ? L2_DEADLINE_FROM_NOW : userDeadline;
    const setUserDeadline = useCallback((userDeadline) => {
        dispatch(updateUserDeadline({ userDeadline }));
    }, [dispatch]);
    return [deadline, setUserDeadline];
}
function useAddUserToken() {
    const dispatch = useAppDispatch();
    return useCallback((token) => {
        dispatch(addSerializedToken({ serializedToken: serializeToken(token) }));
    }, [dispatch]);
}
function useRemoveUserAddedToken() {
    const dispatch = useAppDispatch();
    return useCallback((chainId, address) => {
        dispatch(removeSerializedToken({ chainId, address }));
    }, [dispatch]);
}
function useUserAddedTokens() {
    const { chainId } = useActiveWeb3React();
    const serializedTokensMap = useAppSelector(({ user: { tokens } }) => tokens);
    return useMemo(() => {
        var _a;
        if (!chainId)
            return [];
        return Object.values((_a = serializedTokensMap === null || serializedTokensMap === void 0 ? void 0 : serializedTokensMap[chainId]) !== null && _a !== void 0 ? _a : {}).map(deserializeToken);
    }, [serializedTokensMap, chainId]);
}
function useURLWarningVisible() {
    return useAppSelector((state) => state.user.URLWarningVisible);
}
function useArbitrumAlphaAlert() {
    const dispatch = useAppDispatch();
    const arbitrumAlphaAcknowledged = useAppSelector(({ user }) => user.arbitrumAlphaAcknowledged);
    const setArbitrumAlphaAcknowledged = (arbitrumAlphaAcknowledged) => {
        dispatch(updateArbitrumAlphaAcknowledged({ arbitrumAlphaAcknowledged }));
    };
    return [arbitrumAlphaAcknowledged, setArbitrumAlphaAcknowledged];
}
function useOptimismAlphaAlert() {
    const dispatch = useAppDispatch();
    const optimismAlphaAcknowledged = useAppSelector(({ user }) => user.optimismAlphaAcknowledged);
    const setOptimismAlphaAcknowledged = (optimismAlphaAcknowledged) => {
        dispatch(updateOptimismAlphaAcknowledged({ optimismAlphaAcknowledged }));
    };
    return [optimismAlphaAcknowledged, setOptimismAlphaAcknowledged];
}

const EXPLORER_HOSTNAMES = {
    'etherscan.io': true,
    'ropsten.etherscan.io': true,
    'rinkeby.etherscan.io': true,
    'kovan.etherscan.io': true,
    'goerli.etherscan.io': true,
    'optimistic.etherscan.io': true,
    'kovan-optimistic.etherscan.io': true,
    'rinkeby-explorer.arbitrum.io': true,
    'arbiscan.io': true,
};
/**
 * Returns the anonymized version of the given href, i.e. one that does not leak user information
 * @param href the link to anonymize, i.e. remove any personal data from
 * @return string anonymized version of the given href
 */
function anonymizeLink(href) {
    try {
        const url = new URL(href);
        if (EXPLORER_HOSTNAMES[url.hostname]) {
            const pathPieces = url.pathname.split('/');
            const anonymizedPath = pathPieces.map((pc) => (/0x[a-fA-F0-9]+/.test(pc) ? '***' : pc)).join('/');
            return `${url.protocol}//${url.hostname}${anonymizedPath}`;
        }
        return href;
    }
    catch (error) {
        return href;
    }
}

const ButtonText = styled.button `
  outline: none;
  border: none;
  font-size: inherit;
  padding: 0;
  margin: 0;
  background: none;
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }

  :focus {
    text-decoration: underline;
  }
`;
const CloseIcon$3 = styled(X) `
  cursor: pointer;
`;
// for wrapper react feather icons
const IconWrapper$4 = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size !== null && size !== void 0 ? size : '20px'};
  height: ${({ size }) => size !== null && size !== void 0 ? size : '20px'};
  margin-right: ${({ marginRight }) => marginRight !== null && marginRight !== void 0 ? marginRight : 0};
  margin-left: ${({ marginLeft }) => marginLeft !== null && marginLeft !== void 0 ? marginLeft : 0};
  & > * {
    stroke: ${({ theme, stroke }) => stroke !== null && stroke !== void 0 ? stroke : theme.blue1};
  }
`;
// A button that triggers some onClick result, but looks like a link.
const LinkStyledButton = styled.button `
  border: none;
  text-decoration: none;
  background: none;

  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ theme, disabled }) => (disabled ? theme.text2 : theme.primary1)};
  font-weight: 500;

  :hover {
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :focus {
    outline: none;
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :active {
    text-decoration: none;
  }
`;
// An internal link from the react-router-dom library that is correctly styled
const StyledInternalLink = styled(Link$1) `
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`;
const StyledLink = styled.a `
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`;
const LinkIconWrapper = styled.a `
  text-decoration: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;

  :hover {
    text-decoration: none;
    opacity: 0.7;
  }

  :focus {
    outline: none;
    text-decoration: none;
  }

  :active {
    text-decoration: none;
  }
`;
const LinkIcon = styled(ExternalLink$1) `
  height: 16px;
  width: 18px;
  margin-left: 10px;
  stroke: ${({ theme }) => theme.blue1};
`;
const TrashIcon = styled(Trash) `
  height: 16px;
  width: 18px;
  margin-left: 10px;
  stroke: ${({ theme }) => theme.text3};

  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;

  :hover {
    opacity: 0.7;
  }
`;
const rotateImg = keyframes `
  0% {
    transform: perspective(1000px) rotateY(0deg);
  }

  100% {
    transform: perspective(1000px) rotateY(360deg);
  }
`;
const UniTokenAnimated = styled.img `
  animation: ${rotateImg} 5s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  padding: 2rem 0 0 0;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.15));
`;
function handleClickExternalLink(event) {
    const { target, href } = event.currentTarget;
    const anonymizedHref = anonymizeLink(href);
    // don't prevent default, don't redirect if it's a new tab
    if (target === '_blank' || event.ctrlKey || event.metaKey) {
        ReactGA.outboundLink({ label: anonymizedHref }, () => {
            console.debug('Fired outbound link event', anonymizedHref);
        });
    }
    else {
        event.preventDefault();
        // send a ReactGA event and then trigger a location change
        ReactGA.outboundLink({ label: anonymizedHref }, () => {
            window.location.href = anonymizedHref;
        });
    }
}
/**
 * Outbound link that handles firing google analytics events
 */
function ExternalLink(_a) {
    var { target = '_blank', href, rel = 'noopener noreferrer' } = _a, rest = __rest(_a, ["target", "href", "rel"]);
    return jsx(StyledLink, Object.assign({ target: target, rel: rel, href: href, onClick: handleClickExternalLink }, rest), void 0);
}
function ExternalLinkIcon(_a) {
    var { target = '_blank', href, rel = 'noopener noreferrer' } = _a, rest = __rest(_a, ["target", "href", "rel"]);
    return (jsx(LinkIconWrapper, Object.assign({ target: target, rel: rel, href: href, onClick: handleClickExternalLink }, rest, { children: jsx(LinkIcon, {}, void 0) }), void 0));
}
const rotate$1 = keyframes `
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Spinner$1 = styled.img `
  animation: 2s ${rotate$1} linear infinite;
  width: 16px;
  height: 16px;
`;
styled(StyledInternalLink) `
  color: ${({ theme }) => theme.text1};
`;
const CustomLightSpinner = styled(Spinner$1) `
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`;
styled.span `
  ${({ theme }) => theme.mediaWidth.upToSmall `
    display: none;
  `};
`;
styled.span `
  ${({ theme }) => theme.mediaWidth.upToExtraSmall `
    display: none;
  `};
`;
styled.span `
  display: none;
  ${({ theme }) => theme.mediaWidth.upToSmall `
    display: block;
  `};
`;

const MEDIA_WIDTHS = {
    upToExtraSmall: 500,
    upToSmall: 720,
    upToMedium: 960,
    upToLarge: 1280,
};
// Migrating to a standard z-index system https://getbootstrap.com/docs/5.0/layout/z-index/
// Please avoid using deprecated numbers
var Z_INDEX;
(function (Z_INDEX) {
    Z_INDEX[Z_INDEX["deprecated_zero"] = 0] = "deprecated_zero";
    Z_INDEX[Z_INDEX["deprecated_content"] = 1] = "deprecated_content";
    Z_INDEX[Z_INDEX["dropdown"] = 1000] = "dropdown";
    Z_INDEX[Z_INDEX["sticky"] = 1020] = "sticky";
    Z_INDEX[Z_INDEX["fixed"] = 1030] = "fixed";
    Z_INDEX[Z_INDEX["modalBackdrop"] = 1040] = "modalBackdrop";
    Z_INDEX[Z_INDEX["offcanvas"] = 1050] = "offcanvas";
    Z_INDEX[Z_INDEX["modal"] = 1060] = "modal";
    Z_INDEX[Z_INDEX["popover"] = 1070] = "popover";
    Z_INDEX[Z_INDEX["tooltip"] = 1080] = "tooltip";
})(Z_INDEX || (Z_INDEX = {}));
const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
    accumulator[size] = (a, b, c) => css `
      @media (max-width: ${MEDIA_WIDTHS[size]}px) {
        ${css(a, b, c)}
      }
    `;
    return accumulator;
}, {});
const white = '#FFFFFF';
const black = '#000000';
function colors(darkMode) {
    return {
        darkMode,
        // base
        white,
        black,
        // text
        text1: darkMode ? '#FFFFFF' : '#000000',
        text2: darkMode ? '#C3C5CB' : '#565A69',
        text3: darkMode ? '#8F96AC' : '#6E727D',
        text4: darkMode ? '#B2B9D2' : '#C3C5CB',
        text5: darkMode ? '#2C2F36' : '#EDEEF2',
        // backgrounds / greys
        bg0: darkMode ? '#191B1F' : '#FFF',
        bg1: darkMode ? '#212429' : '#F7F8FA',
        bg2: darkMode ? '#2C2F36' : '#EDEEF2',
        bg3: darkMode ? '#40444F' : '#CED0D9',
        bg4: darkMode ? '#565A69' : '#888D9B',
        bg5: darkMode ? '#6C7284' : '#888D9B',
        bg6: darkMode ? '#1A2028' : '#6C7284',
        //specialty colors
        modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
        advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',
        //primary colors
        primary1: darkMode ? '#2172E5' : '#E8006F',
        primary2: darkMode ? '#3680E7' : '#FF8CC3',
        primary3: darkMode ? '#4D8FEA' : '#FF99C9',
        primary4: darkMode ? '#376bad70' : '#F6DDE8',
        primary5: darkMode ? '#153d6f70' : '#FDEAF1',
        // color text
        primaryText1: darkMode ? '#5090ea' : '#D50066',
        // secondary colors
        secondary1: darkMode ? '#2172E5' : '#E8006F',
        secondary2: darkMode ? '#17000b26' : '#F6DDE8',
        secondary3: darkMode ? '#17000b26' : '#FDEAF1',
        // other
        red1: darkMode ? '#FF4343' : '#DA2D2B',
        red2: darkMode ? '#F82D3A' : '#DF1F38',
        red3: '#D60000',
        green1: darkMode ? '#27AE60' : '#007D35',
        yellow1: '#E3A507',
        yellow2: '#FF8F00',
        yellow3: '#F3B71E',
        blue1: darkMode ? '#2172E5' : '#0068FC',
        blue2: darkMode ? '#5199FF' : '#0068FC',
        error: darkMode ? '#FD4040' : '#DF1F38',
        success: darkMode ? '#27AE60' : '#007D35',
        warning: '#FF8F00',
        // dont wanna forget these blue yet
        blue4: darkMode ? '#153d6f70' : '#C4D9F8',
        // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
    };
}
function theme(darkMode) {
    return Object.assign(Object.assign({}, colors(darkMode)), { grids: {
            sm: 8,
            md: 12,
            lg: 24,
        }, 
        //shadows
        shadow1: darkMode ? '#000' : '#2F80ED', 
        // media queries
        mediaWidth: mediaWidthTemplates, 
        // css snippets
        flexColumnNoWrap: css `
      display: flex;
      flex-flow: column nowrap;
    `, flexRowNoWrap: css `
      display: flex;
      flex-flow: row nowrap;
    ` });
}
function ThemeProvider({ children }) {
    const darkMode = useIsDarkMode();
    const themeObject = useMemo(() => theme(darkMode), [darkMode]);
    return jsx(ThemeProvider$1, Object.assign({ theme: themeObject }, { children: children }), void 0);
}
const TextWrapper$1 = styled(Text$1) `
  color: ${({ color, theme }) => theme[color]};
`;
/**
 * Preset styles of the Rebass Text component
 */
const ThemedText = {
    Main(props) {
        return jsx(TextWrapper$1, Object.assign({ fontWeight: 500, color: 'text2' }, props), void 0);
    },
    Link(props) {
        return jsx(TextWrapper$1, Object.assign({ fontWeight: 500, color: 'primary1' }, props), void 0);
    },
    Label(props) {
        return jsx(TextWrapper$1, Object.assign({ fontWeight: 600, color: 'text1' }, props), void 0);
    },
    Black(props) {
        return jsx(TextWrapper$1, Object.assign({ fontWeight: 500, color: 'text1' }, props), void 0);
    },
    White(props) {
        return jsx(TextWrapper$1, Object.assign({ fontWeight: 500, color: 'white' }, props), void 0);
    },
    Body(props) {
        return jsx(TextWrapper$1, Object.assign({ fontWeight: 400, fontSize: 16, color: 'text1' }, props), void 0);
    },
    LargeHeader(props) {
        return jsx(TextWrapper$1, Object.assign({ fontWeight: 600, fontSize: 24 }, props), void 0);
    },
    MediumHeader(props) {
        return jsx(TextWrapper$1, Object.assign({ fontWeight: 500, fontSize: 20 }, props), void 0);
    },
    SubHeader(props) {
        return jsx(TextWrapper$1, Object.assign({ fontWeight: 400, fontSize: 14 }, props), void 0);
    },
    Small(props) {
        return jsx(TextWrapper$1, Object.assign({ fontWeight: 500, fontSize: 11 }, props), void 0);
    },
    Blue(props) {
        return jsx(TextWrapper$1, Object.assign({ fontWeight: 500, color: 'blue1' }, props), void 0);
    },
    Yellow(props) {
        return jsx(TextWrapper$1, Object.assign({ fontWeight: 500, color: 'yellow3' }, props), void 0);
    },
    DarkGray(props) {
        return jsx(TextWrapper$1, Object.assign({ fontWeight: 500, color: 'text3' }, props), void 0);
    },
    Gray(props) {
        return jsx(TextWrapper$1, Object.assign({ fontWeight: 500, color: 'bg3' }, props), void 0);
    },
    Italic(props) {
        return jsx(TextWrapper$1, Object.assign({ fontWeight: 500, fontSize: 12, fontStyle: 'italic', color: 'text2' }, props), void 0);
    },
    Error(_a) {
        var { error } = _a, props = __rest(_a, ["error"]);
        return jsx(TextWrapper$1, Object.assign({ fontWeight: 500, color: error ? 'red1' : 'text2' }, props), void 0);
    },
};
const ThemedGlobalStyle = createGlobalStyle `
html {
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg1} !important;
}

a {
 color: ${({ theme }) => theme.blue1}; 
}
`;

const ETHERSCAN_PREFIXES = {
    [SupportedChainId.MAINNET]: '',
    [SupportedChainId.ROPSTEN]: 'ropsten.',
    [SupportedChainId.RINKEBY]: 'rinkeby.',
    [SupportedChainId.GOERLI]: 'goerli.',
    [SupportedChainId.KOVAN]: 'kovan.',
    [SupportedChainId.OPTIMISM]: 'optimistic.',
    [SupportedChainId.OPTIMISTIC_KOVAN]: 'kovan-optimistic.',
};
var ExplorerDataType;
(function (ExplorerDataType) {
    ExplorerDataType["TRANSACTION"] = "transaction";
    ExplorerDataType["TOKEN"] = "token";
    ExplorerDataType["ADDRESS"] = "address";
    ExplorerDataType["BLOCK"] = "block";
})(ExplorerDataType || (ExplorerDataType = {}));
/**
 * Return the explorer link for the given data and data type
 * @param chainId the ID of the chain for which to return the data
 * @param data the data to return a link for
 * @param type the type of the data
 */
function getExplorerLink(chainId, data, type) {
    var _a;
    if (chainId === SupportedChainId.ARBITRUM_ONE) {
        switch (type) {
            case ExplorerDataType.TRANSACTION:
                return `https://arbiscan.io/tx/${data}`;
            case ExplorerDataType.ADDRESS:
            case ExplorerDataType.TOKEN:
                return `https://arbiscan.io/address/${data}`;
            case ExplorerDataType.BLOCK:
                return `https://arbiscan.io/block/${data}`;
            default:
                return `https://arbiscan.io/`;
        }
    }
    if (chainId === SupportedChainId.ARBITRUM_RINKEBY) {
        switch (type) {
            case ExplorerDataType.TRANSACTION:
                return `https://rinkeby-explorer.arbitrum.io/tx/${data}`;
            case ExplorerDataType.ADDRESS:
            case ExplorerDataType.TOKEN:
                return `https://rinkeby-explorer.arbitrum.io/address/${data}`;
            case ExplorerDataType.BLOCK:
                return `https://rinkeby-explorer.arbitrum.io/block/${data}`;
            default:
                return `https://rinkeby-explorer.arbitrum.io/`;
        }
    }
    const prefix = `https://${(_a = ETHERSCAN_PREFIXES[chainId]) !== null && _a !== void 0 ? _a : ''}etherscan.io`;
    switch (type) {
        case ExplorerDataType.TRANSACTION:
            return `${prefix}/tx/${data}`;
        case ExplorerDataType.TOKEN:
            return `${prefix}/token/${data}`;
        case ExplorerDataType.BLOCK:
            if (chainId === SupportedChainId.OPTIMISM || chainId === SupportedChainId.OPTIMISTIC_KOVAN) {
                return `${prefix}/tx/${data}`;
            }
            return `${prefix}/block/${data}`;
        case ExplorerDataType.ADDRESS:
            return `${prefix}/address/${data}`;
        default:
            return `${prefix}`;
    }
}

const Column = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const ColumnCenter = styled(Column) `
  width: 100%;
  align-items: center;
`;
const AutoColumn = styled.div `
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: ${({ gap }) => (gap === 'sm' && '8px') || (gap === 'md' && '12px') || (gap === 'lg' && '24px') || gap};
  justify-items: ${({ justify }) => justify && justify};
`;

const Row = styled(Box) `
  width: ${({ width }) => width !== null && width !== void 0 ? width : '100%'};
  display: flex;
  padding: 0;
  align-items: ${({ align }) => align !== null && align !== void 0 ? align : 'center'};
  justify-content: ${({ justify }) => justify !== null && justify !== void 0 ? justify : 'flex-start'};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`;
const RowBetween = styled(Row) `
  justify-content: space-between;
`;
styled.div `
  display: flex;
  align-items: flex-end;
`;
const AutoRow = styled(Row) `
  flex-wrap: wrap;
  margin: ${({ gap }) => gap && `-${gap}`};
  justify-content: ${({ justify }) => justify && justify};

  & > * {
    margin: ${({ gap }) => gap} !important;
  }
`;
const RowFixed = styled(Row) `
  width: fit-content;
  margin: ${({ gap }) => gap && `-${gap}`};
`;

const InputPanel$1 = styled.div `
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.bg1};
  z-index: 1;
  width: 100%;
`;
const ContainerRow = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  border: 1px solid ${({ error, theme }) => (error ? theme.red1 : theme.bg2)};
  transition: border-color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')},
    color 500ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  background-color: ${({ theme }) => theme.bg1};
`;
const InputContainer = styled.div `
  flex: 1;
  padding: 1rem;
`;
const Input$2 = styled.input `
  font-size: 1.25rem;
  outline: none;
  border: none;
  flex: 1 1 auto;
  width: 0;
  background-color: ${({ theme }) => theme.bg1};
  transition: color 300ms ${({ error }) => (error ? 'step-end' : 'step-start')};
  color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  width: 100%;
  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
`;
function AddressInputPanel({ id, className = 'recipient-address-input', label, placeholder, value, onChange, }) {
    const { chainId } = useActiveWeb3React();
    const theme = useContext(ThemeContext);
    const { address, loading, name } = useENS(value);
    const handleInput = useCallback((event) => {
        const input = event.target.value;
        const withoutSpaces = input.replace(/\s+/g, '');
        onChange(withoutSpaces);
    }, [onChange]);
    const error = Boolean(value.length > 0 && !loading && !address);
    return (jsx(InputPanel$1, Object.assign({ id: id }, { children: jsx(ContainerRow, Object.assign({ error: error }, { children: jsx(InputContainer, { children: jsxs(AutoColumn, Object.assign({ gap: "md" }, { children: [jsxs(RowBetween, { children: [jsx(ThemedText.Black, Object.assign({ color: theme.text2, fontWeight: 500, fontSize: 14 }, { children: label !== null && label !== void 0 ? label : jsx(Trans, { children: "Recipient" }, void 0) }), void 0), address && chainId && (jsx(ExternalLink, Object.assign({ href: getExplorerLink(chainId, name !== null && name !== void 0 ? name : address, ExplorerDataType.ADDRESS), style: { fontSize: '14px' } }, { children: jsx(Trans, { children: "(View on Explorer)" }, void 0) }), void 0))] }, void 0), jsx(Input$2, { className: className, type: "text", autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: "false", placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : t `Wallet Address or ENS name`, error: error, pattern: "^(0x[a-fA-F0-9]{40})$", onChange: handleInput, value: value }, void 0)] }), void 0) }, void 0) }), void 0) }), void 0));
}

function useTheme() {
    return useContext(ThemeContext);
}

const BaseButton = styled(Button$1) `
  padding: ${({ padding }) => padding !== null && padding !== void 0 ? padding : '16px'};
  width: ${({ width }) => width !== null && width !== void 0 ? width : '100%'};
  font-weight: 500;
  text-align: center;
  border-radius: ${({ $borderRadius }) => $borderRadius !== null && $borderRadius !== void 0 ? $borderRadius : '20px'};
  outline: none;
  border: 1px solid transparent;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &:disabled {
    cursor: auto;
    pointer-events: none;
  }

  will-change: transform;
  transition: transform 450ms ease;
  transform: perspective(1px) translateZ(0);

  > * {
    user-select: none;
  }

  > a {
    text-decoration: none;
  }
`;
const ButtonPrimary = styled(BaseButton) `
  background-color: ${({ theme }) => theme.primary1};
  color: white;
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.primary1)};
    background-color: ${({ theme }) => darken(0.05, theme.primary1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.primary1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.primary1)};
    background-color: ${({ theme }) => darken(0.1, theme.primary1)};
  }
  &:disabled {
    background-color: ${({ theme, altDisabledStyle, disabled }) => altDisabledStyle ? (disabled ? theme.primary1 : theme.bg2) : theme.bg2};
    color: ${({ altDisabledStyle, disabled, theme }) => altDisabledStyle ? (disabled ? theme.white : theme.text2) : theme.text2};
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
  }
`;
const ButtonLight = styled(BaseButton) `
  background-color: ${({ theme }) => theme.primary5};
  color: ${({ theme }) => theme.primaryText1};
  font-size: 16px;
  font-weight: 500;
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme, disabled }) => !disabled && darken(0.03, theme.primary5)};
    background-color: ${({ theme, disabled }) => !disabled && darken(0.03, theme.primary5)};
  }
  &:hover {
    background-color: ${({ theme, disabled }) => !disabled && darken(0.03, theme.primary5)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme, disabled }) => !disabled && darken(0.05, theme.primary5)};
    background-color: ${({ theme, disabled }) => !disabled && darken(0.05, theme.primary5)};
  }
  :disabled {
    opacity: 0.4;
    :hover {
      cursor: auto;
      background-color: ${({ theme }) => theme.primary5};
      box-shadow: none;
      border: 1px solid transparent;
      outline: none;
    }
  }
`;
const ButtonGray = styled(BaseButton) `
  background-color: ${({ theme }) => theme.bg1};
  color: ${({ theme }) => theme.text2};
  font-size: 16px;
  font-weight: 500;

  &:hover {
    background-color: ${({ theme, disabled }) => !disabled && darken(0.05, theme.bg2)};
  }
  &:active {
    background-color: ${({ theme, disabled }) => !disabled && darken(0.1, theme.bg2)};
  }
`;
const ButtonSecondary = styled(BaseButton) `
  border: 1px solid ${({ theme }) => theme.primary4};
  color: ${({ theme }) => theme.primary1};
  background-color: transparent;
  font-size: 16px;
  border-radius: 12px;
  padding: ${({ padding }) => (padding ? padding : '10px')};

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => theme.primary4};
    border: 1px solid ${({ theme }) => theme.primary3};
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.primary3};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => theme.primary4};
    border: 1px solid ${({ theme }) => theme.primary3};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
  a:hover {
    text-decoration: none;
  }
`;
const ButtonOutlined = styled(BaseButton) `
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: transparent;
  color: ${({ theme }) => theme.text1};
  &:focus {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:hover {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:active {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`;
styled(BaseButton) `
  background-color: ${({ theme }) => theme.yellow3};
  color: white;
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.yellow3)};
    background-color: ${({ theme }) => darken(0.05, theme.yellow3)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.yellow3)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.yellow3)};
    background-color: ${({ theme }) => darken(0.1, theme.yellow3)};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.yellow3};
    opacity: 50%;
    cursor: auto;
  }
`;
const ButtonEmpty = styled(BaseButton) `
  background-color: transparent;
  color: ${({ theme }) => theme.primary1};
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    text-decoration: underline;
  }
  &:hover {
    text-decoration: none;
  }
  &:active {
    text-decoration: none;
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`;
styled(BaseButton) `
  padding: 0;
  width: fit-content;
  background: none;
  text-decoration: none;
  &:focus {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    text-decoration: underline;
  }
  &:hover {
    // text-decoration: underline;
    opacity: 0.9;
  }
  &:active {
    text-decoration: underline;
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`;
const ButtonConfirmedStyle = styled(BaseButton) `
  background-color: ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.text1};
  /* border: 1px solid ${({ theme }) => theme.green1}; */

  &:disabled {
    /* opacity: 50%; */
    background-color: ${({ theme }) => theme.bg2};
    color: ${({ theme }) => theme.text2};
    cursor: auto;
  }
`;
const ButtonErrorStyle = styled(BaseButton) `
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.red1)};
    background-color: ${({ theme }) => darken(0.05, theme.red1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.red1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.red1)};
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
    box-shadow: none;
    background-color: ${({ theme }) => theme.red1};
    border: 1px solid ${({ theme }) => theme.red1};
  }
`;
function ButtonConfirmed(_a) {
    var { confirmed, altDisabledStyle } = _a, rest = __rest(_a, ["confirmed", "altDisabledStyle"]);
    if (confirmed) {
        return jsx(ButtonConfirmedStyle, Object.assign({}, rest), void 0);
    }
    else {
        return jsx(ButtonPrimary, Object.assign({}, rest, { altDisabledStyle: altDisabledStyle }), void 0);
    }
}
function ButtonError(_a) {
    var { error } = _a, rest = __rest(_a, ["error"]);
    if (error) {
        return jsx(ButtonErrorStyle, Object.assign({}, rest), void 0);
    }
    else {
        return jsx(ButtonPrimary, Object.assign({}, rest), void 0);
    }
}
styled(ButtonOutlined) `
  border: 1px solid;
  border-color: ${({ theme }) => theme.primary1};
`;
styled.div `
  height: 17px;
  width: 17px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary1};
  display: flex;
  align-items: center;
  justify-content: center;
`;
styled.div `
  width: 20px;
  padding: 0 10px;
  position: absolute;
  top: 11px;
  right: 15px;
`;
styled(Check) `
  size: 13px;
`;

const isClient = typeof window === 'object';
function getSize() {
    return {
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined,
    };
}
// https://usehooks.com/useWindowSize/
function useWindowSize() {
    const [windowSize, setWindowSize] = useState(getSize);
    useEffect(() => {
        function handleResize() {
            setWindowSize(getSize());
        }
        if (isClient) {
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
        return undefined;
    }, []);
    return windowSize;
}

// eslint-disable-next-line react/prop-types
function Confetti({ start, variant }) {
    const { width, height } = useWindowSize();
    const _variant = variant ? variant : height && width && height > 1.5 * width ? 'bottom' : variant;
    return start && width && height ? (jsx(ReactConfetti, { style: { zIndex: 1401 }, numberOfPieces: 400, recycle: false, run: true, width: width, height: height, confettiSource: {
            h: height,
            w: width,
            x: 0,
            y: _variant === 'top' ? height * 0.25 : _variant === 'bottom' ? height * 0.75 : height * 0.5,
        }, initialVelocityX: 15, initialVelocityY: 30, gravity: 0.45, tweenDuration: 100, wind: 0.05 }, void 0)) : null;
}

var uImage = "10f062d02df4af77.png";

var noise = "f158a440053a5ad2.png";

var xlUnicorn = "c2cd04251aa24c34.png";

const DataCard = styled(AutoColumn) `
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #ff007a 0%, #2172e5 100%);
  border-radius: 12px;
  width: 100%;
  position: relative;
  overflow: hidden;
`;
const CardBGImage = styled.span `
  background: url(${uImage});
  width: 1000px;
  height: 600px;
  position: absolute;
  border-radius: 12px;
  opacity: 0.4;
  top: -100px;
  left: -100px;
  transform: rotate(-15deg);
  user-select: none;
  ${({ desaturate }) => desaturate && `filter: saturate(0)`}
`;
const CardBGImageSmaller = styled.span `
  background: url(${xlUnicorn});
  width: 1200px;
  height: 1200px;
  position: absolute;
  border-radius: 12px;
  top: -300px;
  left: -300px;
  opacity: 0.4;
  user-select: none;

  ${({ desaturate }) => desaturate && `filter: saturate(0)`}
`;
const CardNoise = styled.span `
  background: url(${noise});
  background-size: cover;
  mix-blend-mode: overlay;
  border-radius: 12px;
  width: 100%;
  height: 100%;
  opacity: 0.15;
  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
`;
const CardSection = styled(AutoColumn) `
  padding: 1rem;
  z-index: 1;
  opacity: ${({ disabled }) => disabled && '0.4'};
`;
const Break$1 = styled.div `
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  height: 1px;
`;

const AnimatedDialogOverlay = animated(DialogOverlay);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogOverlay = styled(AnimatedDialogOverlay) `
  &[data-reach-dialog-overlay] {
    z-index: 2;
    background-color: transparent;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.modalBG};
  }
`;
const AnimatedDialogContent = animated(DialogContent);
// destructure to not pass custom props to Dialog DOM element
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogContent = styled((_a) => {
    var rest = __rest(_a, ["minHeight", "maxHeight", "mobile", "isOpen"]);
    return (jsx(AnimatedDialogContent, Object.assign({}, rest), void 0));
}).attrs({
    'aria-label': 'dialog',
}) `
  overflow-y: auto;

  &[data-reach-dialog-content] {
    margin: 0 0 2rem 0;
    background-color: ${({ theme }) => theme.bg0};
    border: 1px solid ${({ theme }) => theme.bg1};
    box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.95, theme.shadow1)};
    padding: 0px;
    width: 50vw;
    overflow-y: auto;
    overflow-x: hidden;

    align-self: ${({ mobile }) => (mobile ? 'flex-end' : 'center')};

    max-width: 420px;
    ${({ maxHeight }) => maxHeight &&
    css `
        max-height: ${maxHeight}vh;
      `}
    ${({ minHeight }) => minHeight &&
    css `
        min-height: ${minHeight}vh;
      `}
    display: flex;
    border-radius: 20px;
    ${({ theme }) => theme.mediaWidth.upToMedium `
      width: 65vw;
      margin: 0;
    `}
    ${({ theme, mobile }) => theme.mediaWidth.upToSmall `
      width:  85vw;
      ${mobile &&
    css `
          width: 100vw;
          border-radius: 20px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        `}
    `}
  }
`;
function Modal({ isOpen, onDismiss, minHeight = false, maxHeight = 90, initialFocusRef, children, }) {
    const fadeTransition = useTransition(isOpen, null, {
        config: { duration: 200 },
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });
    const [{ y }, set] = useSpring(() => ({ y: 0, config: { mass: 1, tension: 210, friction: 20 } }));
    const bind = useGesture({
        onDrag: (state) => {
            set({
                y: state.down ? state.movement[1] : 0,
            });
            if (state.movement[1] > 300 || (state.velocity > 3 && state.direction[1] > 0)) {
                onDismiss();
            }
        },
    });
    return (jsx(Fragment, { children: fadeTransition.map(({ item, key, props }) => item && (jsx(StyledDialogOverlay, Object.assign({ style: props, onDismiss: onDismiss, initialFocusRef: initialFocusRef, unstable_lockFocusAcrossFrames: false }, { children: jsxs(StyledDialogContent, Object.assign({}, (isMobile
                ? Object.assign(Object.assign({}, bind()), { style: { transform: y.interpolate((y) => `translateY(${y > 0 ? y : 0}px)`) } }) : {}), { "aria-label": "dialog content", minHeight: minHeight, maxHeight: maxHeight, mobile: isMobile }, { children: [!initialFocusRef && isMobile ? jsx("div", { tabIndex: 1 }, void 0) : null, children] }), void 0) }), key))) }, void 0));
}

const ContentWrapper$5 = styled(AutoColumn) `
  width: 100%;
`;
const ModalUpper$2 = styled(DataCard) `
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #ff007a 0%, #021d43 100%);
`;
const ConfirmOrLoadingWrapper$1 = styled.div `
  width: 100%;
  padding: 24px;
  position: relative;
  background: ${({ activeBG }) => activeBG &&
    'radial-gradient(76.02% 75.41% at 1.84% 0%, rgba(255, 0, 122, 0.2) 0%, rgba(33, 114, 229, 0.2) 100%), #FFFFFF;'};
`;
const ConfirmedIcon$2 = styled(ColumnCenter) `
  padding: 60px 0;
`;
function AddressClaimModal({ isOpen, onDismiss }) {
    var _a, _b;
    const { chainId } = useActiveWeb3React();
    // state for smart contract input
    const [typed, setTyped] = useState('');
    function handleRecipientType(val) {
        setTyped(val);
    }
    // monitor for third party recipient of claim
    const { address: parsedAddress } = useENS(typed);
    // used for UI loading states
    const [attempting, setAttempting] = useState(false);
    // monitor the status of the claim from contracts and txns
    const { claimCallback } = useClaimCallback(parsedAddress);
    const unclaimedAmount = useUserUnclaimedAmount(parsedAddress);
    // check if the user has something available
    const hasAvailableClaim = useUserHasAvailableClaim(parsedAddress);
    const [hash, setHash] = useState();
    // monitor the status of the claim from contracts and txns
    const claimPending = useIsTransactionPending(hash !== null && hash !== void 0 ? hash : '');
    const claimConfirmed = hash && !claimPending;
    // use the hash to monitor this txn
    function onClaim() {
        setAttempting(true);
        claimCallback()
            .then((hash) => {
            setHash(hash);
        })
            // reset modal and log error
            .catch((error) => {
            setAttempting(false);
            console.log(error);
        });
    }
    function wrappedOnDismiss() {
        setAttempting(false);
        setHash(undefined);
        setTyped('');
        onDismiss();
    }
    return (jsxs(Modal, Object.assign({ isOpen: isOpen, onDismiss: wrappedOnDismiss, maxHeight: 90 }, { children: [jsx(Confetti, { start: Boolean(isOpen && claimConfirmed && attempting) }, void 0), !attempting && (jsxs(ContentWrapper$5, Object.assign({ gap: "lg" }, { children: [jsxs(ModalUpper$2, { children: [jsx(CardBGImage, {}, void 0), jsx(CardNoise, {}, void 0), jsxs(CardSection, Object.assign({ gap: "md" }, { children: [jsxs(RowBetween, { children: [jsx(ThemedText.White, Object.assign({ fontWeight: 500 }, { children: jsx(Trans, { children: "Claim UNI Token" }, void 0) }), void 0), jsx(CloseIcon$3, { onClick: wrappedOnDismiss, style: { zIndex: 99 }, stroke: "white" }, void 0)] }, void 0), jsx(ThemedText.White, Object.assign({ fontWeight: 700, fontSize: 36 }, { children: jsxs(Trans, { children: [unclaimedAmount === null || unclaimedAmount === void 0 ? void 0 : unclaimedAmount.toFixed(0, (_a = { groupSeparator: ',' }) !== null && _a !== void 0 ? _a : '-'), " UNI"] }, void 0) }), void 0)] }), void 0), jsx(Break$1, {}, void 0)] }, void 0), jsxs(AutoColumn, Object.assign({ gap: "md", style: { padding: '1rem', paddingTop: '0' }, justify: "center" }, { children: [jsx(ThemedText.SubHeader, Object.assign({ fontWeight: 500 }, { children: jsx(Trans, { children: "Enter an address to trigger a UNI claim. If the address has any claimable UNI it will be sent to them on submission." }, void 0) }), void 0), jsx(AddressInputPanel, { value: typed, onChange: handleRecipientType }, void 0), parsedAddress && !hasAvailableClaim && (jsx(ThemedText.Error, Object.assign({ error: true }, { children: jsx(Trans, { children: "Address has no available claim" }, void 0) }), void 0)), jsx(ButtonPrimary, Object.assign({ disabled: !isAddress$1(parsedAddress !== null && parsedAddress !== void 0 ? parsedAddress : '') || !hasAvailableClaim, padding: "16px 16px", width: "100%", "$borderRadius": "12px", mt: "1rem", onClick: onClaim }, { children: jsx(Trans, { children: "Claim UNI" }, void 0) }), void 0)] }), void 0)] }), void 0)), (attempting || claimConfirmed) && (jsxs(ConfirmOrLoadingWrapper$1, Object.assign({ activeBG: true }, { children: [jsx(CardNoise, {}, void 0), jsx(CardBGImageSmaller, { desaturate: true }, void 0), jsxs(RowBetween, { children: [jsx("div", {}, void 0), jsx(CloseIcon$3, { onClick: wrappedOnDismiss, style: { zIndex: 99 }, stroke: "black" }, void 0)] }, void 0), jsx(ConfirmedIcon$2, { children: !claimConfirmed ? (jsx(CustomLightSpinner, { src: Circle$1, alt: "loader", size: '90px' }, void 0)) : (jsx(UniTokenAnimated, { width: "72px", src: tokenLogo, alt: "UNI logo" }, void 0)) }, void 0), jsxs(AutoColumn, Object.assign({ gap: "100px", justify: 'center' }, { children: [jsxs(AutoColumn, Object.assign({ gap: "12px", justify: 'center' }, { children: [jsx(ThemedText.LargeHeader, Object.assign({ fontWeight: 600, color: "black" }, { children: claimConfirmed ? jsx(Trans, { children: "Claimed" }, void 0) : jsx(Trans, { children: "Claiming" }, void 0) }), void 0), !claimConfirmed && (jsx(Text$1, Object.assign({ fontSize: 36, color: '#ff007a', fontWeight: 800 }, { children: jsxs(Trans, { children: [unclaimedAmount === null || unclaimedAmount === void 0 ? void 0 : unclaimedAmount.toFixed(0, (_b = { groupSeparator: ',' }) !== null && _b !== void 0 ? _b : '-'), " UNI"] }, void 0) }), void 0)), parsedAddress && (jsx(ThemedText.LargeHeader, Object.assign({ fontWeight: 600, color: "black" }, { children: jsxs(Trans, { children: ["for ", shortenAddress(parsedAddress)] }, void 0) }), void 0))] }), void 0), claimConfirmed && (jsx(Fragment, { children: jsxs(ThemedText.SubHeader, Object.assign({ fontWeight: 500, color: "black" }, { children: [jsxs("span", Object.assign({ role: "img", "aria-label": "party-hat" }, { children: ["\uD83C\uDF89", ' '] }), void 0), jsx(Trans, { children: "Welcome to team Unicorn :) " }, void 0), jsx("span", Object.assign({ role: "img", "aria-label": "party-hat" }, { children: "\uD83C\uDF89" }), void 0)] }), void 0) }, void 0)), attempting && !hash && (jsx(ThemedText.SubHeader, Object.assign({ color: "black" }, { children: jsx(Trans, { children: "Confirm this transaction in your wallet" }, void 0) }), void 0)), attempting && hash && !claimConfirmed && chainId && hash && (jsx(ExternalLink, Object.assign({ href: getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION), style: { zIndex: 99 } }, { children: jsx(Trans, { children: "View transaction on Explorer" }, void 0) }), void 0))] }), void 0)] }), void 0))] }), void 0));
}

var Field$3;
(function (Field) {
    Field["LIQUIDITY_PERCENT"] = "LIQUIDITY_PERCENT";
    Field["LIQUIDITY"] = "LIQUIDITY";
    Field["CURRENCY_A"] = "CURRENCY_A";
    Field["CURRENCY_B"] = "CURRENCY_B";
})(Field$3 || (Field$3 = {}));
const typeInput$3 = createAction('burn/typeInputBurn');

const initialState$7 = {
    independentField: Field$3.LIQUIDITY_PERCENT,
    typedValue: '0',
};
var burn = createReducer(initialState$7, (builder) => builder.addCase(typeInput$3, (state, { payload: { field, typedValue } }) => {
    return Object.assign(Object.assign({}, state), { independentField: field, typedValue });
}));

const selectPercent = createAction('burnV3/selectBurnPercent');

const initialState$6 = {
    percent: 0,
};
var burnV3 = createReducer(initialState$6, (builder) => builder.addCase(selectPercent, (state, { payload: { percent } }) => {
    return Object.assign(Object.assign({}, state), { percent });
}));

// List of supported subgraphs. Note that the app currently only support one active subgraph at a time
const CHAIN_SUBGRAPH_URL = {
    [SupportedChainId.MAINNET]: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
    [SupportedChainId.RINKEBY]: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
    [SupportedChainId.ARBITRUM_ONE]: 'https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-minimal',
    [SupportedChainId.OPTIMISM]: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-optimism-dev',
};
const api$1 = createApi({
    reducerPath: 'dataApi',
    baseQuery: graphqlRequestBaseQuery(),
    endpoints: (builder) => ({
        allV3Ticks: builder.query({
            query: ({ poolAddress, skip = 0 }) => ({
                document: gql `
          query allV3Ticks($poolAddress: String!, $skip: Int!) {
            ticks(first: 1000, skip: $skip, where: { poolAddress: $poolAddress }, orderBy: tickIdx) {
              tickIdx
              liquidityNet
              price0
              price1
            }
          }
        `,
                variables: {
                    poolAddress,
                    skip,
                },
            }),
        }),
        feeTierDistribution: builder.query({
            query: ({ token0, token1 }) => ({
                document: gql `
          query feeTierDistribution($token0: String!, $token1: String!) {
            _meta {
              block {
                number
              }
            }
            asToken0: pools(
              orderBy: totalValueLockedToken0
              orderDirection: desc
              where: { token0: $token0, token1: $token1 }
            ) {
              feeTier
              totalValueLockedToken0
              totalValueLockedToken1
            }
            asToken1: pools(
              orderBy: totalValueLockedToken0
              orderDirection: desc
              where: { token0: $token1, token1: $token0 }
            ) {
              feeTier
              totalValueLockedToken0
              totalValueLockedToken1
            }
          }
        `,
                variables: {
                    token0,
                    token1,
                },
            }),
        }),
    }),
});
// Graphql query client wrapper that builds a dynamic url based on chain id
function graphqlRequestBaseQuery() {
    return ({ document, variables }, { getState }) => __awaiter(this, void 0, void 0, function* () {
        try {
            const chainId = getState().application.chainId;
            const subgraphUrl = chainId ? CHAIN_SUBGRAPH_URL[chainId] : undefined;
            if (!subgraphUrl) {
                return {
                    error: {
                        name: 'UnsupportedChainId',
                        message: `Subgraph queries against ChainId ${chainId} are not supported.`,
                        stack: '',
                    },
                };
            }
            return { data: yield new GraphQLClient(subgraphUrl).request(document, variables), meta: {} };
        }
        catch (error) {
            if (error instanceof ClientError) {
                const { name, message, stack, request, response } = error;
                return { error: { name, message, stack }, meta: { request, response } };
            }
            throw error;
        }
    });
}

// fired once when the app reloads but before the app renders
// allows any updates to be applied to store data loaded from localStorage
const updateVersion = createAction('global/updateVersion');

const fetchTokenList = {
    pending: createAction('lists/fetchTokenList/pending'),
    fulfilled: createAction('lists/fetchTokenList/fulfilled'),
    rejected: createAction('lists/fetchTokenList/rejected'),
};
// add and remove from list options
const addList = createAction('lists/addList');
const removeList = createAction('lists/removeList');
// select which lists to search across from loaded lists
const enableList = createAction('lists/enableList');
const disableList = createAction('lists/disableList');
// versioning
const acceptListUpdate = createAction('lists/acceptListUpdate');

const NEW_LIST_STATE = {
    error: null,
    current: null,
    loadingRequestId: null,
    pendingUpdate: null,
};
const initialState$5 = {
    lastInitializedDefaultListOfLists: DEFAULT_LIST_OF_LISTS,
    byUrl: Object.assign({}, DEFAULT_LIST_OF_LISTS.reduce((memo, listUrl) => {
        memo[listUrl] = NEW_LIST_STATE;
        return memo;
    }, {})),
    activeListUrls: DEFAULT_ACTIVE_LIST_URLS,
};
var lists = createReducer(initialState$5, (builder) => builder
    .addCase(fetchTokenList.pending, (state, { payload: { requestId, url } }) => {
    var _a, _b, _c, _d;
    const current = (_b = (_a = state.byUrl[url]) === null || _a === void 0 ? void 0 : _a.current) !== null && _b !== void 0 ? _b : null;
    const pendingUpdate = (_d = (_c = state.byUrl[url]) === null || _c === void 0 ? void 0 : _c.pendingUpdate) !== null && _d !== void 0 ? _d : null;
    state.byUrl[url] = {
        current,
        pendingUpdate,
        loadingRequestId: requestId,
        error: null,
    };
})
    .addCase(fetchTokenList.fulfilled, (state, { payload: { requestId, tokenList, url } }) => {
    var _a, _b, _c;
    const current = (_a = state.byUrl[url]) === null || _a === void 0 ? void 0 : _a.current;
    const loadingRequestId = (_b = state.byUrl[url]) === null || _b === void 0 ? void 0 : _b.loadingRequestId;
    // no-op if update does nothing
    if (current) {
        const upgradeType = getVersionUpgrade(current.version, tokenList.version);
        if (upgradeType === VersionUpgrade.NONE)
            return;
        if (loadingRequestId === null || loadingRequestId === requestId) {
            state.byUrl[url] = {
                current,
                pendingUpdate: tokenList,
                loadingRequestId: null,
                error: null,
            };
        }
    }
    else {
        // activate if on default active
        if (DEFAULT_ACTIVE_LIST_URLS.includes(url)) {
            (_c = state.activeListUrls) === null || _c === void 0 ? void 0 : _c.push(url);
        }
        state.byUrl[url] = {
            current: tokenList,
            pendingUpdate: null,
            loadingRequestId: null,
            error: null,
        };
    }
})
    .addCase(fetchTokenList.rejected, (state, { payload: { url, requestId, errorMessage } }) => {
    var _a;
    if (((_a = state.byUrl[url]) === null || _a === void 0 ? void 0 : _a.loadingRequestId) !== requestId) {
        // no-op since it's not the latest request
        return;
    }
    state.byUrl[url] = {
        current: state.byUrl[url].current ? state.byUrl[url].current : null,
        pendingUpdate: null,
        loadingRequestId: null,
        error: errorMessage,
    };
})
    .addCase(addList, (state, { payload: url }) => {
    if (!state.byUrl[url]) {
        state.byUrl[url] = NEW_LIST_STATE;
    }
})
    .addCase(removeList, (state, { payload: url }) => {
    if (state.byUrl[url]) {
        delete state.byUrl[url];
    }
    // remove list from active urls if needed
    if (state.activeListUrls && state.activeListUrls.includes(url)) {
        state.activeListUrls = state.activeListUrls.filter((u) => u !== url);
    }
})
    .addCase(enableList, (state, { payload: url }) => {
    if (!state.byUrl[url]) {
        state.byUrl[url] = NEW_LIST_STATE;
    }
    if (state.activeListUrls && !state.activeListUrls.includes(url)) {
        state.activeListUrls.push(url);
    }
    if (!state.activeListUrls) {
        state.activeListUrls = [url];
    }
})
    .addCase(disableList, (state, { payload: url }) => {
    if (state.activeListUrls && state.activeListUrls.includes(url)) {
        state.activeListUrls = state.activeListUrls.filter((u) => u !== url);
    }
})
    .addCase(acceptListUpdate, (state, { payload: url }) => {
    var _a;
    if (!((_a = state.byUrl[url]) === null || _a === void 0 ? void 0 : _a.pendingUpdate)) {
        throw new Error('accept list update called without pending update');
    }
    state.byUrl[url] = Object.assign(Object.assign({}, state.byUrl[url]), { current: state.byUrl[url].pendingUpdate, pendingUpdate: null });
})
    .addCase(updateVersion, (state) => {
    // state loaded from localStorage, but new lists have never been initialized
    if (!state.lastInitializedDefaultListOfLists) {
        state.byUrl = initialState$5.byUrl;
        state.activeListUrls = initialState$5.activeListUrls;
    }
    else if (state.lastInitializedDefaultListOfLists) {
        const lastInitializedSet = state.lastInitializedDefaultListOfLists.reduce((s, l) => s.add(l), new Set());
        const newListOfListsSet = DEFAULT_LIST_OF_LISTS.reduce((s, l) => s.add(l), new Set());
        DEFAULT_LIST_OF_LISTS.forEach((listUrl) => {
            if (!lastInitializedSet.has(listUrl)) {
                state.byUrl[listUrl] = NEW_LIST_STATE;
            }
        });
        state.lastInitializedDefaultListOfLists.forEach((listUrl) => {
            if (!newListOfListsSet.has(listUrl)) {
                delete state.byUrl[listUrl];
            }
        });
    }
    state.lastInitializedDefaultListOfLists = DEFAULT_LIST_OF_LISTS;
    // if no active lists, activate defaults
    if (!state.activeListUrls) {
        state.activeListUrls = DEFAULT_ACTIVE_LIST_URLS;
        // for each list on default list, initialize if needed
        DEFAULT_ACTIVE_LIST_URLS.map((listUrl) => {
            if (!state.byUrl[listUrl]) {
                state.byUrl[listUrl] = NEW_LIST_STATE;
            }
            return true;
        });
    }
}));

/**
 * Converts a filter to the corresponding string key
 * @param filter the filter to convert
 */
function filterToKey(filter) {
    var _a, _b, _c, _d;
    return `${(_a = filter.address) !== null && _a !== void 0 ? _a : ''}:${(_d = (_c = (_b = filter.topics) === null || _b === void 0 ? void 0 : _b.map((topic) => (topic ? (Array.isArray(topic) ? topic.join(';') : topic) : '\0'))) === null || _c === void 0 ? void 0 : _c.join('-')) !== null && _d !== void 0 ? _d : ''}`;
}
/**
 * Convert a filter key to the corresponding filter
 * @param key key to convert
 */
function keyToFilter(key) {
    const pcs = key.split(':');
    const address = pcs[0];
    const topics = pcs[1].split('-').map((topic) => {
        if (topic === '\0')
            return null;
        const parts = topic.split(';');
        if (parts.length === 1)
            return parts[0];
        return parts;
    });
    return {
        address: address.length === 0 ? undefined : address,
        topics,
    };
}

const slice = createSlice({
    name: 'logs',
    initialState: {},
    reducers: {
        addListener(state, { payload: { chainId, filter } }) {
            if (!state[chainId])
                state[chainId] = {};
            const key = filterToKey(filter);
            if (!state[chainId][key])
                state[chainId][key] = {
                    listeners: 1,
                };
            else
                state[chainId][key].listeners++;
        },
        fetchingLogs(state, { payload: { chainId, filters, blockNumber }, }) {
            if (!state[chainId])
                return;
            for (const filter of filters) {
                const key = filterToKey(filter);
                if (!state[chainId][key])
                    continue;
                state[chainId][key].fetchingBlockNumber = blockNumber;
            }
        },
        fetchedLogs(state, { payload: { chainId, filter, results }, }) {
            if (!state[chainId])
                return;
            const key = filterToKey(filter);
            const fetchState = state[chainId][key];
            if (!fetchState || (fetchState.results && fetchState.results.blockNumber > results.blockNumber))
                return;
            fetchState.results = results;
        },
        fetchedLogsError(state, { payload: { chainId, filter, blockNumber }, }) {
            if (!state[chainId])
                return;
            const key = filterToKey(filter);
            const fetchState = state[chainId][key];
            if (!fetchState || (fetchState.results && fetchState.results.blockNumber > blockNumber))
                return;
            fetchState.results = {
                blockNumber,
                error: true,
            };
        },
        removeListener(state, { payload: { chainId, filter } }) {
            if (!state[chainId])
                return;
            const key = filterToKey(filter);
            if (!state[chainId][key])
                return;
            state[chainId][key].listeners--;
        },
    },
});
var logs = slice.reducer;
const { addListener, removeListener, fetchedLogs, fetchedLogsError, fetchingLogs } = slice.actions;

var Field$2;
(function (Field) {
    Field["CURRENCY_A"] = "CURRENCY_A";
    Field["CURRENCY_B"] = "CURRENCY_B";
})(Field$2 || (Field$2 = {}));
const typeInput$2 = createAction('mint/typeInputMint');
const resetMintState$1 = createAction('mint/resetMintState');

const initialState$4 = {
    independentField: Field$2.CURRENCY_A,
    typedValue: '',
    otherTypedValue: '',
    startPriceTypedValue: '',
    leftRangeTypedValue: '',
    rightRangeTypedValue: '',
};
var mint = createReducer(initialState$4, (builder) => builder
    .addCase(resetMintState$1, () => initialState$4)
    .addCase(typeInput$2, (state, { payload: { field, typedValue, noLiquidity } }) => {
    if (noLiquidity) {
        // they're typing into the field they've last typed in
        if (field === state.independentField) {
            return Object.assign(Object.assign({}, state), { independentField: field, typedValue });
        }
        // they're typing into a new field, store the other value
        else {
            return Object.assign(Object.assign({}, state), { independentField: field, typedValue, otherTypedValue: state.typedValue });
        }
    }
    else {
        return Object.assign(Object.assign({}, state), { independentField: field, typedValue, otherTypedValue: '' });
    }
}));

var Field$1;
(function (Field) {
    Field["CURRENCY_A"] = "CURRENCY_A";
    Field["CURRENCY_B"] = "CURRENCY_B";
})(Field$1 || (Field$1 = {}));
var Bound;
(function (Bound) {
    Bound["LOWER"] = "LOWER";
    Bound["UPPER"] = "UPPER";
})(Bound || (Bound = {}));
const typeInput$1 = createAction('mintV3/typeInputMint');
const typeStartPriceInput = createAction('mintV3/typeStartPriceInput');
const typeLeftRangeInput = createAction('mintV3/typeLeftRangeInput');
const typeRightRangeInput = createAction('mintV3/typeRightRangeInput');
const resetMintState = createAction('mintV3/resetMintState');
const setFullRange = createAction('mintV3/setFullRange');

const initialState$3 = {
    independentField: Field$1.CURRENCY_A,
    typedValue: '',
    startPriceTypedValue: '',
    leftRangeTypedValue: '',
    rightRangeTypedValue: '',
};
var mintV3 = createReducer(initialState$3, (builder) => builder
    .addCase(resetMintState, () => initialState$3)
    .addCase(setFullRange, (state) => {
    return Object.assign(Object.assign({}, state), { leftRangeTypedValue: true, rightRangeTypedValue: true });
})
    .addCase(typeStartPriceInput, (state, { payload: { typedValue } }) => {
    return Object.assign(Object.assign({}, state), { startPriceTypedValue: typedValue });
})
    .addCase(typeLeftRangeInput, (state, { payload: { typedValue } }) => {
    return Object.assign(Object.assign({}, state), { leftRangeTypedValue: typedValue });
})
    .addCase(typeRightRangeInput, (state, { payload: { typedValue } }) => {
    return Object.assign(Object.assign({}, state), { rightRangeTypedValue: typedValue });
})
    .addCase(typeInput$1, (state, { payload: { field, typedValue, noLiquidity } }) => {
    if (noLiquidity) {
        // they're typing into the field they've last typed in
        if (field === state.independentField) {
            return Object.assign(Object.assign({}, state), { independentField: field, typedValue });
        }
        // they're typing into a new field, store the other value
        else {
            return Object.assign(Object.assign({}, state), { independentField: field, typedValue });
        }
    }
    else {
        return Object.assign(Object.assign({}, state), { independentField: field, typedValue });
    }
}));

const routingApi = createApi({
    reducerPath: 'routingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.uniswap.org/v1/',
    }),
    endpoints: (build) => ({
        getQuote: build.query({
            query: (args) => `quote?${qs.stringify(Object.assign(Object.assign({}, args), { protocols: 'v3' }))}`,
        }),
    }),
});
const { useGetQuoteQuery } = routingApi;

var Field;
(function (Field) {
    Field["INPUT"] = "INPUT";
    Field["OUTPUT"] = "OUTPUT";
})(Field || (Field = {}));
const selectCurrency = createAction('swap/selectCurrency');
const switchCurrencies = createAction('swap/switchCurrencies');
const typeInput = createAction('swap/typeInput');
const replaceSwapState = createAction('swap/replaceSwapState');
const setRecipient = createAction('swap/setRecipient');

// returns whether tradeB is better than tradeA by at least a threshold percentage amount
function isTradeBetter(tradeA, tradeB, minimumDelta = ZERO_PERCENT) {
    if (tradeA && !tradeB)
        return false;
    if (tradeB && !tradeA)
        return true;
    if (!tradeA || !tradeB)
        return undefined;
    if (tradeA.tradeType !== tradeB.tradeType ||
        !tradeA.inputAmount.currency.equals(tradeB.inputAmount.currency) ||
        !tradeA.outputAmount.currency.equals(tradeB.outputAmount.currency)) {
        throw new Error('Comparing incomparable trades');
    }
    if (minimumDelta.equalTo(ZERO_PERCENT)) {
        return tradeA.executionPrice.lessThan(tradeB.executionPrice);
    }
    else {
        return tradeA.executionPrice.asFraction
            .multiply(minimumDelta.add(ONE_HUNDRED_PERCENT$1))
            .lessThan(tradeB.executionPrice);
    }
}

function useAllCurrencyCombinations(currencyA, currencyB) {
    const chainId = currencyA === null || currencyA === void 0 ? void 0 : currencyA.chainId;
    const [tokenA, tokenB] = chainId ? [currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped, currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped] : [undefined, undefined];
    const bases = useMemo(() => {
        var _a, _b, _c, _d, _e;
        if (!chainId || chainId !== (tokenB === null || tokenB === void 0 ? void 0 : tokenB.chainId))
            return [];
        const common = (_a = BASES_TO_CHECK_TRADES_AGAINST[chainId]) !== null && _a !== void 0 ? _a : [];
        const additionalA = tokenA ? (_c = (_b = ADDITIONAL_BASES[chainId]) === null || _b === void 0 ? void 0 : _b[tokenA.address]) !== null && _c !== void 0 ? _c : [] : [];
        const additionalB = tokenB ? (_e = (_d = ADDITIONAL_BASES[chainId]) === null || _d === void 0 ? void 0 : _d[tokenB.address]) !== null && _e !== void 0 ? _e : [] : [];
        return [...common, ...additionalA, ...additionalB];
    }, [chainId, tokenA, tokenB]);
    const basePairs = useMemo(() => bases
        .flatMap((base) => bases.map((otherBase) => [base, otherBase]))
        // though redundant with the first filter below, that expression runs more often, so this is probably worthwhile
        .filter(([t0, t1]) => !t0.equals(t1)), [bases]);
    return useMemo(() => tokenA && tokenB
        ? [
            // the direct pair
            [tokenA, tokenB],
            // token A against all bases
            ...bases.map((base) => [tokenA, base]),
            // token B against all bases
            ...bases.map((base) => [tokenB, base]),
            // each base against all bases
            ...basePairs,
        ]
            // filter out invalid pairs comprised of the same asset (e.g. WETH<>WETH)
            .filter(([t0, t1]) => !t0.equals(t1))
            // filter out duplicate pairs
            .filter(([t0, t1], i, otherPairs) => {
            // find the first index in the array at which there are the same 2 tokens as the current
            const firstIndexInOtherPairs = otherPairs.findIndex(([t0Other, t1Other]) => {
                return (t0.equals(t0Other) && t1.equals(t1Other)) || (t0.equals(t1Other) && t1.equals(t0Other));
            });
            // only accept the first occurrence of the same 2 tokens
            return firstIndexInOtherPairs === i;
        })
            // optionally filter out some pairs for tokens with custom bases defined
            .filter(([tokenA, tokenB]) => {
            if (!chainId)
                return true;
            const customBases = CUSTOM_BASES[chainId];
            const customBasesA = customBases === null || customBases === void 0 ? void 0 : customBases[tokenA.address];
            const customBasesB = customBases === null || customBases === void 0 ? void 0 : customBases[tokenB.address];
            if (!customBasesA && !customBasesB)
                return true;
            if (customBasesA && !customBasesA.find((base) => tokenB.equals(base)))
                return false;
            if (customBasesB && !customBasesB.find((base) => tokenA.equals(base)))
                return false;
            return true;
        })
        : [], [tokenA, tokenB, bases, basePairs, chainId]);
}

const PAIR_INTERFACE = new Interface(abi$4);
var PairState;
(function (PairState) {
    PairState[PairState["LOADING"] = 0] = "LOADING";
    PairState[PairState["NOT_EXISTS"] = 1] = "NOT_EXISTS";
    PairState[PairState["EXISTS"] = 2] = "EXISTS";
    PairState[PairState["INVALID"] = 3] = "INVALID";
})(PairState || (PairState = {}));
function useV2Pairs(currencies) {
    const tokens = useMemo(() => currencies.map(([currencyA, currencyB]) => [currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped, currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped]), [currencies]);
    const pairAddresses = useMemo(() => tokens.map(([tokenA, tokenB]) => {
        return tokenA &&
            tokenB &&
            tokenA.chainId === tokenB.chainId &&
            !tokenA.equals(tokenB) &&
            V2_FACTORY_ADDRESSES[tokenA.chainId]
            ? computePairAddress({ factoryAddress: V2_FACTORY_ADDRESSES[tokenA.chainId], tokenA, tokenB })
            : undefined;
    }), [tokens]);
    const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves');
    return useMemo(() => {
        return results.map((result, i) => {
            const { result: reserves, loading } = result;
            const tokenA = tokens[i][0];
            const tokenB = tokens[i][1];
            if (loading)
                return [PairState.LOADING, null];
            if (!tokenA || !tokenB || tokenA.equals(tokenB))
                return [PairState.INVALID, null];
            if (!reserves)
                return [PairState.NOT_EXISTS, null];
            const { reserve0, reserve1 } = reserves;
            const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];
            return [
                PairState.EXISTS,
                new Pair(CurrencyAmount.fromRawAmount(token0, reserve0.toString()), CurrencyAmount.fromRawAmount(token1, reserve1.toString())),
            ];
        });
    }, [results, tokens]);
}

function useAllCommonPairs(currencyA, currencyB) {
    const allCurrencyCombinations = useAllCurrencyCombinations(currencyA, currencyB);
    const allPairs = useV2Pairs(allCurrencyCombinations);
    return useMemo(() => Object.values(allPairs
        // filter out invalid pairs
        .filter((result) => Boolean(result[0] === PairState.EXISTS && result[1]))
        .map(([, pair]) => pair)), [allPairs]);
}
const MAX_HOPS = 3;
/**
 * Returns the best v2 trade for a desired swap
 * @param tradeType whether the swap is an exact in/out
 * @param amountSpecified the exact amount to swap in/out
 * @param otherCurrency the desired output/payment currency
 */
function useBestV2Trade(tradeType, amountSpecified, otherCurrency, { maxHops = MAX_HOPS } = {}) {
    const [currencyIn, currencyOut] = useMemo(() => tradeType === TradeType.EXACT_INPUT
        ? [amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency, otherCurrency]
        : [otherCurrency, amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency], [tradeType, amountSpecified, otherCurrency]);
    const allowedPairs = useAllCommonPairs(currencyIn, currencyOut);
    return useMemo(() => {
        var _a, _b, _c, _d;
        if (amountSpecified && currencyIn && currencyOut && allowedPairs.length > 0) {
            if (maxHops === 1) {
                const options = { maxHops: 1, maxNumResults: 1 };
                if (tradeType === TradeType.EXACT_INPUT) {
                    const amountIn = amountSpecified;
                    return (_a = Trade.bestTradeExactIn(allowedPairs, amountIn, currencyOut, options)[0]) !== null && _a !== void 0 ? _a : null;
                }
                else {
                    const amountOut = amountSpecified;
                    return (_b = Trade.bestTradeExactOut(allowedPairs, currencyIn, amountOut, options)[0]) !== null && _b !== void 0 ? _b : null;
                }
            }
            // search through trades with varying hops, find best trade out of them
            let bestTradeSoFar = null;
            for (let i = 1; i <= maxHops; i++) {
                const options = { maxHops: i, maxNumResults: 1 };
                let currentTrade;
                if (tradeType === TradeType.EXACT_INPUT) {
                    const amountIn = amountSpecified;
                    currentTrade = (_c = Trade.bestTradeExactIn(allowedPairs, amountIn, currencyOut, options)[0]) !== null && _c !== void 0 ? _c : null;
                }
                else {
                    const amountOut = amountSpecified;
                    currentTrade = (_d = Trade.bestTradeExactOut(allowedPairs, currencyIn, amountOut, options)[0]) !== null && _d !== void 0 ? _d : null;
                }
                // if current trade is best yet, save it
                if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
                    bestTradeSoFar = currentTrade;
                }
            }
            return bestTradeSoFar;
        }
        return null;
    }, [tradeType, amountSpecified, currencyIn, currencyOut, allowedPairs, maxHops]);
}

var V3TradeState;
(function (V3TradeState) {
    V3TradeState[V3TradeState["LOADING"] = 0] = "LOADING";
    V3TradeState[V3TradeState["INVALID"] = 1] = "INVALID";
    V3TradeState[V3TradeState["NO_ROUTE_FOUND"] = 2] = "NO_ROUTE_FOUND";
    V3TradeState[V3TradeState["VALID"] = 3] = "VALID";
    V3TradeState[V3TradeState["SYNCING"] = 4] = "SYNCING";
})(V3TradeState || (V3TradeState = {}));

/**
 * Transforms a Routing API quote into an array of routes that
 * can be used to create a V3 `Trade`.
 */
function computeRoutes(currencyIn, currencyOut, quoteResult) {
    if (!quoteResult || !quoteResult.route || !currencyIn || !currencyOut)
        return undefined;
    if (quoteResult.route.length === 0)
        return [];
    const parsedCurrencyIn = currencyIn.isNative
        ? Ether.onChain(currencyIn.chainId)
        : parseToken(quoteResult.route[0][0].tokenIn);
    const parsedCurrencyOut = currencyOut.isNative
        ? Ether.onChain(currencyOut.chainId)
        : parseToken(quoteResult.route[0][quoteResult.route[0].length - 1].tokenOut);
    try {
        return quoteResult.route.map((route) => {
            const rawAmountIn = route[0].amountIn;
            const rawAmountOut = route[route.length - 1].amountOut;
            if (!rawAmountIn || !rawAmountOut) {
                throw new Error('Expected both amountIn and amountOut to be present');
            }
            return {
                route: new Route$1(route.map(parsePool), parsedCurrencyIn, parsedCurrencyOut),
                inputAmount: CurrencyAmount.fromRawAmount(parsedCurrencyIn, rawAmountIn),
                outputAmount: CurrencyAmount.fromRawAmount(parsedCurrencyOut, rawAmountOut),
            };
        });
    }
    catch (e) {
        // `Route` constructor may throw if inputs/outputs are temporarily out of sync
        // (RTK-Query always returns the latest data which may not be the right inputs/outputs)
        // This is not fatal and will fix itself in future render cycles
        return undefined;
    }
}
const parseToken = ({ address, chainId, decimals, symbol }) => {
    return new Token(chainId, address, parseInt(decimals.toString()), symbol);
};
const parsePool = ({ fee, sqrtRatioX96, liquidity, tickCurrent, tokenIn, tokenOut, }) => new Pool$1(parseToken(tokenIn), parseToken(tokenOut), parseInt(fee), sqrtRatioX96, liquidity, parseInt(tickCurrent));

function useFreshData(data, dataBlockNumber, maxBlockAge = 10) {
    const localBlockNumber = useBlockNumber();
    if (!localBlockNumber)
        return undefined;
    if (localBlockNumber - dataBlockNumber > maxBlockAge) {
        return undefined;
    }
    return data;
}
/**
 * Returns query arguments for the Routing API query or undefined if the
 * query should be skipped.
 */
function useRoutingAPIArguments({ tokenIn, tokenOut, amount, tradeType, }) {
    if (!tokenIn || !tokenOut || !amount || tokenIn.equals(tokenOut)) {
        return undefined;
    }
    return {
        tokenInAddress: tokenIn.wrapped.address,
        tokenInChainId: tokenIn.chainId,
        tokenOutAddress: tokenOut.wrapped.address,
        tokenOutChainId: tokenOut.chainId,
        amount: amount.quotient.toString(),
        type: (tradeType === TradeType.EXACT_INPUT ? 'exactIn' : 'exactOut'),
    };
}
/**
 * Returns the best v3 trade by invoking the routing api
 * @param tradeType whether the swap is an exact in/out
 * @param amountSpecified the exact amount to swap in/out
 * @param otherCurrency the desired output/payment currency
 */
function useRoutingAPITrade(tradeType, amountSpecified, otherCurrency) {
    const [currencyIn, currencyOut] = useMemo(() => tradeType === TradeType.EXACT_INPUT
        ? [amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency, otherCurrency]
        : [otherCurrency, amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency], [amountSpecified, otherCurrency, tradeType]);
    const queryArgs = useRoutingAPIArguments({
        tokenIn: currencyIn,
        tokenOut: currencyOut,
        amount: amountSpecified,
        tradeType,
    });
    const { isLoading, isError, data } = useGetQuoteQuery(queryArgs !== null && queryArgs !== void 0 ? queryArgs : skipToken, {
        pollingInterval: ms `10s`,
        refetchOnFocus: true,
    });
    const quoteResult = useFreshData(data, Number(data === null || data === void 0 ? void 0 : data.blockNumber) || 0);
    const routes = useMemo(() => computeRoutes(currencyIn, currencyOut, quoteResult), [currencyIn, currencyOut, quoteResult]);
    return useMemo(() => {
        if (!currencyIn || !currencyOut) {
            return {
                state: V3TradeState.INVALID,
                trade: null,
            };
        }
        if (isLoading && !quoteResult) {
            // only on first hook render
            return {
                state: V3TradeState.LOADING,
                trade: null,
            };
        }
        const otherAmount = tradeType === TradeType.EXACT_INPUT
            ? currencyOut && quoteResult
                ? CurrencyAmount.fromRawAmount(currencyOut, quoteResult.quote)
                : undefined
            : currencyIn && quoteResult
                ? CurrencyAmount.fromRawAmount(currencyIn, quoteResult.quote)
                : undefined;
        if (isError || !otherAmount || !routes || routes.length === 0 || !queryArgs) {
            return {
                state: V3TradeState.NO_ROUTE_FOUND,
                trade: null,
            };
        }
        const trade = Trade$1.createUncheckedTradeWithMultipleRoutes({
            routes,
            tradeType,
        });
        return {
            // always return VALID regardless of isFetching status
            state: V3TradeState.VALID,
            trade,
        };
    }, [currencyIn, currencyOut, isLoading, quoteResult, isError, routes, queryArgs, tradeType]);
}

var abi = [
	{
		inputs: [
		],
		name: "feeGrowthGlobal0X128",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "feeGrowthGlobal1X128",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "liquidity",
		outputs: [
			{
				internalType: "uint128",
				name: "",
				type: "uint128"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "index",
				type: "uint256"
			}
		],
		name: "observations",
		outputs: [
			{
				internalType: "uint32",
				name: "blockTimestamp",
				type: "uint32"
			},
			{
				internalType: "int56",
				name: "tickCumulative",
				type: "int56"
			},
			{
				internalType: "uint160",
				name: "secondsPerLiquidityCumulativeX128",
				type: "uint160"
			},
			{
				internalType: "bool",
				name: "initialized",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "key",
				type: "bytes32"
			}
		],
		name: "positions",
		outputs: [
			{
				internalType: "uint128",
				name: "_liquidity",
				type: "uint128"
			},
			{
				internalType: "uint256",
				name: "feeGrowthInside0LastX128",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "feeGrowthInside1LastX128",
				type: "uint256"
			},
			{
				internalType: "uint128",
				name: "tokensOwed0",
				type: "uint128"
			},
			{
				internalType: "uint128",
				name: "tokensOwed1",
				type: "uint128"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "protocolFees",
		outputs: [
			{
				internalType: "uint128",
				name: "token0",
				type: "uint128"
			},
			{
				internalType: "uint128",
				name: "token1",
				type: "uint128"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "slot0",
		outputs: [
			{
				internalType: "uint160",
				name: "sqrtPriceX96",
				type: "uint160"
			},
			{
				internalType: "int24",
				name: "tick",
				type: "int24"
			},
			{
				internalType: "uint16",
				name: "observationIndex",
				type: "uint16"
			},
			{
				internalType: "uint16",
				name: "observationCardinality",
				type: "uint16"
			},
			{
				internalType: "uint16",
				name: "observationCardinalityNext",
				type: "uint16"
			},
			{
				internalType: "uint8",
				name: "feeProtocol",
				type: "uint8"
			},
			{
				internalType: "bool",
				name: "unlocked",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "int16",
				name: "wordPosition",
				type: "int16"
			}
		],
		name: "tickBitmap",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "int24",
				name: "tick",
				type: "int24"
			}
		],
		name: "ticks",
		outputs: [
			{
				internalType: "uint128",
				name: "liquidityGross",
				type: "uint128"
			},
			{
				internalType: "int128",
				name: "liquidityNet",
				type: "int128"
			},
			{
				internalType: "uint256",
				name: "feeGrowthOutside0X128",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "feeGrowthOutside1X128",
				type: "uint256"
			},
			{
				internalType: "int56",
				name: "tickCumulativeOutside",
				type: "int56"
			},
			{
				internalType: "uint160",
				name: "secondsPerLiquidityOutsideX128",
				type: "uint160"
			},
			{
				internalType: "uint32",
				name: "secondsOutside",
				type: "uint32"
			},
			{
				internalType: "bool",
				name: "initialized",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];

const POOL_STATE_INTERFACE = new Interface(abi);
var PoolState;
(function (PoolState) {
    PoolState[PoolState["LOADING"] = 0] = "LOADING";
    PoolState[PoolState["NOT_EXISTS"] = 1] = "NOT_EXISTS";
    PoolState[PoolState["EXISTS"] = 2] = "EXISTS";
    PoolState[PoolState["INVALID"] = 3] = "INVALID";
})(PoolState || (PoolState = {}));
function usePools(poolKeys) {
    const { chainId } = useActiveWeb3React();
    const transformed = useMemo(() => {
        return poolKeys.map(([currencyA, currencyB, feeAmount]) => {
            if (!chainId || !currencyA || !currencyB || !feeAmount)
                return null;
            const tokenA = currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped;
            const tokenB = currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped;
            if (!tokenA || !tokenB || tokenA.equals(tokenB))
                return null;
            const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];
            return [token0, token1, feeAmount];
        });
    }, [chainId, poolKeys]);
    const poolAddresses = useMemo(() => {
        const v3CoreFactoryAddress = chainId && V3_CORE_FACTORY_ADDRESSES[chainId];
        return transformed.map((value) => {
            if (!v3CoreFactoryAddress || !value)
                return undefined;
            return computePoolAddress({
                factoryAddress: v3CoreFactoryAddress,
                tokenA: value[0],
                tokenB: value[1],
                fee: value[2],
            });
        });
    }, [chainId, transformed]);
    const slot0s = useMultipleContractSingleData(poolAddresses, POOL_STATE_INTERFACE, 'slot0');
    const liquidities = useMultipleContractSingleData(poolAddresses, POOL_STATE_INTERFACE, 'liquidity');
    return useMemo(() => {
        return poolKeys.map((_key, index) => {
            var _a;
            const [token0, token1, fee] = (_a = transformed[index]) !== null && _a !== void 0 ? _a : [];
            if (!token0 || !token1 || !fee)
                return [PoolState.INVALID, null];
            const { result: slot0, loading: slot0Loading, valid: slot0Valid } = slot0s[index];
            const { result: liquidity, loading: liquidityLoading, valid: liquidityValid } = liquidities[index];
            if (!slot0Valid || !liquidityValid)
                return [PoolState.INVALID, null];
            if (slot0Loading || liquidityLoading)
                return [PoolState.LOADING, null];
            if (!slot0 || !liquidity)
                return [PoolState.NOT_EXISTS, null];
            if (!slot0.sqrtPriceX96 || slot0.sqrtPriceX96.eq(0))
                return [PoolState.NOT_EXISTS, null];
            try {
                return [PoolState.EXISTS, new Pool$1(token0, token1, fee, slot0.sqrtPriceX96, liquidity[0], slot0.tick)];
            }
            catch (error) {
                console.error('Error when constructing the pool', error);
                return [PoolState.NOT_EXISTS, null];
            }
        });
    }, [liquidities, poolKeys, slot0s, transformed]);
}

/**
 * Returns all the existing pools that should be considered for swapping between an input currency and an output currency
 * @param currencyIn the input currency
 * @param currencyOut the output currency
 */
function useV3SwapPools(currencyIn, currencyOut) {
    const { chainId } = useActiveWeb3React();
    const allCurrencyCombinations = useAllCurrencyCombinations(currencyIn, currencyOut);
    const allCurrencyCombinationsWithAllFees = useMemo(() => allCurrencyCombinations.reduce((list, [tokenA, tokenB]) => {
        return chainId === SupportedChainId.MAINNET
            ? list.concat([
                [tokenA, tokenB, FeeAmount.LOW],
                [tokenA, tokenB, FeeAmount.MEDIUM],
                [tokenA, tokenB, FeeAmount.HIGH],
            ])
            : list.concat([
                [tokenA, tokenB, FeeAmount.LOWEST],
                [tokenA, tokenB, FeeAmount.LOW],
                [tokenA, tokenB, FeeAmount.MEDIUM],
                [tokenA, tokenB, FeeAmount.HIGH],
            ]);
    }, []), [allCurrencyCombinations, chainId]);
    const pools = usePools(allCurrencyCombinationsWithAllFees);
    return useMemo(() => {
        return {
            pools: pools
                .filter((tuple) => {
                return tuple[0] === PoolState.EXISTS && tuple[1] !== null;
            })
                .map(([, pool]) => pool),
            loading: pools.some(([state]) => state === PoolState.LOADING),
        };
    }, [pools]);
}

/**
 * Returns true if poolA is equivalent to poolB
 * @param poolA one of the two pools
 * @param poolB the other pool
 */
function poolEquals(poolA, poolB) {
    return (poolA === poolB ||
        (poolA.token0.equals(poolB.token0) && poolA.token1.equals(poolB.token1) && poolA.fee === poolB.fee));
}
function computeAllRoutes(currencyIn, currencyOut, pools, chainId, currentPath = [], allPaths = [], startCurrencyIn = currencyIn, maxHops = 2) {
    const tokenIn = currencyIn === null || currencyIn === void 0 ? void 0 : currencyIn.wrapped;
    const tokenOut = currencyOut === null || currencyOut === void 0 ? void 0 : currencyOut.wrapped;
    if (!tokenIn || !tokenOut)
        throw new Error('Missing tokenIn/tokenOut');
    for (const pool of pools) {
        if (!pool.involvesToken(tokenIn) || currentPath.find((pathPool) => poolEquals(pool, pathPool)))
            continue;
        const outputToken = pool.token0.equals(tokenIn) ? pool.token1 : pool.token0;
        if (outputToken.equals(tokenOut)) {
            allPaths.push(new Route$1([...currentPath, pool], startCurrencyIn, currencyOut));
        }
        else if (maxHops > 1) {
            computeAllRoutes(outputToken, currencyOut, pools, chainId, [...currentPath, pool], allPaths, startCurrencyIn, maxHops - 1);
        }
    }
    return allPaths;
}
/**
 * Returns all the routes from an input currency to an output currency
 * @param currencyIn the input currency
 * @param currencyOut the output currency
 */
function useAllV3Routes(currencyIn, currencyOut) {
    const { chainId } = useActiveWeb3React();
    const { pools, loading: poolsLoading } = useV3SwapPools(currencyIn, currencyOut);
    return useMemo(() => {
        if (poolsLoading || !chainId || !pools || !currencyIn || !currencyOut)
            return { loading: true, routes: [] };
        const routes = computeAllRoutes(currencyIn, currencyOut, pools, chainId, [], [], currencyIn, 2);
        return { loading: false, routes };
    }, [chainId, currencyIn, currencyOut, pools, poolsLoading]);
}

const QUOTE_GAS_OVERRIDES = {
    [SupportedChainId.ARBITRUM_ONE]: 25000000,
    [SupportedChainId.ARBITRUM_RINKEBY]: 25000000,
};
const DEFAULT_GAS_QUOTE = 2000000;
/**
 * Returns the best v3 trade for a desired swap
 * @param tradeType whether the swap is an exact in/out
 * @param amountSpecified the exact amount to swap in/out
 * @param otherCurrency the desired output/payment currency
 */
function useClientSideV3Trade(tradeType, amountSpecified, otherCurrency) {
    var _a;
    const [currencyIn, currencyOut] = useMemo(() => tradeType === TradeType.EXACT_INPUT
        ? [amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency, otherCurrency]
        : [otherCurrency, amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency], [tradeType, amountSpecified, otherCurrency]);
    const { routes, loading: routesLoading } = useAllV3Routes(currencyIn, currencyOut);
    const quoter = useV3Quoter();
    const { chainId } = useActiveWeb3React();
    const quotesResults = useSingleContractWithCallData(quoter, amountSpecified
        ? routes.map((route) => SwapQuoter.quoteCallParameters(route, amountSpecified, tradeType).calldata)
        : [], {
        gasRequired: chainId ? (_a = QUOTE_GAS_OVERRIDES[chainId]) !== null && _a !== void 0 ? _a : DEFAULT_GAS_QUOTE : undefined,
    });
    return useMemo(() => {
        if (!amountSpecified ||
            !currencyIn ||
            !currencyOut ||
            quotesResults.some(({ valid }) => !valid) ||
            // skip when tokens are the same
            (tradeType === TradeType.EXACT_INPUT
                ? amountSpecified.currency.equals(currencyOut)
                : amountSpecified.currency.equals(currencyIn))) {
            return {
                state: V3TradeState.INVALID,
                trade: null,
            };
        }
        if (routesLoading || quotesResults.some(({ loading }) => loading)) {
            return {
                state: V3TradeState.LOADING,
                trade: null,
            };
        }
        const { bestRoute, amountIn, amountOut } = quotesResults.reduce((currentBest, { result }, i) => {
            if (!result)
                return currentBest;
            // overwrite the current best if it's not defined or if this route is better
            if (tradeType === TradeType.EXACT_INPUT) {
                const amountOut = CurrencyAmount.fromRawAmount(currencyOut, result.amountOut.toString());
                if (currentBest.amountOut === null || JSBI.lessThan(currentBest.amountOut.quotient, amountOut.quotient)) {
                    return {
                        bestRoute: routes[i],
                        amountIn: amountSpecified,
                        amountOut,
                    };
                }
            }
            else {
                const amountIn = CurrencyAmount.fromRawAmount(currencyIn, result.amountIn.toString());
                if (currentBest.amountIn === null || JSBI.greaterThan(currentBest.amountIn.quotient, amountIn.quotient)) {
                    return {
                        bestRoute: routes[i],
                        amountIn,
                        amountOut: amountSpecified,
                    };
                }
            }
            return currentBest;
        }, {
            bestRoute: null,
            amountIn: null,
            amountOut: null,
        });
        if (!bestRoute || !amountIn || !amountOut) {
            return {
                state: V3TradeState.NO_ROUTE_FOUND,
                trade: null,
            };
        }
        return {
            state: V3TradeState.VALID,
            trade: Trade$1.createUncheckedTrade({
                route: bestRoute,
                tradeType,
                inputAmount: amountIn,
                outputAmount: amountOut,
            }),
        };
    }, [amountSpecified, currencyIn, currencyOut, quotesResults, routes, routesLoading, tradeType]);
}

const VISIBILITY_STATE_SUPPORTED = 'visibilityState' in document;
function isWindowVisible() {
    return !VISIBILITY_STATE_SUPPORTED || document.visibilityState !== 'hidden';
}
/**
 * Returns whether the window is currently visible to the user.
 */
function useIsWindowVisible() {
    const [focused, setFocused] = useState(isWindowVisible());
    const listener = useCallback(() => {
        setFocused(isWindowVisible());
    }, [setFocused]);
    useEffect(() => {
        if (!VISIBILITY_STATE_SUPPORTED)
            return undefined;
        document.addEventListener('visibilitychange', listener);
        return () => {
            document.removeEventListener('visibilitychange', listener);
        };
    }, [listener]);
    return focused;
}

/**
 * Returns the best v3 trade for a desired swap.
 * Uses optimized routes from the Routing API and falls back to the v3 router.
 * @param tradeType whether the swap is an exact in/out
 * @param amountSpecified the exact amount to swap in/out
 * @param otherCurrency the desired output/payment currency
 */
function useBestV3Trade(tradeType, amountSpecified, otherCurrency) {
    const routingAPIEnabled = useRoutingAPIEnabled();
    const isWindowVisible = useIsWindowVisible();
    const [debouncedAmount, debouncedOtherCurrency] = useDebounce([amountSpecified, otherCurrency], 200);
    const routingAPITrade = useRoutingAPITrade(tradeType, routingAPIEnabled && isWindowVisible ? debouncedAmount : undefined, debouncedOtherCurrency);
    const isLoading = amountSpecified !== undefined && debouncedAmount === undefined;
    // consider trade debouncing when inputs/outputs do not match
    const debouncing = routingAPITrade.trade &&
        amountSpecified &&
        (tradeType === TradeType.EXACT_INPUT
            ? !routingAPITrade.trade.inputAmount.equalTo(amountSpecified) ||
                !amountSpecified.currency.equals(routingAPITrade.trade.inputAmount.currency) ||
                !(debouncedOtherCurrency === null || debouncedOtherCurrency === void 0 ? void 0 : debouncedOtherCurrency.equals(routingAPITrade.trade.outputAmount.currency))
            : !routingAPITrade.trade.outputAmount.equalTo(amountSpecified) ||
                !amountSpecified.currency.equals(routingAPITrade.trade.outputAmount.currency) ||
                !(debouncedOtherCurrency === null || debouncedOtherCurrency === void 0 ? void 0 : debouncedOtherCurrency.equals(routingAPITrade.trade.inputAmount.currency)));
    const useFallback = !routingAPIEnabled || (!debouncing && routingAPITrade.state === V3TradeState.NO_ROUTE_FOUND);
    // only use client side router if routing api trade failed
    const bestV3Trade = useClientSideV3Trade(tradeType, useFallback ? debouncedAmount : undefined, useFallback ? debouncedOtherCurrency : undefined);
    return Object.assign(Object.assign(Object.assign({}, (useFallback ? bestV3Trade : routingAPITrade)), (debouncing ? { state: V3TradeState.SYNCING } : {})), (isLoading ? { state: V3TradeState.LOADING } : {}));
}

const CHAIN_DATA_ABI = [
    {
        inputs: [],
        name: 'latestAnswer',
        outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
        stateMutability: 'view',
        type: 'function',
    },
];
/**
 * Returns the price of 1 gas in WEI for the currently selected network using the chainlink fast gas price oracle
 */
function useGasPrice() {
    var _a, _b;
    const { address } = useENSAddress('fast-gas-gwei.data.eth');
    const contract = useContract(address !== null && address !== void 0 ? address : undefined, CHAIN_DATA_ABI, false);
    const resultStr = (_b = (_a = useSingleCallResult(contract, 'latestAnswer').result) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.toString();
    return typeof resultStr === 'string' ? JSBI.BigInt(resultStr) : undefined;
}

// Stablecoin amounts used when calculating spot price for a given currency.
// The amount is large enough to filter low liquidity pairs.
const STABLECOIN_AMOUNT_OUT = {
    [SupportedChainId.MAINNET]: CurrencyAmount.fromRawAmount(USDC, 100000000000),
    [SupportedChainId.ARBITRUM_ONE]: CurrencyAmount.fromRawAmount(USDC_ARBITRUM, 10000000000),
    [SupportedChainId.OPTIMISM]: CurrencyAmount.fromRawAmount(DAI_OPTIMISM, 1e+22),
};
/**
 * Returns the price in USDC of the input currency
 * @param currency currency to compute the USDC price of
 */
function useUSDCPrice(currency) {
    const { chainId } = useActiveWeb3React();
    const amountOut = chainId ? STABLECOIN_AMOUNT_OUT[chainId] : undefined;
    const stablecoin = amountOut === null || amountOut === void 0 ? void 0 : amountOut.currency;
    const v2USDCTrade = useBestV2Trade(TradeType.EXACT_OUTPUT, amountOut, currency, {
        maxHops: 2,
    });
    const v3USDCTrade = useClientSideV3Trade(TradeType.EXACT_OUTPUT, amountOut, currency);
    return useMemo(() => {
        if (!currency || !stablecoin) {
            return undefined;
        }
        // handle usdc
        if (currency === null || currency === void 0 ? void 0 : currency.wrapped.equals(stablecoin)) {
            return new Price(stablecoin, stablecoin, '1', '1');
        }
        // use v2 price if available, v3 as fallback
        if (v2USDCTrade) {
            const { numerator, denominator } = v2USDCTrade.route.midPrice;
            return new Price(currency, stablecoin, denominator, numerator);
        }
        else if (v3USDCTrade.trade) {
            const { numerator, denominator } = v3USDCTrade.trade.route.midPrice;
            return new Price(currency, stablecoin, denominator, numerator);
        }
        return undefined;
    }, [currency, stablecoin, v2USDCTrade, v3USDCTrade.trade]);
}
function useUSDCValue(currencyAmount) {
    const price = useUSDCPrice(currencyAmount === null || currencyAmount === void 0 ? void 0 : currencyAmount.currency);
    return useMemo(() => {
        if (!price || !currencyAmount)
            return null;
        try {
            return price.quote(currencyAmount);
        }
        catch (error) {
            return null;
        }
    }, [currencyAmount, price]);
}

const V2_SWAP_DEFAULT_SLIPPAGE = new Percent(50, 10000); // .50%
const V3_SWAP_DEFAULT_SLIPPAGE = new Percent(50, 10000); // .50%
const ONE_TENTHS_PERCENT = new Percent(10, 10000); // .10%
/**
 * Return a guess of the gas cost used in computing slippage tolerance for a given trade
 * @param trade the trade for which to _guess_ the amount of gas it would cost to execute
 */
function guesstimateGas(trade) {
    if (trade instanceof Trade) {
        return 90000 + trade.route.pairs.length * 30000;
    }
    else if (trade instanceof Trade$1) {
        return 100000 + trade.swaps.reduce((memo, swap) => swap.route.pools.length + memo, 0) * 30000;
    }
    return undefined;
}
const MIN_AUTO_SLIPPAGE_TOLERANCE = new Percent(5, 1000); // 0.5%
const MAX_AUTO_SLIPPAGE_TOLERANCE = new Percent(25, 100); // 25%
function useSwapSlippageTolerance(trade) {
    const { chainId } = useActiveWeb3React();
    const onL2 = chainId && L2_CHAIN_IDS.includes(chainId);
    const outputDollarValue = useUSDCValue(trade === null || trade === void 0 ? void 0 : trade.outputAmount);
    const ethGasPrice = useGasPrice();
    const gasEstimate = guesstimateGas(trade);
    const ether = useCurrency('ETH');
    const etherPrice = useUSDCPrice(ether !== null && ether !== void 0 ? ether : undefined);
    const defaultSlippageTolerance = useMemo(() => {
        if (!trade || onL2)
            return ONE_TENTHS_PERCENT;
        const ethGasCost = ethGasPrice && typeof gasEstimate === 'number' ? JSBI.multiply(ethGasPrice, JSBI.BigInt(gasEstimate)) : undefined;
        const dollarGasCost = ether && ethGasCost && etherPrice ? etherPrice.quote(CurrencyAmount.fromRawAmount(ether, ethGasCost)) : undefined;
        if (outputDollarValue && dollarGasCost) {
            // the rationale is that a user will not want their trade to fail for a loss due to slippage that is less than
            // the cost of the gas of the failed transaction
            const fraction = dollarGasCost.asFraction.divide(outputDollarValue.asFraction);
            const result = new Percent(fraction.numerator, fraction.denominator);
            if (result.greaterThan(MAX_AUTO_SLIPPAGE_TOLERANCE))
                return MAX_AUTO_SLIPPAGE_TOLERANCE;
            if (result.lessThan(MIN_AUTO_SLIPPAGE_TOLERANCE))
                return MIN_AUTO_SLIPPAGE_TOLERANCE;
            return result;
        }
        if (trade instanceof Trade)
            return V2_SWAP_DEFAULT_SLIPPAGE;
        return V3_SWAP_DEFAULT_SLIPPAGE;
    }, [ethGasPrice, ether, etherPrice, gasEstimate, onL2, outputDollarValue, trade]);
    return useUserSlippageToleranceWithDefault(defaultSlippageTolerance);
}

var Version;
(function (Version) {
    Version["v2"] = "V2";
    Version["v3"] = "V3";
})(Version || (Version = {}));
function useToggledVersion() {
    const { use } = useParsedQueryString();
    if (typeof use !== 'string') {
        return undefined;
    }
    switch (use.toLowerCase()) {
        case 'v2':
            return Version.v2;
        case 'v3':
            return Version.v3;
        default:
            return undefined;
    }
}

// gets the current timestamp from the blockchain
function useCurrentBlockTimestamp() {
    var _a, _b;
    const multicall = useMulticall2Contract();
    return (_b = (_a = useSingleCallResult(multicall, 'getCurrentBlockTimestamp')) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
}

const STAKING_REWARDS_INTERFACE = new Interface(abi$6);
const STAKING_GENESIS = 1600387200;
const STAKING_REWARDS_INFO = {
    1: [
        {
            tokens: [WETH9_EXTENDED[1], DAI],
            stakingRewardAddress: '0xa1484C3aa22a66C62b77E0AE78E15258bd0cB711',
        },
        {
            tokens: [WETH9_EXTENDED[1], USDC],
            stakingRewardAddress: '0x7FBa4B8Dc5E7616e59622806932DBea72537A56b',
        },
        {
            tokens: [WETH9_EXTENDED[1], USDT],
            stakingRewardAddress: '0x6C3e4cb2E96B01F4b866965A91ed4437839A121a',
        },
        {
            tokens: [WETH9_EXTENDED[1], WBTC],
            stakingRewardAddress: '0xCA35e32e7926b96A9988f61d510E038108d8068e',
        },
    ],
};
// gets the staking info from the network for the active chain id
function useStakingInfo(pairToFilterBy) {
    const { chainId, account } = useActiveWeb3React();
    // detect if staking is ended
    const currentBlockTimestamp = useCurrentBlockTimestamp();
    const info = useMemo(() => {
        var _a, _b;
        return chainId
            ? (_b = (_a = STAKING_REWARDS_INFO[chainId]) === null || _a === void 0 ? void 0 : _a.filter((stakingRewardInfo) => pairToFilterBy === undefined
                ? true
                : pairToFilterBy === null
                    ? false
                    : pairToFilterBy.involvesToken(stakingRewardInfo.tokens[0]) &&
                        pairToFilterBy.involvesToken(stakingRewardInfo.tokens[1]))) !== null && _b !== void 0 ? _b : []
            : [];
    }, [chainId, pairToFilterBy]);
    const uni = chainId ? UNI[chainId] : undefined;
    const rewardsAddresses = useMemo(() => info.map(({ stakingRewardAddress }) => stakingRewardAddress), [info]);
    const accountArg = useMemo(() => [account !== null && account !== void 0 ? account : undefined], [account]);
    // get all the info from the staking rewards contracts
    const balances = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'balanceOf', accountArg);
    const earnedAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'earned', accountArg);
    const totalSupplies = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'totalSupply');
    // tokens per second, constants
    const rewardRates = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'rewardRate', undefined, NEVER_RELOAD);
    const periodFinishes = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'periodFinish', undefined, NEVER_RELOAD);
    return useMemo(() => {
        if (!chainId || !uni)
            return [];
        return rewardsAddresses.reduce((memo, rewardsAddress, index) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            // these two are dependent on account
            const balanceState = balances[index];
            const earnedAmountState = earnedAmounts[index];
            // these get fetched regardless of account
            const totalSupplyState = totalSupplies[index];
            const rewardRateState = rewardRates[index];
            const periodFinishState = periodFinishes[index];
            if (
            // these may be undefined if not logged in
            !(balanceState === null || balanceState === void 0 ? void 0 : balanceState.loading) &&
                !(earnedAmountState === null || earnedAmountState === void 0 ? void 0 : earnedAmountState.loading) &&
                // always need these
                totalSupplyState &&
                !totalSupplyState.loading &&
                rewardRateState &&
                !rewardRateState.loading &&
                periodFinishState &&
                !periodFinishState.loading) {
                if ((balanceState === null || balanceState === void 0 ? void 0 : balanceState.error) ||
                    (earnedAmountState === null || earnedAmountState === void 0 ? void 0 : earnedAmountState.error) ||
                    totalSupplyState.error ||
                    rewardRateState.error ||
                    periodFinishState.error) {
                    console.error('Failed to load staking rewards info');
                    return memo;
                }
                // get the LP token
                const tokens = info[index].tokens;
                const dummyPair = new Pair(CurrencyAmount.fromRawAmount(tokens[0], '0'), CurrencyAmount.fromRawAmount(tokens[1], '0'));
                // check for account, if no account set to 0
                const stakedAmount = CurrencyAmount.fromRawAmount(dummyPair.liquidityToken, JSBI.BigInt((_b = (_a = balanceState === null || balanceState === void 0 ? void 0 : balanceState.result) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : 0));
                const totalStakedAmount = CurrencyAmount.fromRawAmount(dummyPair.liquidityToken, JSBI.BigInt((_c = totalSupplyState.result) === null || _c === void 0 ? void 0 : _c[0]));
                const totalRewardRate = CurrencyAmount.fromRawAmount(uni, JSBI.BigInt((_d = rewardRateState.result) === null || _d === void 0 ? void 0 : _d[0]));
                const getHypotheticalRewardRate = (stakedAmount, totalStakedAmount, totalRewardRate) => {
                    return CurrencyAmount.fromRawAmount(uni, JSBI.greaterThan(totalStakedAmount.quotient, JSBI.BigInt(0))
                        ? JSBI.divide(JSBI.multiply(totalRewardRate.quotient, stakedAmount.quotient), totalStakedAmount.quotient)
                        : JSBI.BigInt(0));
                };
                const individualRewardRate = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRate);
                const periodFinishSeconds = (_f = (_e = periodFinishState.result) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.toNumber();
                const periodFinishMs = periodFinishSeconds * 1000;
                // compare period end timestamp vs current block timestamp (in seconds)
                const active = periodFinishSeconds && currentBlockTimestamp ? periodFinishSeconds > currentBlockTimestamp.toNumber() : true;
                memo.push({
                    stakingRewardAddress: rewardsAddress,
                    tokens: info[index].tokens,
                    periodFinish: periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
                    earnedAmount: CurrencyAmount.fromRawAmount(uni, JSBI.BigInt((_h = (_g = earnedAmountState === null || earnedAmountState === void 0 ? void 0 : earnedAmountState.result) === null || _g === void 0 ? void 0 : _g[0]) !== null && _h !== void 0 ? _h : 0)),
                    rewardRate: individualRewardRate,
                    totalRewardRate,
                    stakedAmount,
                    totalStakedAmount,
                    getHypotheticalRewardRate,
                    active,
                });
            }
            return memo;
        }, []);
    }, [
        balances,
        chainId,
        currentBlockTimestamp,
        earnedAmounts,
        info,
        periodFinishes,
        rewardRates,
        rewardsAddresses,
        totalSupplies,
        uni,
    ]);
}
function useTotalUniEarned() {
    const { chainId } = useActiveWeb3React();
    const uni = chainId ? UNI[chainId] : undefined;
    const stakingInfos = useStakingInfo();
    return useMemo(() => {
        var _a;
        if (!uni)
            return undefined;
        return ((_a = stakingInfos === null || stakingInfos === void 0 ? void 0 : stakingInfos.reduce((accumulator, stakingInfo) => accumulator.add(stakingInfo.earnedAmount), CurrencyAmount.fromRawAmount(uni, '0'))) !== null && _a !== void 0 ? _a : CurrencyAmount.fromRawAmount(uni, '0'));
    }, [stakingInfos, uni]);
}

/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */
function useETHBalances(uncheckedAddresses) {
    const { chainId } = useActiveWeb3React();
    const multicallContract = useMulticall2Contract();
    const addresses = useMemo(() => uncheckedAddresses
        ? uncheckedAddresses
            .map(isAddress)
            .filter((a) => a !== false)
            .sort()
        : [], [uncheckedAddresses]);
    const results = useSingleContractMultipleData(multicallContract, 'getEthBalance', addresses.map((address) => [address]));
    return useMemo(() => addresses.reduce((memo, address, i) => {
        var _a, _b;
        const value = (_b = (_a = results === null || results === void 0 ? void 0 : results[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
        if (value && chainId)
            memo[address] = CurrencyAmount.fromRawAmount(Ether.onChain(chainId), JSBI.BigInt(value.toString()));
        return memo;
    }, {}), [addresses, chainId, results]);
}
const ERC20Interface = new Interface(ERC20ABI);
const tokenBalancesGasRequirement = { gasRequired: 125000 };
/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
function useTokenBalancesWithLoadingIndicator(address, tokens) {
    const validatedTokens = useMemo(() => { var _a; return (_a = tokens === null || tokens === void 0 ? void 0 : tokens.filter((t) => isAddress(t === null || t === void 0 ? void 0 : t.address) !== false)) !== null && _a !== void 0 ? _a : []; }, [tokens]);
    const validatedTokenAddresses = useMemo(() => validatedTokens.map((vt) => vt.address), [validatedTokens]);
    const balances = useMultipleContractSingleData(validatedTokenAddresses, ERC20Interface, 'balanceOf', useMemo(() => [address], [address]), tokenBalancesGasRequirement);
    const anyLoading = useMemo(() => balances.some((callState) => callState.loading), [balances]);
    return useMemo(() => [
        address && validatedTokens.length > 0
            ? validatedTokens.reduce((memo, token, i) => {
                var _a, _b;
                const value = (_b = (_a = balances === null || balances === void 0 ? void 0 : balances[i]) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
                const amount = value ? JSBI.BigInt(value.toString()) : undefined;
                if (amount) {
                    memo[token.address] = CurrencyAmount.fromRawAmount(token, amount);
                }
                return memo;
            }, {})
            : {},
        anyLoading,
    ], [address, validatedTokens, anyLoading, balances]);
}
function useTokenBalances(address, tokens) {
    return useTokenBalancesWithLoadingIndicator(address, tokens)[0];
}
// get the balance for a single token/account combo
function useTokenBalance(account, token) {
    const tokenBalances = useTokenBalances(account, [token]);
    if (!token)
        return undefined;
    return tokenBalances[token.address];
}
function useCurrencyBalances(account, currencies) {
    const tokens = useMemo(() => { var _a; return (_a = currencies === null || currencies === void 0 ? void 0 : currencies.filter((currency) => { var _a; return (_a = currency === null || currency === void 0 ? void 0 : currency.isToken) !== null && _a !== void 0 ? _a : false; })) !== null && _a !== void 0 ? _a : []; }, [currencies]);
    const tokenBalances = useTokenBalances(account, tokens);
    const containsETH = useMemo(() => { var _a; return (_a = currencies === null || currencies === void 0 ? void 0 : currencies.some((currency) => currency === null || currency === void 0 ? void 0 : currency.isNative)) !== null && _a !== void 0 ? _a : false; }, [currencies]);
    const ethBalance = useETHBalances(containsETH ? [account] : []);
    return useMemo(() => {
        var _a;
        return (_a = currencies === null || currencies === void 0 ? void 0 : currencies.map((currency) => {
            if (!account || !currency)
                return undefined;
            if (currency.isToken)
                return tokenBalances[currency.address];
            if (currency.isNative)
                return ethBalance[account];
            return undefined;
        })) !== null && _a !== void 0 ? _a : [];
    }, [account, currencies, ethBalance, tokenBalances]);
}
function useCurrencyBalance(account, currency) {
    return useCurrencyBalances(account, useMemo(() => [currency], [currency]))[0];
}
// mimics useAllBalances
function useAllTokenBalances() {
    const { account } = useActiveWeb3React();
    const allTokens = useAllTokens();
    const allTokensArray = useMemo(() => Object.values(allTokens !== null && allTokens !== void 0 ? allTokens : {}), [allTokens]);
    const balances = useTokenBalances(account !== null && account !== void 0 ? account : undefined, allTokensArray);
    return balances !== null && balances !== void 0 ? balances : {};
}
// get the total owned, unclaimed, and unharvested UNI for account
function useAggregateUniBalance() {
    var _a, _b, _c;
    const { account, chainId } = useActiveWeb3React();
    const uni = chainId ? UNI[chainId] : undefined;
    const uniBalance = useTokenBalance(account !== null && account !== void 0 ? account : undefined, uni);
    const uniUnclaimed = useUserUnclaimedAmount(account);
    const uniUnHarvested = useTotalUniEarned();
    if (!uni)
        return undefined;
    return CurrencyAmount.fromRawAmount(uni, JSBI.add(JSBI.add((_a = uniBalance === null || uniBalance === void 0 ? void 0 : uniBalance.quotient) !== null && _a !== void 0 ? _a : JSBI.BigInt(0), (_b = uniUnclaimed === null || uniUnclaimed === void 0 ? void 0 : uniUnclaimed.quotient) !== null && _b !== void 0 ? _b : JSBI.BigInt(0)), (_c = uniUnHarvested === null || uniUnHarvested === void 0 ? void 0 : uniUnHarvested.quotient) !== null && _c !== void 0 ? _c : JSBI.BigInt(0)));
}

function useSwapState() {
    return useAppSelector((state) => state.swap);
}
function useSwapActionHandlers() {
    const dispatch = useAppDispatch();
    const onCurrencySelection = useCallback((field, currency) => {
        dispatch(selectCurrency({
            field,
            currencyId: currency.isToken ? currency.address : currency.isNative ? 'ETH' : '',
        }));
    }, [dispatch]);
    const onSwitchTokens = useCallback(() => {
        dispatch(switchCurrencies());
    }, [dispatch]);
    const onUserInput = useCallback((field, typedValue) => {
        dispatch(typeInput({ field, typedValue }));
    }, [dispatch]);
    const onChangeRecipient = useCallback((recipient) => {
        dispatch(setRecipient({ recipient }));
    }, [dispatch]);
    return {
        onSwitchTokens,
        onCurrencySelection,
        onUserInput,
        onChangeRecipient,
    };
}
// try to parse a user entered amount for a given token
function tryParseAmount(value, currency) {
    if (!value || !currency) {
        return undefined;
    }
    try {
        const typedValueParsed = parseUnits(value, currency.decimals).toString();
        if (typedValueParsed !== '0') {
            return CurrencyAmount.fromRawAmount(currency, JSBI.BigInt(typedValueParsed));
        }
    }
    catch (error) {
        // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
        console.debug(`Failed to parse input amount: "${value}"`, error);
    }
    // necessary for all paths to return a value
    return undefined;
}
const BAD_RECIPIENT_ADDRESSES = {
    '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f': true,
    '0xf164fC0Ec4E93095b804a4795bBe1e041497b92a': true,
    '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D': true, // v2 router 02
};
/**
 * Returns true if any of the pairs or tokens in a trade have the given checksummed address
 * @param trade to check for the given address
 * @param checksummedAddress address to check in the pairs and tokens
 */
function involvesAddress(trade, checksummedAddress) {
    const path = trade instanceof Trade ? trade.route.path : trade.route.tokenPath;
    return (path.some((token) => token.address === checksummedAddress) ||
        (trade instanceof Trade
            ? trade.route.pairs.some((pair) => pair.liquidityToken.address === checksummedAddress)
            : false));
}
// from the current swap inputs, compute the best trade and return it.
function useDerivedSwapInfo(toggledVersion) {
    var _a, _b, _c;
    const { account } = useActiveWeb3React();
    const { independentField, typedValue, [Field.INPUT]: { currencyId: inputCurrencyId }, [Field.OUTPUT]: { currencyId: outputCurrencyId }, recipient, } = useSwapState();
    const inputCurrency = useCurrency(inputCurrencyId);
    const outputCurrency = useCurrency(outputCurrencyId);
    const recipientLookup = useENS(recipient !== null && recipient !== void 0 ? recipient : undefined);
    const to = (_a = (recipient === null ? account : recipientLookup.address)) !== null && _a !== void 0 ? _a : null;
    const relevantTokenBalances = useCurrencyBalances(account !== null && account !== void 0 ? account : undefined, useMemo(() => [inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined, outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : undefined], [inputCurrency, outputCurrency]));
    const isExactIn = independentField === Field.INPUT;
    const parsedAmount = useMemo(() => { var _a; return tryParseAmount(typedValue, (_a = (isExactIn ? inputCurrency : outputCurrency)) !== null && _a !== void 0 ? _a : undefined); }, [inputCurrency, isExactIn, outputCurrency, typedValue]);
    // get v2 and v3 quotes
    // skip if other version is toggled
    const v2Trade = useBestV2Trade(isExactIn ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT, toggledVersion !== Version.v3 ? parsedAmount : undefined, (_b = (isExactIn ? outputCurrency : inputCurrency)) !== null && _b !== void 0 ? _b : undefined);
    const v3Trade = useBestV3Trade(isExactIn ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT, toggledVersion !== Version.v2 ? parsedAmount : undefined, (_c = (isExactIn ? outputCurrency : inputCurrency)) !== null && _c !== void 0 ? _c : undefined);
    const isV2TradeBetter = useMemo(() => {
        try {
            // avoids comparing trades when V3Trade is not in a ready state.
            return toggledVersion === Version.v2 ||
                [V3TradeState.VALID, V3TradeState.SYNCING, V3TradeState.NO_ROUTE_FOUND].includes(v3Trade.state)
                ? isTradeBetter(v3Trade.trade, v2Trade, TWO_PERCENT)
                : undefined;
        }
        catch (e) {
            // v3 trade may be debouncing or fetching and have different
            // inputs/ouputs than v2
            return undefined;
        }
    }, [toggledVersion, v2Trade, v3Trade.state, v3Trade.trade]);
    const bestTrade = isV2TradeBetter === undefined ? undefined : isV2TradeBetter ? v2Trade : v3Trade.trade;
    const currencyBalances = {
        [Field.INPUT]: relevantTokenBalances[0],
        [Field.OUTPUT]: relevantTokenBalances[1],
    };
    const currencies = {
        [Field.INPUT]: inputCurrency,
        [Field.OUTPUT]: outputCurrency,
    };
    let inputError;
    if (!account) {
        inputError = jsx(Trans, { children: "Connect Wallet" }, void 0);
    }
    if (!parsedAmount) {
        inputError = inputError !== null && inputError !== void 0 ? inputError : jsx(Trans, { children: "Enter an amount" }, void 0);
    }
    if (!currencies[Field.INPUT] || !currencies[Field.OUTPUT]) {
        inputError = inputError !== null && inputError !== void 0 ? inputError : jsx(Trans, { children: "Select a token" }, void 0);
    }
    const formattedTo = isAddress(to);
    if (!to || !formattedTo) {
        inputError = inputError !== null && inputError !== void 0 ? inputError : jsx(Trans, { children: "Enter a recipient" }, void 0);
    }
    else {
        if (BAD_RECIPIENT_ADDRESSES[formattedTo] || (v2Trade && involvesAddress(v2Trade, formattedTo))) {
            inputError = inputError !== null && inputError !== void 0 ? inputError : jsx(Trans, { children: "Invalid recipient" }, void 0);
        }
    }
    const allowedSlippage = useSwapSlippageTolerance(bestTrade !== null && bestTrade !== void 0 ? bestTrade : undefined);
    // compare input balance to max input based on version
    const [balanceIn, amountIn] = [currencyBalances[Field.INPUT], bestTrade === null || bestTrade === void 0 ? void 0 : bestTrade.maximumAmountIn(allowedSlippage)];
    if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
        inputError = jsxs(Trans, { children: ["Insufficient ", amountIn.currency.symbol, " balance"] }, void 0);
    }
    return {
        currencies,
        currencyBalances,
        parsedAmount,
        inputError,
        v2Trade: v2Trade !== null && v2Trade !== void 0 ? v2Trade : undefined,
        v3Trade,
        bestTrade: bestTrade !== null && bestTrade !== void 0 ? bestTrade : undefined,
        allowedSlippage,
    };
}
function parseCurrencyFromURLParameter(urlParam) {
    if (typeof urlParam === 'string') {
        const valid = isAddress(urlParam);
        if (valid)
            return valid;
        if (urlParam.toUpperCase() === 'ETH')
            return 'ETH';
    }
    return '';
}
function parseTokenAmountURLParameter(urlParam) {
    return typeof urlParam === 'string' && !isNaN(parseFloat(urlParam)) ? urlParam : '';
}
function parseIndependentFieldURLParameter(urlParam) {
    return typeof urlParam === 'string' && urlParam.toLowerCase() === 'output' ? Field.OUTPUT : Field.INPUT;
}
const ENS_NAME_REGEX$1 = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)?$/;
const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
function validatedRecipient(recipient) {
    if (typeof recipient !== 'string')
        return null;
    const address = isAddress(recipient);
    if (address)
        return address;
    if (ENS_NAME_REGEX$1.test(recipient))
        return recipient;
    if (ADDRESS_REGEX.test(recipient))
        return recipient;
    return null;
}
function queryParametersToSwapState(parsedQs) {
    let inputCurrency = parseCurrencyFromURLParameter(parsedQs.inputCurrency);
    let outputCurrency = parseCurrencyFromURLParameter(parsedQs.outputCurrency);
    if (inputCurrency === '' && outputCurrency === '') {
        // default to ETH input
        inputCurrency = 'ETH';
    }
    else if (inputCurrency === outputCurrency) {
        // clear output if identical
        outputCurrency = '';
    }
    const recipient = validatedRecipient(parsedQs.recipient);
    return {
        [Field.INPUT]: {
            currencyId: inputCurrency === '' ? null : inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : null,
        },
        [Field.OUTPUT]: {
            currencyId: outputCurrency === '' ? null : outputCurrency !== null && outputCurrency !== void 0 ? outputCurrency : null,
        },
        typedValue: parseTokenAmountURLParameter(parsedQs.exactAmount),
        independentField: parseIndependentFieldURLParameter(parsedQs.exactField),
        recipient,
    };
}
// updates the swap state to use the defaults for a given network
function useDefaultsFromURLSearch() {
    const { chainId } = useActiveWeb3React();
    const dispatch = useAppDispatch();
    const parsedQs = useParsedQueryString();
    const [result, setResult] = useState();
    useEffect(() => {
        var _a, _b;
        if (!chainId)
            return;
        const parsed = queryParametersToSwapState(parsedQs);
        const inputCurrencyId = (_a = parsed[Field.INPUT].currencyId) !== null && _a !== void 0 ? _a : undefined;
        const outputCurrencyId = (_b = parsed[Field.OUTPUT].currencyId) !== null && _b !== void 0 ? _b : undefined;
        dispatch(replaceSwapState({
            typedValue: parsed.typedValue,
            field: parsed.independentField,
            inputCurrencyId,
            outputCurrencyId,
            recipient: parsed.recipient,
        }));
        setResult({ inputCurrencyId, outputCurrencyId });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, chainId]);
    return result;
}

const initialState$2 = queryParametersToSwapState(parsedQueryString());
var swap = createReducer(initialState$2, (builder) => builder
    .addCase(replaceSwapState, (state, { payload: { typedValue, recipient, field, inputCurrencyId, outputCurrencyId } }) => {
    return {
        [Field.INPUT]: {
            currencyId: inputCurrencyId !== null && inputCurrencyId !== void 0 ? inputCurrencyId : null,
        },
        [Field.OUTPUT]: {
            currencyId: outputCurrencyId !== null && outputCurrencyId !== void 0 ? outputCurrencyId : null,
        },
        independentField: field,
        typedValue,
        recipient,
    };
})
    .addCase(selectCurrency, (state, { payload: { currencyId, field } }) => {
    const otherField = field === Field.INPUT ? Field.OUTPUT : Field.INPUT;
    if (currencyId === state[otherField].currencyId) {
        // the case where we have to swap the order
        return Object.assign(Object.assign({}, state), { independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT, [field]: { currencyId }, [otherField]: { currencyId: state[field].currencyId } });
    }
    else {
        // the normal case
        return Object.assign(Object.assign({}, state), { [field]: { currencyId } });
    }
})
    .addCase(switchCurrencies, (state) => {
    return Object.assign(Object.assign({}, state), { independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT, [Field.INPUT]: { currencyId: state[Field.OUTPUT].currencyId }, [Field.OUTPUT]: { currencyId: state[Field.INPUT].currencyId } });
})
    .addCase(typeInput, (state, { payload: { field, typedValue } }) => {
    return Object.assign(Object.assign({}, state), { independentField: field, typedValue });
})
    .addCase(setRecipient, (state, { payload: { recipient } }) => {
    state.recipient = recipient;
}));

const now = () => new Date().getTime();
const initialState$1 = {};
var transactions = createReducer(initialState$1, (builder) => builder
    .addCase(updateVersion, (transactions) => {
    // in case there are any transactions in the store with the old format, remove them
    Object.keys(transactions).forEach((chainId) => {
        const chainTransactions = transactions[chainId];
        Object.keys(chainTransactions).forEach((hash) => {
            if (!('info' in chainTransactions[hash])) {
                // clear old transactions that don't have the right format
                delete chainTransactions[hash];
            }
        });
    });
})
    .addCase(addTransaction, (transactions, { payload: { chainId, from, hash, info } }) => {
    var _a, _b;
    if ((_a = transactions[chainId]) === null || _a === void 0 ? void 0 : _a[hash]) {
        throw Error('Attempted to add existing transaction.');
    }
    const txs = (_b = transactions[chainId]) !== null && _b !== void 0 ? _b : {};
    txs[hash] = { hash, info, from, addedTime: now() };
    transactions[chainId] = txs;
})
    .addCase(clearAllTransactions, (transactions, { payload: { chainId } }) => {
    if (!transactions[chainId])
        return;
    transactions[chainId] = {};
})
    .addCase(checkedTransaction, (transactions, { payload: { chainId, hash, blockNumber } }) => {
    var _a;
    const tx = (_a = transactions[chainId]) === null || _a === void 0 ? void 0 : _a[hash];
    if (!tx) {
        return;
    }
    if (!tx.lastCheckedBlockNumber) {
        tx.lastCheckedBlockNumber = blockNumber;
    }
    else {
        tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber);
    }
})
    .addCase(finalizeTransaction, (transactions, { payload: { hash, chainId, receipt } }) => {
    var _a;
    const tx = (_a = transactions[chainId]) === null || _a === void 0 ? void 0 : _a[hash];
    if (!tx) {
        return;
    }
    tx.receipt = receipt;
    tx.confirmedTime = now();
}));

const currentTimestamp = () => new Date().getTime();
function pairKey(token0Address, token1Address) {
    return `${token0Address};${token1Address}`;
}
const initialState = {
    arbitrumAlphaAcknowledged: false,
    matchesDarkMode: false,
    optimismAlphaAcknowledged: false,
    userDarkMode: null,
    userExpertMode: false,
    userLocale: null,
    userClientSideRouter: false,
    userHideClosedPositions: false,
    userSlippageTolerance: 'auto',
    userSlippageToleranceHasBeenMigratedToAuto: true,
    userDeadline: DEFAULT_DEADLINE_FROM_NOW,
    tokens: {},
    pairs: {},
    timestamp: currentTimestamp(),
    URLWarningVisible: true,
};
var user = createReducer(initialState, (builder) => builder
    .addCase(updateVersion, (state) => {
    // slippage isnt being tracked in local storage, reset to default
    // noinspection SuspiciousTypeOfGuard
    if (typeof state.userSlippageTolerance !== 'number' ||
        !Number.isInteger(state.userSlippageTolerance) ||
        state.userSlippageTolerance < 0 ||
        state.userSlippageTolerance > 5000) {
        state.userSlippageTolerance = 'auto';
    }
    else {
        if (!state.userSlippageToleranceHasBeenMigratedToAuto &&
            [10, 50, 100].indexOf(state.userSlippageTolerance) !== -1) {
            state.userSlippageTolerance = 'auto';
            state.userSlippageToleranceHasBeenMigratedToAuto = true;
        }
    }
    // deadline isnt being tracked in local storage, reset to default
    // noinspection SuspiciousTypeOfGuard
    if (typeof state.userDeadline !== 'number' ||
        !Number.isInteger(state.userDeadline) ||
        state.userDeadline < 60 ||
        state.userDeadline > 180 * 60) {
        state.userDeadline = DEFAULT_DEADLINE_FROM_NOW;
    }
    state.lastUpdateVersionTimestamp = currentTimestamp();
})
    .addCase(updateUserDarkMode, (state, action) => {
    state.userDarkMode = action.payload.userDarkMode;
    state.timestamp = currentTimestamp();
})
    .addCase(updateMatchesDarkMode, (state, action) => {
    state.matchesDarkMode = action.payload.matchesDarkMode;
    state.timestamp = currentTimestamp();
})
    .addCase(updateArbitrumAlphaAcknowledged, (state, action) => {
    state.arbitrumAlphaAcknowledged = action.payload.arbitrumAlphaAcknowledged;
})
    .addCase(updateOptimismAlphaAcknowledged, (state, action) => {
    state.optimismAlphaAcknowledged = action.payload.optimismAlphaAcknowledged;
})
    .addCase(updateUserExpertMode, (state, action) => {
    state.userExpertMode = action.payload.userExpertMode;
    state.timestamp = currentTimestamp();
})
    .addCase(updateUserLocale, (state, action) => {
    state.userLocale = action.payload.userLocale;
    state.timestamp = currentTimestamp();
})
    .addCase(updateUserSlippageTolerance, (state, action) => {
    state.userSlippageTolerance = action.payload.userSlippageTolerance;
    state.timestamp = currentTimestamp();
})
    .addCase(updateUserDeadline, (state, action) => {
    state.userDeadline = action.payload.userDeadline;
    state.timestamp = currentTimestamp();
})
    .addCase(updateUserClientSideRouter, (state, action) => {
    state.userClientSideRouter = action.payload.userClientSideRouter;
})
    .addCase(updateHideClosedPositions, (state, action) => {
    state.userHideClosedPositions = action.payload.userHideClosedPositions;
})
    .addCase(addSerializedToken, (state, { payload: { serializedToken } }) => {
    if (!state.tokens) {
        state.tokens = {};
    }
    state.tokens[serializedToken.chainId] = state.tokens[serializedToken.chainId] || {};
    state.tokens[serializedToken.chainId][serializedToken.address] = serializedToken;
    state.timestamp = currentTimestamp();
})
    .addCase(removeSerializedToken, (state, { payload: { address, chainId } }) => {
    if (!state.tokens) {
        state.tokens = {};
    }
    state.tokens[chainId] = state.tokens[chainId] || {};
    delete state.tokens[chainId][address];
    state.timestamp = currentTimestamp();
})
    .addCase(addSerializedPair, (state, { payload: { serializedPair } }) => {
    if (serializedPair.token0.chainId === serializedPair.token1.chainId &&
        serializedPair.token0.address !== serializedPair.token1.address) {
        const chainId = serializedPair.token0.chainId;
        state.pairs[chainId] = state.pairs[chainId] || {};
        state.pairs[chainId][pairKey(serializedPair.token0.address, serializedPair.token1.address)] = serializedPair;
    }
    state.timestamp = currentTimestamp();
})
    .addCase(removeSerializedPair, (state, { payload: { chainId, tokenAAddress, tokenBAddress } }) => {
    if (state.pairs[chainId]) {
        // just delete both keys if either exists
        delete state.pairs[chainId][pairKey(tokenAAddress, tokenBAddress)];
        delete state.pairs[chainId][pairKey(tokenBAddress, tokenAAddress)];
    }
    state.timestamp = currentTimestamp();
}));

const PERSISTED_KEYS = ['user', 'transactions', 'lists'];
const store = configureStore({
    reducer: {
        application,
        user,
        transactions,
        swap,
        mint,
        mintV3,
        burn,
        burnV3,
        multicall: multicall.reducer,
        lists,
        logs,
        [api$1.reducerPath]: api$1.reducer,
        [routingApi.reducerPath]: routingApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true })
        .concat(api$1.middleware)
        .concat(routingApi.middleware)
        .concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
    preloadedState: load({ states: PERSISTED_KEYS, disableWarnings: process.env.NODE_ENV === 'test' }),
});
store.dispatch(updateVersion());
setupListeners(store.dispatch);

const FallbackWrapper = styled.div `
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  z-index: 1;
`;
const BodyWrapper$2 = styled.div `
  padding: 1rem;
  width: 100%;
  white-space: ;
`;
const CodeBlockWrapper = styled.div `
  background: ${({ theme }) => theme.bg0};
  overflow: auto;
  white-space: pre;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 24px;
  padding: 18px 24px;
  color: ${({ theme }) => theme.text1};
`;
const LinkWrapper = styled.div `
  color: ${({ theme }) => theme.blue1};
  padding: 6px 24px;
`;
const SomethingWentWrongWrapper = styled.div `
  padding: 6px 24px;
`;
const IS_UNISWAP = window.location.hostname === 'app.uniswap.org';
class ErrorBoundary extends React__default.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    static getDerivedStateFromError(error) {
        return { error };
    }
    componentDidCatch(error, errorInfo) {
        ReactGA.exception(Object.assign(Object.assign(Object.assign({}, error), errorInfo), { fatal: true }));
    }
    render() {
        const { error } = this.state;
        if (error !== null) {
            const encodedBody = encodeURIComponent(issueBody(error));
            return (jsx(FallbackWrapper, { children: jsx(BodyWrapper$2, { children: jsxs(AutoColumn, Object.assign({ gap: 'md' }, { children: [jsx(SomethingWentWrongWrapper, { children: jsx(ThemedText.Label, Object.assign({ fontSize: 24, fontWeight: 600 }, { children: jsx(Trans, { children: "Something went wrong" }, void 0) }), void 0) }, void 0), jsx(CodeBlockWrapper, { children: jsx("code", { children: jsx(ThemedText.Main, Object.assign({ fontSize: 10 }, { children: error.stack }), void 0) }, void 0) }, void 0), IS_UNISWAP ? (jsxs(AutoRow, { children: [jsx(LinkWrapper, { children: jsx(ExternalLink, Object.assign({ id: "create-github-issue-link", href: `https://github.com/Uniswap/uniswap-interface/issues/new?assignees=&labels=bug&body=${encodedBody}&title=${encodeURIComponent(`Crash report: \`${error.name}${error.message && `: ${error.message}`}\``)}`, target: "_blank" }, { children: jsxs(ThemedText.Link, Object.assign({ fontSize: 16 }, { children: [jsx(Trans, { children: "Create an issue on GitHub" }, void 0), jsx("span", { children: "\u2197" }, void 0)] }), void 0) }), void 0) }, void 0), jsx(LinkWrapper, { children: jsx(ExternalLink, Object.assign({ id: "get-support-on-discord", href: "https://discord.gg/FCfyBSbCU5", target: "_blank" }, { children: jsxs(ThemedText.Link, Object.assign({ fontSize: 16 }, { children: [jsx(Trans, { children: "Get support on Discord" }, void 0), jsx("span", { children: "\u2197" }, void 0)] }), void 0) }), void 0) }, void 0)] }, void 0)) : null] }), void 0) }, void 0) }, void 0));
        }
        return this.props.children;
    }
}
function getRelevantState() {
    const path = window.location.hash;
    if (!path.startsWith('#/')) {
        return null;
    }
    const pieces = path.substring(2).split(/[/\\?]/);
    switch (pieces[0]) {
        case 'swap':
            return 'swap';
        case 'add':
            if (pieces[1] === 'v2')
                return 'mint';
            else
                return 'mintV3';
        case 'remove':
            if (pieces[1] === 'v2')
                return 'burn';
            else
                return 'burnV3';
    }
    return null;
}
function issueBody(error) {
    const relevantState = getRelevantState();
    const deviceData = userAgent;
    return `## URL
  
${window.location.href}

${relevantState
        ? `## \`${relevantState}\` state
    
\`\`\`json
${JSON.stringify(store.getState()[relevantState], null, 2)}
\`\`\`
`
        : ''}
${error.name &&
        `## Error

\`\`\`
${error.name}${error.message && `: ${error.message}`}
\`\`\`
`}
${error.stack &&
        `## Stacktrace

\`\`\`
${error.stack}
\`\`\`
`}
${deviceData &&
        `## Device data

\`\`\`json
${JSON.stringify(deviceData, null, 2)}
\`\`\`
`}
`;
}

const ContentWrapper$4 = styled(AutoColumn) `
  width: 100%;
`;
const ModalUpper$1 = styled(DataCard) `
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #ff007a 0%, #021d43 100%);
`;
const ConfirmOrLoadingWrapper = styled.div `
  width: 100%;
  padding: 24px;
  position: relative;
  background: ${({ activeBG }) => activeBG &&
    'radial-gradient(76.02% 75.41% at 1.84% 0%, rgba(255, 0, 122, 0.2) 0%, rgba(33, 114, 229, 0.2) 100%), #FFFFFF;'};
`;
const ConfirmedIcon$1 = styled(ColumnCenter) `
  padding: 60px 0;
`;
const SOCKS_AMOUNT = 1000;
const USER_AMOUNT = 400;
function ClaimModal() {
    var _a, _b, _c, _d, _e, _f, _g;
    const isOpen = useModalOpen(ApplicationModal.SELF_CLAIM);
    const toggleClaimModal = useToggleSelfClaimModal();
    const { account, chainId } = useActiveWeb3React();
    // used for UI loading states
    const [attempting, setAttempting] = useState(false);
    // get user claim data
    const userClaimData = useUserClaimData(account);
    // monitor the status of the claim from contracts and txns
    const { claimCallback } = useClaimCallback(account);
    const unclaimedAmount = useUserUnclaimedAmount(account);
    const { claimSubmitted, claimTxn } = useUserHasSubmittedClaim(account !== null && account !== void 0 ? account : undefined);
    const claimConfirmed = Boolean(claimTxn === null || claimTxn === void 0 ? void 0 : claimTxn.receipt);
    function onClaim() {
        setAttempting(true);
        claimCallback()
            // reset modal and log error
            .catch((error) => {
            setAttempting(false);
            console.log(error);
        });
    }
    // once confirmed txn is found, if modal is closed open, mark as not attempting regradless
    useEffect(() => {
        if (claimConfirmed && claimSubmitted && attempting) {
            setAttempting(false);
            if (!isOpen) {
                toggleClaimModal();
            }
        }
    }, [attempting, claimConfirmed, claimSubmitted, isOpen, toggleClaimModal]);
    const nonLPAmount = JSBI.multiply(JSBI.BigInt((((_a = userClaimData === null || userClaimData === void 0 ? void 0 : userClaimData.flags) === null || _a === void 0 ? void 0 : _a.isSOCKS) ? SOCKS_AMOUNT : 0) + (((_b = userClaimData === null || userClaimData === void 0 ? void 0 : userClaimData.flags) === null || _b === void 0 ? void 0 : _b.isUser) ? USER_AMOUNT : 0)), JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18)));
    return (jsxs(Modal, Object.assign({ isOpen: isOpen, onDismiss: toggleClaimModal, maxHeight: 90 }, { children: [jsx(Confetti, { start: Boolean(isOpen && claimConfirmed) }, void 0), !attempting && !claimConfirmed && (jsxs(ContentWrapper$4, Object.assign({ gap: "lg" }, { children: [jsxs(ModalUpper$1, { children: [jsx(CardBGImage, {}, void 0), jsx(CardNoise, {}, void 0), jsxs(CardSection, Object.assign({ gap: "md" }, { children: [jsxs(RowBetween, { children: [jsx(ThemedText.White, Object.assign({ fontWeight: 500 }, { children: jsx(Trans, { children: "Claim UNI" }, void 0) }), void 0), jsx(CloseIcon$3, { onClick: toggleClaimModal, style: { zIndex: 99 }, color: "white" }, void 0)] }, void 0), jsx(ThemedText.White, Object.assign({ fontWeight: 700, fontSize: 36 }, { children: jsxs(Trans, { children: [unclaimedAmount === null || unclaimedAmount === void 0 ? void 0 : unclaimedAmount.toFixed(0, (_c = { groupSeparator: ',' }) !== null && _c !== void 0 ? _c : '-'), " UNI"] }, void 0) }), void 0)] }), void 0), jsx(Break$1, {}, void 0), jsxs(CardSection, Object.assign({ gap: "sm" }, { children: [((_d = userClaimData === null || userClaimData === void 0 ? void 0 : userClaimData.flags) === null || _d === void 0 ? void 0 : _d.isSOCKS) && (jsxs(RowBetween, { children: [jsx(ThemedText.SubHeader, Object.assign({ color: "white" }, { children: "SOCKS" }), void 0), jsx(ThemedText.SubHeader, Object.assign({ color: "white" }, { children: jsxs(Trans, { children: [SOCKS_AMOUNT, " UNI"] }, void 0) }), void 0)] }, void 0)), ((_e = userClaimData === null || userClaimData === void 0 ? void 0 : userClaimData.flags) === null || _e === void 0 ? void 0 : _e.isLP) &&
                                        unclaimedAmount &&
                                        JSBI.greaterThanOrEqual(unclaimedAmount.quotient, nonLPAmount) && (jsxs(RowBetween, { children: [jsx(ThemedText.SubHeader, Object.assign({ color: "white" }, { children: jsx(Trans, { children: "Liquidity" }, void 0) }), void 0), jsx(ThemedText.SubHeader, Object.assign({ color: "white" }, { children: jsxs(Trans, { children: [unclaimedAmount
                                                            .subtract(CurrencyAmount.fromRawAmount(unclaimedAmount.currency, nonLPAmount))
                                                            .toFixed(0, { groupSeparator: ',' }), ' ', "UNI"] }, void 0) }), void 0)] }, void 0)), ((_f = userClaimData === null || userClaimData === void 0 ? void 0 : userClaimData.flags) === null || _f === void 0 ? void 0 : _f.isUser) && (jsxs(RowBetween, { children: [jsx(ThemedText.SubHeader, Object.assign({ color: "white" }, { children: jsx(Trans, { children: "User" }, void 0) }), void 0), jsx(ThemedText.SubHeader, Object.assign({ color: "white" }, { children: jsxs(Trans, { children: [USER_AMOUNT, " UNI"] }, void 0) }), void 0)] }, void 0))] }), void 0)] }, void 0), jsxs(AutoColumn, Object.assign({ gap: "md", style: { padding: '1rem', paddingTop: '0' }, justify: "center" }, { children: [jsx(ThemedText.SubHeader, Object.assign({ fontWeight: 500 }, { children: jsxs(Trans, { children: ["As a member of the Uniswap community you may claim UNI to be used for voting and governance.", jsx("br", {}, void 0), jsx("br", {}, void 0), jsx(ExternalLink, Object.assign({ href: "https://uniswap.org/blog/uni" }, { children: "Read more about UNI" }), void 0)] }, void 0) }), void 0), jsx(ButtonPrimary, Object.assign({ disabled: !isAddress$1(account !== null && account !== void 0 ? account : ''), padding: "16px 16px", width: "100%", "$borderRadius": "12px", mt: "1rem", onClick: onClaim }, { children: jsx(Trans, { children: "Claim UNI" }, void 0) }), void 0)] }), void 0)] }), void 0)), (attempting || claimConfirmed) && (jsxs(ConfirmOrLoadingWrapper, Object.assign({ activeBG: true }, { children: [jsx(CardNoise, {}, void 0), jsx(CardBGImageSmaller, { desaturate: true }, void 0), jsxs(RowBetween, { children: [jsx("div", {}, void 0), jsx(CloseIcon$3, { onClick: toggleClaimModal, style: { zIndex: 99 }, stroke: "black" }, void 0)] }, void 0), jsx(ConfirmedIcon$1, { children: !claimConfirmed ? (jsx(CustomLightSpinner, { src: Circle$1, alt: "loader", size: '90px' }, void 0)) : (jsx(UniTokenAnimated, { width: "72px", src: tokenLogo, alt: "UNI" }, void 0)) }, void 0), jsxs(AutoColumn, Object.assign({ gap: "100px", justify: 'center' }, { children: [jsxs(AutoColumn, Object.assign({ gap: "12px", justify: 'center' }, { children: [jsx(ThemedText.LargeHeader, Object.assign({ fontWeight: 600, color: "black" }, { children: claimConfirmed ? jsx(Trans, { children: "Claimed!" }, void 0) : jsx(Trans, { children: "Claiming" }, void 0) }), void 0), !claimConfirmed && (jsx(Text$1, Object.assign({ fontSize: 36, color: '#ff007a', fontWeight: 800 }, { children: jsxs(Trans, { children: [unclaimedAmount === null || unclaimedAmount === void 0 ? void 0 : unclaimedAmount.toFixed(0, (_g = { groupSeparator: ',' }) !== null && _g !== void 0 ? _g : '-'), " UNI"] }, void 0) }), void 0))] }), void 0), claimConfirmed && (jsx(Fragment, { children: jsx(ThemedText.SubHeader, Object.assign({ fontWeight: 500, color: "black" }, { children: jsxs(Trans, { children: [jsxs("span", Object.assign({ role: "img", "aria-label": "party-hat" }, { children: ["\uD83C\uDF89", ' '] }), void 0), "Welcome to team Unicorn :)", ' ', jsx("span", Object.assign({ role: "img", "aria-label": "party-hat" }, { children: "\uD83C\uDF89" }), void 0)] }, void 0) }), void 0) }, void 0)), attempting && !claimSubmitted && (jsx(ThemedText.SubHeader, Object.assign({ color: "black" }, { children: jsx(Trans, { children: "Confirm this transaction in your wallet" }, void 0) }), void 0)), attempting && claimSubmitted && !claimConfirmed && chainId && (claimTxn === null || claimTxn === void 0 ? void 0 : claimTxn.hash) && (jsx(ExternalLink, Object.assign({ href: getExplorerLink(chainId, claimTxn === null || claimTxn === void 0 ? void 0 : claimTxn.hash, ExplorerDataType.TRANSACTION), style: { zIndex: 99 } }, { children: jsx(Trans, { children: "View transaction on Explorer" }, void 0) }), void 0))] }), void 0)] }), void 0))] }), void 0));
}

const Card = styled(Box) `
  width: ${({ width }) => width !== null && width !== void 0 ? width : '100%'};
  padding: ${({ padding }) => padding !== null && padding !== void 0 ? padding : '1rem'};
  border-radius: ${({ $borderRadius }) => $borderRadius !== null && $borderRadius !== void 0 ? $borderRadius : '16px'};
  border: ${({ border }) => border};
`;
const LightCard = styled(Card) `
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`;
const LightGreyCard = styled(Card) `
  background-color: ${({ theme }) => theme.bg2};
`;
const GreyCard = styled(Card) `
  background-color: ${({ theme }) => theme.bg3};
`;
const DarkGreyCard = styled(Card) `
  background-color: ${({ theme }) => theme.bg2};
`;
styled(Card) `
  background-color: ${({ theme }) => theme.bg0};
`;
const OutlineCard = styled(Card) `
  border: 1px solid ${({ theme }) => theme.bg3};
`;
styled(Card) `
  background-color: rgba(243, 132, 30, 0.05);
  color: ${({ theme }) => theme.yellow3};
  font-weight: 500;
`;
styled(Card) `
  background-color: ${({ theme }) => theme.primary5};
  color: ${({ theme }) => theme.blue2};
  border-radius: 12px;
`;

const Wrapper$e = styled.div `
  max-height: 70vh;
  overflow: auto;
  padding: 0 1rem;
`;
const StyledExternalCard = styled(Card) `
  background-color: ${({ theme }) => theme.primary5};
  padding: 0.5rem;
  width: 100%;

  :hover,
  :focus,
  :active {
    background-color: ${({ theme }) => theme.primary4};
  }
`;
const HoverText$1 = styled.div `
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  display: flex;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`;
const StyledLinkOut = styled(ArrowDown) `
  transform: rotate(230deg);
`;
const EXTERNAL_APIS = [
    {
        name: 'Auto Router',
        description: jsx(Trans, { children: "The app fetches the optimal trade route from a Uniswap Labs server." }, void 0),
    },
    {
        name: 'Infura',
        description: jsx(Trans, { children: "The app fetches on-chain data and constructs contract calls with an Infura API." }, void 0),
    },
    {
        name: 'TRM Labs',
        description: (jsxs(Fragment, { children: [jsx(Trans, { children: "The app securely collects your wallet address and shares it with TRM Labs Inc. for risk and compliance reasons." }, void 0), ' ', jsx(ExternalLink, Object.assign({ href: "https://help.uniswap.org/en/articles/5675203-terms-of-service-faq" }, { children: jsx(Trans, { children: "Learn more" }, void 0) }), void 0)] }, void 0)),
    },
    {
        name: 'Google Analytics',
        description: jsx(Trans, { children: "The app logs anonymized usage statistics in order to improve over time." }, void 0),
    },
    {
        name: 'The Graph',
        description: jsx(Trans, { children: "The app fetches blockchain data from The Graph\u2019s hosted service." }, void 0),
    },
];
function PrivacyPolicyModal() {
    const node = useRef();
    const open = useModalOpen(ApplicationModal.PRIVACY_POLICY);
    const toggle = useTogglePrivacyPolicy();
    useEffect(() => {
        if (!open)
            return;
        ReactGA.event({
            category: 'Modal',
            action: 'Show Legal',
        });
    }, [open]);
    return (jsx(Modal, Object.assign({ isOpen: open, onDismiss: () => toggle() }, { children: jsxs(AutoColumn, Object.assign({ gap: "12px", ref: node }, { children: [jsxs(RowBetween, Object.assign({ padding: "1rem 1rem 0.5rem 1rem" }, { children: [jsx(ThemedText.MediumHeader, { children: jsx(Trans, { children: "Legal & Privacy" }, void 0) }, void 0), jsx(HoverText$1, Object.assign({ onClick: () => toggle() }, { children: jsx(X, { size: 24 }, void 0) }), void 0)] }), void 0), jsx(PrivacyPolicy, {}, void 0)] }), void 0) }), void 0));
}
function PrivacyPolicy() {
    return (jsx(Wrapper$e, Object.assign({ draggable: "true", onTouchMove: (e) => {
            // prevent modal gesture handler from dismissing modal when content is scrolling
            if (isMobile) {
                e.stopPropagation();
            }
        } }, { children: jsxs(AutoColumn, Object.assign({ gap: "16px" }, { children: [jsxs(AutoColumn, Object.assign({ gap: "8px", style: { width: '100%' } }, { children: [jsx(StyledExternalCard, { children: jsx(ExternalLink, Object.assign({ href: 'https://uniswap.org/terms-of-service' }, { children: jsxs(RowBetween, { children: [jsxs(AutoRow, Object.assign({ gap: "4px" }, { children: [jsx(Info, { size: 20 }, void 0), jsx(ThemedText.Main, Object.assign({ fontSize: 14, color: 'primaryText1' }, { children: jsx(Trans, { children: "Uniswap Labs' Terms of Service" }, void 0) }), void 0)] }), void 0), jsx(StyledLinkOut, { size: 20 }, void 0)] }, void 0) }), void 0) }, void 0), jsx(StyledExternalCard, { children: jsx(ExternalLink, Object.assign({ href: 'https://uniswap.org/disclaimer/' }, { children: jsxs(RowBetween, { children: [jsxs(AutoRow, Object.assign({ gap: "4px" }, { children: [jsx(Info, { size: 20 }, void 0), jsx(ThemedText.Main, Object.assign({ fontSize: 14, color: 'primaryText1' }, { children: jsx(Trans, { children: "Protocol Disclaimer" }, void 0) }), void 0)] }), void 0), jsx(StyledLinkOut, { size: 20 }, void 0)] }, void 0) }), void 0) }, void 0)] }), void 0), jsx(ThemedText.Main, Object.assign({ fontSize: 14 }, { children: jsx(Trans, { children: "This app uses the following third-party APIs:" }, void 0) }), void 0), jsxs(AutoColumn, Object.assign({ gap: "12px" }, { children: [EXTERNAL_APIS.map(({ name, description }, i) => (jsx(DarkGreyCard, { children: jsxs(AutoColumn, Object.assign({ gap: "8px" }, { children: [jsxs(AutoRow, Object.assign({ gap: "4px" }, { children: [jsx(Info, { size: 18 }, void 0), jsx(ThemedText.Main, Object.assign({ fontSize: 14, color: 'text1' }, { children: name }), void 0)] }), void 0), jsx(ThemedText.Main, Object.assign({ fontSize: 14 }, { children: description }), void 0)] }), void 0) }, i))), jsx(Row, Object.assign({ justify: "center", marginBottom: "1rem" }, { children: jsx(ExternalLink, Object.assign({ href: "https://help.uniswap.org/en/articles/5675203-terms-of-service-faq" }, { children: jsx(Trans, { children: "Learn more" }, void 0) }), void 0) }), void 0)] }), void 0)] }), void 0) }), void 0));
}

/*eslint-disable*/

var enUS={messages:{"$-":"$-","$<0/>":"$<0/>","${0}":["$",["0"]],"(${0})":["($",["0"],")"],"(View on Explorer)":"(View on Explorer)","(clear all)":"(clear all)","(edit)":"(edit)","- Remove recipient":"- Remove recipient","0 UNI / week":"0 UNI / week","25%":"25%","50%":"50%","75%":"75%","<0/> All Proposals":"<0/> All Proposals","<0/> Votes":"<0/> Votes","<0>Account analytics and accrued fees</0><1> ↗ </1>":"<0>Account analytics and accrued fees</0><1> ↗ </1>","<0>Current Price:</0><1><2/></1><3>{0} per {1}</3>":["<0>Current Price:</0><1><2/></1><3>",["0"]," per ",["1"],"</3>"],"<0>Tip:</0> Removing pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.":"<0>Tip:</0> Removing pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.","<0>Tip:</0> Select an action and describe your proposal for the community. The proposal cannot be modified after submission, so please verify all information before submitting. The voting period will begin immediately and last for 7 days. To propose a custom action, <1>read the docs</1>.":"<0>Tip:</0> Select an action and describe your proposal for the community. The proposal cannot be modified after submission, so please verify all information before submitting. The voting period will begin immediately and last for 7 days. To propose a custom action, <1>read the docs</1>.","<0>Tip:</0> Use this tool to find v2 pools that don't automatically appear in the interface.":"<0>Tip:</0> Use this tool to find v2 pools that don't automatically appear in the interface.","<0>Tip:</0> When you add liquidity, you will receive pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.":"<0>Tip:</0> When you add liquidity, you will receive pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.","<0>Unlock voting</0> to prepare for the next proposal.":"<0>Unlock voting</0> to prepare for the next proposal.","<0>🎉 </0>Welcome to team Unicorn :) <1>🎉</1>":"<0>🎉 </0>Welcome to team Unicorn :) <1>🎉</1>","A minimum threshold of 0.25% of the total UNI supply is required to submit proposals":"A minimum threshold of 0.25% of the total UNI supply is required to submit proposals","About":"About","Accept":"Accept","Account":"Account","Active":"Active","Add":"Add","Add <0/> and <1/> to Uniswap V2":"Add <0/> and <1/> to Uniswap V2","Add Delegate +":"Add Delegate +","Add Liquidity":"Add Liquidity","Add V2 Liquidity":"Add V2 Liquidity","Add liquidity.":"Add liquidity.","Add more liquidity":"Add more liquidity","Add {0} to Metamask <0/>":["Add ",["0"]," to Metamask <0/>"],"Add {0}-{1} liquidity":["Add ",["0"],"-",["1"]," liquidity"],"Add {0}/{1} V3 liquidity":["Add ",["0"],"/",["1"]," V3 liquidity"],"Added {0}":["Added ",["0"]],"Address has no available claim":"Address has no available claim","Against":"Against","Allow LP token migration":"Allow LP token migration","Allow high price impact trades and skip the confirm screen. Use at your own risk.":"Allow high price impact trades and skip the confirm screen. Use at your own risk.","Allow the Uniswap Protocol to use your {0}":["Allow the Uniswap Protocol to use your ",["0"]],"Allowed":"Allowed","Amount":"Amount","An error occurred when trying to execute this swap. You may need to increase your slippage tolerance. If that does not work, there may be an incompatibility with the token you are trading. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3.":"An error occurred when trying to execute this swap. You may need to increase your slippage tolerance. If that does not work, there may be an incompatibility with the token you are trading. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3.","Approval pending <0/>":"Approval pending <0/>","Approve":"Approve","Approve Token":"Approve Token","Approve {0}":["Approve ",["0"]],"Approve {0} first":["Approve ",["0"]," first"],"Approved":"Approved","Approving":"Approving","Approving {0}":["Approving ",["0"]],"Arbiscan":"Arbiscan","Arbitrum Bridge":"Arbitrum Bridge","Arbitrum is in Beta and may experience downtime. During downtime, your position will not earn fees and you will be unable to remove liquidity. <0>Read more.</0>":"Arbitrum is in Beta and may experience downtime. During downtime, your position will not earn fees and you will be unable to remove liquidity. <0>Read more.</0>","Are you sure?":"Are you sure?","As a member of the Uniswap community you may claim UNI to be used for voting and governance.<0/><1/><2>Read more about UNI</2>":"As a member of the Uniswap community you may claim UNI to be used for voting and governance.<0/><1/><2>Read more about UNI</2>","At least {0} {1} and {2} {3} will be refunded to your wallet due to selected price range.":["At least ",["0"]," ",["1"]," and ",["2"]," ",["3"]," will be refunded to your wallet due to selected price range."],"Auto":"Auto","Auto Router API":"Auto Router API","Available to deposit: {0}":["Available to deposit: ",["0"]],"Balance: {0}":["Balance: ",["0"]],"Best for exotic pairs.":"Best for exotic pairs.","Best for most pairs.":"Best for most pairs.","Best for stable pairs.":"Best for stable pairs.","Best for very stable pairs.":"Best for very stable pairs.","Best price route costs ~{formattedGasPriceString} in gas.":["Best price route costs ~",["formattedGasPriceString"]," in gas."],"Blocked address":"Blocked address","Bridge":"Bridge","By adding liquidity you'll earn 0.3% of all trades on this pair proportional to your share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.":"By adding liquidity you'll earn 0.3% of all trades on this pair proportional to your share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.","By adding this list you are implicitly trusting that the data is correct. Anyone can create a list, including creating fake versions of existing lists and lists that claim to represent projects that do not have one.":"By adding this list you are implicitly trusting that the data is correct. Anyone can create a list, including creating fake versions of existing lists and lists that claim to represent projects that do not have one.","By connecting a wallet, you agree to Uniswap Labs’ <0>Terms of Service</0> and acknowledge that you have read and understand the Uniswap <1>Protocol Disclaimer</1>.":"By connecting a wallet, you agree to Uniswap Labs’ <0>Terms of Service</0> and acknowledge that you have read and understand the Uniswap <1>Protocol Disclaimer</1>.","Canceled":"Canceled","Change":"Change","Charts":"Charts","Check network status":"Check network status","Check out our v3 LP walkthrough and migration guides.":"Check out our v3 LP walkthrough and migration guides.","Claim":"Claim","Claim <0/> for {0}":["Claim <0/> for ",["0"]],"Claim UNI":"Claim UNI","Claim UNI Token":"Claim UNI Token","Claim UNI reward for {0}":["Claim UNI reward for ",["0"]],"Claim fees":"Claim fees","Claim your UNI tokens":"Claim your UNI tokens","Claimed":"Claimed","Claimed UNI!":"Claimed UNI!","Claimed!":"Claimed!","Claiming":"Claiming","Claiming UNI":"Claiming UNI","Claiming {0} UNI":["Claiming ",["0"]," UNI"],"Clear All":"Clear All","Clear all":"Clear all","Close":"Close","Closed":"Closed","Collect":"Collect","Collect as WETH":"Collect as WETH","Collect fees":"Collect fees","Collect {0}/{1} fees":["Collect ",["0"],"/",["1"]," fees"],"Collected":"Collected","Collecting":"Collecting","Collecting fees":"Collecting fees","Collecting fees will withdraw currently available fees for you.":"Collecting fees will withdraw currently available fees for you.","Confirm":"Confirm","Confirm Supply":"Confirm Supply","Confirm Swap":"Confirm Swap","Confirm swap":"Confirm swap","Confirm this transaction in your wallet":"Confirm this transaction in your wallet","Confirm transaction in wallet":"Confirm transaction in wallet","Connect Wallet":"Connect Wallet","Connect a wallet":"Connect a wallet","Connect to a wallet to find pools":"Connect to a wallet to find pools","Connect to a wallet to view your V2 liquidity.":"Connect to a wallet to view your V2 liquidity.","Connect to a wallet to view your liquidity.":"Connect to a wallet to view your liquidity.","Connect wallet to swap":"Connect wallet to swap","Connected with {name}":["Connected with ",["name"]],"Copied":"Copied","Copy Address":"Copy Address","Create Pool & Supply":"Create Pool & Supply","Create Proposal":"Create Proposal","Create a pair":"Create a pair","Create a pool":"Create a pool","Create an issue on GitHub":"Create an issue on GitHub","Create pool and add {0}/{1} V3 liquidity":["Create pool and add ",["0"],"/",["1"]," V3 liquidity"],"Create pool.":"Create pool.","Create {0}/{1} V3 pool":["Create ",["0"],"/",["1"]," V3 pool"],"Current price":"Current price","Current {0} Price:":["Current ",["0"]," Price:"],"Custom":"Custom","Dark Theme":"Dark Theme","Defeated":"Defeated","Delegate Votes":"Delegate Votes","Delegate voting power to {0}":["Delegate voting power to ",["0"]],"Delegated to:":"Delegated to:","Delegating votes":"Delegating votes","Deposit":"Deposit","Deposit Amounts":"Deposit Amounts","Deposit UNI-V2 LP Tokens":"Deposit UNI-V2 LP Tokens","Deposit liquidity":"Deposit liquidity","Deposit tokens to the {label} network.":["Deposit tokens to the ",["label"]," network."],"Deposit your Liquidity Provider tokens to receive UNI, the Uniswap protocol governance token.":"Deposit your Liquidity Provider tokens to receive UNI, the Uniswap protocol governance token.","Deposited liquidity:":"Deposited liquidity:","Deposited {0} UNI-V2":["Deposited ",["0"]," UNI-V2"],"Depositing Liquidity":"Depositing Liquidity","Description":"Description","Detailed":"Detailed","Details":"Details","Disconnect":"Disconnect","Discord":"Discord","Dismiss":"Dismiss","Docs":"Docs","Don’t see one of your v2 positions? <0>Import it.</0>":"Don’t see one of your v2 positions? <0>Import it.</0>","Earned UNI tokens represent voting shares in Uniswap governance.":"Earned UNI tokens represent voting shares in Uniswap governance.","Edit":"Edit","Efficiency Comparison":"Efficiency Comparison","Enter a percent":"Enter a percent","Enter a recipient":"Enter a recipient","Enter a valid slippage percentage":"Enter a valid slippage percentage","Enter an address to trigger a UNI claim. If the address has any claimable UNI it will be sent to them on submission.":"Enter an address to trigger a UNI claim. If the address has any claimable UNI it will be sent to them on submission.","Enter an amount":"Enter an amount","Enter valid list location":"Enter valid list location","Enter valid token address":"Enter valid token address","Enter {0} amount":["Enter ",["0"]," amount"],"Error":"Error","Error connecting":"Error connecting","Error connecting. Try refreshing the page.":"Error connecting. Try refreshing the page.","Error details":"Error details","Error importing list":"Error importing list","Estimate may differ due to your wallet gas settings":"Estimate may differ due to your wallet gas settings","Estimated network fee":"Estimated network fee","Etherscan":"Etherscan","Executed":"Executed","Expanded results from inactive Token Lists":"Expanded results from inactive Token Lists","Expected Output":"Expected Output","Expert Mode":"Expert Mode","Expert mode turns off the confirm transaction prompt and allows high slippage trades that often result in bad rates and lost funds.":"Expert mode turns off the confirm transaction prompt and allows high slippage trades that often result in bad rates and lost funds.","Expired":"Expired","Explore Uniswap Analytics.":"Explore Uniswap Analytics.","Failed to switch networks from the Uniswap Interface. In order to use Uniswap on {0}, you must change the network in your wallet.":["Failed to switch networks from the Uniswap Interface. In order to use Uniswap on ",["0"],", you must change the network in your wallet."],"Fee Tier":"Fee Tier","Fee tier":"Fee tier","Fetching best price...":"Fetching best price...","Fetching best price…":"Fetching best price…","For":"For","For each pool shown below, click migrate to remove your liquidity from Uniswap V2 and deposit it into Uniswap V3.":"For each pool shown below, click migrate to remove your liquidity from Uniswap V2 and deposit it into Uniswap V3.","From":"From","From (at most)":"From (at most)","Full Range":"Full Range","Full range positions may earn less fees than concentrated positions. Learn more <0>here</0>.":"Full range positions may earn less fees than concentrated positions. Learn more <0>here</0>.","Get support on Discord":"Get support on Discord","Help Center":"Help Center","Hide":"Hide","Hide closed positions":"Hide closed positions","High Price Impact":"High Price Impact","How this app uses APIs":"How this app uses APIs","I understand":"I understand","If you purchase a token from this list, you may not be able to sell it back.":"If you purchase a token from this list, you may not be able to sell it back.","Import":"Import","Import List":"Import List","Import Pool":"Import Pool","Import V2 Pool":"Import V2 Pool","Import at your own risk":"Import at your own risk","In range":"In range","Increase Liquidity":"Increase Liquidity","Initial prices and pool share":"Initial prices and pool share","Initializing...":"Initializing...","Input is estimated. You will sell at most <0>{0} {1}</0> or the transaction will revert.":["Input is estimated. You will sell at most <0>",["0"]," ",["1"],"</0> or the transaction will revert."],"Install Metamask":"Install Metamask","Insufficient liquidity for this trade.":"Insufficient liquidity for this trade.","Insufficient {0}":["Insufficient ",["0"]],"Insufficient {0} balance":["Insufficient ",["0"]," balance"],"Interface Settings":"Interface Settings","Invalid pair":"Invalid pair","Invalid pair.":"Invalid pair.","Invalid price input":"Invalid price input","Invalid range selected. The min price must be lower than the max price.":"Invalid range selected. The min price must be lower than the max price.","Invalid recipient":"Invalid recipient","Language":"Language","Learn":"Learn","Learn about providing liquidity":"Learn about providing liquidity","Learn more":"Learn more","Legal & Privacy":"Legal & Privacy","Light Theme":"Light Theme","Liquidity":"Liquidity","Liquidity data not available.":"Liquidity data not available.","Liquidity provider rewards":"Liquidity provider rewards","Liquidity providers earn a 0.3% fee on all trades proportional to their share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.":"Liquidity providers earn a 0.3% fee on all trades proportional to their share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.","Lists":"Lists","Loaded":"Loaded","Loading":"Loading","MAX":"MAX","Manage":"Manage","Manage Liquidity in Rewards Pool":"Manage Liquidity in Rewards Pool","Manage Token Lists":"Manage Token Lists","Manage this pool.":"Manage this pool.","Max":"Max","Max Price":"Max Price","Max price":"Max price","Max slippage":"Max slippage","Max:":"Max:","Maximum sent":"Maximum sent","Menu":"Menu","Migrate":"Migrate","Migrate Liquidity to V3":"Migrate Liquidity to V3","Migrate V2 Liquidity":"Migrate V2 Liquidity","Migrate your liquidity tokens from Uniswap V2 to Uniswap V3.":"Migrate your liquidity tokens from Uniswap V2 to Uniswap V3.","Migrate {0}/{1} liquidity to V3":["Migrate ",["0"],"/",["1"]," liquidity to V3"],"Migrating":"Migrating","Min Price":"Min Price","Min price":"Min price","Min:":"Min:","Minimum received":"Minimum received","Missing dependencies":"Missing dependencies","Mock Toggle":"Mock Toggle","More":"More","Network Fee":"Network Fee","Network Warning":"Network Warning","Network fees exceed 50% of the swap amount!":"Network fees exceed 50% of the swap amount!","New Position":"New Position","No V2 Liquidity found.":"No V2 Liquidity found.","No active pools":"No active pools","No data":"No data","No description.":"No description.","No liquidity found.":"No liquidity found.","No pool found.":"No pool found.","No proposals found.":"No proposals found.","No results found.":"No results found.","Not created":"Not created","OFF":"OFF","ON":"ON","ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING.":"ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING.","Off":"Off","On":"On","Once you are happy with the rate click supply to review.":"Once you are happy with the rate click supply to review.","Only UNI votes that were self delegated or delegated to another address before block {0} are eligible for voting.":["Only UNI votes that were self delegated or delegated to another address before block ",["0"]," are eligible for voting."],"Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device.":"Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device.","Optimism Gateway":"Optimism Gateway","Optimism is in Beta and may experience downtime. Optimism expects planned downtime to upgrade the network in the near future. During downtime, your position will not earn fees and you will be unable to remove liquidity. <0>Read more.</0>":"Optimism is in Beta and may experience downtime. Optimism expects planned downtime to upgrade the network in the near future. During downtime, your position will not earn fees and you will be unable to remove liquidity. <0>Read more.</0>","Optimistic Etherscan":"Optimistic Etherscan","Out of range":"Out of range","Output is estimated.":"Output is estimated.","Output is estimated. If the price changes by more than {0}% your transaction will revert.":["Output is estimated. If the price changes by more than ",["0"],"% your transaction will revert."],"Output is estimated. You will receive at least <0>{0} {1}</0> or the transaction will revert.":["Output is estimated. You will receive at least <0>",["0"]," ",["1"],"</0> or the transaction will revert."],"Output will be sent to <0>{0}</0>":["Output will be sent to <0>",["0"],"</0>"],"Owner":"Owner","Participating pools":"Participating pools","Pending":"Pending","Please confirm you would like to remove this list by typing REMOVE":"Please confirm you would like to remove this list by typing REMOVE","Please connect to Layer 1 Ethereum":"Please connect to Layer 1 Ethereum","Please connect to a supported network in the dropdown menu or in your wallet.":"Please connect to a supported network in the dropdown menu or in your wallet.","Please connect to the appropriate Ethereum network.":"Please connect to the appropriate Ethereum network.","Please type the word \"{confirmWord}\" to enable expert mode.":["Please type the word \"",["confirmWord"],"\" to enable expert mode."],"Polygon Bridge":"Polygon Bridge","Polygonscan":"Polygonscan","Pool":"Pool","Pool Found!":"Pool Found!","Pool Rate":"Pool Rate","Pool rate":"Pool rate","Pool tokens in rewards pool:":"Pool tokens in rewards pool:","Pooled {0}:":["Pooled ",["0"],":"],"Pools Overview":"Pools Overview","Powered by the Uniswap protocol":"Powered by the Uniswap protocol","Preview":"Preview","Price":"Price","Price Difference:":"Price Difference:","Price Impact":"Price Impact","Price Impact Too High":"Price Impact Too High","Price Updated":"Price Updated","Price impact":"Price impact","Price range":"Price range","Price updated":"Price updated","Price:":"Price:","Prices and pool share":"Prices and pool share","Proposal":"Proposal","Proposal Submitted":"Proposal Submitted","Proposal Title":"Proposal Title","Proposals":"Proposals","Proposals submitted by community members will appear here.":"Proposals submitted by community members will appear here.","Proposed Action":"Proposed Action","Proposer":"Proposer","Protocol Disclaimer":"Protocol Disclaimer","Queued":"Queued","Rates":"Rates","Read more about UNI":"Read more about UNI","Read more about Uniswap governance":"Read more about Uniswap governance","Read more about providing liquidity":"Read more about providing liquidity","Read more about unsupported assets":"Read more about unsupported assets","Recent Transactions":"Recent Transactions","Recent transactions":"Recent transactions","Recipient":"Recipient","Reload the page":"Reload the page","Remove":"Remove","Remove <0/> and <1/>":"Remove <0/> and <1/>","Remove Amount":"Remove Amount","Remove Delegate":"Remove Delegate","Remove Liquidity":"Remove Liquidity","Remove list":"Remove list","Removing {0} {1} and {2} {3}":["Removing ",["0"]," ",["1"]," and ",["2"]," ",["3"]],"Removing {0} {1} and{2} {3}":["Removing ",["0"]," ",["1"]," and",["2"]," ",["3"]],"Request Features":"Request Features","Reset":"Reset","Return":"Return","Review swap":"Review swap","Search by token name or address":"Search by token name or address","Search name or paste address":"Search name or paste address","Select Pair":"Select Pair","Select a network":"Select a network","Select a token":"Select a token","Select a token to find your v2 liquidity.":"Select a token to find your v2 liquidity.","Select an action":"Select an action","Selected Range":"Selected Range","Self":"Self","Self Delegate":"Self Delegate","Set Price Range":"Set Price Range","Set Starting Price":"Set Starting Price","Settings":"Settings","Share of Pool":"Share of Pool","Share of Pool:":"Share of Pool:","Show Portis":"Show Portis","Show closed positions":"Show closed positions","Simple":"Simple","Slippage tolerance":"Slippage tolerance","Some assets are not available through this interface because they may not work well with the smart contracts or we are unable to allow trading for legal reasons.":"Some assets are not available through this interface because they may not work well with the smart contracts or we are unable to allow trading for legal reasons.","Something went wrong":"Something went wrong","Something went wrong.":"Something went wrong.","Step 1. Get UNI-V2 Liquidity tokens":"Step 1. Get UNI-V2 Liquidity tokens","Submit new proposal":"Submit new proposal","Submitting Proposal":"Submitting Proposal","Submitting Vote":"Submitting Vote","Succeeded":"Succeeded","Success":"Success","Supply":"Supply","Supplying {0} {1} and {2} {3}":["Supplying ",["0"]," ",["1"]," and ",["2"]," ",["3"]],"Swap":"Swap","Swap <0/> for exactly <1/>":"Swap <0/> for exactly <1/>","Swap Anyway":"Swap Anyway","Swap details":"Swap details","Swap exactly <0/> for <1/>":"Swap exactly <0/> for <1/>","Swap failed: {0}":["Swap failed: ",["0"]],"Swap summary":"Swap summary","Swapping {0} {1} for {2} {3}":["Swapping ",["0"]," ",["1"]," for ",["2"]," ",["3"]],"Take a 10 minute survey to help us improve your experience in the Uniswap app.":"Take a 10 minute survey to help us improve your experience in the Uniswap app.","Tell us what you think ↗":"Tell us what you think ↗","Thanks for being part of the Uniswap community <0/>":"Thanks for being part of the Uniswap community <0/>","The % you will earn in fees.":"The % you will earn in fees.","The Uniswap invariant x*y=k was not satisfied by the swap. This usually means one of the tokens you are swapping incorporates custom behavior on transfer.":"The Uniswap invariant x*y=k was not satisfied by the swap. This usually means one of the tokens you are swapping incorporates custom behavior on transfer.","The app fetches blockchain data from The Graph’s hosted service.":"The app fetches blockchain data from The Graph’s hosted service.","The app fetches on-chain data and constructs contract calls with an Infura API.":"The app fetches on-chain data and constructs contract calls with an Infura API.","The app fetches the optimal trade route from a Uniswap Labs server.":"The app fetches the optimal trade route from a Uniswap Labs server.","The app logs anonymized usage statistics in order to improve over time.":"The app logs anonymized usage statistics in order to improve over time.","The app securely collects your wallet address and shares it with TRM Labs Inc. for risk and compliance reasons.":"The app securely collects your wallet address and shares it with TRM Labs Inc. for risk and compliance reasons.","The cost of sending this transaction is more than half of the value of the input amount.":"The cost of sending this transaction is more than half of the value of the input amount.","The current fast gas amount for sending a transaction on L1. Gas fees are paid in Ethereum's native currency Ether (ETH) and denominated in GWEI.":"The current fast gas amount for sending a transaction on L1. Gas fees are paid in Ethereum's native currency Ether (ETH) and denominated in GWEI.","The estimated difference between the USD values of input and output amounts.":"The estimated difference between the USD values of input and output amounts.","The input token cannot be transferred. There may be an issue with the input token.":"The input token cannot be transferred. There may be an issue with the input token.","The market price is outside your specified price range. Single-asset deposit only.":"The market price is outside your specified price range. Single-asset deposit only.","The most recent block number on this network. Prices update on every block.":"The most recent block number on this network. Prices update on every block.","The output token cannot be transferred. There may be an issue with the output token.":"The output token cannot be transferred. There may be an issue with the output token.","The output token cannot be transferred. There may be an issue with the output token. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3.":"The output token cannot be transferred. There may be an issue with the output token. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3.","The price of this pool is outside of your selected range. Your position is not currently earning fees.":"The price of this pool is outside of your selected range. Your position is not currently earning fees.","The price of this pool is within your selected range. Your position is currently earning fees.":"The price of this pool is within your selected range. Your position is currently earning fees.","The ratio of tokens you add will set the price of this pool.":"The ratio of tokens you add will set the price of this pool.","The transaction could not be sent because the deadline has passed. Please check that your transaction deadline is not too low.":"The transaction could not be sent because the deadline has passed. Please check that your transaction deadline is not too low.","There is no liquidity data.":"There is no liquidity data.","This app uses the following third-party APIs:":"This app uses the following third-party APIs:","This pool must be initialized before you can add liquidity. To initialize, select a starting price for the pool. Then, enter your liquidity price range and deposit amount. Gas fees will be higher than usual due to the initialization transaction.":"This pool must be initialized before you can add liquidity. To initialize, select a starting price for the pool. Then, enter your liquidity price range and deposit amount. Gas fees will be higher than usual due to the initialization transaction.","This route optimizes your total output by considering split routes, multiple hops, and the gas cost of each step.":"This route optimizes your total output by considering split routes, multiple hops, and the gas cost of each step.","This token doesn't appear on the active token list(s). Make sure this is the token that you want to trade.":"This token doesn't appear on the active token list(s). Make sure this is the token that you want to trade.","This token is not supported in the Uniswap Labs app":"This token is not supported in the Uniswap Labs app","This tool will safely migrate your {0} liquidity to V3. The process is completely trustless thanks to the":["This tool will safely migrate your ",["0"]," liquidity to V3. The process is completely trustless thanks to the"],"This transaction will not succeed due to price movement. Try increasing your slippage tolerance. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3.":"This transaction will not succeed due to price movement. Try increasing your slippage tolerance. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3.","This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance.":"This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance.","Tip: Custom tokens are stored locally in your browser":"Tip: Custom tokens are stored locally in your browser","To":"To","To (at least)":"To (at least)","Token not supported":"Token not supported","Tokens":"Tokens","Tokens from inactive lists. Import specific tokens below or click Manage to activate more lists.":"Tokens from inactive lists. Import specific tokens below or click Manage to activate more lists.","Top pools":"Top pools","Total deposited":"Total deposited","Total deposits":"Total deposits","Trade Route":"Trade Route","Trading":"Trading","Transaction Settings":"Transaction Settings","Transaction Submitted":"Transaction Submitted","Transaction completed in":"Transaction completed in","Transaction deadline":"Transaction deadline","Transaction pending":"Transaction pending","Transaction rejected.":"Transaction rejected.","Transaction submitted":"Transaction submitted","Transfer Token":"Transfer Token","Try Again":"Try Again","Try increasing your slippage tolerance.<0/>NOTE: Fee on transfer and rebase tokens are incompatible with Uniswap V3.":"Try increasing your slippage tolerance.<0/>NOTE: Fee on transfer and rebase tokens are incompatible with Uniswap V3.","Turn On Expert Mode":"Turn On Expert Mode","UNI has arrived":"UNI has arrived","UNI tokens represent voting shares in Uniswap governance. You can vote on each proposal yourself or delegate your votes to a third party.":"UNI tokens represent voting shares in Uniswap governance. You can vote on each proposal yourself or delegate your votes to a third party.","UNI {0}/{1} Burned":["UNI ",["0"],"/",["1"]," Burned"],"UNI-V2 LP tokens are required. Once you've added liquidity to the {0}-{1} pool you can stake your liquidity tokens on this page.":["UNI-V2 LP tokens are required. Once you've added liquidity to the ",["0"],"-",["1"]," pool you can stake your liquidity tokens on this page."],"UNI-V2 {0}-{1}":["UNI-V2 ",["0"],"-",["1"]],"Unclaimed UNI":"Unclaimed UNI","Unclaimed fees":"Unclaimed fees","Undetermined":"Undetermined","Unexpected error. Could not estimate gas for the swap.":"Unexpected error. Could not estimate gas for the swap.","Unexpected issue with estimating the gas. Please try again.":"Unexpected issue with estimating the gas. Please try again.","Uniswap Governance":"Uniswap Governance","Uniswap Labs' Terms of Service":"Uniswap Labs' Terms of Service","Uniswap available in: <0>{0}</0>":["Uniswap available in: <0>",["0"],"</0>"],"Uniswap governance is only available on Layer 1. Switch your network to Ethereum Mainnet to view Proposals and Vote.":"Uniswap governance is only available on Layer 1. Switch your network to Ethereum Mainnet to view Proposals and Vote.","Uniswap liquidity mining":"Uniswap liquidity mining","Uniswap migration contract↗":"Uniswap migration contract↗","Unknown Source":"Unknown Source","Unknown error{0}. Try increasing your slippage tolerance. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3.":["Unknown error",["0"],". Try increasing your slippage tolerance. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3."],"Unlock Votes":"Unlock Votes","Unlock Voting":"Unlock Voting","Unlocking Votes":"Unlocking Votes","Unsupported Asset":"Unsupported Asset","Unsupported Assets":"Unsupported Assets","Unsupported network–switch to another to trade.":"Unsupported network–switch to another to trade.","Untitled":"Untitled","Unwrap":"Unwrap","Unwrap <0/> to ETH":"Unwrap <0/> to ETH","Unwrap <0/> to {0}":["Unwrap <0/> to ",["0"]],"Update Delegation":"Update Delegation","Update list":"Update list","Use the Uniswap Labs API to get faster quotes.":"Use the Uniswap Labs API to get faster quotes.","User":"User","V2 is not available on Layer 2. Switch to Layer 1 Ethereum.":"V2 is not available on Layer 2. Switch to Layer 1 Ethereum.","V2 liquidity":"V2 liquidity","V3 {0} Price:":["V3 ",["0"]," Price:"],"View accrued fees and analytics<0>↗</0>":"View accrued fees and analytics<0>↗</0>","View list":"View list","View on Etherscan":"View on Etherscan","View on Explorer":"View on Explorer","View transaction on Explorer":"View transaction on Explorer","Vote":"Vote","Vote Against":"Vote Against","Vote For":"Vote For","Vote against proposal {proposalId}":["Vote against proposal ",["proposalId"]],"Vote against proposal {proposalKey}":["Vote against proposal ",["proposalKey"]],"Vote against proposal {proposalKey} with reason \"{0}\"":["Vote against proposal ",["proposalKey"]," with reason \"",["0"],"\""],"Vote for proposal {proposalId}":["Vote for proposal ",["proposalId"]],"Vote for proposal {proposalKey}":["Vote for proposal ",["proposalKey"]],"Vote for proposal {proposalKey} with reason \"{0}\"":["Vote for proposal ",["proposalKey"]," with reason \"",["0"],"\""],"Vote to abstain on proposal {proposalId}":["Vote to abstain on proposal ",["proposalId"]],"Vote to abstain on proposal {proposalKey}":["Vote to abstain on proposal ",["proposalKey"]],"Vote to abstain on proposal {proposalKey} with reason \"{0}\"":["Vote to abstain on proposal ",["proposalKey"]," with reason \"",["0"],"\""],"Voting ended {0}":["Voting ended ",["0"]],"Voting ends approximately {0}":["Voting ends approximately ",["0"]],"Voting starts approximately {0}":["Voting starts approximately ",["0"]],"Waiting For Confirmation":"Waiting For Confirmation","Wallet Address or ENS name":"Wallet Address or ENS name","Weekly Rewards":"Weekly Rewards","Welcome to team Unicorn :)":"Welcome to team Unicorn :)","When you claim without withdrawing your liquidity remains in the mining pool.":"When you claim without withdrawing your liquidity remains in the mining pool.","When you withdraw, the contract will automagically claim UNI on your behalf!":"When you withdraw, the contract will automagically claim UNI on your behalf!","When you withdraw, your UNI is claimed and your liquidity is removed from the mining pool.":"When you withdraw, your UNI is claimed and your liquidity is removed from the mining pool.","Withdraw":"Withdraw","Withdraw & Claim":"Withdraw & Claim","Withdraw deposited liquidity":"Withdraw deposited liquidity","Withdrawing {0} UNI-V2":["Withdrawing ",["0"]," UNI-V2"],"Withdrew UNI-V2!":"Withdrew UNI-V2!","Wrap":"Wrap","Wrap <0/> to WETH":"Wrap <0/> to WETH","Wrap <0/> to {0}":["Wrap <0/> to ",["0"]],"Wrong Network":"Wrong Network","You already have an active or pending proposal":"You already have an active or pending proposal","You are creating a pool":"You are creating a pool","You are the first liquidity provider for this Uniswap V3 pool. Your liquidity will migrate at the current {0} price.":["You are the first liquidity provider for this Uniswap V3 pool. Your liquidity will migrate at the current ",["0"]," price."],"You are the first liquidity provider.":"You are the first liquidity provider.","You can either vote on each proposal yourself or delegate your votes to a third party.":"You can either vote on each proposal yourself or delegate your votes to a third party.","You can now trade {0}":["You can now trade ",["0"]],"You don't have enough votes to submit a proposal":"You don't have enough votes to submit a proposal","You don’t have liquidity in this pool yet.":"You don’t have liquidity in this pool yet.","You may have lost your network connection, or {label} might be down right now.":["You may have lost your network connection, or ",["label"]," might be down right now."],"You may have lost your network connection.":"You may have lost your network connection.","You might consider waiting until the network fees go down to complete this transaction.":"You might consider waiting until the network fees go down to complete this transaction.","You must connect an account.":"You must connect an account.","You must give the Uniswap smart contracts permission to use your {0}. You only have to do this once per token.":["You must give the Uniswap smart contracts permission to use your ",["0"],". You only have to do this once per token."],"You must have {formattedProposalThreshold} votes to submit a proposal":["You must have ",["formattedProposalThreshold"]," votes to submit a proposal"],"You should only deposit liquidity into Uniswap V3 at a price you believe is correct. <0/>If the price seems incorrect, you can either make a swap to move the price or wait for someone else to do so.":"You should only deposit liquidity into Uniswap V3 at a price you believe is correct. <0/>If the price seems incorrect, you can either make a swap to move the price or wait for someone else to do so.","You will also collect fees earned from this position.":"You will also collect fees earned from this position.","You will receive":"You will receive","You will receive at least {0} {1} or the transaction will revert.":["You will receive at least ",["0"]," ",["1"]," or the transaction will revert."],"You will send at most {0} {1} or the transaction will revert.":["You will send at most ",["0"]," ",["1"]," or the transaction will revert."],"Your V2 liquidity":"Your V2 liquidity","Your active V3 liquidity positions will appear here.":"Your active V3 liquidity positions will appear here.","Your liquidity deposits":"Your liquidity deposits","Your pool share:":"Your pool share:","Your position":"Your position","Your position has 0 liquidity, and is not earning fees.":"Your position has 0 liquidity, and is not earning fees.","Your position will appear here.":"Your position will appear here.","Your position will be 100% composed of {0} at this price":["Your position will be 100% composed of ",["0"]," at this price"],"Your position will be 100% {0} at this price.":["Your position will be 100% ",["0"]," at this price."],"Your position will not earn fees or be used in trades until the market price moves into your range.":"Your position will not earn fees or be used in trades until the market price moves into your range.","Your positions":"Your positions","Your rate":"Your rate","Your total pool tokens:":"Your total pool tokens:","Your transaction cost will be much higher as it includes the gas to create the pool.":"Your transaction cost will be much higher as it includes the gas to create the pool.","Your transaction may be frontrun":"Your transaction may be frontrun","Your transaction may fail":"Your transaction may fail","Your transaction will revert if it has been pending for longer than this period of time.":"Your transaction will revert if it has been pending for longer than this period of time.","Your transaction will revert if it is pending for more than this period of time.":"Your transaction will revert if it is pending for more than this period of time.","Your transaction will revert if the price changes unfavorably by more than this percentage.":"Your transaction will revert if the price changes unfavorably by more than this percentage.","Your transactions will appear here...":"Your transactions will appear here...","Your unclaimed UNI":"Your unclaimed UNI","after slippage":"after slippage","confirm":"confirm","for {0}":["for ",["0"]],"gwei":"gwei","has socks emoji":"has socks emoji","here.":"here.","https:// or ipfs:// or ENS name":"https:// or ipfs:// or ENS name","minutes":"minutes","via {0}":["via ",["0"]],"via {0} token list":["via ",["0"]," token list"],"{0, plural, one {Import token} other {Import tokens}}":[["0","plural",{one:"Import token",other:"Import tokens"}]],"{0}":[["0"]],"{0} %":[["0"]," %"],"{0} <0/> per <1/>":[["0"]," <0/> per <1/>"],"{0} Custom Tokens":[["0"]," Custom Tokens"],"{0} Deposited":[["0"]," Deposited"],"{0} ETH":[["0"]," ETH"],"{0} Fees Earned:":[["0"]," Fees Earned:"],"{0} Pending":[["0"]," Pending"],"{0} UNI":[["0"]," UNI"],"{0} UNI / week":[["0"]," UNI / week"],"{0} UNI-V2":[["0"]," UNI-V2"],"{0} UNI-V2 LP tokens available":[["0"]," UNI-V2 LP tokens available"],"{0} Votes":[["0"]," Votes"],"{0} per {1}":[["0"]," per ",["1"]],"{0} tokens":[["0"]," tokens"],"{0} {1} Price:":[["0"]," ",["1"]," Price:"],"{0} {nativeCurrencySymbol}":[["0"]," ",["nativeCurrencySymbol"]],"{0} • Added by user":[["0"]," • Added by user"],"{0}%":[["0"],"%"],"{0}% fee tier":[["0"],"% fee tier"],"{0}% pool":[["0"],"% pool"],"{0}% select":[["0"],"% select"],"{0}-{1} Liquidity Mining":[["0"],"-",["1"]," Liquidity Mining"],"{0}/{1} LP NFT":[["0"],"/",["1"]," LP NFT"],"{0}/{1} LP Tokens":[["0"],"/",["1"]," LP Tokens"],"{SOCKS_AMOUNT} UNI":[["SOCKS_AMOUNT"]," UNI"],"{USER_AMOUNT} UNI":[["USER_AMOUNT"]," UNI"],"{activeTokensOnThisChain} tokens":[["activeTokensOnThisChain"]," tokens"],"{integrator} fee":[["integrator"]," fee"],"{label} token bridge":[["label"]," token bridge"],"{min}m {sec}s":[["min"],"m ",["sec"],"s"],"{percentForSlider}%":[["percentForSlider"],"%"],"{sec}s":[["sec"],"s"],"{tokenB} per {tokenA}":[["tokenB"]," per ",["tokenA"]],"~$ <0/>":"~$ <0/>","← Back to Pools Overview":"← Back to Pools Overview"}};

const SUPPORTED_LOCALES = [
    // order as they appear in the language dropdown
    'en-US',
    'af-ZA',
    'ar-SA',
    'ca-ES',
    'cs-CZ',
    'da-DK',
    'de-DE',
    'el-GR',
    'es-ES',
    'fi-FI',
    'fr-FR',
    'he-IL',
    'hu-HU',
    'id-ID',
    'it-IT',
    'ja-JP',
    'ko-KR',
    'nl-NL',
    'no-NO',
    'pl-PL',
    'pt-BR',
    'pt-PT',
    'ro-RO',
    'ru-RU',
    'sr-SP',
    'sv-SE',
    'sw-TZ',
    'tr-TR',
    'uk-UA',
    'vi-VN',
    'zh-CN',
    'zh-TW',
];
const DEFAULT_LOCALE = 'en-US';
const LOCALE_LABEL = {
    'af-ZA': 'Afrikaans',
    'ar-SA': 'العربية',
    'ca-ES': 'Català',
    'cs-CZ': 'čeština',
    'da-DK': 'dansk',
    'de-DE': 'Deutsch',
    'el-GR': 'ελληνικά',
    'en-US': 'English',
    'es-ES': 'Español',
    'fi-FI': 'suomi',
    'fr-FR': 'français',
    'he-IL': 'עִברִית',
    'hu-HU': 'Magyar',
    'id-ID': 'bahasa Indonesia',
    'it-IT': 'Italiano',
    'ja-JP': '日本語',
    'ko-KR': '한국어',
    'nl-NL': 'Nederlands',
    'no-NO': 'norsk',
    'pl-PL': 'Polskie',
    'pt-BR': 'português',
    'pt-PT': 'português',
    'ro-RO': 'Română',
    'ru-RU': 'русский',
    'sr-SP': 'Српски',
    'sv-SE': 'svenska',
    'sw-TZ': 'Kiswahili',
    'tr-TR': 'Türkçe',
    'uk-UA': 'Український',
    'vi-VN': 'Tiếng Việt',
    'zh-CN': '简体中文',
    'zh-TW': '繁体中文',
};

var _a, _b, _c;
/**
 * Given a locale string (e.g. from user agent), return the best match for corresponding SupportedLocale
 * @param maybeSupportedLocale the fuzzy locale identifier
 */
function parseLocale(maybeSupportedLocale) {
    if (typeof maybeSupportedLocale !== 'string')
        return undefined;
    const lowerMaybeSupportedLocale = maybeSupportedLocale.toLowerCase();
    return SUPPORTED_LOCALES.find((locale) => locale.toLowerCase() === lowerMaybeSupportedLocale || locale.split('-')[0] === lowerMaybeSupportedLocale);
}
/**
 * Returns the supported locale read from the user agent (navigator)
 */
function navigatorLocale() {
    var _a;
    if (!navigator.language)
        return undefined;
    const [language, region] = navigator.language.split('-');
    if (region) {
        return (_a = parseLocale(`${language}-${region.toUpperCase()}`)) !== null && _a !== void 0 ? _a : parseLocale(language);
    }
    return parseLocale(language);
}
function storeLocale() {
    var _a;
    return (_a = store.getState().user.userLocale) !== null && _a !== void 0 ? _a : undefined;
}
const initialLocale = (_c = (_b = (_a = parseLocale(parsedQueryString().lng)) !== null && _a !== void 0 ? _a : storeLocale()) !== null && _b !== void 0 ? _b : navigatorLocale()) !== null && _c !== void 0 ? _c : DEFAULT_LOCALE;
function useUrlLocale() {
    const parsed = useParsedQueryString();
    return parseLocale(parsed.lng);
}
/**
 * Returns the currently active locale, from a combination of user agent, query string, and user settings stored in redux
 * Stores the query string locale in redux (if set) to persist across sessions
 */
function useActiveLocale() {
    const urlLocale = useUrlLocale();
    const userLocale = useUserLocale();
    return useMemo(() => { var _a, _b; return (_b = (_a = urlLocale !== null && urlLocale !== void 0 ? urlLocale : userLocale) !== null && _a !== void 0 ? _a : navigatorLocale()) !== null && _b !== void 0 ? _b : DEFAULT_LOCALE; }, [urlLocale, userLocale]);
}

function useLocationLinkProps(locale) {
    const location = useLocation();
    const qs = useParsedQueryString();
    const activeLocale = useActiveLocale();
    return useMemo(() => !locale
        ? {}
        : {
            to: Object.assign(Object.assign({}, location), { search: stringify(Object.assign(Object.assign({}, qs), { lng: locale })) }),
            onClick: () => {
                ReactGA.event({
                    category: 'Localization',
                    action: 'Switch Locale',
                    label: `${activeLocale} -> ${locale}`,
                });
            },
        }, [location, qs, activeLocale, locale]);
}

var _path$3, _path2, _path3;

function _extends$5() { _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }

const SvgMenu = props => /*#__PURE__*/React.createElement("svg", _extends$5({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), _path$3 || (_path$3 = /*#__PURE__*/React.createElement("path", {
  d: "M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z",
  stroke: "black",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
})), _path2 || (_path2 = /*#__PURE__*/React.createElement("path", {
  d: "M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z",
  stroke: "black",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
})), _path3 || (_path3 = /*#__PURE__*/React.createElement("path", {
  d: "M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z",
  stroke: "black",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
})));

function useOnClickOutside(node, handler) {
    const handlerRef = useRef(handler);
    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);
    useEffect(() => {
        const handleClickOutside = (e) => {
            var _a, _b;
            if ((_b = (_a = node.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) !== null && _b !== void 0 ? _b : false) {
                return;
            }
            if (handlerRef.current)
                handlerRef.current();
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [node]);
}

var FlyoutAlignment;
(function (FlyoutAlignment) {
    FlyoutAlignment["LEFT"] = "LEFT";
    FlyoutAlignment["RIGHT"] = "RIGHT";
})(FlyoutAlignment || (FlyoutAlignment = {}));
const StyledMenuIcon$1 = styled(SvgMenu) `
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`;
const StyledMenuButton$1 = styled.button `
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 38px;
  background-color: ${({ theme }) => theme.bg0};
  border: 1px solid ${({ theme }) => theme.bg0};

  padding: 0.15rem 0.5rem;
  border-radius: 12px;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    border: 1px solid ${({ theme }) => theme.bg3};
  }

  svg {
    margin-top: 2px;
  }
`;
const UNIbutton = styled(ButtonPrimary) `
  background-color: ${({ theme }) => theme.bg3};
  background: radial-gradient(174.47% 188.91% at 1.84% 0%, #ff007a 0%, #2172e5 100%), #edeef2;
  border: none;
`;
const StyledMenu$2 = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`;
const MenuFlyout$1 = styled.span `
  min-width: 196px;
  max-height: 350px;
  overflow: auto;
  background-color: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border: 1px solid ${({ theme }) => theme.bg0};
  border-radius: 12px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  position: absolute;
  top: 3rem;
  z-index: 100;

  ${({ flyoutAlignment = FlyoutAlignment.RIGHT }) => flyoutAlignment === FlyoutAlignment.RIGHT
    ? css `
          right: 0rem;
        `
    : css `
          left: 0rem;
        `};
  ${({ theme }) => theme.mediaWidth.upToMedium `
    bottom: unset;
    right: 0;
    left: unset;
  `};
`;
const MenuItem$1 = styled(ExternalLink) `
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 0.5rem;
  justify-content: space-between;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
`;
const InternalMenuItem = styled(Link$1) `
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`;
const InternalLinkMenuItem = styled(InternalMenuItem) `
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 0.5rem;
  justify-content: space-between;
  text-decoration: none;
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
`;
const ToggleMenuItem = styled.button `
  background-color: transparent;
  margin: 0;
  padding: 0;
  border: none;
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 0.5rem;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
`;
function LanguageMenuItem({ locale, active, key }) {
    const { to, onClick } = useLocationLinkProps(locale);
    if (!to)
        return null;
    return (jsxs(InternalLinkMenuItem, Object.assign({ onClick: onClick, to: to }, { children: [jsx("div", { children: LOCALE_LABEL[locale] }, void 0), active && jsx(Check, { opacity: 0.6, size: 16 }, void 0)] }), key));
}
function LanguageMenu({ close }) {
    const activeLocale = useActiveLocale();
    return (jsxs(MenuFlyout$1, { children: [jsx(ToggleMenuItem, Object.assign({ onClick: close }, { children: jsx(ChevronLeft, { size: 16 }, void 0) }), void 0), SUPPORTED_LOCALES.map((locale) => (jsx(LanguageMenuItem, { locale: locale, active: activeLocale === locale }, locale)))] }, void 0));
}
function Menu() {
    const { account, chainId } = useActiveWeb3React();
    const node = useRef();
    const open = useModalOpen(ApplicationModal.MENU);
    const toggleMenu = useToggleModal(ApplicationModal.MENU);
    useOnClickOutside(node, open ? toggleMenu : undefined);
    const togglePrivacyPolicy = useToggleModal(ApplicationModal.PRIVACY_POLICY);
    const openClaimModal = useToggleModal(ApplicationModal.ADDRESS_CLAIM);
    const showUNIClaimOption = Boolean(!!account && !!chainId && !L2_CHAIN_IDS.includes(chainId));
    const [darkMode, toggleDarkMode] = useDarkModeManager();
    const [menu, setMenu] = useState('main');
    useEffect(() => {
        setMenu('main');
    }, [open]);
    return (jsxs(Fragment, { children: [jsxs(StyledMenu$2, Object.assign({ ref: node }, { children: [jsx(StyledMenuButton$1, Object.assign({ onClick: toggleMenu, "aria-label": t `Menu` }, { children: jsx(StyledMenuIcon$1, {}, void 0) }), void 0), open &&
                        (() => {
                            switch (menu) {
                                case 'lang':
                                    return jsx(LanguageMenu, { close: () => setMenu('main') }, void 0);
                                case 'main':
                                default:
                                    return (jsxs(MenuFlyout$1, { children: [jsxs(MenuItem$1, Object.assign({ href: "https://uniswap.org/" }, { children: [jsx("div", { children: jsx(Trans, { children: "About" }, void 0) }, void 0), jsx(Info, { opacity: 0.6, size: 16 }, void 0)] }), void 0), jsxs(MenuItem$1, Object.assign({ href: "https://help.uniswap.org/" }, { children: [jsx("div", { children: jsx(Trans, { children: "Help Center" }, void 0) }, void 0), jsx(HelpCircle, { opacity: 0.6, size: 16 }, void 0)] }), void 0), jsxs(MenuItem$1, Object.assign({ href: "https://uniswap.canny.io/feature-requests" }, { children: [jsx("div", { children: jsx(Trans, { children: "Request Features" }, void 0) }, void 0), jsx(Coffee, { opacity: 0.6, size: 16 }, void 0)] }), void 0), jsxs(MenuItem$1, Object.assign({ href: "https://discord.gg/FCfyBSbCU5" }, { children: [jsx("div", { children: jsx(Trans, { children: "Discord" }, void 0) }, void 0), jsx(MessageCircle, { opacity: 0.6, size: 16 }, void 0)] }), void 0), jsxs(ToggleMenuItem, Object.assign({ onClick: () => setMenu('lang') }, { children: [jsx("div", { children: jsx(Trans, { children: "Language" }, void 0) }, void 0), jsx(Globe, { opacity: 0.6, size: 16 }, void 0)] }), void 0), jsxs(ToggleMenuItem, Object.assign({ onClick: () => toggleDarkMode() }, { children: [jsx("div", { children: darkMode ? jsx(Trans, { children: "Light Theme" }, void 0) : jsx(Trans, { children: "Dark Theme" }, void 0) }, void 0), darkMode ? jsx(Moon, { opacity: 0.6, size: 16 }, void 0) : jsx(Sun, { opacity: 0.6, size: 16 }, void 0)] }), void 0), jsxs(MenuItem$1, Object.assign({ href: "https://docs.uniswap.org/" }, { children: [jsx("div", { children: jsx(Trans, { children: "Docs" }, void 0) }, void 0), jsx(BookOpen, { opacity: 0.6, size: 16 }, void 0)] }), void 0), jsxs(ToggleMenuItem, Object.assign({ onClick: () => togglePrivacyPolicy() }, { children: [jsx("div", { children: jsx(Trans, { children: "Legal & Privacy" }, void 0) }, void 0), jsx(FileText, { opacity: 0.6, size: 16 }, void 0)] }), void 0), showUNIClaimOption && (jsx(UNIbutton, Object.assign({ onClick: openClaimModal, padding: "8px 16px", width: "100%", "$borderRadius": "12px", mt: "0.5rem" }, { children: jsx(Trans, { children: "Claim UNI" }, void 0) }), void 0))] }, void 0));
                            }
                        })()] }), void 0), jsx(PrivacyPolicyModal, {}, void 0)] }, void 0));
}
styled(MenuFlyout$1) `
  top: 3rem !important;
`;
styled(InternalMenuItem) `
  width: max-content;
  text-decoration: none;
`;
styled(MenuItem$1) `
  width: max-content;
  text-decoration: none;
`;

const loadingAnimation = keyframes `
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;
const LoadingRows = styled.div `
  display: grid;

  & > div {
    animation: ${loadingAnimation} 1.5s infinite;
    animation-fill-mode: both;
    background: linear-gradient(
      to left,
      ${({ theme }) => theme.bg1} 25%,
      ${({ theme }) => theme.bg2} 50%,
      ${({ theme }) => theme.bg1} 75%
    );
    background-size: 400%;
    border-radius: 12px;
    height: 2.4em;
    will-change: background-position;
  }
`;
const loadingOpacityMixin = css `
  filter: ${({ $loading }) => ($loading ? 'grayscale(1)' : 'none')};
  opacity: ${({ $loading }) => ($loading ? '0.4' : '1')};
  transition: opacity 0.2s ease-in-out;
`;
const LoadingOpacityContainer = styled.div `
  ${loadingOpacityMixin}
`;

function useInterval(callback, delay, leading = true) {
    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    useEffect(() => {
        function tick() {
            const current = savedCallback.current;
            current && current();
        }
        if (delay !== null) {
            if (leading)
                tick();
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
        return undefined;
    }, [delay, leading]);
}

const PopoverContainer$1 = styled.div `
  z-index: 9999;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: visibility 150ms linear, opacity 150ms linear;
  color: ${({ theme }) => theme.text2};
`;
const ReferenceElement = styled.div `
  display: inline-block;
`;
const Arrow = styled.div `
  width: 8px;
  height: 8px;
  z-index: 9998;

  ::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: 9998;

    content: '';
    border: 1px solid ${({ theme }) => theme.bg2};
    transform: rotate(45deg);
    background: ${({ theme }) => theme.bg0};
  }

  &.arrow-top {
    bottom: -5px;
    ::before {
      border-top: none;
      border-left: none;
    }
  }

  &.arrow-bottom {
    top: -5px;
    ::before {
      border-bottom: none;
      border-right: none;
    }
  }

  &.arrow-left {
    right: -5px;

    ::before {
      border-bottom: none;
      border-left: none;
    }
  }

  &.arrow-right {
    left: -5px;
    ::before {
      border-right: none;
      border-top: none;
    }
  }
`;
function Popover({ content, show, children, placement = 'auto' }) {
    var _a, _b;
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const options = useMemo(() => ({
        placement,
        strategy: 'fixed',
        modifiers: [
            { name: 'offset', options: { offset: [8, 8] } },
            { name: 'arrow', options: { element: arrowElement } },
            { name: 'preventOverflow', options: { padding: 8 } },
        ],
    }), [arrowElement, placement]);
    const { styles, update, attributes } = usePopper(referenceElement, popperElement, options);
    const updateCallback = useCallback(() => {
        update && update();
    }, [update]);
    useInterval(updateCallback, show ? 100 : null);
    return (jsxs(Fragment, { children: [jsx(ReferenceElement, Object.assign({ ref: setReferenceElement }, { children: children }), void 0), jsx(Portal, { children: jsxs(PopoverContainer$1, Object.assign({ show: show, ref: setPopperElement, style: styles.popper }, attributes.popper, { children: [content, jsx(Arrow, Object.assign({ className: `arrow-${(_b = (_a = attributes.popper) === null || _a === void 0 ? void 0 : _a['data-popper-placement']) !== null && _b !== void 0 ? _b : ''}`, ref: setArrowElement, style: styles.arrow }, attributes.arrow), void 0)] }), void 0) }, void 0)] }, void 0));
}

const TooltipContainer = styled.div `
  width: 256px;
  padding: 0.6rem 1rem;
  font-weight: 400;
  word-break: break-word;

  background: ${({ theme }) => theme.bg0};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.bg2};
  box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.9, theme.shadow1)};
`;
function Tooltip(_a) {
    var { text } = _a, rest = __rest(_a, ["text"]);
    return jsx(Popover, Object.assign({ content: jsx(TooltipContainer, { children: text }, void 0) }, rest), void 0);
}
function TooltipContent(_a) {
    var { content, wrap = false } = _a, rest = __rest(_a, ["content", "wrap"]);
    return jsx(Popover, Object.assign({ content: wrap ? jsx(TooltipContainer, { children: content }, void 0) : content }, rest), void 0);
}
function MouseoverTooltip(_a) {
    var { children } = _a, rest = __rest(_a, ["children"]);
    const [show, setShow] = useState(false);
    const open = useCallback(() => setShow(true), [setShow]);
    const close = useCallback(() => setShow(false), [setShow]);
    return (jsx(Tooltip, Object.assign({}, rest, { show: show }, { children: jsx("div", Object.assign({ onMouseEnter: open, onMouseLeave: close }, { children: children }), void 0) }), void 0));
}
function MouseoverTooltipContent(_a) {
    var { content, children, onOpen: openCallback = undefined } = _a, rest = __rest(_a, ["content", "children", "onOpen"]);
    const [show, setShow] = useState(false);
    const open = useCallback(() => {
        setShow(true);
        openCallback === null || openCallback === void 0 ? void 0 : openCallback();
    }, [openCallback]);
    const close = useCallback(() => setShow(false), [setShow]);
    return (jsx(TooltipContent, Object.assign({}, rest, { show: show, content: content }, { children: jsx("div", Object.assign({ style: { display: 'inline-block', lineHeight: 0, padding: '0.25rem' }, onMouseEnter: open, onMouseLeave: close }, { children: children }), void 0) }), void 0));
}

const StyledPriceContainer = styled.button `
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: grid;
  height: 24px;
  justify-content: center;
  padding: 0;
  grid-template-columns: 1fr auto;
  grid-gap: 0.25rem;
`;
function TradePrice({ price, showInverted, setShowInverted }) {
    var _a, _b, _c, _d, _e, _f;
    const theme = useContext(ThemeContext);
    const usdcPrice = useUSDCPrice(showInverted ? price.baseCurrency : price.quoteCurrency);
    let formattedPrice;
    try {
        formattedPrice = showInverted ? price.toSignificant(4) : (_a = price.invert()) === null || _a === void 0 ? void 0 : _a.toSignificant(4);
    }
    catch (error) {
        formattedPrice = '0';
    }
    const label = showInverted ? `${(_b = price.quoteCurrency) === null || _b === void 0 ? void 0 : _b.symbol}` : `${(_c = price.baseCurrency) === null || _c === void 0 ? void 0 : _c.symbol} `;
    const labelInverted = showInverted ? `${(_d = price.baseCurrency) === null || _d === void 0 ? void 0 : _d.symbol} ` : `${(_e = price.quoteCurrency) === null || _e === void 0 ? void 0 : _e.symbol}`;
    const flipPrice = useCallback(() => setShowInverted(!showInverted), [setShowInverted, showInverted]);
    const text = `${(_f = '1 ' + labelInverted + ' = ' + formattedPrice) !== null && _f !== void 0 ? _f : '-'} ${label}`;
    return (jsxs(StyledPriceContainer, Object.assign({ onClick: flipPrice, title: text }, { children: [jsx(Text$1, Object.assign({ fontWeight: 500, fontSize: 14, color: theme.text1 }, { children: text }), void 0), ' ', usdcPrice && (jsx(ThemedText.DarkGray, { children: jsxs(Trans, { children: ["($", usdcPrice.toSignificant(6, { groupSeparator: ',' }), ")"] }, void 0) }, void 0))] }), void 0));
}

const Wrapper$d = styled.div `
  position: relative;
  padding: 8px;
`;
const ArrowWrapper$1 = styled.div `
  padding: 4px;
  border-radius: 12px;
  height: 32px;
  width: 32px;
  position: relative;
  margin-top: -14px;
  margin-bottom: -14px;
  left: calc(50% - 16px);
  /* transform: rotate(90deg); */
  background-color: ${({ theme }) => theme.bg1};
  border: 4px solid ${({ theme }) => theme.bg0};
  z-index: 2;
  ${({ clickable }) => clickable
    ? css `
          :hover {
            cursor: pointer;
            opacity: 0.8;
          }
        `
    : null}
`;
const SectionBreak = styled.div `
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.bg3};
`;
const ErrorText = styled(Text$1) `
  color: ${({ theme, severity }) => severity === 3 || severity === 4
    ? theme.red1
    : severity === 2
        ? theme.yellow2
        : severity === 1
            ? theme.text1
            : theme.text2};
`;
const TruncatedText = styled(Text$1) `
  text-overflow: ellipsis;
  max-width: 220px;
  overflow: hidden;
  text-align: right;
`;
// styles
const Dots = styled.span `
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: '.';
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: '.';
    }
    33% {
      content: '..';
    }
    66% {
      content: '...';
    }
  }
`;
const SwapCallbackErrorInner = styled.div `
  background-color: ${({ theme }) => transparentize(0.9, theme.red1)};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.825rem;
  width: 100%;
  padding: 3rem 1.25rem 1rem 1rem;
  margin-top: -2rem;
  color: ${({ theme }) => theme.red1};
  z-index: -1;
  p {
    padding: 0;
    margin: 0;
    font-weight: 500;
  }
`;
const SwapCallbackErrorInnerAlertTriangle = styled.div `
  background-color: ${({ theme }) => transparentize(0.9, theme.red1)};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  border-radius: 12px;
  min-width: 48px;
  height: 48px;
`;
function SwapCallbackError({ error }) {
    return (jsxs(SwapCallbackErrorInner, { children: [jsx(SwapCallbackErrorInnerAlertTriangle, { children: jsx(AlertTriangle, { size: 24 }, void 0) }, void 0), jsx("p", Object.assign({ style: { wordBreak: 'break-word' } }, { children: error }), void 0)] }, void 0));
}
const SwapShowAcceptChanges = styled(AutoColumn) `
  background-color: ${({ theme }) => transparentize(0.95, theme.primary3)};
  color: ${({ theme }) => theme.primaryText1};
  padding: 0.5rem;
  border-radius: 12px;
  margin-top: 8px;
`;
const TransactionDetailsLabel = styled(ThemedText.Black) `
  border-bottom: 1px solid ${({ theme }) => theme.bg2};
  padding-bottom: 0.5rem;
`;
const ResponsiveTooltipContainer = styled(TooltipContainer) `
  background-color: ${({ theme }) => theme.bg0};
  border: 1px solid ${({ theme }) => theme.bg2};
  padding: 1rem;
  width: ${({ width }) => width !== null && width !== void 0 ? width : 'auto'};

  ${({ theme, origin }) => theme.mediaWidth.upToExtraSmall `
    transform: scale(0.8);
    transform-origin: ${origin !== null && origin !== void 0 ? origin : 'top left'};
  `}
`;
styled(TradePrice) `
  ${loadingOpacityMixin}
`;

// technically a 721, not an ERC20, but suffices for our purposes
const SOCKS = new Token(SupportedChainId.MAINNET, SOCKS_CONTROLLER_ADDRESSES[SupportedChainId.MAINNET], 0);
function useHasSocks() {
    const { account, chainId } = useActiveWeb3React();
    const balance = useTokenBalance(account !== null && account !== void 0 ? account : undefined, chainId === SupportedChainId.MAINNET ? SOCKS : undefined);
    return useMemo(() => Boolean(balance === null || balance === void 0 ? void 0 : balance.greaterThan(0)), [balance]);
}

var COINBASE_ICON_URL = "d13f13f5694ec91f.svg";

var FORTMATIC_ICON_URL = "data:image/png;base64,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";

var PORTIS_ICON_URL = "data:image/png;base64,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";

var WALLETCONNECT_ICON_URL = "data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%20%20%3Crect%20width%3D%2224%22%20height%3D%2215.0867%22%20fill%3D%22url%28%23pattern0%29%22%2F%3E%20%20%3Cdefs%3E%20%20%20%20%3Cpattern%20id%3D%22pattern0%22%20patternContentUnits%3D%22objectBoundingBox%22%20width%3D%221%22%20height%3D%221%22%3E%20%20%20%20%20%20%3Cuse%20xlink%3Ahref%3D%22%23image0%22%20transform%3D%22translate%28-0.00968744%29%20scale%280.00339792%200.00540541%29%22%2F%3E%20%20%20%20%3C%2Fpattern%3E%20%20%20%20%3Cimage%20id%3D%22image0%22%20width%3D%22300%22%20height%3D%22185%22%20xlink%3Ahref%3D%22data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAASwAAAC5CAYAAACSoQIxAAAgAElEQVR4Ae19fZgdVZnn761TnQ%2FCtwmugxhkGPXZDIjDoENIuu9twsAm4CS7EpFhWHYktN23AwzC6Dg6xI%2FVWcGsk%2FTtNgQ0MogQ9lkQDAtLTN%2FuhDjIk5koG10eWRwQdAjRYBLIR9epd5%2B3um%2FS6dx7%2B35U3Vt16tx%2Fqu6pc96P33vqd8%2BtOu85BPuxCFRAYF4%2Fn%2BJ4ONNV3izt0AzycRwRzQBjBgPHEfszfMIMIjqOGDNAmAHguDGRb4HxJhPeZOa3yMFe%2BM5%2BR74DbzHzmyC8ST7vZXJ%2Fs9fFL7Z10e8qmGMvpRwBSrn%2F1n0AF97Np07d753rK2eOw%2F4fENG7ffCZYDrTIZzYTJAY%2BB3AvwDoX5nk6PxcaWfHb2fgJ9v%2FC73RTFusrvghYAkrfjGJ1KL21XyO4%2BgPMvhch%2BhcAHMAzIpUaUjCmfEagP8D4ucA2u6z%2BtFwjn4WkngrJgEIWMJKQJDqNfE%2FfJNnvXVQz3OYLwToAmZ8iAjT65UXy3aMfSD8E3x%2BlhVtPdimtv7wevptLG21RjWMgCWshiGMj4DzvsUnn3RAZx2NLDvcSSAZPaXq4zN8Av8YwCZi2rST1PCOHO1LFQgGO2sJK%2BHB7cjzBWDvcihc7jD9UcLdicR8Zv4hkfOY1s73h5fTc5EosUKbgoAlrKbAHJ6Ss1fx1He26UvIx4dBuBzAO8KTbr4kZvwrgx91GI%2FyLneosII88702x0NLWAmJZTCSIn29A3wMwAkJMTvWZjLjN8z8bZrmDhSupxdibaw1LkDAElaMO8JF9%2FAJ6qB%2FrQP%2FegKdF2NTE28ag7cw0V2vjqj1L9xIBxPvkKEOWMKKYWDb8zzXgV5GhKsATIuhicaa5DP2EHAvjai%2BwZvpeWMdTahjlrBiEjgZTU095P9nH%2F4NxHROTMxKtRkMfpqJ1thRV3y6gSWsFsciczefjUP6UwRcY0dTLQ5GGfWjoy6%2BS7vuys1d9Osy1WxxExCwhNUEkEupGCOqLzJjqUNwStWxZTFDgHGQgbXaVV%2B2xNWa2FjCajLulqiaDHgU6ixxRYFqVTItYVUFU%2BOV2vN8hkP6y2N%2F%2FRoXaCXEAgFm%2FgeP3M9v6aHdsTDIcCMsYUUcYHmY7h7yPuv4dBMIUyNWZ8W3AgHGbhB9aY9yVm%2FropFWmJAWnZawIop0ZgW7fJrf7YD%2FDsDMiNRYsXFCgPGiT%2Fj0UI%2F7UJzMMskWS1gRRDPbN3Kx76DfAb0nAvFWZMwRkEmo2nG7Nn%2BCfhpzUxNnniWsEEMmy7nsP6BXEYIJnyFKtqIShwDDA%2FF%2F36PcFdu66K3E2R9Tgy1hhREYZur8hp%2Fzmb9EwElhiLQyjEHgZQDLB3vcR43xqIWOWMJqEPxsH89h8tYR0R83KMo2NxuBR5lVVyFH%2F2a2m9F6ZwmrXnxXsJM9zf%2B0D77dAabUK8a2Sw8CPvBbYvQUcu6D6fE6XE8tYdWB5%2BjkT%2B8BAp1fR3PbJO0IMP7nm6xu%2BFEv%2FSbtUNTqv00JqQUxZmrP65twUP%2FEklUtwNm6RyFA%2BI%2FTSf80kx%2B57Khy%2B2VSBOwIa1KIRitk1vBMaL2egGyVTWw1i8CkCDCj7%2FVZ6pM7ltKhSSvbCrCEVUUnyPTzn4D1I0R4exXVbRWLQE0IMPO%2F%2BFPc%2FzS8jH5RU8MUVrZ%2FCSsFnZkyffqzBL3FklUloOy1RhAgog%2BoEf3jbL%2F34UbkpKGtHWGVifIH%2B%2Fhtx5F%2BkAgXl6liiy0CoSPgM68ayrXdFLpgQwRawioRyMwafh95%2Bn%2BDcEaJy7bIIhApAj54q4Z7uV0B4liY7V%2FCCZhk%2B7yF5OlnLVlNAMZ%2BbRoCDmiuy%2Fqf5YezaUoTosgS1rhAZfv1Z9jB90E4flyxPbUINB0BIpwpP5zyA9p05TFWaP8SjgUn2%2B99B8DVMY6VNS2lCDDRrYVu9bWUun%2BU26knrGAnZaUfI8IlRyFjv1gEYoQAg79e6Gn7qxiZ1BJTUk1YQlZnuPoJAJmWoG%2BVWgRqQMBnfHOoR10PIq6hmVFVU0tYF67k6dOm6cctWRnVn9PgzEO8U11dWEFeGpyd6GMqH7rPyfPxU6Z5Gy1ZTewO9nsCELgSp%2BlH5d9BAmwN3cTUjbDOvZdnnLrXe4qILgwdTSvQItAkBJh58%2BtwF%2B7I0b4mqYyFmlQR1odW8YnTlfcDu9heCH2PsY%2BB34H4DTkS6HeQ74w34PDosik%2BvQ2EkwGcxOCT4ONkIjopWJXVTh1pOAjM%2FE%2F7tXvpMzfSnoaFJURAaghLUm2mO94mB3RuQmLTOjODjUL5ZSJ6yWe87BC9xOCXoPklV7kvezvxcqPPUGRXIecdmA3fm%2B379C44NJuYZ%2Fs%2BZpOD2QycYRdGnLwLMHj7fs%2FtSAtppYKw%2FnSATzvke1uI6A8m7wKprLELjGENGoZ2hod%2Fix9jBfktRWI9q8xr%2BABcv4OY28GYD8IpLbUppsqFtDy4nWlI5TGesC65h3%2FPO6i3AHh3TPtbK8z6FQPDTDTskzOUiO2omGn%2BAM5xMEpgDLQ7hNNaAV4cdTJ4B5SbKXTRrjjaF5ZNRhPWgjX8Lq31ZgDvCguwBMt5GeAHR%2BA%2BuKWHtiXYj1HTmakjjz8BeVc5oKUg%2FLvE%2B9SgA8z8PFx3nsmkZSxhtef5DEX6GQDvaLAfJLn56wz%2Bjtbu%2F9i8nJ5OsiOT2d45MNKpmT7qMK5M819H%2BXtY6Gn7wGR4JfW6sYSVyY88m9K3gW%2BCcT85%2FMCm7rZNSe2YjdgdJAw7wWa2f9GInMS29fkrg71tn0ms%2FRUMN5KwMnnvOiJ8q4LfJl76NTOt3K%2Bdu9LyxmiyIMqb4RmOn%2FPBNznAqZPVN%2Bj6G4M9rpEvKIwkrGy%2F9z0AqVhulsE%2FZqb%2FNpRzv2vQDRe6K5m893Em%2FmsH9J7QhcdRoK%2F%2BcLCXdsTRtEZschtpHNe2zHwWkZFcPB7yR4n4HwZT%2BrdvPBDVnBdy7j0A7sn2eX%2FGxJ8kovnVtEtqHQLellTbK9ltJGGBYGxiKDMe86E%2BNZyjn1UKrL1WGoHBXldG39%2Bbv4o%2FqFxvJYEuKl0z4aUK%2Fy%2FhHpQ030zCAv1fAOeV9DihhcEra0JvIdcmSdv20yACm2%2BkHwGYlxnwroKPO4lweoMiY9NcUnYGe%2BjV2BgUoiFGrtbgAPeGiFFLRTHjNz5RTyHX9r5CjyWrsINR6HYfwHHqbPbpc8zYH7b8Vshjh77aCr3N0Gnsg56O%2FpGnZTH%2FZoAYlQ5ZZXKvclds6woSi6NSY%2BWOITB%2FDb%2FD9fTfg3BtYkFhfGcw516TWPsnMdxYwjp%2FDR93gqcfTei%2BggXtqBuGP0E%2FnyR%2B9nIECMzr5%2FNdePcQ6P0RiI9OJGP9YM79aHQKWi%2FZyL%2BEAuu2LnrrFa0WMeOp1sNcnQU%2Bw2fmzw%2FuVBdbsqoOsyhqSerSK577IWZ8Iwr5Uchk4IHBWcr4TVSMHWEVO8X5a7jtBE9viPsmE8x4zYX6yMYcSaK2%2FcQEgUy%2Ft5gY%2Fxjnrd%2BErArd6uo0rPVuPGFJvw9IS%2BuHCVgUk%2FvgKDMYGIRSS01OWj3K4YR9yQzwmWDvkVj%2BRWTcO9ijrksDWUm3SQVhiaOyYBxm6fVEWBKb%2B4XhMdFnC93OV9PS4WKDfY2GjI7UvTuI6KYam0ZXnbF2sEd1panvpIawir0m0%2B89QEDLH0wy4RVPq49s6SVZUcJ%2BEoJAZsC7HIz7gmWeW2gzM%2FoKOXd5C01oiWpjH7qXQ7MwU%2F25%2FOcvd70Z5T74J8pVf2zJqhloh6uj0O1%2B33PVBwG8HK7k6qWllawEodSNsIJuwUyZAX0%2FIViCpPqeEkJNeV61V6nL5S1mCOKsiBYhkFnDM6G9Jwh0fjNNSDNZCc7pJCzxnJmy%2FXpdUycJygPSWeovsZR0Mzu51RUNAplv8TTs1w8RcHk0Go6Wysx3FnJttx1dmq5v6SUsifMoaa0BYVn0YafbB3vUF6LXYzU0FQFZqvkb3t87TH8dpV6Zn1fIta2IUkcSZKebsMYilM17d0VFWgyMyCguyFlLQo%2BwNtaFQHveu1YRvglA1SWgQiNmuq2QU3dWqJKaS5awxkKdyY98PYJX1geIeFFalypOzV005mhnfuRPmUiWr5kWnu%2F0ycEetTI8ecmWZAlrXPwyeW81EXrHFdV%2FytinoS4dztHW%2BoXYlklDoD3Pcx3ojUSY3qjtRLR8U7fqa1SOSe0tYU2IZiY%2FIpMDb51QXNtXxj4fqnMoR8%2FW1tDWNgGBMEjLZ9wwlHPXmoBHmD6kbh7WZODJWxh5wDlZvXLXfcYeS1bl0ElHuYyqfagFYOyr1WMG2JJVedTsCKsMNpm8vpWI7yhzuXQxYzdDdRZytL10BVuaJgQ68nyBA72p2sTpMbK6bjjnGrMAZdjxtoRVAdEaSWsXfJUxcaeSChDZS5MgIKQF6I0O4cRKVYWsQLjavk2uhFKaJ45WxuXw1c4B3cvMqw8XlD7ZhUNq3uDN9Hzpy7Y0zQhk8nweQw9VIC3NhGssWU3eS%2BwIa3KM0JH3ljmEu0pVlXWsaER1WLIqhY4tKyJQgbS0T7hyqNt9uFjXHssjYB%2B6l8fm8BV5W0Og7sMFR05%2B5Ss135LVEUDsWWkE5LkmQXXIKh3jarzpM5ZYshqHyCSndoQ1CUDjL49NDPwbBhOBdrpT1c1PfZx%2BNb6OPbcIVELgvG%2FxySfv84It6BzX%2FfmmbjO346qEgb1mEbAIWAQsAhYBi4BFwCJgEbAIWAQsAhaBOhCI5BnWJffw740c8JaDcGFgE9Mb5PDAYHfbk3XYaJskBIHsKn4%2FlL6FiWeLycT0kvbVncPL6bmEuGDNrAOB7MDIpexTN4hPDuLuY6vX5q7e3EW%2FrkNcxSahE1YmP3InEX2ylFYGb%2FMd92N2z71S6CS37Pw1fNIJWq8jYHEZLx7ao9Qyu4N1GXQSWjz%2FG%2FzvHd%2F7rgM6t6QLPn9lsLftMyWv1VkYGmFVu5WW5NoBaoFNDK4zYjFrdvFafrs%2B5A0R0XsrmcbMz6spbscPltFrlerZa8lAoIYZ%2FBv2KrVkWxeNhOFZKPOwzl7FU4PNSqvY909m%2B0p%2B1ajDYbhgZbQKgc4BPt0%2FpLdORlZin9SRukJwrbLX6g0HgbHVKDZVmLl%2FWJHsBSrcIBxxuLCBk4ZHWGLIGa5%2BQrb%2Bq8kOu15UTXDFrXJAVqyfJiB4XlW1fYwXyVHtdv5R1YjFqmIDS%2BcUfumpy164kQ424lBDhHXhSp4%2BbZp%2BvGayGrOYGfvh88LC8rZCI07Yts1FoPNunu0f0kM1k1Ux7sBLzhTVsel6eqm5llttjSCQWT2SgUOPN7A4YeHAAbXwh7fQ%2FnrtqPsv4Zw8Hz9lmrexXrISg8VxcuiJAIh6PbDtmopAQFYH6xhZjbNSiM4%2FqJ8WWeOK7WmMEejoG7lE7tUGyEq8ywhnCHfU62pdI6wPreITp7veRgJdUK%2Fio9oxDvrMVwz1tj11VLn9EisEFvTzWR7rYSKcHoZhzHjVJdW%2BsYdeDEOelRENAmNktYGAtjA0MPjZ%2FZ674JkbaU%2Bt8momrHn9fIoLbxOBgnyoWhWWqy%2B7yxCwZLDH3VCuji1vHQLZr%2FN7uU0PESHUh%2Bay2oVLaq4lrdbFtpLmbL%2B3iIGHwyKroi4Gb9%2FvuR21klZNhDVGVpsJNKeoONQjwwNhsSWtUFFtWJiQFaboLQBmNiyshAC7RE8JUGJQJGQFxiMguFGYI6Tlwe3c0kO7q5Vf9TMs2ZrbhRcdWYnFAgzjkY4Bb0m1Dth60SKQ7eM5UZJVEHYZtU3RWwJd0bpjpVeJQHAPRkhWQdxB5wmnCLdUaRaqIqxg7oznbYlsZDXeWoLrMB6ypDUelNacy6JzIL05qpHVBK9mii5LWhNQacHXzIB3ldyDUY2sxrsUcIrnbal2ft6kfwllvg37ehiEs8YrasK5XTa2CSCXU1FhhcxyTcIptxt5hINjnVKErMC4n5q9fDrjRWeKmjtZJkTFEVZxcmALyErgVgKcbAFeJ%2Fa2WZ0ISBbCJGuQ1ym5imaEU0S3zYSoAquQqwT3WivISvwgnCWZEMI5ldwqS1jBfJt6ZjJX0lbjNWF5h7DOklaNwDVQXYhCUqeqSbtoQE3FpjZ9qyI8kVwc27dAEtgn%2FdcViQEiVEiLK8%2FPK0lYMt9GJvbVO5M5TIeKpCWAhinXyjoWgWKOWLX76B0rIcQSwvFCnGJTiFKtqBIIFDdZaSlZjdlVnFQsHFTC1GMfussrbI8loTWcyYGllNZaNkZad8mWW7W2tfWrQ0CyDRzojbEgq6LJo6S10ZJWEZDwj3JPldsRKnxt1UkU7hEOCqbTTGhy1PAv6vk2E3TX9ZWIlm%2FqVn11NbaNSiIgZCVpFyCEklFfUkkDhTbntAHwKjStcs%2FNChIiv3TMfp%2BH%2FxI2Y75NGO7JpqayI3MYsqwMoJgjFleykhgVc07FVhuzcBCQe6iKDYLDUVa%2FlJkT5%2BcFI6yArJxgJnOwxGn98pvZkv52sEd9uZkaTdOV7fMWwkGiUqEIWLipx%2F1fpsWimf5k%2BvRnyeEvNlNng7re8Bx10eZP0E%2Bd89fwcXD0YwASRFbiPv%2FXzMDIlxoEIrXNs33enyWNrIKoA49n%2B70PpzZwDTqe7Rv5csLISjw%2BWfn6UTlxTvD8vwLw7gZxaElzYvrbTH7kKy1RnmClmbz3ETh4JMEufC%2FT75VbPz7BbkVrekffyNfg0N9EqyUa6QT8frZf3%2BIAfqIDT0Sflo0vooHJPKmZvPdRIjyUdM8IeDjb5y1Nuh%2FNsr9jYGSl49AtzdIXjR6%2BwiGis6MR3jypsktPJu%2Btbp7GZGqStAsifCeZ1pew2sH9QSpJiUu26AgC2bx3l8Mk%2F6SS%2FWG8T94Sesn2YtR6IvRKYMB81FQNE3wLw4di2kWQ8hSGwHjICNK3LGmVCQYzBfcEwYhJ1z7gOMz8szLuJq%2BYsCwzoO9KnuHRWpzJex9XhG%2FHYSZz2J6KT8T4bvuA95dhy066vGy%2FXgtDyEpiQcBzDoiMusEJuL4j792T9M4Wlv3ZvO4hwt1hyYurHMW4J9uvb4irfc22K9vv3QvCx5utN0p9BPSPzsPq92Qt9QVRKmu2bAbuK%2FS4f9FsvXHS19GvlzvgVXGyKWpbNKh3uEflo9YTZ%2FnZvHcfCH8eZxtrtY2B7xd63CuCme67p6srmflfahUS5%2FoEXJPp974bZxujtG30FXC6yErwVOC%2Bzn59c5TYxll2Nu89aBpZ%2BcT%2FvN9TAQEffkAd%2Bk44MYkqMx7G62ppYQUZ8XKhGlgl7YKI76imrql1mOm2Qk6lZrpLZgW7mKXXE8Go5cUn7rBzmLCk48p%2BYbMo2BEnnO27YnI3MLABO9XiNJBWdkB%2FDsxfiAn0LTUjLaR1%2FhpuO0Fr2dlmUUsBD1m5D966i91Ld%2BRoX1H04eRnKZALr7PbKRWLFUw4BoE8TT8igTXBn3I%2BZPIjd1iyOoKOjDIzA%2Fr2IyXmnQVk5WnZM9A4sjp0wF0wnqwkekcRlhRIBakIwKjt4yWgJ3h6w9mrOJZLqDR6KwlZEZFdxWICkMS8IiDyCeUmfJW%2BLH2aCKatYlEQDiq1pf1RfwnHB1HAeKfSj5kIxi89ddkLN9LB8f4m%2BVxm%2BcvE2ST7ELXtzHxnIdd2W9R6miX%2FwpU8fdo0%2Fbhs%2F94snc3Qw4ynXtHqinL3Z1nCEuMODzcNZPADB9TCUgzejKCEqcOSVfVoMqOvkHOXV98injWFrKZM8zY6IKOWjxay2uuqRdu6aKQc8hUJSxqZ%2FECv3LCzHFixKpe0i369xqSZzE3Bl7F2MOcmdoKpvBibSd6TxpEVsGGvUksqkZX0j2OeYU3sNIGAnWpxMD1g4sUEf5eAy6%2BUdIDEuTFKVussWdUROcKypOacFt%2FiG0dWMvVop1o8GVlJtCcdYR3uEutZZXbp%2Bwi46nCZAScT53nE3qUjZGX3a2wkWIx7B3vUdUEmYiNymtTW2HmSwAOFmeoaLCVdDZTVE5ZIY6bMgJZdYU0jre37PbfjmRtpTzWgtayOoT8arcKT5WbpVlfHnbTm9fMpLoL5kee1Cqso9NaDf22EJVYb%2BgvP4O0e3M4tPbQ7iuA0LFPI6nX9kGkzmRvGpUEBwU1Twy98g%2Bpqbj5GVpsJNKfmxnFuUOcIt3bCEhAMfeDL4B1QbqbQRbviFGtT0y7igrE8ny3MUldW%2B7ekWXZn1vBMaK9gIFmtHexRXfWMbOsjrLGImbQ4WLETMvPzcN15cSGtgKxO04%2BYNpO5iHdcjnHLOb14Lb9dH%2FKGiOi9ccEoDDsanVrSEGGJAybOAxLSUlPcjh8so9fCCFK9MkydUlIvHlG3k5zTal6tR22HkJV%2FSG8FoeR27VHrj0p%2Bo2Qldk06rWEy42Uinswinqxekq7Lr5p0GOk4rbL7cNqFYTlircKzGr3F9C35oaimfhR1Ogf4dDPJSjINGp%2B02zBhSdAk5cH3DVshgHCWdBzpQFF0zEoyhazOcPUTBqZFVXI7FtcE81blnHbezbN91k%2BbN7Liz4eVFtXwX8LxvczEdZgYeMmZojo2XU8vjfc1qnNTc8SiwitCuYVm5pwGZHVQP02Epv9ARoihvJ8LdV2yUAlLHDeStBivOlPVRVGTlqlpF1HeEBHLLjQj53RBP5%2FlsR42jayIaPmmbtUXZoxCJywxrnNA9zKzUfsEMuNVl1T7xh56McwAFGUV0y4IZNTiiUX%2FknostYhcmL6MkdVWIrTseWmY%2FhRlRUFWIjsSwhLBHXlvGRHWmLS1FDNec0nNDZu0TE27KHbepB8lfUsWtpy4mFyjfmW%2Fzu%2FlNj1kElmxzNJkdA3l3LWN4lOqfWSEJcpk806HsM400qIR1TF4Mz1fCtBay0xNu6gVh7jXDzvnNNvHc%2BBoWSRzZtx9r9Y%2BISufcd1wzr232ja11gvlLWE5pYHhDKM2uAx%2BDafozZkB%2FsNyfldbfuHdfKpL3hCBjMoR88E%2FYeLnqsUhCfXkr%2Fp05RXkB6ZRe9tX8zm%2Bo4dNIivBJGqyEh2REpYoKOTcdRpm7ZEGYBazHsqu4vfX23kl7WLKIW%2BQmM6pV0Yc2zFj3VBP2%2FsL3W3nAvh2HG2s1yYi%2BoAkITdCWvP7%2BI%2BUo4cc4NR67YhjOyZ8LMqRVdHnSP8SFpXIsWPAW%2BL4WA%2BCO7480eeM3QzVWcjR9lr8CHLEPG%2BLaWkXmJjQam6ifF05px15vgDQGx3CibX0l1jXZXi%2Bg6VD3e7DzbAz8hFW0YnAIcJiMMzZH5BwCkMPjXbEoqeVj8HseTPJShJaj15fioiDMkYkD2ArIx3d1SAZ2fO2BD88VaqRPuJAbzKNrEBY3CyyEqibRliibLDH3SAOMlB2zeYq4x%2BbatIBpSNWQ1rFtAvTRlaSIxYsO0zExwRGSCvn3iB1jrmW4IIghp63pZr0rfY8z5U%2BAkLyVrctE6PgHiYsDu7pMnWiKG4qYYkD4iD7vAgMY3atkY4oHVI6ZrkgBWRlZtpFVTliJuecVkrfGiOrjSaRldy7cg83m6zk3mo6YYnSod62p9jnywwkrY2lSKuYI0bA7HKElsTyWrfOknwy0xLlJe9P8v9KkVZm9UjGgd5IhOlJjG8pm5mxX%2B5duYdLXY%2B6rCWEJU4VlrcVxHEBIGonmyVfOqZ0UOmoRZ0yk9mXHDHDyApEf1dPQutoGzJqN2aJbUBad%2FPhH6SOvpFLyCFJYDeKrHyoBXLvFvt3s49Ne0tYzrH5q%2Fki19FPGDVkBg744JUM51cO8%2BdMmskscQwjoTXbr28D%2BKvl%2BkUiyxn%2F5jv0BdL%2BbHLoU4n0oZzRjH0a6tLhHG0tV6UZ5S0nLHHSyNe9zYheC3SEmSNmYs5pC0ISuUqfsQdQC4Zy9GzkyiZREAvCEhszeT5PpggY9dp3EvCTdDmqHDHJOXUIdyUJi1TZWudcw6gwig1hiYNCWjT6%2Brfh9IeoAEuj3KhzxExMlDeinzB2g9X8wV7aERd%2FYkVYAoqJSaFxCXY9dkRNVkWbTEyUL%2FqW0OMu%2BCoTJ7ISHGNHWGKUictuJLTTaiZcU%2Bh2H2iG%2FZkB7ypi3AdANUOf1VEaAVlGKcwVSUprqa80loQlrpi6sFl9YWpBqybniBU9DHJOGQ9Z0ioi0txjVGu%2BheVFy%2BZhTeaALJIni%2BXJSp%2BT1bXXQ0ZA8j2bnCNW9EDy0nzClUblnBadi%2FlxbFXd0BeoDNPt2I6wik4Gs8QP6SHjJl4WHYzZUXLECFjSirSL8VBk%2B71FDDxMQMu23Bpvj%2Bnnzd5spV48YzvCKjokGz84pC4CI5K11It67FFmhLYuR2wi%2FkbmnE50Mi7fGS%2FKPRb1JithuBv7EVbRSVN3wy361%2BpjkCLl88JWpl2UwkDSnCTFBYSppa7bsgYRELKaoua2epfzar2I%2FQir6IgAKsDKNvLFMnsMCQHGvlbniJXzxMSc03K%2BNrtc7qUkkZXgk5gRVjGYwaJp2isEi6gVC%2B2xfgRGyaozDmkXlZyQVTAU9JOG5ZxWcjnSawyua9XUSI2qQnjiCEt8GttpZrMlrSoiXKFKnHLEKph5%2BJLNOT0MRUMnDN7uwe3c0kO7GxLUgsaJJCzByW6P1WBviVmOWLXe2PStapEqXU%2FIar%2FndjxzI%2B0pXSPepYl5hjURRvl1EOBlv7iJ1%2Bz3SRHYJTlitW6eManUJlQIbGY1H5LnZj81ITC2t2JiyUqcTewIqxgp2eJ9JnlPOqCyyxMX69pjgMAuHFLzwtoItlWY2pzT2pD3wVt3sXtp2LtX12ZF47UTO8Iqui4BOHTAXSABKZbZY2kEJO3CBLIS74Kk3ENqXuBTaXdt6REECnKPJJ2sxJ3Ej7CKMblwJU%2BfNk0%2FLqvUFMvs8QgCY2kX7ZLydKQ0%2BWdjOafDRDg9%2Bd5E4kHhl5667IUbyYhNX4whLAn12at46qA5Wb8AAAVoSURBVDuVfowIl0QS%2BoQKTUraRb3wBulbsm6%2BJa2jIGTGU69odYUpZCXOJf4v4fgISWD2ukpy0DaML0%2F1eYLSLuqNU5C%2BNVVdJMRcrwzT2sk9IPeCSWQlMTKKsMShbV00gp1KNmu1pDWWdrGpm4xf8cLmnB6h3KDv71SLg3vhSLERZ8YRlkSlsIK8gLQYDxsRpTqcSGLaRR1uHtVEiDnt6VssfX6nWhzcA0ehY8YXo55hHROS9awyu%2FR9BFx1zDWDC5KadhFWSIL0Lc%2FbEmwnH5bQBMhh4IHCTHUNlpJOgLl1mWg2YQkkzJTt1%2BtAuLYuhBLWKMlpF2FCnbqcU8a9gz3qOhBxmDjGTZb5hCWIp4S0kp52EfbNkZr0rZSQlfQPI59hHdPxiTj49WGsPeaaIQUmpF2EHYpUpG8x1qZhZFXsG%2BkYYRW9DfY%2B9FYToXdcUeJPTUm7iCoQpqZvMaOvkHOXR4VbHOWmY4Q1DnkJsAR6XFHST41Ju4gqECambzHznWkjK%2BkfqRthFW%2BKTH7kDiK6tfg9iUcTZzJHGQdT0rdGyarttiixiqvs1BKWBCQzoG8n5hVxDU4lu4SsZCaziZMDK%2Fnd6LXkp2%2FR7YM96guN4pDU9qkmLAlaJq9vJeI7khTAIO1CqSWWrOqL2vlruO0ErWULsUX1SWhNK2a6rZBTd7ZGezy0pu4Z1kTYpQMQUWIeXBZnMluymhjJ6r8H2CUsfUv6aNrJSiKc%2BhFWsZt3DuheZl5d%2FB7HYxpmMjcT98wKdjFLryfCkmbqrVWXz7hhKOcaOyWnFjwsYY1DqyPvLSPCGoohkQdk1a2uNn0m87hwNOc0xulbLFOeGV2WrI50BUtYR7AIztrz3rUOYV2sSCtFM5knhKM5X2OYCSFk5TOuG8659zYHhGRosYRVIk6ZAe8qMO6PBWmNzmTusiOrEoEKsyhGpCVkBcLVhW73gTBdNEFW6h%2B6lwpi0FEIVwNoada7THAdzLk3WLIqFaWQy%2BKTvqUtWZWPrR1hlccGHQPeEsfHehDcCtUiuZTmyYGRAFqD0Ey%2BRelbDM93sHSo203tOm6ThcmOsCogFHQcgqxeOlKhWuiXLFmFDmlNAkfTt7ip852CPkZYbMmqcqgsYVXGB4M97gb2WdaJbxJp0e2FXDrTLiYJRVMvBzFg%2FmIzlErfkj4mfa0Z%2BpKsw%2F4lrDJ6HX0jlzhEj4EwtcomNVezM5lrhizyBpFnQjAO%2BsxXDPW2PRW5MwYosIRVQxAzq0cycOhxIkyvoVlVVWUm86ZuZdIqElX5nYRKUZEWM%2FbD54WF5W2FJOAQBxstYdUYhfY8z3WgN4ZJWnYmc41BaEH10DMhGPs01KXDObI7ltcQT0tYNYBVrCqkpaCfBOH4Ylk9RzuTuR7UWtcmtEwIxj4fqnMoR8%2B2zptkaraEVWfcOvJ8AaA3OoQT6xFhZzLXg1rr2zSaCeEz9gBqgSWr%2BmJpCas%2B3IJWmTyfR9CbQDilRjGaCdfYmcw1ohaT6nWTFmM3Q3UWcrQ9Jq4kzgxLWA2GLNvHc0B6c9WkZScHNoh4PJpL%2BhYx7gOgqrRoF3yVGeylHVXWt9VKIGAJqwQotRYFpOVoedMzs2JbhgfCYjvfpiJKiblYQybELhxS8wZvpucT41xMDbUTR0MIjPxqakfN9X3%2BaVlxjN0%2B80JLVmURStwFmZVO4EWjz6VKmy%2B7cEvfsGRVGp9aS%2B0Iq1bEJqnfPqC7iP1bHNB7pCozXiOiVXuUk9%2FWRb%2BbpLm9nEAEZMPWNvJ7wSwr184K4g7%2BGZi%2BVsi59yTQJWty2hBoX8vvnt%2FP56bN77T7KzHvvJtnpx2HqPz%2F%2F6omxnsqyGCHAAAAAElFTkSuQmCC%22%2F%3E%20%20%3C%2Fdefs%3E%3C%2Fsvg%3E";

/**
 * Given a URI that may be ipfs, ipns, http, https, or data protocol, return the fetch-able http(s) URLs for the same content
 * @param uri to convert to fetch-able http url
 */
function uriToHttp(uri) {
    var _a, _b, _c;
    const protocol = uri.split(':')[0].toLowerCase();
    switch (protocol) {
        case 'data':
            return [uri];
        case 'https':
            return [uri];
        case 'http':
            return ['https' + uri.substr(4), uri];
        case 'ipfs':
            const hash = (_a = uri.match(/^ipfs:(\/\/)?(.*)$/i)) === null || _a === void 0 ? void 0 : _a[2];
            return [`https://cloudflare-ipfs.com/ipfs/${hash}/`, `https://ipfs.io/ipfs/${hash}/`];
        case 'ipns':
            const name = (_b = uri.match(/^ipns:(\/\/)?(.*)$/i)) === null || _b === void 0 ? void 0 : _b[2];
            return [`https://cloudflare-ipfs.com/ipns/${name}/`, `https://ipfs.io/ipns/${name}/`];
        case 'ar':
            const tx = (_c = uri.match(/^ar:(\/\/)?(.*)$/i)) === null || _c === void 0 ? void 0 : _c[2];
            return [`https://arweave.net/${tx}`];
        default:
            return [];
    }
}

/**
 * Returns the ENS avatar URI, if available.
 * Spec: https://gist.github.com/Arachnid/9db60bd75277969ee1689c8742b75182.
 */
function useENSAvatar(address, enforceOwnership = true) {
    const debouncedAddress = useDebounce(address, 200);
    const node = useMemo(() => {
        if (!debouncedAddress || !isAddress(debouncedAddress))
            return undefined;
        return namehash(`${debouncedAddress.toLowerCase().substr(2)}.addr.reverse`);
    }, [debouncedAddress]);
    const addressAvatar = useAvatarFromNode(node);
    const ENSName = useENSName(address).ENSName;
    const nameAvatar = useAvatarFromNode(ENSName === null ? undefined : safeNamehash(ENSName));
    let avatar = addressAvatar.avatar || nameAvatar.avatar;
    const nftAvatar = useAvatarFromNFT(avatar, enforceOwnership);
    avatar = nftAvatar.avatar || avatar;
    const http = avatar && uriToHttp(avatar)[0];
    const changed = debouncedAddress !== address;
    return useMemo(() => ({
        avatar: changed ? null : http !== null && http !== void 0 ? http : null,
        loading: changed || addressAvatar.loading || nameAvatar.loading || nftAvatar.loading,
    }), [addressAvatar.loading, changed, http, nameAvatar.loading, nftAvatar.loading]);
}
function useAvatarFromNode(node) {
    var _a;
    const nodeArgument = useMemo(() => [node], [node]);
    const textArgument = useMemo(() => [node, 'avatar'], [node]);
    const registrarContract = useENSRegistrarContract(false);
    const resolverAddress = useSingleCallResult(registrarContract, 'resolver', nodeArgument);
    const resolverAddressResult = (_a = resolverAddress.result) === null || _a === void 0 ? void 0 : _a[0];
    const resolverContract = useENSResolverContract(resolverAddressResult && !isZero(resolverAddressResult) ? resolverAddressResult : undefined, false);
    const avatar = useSingleCallResult(resolverContract, 'text', textArgument);
    return useMemo(() => {
        var _a;
        return ({
            avatar: (_a = avatar.result) === null || _a === void 0 ? void 0 : _a[0],
            loading: resolverAddress.loading || avatar.loading,
        });
    }, [avatar.loading, avatar.result, resolverAddress.loading]);
}
function useAvatarFromNFT(nftUri = '', enforceOwnership) {
    var _a, _b, _c, _d;
    const parts = nftUri.toLowerCase().split(':');
    const protocol = parts[0];
    // ignore the chain from eip155
    // TODO: when we are able, pull only from the specified chain
    const [, erc] = (_b = (_a = parts[1]) === null || _a === void 0 ? void 0 : _a.split('/')) !== null && _b !== void 0 ? _b : [];
    const [contractAddress, id] = (_d = (_c = parts[2]) === null || _c === void 0 ? void 0 : _c.split('/')) !== null && _d !== void 0 ? _d : [];
    const isERC721 = protocol === 'eip155' && erc === 'erc721';
    const isERC1155 = protocol === 'eip155' && erc === 'erc1155';
    const erc721 = useERC721Uri(isERC721 ? contractAddress : undefined, id, enforceOwnership);
    const erc1155 = useERC1155Uri(isERC1155 ? contractAddress : undefined, id, enforceOwnership);
    const uri = erc721.uri || erc1155.uri;
    const http = uri && uriToHttp(uri)[0];
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(undefined);
    useEffect(() => {
        setAvatar(undefined);
        if (http) {
            setLoading(true);
            fetch(http)
                .then((res) => res.json())
                .then(({ image }) => {
                setAvatar(image);
            })
                .catch((e) => console.warn(e))
                .finally(() => {
                setLoading(false);
            });
        }
    }, [http]);
    return useMemo(() => ({ avatar, loading: erc721.loading || erc1155.loading || loading }), [avatar, erc1155.loading, erc721.loading, loading]);
}
function useERC721Uri(contractAddress, id, enforceOwnership) {
    const idArgument = useMemo(() => [id], [id]);
    const { account } = useActiveWeb3React();
    const contract = useERC721Contract(contractAddress);
    const owner = useSingleCallResult(contract, 'ownerOf', idArgument);
    const uri = useSingleCallResult(contract, 'tokenURI', idArgument);
    return useMemo(() => {
        var _a, _b;
        return ({
            uri: !enforceOwnership || account === ((_a = owner.result) === null || _a === void 0 ? void 0 : _a[0]) ? (_b = uri.result) === null || _b === void 0 ? void 0 : _b[0] : undefined,
            loading: owner.loading || uri.loading,
        });
    }, [account, enforceOwnership, owner.loading, owner.result, uri.loading, uri.result]);
}
function useERC1155Uri(contractAddress, id, enforceOwnership) {
    const { account } = useActiveWeb3React();
    const idArgument = useMemo(() => [id], [id]);
    const accountArgument = useMemo(() => [account || '', id], [account, id]);
    const contract = useERC1155Contract(contractAddress);
    const balance = useSingleCallResult(contract, 'balanceOf', accountArgument);
    const uri = useSingleCallResult(contract, 'uri', idArgument);
    return useMemo(() => {
        var _a, _b;
        return ({
            uri: !enforceOwnership || ((_a = balance.result) === null || _a === void 0 ? void 0 : _a[0]) > 0 ? (_b = uri.result) === null || _b === void 0 ? void 0 : _b[0] : undefined,
            loading: balance.loading || uri.loading,
        });
    }, [balance.loading, balance.result, enforceOwnership, uri.loading, uri.result]);
}

const StyledIdenticon = styled.div `
  height: 1rem;
  width: 1rem;
  border-radius: 1.125rem;
  background-color: ${({ theme }) => theme.bg4};
  font-size: initial;
`;
const StyledAvatar = styled.img `
  height: inherit;
  width: inherit;
  border-radius: inherit;
`;
function Identicon() {
    const { account } = useActiveWeb3React();
    const { avatar } = useENSAvatar(account !== null && account !== void 0 ? account : undefined);
    const [fetchable, setFetchable] = useState(true);
    const icon = useMemo(() => account && jazzicon(16, parseInt(account.slice(2, 10), 16)), [account]);
    const iconRef = useRef(null);
    useLayoutEffect(() => {
        const current = iconRef.current;
        if (icon) {
            current === null || current === void 0 ? void 0 : current.appendChild(icon);
            return () => {
                current === null || current === void 0 ? void 0 : current.removeChild(icon);
            };
        }
        return;
    }, [icon, iconRef]);
    return (jsx(StyledIdenticon, { children: avatar && fetchable ? (jsx(StyledAvatar, { alt: "avatar", src: avatar, onError: () => setFetchable(false) }, void 0)) : (jsx("span", { ref: iconRef }, void 0)) }, void 0));
}

function StatusIcon({ connector }) {
    switch (connector) {
        case injected:
            return jsx(Identicon, {}, void 0);
        case walletconnect:
            return jsx("img", { src: WALLETCONNECT_ICON_URL, alt: 'WalletConnect' }, void 0);
        case walletlink:
            return jsx("img", { src: COINBASE_ICON_URL, alt: 'Coinbase Wallet' }, void 0);
        case fortmatic$2:
            return jsx("img", { src: FORTMATIC_ICON_URL, alt: 'Fortmatic' }, void 0);
        case portis:
            return jsx("img", { src: PORTIS_ICON_URL, alt: 'Portis' }, void 0);
        default:
            return null;
    }
}

var MetaMaskLogo = "f89237c6bc3f84db.png";

var _line$1, _line2;

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

const SvgX = props => /*#__PURE__*/React.createElement("svg", _extends$4({
  xmlns: "http://www.w3.org/2000/svg",
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "feather feather-x"
}, props), _line$1 || (_line$1 = /*#__PURE__*/React.createElement("line", {
  x1: 18,
  y1: 6,
  x2: 6,
  y2: 18
})), _line2 || (_line2 = /*#__PURE__*/React.createElement("line", {
  x1: 6,
  y1: 6,
  x2: 18,
  y2: 18
})));

var INJECTED_ICON_URL = "data:image/svg+xml,%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M9.79261%2016.1108L17.5398%208.36364L9.79261%200.616477L8.25852%202.15057L13.3807%207.25568H0V9.47159H13.3807L8.25852%2014.5852L9.79261%2016.1108Z%22%20fill%3D%22%23333639%22%2F%3E%3C%2Fsvg%3E";

const SUPPORTED_WALLETS = {
    INJECTED: {
        connector: injected,
        name: 'Injected',
        iconURL: INJECTED_ICON_URL,
        description: 'Injected web3 provider.',
        href: null,
        color: '#010101',
        primary: true,
    },
    METAMASK: {
        connector: injected,
        name: 'MetaMask',
        iconURL: MetaMaskLogo,
        description: 'Easy-to-use browser extension.',
        href: null,
        color: '#E8831D',
    },
    WALLET_CONNECT: {
        connector: walletconnect,
        name: 'WalletConnect',
        iconURL: WALLETCONNECT_ICON_URL,
        description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
        href: null,
        color: '#4196FC',
        mobile: true,
    },
    WALLET_LINK: {
        connector: walletlink,
        name: 'Coinbase Wallet',
        iconURL: COINBASE_ICON_URL,
        description: 'Use Coinbase Wallet app on mobile device',
        href: null,
        color: '#315CF5',
    },
    COINBASE_LINK: {
        name: 'Open in Coinbase Wallet',
        iconURL: COINBASE_ICON_URL,
        description: 'Open in Coinbase Wallet app.',
        href: 'https://go.cb-w.com/mtUDhEZPy1',
        color: '#315CF5',
        mobile: true,
        mobileOnly: true,
    },
    FORTMATIC: {
        connector: fortmatic$2,
        name: 'Fortmatic',
        iconURL: FORTMATIC_ICON_URL,
        description: 'Login using Fortmatic hosted wallet',
        href: null,
        color: '#6748FF',
        mobile: true,
    },
    Portis: {
        connector: portis,
        name: 'Portis',
        iconURL: PORTIS_ICON_URL,
        description: 'Login using Portis hosted wallet',
        href: null,
        color: '#4A6C9B',
        mobile: true,
    },
};

// modified from https://usehooks.com/usePrevious/
function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
}

function useCopyClipboard(timeout = 500) {
    const [isCopied, setIsCopied] = useState(false);
    const staticCopy = useCallback((text) => {
        const didCopy = copy(text);
        setIsCopied(didCopy);
    }, []);
    useEffect(() => {
        if (isCopied) {
            const hide = setTimeout(() => {
                setIsCopied(false);
            }, timeout);
            return () => {
                clearTimeout(hide);
            };
        }
        return undefined;
    }, [isCopied, setIsCopied, timeout]);
    return [isCopied, staticCopy];
}

const CopyIcon = styled(LinkStyledButton) `
  color: ${({ theme }) => theme.text3};
  flex-shrink: 0;
  display: flex;
  text-decoration: none;
  font-size: 0.825rem;
  :hover,
  :active,
  :focus {
    text-decoration: none;
    color: ${({ theme }) => theme.text2};
  }
`;
const TransactionStatusText$1 = styled.span `
  margin-left: 0.25rem;
  font-size: 0.825rem;
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
`;
function CopyHelper(props) {
    const [isCopied, setCopied] = useCopyClipboard();
    return (jsxs(CopyIcon, Object.assign({ onClick: () => setCopied(props.toCopy) }, { children: [isCopied ? (jsxs(TransactionStatusText$1, { children: [jsx(CheckCircle, { size: '16' }, void 0), jsx(TransactionStatusText$1, { children: jsx(Trans, { children: "Copied" }, void 0) }, void 0)] }, void 0)) : (jsx(TransactionStatusText$1, { children: jsx(Copy$1, { size: '16' }, void 0) }, void 0)), isCopied ? '' : props.children] }), void 0));
}

var VoteOption;
(function (VoteOption) {
    VoteOption[VoteOption["Against"] = 0] = "Against";
    VoteOption[VoteOption["For"] = 1] = "For";
    VoteOption[VoteOption["Abstain"] = 2] = "Abstain";
})(VoteOption || (VoteOption = {}));

function formatAmount(amountRaw, decimals, sigFigs) {
    return new Fraction(amountRaw, JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals))).toSignificant(sigFigs);
}
function FormattedCurrencyAmount({ rawAmount, symbol, decimals, sigFigs, }) {
    return (jsxs(Fragment, { children: [formatAmount(rawAmount, decimals, sigFigs), " ", symbol] }, void 0));
}
function FormattedCurrencyAmountManaged({ rawAmount, currencyId, sigFigs = 6, }) {
    var _a;
    const currency = useCurrency(currencyId);
    return currency ? (jsx(FormattedCurrencyAmount, { rawAmount: rawAmount, decimals: currency.decimals, sigFigs: sigFigs, symbol: (_a = currency.symbol) !== null && _a !== void 0 ? _a : '???' }, void 0)) : null;
}
function ClaimSummary({ info: { recipient, uniAmountRaw } }) {
    const { ENSName } = useENSName();
    return typeof uniAmountRaw === 'string' ? (jsxs(Trans, { children: ["Claim ", jsx(FormattedCurrencyAmount, { rawAmount: uniAmountRaw, symbol: 'UNI', decimals: 18, sigFigs: 4 }, void 0), " for", ' ', ENSName !== null && ENSName !== void 0 ? ENSName : recipient] }, void 0)) : (jsxs(Trans, { children: ["Claim UNI reward for ", ENSName !== null && ENSName !== void 0 ? ENSName : recipient] }, void 0));
}
function SubmitProposalTransactionSummary(_) {
    return jsx(Trans, { children: "Submit new proposal" }, void 0);
}
function ApprovalSummary({ info }) {
    const token = useToken(info.tokenAddress);
    return jsxs(Trans, { children: ["Approve ", token === null || token === void 0 ? void 0 : token.symbol] }, void 0);
}
function VoteSummary({ info }) {
    const proposalKey = `${info.governorAddress}/${info.proposalId}`;
    if (info.reason && info.reason.trim().length > 0) {
        switch (info.decision) {
            case VoteOption.For:
                return jsxs(Trans, { children: ["Vote for proposal ", proposalKey] }, void 0);
            case VoteOption.Abstain:
                return jsxs(Trans, { children: ["Vote to abstain on proposal ", proposalKey] }, void 0);
            case VoteOption.Against:
                return jsxs(Trans, { children: ["Vote against proposal ", proposalKey] }, void 0);
        }
    }
    else {
        switch (info.decision) {
            case VoteOption.For:
                return (jsxs(Trans, { children: ["Vote for proposal ", proposalKey, " with reason \"", info.reason, "\""] }, void 0));
            case VoteOption.Abstain:
                return (jsxs(Trans, { children: ["Vote to abstain on proposal ", proposalKey, " with reason \"", info.reason, "\""] }, void 0));
            case VoteOption.Against:
                return (jsxs(Trans, { children: ["Vote against proposal ", proposalKey, " with reason \"", info.reason, "\""] }, void 0));
        }
    }
}
function DelegateSummary({ info: { delegatee } }) {
    const { ENSName } = useENSName(delegatee);
    return jsxs(Trans, { children: ["Delegate voting power to ", ENSName !== null && ENSName !== void 0 ? ENSName : delegatee] }, void 0);
}
function WrapSummary({ info: { currencyAmountRaw, unwrapped } }) {
    if (unwrapped) {
        return (jsxs(Trans, { children: ["Unwrap ", jsx(FormattedCurrencyAmount, { rawAmount: currencyAmountRaw, symbol: 'WETH', decimals: 18, sigFigs: 6 }, void 0), " to ETH"] }, void 0));
    }
    else {
        return (jsxs(Trans, { children: ["Wrap ", jsx(FormattedCurrencyAmount, { rawAmount: currencyAmountRaw, symbol: 'ETH', decimals: 18, sigFigs: 6 }, void 0), " to WETH"] }, void 0));
    }
}
function DepositLiquidityStakingSummary(_) {
    // not worth rendering the tokens since you can should no longer deposit liquidity in the staking contracts
    // todo: deprecate and delete the code paths that allow this, show user more information
    return jsx(Trans, { children: "Deposit liquidity" }, void 0);
}
function WithdrawLiquidityStakingSummary(_) {
    return jsx(Trans, { children: "Withdraw deposited liquidity" }, void 0);
}
function MigrateLiquidityToV3Summary({ info: { baseCurrencyId, quoteCurrencyId }, }) {
    const baseCurrency = useCurrency(baseCurrencyId);
    const quoteCurrency = useCurrency(quoteCurrencyId);
    return (jsxs(Trans, { children: ["Migrate ", baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol, "/", quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol, " liquidity to V3"] }, void 0));
}
function CreateV3PoolSummary({ info: { quoteCurrencyId, baseCurrencyId } }) {
    const baseCurrency = useCurrency(baseCurrencyId);
    const quoteCurrency = useCurrency(quoteCurrencyId);
    return (jsxs(Trans, { children: ["Create ", baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol, "/", quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol, " V3 pool"] }, void 0));
}
function CollectFeesSummary({ info: { currencyId0, currencyId1 } }) {
    const currency0 = useCurrency(currencyId0);
    const currency1 = useCurrency(currencyId1);
    return (jsxs(Trans, { children: ["Collect ", currency0 === null || currency0 === void 0 ? void 0 : currency0.symbol, "/", currency1 === null || currency1 === void 0 ? void 0 : currency1.symbol, " fees"] }, void 0));
}
function RemoveLiquidityV3Summary({ info: { baseCurrencyId, quoteCurrencyId, expectedAmountBaseRaw, expectedAmountQuoteRaw }, }) {
    return (jsxs(Trans, { children: ["Remove", ' ', jsx(FormattedCurrencyAmountManaged, { rawAmount: expectedAmountBaseRaw, currencyId: baseCurrencyId, sigFigs: 3 }, void 0), " and", ' ', jsx(FormattedCurrencyAmountManaged, { rawAmount: expectedAmountQuoteRaw, currencyId: quoteCurrencyId, sigFigs: 3 }, void 0)] }, void 0));
}
function AddLiquidityV3PoolSummary({ info: { createPool, quoteCurrencyId, baseCurrencyId }, }) {
    const baseCurrency = useCurrency(baseCurrencyId);
    const quoteCurrency = useCurrency(quoteCurrencyId);
    return createPool ? (jsxs(Trans, { children: ["Create pool and add ", baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol, "/", quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol, " V3 liquidity"] }, void 0)) : (jsxs(Trans, { children: ["Add ", baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol, "/", quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol, " V3 liquidity"] }, void 0));
}
function AddLiquidityV2PoolSummary({ info: { quoteCurrencyId, expectedAmountBaseRaw, expectedAmountQuoteRaw, baseCurrencyId }, }) {
    return (jsxs(Trans, { children: ["Add ", jsx(FormattedCurrencyAmountManaged, { rawAmount: expectedAmountBaseRaw, currencyId: baseCurrencyId, sigFigs: 3 }, void 0), ' ', "and ", jsx(FormattedCurrencyAmountManaged, { rawAmount: expectedAmountQuoteRaw, currencyId: quoteCurrencyId, sigFigs: 3 }, void 0), ' ', "to Uniswap V2"] }, void 0));
}
function SwapSummary({ info }) {
    if (info.tradeType === TradeType.EXACT_INPUT) {
        return (jsxs(Trans, { children: ["Swap exactly", ' ', jsx(FormattedCurrencyAmountManaged, { rawAmount: info.inputCurrencyAmountRaw, currencyId: info.inputCurrencyId, sigFigs: 6 }, void 0), ' ', "for", ' ', jsx(FormattedCurrencyAmountManaged, { rawAmount: info.expectedOutputCurrencyAmountRaw, currencyId: info.outputCurrencyId, sigFigs: 6 }, void 0)] }, void 0));
    }
    else {
        return (jsxs(Trans, { children: ["Swap", ' ', jsx(FormattedCurrencyAmountManaged, { rawAmount: info.expectedInputCurrencyAmountRaw, currencyId: info.inputCurrencyId, sigFigs: 6 }, void 0), ' ', "for exactly", ' ', jsx(FormattedCurrencyAmountManaged, { rawAmount: info.outputCurrencyAmountRaw, currencyId: info.outputCurrencyId, sigFigs: 6 }, void 0)] }, void 0));
    }
}
function TransactionSummary({ info }) {
    switch (info.type) {
        case TransactionType.ADD_LIQUIDITY_V3_POOL:
            return jsx(AddLiquidityV3PoolSummary, { info: info }, void 0);
        case TransactionType.ADD_LIQUIDITY_V2_POOL:
            return jsx(AddLiquidityV2PoolSummary, { info: info }, void 0);
        case TransactionType.CLAIM:
            return jsx(ClaimSummary, { info: info }, void 0);
        case TransactionType.DEPOSIT_LIQUIDITY_STAKING:
            return jsx(DepositLiquidityStakingSummary, { info: info }, void 0);
        case TransactionType.WITHDRAW_LIQUIDITY_STAKING:
            return jsx(WithdrawLiquidityStakingSummary, { info: info }, void 0);
        case TransactionType.SWAP:
            return jsx(SwapSummary, { info: info }, void 0);
        case TransactionType.APPROVAL:
            return jsx(ApprovalSummary, { info: info }, void 0);
        case TransactionType.VOTE:
            return jsx(VoteSummary, { info: info }, void 0);
        case TransactionType.DELEGATE:
            return jsx(DelegateSummary, { info: info }, void 0);
        case TransactionType.WRAP:
            return jsx(WrapSummary, { info: info }, void 0);
        case TransactionType.CREATE_V3_POOL:
            return jsx(CreateV3PoolSummary, { info: info }, void 0);
        case TransactionType.MIGRATE_LIQUIDITY_V3:
            return jsx(MigrateLiquidityToV3Summary, { info: info }, void 0);
        case TransactionType.COLLECT_FEES:
            return jsx(CollectFeesSummary, { info: info }, void 0);
        case TransactionType.REMOVE_LIQUIDITY_V3:
            return jsx(RemoveLiquidityV3Summary, { info: info }, void 0);
        case TransactionType.SUBMIT_PROPOSAL:
            return jsx(SubmitProposalTransactionSummary, { info: info }, void 0);
    }
}

const TransactionStatusText = styled.div `
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  :hover {
    text-decoration: underline;
  }
`;
const TransactionState = styled(ExternalLink) `
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none !important;
  border-radius: 0.5rem;
  padding: 0.25rem 0rem;
  font-weight: 500;
  font-size: 0.825rem;
  color: ${({ theme }) => theme.primary1};
`;
const IconWrapper$3 = styled.div `
  color: ${({ pending, success, theme }) => (pending ? theme.primary1 : success ? theme.green1 : theme.red1)};
`;
function Transaction({ hash }) {
    var _a, _b;
    const { chainId } = useActiveWeb3React();
    const allTransactions = useAllTransactions();
    const tx = allTransactions === null || allTransactions === void 0 ? void 0 : allTransactions[hash];
    const info = tx === null || tx === void 0 ? void 0 : tx.info;
    const pending = !(tx === null || tx === void 0 ? void 0 : tx.receipt);
    const success = !pending && tx && (((_a = tx.receipt) === null || _a === void 0 ? void 0 : _a.status) === 1 || typeof ((_b = tx.receipt) === null || _b === void 0 ? void 0 : _b.status) === 'undefined');
    if (!chainId)
        return null;
    return (jsx("div", { children: jsxs(TransactionState, Object.assign({ href: getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION), pending: pending, success: success }, { children: [jsx(RowFixed, { children: jsxs(TransactionStatusText, { children: [jsx(TransactionSummary, { info: info }, void 0), " \u2197"] }, void 0) }, void 0), jsx(IconWrapper$3, Object.assign({ pending: pending, success: success }, { children: pending ? jsx(Loader, {}, void 0) : success ? jsx(CheckCircle, { size: "16" }, void 0) : jsx(Triangle, { size: "16" }, void 0) }), void 0)] }), void 0) }, void 0));
}

const HeaderRow$1 = styled.div `
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium `
    padding: 1rem;
  `};
`;
const UpperSection$1 = styled.div `
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`;
const InfoCard$1 = styled.div `
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 20px;
  position: relative;
  display: grid;
  grid-row-gap: 12px;
  margin-bottom: 20px;
`;
const AccountGroupingRow = styled.div `
  ${({ theme }) => theme.flexRowNoWrap};
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  color: ${({ theme }) => theme.text1};

  div {
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
  }
`;
const AccountSection = styled.div `
  padding: 0rem 1rem;
  ${({ theme }) => theme.mediaWidth.upToMedium `padding: 0rem 1rem 1.5rem 1rem;`};
`;
const YourAccount = styled.div `
  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  h4 {
    margin: 0;
    font-weight: 500;
  }
`;
const LowerSection = styled.div `
  ${({ theme }) => theme.flexColumnNoWrap}
  padding: 1.5rem;
  flex-grow: 1;
  overflow: auto;
  background-color: ${({ theme }) => theme.bg2};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  h5 {
    margin: 0;
    font-weight: 400;
    color: ${({ theme }) => theme.text3};
  }
`;
const AccountControl = styled.div `
  display: flex;
  justify-content: space-between;
  min-width: 0;
  width: 100%;

  font-weight: 500;
  font-size: 1.25rem;

  a:hover {
    text-decoration: underline;
  }

  p {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
const AddressLink = styled(ExternalLink) `
  font-size: 0.825rem;
  color: ${({ theme }) => theme.text3};
  margin-left: 1rem;
  font-size: 0.825rem;
  display: flex;
  :hover {
    color: ${({ theme }) => theme.text2};
  }
`;
const CloseIcon$2 = styled.div `
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
const CloseColor$1 = styled(SvgX) `
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`;
const WalletName = styled.div `
  width: initial;
  font-size: 0.825rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text3};
`;
const IconWrapper$2 = styled.div `
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium `
    align-items: flex-end;
  `};
`;
function WrappedStatusIcon$1({ connector }) {
    return (jsxs(IconWrapper$2, Object.assign({ size: 16 }, { children: [jsx(StatusIcon, { connector: connector }, void 0), connector === portis && (jsx(MainWalletAction, Object.assign({ onClick: () => {
                    portis.portis.showPortis();
                } }, { children: jsx(Trans, { children: "Show Portis" }, void 0) }), void 0))] }), void 0));
}
const TransactionListWrapper = styled.div `
  ${({ theme }) => theme.flexColumnNoWrap};
`;
const WalletAction = styled(ButtonSecondary) `
  width: fit-content;
  font-weight: 400;
  margin-left: 8px;
  font-size: 0.825rem;
  padding: 4px 6px;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
const MainWalletAction = styled(WalletAction) `
  color: ${({ theme }) => theme.primary1};
`;
function renderTransactions(transactions) {
    return (jsx(TransactionListWrapper, { children: transactions.map((hash, i) => {
            return jsx(Transaction, { hash: hash }, i);
        }) }, void 0));
}
function AccountDetails({ toggleWalletModal, pendingTransactions, confirmedTransactions, ENSName, openOptions, }) {
    const { chainId, account, connector } = useActiveWeb3React();
    const theme = useContext(ThemeContext);
    const dispatch = useAppDispatch();
    function formatConnectorName() {
        const { ethereum } = window;
        const isMetaMask = !!(ethereum && ethereum.isMetaMask);
        const name = Object.keys(SUPPORTED_WALLETS)
            .filter((k) => SUPPORTED_WALLETS[k].connector === connector && (connector !== injected || isMetaMask === (k === 'METAMASK')))
            .map((k) => SUPPORTED_WALLETS[k].name)[0];
        return (jsx(WalletName, { children: jsxs(Trans, { children: ["Connected with ", name] }, void 0) }, void 0));
    }
    const clearAllTransactionsCallback = useCallback(() => {
        if (chainId)
            dispatch(clearAllTransactions({ chainId }));
    }, [dispatch, chainId]);
    return (jsxs(Fragment, { children: [jsxs(UpperSection$1, { children: [jsx(CloseIcon$2, Object.assign({ onClick: toggleWalletModal }, { children: jsx(CloseColor$1, {}, void 0) }), void 0), jsx(HeaderRow$1, { children: jsx(Trans, { children: "Account" }, void 0) }, void 0), jsx(AccountSection, { children: jsx(YourAccount, { children: jsxs(InfoCard$1, { children: [jsxs(AccountGroupingRow, { children: [formatConnectorName(), jsxs("div", { children: [connector !== injected && connector !== walletlink && (jsx(WalletAction, Object.assign({ style: { fontSize: '.825rem', fontWeight: 400, marginRight: '8px' }, onClick: () => {
                                                            connector.close();
                                                        } }, { children: jsx(Trans, { children: "Disconnect" }, void 0) }), void 0)), jsx(WalletAction, Object.assign({ style: { fontSize: '.825rem', fontWeight: 400 }, onClick: () => {
                                                            openOptions();
                                                        } }, { children: jsx(Trans, { children: "Change" }, void 0) }), void 0)] }, void 0)] }, void 0), jsx(AccountGroupingRow, Object.assign({ id: "web3-account-identifier-row" }, { children: jsx(AccountControl, { children: ENSName ? (jsx(Fragment, { children: jsxs("div", { children: [connector && jsx(WrappedStatusIcon$1, { connector: connector }, void 0), jsxs("p", { children: [" ", ENSName] }, void 0)] }, void 0) }, void 0)) : (jsx(Fragment, { children: jsxs("div", { children: [connector && jsx(WrappedStatusIcon$1, { connector: connector }, void 0), jsxs("p", { children: [" ", account && shortenAddress(account)] }, void 0)] }, void 0) }, void 0)) }, void 0) }), void 0), jsx(AccountGroupingRow, { children: ENSName ? (jsx(Fragment, { children: jsx(AccountControl, { children: jsxs("div", { children: [account && (jsx(CopyHelper, Object.assign({ toCopy: account }, { children: jsx("span", Object.assign({ style: { marginLeft: '4px' } }, { children: jsx(Trans, { children: "Copy Address" }, void 0) }), void 0) }), void 0)), chainId && account && (jsxs(AddressLink, Object.assign({ hasENS: !!ENSName, isENS: true, href: getExplorerLink(chainId, ENSName, ExplorerDataType.ADDRESS) }, { children: [jsx(ExternalLink$1, { size: 16 }, void 0), jsx("span", Object.assign({ style: { marginLeft: '4px' } }, { children: jsx(Trans, { children: "View on Explorer" }, void 0) }), void 0)] }), void 0))] }, void 0) }, void 0) }, void 0)) : (jsx(Fragment, { children: jsx(AccountControl, { children: jsxs("div", { children: [account && (jsx(CopyHelper, Object.assign({ toCopy: account }, { children: jsx("span", Object.assign({ style: { marginLeft: '4px' } }, { children: jsx(Trans, { children: "Copy Address" }, void 0) }), void 0) }), void 0)), chainId && account && (jsxs(AddressLink, Object.assign({ hasENS: !!ENSName, isENS: false, href: getExplorerLink(chainId, account, ExplorerDataType.ADDRESS) }, { children: [jsx(ExternalLink$1, { size: 16 }, void 0), jsx("span", Object.assign({ style: { marginLeft: '4px' } }, { children: jsx(Trans, { children: "View on Explorer" }, void 0) }), void 0)] }), void 0))] }, void 0) }, void 0) }, void 0)) }, void 0)] }, void 0) }, void 0) }, void 0)] }, void 0), !!pendingTransactions.length || !!confirmedTransactions.length ? (jsxs(LowerSection, { children: [jsxs(AutoRow, Object.assign({ mb: '1rem', style: { justifyContent: 'space-between' } }, { children: [jsx(ThemedText.Body, { children: jsx(Trans, { children: "Recent Transactions" }, void 0) }, void 0), jsx(LinkStyledButton, Object.assign({ onClick: clearAllTransactionsCallback }, { children: jsx(Trans, { children: "(clear all)" }, void 0) }), void 0)] }), void 0), renderTransactions(pendingTransactions), renderTransactions(confirmedTransactions)] }, void 0)) : (jsx(LowerSection, { children: jsx(ThemedText.Body, Object.assign({ color: theme.text1 }, { children: jsx(Trans, { children: "Your transactions will appear here..." }, void 0) }), void 0) }, void 0))] }, void 0));
}

const InfoCard = styled.button `
  background-color: ${({ theme, active }) => (active ? theme.bg3 : theme.bg2)};
  padding: 1rem;
  outline: none;
  border: 1px solid;
  border-radius: 12px;
  width: 100% !important;
  &:focus {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.primary1};
  }
  border-color: ${({ theme, active }) => (active ? 'transparent' : theme.bg3)};
`;
const OptionCard = styled(InfoCard) `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  padding: 1rem;
`;
const OptionCardLeft = styled.div `
  ${({ theme }) => theme.flexColumnNoWrap};
  justify-content: center;
  height: 100%;
`;
const OptionCardClickable = styled(OptionCard) `
  margin-top: 0;
  &:hover {
    cursor: ${({ clickable }) => (clickable ? 'pointer' : '')};
    border: ${({ clickable, theme }) => (clickable ? `1px solid ${theme.primary1}` : ``)};
  }
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
`;
const GreenCircle = styled.div `
  ${({ theme }) => theme.flexRowNoWrap}
  justify-content: center;
  align-items: center;

  &:first-child {
    height: 8px;
    width: 8px;
    margin-right: 8px;
    background-color: ${({ theme }) => theme.green1};
    border-radius: 50%;
  }
`;
const CircleWrapper = styled.div `
  color: ${({ theme }) => theme.green1};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HeaderText = styled.div `
  ${({ theme }) => theme.flexRowNoWrap};
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : ({ theme }) => theme.text1)};
  font-size: 1rem;
  font-weight: 500;
`;
const SubHeader = styled.div `
  color: ${({ theme }) => theme.text1};
  margin-top: 10px;
  font-size: 12px;
`;
const IconWrapper$1 = styled.div `
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '24px')};
    width: ${({ size }) => (size ? size + 'px' : '24px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium `
    align-items: flex-end;
  `};
`;
function Option$1({ link = null, clickable = true, size, onClick = null, color, header, subheader = null, icon, active = false, id, }) {
    const content = (jsxs(OptionCardClickable, Object.assign({ id: id, onClick: onClick, clickable: clickable && !active, active: active }, { children: [jsxs(OptionCardLeft, { children: [jsxs(HeaderText, Object.assign({ color: color }, { children: [active ? (jsx(CircleWrapper, { children: jsx(GreenCircle, { children: jsx("div", {}, void 0) }, void 0) }, void 0)) : (''), header] }), void 0), subheader && jsx(SubHeader, { children: subheader }, void 0)] }, void 0), jsx(IconWrapper$1, Object.assign({ size: size }, { children: jsx("img", { src: icon, alt: 'Icon' }, void 0) }), void 0)] }), void 0));
    if (link) {
        return jsx(ExternalLink, Object.assign({ href: link }, { children: content }), void 0);
    }
    return content;
}

const PendingSection = styled.div `
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  width: 100%;
  & > * {
    width: 100%;
  }
`;
const StyledLoader = styled(Loader) `
  margin-right: 1rem;
`;
const LoadingMessage = styled.div `
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  justify-content: flex-start;
  border-radius: 12px;
  margin-bottom: 20px;
  color: ${({ theme, error }) => (error ? theme.red1 : 'inherit')};
  border: 1px solid ${({ theme, error }) => (error ? theme.red1 : theme.text4)};

  & > * {
    padding: 1rem;
  }
`;
const ErrorGroup = styled.div `
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  justify-content: flex-start;
`;
const ErrorButton = styled.div `
  border-radius: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg4};
  margin-left: 1rem;
  padding: 0.5rem;
  font-weight: 600;
  user-select: none;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => darken(0.1, theme.text4)};
  }
`;
const LoadingWrapper = styled.div `
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  justify-content: center;
`;
function PendingView({ connector, error = false, setPendingError, tryActivation, }) {
    var _a;
    const isMetamask = (_a = window === null || window === void 0 ? void 0 : window.ethereum) === null || _a === void 0 ? void 0 : _a.isMetaMask;
    return (jsxs(PendingSection, { children: [jsx(LoadingMessage, Object.assign({ error: error }, { children: jsx(LoadingWrapper, { children: error ? (jsxs(ErrorGroup, { children: [jsx("div", { children: jsx(Trans, { children: "Error connecting" }, void 0) }, void 0), jsx(ErrorButton, Object.assign({ onClick: () => {
                                    setPendingError(false);
                                    connector && tryActivation(connector);
                                } }, { children: jsx(Trans, { children: "Try Again" }, void 0) }), void 0)] }, void 0)) : (jsxs(Fragment, { children: [jsx(StyledLoader, {}, void 0), jsx(Trans, { children: "Initializing..." }, void 0)] }, void 0)) }, void 0) }), void 0), Object.keys(SUPPORTED_WALLETS).map((key) => {
                const option = SUPPORTED_WALLETS[key];
                if (option.connector === connector) {
                    if (option.connector === injected) {
                        if (isMetamask && option.name !== 'MetaMask') {
                            return null;
                        }
                        if (!isMetamask && option.name === 'MetaMask') {
                            return null;
                        }
                    }
                    return (jsx(Option$1, { id: `connect-${key}`, clickable: false, color: option.color, header: option.name, subheader: option.description, icon: option.iconURL }, key));
                }
                return null;
            })] }, void 0));
}

const CloseIcon$1 = styled.div `
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
const CloseColor = styled(SvgX) `
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`;
const Wrapper$c = styled.div `
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`;
const HeaderRow = styled.div `
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${(props) => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium `
    padding: 1rem;
  `};
`;
const ContentWrapper$3 = styled.div `
  background-color: ${({ theme }) => theme.bg0};
  padding: 0 1rem 1rem 1rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  ${({ theme }) => theme.mediaWidth.upToMedium `padding: 0 1rem 1rem 1rem`};
`;
const UpperSection = styled.div `
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`;
const OptionGrid = styled.div `
  display: grid;
  grid-gap: 10px;
  ${({ theme }) => theme.mediaWidth.upToMedium `
    grid-template-columns: 1fr;
    grid-gap: 10px;
  `};
`;
const HoverText = styled.div `
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  display: flex;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`;
const LinkCard = styled(Card) `
  background-color: ${({ theme }) => theme.primary1};
  color: ${({ theme }) => theme.white};

  :hover {
    cursor: pointer;
    filter: brightness(0.9);
  }
`;
const WALLET_VIEWS = {
    OPTIONS: 'options',
    OPTIONS_SECONDARY: 'options_secondary',
    ACCOUNT: 'account',
    PENDING: 'pending',
    LEGAL: 'legal',
};
function WalletModal({ pendingTransactions, confirmedTransactions, ENSName, }) {
    // important that these are destructed from the account-specific web3-react context
    const { active, account, connector, activate, error } = useWeb3React();
    const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);
    const previousWalletView = usePrevious(walletView);
    const [pendingWallet, setPendingWallet] = useState();
    const [pendingError, setPendingError] = useState();
    const walletModalOpen = useModalOpen(ApplicationModal.WALLET);
    const toggleWalletModal = useWalletModalToggle();
    const previousAccount = usePrevious(account);
    const logMonitoringEvent = useWalletConnectMonitoringEventCallback();
    // close on connection, when logged out before
    useEffect(() => {
        if (account && !previousAccount && walletModalOpen) {
            toggleWalletModal();
        }
    }, [account, previousAccount, toggleWalletModal, walletModalOpen]);
    // always reset to account view
    useEffect(() => {
        if (walletModalOpen) {
            setPendingError(false);
            setWalletView(WALLET_VIEWS.ACCOUNT);
        }
    }, [walletModalOpen]);
    // close modal when a connection is successful
    const activePrevious = usePrevious(active);
    const connectorPrevious = usePrevious(connector);
    useEffect(() => {
        if (walletModalOpen && ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))) {
            setWalletView(WALLET_VIEWS.ACCOUNT);
        }
    }, [setWalletView, active, error, connector, walletModalOpen, activePrevious, connectorPrevious]);
    const tryActivation = (connector) => __awaiter(this, void 0, void 0, function* () {
        let name = '';
        Object.keys(SUPPORTED_WALLETS).map((key) => {
            if (connector === SUPPORTED_WALLETS[key].connector) {
                return (name = SUPPORTED_WALLETS[key].name);
            }
            return true;
        });
        // log selected wallet
        ReactGA.event({
            category: 'Wallet',
            action: 'Change Wallet',
            label: name,
        });
        setPendingWallet(connector); // set wallet for pending view
        setWalletView(WALLET_VIEWS.PENDING);
        // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
        if (connector instanceof WalletConnectConnector) {
            connector.walletConnectProvider = undefined;
        }
        connector &&
            activate(connector, undefined, true)
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const walletAddress = yield connector.getAccount();
                logMonitoringEvent({ walletAddress });
            }))
                .catch((error) => {
                if (error instanceof UnsupportedChainIdError) {
                    activate(connector); // a little janky...can't use setError because the connector isn't set
                }
                else {
                    setPendingError(true);
                }
            });
    });
    // close wallet modal if fortmatic modal is active
    useEffect(() => {
        fortmatic$2.on(OVERLAY_READY, () => {
            toggleWalletModal();
        });
    }, [toggleWalletModal]);
    // get wallets user can switch too, depending on device/browser
    function getOptions() {
        const isMetamask = window.ethereum && window.ethereum.isMetaMask;
        return Object.keys(SUPPORTED_WALLETS).map((key) => {
            const option = SUPPORTED_WALLETS[key];
            // check for mobile options
            if (isMobile) {
                //disable portis on mobile for now
                if (option.connector === portis) {
                    return null;
                }
                if (!window.web3 && !window.ethereum && option.mobile) {
                    return (jsx(Option$1, { onClick: () => {
                            option.connector !== connector && !option.href && tryActivation(option.connector);
                        }, id: `connect-${key}`, active: option.connector && option.connector === connector, color: option.color, link: option.href, header: option.name, subheader: null, icon: option.iconURL }, key));
                }
                return null;
            }
            // overwrite injected when needed
            if (option.connector === injected) {
                // don't show injected if there's no injected provider
                if (!(window.web3 || window.ethereum)) {
                    if (option.name === 'MetaMask') {
                        return (jsx(Option$1, { id: `connect-${key}`, color: '#E8831D', header: jsx(Trans, { children: "Install Metamask" }, void 0), subheader: null, link: 'https://metamask.io/', icon: MetaMaskLogo }, key));
                    }
                    else {
                        return null; //dont want to return install twice
                    }
                }
                // don't return metamask if injected provider isn't metamask
                else if (option.name === 'MetaMask' && !isMetamask) {
                    return null;
                }
                // likewise for generic
                else if (option.name === 'Injected' && isMetamask) {
                    return null;
                }
            }
            // return rest of options
            return (!isMobile &&
                !option.mobileOnly && (jsx(Option$1, { id: `connect-${key}`, onClick: () => {
                    option.connector === connector
                        ? setWalletView(WALLET_VIEWS.ACCOUNT)
                        : !option.href && tryActivation(option.connector);
                }, active: option.connector === connector, color: option.color, link: option.href, header: option.name, subheader: null, icon: option.iconURL }, key)));
        });
    }
    function getModalContent() {
        if (error) {
            return (jsxs(UpperSection, { children: [jsx(CloseIcon$1, Object.assign({ onClick: toggleWalletModal }, { children: jsx(CloseColor, {}, void 0) }), void 0), jsx(HeaderRow, { children: error instanceof UnsupportedChainIdError ? jsx(Trans, { children: "Wrong Network" }, void 0) : jsx(Trans, { children: "Error connecting" }, void 0) }, void 0), jsx(ContentWrapper$3, { children: error instanceof UnsupportedChainIdError ? (jsx("h5", { children: jsx(Trans, { children: "Please connect to the appropriate Ethereum network." }, void 0) }, void 0)) : (jsx(Trans, { children: "Error connecting. Try refreshing the page." }, void 0)) }, void 0)] }, void 0));
        }
        if (walletView === WALLET_VIEWS.LEGAL) {
            return (jsxs(UpperSection, { children: [jsxs(HeaderRow, { children: [jsx(HoverText, Object.assign({ onClick: () => {
                                    var _a;
                                    setWalletView((_a = (previousWalletView === WALLET_VIEWS.LEGAL ? WALLET_VIEWS.ACCOUNT : previousWalletView)) !== null && _a !== void 0 ? _a : WALLET_VIEWS.ACCOUNT);
                                } }, { children: jsx(ArrowLeft, {}, void 0) }), void 0), jsx(Row, Object.assign({ justify: "center" }, { children: jsx(ThemedText.MediumHeader, { children: jsx(Trans, { children: "Legal & Privacy" }, void 0) }, void 0) }), void 0)] }, void 0), jsx(PrivacyPolicy, {}, void 0)] }, void 0));
        }
        if (account && walletView === WALLET_VIEWS.ACCOUNT) {
            return (jsx(AccountDetails, { toggleWalletModal: toggleWalletModal, pendingTransactions: pendingTransactions, confirmedTransactions: confirmedTransactions, ENSName: ENSName, openOptions: () => setWalletView(WALLET_VIEWS.OPTIONS) }, void 0));
        }
        return (jsxs(UpperSection, { children: [jsx(CloseIcon$1, Object.assign({ onClick: toggleWalletModal }, { children: jsx(CloseColor, {}, void 0) }), void 0), walletView !== WALLET_VIEWS.ACCOUNT ? (jsx(HeaderRow, Object.assign({ color: "blue" }, { children: jsx(HoverText, Object.assign({ onClick: () => {
                            setPendingError(false);
                            setWalletView(WALLET_VIEWS.ACCOUNT);
                        } }, { children: jsx(ArrowLeft, {}, void 0) }), void 0) }), void 0)) : (jsx(HeaderRow, { children: jsx(HoverText, { children: jsx(Trans, { children: "Connect a wallet" }, void 0) }, void 0) }, void 0)), jsx(ContentWrapper$3, { children: jsxs(AutoColumn, Object.assign({ gap: "16px" }, { children: [jsx(LightCard, { children: jsx(AutoRow, Object.assign({ style: { flexWrap: 'nowrap' } }, { children: jsx(ThemedText.Black, Object.assign({ fontSize: 14 }, { children: jsxs(Trans, { children: ["By connecting a wallet, you agree to Uniswap Labs\u2019", ' ', jsx(ExternalLink, Object.assign({ href: "https://uniswap.org/terms-of-service/" }, { children: "Terms of Service" }), void 0), " and acknowledge that you have read and understand the Uniswap", ' ', jsx(ExternalLink, Object.assign({ href: "https://uniswap.org/disclaimer/" }, { children: "Protocol Disclaimer" }), void 0), "."] }, void 0) }), void 0) }), void 0) }, void 0), jsx(LinkCard, Object.assign({ padding: ".5rem", "$borderRadius": ".75rem", onClick: () => setWalletView(WALLET_VIEWS.LEGAL) }, { children: jsxs(RowBetween, { children: [jsxs(AutoRow, Object.assign({ gap: "4px" }, { children: [jsx(Info, { size: 20 }, void 0), jsx(ThemedText.White, Object.assign({ fontSize: 14 }, { children: jsx(Trans, { children: "How this app uses APIs" }, void 0) }), void 0)] }), void 0), jsx(ArrowRight, { size: 16 }, void 0)] }, void 0) }), void 0), walletView === WALLET_VIEWS.PENDING ? (jsx(PendingView, { connector: pendingWallet, error: pendingError, setPendingError: setPendingError, tryActivation: tryActivation }, void 0)) : (jsx(OptionGrid, { children: getOptions() }, void 0))] }), void 0) }, void 0)] }, void 0));
    }
    return (jsx(Modal, Object.assign({ isOpen: walletModalOpen, onDismiss: toggleWalletModal, minHeight: false, maxHeight: 90 }, { children: jsx(Wrapper$c, { children: getModalContent() }, void 0) }), void 0));
}

const IconWrapper = styled.div `
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`;
const Web3StatusGeneric = styled(ButtonSecondary) `
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  align-items: center;
  padding: 0.5rem;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  :focus {
    outline: none;
  }
`;
const Web3StatusError = styled(Web3StatusGeneric) `
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
`;
const Web3StatusConnect = styled(Web3StatusGeneric) `
  background-color: ${({ theme }) => theme.primary4};
  border: none;

  color: ${({ theme }) => theme.primaryText1};
  font-weight: 500;

  :hover,
  :focus {
    border: 1px solid ${({ theme }) => darken(0.05, theme.primary4)};
    color: ${({ theme }) => theme.primaryText1};
  }

  ${({ faded }) => faded &&
    css `
      background-color: ${({ theme }) => theme.primary5};
      border: 1px solid ${({ theme }) => theme.primary5};
      color: ${({ theme }) => theme.primaryText1};

      :hover,
      :focus {
        border: 1px solid ${({ theme }) => darken(0.05, theme.primary4)};
        color: ${({ theme }) => darken(0.05, theme.primaryText1)};
      }
    `}
`;
const Web3StatusConnected = styled(Web3StatusGeneric) `
  background-color: ${({ pending, theme }) => (pending ? theme.primary1 : theme.bg0)};
  border: 1px solid ${({ pending, theme }) => (pending ? theme.primary1 : theme.bg1)};
  color: ${({ pending, theme }) => (pending ? theme.white : theme.text1)};
  font-weight: 500;
  :hover,
  :focus {
    border: 1px solid ${({ theme }) => darken(0.05, theme.bg3)};

    :focus {
      border: 1px solid ${({ pending, theme }) => (pending ? darken(0.1, theme.primary1) : darken(0.1, theme.bg2))};
    }
  }
`;
const Text = styled.p `
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
`;
const NetworkIcon = styled(Activity) `
  margin-left: 0.25rem;
  margin-right: 0.5rem;
  width: 16px;
  height: 16px;
`;
// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a, b) {
    return b.addedTime - a.addedTime;
}
function Sock() {
    return (jsx("span", Object.assign({ role: "img", "aria-label": t `has socks emoji`, style: { marginTop: -4, marginBottom: -4 } }, { children: "\uD83E\uDDE6" }), void 0));
}
function WrappedStatusIcon({ connector }) {
    return (jsx(IconWrapper, Object.assign({ size: 16 }, { children: jsx(StatusIcon, { connector: connector }, void 0) }), void 0));
}
function Web3StatusInner() {
    const { account, connector, error } = useWeb3React();
    const { ENSName } = useENSName(account !== null && account !== void 0 ? account : undefined);
    const allTransactions = useAllTransactions();
    const sortedRecentTransactions = useMemo(() => {
        const txs = Object.values(allTransactions);
        return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
    }, [allTransactions]);
    const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash);
    const hasPendingTransactions = !!pending.length;
    const hasSocks = useHasSocks();
    const toggleWalletModal = useWalletModalToggle();
    if (account) {
        return (jsxs(Web3StatusConnected, Object.assign({ id: "web3-status-connected", onClick: toggleWalletModal, pending: hasPendingTransactions }, { children: [hasPendingTransactions ? (jsxs(RowBetween, { children: [jsx(Text, { children: jsxs(Trans, { children: [pending === null || pending === void 0 ? void 0 : pending.length, " Pending"] }, void 0) }, void 0), ' ', jsx(Loader, { stroke: "white" }, void 0)] }, void 0)) : (jsxs(Fragment, { children: [hasSocks ? jsx(Sock, {}, void 0) : null, jsx(Text, { children: ENSName || shortenAddress(account) }, void 0)] }, void 0)), !hasPendingTransactions && connector && jsx(WrappedStatusIcon, { connector: connector }, void 0)] }), void 0));
    }
    else if (error) {
        return (jsxs(Web3StatusError, Object.assign({ onClick: toggleWalletModal }, { children: [jsx(NetworkIcon, {}, void 0), jsx(Text, { children: error instanceof UnsupportedChainIdError ? jsx(Trans, { children: "Wrong Network" }, void 0) : jsx(Trans, { children: "Error" }, void 0) }, void 0)] }), void 0));
    }
    else {
        return (jsx(Web3StatusConnect, Object.assign({ id: "connect-wallet", onClick: toggleWalletModal, faded: !account }, { children: jsx(Text, { children: jsx(Trans, { children: "Connect Wallet" }, void 0) }, void 0) }), void 0));
    }
}
function Web3Status() {
    const { active, account } = useWeb3React();
    const contextNetwork = useWeb3React(NetworkContextName);
    const { ENSName } = useENSName(account !== null && account !== void 0 ? account : undefined);
    const allTransactions = useAllTransactions();
    const sortedRecentTransactions = useMemo(() => {
        const txs = Object.values(allTransactions);
        return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
    }, [allTransactions]);
    const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash);
    const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt).map((tx) => tx.hash);
    return (jsxs(Fragment, { children: [jsx(Web3StatusInner, {}, void 0), (contextNetwork.active || active) && (jsx(WalletModal, { ENSName: ENSName !== null && ENSName !== void 0 ? ENSName : undefined, pendingTransactions: pending, confirmedTransactions: confirmed }, void 0))] }, void 0));
}

// provider.request returns Promise<any>, but wallet_switchEthereumChain must return null or throw
// see https://github.com/rekmarks/EIPs/blob/3326-create/EIPS/eip-3326.md for more info on wallet_switchEthereumChain
function addNetwork({ library, chainId, info }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!((_a = library === null || library === void 0 ? void 0 : library.provider) === null || _a === void 0 ? void 0 : _a.request)) {
            return;
        }
        const formattedChainId = hexStripZeros(BigNumber.from(chainId).toHexString());
        try {
            yield (library === null || library === void 0 ? void 0 : library.provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: formattedChainId,
                        chainName: info.label,
                        rpcUrls: info.rpcUrls,
                        nativeCurrency: info.nativeCurrency,
                        blockExplorerUrls: [info.explorer],
                    },
                ],
            }));
        }
        catch (error) {
            console.error('error adding eth network: ', chainId, info, error);
        }
    });
}

// provider.request returns Promise<any>, but wallet_switchEthereumChain must return null or throw
// see https://github.com/rekmarks/EIPs/blob/3326-create/EIPS/eip-3326.md for more info on wallet_switchEthereumChain
function switchToNetwork({ library, chainId }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!((_a = library === null || library === void 0 ? void 0 : library.provider) === null || _a === void 0 ? void 0 : _a.request)) {
            return;
        }
        if (!chainId && (library === null || library === void 0 ? void 0 : library.getNetwork)) {
            ({ chainId } = yield library.getNetwork());
        }
        const formattedChainId = hexStripZeros(BigNumber.from(chainId).toHexString());
        try {
            yield (library === null || library === void 0 ? void 0 : library.provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: formattedChainId }],
            }));
        }
        catch (error) {
            // 4902 is the error code for attempting to switch to an unrecognized chainId
            if (error.code === 4902 && chainId !== undefined) {
                const info = CHAIN_INFO[chainId];
                // metamask (only known implementer) automatically switches after a network is added
                // the second call is done here because that behavior is not a part of the spec and cannot be relied upon in the future
                // metamask's behavior when switching to the current network is just to return null (a no-op)
                yield addNetwork({ library, chainId, info });
                yield switchToNetwork({ library, chainId });
            }
            else {
                throw error;
            }
        }
    });
}

const ActiveRowLinkList = styled.div `
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  & > a {
    align-items: center;
    color: ${({ theme }) => theme.text2};
    display: flex;
    flex-direction: row;
    font-size: 14px;
    font-weight: 500;
    justify-content: space-between;
    padding: 8px 0 4px;
    text-decoration: none;
  }
  & > a:first-child {
    border-top: 1px solid ${({ theme }) => theme.text2};
    margin: 0;
    margin-top: 6px;
    padding-top: 10px;
  }
`;
const ActiveRowWrapper = styled.div `
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 8px;
  cursor: pointer;
  padding: 8px 0 8px 0;
  width: 100%;
`;
const FlyoutHeader = styled.div `
  color: ${({ theme }) => theme.text2};
  font-weight: 400;
`;
const FlyoutMenu = styled.div `
  align-items: flex-start;
  background-color: ${({ theme }) => theme.bg1};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  overflow: auto;
  padding: 16px;
  position: absolute;
  top: 64px;
  width: 272px;
  z-index: 99;
  & > *:not(:last-child) {
    margin-bottom: 12px;
  }
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    top: 50px;
  }
`;
const FlyoutRow = styled.div `
  align-items: center;
  background-color: ${({ active, theme }) => (active ? theme.bg2 : 'transparent')};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  padding: 6px 8px;
  text-align: left;
  width: 100%;
`;
const FlyoutRowActiveIndicator = styled.div `
  background-color: ${({ theme }) => theme.green1};
  border-radius: 50%;
  height: 9px;
  width: 9px;
`;
const LinkOutCircle$1 = styled(ArrowDownCircle) `
  transform: rotate(230deg);
  width: 16px;
  height: 16px;
`;
const Logo$1 = styled.img `
  height: 20px;
  width: 20px;
  margin-right: 8px;
`;
const NetworkLabel = styled.div `
  flex: 1 1 auto;
`;
const SelectorLabel = styled(NetworkLabel) `
  display: none;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: block;
    margin-right: 8px;
  }
`;
const SelectorControls = styled.div `
  align-items: center;
  background-color: ${({ theme }) => theme.bg1};
  border: 2px solid ${({ theme }) => theme.bg1};
  border-radius: 12px;
  color: ${({ theme }) => theme.text1};
  cursor: ${({ interactive }) => (interactive ? 'pointer' : 'auto')};
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  padding: 6px 8px;
`;
const SelectorLogo = styled(Logo$1) `
  margin-right: ${({ interactive }) => (interactive ? 8 : 0)}px;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    margin-right: 8px;
  }
`;
const SelectorWrapper = styled.div `
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    position: relative;
  }
`;
const StyledChevronDown = styled(ChevronDown) `
  width: 12px;
`;
const BridgeText = ({ chainId }) => {
    switch (chainId) {
        case SupportedChainId.ARBITRUM_ONE:
        case SupportedChainId.ARBITRUM_RINKEBY:
            return jsx(Trans, { children: "Arbitrum Bridge" }, void 0);
        case SupportedChainId.OPTIMISM:
        case SupportedChainId.OPTIMISTIC_KOVAN:
            return jsx(Trans, { children: "Optimism Gateway" }, void 0);
        default:
            return jsx(Trans, { children: "Bridge" }, void 0);
    }
};
const ExplorerText = ({ chainId }) => {
    switch (chainId) {
        case SupportedChainId.ARBITRUM_ONE:
        case SupportedChainId.ARBITRUM_RINKEBY:
            return jsx(Trans, { children: "Arbiscan" }, void 0);
        case SupportedChainId.OPTIMISM:
        case SupportedChainId.OPTIMISTIC_KOVAN:
            return jsx(Trans, { children: "Optimistic Etherscan" }, void 0);
        default:
            return jsx(Trans, { children: "Explorer" }, void 0);
    }
};
function NetworkSelector() {
    const { chainId, library } = useActiveWeb3React();
    const node = useRef();
    const open = useModalOpen(ApplicationModal.NETWORK_SELECTOR);
    const toggle = useToggleModal(ApplicationModal.NETWORK_SELECTOR);
    useOnClickOutside(node, open ? toggle : undefined);
    const implements3085 = useAppSelector((state) => state.application.implements3085);
    const info = chainId ? CHAIN_INFO[chainId] : undefined;
    const isOnL2 = chainId ? L2_CHAIN_IDS.includes(chainId) : false;
    const showSelector = Boolean(implements3085 || isOnL2);
    const mainnetInfo = CHAIN_INFO[SupportedChainId.MAINNET];
    const conditionalToggle = useCallback(() => {
        if (showSelector) {
            toggle();
        }
    }, [showSelector, toggle]);
    if (!chainId || !info || !library) {
        return null;
    }
    function Row({ targetChain }) {
        if (!library || !chainId || (!implements3085 && targetChain !== chainId)) {
            return null;
        }
        const handleRowClick = () => {
            switchToNetwork({ library, chainId: targetChain });
            toggle();
        };
        const active = chainId === targetChain;
        const hasExtendedInfo = L2_CHAIN_IDS.includes(targetChain);
        const isOptimism = targetChain === SupportedChainId.OPTIMISM;
        const rowText = `${CHAIN_INFO[targetChain].label}${isOptimism ? ' (Optimism)' : ''}`;
        const RowContent = () => (jsxs(FlyoutRow, Object.assign({ onClick: handleRowClick, active: active }, { children: [jsx(Logo$1, { src: CHAIN_INFO[targetChain].logoUrl }, void 0), jsx(NetworkLabel, { children: rowText }, void 0), chainId === targetChain && jsx(FlyoutRowActiveIndicator, {}, void 0)] }), void 0));
        const helpCenterLink = isOptimism ? OPTIMISM_HELP_CENTER_LINK : ARBITRUM_HELP_CENTER_LINK;
        if (active && hasExtendedInfo) {
            return (jsxs(ActiveRowWrapper, { children: [jsx(RowContent, {}, void 0), jsxs(ActiveRowLinkList, { children: [jsxs(ExternalLink, Object.assign({ href: CHAIN_INFO[targetChain].bridge }, { children: [jsx(BridgeText, { chainId: chainId }, void 0), " ", jsx(LinkOutCircle$1, {}, void 0)] }), void 0), jsxs(ExternalLink, Object.assign({ href: CHAIN_INFO[targetChain].explorer }, { children: [jsx(ExplorerText, { chainId: chainId }, void 0), " ", jsx(LinkOutCircle$1, {}, void 0)] }), void 0), jsxs(ExternalLink, Object.assign({ href: helpCenterLink }, { children: [jsx(Trans, { children: "Help Center" }, void 0), " ", jsx(LinkOutCircle$1, {}, void 0)] }), void 0)] }, void 0)] }, void 0));
        }
        return jsx(RowContent, {}, void 0);
    }
    return (jsxs(SelectorWrapper, Object.assign({ ref: node }, { children: [jsxs(SelectorControls, Object.assign({ onClick: conditionalToggle, interactive: showSelector }, { children: [jsx(SelectorLogo, { interactive: showSelector, src: info.logoUrl || mainnetInfo.logoUrl }, void 0), jsx(SelectorLabel, { children: info.label }, void 0), showSelector && jsx(StyledChevronDown, {}, void 0)] }), void 0), open && (jsxs(FlyoutMenu, { children: [jsx(FlyoutHeader, { children: jsx(Trans, { children: "Select a network" }, void 0) }, void 0), jsx(Row, { targetChain: SupportedChainId.MAINNET }, void 0), jsx(Row, { targetChain: SupportedChainId.OPTIMISM }, void 0), jsx(Row, { targetChain: SupportedChainId.ARBITRUM_ONE }, void 0)] }, void 0))] }), void 0));
}

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
function useTotalSupply(token) {
    var _a, _b;
    const contract = useTokenContract((token === null || token === void 0 ? void 0 : token.isToken) ? token.address : undefined, false);
    const totalSupply = (_b = (_a = useSingleCallResult(contract, 'totalSupply')) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b[0];
    return (token === null || token === void 0 ? void 0 : token.isToken) && totalSupply ? CurrencyAmount.fromRawAmount(token, totalSupply.toString()) : undefined;
}

const STAKING_END = STAKING_GENESIS + 60 * 60 * 24 * 60;
const TREASURY_VESTING_GENESIS = 1600387200;
// 30 days
const TREASURY_VESTING_CLIFF = 60 * 60 * 24 * 30;
const ONE_YEAR = 60 * 60 * 24 * 365;
const TREASURY_BEGIN_YEAR_1 = TREASURY_VESTING_GENESIS;
const TREASURY_CLIFF_YEAR_1 = TREASURY_BEGIN_YEAR_1 + TREASURY_VESTING_CLIFF;
const TREASURY_END_YEAR_1 = TREASURY_BEGIN_YEAR_1 + ONE_YEAR;
const TREASURY_BEGIN_YEAR_2 = TREASURY_END_YEAR_1;
const TREASURY_END_YEAR_2 = TREASURY_BEGIN_YEAR_2 + ONE_YEAR;
const TREASURY_BEGIN_YEAR_3 = TREASURY_END_YEAR_2;
const TREASURY_END_YEAR_3 = TREASURY_BEGIN_YEAR_3 + ONE_YEAR;
const TREASURY_BEGIN_YEAR_4 = TREASURY_END_YEAR_3;
const TREASURY_END_YEAR_4 = TREASURY_BEGIN_YEAR_4 + ONE_YEAR;
const USERS_AMOUNT = 150000000;
const STAKING_REWARDS_AMOUNT = 20000000;
const TREASURY_YEAR_1_AMOUNT = 172000000;
const TREASURY_YEAR_2_AMOUNT = 12900000;
const TREASURY_YEAR_3_AMOUNT = 8600000;
const TREASURY_YEAR_4_AMOUNT = 4300000;
const TEAM_YEAR_1_AMOUNT = 160000000;
const TEAM_YEAR_2_AMOUNT = 12000000;
const TEAM_YEAR_3_AMOUNT = 8000000;
const TEAM_YEAR_4_AMOUNT = 4000000;
function withVesting(before, time, amount, start, end, cliff) {
    if (time.gt(start)) {
        if (time.gte(end)) {
            return JSBI.add(before, JSBI.BigInt(amount));
        }
        else {
            if ((typeof cliff === 'number' && time.gte(cliff)) || typeof cliff === 'undefined') {
                return JSBI.add(before, JSBI.divide(JSBI.multiply(JSBI.BigInt(amount), JSBI.BigInt(time.sub(start).toString())), JSBI.subtract(JSBI.BigInt(end), JSBI.BigInt(start))));
            }
        }
    }
    return before;
}
function computeUniCirculation(uni, blockTimestamp, unclaimedUni) {
    let wholeAmount = JSBI.BigInt(USERS_AMOUNT);
    // staking rewards
    wholeAmount = withVesting(wholeAmount, blockTimestamp, STAKING_REWARDS_AMOUNT, STAKING_GENESIS, STAKING_END);
    // treasury vesting
    wholeAmount = withVesting(wholeAmount, blockTimestamp, TREASURY_YEAR_1_AMOUNT, TREASURY_BEGIN_YEAR_1, TREASURY_END_YEAR_1, TREASURY_CLIFF_YEAR_1);
    wholeAmount = withVesting(wholeAmount, blockTimestamp, TREASURY_YEAR_2_AMOUNT, TREASURY_BEGIN_YEAR_2, TREASURY_END_YEAR_2);
    wholeAmount = withVesting(wholeAmount, blockTimestamp, TREASURY_YEAR_3_AMOUNT, TREASURY_BEGIN_YEAR_3, TREASURY_END_YEAR_3);
    wholeAmount = withVesting(wholeAmount, blockTimestamp, TREASURY_YEAR_4_AMOUNT, TREASURY_BEGIN_YEAR_4, TREASURY_END_YEAR_4);
    // team
    wholeAmount = withVesting(wholeAmount, blockTimestamp, TEAM_YEAR_1_AMOUNT, TREASURY_BEGIN_YEAR_1, TREASURY_END_YEAR_1, TREASURY_CLIFF_YEAR_1);
    wholeAmount = withVesting(wholeAmount, blockTimestamp, TEAM_YEAR_2_AMOUNT, TREASURY_BEGIN_YEAR_2, TREASURY_END_YEAR_2);
    wholeAmount = withVesting(wholeAmount, blockTimestamp, TEAM_YEAR_3_AMOUNT, TREASURY_BEGIN_YEAR_3, TREASURY_END_YEAR_3);
    wholeAmount = withVesting(wholeAmount, blockTimestamp, TEAM_YEAR_4_AMOUNT, TREASURY_BEGIN_YEAR_4, TREASURY_END_YEAR_4);
    const total = CurrencyAmount.fromRawAmount(uni, JSBI.multiply(wholeAmount, JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18))));
    return unclaimedUni ? total.subtract(unclaimedUni) : total;
}

const ContentWrapper$2 = styled(AutoColumn) `
  width: 100%;
`;
const ModalUpper = styled(DataCard) `
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #ff007a 0%, #021d43 100%);
  padding: 0.5rem;
`;
const StyledClose$2 = styled(X) `
  position: absolute;
  right: 16px;
  top: 16px;

  :hover {
    cursor: pointer;
  }
`;
/**
 * Content for balance stats modal
 */
function UniBalanceContent({ setShowUniBalanceModal }) {
    var _a, _b;
    const { account, chainId } = useActiveWeb3React();
    const uni = chainId ? UNI[chainId] : undefined;
    const total = useAggregateUniBalance();
    const uniBalance = useTokenBalance(account !== null && account !== void 0 ? account : undefined, uni);
    const uniToClaim = useTotalUniEarned();
    const totalSupply = useTotalSupply(uni);
    const uniPrice = useUSDCPrice(uni);
    const blockTimestamp = useCurrentBlockTimestamp();
    const unclaimedUni = useTokenBalance((_a = useMerkleDistributorContract()) === null || _a === void 0 ? void 0 : _a.address, uni);
    const circulation = useMemo(() => blockTimestamp && uni && chainId === 1 ? computeUniCirculation(uni, blockTimestamp, unclaimedUni) : totalSupply, [blockTimestamp, chainId, totalSupply, unclaimedUni, uni]);
    const { infoLink } = CHAIN_INFO[chainId ? chainId : SupportedChainId.MAINNET];
    return (jsx(ContentWrapper$2, Object.assign({ gap: "lg" }, { children: jsxs(ModalUpper, { children: [jsx(CardBGImage, {}, void 0), jsx(CardNoise, {}, void 0), jsx(CardSection, Object.assign({ gap: "md" }, { children: jsxs(RowBetween, { children: [jsx(ThemedText.White, Object.assign({ color: "white" }, { children: jsx(Trans, { children: "Your UNI Breakdown" }, void 0) }), void 0), jsx(StyledClose$2, { stroke: "white", onClick: () => setShowUniBalanceModal(false) }, void 0)] }, void 0) }), void 0), jsx(Break$1, {}, void 0), account && (jsxs(Fragment, { children: [jsxs(CardSection, Object.assign({ gap: "sm" }, { children: [jsxs(AutoColumn, Object.assign({ gap: "md", justify: "center" }, { children: [jsx(UniTokenAnimated, { width: "48px", src: tokenLogo }, void 0), ' ', jsx(ThemedText.White, Object.assign({ fontSize: 48, fontWeight: 600, color: "white" }, { children: total === null || total === void 0 ? void 0 : total.toFixed(2, { groupSeparator: ',' }) }), void 0)] }), void 0), jsxs(AutoColumn, Object.assign({ gap: "md" }, { children: [jsxs(RowBetween, { children: [jsx(ThemedText.White, Object.assign({ color: "white" }, { children: jsx(Trans, { children: "Balance:" }, void 0) }), void 0), jsx(ThemedText.White, Object.assign({ color: "white" }, { children: uniBalance === null || uniBalance === void 0 ? void 0 : uniBalance.toFixed(2, { groupSeparator: ',' }) }), void 0)] }, void 0), jsxs(RowBetween, { children: [jsx(ThemedText.White, Object.assign({ color: "white" }, { children: jsx(Trans, { children: "Unclaimed:" }, void 0) }), void 0), jsxs(ThemedText.White, Object.assign({ color: "white" }, { children: [uniToClaim === null || uniToClaim === void 0 ? void 0 : uniToClaim.toFixed(4, { groupSeparator: ',' }), ' ', uniToClaim && uniToClaim.greaterThan('0') && (jsx(StyledInternalLink, Object.assign({ onClick: () => setShowUniBalanceModal(false), to: "/uni" }, { children: jsx(Trans, { children: "(claim)" }, void 0) }), void 0))] }), void 0)] }, void 0)] }), void 0)] }), void 0), jsx(Break$1, {}, void 0)] }, void 0)), jsx(CardSection, Object.assign({ gap: "sm" }, { children: jsxs(AutoColumn, Object.assign({ gap: "md" }, { children: [jsxs(RowBetween, { children: [jsx(ThemedText.White, Object.assign({ color: "white" }, { children: jsx(Trans, { children: "UNI price:" }, void 0) }), void 0), jsxs(ThemedText.White, Object.assign({ color: "white" }, { children: ["$", (_b = uniPrice === null || uniPrice === void 0 ? void 0 : uniPrice.toFixed(2)) !== null && _b !== void 0 ? _b : '-'] }), void 0)] }, void 0), jsxs(RowBetween, { children: [jsx(ThemedText.White, Object.assign({ color: "white" }, { children: jsx(Trans, { children: "UNI in circulation:" }, void 0) }), void 0), jsx(ThemedText.White, Object.assign({ color: "white" }, { children: circulation === null || circulation === void 0 ? void 0 : circulation.toFixed(0, { groupSeparator: ',' }) }), void 0)] }, void 0), jsxs(RowBetween, { children: [jsx(ThemedText.White, Object.assign({ color: "white" }, { children: jsx(Trans, { children: "Total Supply" }, void 0) }), void 0), jsx(ThemedText.White, Object.assign({ color: "white" }, { children: totalSupply === null || totalSupply === void 0 ? void 0 : totalSupply.toFixed(0, { groupSeparator: ',' }) }), void 0)] }, void 0), uni && uni.chainId === 1 ? (jsx(ExternalLink, Object.assign({ href: `${infoLink}/token/${uni.address}` }, { children: jsx(Trans, { children: "View UNI Analytics" }, void 0) }), void 0)) : null] }), void 0) }), void 0)] }, void 0) }), void 0));
}

const HeaderFrame = styled.div `
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding: 1rem;
  z-index: 21;
  position: relative;
  /* Background slide effect on scroll. */
  background-image: ${({ theme }) => `linear-gradient(to bottom, transparent 50%, ${theme.bg0} 50% )}}`};
  background-position: ${({ showBackground }) => (showBackground ? '0 -100%' : '0 0')};
  background-size: 100% 200%;
  box-shadow: 0px 0px 0px 1px ${({ theme, showBackground }) => (showBackground ? theme.bg2 : 'transparent;')};
  transition: background-position 0.1s, box-shadow 0.1s;
  background-blend-mode: hard-light;

  ${({ theme }) => theme.mediaWidth.upToLarge `
    grid-template-columns: 48px 1fr 1fr;
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium `
    padding:  1rem;
    grid-template-columns: 1fr 1fr;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall `
    padding:  1rem;
    grid-template-columns: 36px 1fr;
  `};
`;
const HeaderControls = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
`;
const HeaderElement = styled.div `
  display: flex;
  align-items: center;

  &:not(:first-child) {
    margin-left: 0.5em;
  }

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium `
    align-items: center;
  `};
`;
const HeaderLinks = styled(Row) `
  justify-self: center;
  background-color: ${({ theme }) => theme.bg0};
  width: fit-content;
  padding: 4px;
  border-radius: 16px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  overflow: auto;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToLarge `
    justify-self: start;  
    `};
  ${({ theme }) => theme.mediaWidth.upToMedium `
    justify-self: center;
  `};
  ${({ theme }) => theme.mediaWidth.upToMedium `
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    z-index: 99;
    position: fixed;
    bottom: 0; right: 50%;
    transform: translate(50%,-50%);
    margin: 0 auto;
    background-color: ${({ theme }) => theme.bg0};
    border: 1px solid ${({ theme }) => theme.bg2};
    box-shadow: 0px 6px 10px rgb(0 0 0 / 2%);
  `};
`;
const AccountElement = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg1)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;

  :focus {
    border: 1px solid blue;
  }
`;
const UNIAmount = styled(AccountElement) `
  color: white;
  padding: 4px 8px;
  height: 36px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.bg3};
  background: radial-gradient(174.47% 188.91% at 1.84% 0%, #ff007a 0%, #2172e5 100%), #edeef2;
`;
const UNIWrapper = styled.span `
  width: fit-content;
  position: relative;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 0.9;
  }
`;
const BalanceText = styled(Text$1) `
  ${({ theme }) => theme.mediaWidth.upToExtraSmall `
    display: none;
  `};
`;
const Title = styled.a `
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall `
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`;
const UniIcon = styled.div `
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`;
const activeClassName = 'ACTIVE';
const StyledNavLink = styled(NavLink).attrs({
    activeClassName,
}) `
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  font-weight: 500;
  padding: 8px 12px;
  word-break: break-word;
  overflow: hidden;
  white-space: nowrap;
  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    justify-content: center;
    color: ${({ theme }) => theme.text1};
    background-color: ${({ theme }) => theme.bg2};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`;
const StyledExternalLink = styled(ExternalLink).attrs({
    activeClassName,
}) `
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
    text-decoration: none;
  }
`;
function Header$2() {
    var _a;
    const { account, chainId } = useActiveWeb3React();
    const userEthBalance = (_a = useETHBalances(account ? [account] : [])) === null || _a === void 0 ? void 0 : _a[account !== null && account !== void 0 ? account : ''];
    const [darkMode] = useDarkModeManager();
    const { white, black } = useTheme();
    const toggleClaimModal = useToggleSelfClaimModal();
    const availableClaim = useUserHasAvailableClaim(account);
    const { claimTxn } = useUserHasSubmittedClaim(account !== null && account !== void 0 ? account : undefined);
    const [showUniBalanceModal, setShowUniBalanceModal] = useState(false);
    const showClaimPopup = useShowClaimPopup();
    const scrollY = useScrollPosition();
    const { infoLink } = CHAIN_INFO[chainId ? chainId : SupportedChainId.MAINNET];
    return (jsxs(HeaderFrame, Object.assign({ showBackground: scrollY > 45 }, { children: [jsx(ClaimModal, {}, void 0), jsx(Modal, Object.assign({ isOpen: showUniBalanceModal, onDismiss: () => setShowUniBalanceModal(false) }, { children: jsx(UniBalanceContent, { setShowUniBalanceModal: setShowUniBalanceModal }, void 0) }), void 0), jsx(Title, Object.assign({ href: "." }, { children: jsx(UniIcon, { children: jsx(SvgLogo, { fill: darkMode ? white : black, width: "24px", height: "100%", title: "logo" }, void 0) }, void 0) }), void 0), jsxs(HeaderLinks, { children: [jsx(StyledNavLink, Object.assign({ id: `swap-nav-link`, to: '/swap' }, { children: jsx(Trans, { children: "Swap" }, void 0) }), void 0), jsx(StyledNavLink, Object.assign({ id: `pool-nav-link`, to: '/pool', isActive: (match, { pathname }) => Boolean(match) ||
                            pathname.startsWith('/add') ||
                            pathname.startsWith('/remove') ||
                            pathname.startsWith('/increase') ||
                            pathname.startsWith('/find') }, { children: jsx(Trans, { children: "Pool" }, void 0) }), void 0), (!chainId || chainId === SupportedChainId.MAINNET) && (jsx(StyledNavLink, Object.assign({ id: `vote-nav-link`, to: '/vote' }, { children: jsx(Trans, { children: "Vote" }, void 0) }), void 0)), jsxs(StyledExternalLink, Object.assign({ id: `charts-nav-link`, href: infoLink }, { children: [jsx(Trans, { children: "Charts" }, void 0), jsx("sup", { children: "\u2197" }, void 0)] }), void 0)] }, void 0), jsxs(HeaderControls, { children: [jsx(HeaderElement, { children: jsx(NetworkSelector, {}, void 0) }, void 0), jsxs(HeaderElement, { children: [availableClaim && !showClaimPopup && (jsxs(UNIWrapper, Object.assign({ onClick: toggleClaimModal }, { children: [jsx(UNIAmount, Object.assign({ active: !!account && !availableClaim, style: { pointerEvents: 'auto' } }, { children: jsx(ThemedText.White, Object.assign({ padding: "0 2px" }, { children: claimTxn && !(claimTxn === null || claimTxn === void 0 ? void 0 : claimTxn.receipt) ? (jsx(Dots, { children: jsx(Trans, { children: "Claiming UNI" }, void 0) }, void 0)) : (jsx(Trans, { children: "Claim UNI" }, void 0)) }), void 0) }), void 0), jsx(CardNoise, {}, void 0)] }), void 0)), jsxs(AccountElement, Object.assign({ active: !!account }, { children: [account && userEthBalance ? (jsx(BalanceText, Object.assign({ style: { flexShrink: 0, userSelect: 'none' }, pl: "0.75rem", pr: "0.5rem", fontWeight: 500 }, { children: jsxs(Trans, { children: [userEthBalance === null || userEthBalance === void 0 ? void 0 : userEthBalance.toSignificant(3), " ETH"] }, void 0) }), void 0)) : null, jsx(Web3Status, {}, void 0)] }), void 0)] }, void 0), jsx(HeaderElement, { children: jsx(Menu, {}, void 0) }, void 0)] }, void 0)] }), void 0));
}

const useMachineTimeMs = (updateInterval) => {
    const [now, setNow] = useState(Date.now());
    useInterval(() => {
        setNow(Date.now());
    }, updateInterval);
    return now;
};

const BodyRow = styled.div `
  color: ${({ theme }) => theme.black};
  font-size: 12px;
`;
const CautionIcon = styled(AlertOctagon) `
  color: ${({ theme }) => theme.black};
`;
const Link = styled(ExternalLink) `
  color: ${({ theme }) => theme.black};
  text-decoration: underline;
`;
const TitleRow = styled.div `
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 8px;
`;
const TitleText = styled.div `
  color: black;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  margin: 0px 12px;
`;
const Wrapper$b = styled.div `
  background-color: ${({ theme }) => theme.yellow3};
  border-radius: 12px;
  bottom: 60px;
  display: none;
  max-width: 348px;
  padding: 16px 20px;
  position: absolute;
  right: 16px;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToMedium}px) {
    display: block;
  }
`;
function ChainConnectivityWarning() {
    const { chainId } = useActiveWeb3React();
    const info = CHAIN_INFO[chainId !== null && chainId !== void 0 ? chainId : SupportedChainId.MAINNET];
    const label = info === null || info === void 0 ? void 0 : info.label;
    return (jsxs(Wrapper$b, { children: [jsxs(TitleRow, { children: [jsx(CautionIcon, {}, void 0), jsx(TitleText, { children: jsx(Trans, { children: "Network Warning" }, void 0) }, void 0)] }, void 0), jsxs(BodyRow, { children: [chainId === SupportedChainId.MAINNET ? (jsx(Trans, { children: "You may have lost your network connection." }, void 0)) : (jsxs(Trans, { children: ["You may have lost your network connection, or ", label, " might be down right now."] }, void 0)), ' ', info.statusPage !== undefined && (jsxs("span", { children: [jsx(Trans, { children: "Check network status" }, void 0), ' ', jsx(Link, Object.assign({ href: info.statusPage || '' }, { children: jsx(Trans, { children: "here." }, void 0) }), void 0)] }, void 0))] }, void 0)] }, void 0));
}

const StyledPolling = styled.div `
  position: fixed;
  display: flex;
  align-items: center;
  right: 0;
  bottom: 0;
  padding: 1rem;
  color: ${({ theme, warning }) => (warning ? theme.yellow3 : theme.green1)};
  transition: 250ms ease color;

  ${({ theme }) => theme.mediaWidth.upToMedium `
    display: none;
  `}
`;
const StyledPollingNumber = styled(ThemedText.Small) `
  transition: opacity 0.25s ease;
  opacity: ${({ breathe, hovering }) => (hovering ? 0.7 : breathe ? 1 : 0.5)};
  :hover {
    opacity: 1;
  }
`;
const StyledPollingDot = styled.div `
  width: 8px;
  height: 8px;
  min-height: 8px;
  min-width: 8px;
  border-radius: 50%;
  position: relative;
  background-color: ${({ theme, warning }) => (warning ? theme.yellow3 : theme.green1)};
  transition: 250ms ease background-color;
`;
const rotate360 = keyframes `
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Spinner = styled.div `
  animation: ${rotate360} 1s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  transform: translateZ(0);

  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-left: 2px solid ${({ theme, warning }) => (warning ? theme.yellow3 : theme.green1)};
  background: transparent;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  position: relative;
  transition: 250ms ease border-color;

  left: -3px;
  top: -3px;
`;
const DEFAULT_MS_BEFORE_WARNING = ms `10m`;
const NETWORK_HEALTH_CHECK_MS = ms `10s`;
function Polling() {
    var _a, _b;
    const { chainId } = useActiveWeb3React();
    const blockNumber = useBlockNumber();
    const [isMounting, setIsMounting] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const machineTime = useMachineTimeMs(NETWORK_HEALTH_CHECK_MS);
    const blockTime = useCurrentBlockTimestamp();
    const waitMsBeforeWarning = (_b = (chainId ? (_a = CHAIN_INFO[chainId]) === null || _a === void 0 ? void 0 : _a.blockWaitMsBeforeWarning : DEFAULT_MS_BEFORE_WARNING)) !== null && _b !== void 0 ? _b : DEFAULT_MS_BEFORE_WARNING;
    const warning = Boolean(!!blockTime && machineTime - blockTime.mul(1000).toNumber() > waitMsBeforeWarning);
    useEffect(() => {
        if (!blockNumber) {
            return;
        }
        setIsMounting(true);
        const mountingTimer = setTimeout(() => setIsMounting(false), 1000);
        // this will clear Timeout when component unmount like in willComponentUnmount
        return () => {
            clearTimeout(mountingTimer);
        };
    }, [blockNumber] //useEffect will run only one time
    //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
    );
    return (jsxs(Fragment, { children: [jsx(ExternalLink, Object.assign({ href: chainId && blockNumber ? getExplorerLink(chainId, blockNumber.toString(), ExplorerDataType.BLOCK) : '' }, { children: jsxs(StyledPolling, Object.assign({ onMouseEnter: () => setIsHover(true), onMouseLeave: () => setIsHover(false), warning: warning }, { children: [jsxs(StyledPollingNumber, Object.assign({ breathe: isMounting, hovering: isHover }, { children: [blockNumber, "\u2002"] }), void 0), jsx(StyledPollingDot, Object.assign({ warning: warning }, { children: isMounting && jsx(Spinner, { warning: warning }, void 0) }), void 0), ' '] }), void 0) }), void 0), warning && jsx(ChainConnectivityWarning, {}, void 0)] }, void 0));
}

const StyledClaimPopup = styled(AutoColumn) `
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #ff007a 0%, #021d43 100%);
  border-radius: 20px;
  padding: 1.5rem;
  overflow: hidden;
  position: relative;
  max-width: 360px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;
const StyledClose$1 = styled(X) `
  position: absolute;
  right: 10px;
  top: 10px;

  :hover {
    cursor: pointer;
  }
`;
const rotate = keyframes `
  0% {
    transform: perspective(1000px) rotateY(0deg);
  }

  100% {
    transform: perspective(1000px) rotateY(360deg);
  }
`;
const UniToken = styled.img `
  animation: ${rotate} 5s cubic-bezier(0.83, 0, 0.17, 1) infinite;
`;
function ClaimPopup() {
    var _a;
    const { account } = useActiveWeb3React();
    // dont store these in persisted state yet
    const showClaimPopup = useShowClaimPopup();
    const toggleShowClaimPopup = useToggleShowClaimPopup();
    // toggle for showing this modal
    const showClaimModal = useModalOpen(ApplicationModal.SELF_CLAIM);
    const toggleSelfClaimModal = useToggleSelfClaimModal();
    const handleToggleSelfClaimModal = useCallback(() => {
        ReactGA.event({
            category: 'MerkleDrop',
            action: 'Toggle self claim modal',
        });
        toggleSelfClaimModal();
    }, [toggleSelfClaimModal]);
    // const userHasAvailableclaim = useUserHasAvailableClaim()
    const userHasAvailableclaim = useUserHasAvailableClaim(account);
    const unclaimedAmount = useUserUnclaimedAmount(account);
    // listen for available claim and show popup if needed
    useEffect(() => {
        if (userHasAvailableclaim) {
            ReactGA.event({
                category: 'MerkleDrop',
                action: 'Show claim popup',
            });
            toggleShowClaimPopup();
        }
        // the toggleShowClaimPopup function changes every time the popup changes, so this will cause an infinite loop.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userHasAvailableclaim]);
    return (jsx(Fragment, { children: showClaimPopup && !showClaimModal && (jsxs(StyledClaimPopup, Object.assign({ gap: "md" }, { children: [jsx(CardBGImage, {}, void 0), jsx(CardNoise, {}, void 0), jsx(StyledClose$1, { stroke: "white", onClick: toggleShowClaimPopup }, void 0), jsxs(AutoColumn, Object.assign({ style: { padding: '2rem 0', zIndex: 10 }, justify: "center" }, { children: [jsx(UniToken, { width: "48px", src: tokenLogo }, void 0), ' ', jsxs(ThemedText.White, Object.assign({ style: { marginTop: '1rem' }, fontSize: 36, fontWeight: 600 }, { children: [unclaimedAmount === null || unclaimedAmount === void 0 ? void 0 : unclaimedAmount.toFixed(0, (_a = { groupSeparator: ',' }) !== null && _a !== void 0 ? _a : '-'), " UNI"] }), void 0), jsxs(ThemedText.White, Object.assign({ style: { paddingTop: '1.25rem', textAlign: 'center' }, fontWeight: 600, color: "white" }, { children: [jsx("span", Object.assign({ role: "img", "aria-label": "party" }, { children: "\uD83C\uDF89" }), void 0), ' ', jsx(Trans, { children: "UNI has arrived" }, void 0), ' ', jsx("span", Object.assign({ role: "img", "aria-label": "party" }, { children: "\uD83C\uDF89" }), void 0)] }), void 0), jsx(ThemedText.SubHeader, Object.assign({ style: { paddingTop: '0.5rem', textAlign: 'center' }, color: "white" }, { children: jsxs(Trans, { children: ["Thanks for being part of the Uniswap community ", jsx(Heart, { size: 12 }, void 0)] }, void 0) }), void 0)] }), void 0), jsx(AutoColumn, Object.assign({ style: { zIndex: 10 }, justify: "center" }, { children: jsx(ButtonPrimary, Object.assign({ padding: "8px", "$borderRadius": "8px", width: 'fit-content', onClick: handleToggleSelfClaimModal }, { children: jsx(Trans, { children: "Claim your UNI tokens" }, void 0) }), void 0) }), void 0)] }), void 0)) }, void 0));
}

const RowNoFlex = styled(AutoRow) `
  flex-wrap: nowrap;
`;
function TransactionPopup({ hash }) {
    const { chainId } = useActiveWeb3React();
    const tx = useTransaction(hash);
    const theme = useContext(ThemeContext);
    if (!tx)
        return null;
    const success = Boolean(tx.receipt && tx.receipt.status === 1);
    return (jsxs(RowNoFlex, { children: [jsx("div", Object.assign({ style: { paddingRight: 16 } }, { children: success ? jsx(CheckCircle, { color: theme.green1, size: 24 }, void 0) : jsx(AlertCircle, { color: theme.red1, size: 24 }, void 0) }), void 0), jsxs(AutoColumn, Object.assign({ gap: "8px" }, { children: [jsx(ThemedText.Body, Object.assign({ fontWeight: 500 }, { children: jsx(TransactionSummary, { info: tx.info }, void 0) }), void 0), chainId && (jsx(ExternalLink, Object.assign({ href: getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION) }, { children: "View on Explorer" }), void 0))] }), void 0)] }, void 0));
}

const StyledClose = styled(X) `
  position: absolute;
  right: 10px;
  top: 10px;

  :hover {
    cursor: pointer;
  }
`;
const Popup = styled.div `
  display: inline-block;
  width: 100%;
  padding: 1em;
  background-color: ${({ theme }) => theme.bg0};
  position: relative;
  border-radius: 10px;
  padding: 20px;
  padding-right: 35px;
  overflow: hidden;

  ${({ theme }) => theme.mediaWidth.upToSmall `
    min-width: 290px;
    &:not(:last-of-type) {
      margin-right: 20px;
    }
  `}
`;
const Fader = styled.div `
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.bg3};
`;
const AnimatedFader = animated(Fader);
function PopupItem({ removeAfterMs, content, popKey, }) {
    const removePopup = useRemovePopup();
    const removeThisPopup = useCallback(() => removePopup(popKey), [popKey, removePopup]);
    useEffect(() => {
        if (removeAfterMs === null)
            return undefined;
        const timeout = setTimeout(() => {
            removeThisPopup();
        }, removeAfterMs);
        return () => {
            clearTimeout(timeout);
        };
    }, [removeAfterMs, removeThisPopup]);
    const theme = useContext(ThemeContext);
    let popupContent;
    if ('txn' in content) {
        const { txn: { hash }, } = content;
        popupContent = jsx(TransactionPopup, { hash: hash }, void 0);
    }
    const faderStyle = useSpring$1({
        from: { width: '100%' },
        to: { width: '0%' },
        config: { duration: removeAfterMs !== null && removeAfterMs !== void 0 ? removeAfterMs : undefined },
    });
    return (jsxs(Popup, { children: [jsx(StyledClose, { color: theme.text2, onClick: removeThisPopup }, void 0), popupContent, removeAfterMs !== null ? jsx(AnimatedFader, { style: faderStyle }, void 0) : null] }, void 0));
}

const MobilePopupWrapper = styled.div `
  position: relative;
  max-width: 100%;
  height: ${({ height }) => height};
  margin: ${({ height }) => (height ? '0 auto;' : 0)};
  margin-bottom: ${({ height }) => (height ? '20px' : 0)}};

  display: none;
  ${({ theme }) => theme.mediaWidth.upToSmall `
    display: block;
  `};
`;
const MobilePopupInner = styled.div `
  height: 99%;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const StopOverflowQuery = `@media screen and (min-width: ${MEDIA_WIDTHS.upToMedium + 1}px) and (max-width: ${MEDIA_WIDTHS.upToMedium + 500}px)`;
const FixedPopupColumn = styled(AutoColumn) `
  position: fixed;
  top: ${({ extraPadding }) => (extraPadding ? '64px' : '56px')};
  right: 1rem;
  max-width: 355px !important;
  width: 100%;
  z-index: 3;

  ${({ theme }) => theme.mediaWidth.upToSmall `
    display: none;
  `};

  ${StopOverflowQuery} {
    top: ${({ extraPadding, xlPadding }) => (xlPadding ? '64px' : extraPadding ? '64px' : '56px')};
  }
`;
function Popups() {
    // get all popups
    const activePopups = useActivePopups();
    const urlWarningActive = useURLWarningVisible();
    // need extra padding if network is not L1 Ethereum
    const { chainId } = useActiveWeb3React();
    const isNotOnMainnet = Boolean(chainId && chainId !== SupportedChainId.MAINNET);
    return (jsxs(Fragment, { children: [jsxs(FixedPopupColumn, Object.assign({ gap: "20px", extraPadding: urlWarningActive, xlPadding: isNotOnMainnet }, { children: [jsx(ClaimPopup, {}, void 0), activePopups.map((item) => (jsx(PopupItem, { content: item.content, popKey: item.key, removeAfterMs: item.removeAfterMs }, item.key)))] }), void 0), jsx(MobilePopupWrapper, Object.assign({ height: (activePopups === null || activePopups === void 0 ? void 0 : activePopups.length) > 0 ? 'fit-content' : 0 }, { children: jsx(MobilePopupInner, { children: activePopups // reverse so new items up front
                        .slice(0)
                        .reverse()
                        .map((item) => (jsx(PopupItem, { content: item.content, popKey: item.key, removeAfterMs: item.removeAfterMs }, item.key))) }, void 0) }), void 0)] }, void 0));
}

const MessageWrapper = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20rem;
`;
const Message = styled.h2 `
  color: ${({ theme }) => theme.secondary1};
`;
function Web3ReactManager({ children }) {
    const { active } = useWeb3React();
    const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React(NetworkContextName);
    // try to eagerly connect to an injected provider, if it exists and has granted access already
    const triedEager = useEagerConnect();
    // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
    useEffect(() => {
        if (triedEager && !networkActive && !networkError && !active) {
            activateNetwork(network);
        }
    }, [triedEager, networkActive, networkError, activateNetwork, active]);
    // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
    useInactiveListener(!triedEager);
    // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
    if (triedEager && !active && networkError) {
        return (jsx(MessageWrapper, { children: jsx(Message, { children: jsx(Trans, { children: "Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device." }, void 0) }, void 0) }, void 0));
    }
    return children;
}

styled.div `
  display: none;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToMedium}px) {
    display: block;
  }
`;
const L2Icon = styled.img `
  width: 36px;
  height: 36px;
  justify-self: center;
`;
const BetaTag = styled.span `
  align-items: center;
  background-color: ${({ color }) => color};
  border-radius: 6px;
  color: ${({ theme }) => theme.white};
  display: flex;
  font-size: 14px;
  height: 28px;
  justify-content: center;
  left: -16px;
  position: absolute;
  transform: rotate(-15deg);
  top: -16px;
  width: 60px;
  z-index: 1;
`;
const Body = styled.p `
  font-size: 12px;
  grid-column: 1 / 3;
  line-height: 143%;
  margin: 0;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    grid-column: 2 / 3;
  }
`;
const Controls = styled.div `
  align-items: center;
  display: flex;
  justify-content: flex-start;
  ${({ thin }) => thin &&
    css `
      margin: auto 32px auto 0;
    `}
`;
const CloseIcon = styled(X) `
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
`;
const BodyText = styled.div `
  align-items: center;
  display: grid;
  grid-gap: 4px;
  grid-template-columns: 40px 4fr;
  grid-template-rows: auto auto;
  margin: 20px 16px;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToSmall}px) {
    grid-template-columns: 42px 4fr;
    grid-gap: 8px;
  }
`;
const LearnMoreLink = styled(ExternalLink) `
  align-items: center;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  color: ${({ theme }) => theme.text1};
  display: flex;
  font-size: 16px;
  height: 44px;
  justify-content: space-between;
  margin: 0 0 20px 0;
  padding: 12px 16px;
  text-decoration: none;
  width: auto;
  :hover,
  :focus,
  :active {
    background-color: rgba(255, 255, 255, 0.05);
  }
  transition: background-color 150ms ease-in-out;
  ${({ thin }) => thin &&
    css `
      font-size: 14px;
      margin: auto;
      width: 112px;
    `}
`;
const RootWrapper = styled.div `
  position: relative;
`;
const ArbitrumWrapperBackgroundDarkMode = css `
  background: radial-gradient(285% 8200% at 30% 50%, rgba(40, 160, 240, 0.1) 0%, rgba(219, 255, 0, 0) 100%),
    radial-gradient(75% 75% at 0% 0%, rgba(150, 190, 220, 0.3) 0%, rgba(33, 114, 229, 0.3) 100%), hsla(0, 0%, 100%, 0.1);
`;
const ArbitrumWrapperBackgroundLightMode = css `
  background: radial-gradient(285% 8200% at 30% 50%, rgba(40, 160, 240, 0.1) 0%, rgba(219, 255, 0, 0) 100%),
    radial-gradient(circle at top left, hsla(206, 50%, 75%, 0.01), hsla(215, 79%, 51%, 0.12)), hsla(0, 0%, 100%, 0.1);
`;
const OptimismWrapperBackgroundDarkMode = css `
  background: radial-gradient(948% 292% at 42% 0%, rgba(255, 58, 212, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%),
    radial-gradient(98% 96% at 2% 0%, rgba(255, 39, 39, 0.5) 0%, rgba(235, 0, 255, 0.345) 96%);
`;
const OptimismWrapperBackgroundLightMode = css `
  background: radial-gradient(92% 105% at 50% 7%, rgba(255, 58, 212, 0.04) 0%, rgba(255, 255, 255, 0.03) 100%),
    radial-gradient(100% 97% at 0% 12%, rgba(235, 0, 255, 0.1) 0%, rgba(243, 19, 19, 0.1) 100%), hsla(0, 0%, 100%, 0.5);
`;
const ContentWrapper$1 = styled.div `
  ${({ chainId, darkMode }) => [SupportedChainId.OPTIMISM, SupportedChainId.OPTIMISTIC_KOVAN].includes(chainId)
    ? darkMode
        ? OptimismWrapperBackgroundDarkMode
        : OptimismWrapperBackgroundLightMode
    : darkMode
        ? ArbitrumWrapperBackgroundDarkMode
        : ArbitrumWrapperBackgroundLightMode};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  max-width: 480px;
  min-height: 174px;
  overflow: hidden;
  position: relative;
  width: 100%;
  ${({ thin }) => thin &&
    css `
      flex-direction: row;
      max-width: max-content;
      min-height: min-content;
    `}
  :before {
    background-image: url(${({ logoUrl }) => logoUrl});
    background-repeat: no-repeat;
    background-size: 300px;
    content: '';
    height: 300px;
    opacity: 0.1;
    position: absolute;
    transform: rotate(25deg) translate(-90px, -40px);
    width: 300px;
    z-index: -1;
  }
`;
const Header$1 = styled.h2 `
  font-weight: 600;
  font-size: 20px;
  margin: 0;
  padding-right: 30px;
  display: ${({ thin }) => (thin ? 'none' : 'block')};
`;
const LinkOutCircle = styled(ArrowDownCircle) `
  margin-left: 12px;
  transform: rotate(230deg);
  width: 20px;
  height: 20px;
`;
const LinkOutToBridge = styled(ExternalLink) `
  align-items: center;
  background-color: black;
  border-radius: 8px;
  color: white;
  display: flex;
  font-size: 16px;
  height: 44px;
  justify-content: space-between;
  margin: 0 12px 20px 18px;
  padding: 12px 16px;
  text-decoration: none;
  width: auto;
  :hover,
  :focus,
  :active {
    background-color: black;
  }
  ${({ thin }) => thin &&
    css `
      font-size: 14px;
      margin: auto 10px;
      width: 168px;
    `}
`;
function NetworkAlert(props) {
    var _a;
    const { account, chainId } = useActiveWeb3React();
    const [darkMode] = useDarkModeManager();
    const [arbitrumAlphaAcknowledged, setArbitrumAlphaAcknowledged] = useArbitrumAlphaAlert();
    const [optimismAlphaAcknowledged, setOptimismAlphaAcknowledged] = useOptimismAlphaAlert();
    const [locallyDismissed, setLocallyDimissed] = useState(false);
    const userEthBalance = (_a = useETHBalances(account ? [account] : [])) === null || _a === void 0 ? void 0 : _a[account !== null && account !== void 0 ? account : ''];
    const dismiss = useCallback(() => {
        if (userEthBalance === null || userEthBalance === void 0 ? void 0 : userEthBalance.greaterThan(0)) {
            switch (chainId) {
                case SupportedChainId.OPTIMISM:
                    setOptimismAlphaAcknowledged(true);
                    break;
                case SupportedChainId.ARBITRUM_ONE:
                    setArbitrumAlphaAcknowledged(true);
                    break;
            }
        }
        else {
            setLocallyDimissed(true);
        }
    }, [chainId, setArbitrumAlphaAcknowledged, setOptimismAlphaAcknowledged, userEthBalance]);
    const onOptimismAndOptimismAcknowledged = SupportedChainId.OPTIMISM === chainId && optimismAlphaAcknowledged;
    const onArbitrumAndArbitrumAcknowledged = SupportedChainId.ARBITRUM_ONE === chainId && arbitrumAlphaAcknowledged;
    if (!chainId ||
        !L2_CHAIN_IDS.includes(chainId) ||
        onArbitrumAndArbitrumAcknowledged ||
        onOptimismAndOptimismAcknowledged ||
        locallyDismissed) {
        return null;
    }
    const info = CHAIN_INFO[chainId];
    const isOptimism = [SupportedChainId.OPTIMISM, SupportedChainId.OPTIMISTIC_KOVAN].includes(chainId);
    const depositUrl = isOptimism ? `${info.bridge}?chainId=1` : info.bridge;
    const helpCenterLink = isOptimism ? OPTIMISM_HELP_CENTER_LINK : ARBITRUM_HELP_CENTER_LINK;
    const showCloseIcon = Boolean((userEthBalance === null || userEthBalance === void 0 ? void 0 : userEthBalance.greaterThan(0)) && !props.thin);
    return (jsxs(RootWrapper, { children: [jsx(BetaTag, Object.assign({ color: isOptimism ? '#ff0420' : '#0490ed' }, { children: "Beta" }), void 0), jsxs(ContentWrapper$1, Object.assign({ chainId: chainId, darkMode: darkMode, logoUrl: info.logoUrl, thin: props.thin }, { children: [showCloseIcon && jsx(CloseIcon, { onClick: dismiss }, void 0), jsxs(BodyText, { children: [jsx(L2Icon, { src: info.logoUrl }, void 0), jsx(Header$1, Object.assign({ thin: props.thin }, { children: jsxs(Trans, { children: ["Uniswap on ", info.label] }, void 0) }), void 0), jsx(Body, { children: jsxs(Trans, { children: ["To start trading on ", info.label, ", first bridge your assets from L1 to L2. Please treat this as a beta release and learn about the risks before using ", info.label, "."] }, void 0) }, void 0)] }, void 0), jsxs(Controls, Object.assign({ thin: props.thin }, { children: [jsxs(LinkOutToBridge, Object.assign({ href: depositUrl, thin: props.thin }, { children: [jsx(Trans, { children: "Deposit Assets" }, void 0), jsx(LinkOutCircle, {}, void 0)] }), void 0), jsx(LearnMoreLink, Object.assign({ href: helpCenterLink, thin: props.thin }, { children: jsx(Trans, { children: "Learn More" }, void 0) }), void 0)] }), void 0)] }), void 0)] }, void 0));
}

const THIRTY_BIPS_FEE = new Percent(JSBI.BigInt(30), JSBI.BigInt(10000));
const ONE_HUNDRED_PERCENT = new Percent(JSBI.BigInt(10000), JSBI.BigInt(10000));
const INPUT_FRACTION_AFTER_FEE = ONE_HUNDRED_PERCENT.subtract(THIRTY_BIPS_FEE);
// computes realized lp fee as a percent
function computeRealizedLPFeePercent(trade) {
    let percent;
    if (trade instanceof Trade) {
        // for each hop in our trade, take away the x*y=k price impact from 0.3% fees
        // e.g. for 3 tokens/2 hops: 1 - ((1 - .03) * (1-.03))
        percent = ONE_HUNDRED_PERCENT.subtract(trade.route.pairs.reduce((currentFee) => currentFee.multiply(INPUT_FRACTION_AFTER_FEE), ONE_HUNDRED_PERCENT));
    }
    else {
        //TODO(judo): validate this
        percent = ZERO_PERCENT;
        for (const swap of trade.swaps) {
            const { numerator, denominator } = swap.inputAmount.divide(trade.inputAmount);
            const overallPercent = new Percent(numerator, denominator);
            const routeRealizedLPFeePercent = overallPercent.multiply(ONE_HUNDRED_PERCENT.subtract(swap.route.pools.reduce((currentFee, pool) => currentFee.multiply(ONE_HUNDRED_PERCENT.subtract(new Fraction(pool.fee, 1000000))), ONE_HUNDRED_PERCENT)));
            percent = percent.add(routeRealizedLPFeePercent);
        }
    }
    return new Percent(percent.numerator, percent.denominator);
}
const IMPACT_TIERS = [
    BLOCKED_PRICE_IMPACT_NON_EXPERT,
    ALLOWED_PRICE_IMPACT_HIGH,
    ALLOWED_PRICE_IMPACT_MEDIUM,
    ALLOWED_PRICE_IMPACT_LOW,
];
function warningSeverity(priceImpact) {
    if (!priceImpact)
        return 4;
    let impact = IMPACT_TIERS.length;
    for (const impactLevel of IMPACT_TIERS) {
        if (impactLevel.lessThan(priceImpact))
            return impact;
        impact--;
    }
    return 0;
}

/**
 * Formatted version of price impact text with warning colors
 */
function FormattedPriceImpact({ priceImpact }) {
    return (jsx(ErrorText, Object.assign({ fontWeight: 500, fontSize: 14, severity: warningSeverity(priceImpact) }, { children: priceImpact ? `${priceImpact.multiply(-1).toFixed(2)}%` : '-' }), void 0));
}

function TextWithLoadingPlaceholder({ syncing, width, children, }) {
    return syncing ? (jsx(LoadingRows, { children: jsx("div", { style: { height: '15px', width: `${width}px` } }, void 0) }, void 0)) : (children);
}
function AdvancedSwapDetails({ trade, allowedSlippage, syncing = false }) {
    const theme = useContext(ThemeContext);
    const { realizedLPFee, priceImpact } = useMemo(() => {
        if (!trade)
            return { realizedLPFee: undefined, priceImpact: undefined };
        const realizedLpFeePercent = computeRealizedLPFeePercent(trade);
        const realizedLPFee = trade.inputAmount.multiply(realizedLpFeePercent);
        const priceImpact = trade.priceImpact.subtract(realizedLpFeePercent);
        return { priceImpact, realizedLPFee };
    }, [trade]);
    return !trade ? null : (jsxs(AutoColumn, Object.assign({ gap: "8px" }, { children: [jsx(TransactionDetailsLabel, Object.assign({ fontWeight: 500, fontSize: 14 }, { children: jsx(Trans, { children: "Transaction Details" }, void 0) }), void 0), jsxs(RowBetween, { children: [jsx(RowFixed, { children: jsx(ThemedText.SubHeader, Object.assign({ color: theme.text1 }, { children: jsx(Trans, { children: "Liquidity Provider Fee" }, void 0) }), void 0) }, void 0), jsx(TextWithLoadingPlaceholder, Object.assign({ syncing: syncing, width: 65 }, { children: jsx(ThemedText.Black, Object.assign({ textAlign: "right", fontSize: 14 }, { children: realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${realizedLPFee.currency.symbol}` : '-' }), void 0) }), void 0)] }, void 0), jsxs(RowBetween, { children: [jsx(RowFixed, { children: jsx(ThemedText.SubHeader, Object.assign({ color: theme.text1 }, { children: jsx(Trans, { children: "Price Impact" }, void 0) }), void 0) }, void 0), jsx(TextWithLoadingPlaceholder, Object.assign({ syncing: syncing, width: 50 }, { children: jsx(ThemedText.Black, Object.assign({ textAlign: "right", fontSize: 14 }, { children: jsx(FormattedPriceImpact, { priceImpact: priceImpact }, void 0) }), void 0) }), void 0)] }, void 0), jsxs(RowBetween, { children: [jsx(RowFixed, { children: jsx(ThemedText.SubHeader, Object.assign({ color: theme.text1 }, { children: jsx(Trans, { children: "Allowed Slippage" }, void 0) }), void 0) }, void 0), jsx(TextWithLoadingPlaceholder, Object.assign({ syncing: syncing, width: 45 }, { children: jsxs(ThemedText.Black, Object.assign({ textAlign: "right", fontSize: 14 }, { children: [allowedSlippage.toFixed(2), "%"] }), void 0) }), void 0)] }, void 0), jsxs(RowBetween, { children: [jsx(RowFixed, { children: jsx(ThemedText.SubHeader, Object.assign({ color: theme.text1 }, { children: trade.tradeType === TradeType.EXACT_INPUT ? jsx(Trans, { children: "Minimum received" }, void 0) : jsx(Trans, { children: "Maximum sent" }, void 0) }), void 0) }, void 0), jsx(TextWithLoadingPlaceholder, Object.assign({ syncing: syncing, width: 70 }, { children: jsx(ThemedText.Black, Object.assign({ textAlign: "right", fontSize: 14 }, { children: trade.tradeType === TradeType.EXACT_INPUT
                                ? `${trade.minimumAmountOut(allowedSlippage).toSignificant(6)} ${trade.outputAmount.currency.symbol}`
                                : `${trade.maximumAmountIn(allowedSlippage).toSignificant(6)} ${trade.inputAmount.currency.symbol}` }), void 0) }), void 0)] }, void 0)] }), void 0));
}

var _defs, _path$2;

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }

const SvgAutoRouter = props => /*#__PURE__*/React.createElement("svg", _extends$3({
  width: 23,
  height: 20,
  viewBox: "0 0 23 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), _defs || (_defs = /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
  id: "gradient1",
  x1: 0,
  y1: 0,
  x2: 1,
  y2: 0,
  gradientTransform: "rotate(95)"
}, /*#__PURE__*/React.createElement("stop", {
  id: "stop1",
  offset: 0,
  stopColor: "#2274E2"
}), /*#__PURE__*/React.createElement("stop", {
  id: "stop1",
  offset: 0.5,
  stopColor: "#2274E2"
}), /*#__PURE__*/React.createElement("stop", {
  id: "stop2",
  offset: 1,
  stopColor: "#3FB672"
})))), _path$2 || (_path$2 = /*#__PURE__*/React.createElement("path", {
  d: "M16 16C10 16 9 10 5 10M16 16C16 17.6569 17.3431 19 19 19C20.6569 19 22 17.6569 22 16C22 14.3431 20.6569 13 19 13C17.3431 13 16 14.3431 16 16ZM5 10C9 10 10 4 16 4M5 10H1.5M16 4C16 5.65685 17.3431 7 19 7C20.6569 7 22 5.65685 22 4C22 2.34315 20.6569 1 19 1C17.3431 1 16 2.34315 16 4Z",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: "url(#gradient1)"
})));

var _path$1;

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

const SvgStaticRoute = props => /*#__PURE__*/React.createElement("svg", _extends$2({
  width: 20,
  height: 20,
  viewBox: "0 0 20 22",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), _path$1 || (_path$1 = /*#__PURE__*/React.createElement("path", {
  d: "M19 18C19 18.5523 18.5523 19 18 19V21C19.6569 21 21 19.6569 21 18H19ZM18 19C17.4477 19 17 18.5523 17 18H15C15 19.6569 16.3431 21 18 21V19ZM17 18C17 17.4477 17.4477 17 18 17V15C16.3431 15 15 16.3431 15 18H17ZM18 17C18.5523 17 19 17.4477 19 18H21C21 16.3431 19.6569 15 18 15V17ZM8 7H16V5H8V7ZM16 11H8V13H16V11ZM8 19H16V17H8V19ZM4 15C4 17.2091 5.79086 19 8 19V17C6.89543 17 6 16.1046 6 15H4ZM8 11C5.79086 11 4 12.7909 4 15H6C6 13.8954 6.89543 13 8 13V11ZM18 9C18 10.1046 17.1046 11 16 11V13C18.2091 13 20 11.2091 20 9H18ZM16 7C17.1046 7 18 7.89543 18 9H20C20 6.79086 18.2091 5 16 5V7ZM7 6C7 6.55228 6.55228 7 6 7V9C7.65685 9 9 7.65685 9 6H7ZM6 7C5.44772 7 5 6.55228 5 6H3C3 7.65685 4.34315 9 6 9V7ZM5 6C5 5.44772 5.44772 5 6 5V3C4.34315 3 3 4.34315 3 6H5ZM6 5C6.55228 5 7 5.44772 7 6H9C9 4.34315 7.65685 3 6 3V5Z"
})));

const StyledAutoRouterIcon = styled(SvgAutoRouter) `
  height: 16px;
  width: 16px;

  :hover {
    filter: brightness(1.3);
  }
`;
const StyledStaticRouterIcon = styled(SvgStaticRoute) `
  height: 16px;
  width: 16px;

  fill: ${({ theme }) => theme.text3};

  :hover {
    filter: brightness(1.3);
  }
`;
const StyledAutoRouterLabel = styled(ThemedText.Black) `
  line-height: 1rem;

  /* fallback color */
  color: ${({ theme }) => theme.green1};

  @supports (-webkit-background-clip: text) and (-webkit-text-fill-color: transparent) {
    background-image: linear-gradient(90deg, #2172e5 0%, #54e521 163.16%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
function AutoRouterLogo() {
    const routingAPIEnabled = useRoutingAPIEnabled();
    return routingAPIEnabled ? jsx(StyledAutoRouterIcon, {}, void 0) : jsx(StyledStaticRouterIcon, {}, void 0);
}
function AutoRouterLabel() {
    const routingAPIEnabled = useRoutingAPIEnabled();
    return routingAPIEnabled ? (jsx(StyledAutoRouterLabel, Object.assign({ fontSize: 14 }, { children: "Auto Router" }), void 0)) : (jsx(ThemedText.Black, Object.assign({ fontSize: 14 }, { children: jsx(Trans, { children: "Trade Route" }, void 0) }), void 0));
}

var BadgeVariant;
(function (BadgeVariant) {
    BadgeVariant["DEFAULT"] = "DEFAULT";
    BadgeVariant["NEGATIVE"] = "NEGATIVE";
    BadgeVariant["POSITIVE"] = "POSITIVE";
    BadgeVariant["PRIMARY"] = "PRIMARY";
    BadgeVariant["WARNING"] = "WARNING";
    BadgeVariant["WARNING_OUTLINE"] = "WARNING_OUTLINE";
})(BadgeVariant || (BadgeVariant = {}));
function pickBackgroundColor(variant, theme) {
    switch (variant) {
        case BadgeVariant.NEGATIVE:
            return theme.error;
        case BadgeVariant.POSITIVE:
            return theme.success;
        case BadgeVariant.PRIMARY:
            return theme.primary1;
        case BadgeVariant.WARNING:
            return theme.warning;
        case BadgeVariant.WARNING_OUTLINE:
            return 'transparent';
        default:
            return theme.bg2;
    }
}
function pickBorder(variant, theme) {
    switch (variant) {
        case BadgeVariant.WARNING_OUTLINE:
            return `1px solid ${theme.warning}`;
        default:
            return 'unset';
    }
}
function pickFontColor(variant, theme) {
    switch (variant) {
        case BadgeVariant.NEGATIVE:
            return readableColor(theme.error);
        case BadgeVariant.POSITIVE:
            return readableColor(theme.success);
        case BadgeVariant.WARNING:
            return readableColor(theme.warning);
        case BadgeVariant.WARNING_OUTLINE:
            return theme.warning;
        default:
            return readableColor(theme.bg2);
    }
}
const Badge = styled.div `
  align-items: center;
  background-color: ${({ theme, variant }) => pickBackgroundColor(variant, theme)};
  border: ${({ theme, variant }) => pickBorder(variant, theme)};
  border-radius: 0.5rem;
  color: ${({ theme, variant }) => pickFontColor(variant, theme)};
  display: inline-flex;
  padding: 4px 6px;
  justify-content: center;
  font-weight: 500;
`;

function hexToUint8Array(hex) {
    hex = hex.startsWith('0x') ? hex.substr(2) : hex;
    if (hex.length % 2 !== 0)
        throw new Error('hex must have length that is multiple of 2');
    const arr = new Uint8Array(hex.length / 2);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return arr;
}
const UTF_8_DECODER = new TextDecoder('utf-8');
/**
 * Returns the URI representation of the content hash for supported codecs
 * @param contenthash to decode
 */
function contenthashToUri(contenthash) {
    const data = hexToUint8Array(contenthash);
    const codec = getNameFromData(data);
    switch (codec) {
        case 'ipfs-ns': {
            const unprefixedData = rmPrefix(data);
            const cid = new CID(unprefixedData);
            return `ipfs://${toB58String(cid.multihash)}`;
        }
        case 'ipns-ns': {
            const unprefixedData = rmPrefix(data);
            const cid = new CID(unprefixedData);
            const multihash = decode(cid.multihash);
            if (multihash.name === 'identity') {
                return `ipns://${UTF_8_DECODER.decode(multihash.digest).trim()}`;
            }
            else {
                return `ipns://${toB58String(cid.multihash)}`;
            }
        }
        default:
            throw new Error(`Unrecognized codec: ${codec}`);
    }
}

const ENS_NAME_REGEX = /^(([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+)eth(\/.*)?$/;
function parseENSAddress(ensAddress) {
    const match = ensAddress.match(ENS_NAME_REGEX);
    if (!match)
        return undefined;
    return { ensName: `${match[1].toLowerCase()}eth`, ensPath: match[4] };
}

/**
 * Does a lookup for an ENS name to find its contenthash.
 */
function useENSContentHash(ensName) {
    var _a;
    const ensNodeArgument = useMemo(() => [ensName === null ? undefined : safeNamehash(ensName)], [ensName]);
    const registrarContract = useENSRegistrarContract(false);
    const resolverAddressResult = useSingleCallResult(registrarContract, 'resolver', ensNodeArgument);
    const resolverAddress = (_a = resolverAddressResult.result) === null || _a === void 0 ? void 0 : _a[0];
    const resolverContract = useENSResolverContract(resolverAddress && isZero(resolverAddress) ? undefined : resolverAddress, false);
    const contenthash = useSingleCallResult(resolverContract, 'contenthash', ensNodeArgument);
    return useMemo(() => {
        var _a, _b;
        return ({
            contenthash: (_b = (_a = contenthash.result) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null,
            loading: resolverAddressResult.loading || contenthash.loading,
        });
    }, [contenthash.loading, contenthash.result, resolverAddressResult.loading]);
}

function useHttpLocations(uri) {
    const ens = useMemo(() => (uri ? parseENSAddress(uri) : undefined), [uri]);
    const resolvedContentHash = useENSContentHash(ens === null || ens === void 0 ? void 0 : ens.ensName);
    return useMemo(() => {
        if (ens) {
            return resolvedContentHash.contenthash ? uriToHttp(contenthashToUri(resolvedContentHash.contenthash)) : [];
        }
        else {
            return uri ? uriToHttp(uri) : [];
        }
    }, [ens, resolvedContentHash.contenthash, uri]);
}

const BAD_SRCS = {};
/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
function Logo(_a) {
    var { srcs, alt, style } = _a, rest = __rest(_a, ["srcs", "alt", "style"]);
    const [, refresh] = useState(0);
    const theme = useTheme();
    const src = srcs.find((src) => !BAD_SRCS[src]);
    if (src) {
        return (jsx("img", Object.assign({}, rest, { alt: alt, src: src, style: style, onError: () => {
                if (src)
                    BAD_SRCS[src] = true;
                refresh((i) => i + 1);
            } }), void 0));
    }
    return jsx(Slash, Object.assign({}, rest, { style: Object.assign(Object.assign({}, style), { color: theme.bg4 }) }), void 0);
}

function chainIdToNetworkName(networkId) {
    switch (networkId) {
        case SupportedChainId.MAINNET:
            return 'ethereum';
        case SupportedChainId.ARBITRUM_ONE:
            return 'arbitrum';
        case SupportedChainId.OPTIMISM:
            return 'optimism';
        default:
            return 'ethereum';
    }
}
const getTokenLogoURL = (address, chainId = SupportedChainId.MAINNET) => {
    const networkName = chainIdToNetworkName(chainId);
    const networksWithUrls = [SupportedChainId.ARBITRUM_ONE, SupportedChainId.MAINNET, SupportedChainId.OPTIMISM];
    if (networksWithUrls.includes(chainId)) {
        return `https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/${networkName}/assets/${address}/logo.png`;
    }
};
const StyledEthereumLogo = styled.img `
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`;
const StyledLogo$1 = styled(Logo) `
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: ${({ theme }) => theme.white};
`;
function CurrencyLogo(_a) {
    var _b;
    var { currency, size = '24px', style } = _a, rest = __rest(_a, ["currency", "size", "style"]);
    const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined);
    const srcs = useMemo(() => {
        if (!currency || currency.isNative)
            return [];
        if (currency.isToken) {
            const defaultUrls = [];
            const url = getTokenLogoURL(currency.address, currency.chainId);
            if (url) {
                defaultUrls.push(url);
            }
            if (currency instanceof WrappedTokenInfo) {
                return [...uriLocations, ...defaultUrls];
            }
            return defaultUrls;
        }
        return [];
    }, [currency, uriLocations]);
    if (currency === null || currency === void 0 ? void 0 : currency.isNative) {
        return jsx(StyledEthereumLogo, Object.assign({ src: EthereumLogo, alt: "ethereum logo", size: size, style: style }, rest), void 0);
    }
    return jsx(StyledLogo$1, Object.assign({ size: size, srcs: srcs, alt: `${(_b = currency === null || currency === void 0 ? void 0 : currency.symbol) !== null && _b !== void 0 ? _b : 'token'} logo`, style: style }, rest), void 0);
}

const Wrapper$a = styled.div `
  position: relative;
  display: flex;
  flex-direction: row;
  margin-left: ${({ sizeraw, margin }) => margin && (sizeraw / 3 + 8).toString() + 'px'};
`;
const HigherLogo = styled(CurrencyLogo) `
  z-index: 2;
`;
const CoveredLogo = styled(CurrencyLogo) `
  position: absolute;
  left: ${({ sizeraw }) => '-' + (sizeraw / 2).toString() + 'px'} !important;
`;
function DoubleCurrencyLogo({ currency0, currency1, size = 16, margin = false, }) {
    return (jsxs(Wrapper$a, Object.assign({ sizeraw: size, margin: margin }, { children: [currency0 && jsx(HigherLogo, { currency: currency0, size: size.toString() + 'px' }, void 0), currency1 && jsx(CoveredLogo, { currency: currency1, size: size.toString() + 'px', sizeraw: size }, void 0)] }), void 0));
}

/**
 * Returns a WrappedTokenInfo from the active token lists when possible,
 * or the passed token otherwise. */
function useTokenInfoFromActiveList(currency) {
    const { chainId } = useActiveWeb3React();
    const activeList = useCombinedActiveList();
    return useMemo(() => {
        if (!chainId)
            return;
        if (currency.isNative)
            return currency;
        try {
            return activeList[chainId][currency.wrapped.address].token;
        }
        catch (e) {
            return currency;
        }
    }, [activeList, chainId, currency]);
}

var _line;

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

const SvgDotLine = props => /*#__PURE__*/React.createElement("svg", _extends$1({
  width: "100%",
  height: 35,
  viewBox: "800 0 300 200",
  xmlns: "http://www.w3.org/2000/svg"
}, props), _line || (_line = /*#__PURE__*/React.createElement("line", {
  x1: 0,
  x2: 2000,
  y1: 100,
  y2: 100,
  stroke: "currentColor",
  strokeWidth: 20,
  strokeLinecap: "round",
  strokeDasharray: "1, 45"
})));

const Wrapper$9 = styled(Box$1) `
  align-items: center;
  background-color: ${({ theme }) => theme.bg0};
  width: 400px;
`;
const RouteContainerRow = styled(Row) `
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 24px 1fr 24px;
`;
const RouteRow = styled(Row) `
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 0.1rem 0.5rem;
  position: relative;
`;
const PoolBadge = styled(Badge) `
  display: flex;
  padding: 0.25rem 0.5rem;
`;
const DottedLine = styled.div `
  display: flex;
  align-items: center;
  position: absolute;
  width: calc(100%);
  z-index: 1;
  opacity: 0.5;
`;
const DotColor = styled(SvgDotLine) `
  path {
    stroke: ${({ theme }) => theme.bg4};
  }
`;
const OpaqueBadge = styled(Badge) `
  background-color: ${({ theme }) => theme.bg2};
  z-index: 2;
`;
function RoutingDiagram({ currencyIn, currencyOut, routes, }) {
    const tokenIn = useTokenInfoFromActiveList(currencyIn);
    const tokenOut = useTokenInfoFromActiveList(currencyOut);
    return (jsx(Wrapper$9, { children: routes.map(({ percent, path }, index) => (jsxs(RouteContainerRow, { children: [jsx(CurrencyLogo, { currency: tokenIn }, void 0), jsx(Route, { percent: percent, path: path }, void 0), jsx(CurrencyLogo, { currency: tokenOut }, void 0)] }, index))) }, void 0));
}
function Route({ percent, path }) {
    return (jsxs(RouteRow, { children: [jsx(DottedLine, { children: jsx(DotColor, {}, void 0) }, void 0), jsx(OpaqueBadge, { children: jsxs(ThemedText.Small, Object.assign({ fontSize: 12, style: { wordBreak: 'normal' } }, { children: [percent.toSignificant(2), "%"] }), void 0) }, void 0), jsx(AutoRow, Object.assign({ gap: "1px", width: "100%", style: { justifyContent: 'space-evenly', zIndex: 2 } }, { children: path.map(([currency0, currency1, feeAmount], index) => (jsx(Pool, { currency0: currency0, currency1: currency1, feeAmount: feeAmount }, index))) }), void 0)] }, void 0));
}
function Pool({ currency0, currency1, feeAmount }) {
    const tokenInfo0 = useTokenInfoFromActiveList(currency0);
    const tokenInfo1 = useTokenInfoFromActiveList(currency1);
    return (jsxs(PoolBadge, { children: [jsx(Box$1, Object.assign({ margin: "0 5px 0 10px" }, { children: jsx(DoubleCurrencyLogo, { currency0: tokenInfo1, currency1: tokenInfo0, size: 20 }, void 0) }), void 0), jsxs(ThemedText.Small, Object.assign({ fontSize: 12 }, { children: [feeAmount / 10000, "%"] }), void 0)] }, void 0));
}

function getTradeVersion(trade) {
    if (!trade)
        return undefined;
    if (trade instanceof Trade)
        return Version.v2;
    return Version.v3;
}

const Separator$1 = styled.div `
  border-top: 1px solid ${({ theme }) => theme.bg2};
  height: 1px;
  width: 100%;
`;
const V2_DEFAULT_FEE_TIER = 3000;
var SwapRoute = memo(function SwapRoute({ trade, syncing, }) {
    const routingAPIEnabled = useRoutingAPIEnabled();
    return (jsxs(AutoColumn, Object.assign({ gap: "12px" }, { children: [jsxs(RowBetween, { children: [jsxs(AutoRow, Object.assign({ gap: "4px", width: "auto" }, { children: [jsx(AutoRouterLogo, {}, void 0), jsx(AutoRouterLabel, {}, void 0)] }), void 0), syncing ? (jsx(LoadingRows, { children: jsx("div", { style: { width: '30px', height: '24px' } }, void 0) }, void 0)) : (jsx(Badge, { children: jsx(ThemedText.Black, Object.assign({ fontSize: 12 }, { children: getTradeVersion(trade) === Version.v2 ? jsx(Trans, { children: "V2" }, void 0) : jsx(Trans, { children: "V3" }, void 0) }), void 0) }, void 0))] }, void 0), jsx(Separator$1, {}, void 0), syncing ? (jsx(LoadingRows, { children: jsx("div", { style: { width: '400px', height: '30px' } }, void 0) }, void 0)) : (jsx(RoutingDiagram, { currencyIn: trade.inputAmount.currency, currencyOut: trade.outputAmount.currency, routes: getTokenPath(trade) }, void 0)), routingAPIEnabled && (jsx(ThemedText.Main, Object.assign({ fontSize: 12, width: 400 }, { children: jsx(Trans, { children: "This route optimizes your price by considering split routes, multiple hops, and gas costs." }, void 0) }), void 0))] }), void 0));
});
function getTokenPath(trade) {
    // convert V2 path to a list of routes
    if (trade instanceof Trade) {
        const { path: tokenPath } = trade.route;
        const path = [];
        for (let i = 1; i < tokenPath.length; i++) {
            path.push([tokenPath[i - 1], tokenPath[i], V2_DEFAULT_FEE_TIER]);
        }
        return [{ percent: new Percent(100, 100), path }];
    }
    return trade.swaps.map(({ route: { tokenPath, pools }, inputAmount, outputAmount }) => {
        const portion = trade.tradeType === TradeType.EXACT_INPUT
            ? inputAmount.divide(trade.inputAmount)
            : outputAmount.divide(trade.outputAmount);
        const percent = new Percent(portion.numerator, portion.denominator);
        const path = [];
        for (let i = 0; i < pools.length; i++) {
            const nextPool = pools[i];
            const tokenIn = tokenPath[i];
            const tokenOut = tokenPath[i + 1];
            path.push([tokenIn, tokenOut, nextPool.fee]);
        }
        return {
            percent,
            path,
        };
    });
}

const DetailsFooter = styled.div `
  padding-top: calc(16px + 2rem);
  padding-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -2rem;
  width: 100%;
  max-width: 400px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  color: ${({ theme }) => theme.text2};
  background-color: ${({ theme }) => theme.advancedBG};
  z-index: ${Z_INDEX.deprecated_zero};

  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform 300ms ease-in-out;
  text-align: center;
`;
const StyledButtonEmpty = styled(ButtonEmpty) `
  text-decoration: none;
`;
const AddressText$1 = styled(ThemedText.Blue) `
  font-size: 12px;

  ${({ theme }) => theme.mediaWidth.upToSmall `
    font-size: 10px;
`}
`;
function UnsupportedCurrencyFooter({ show, currencies, }) {
    const { chainId } = useActiveWeb3React();
    const [showDetails, setShowDetails] = useState(false);
    const tokens = chainId && currencies
        ? currencies.map((currency) => {
            return currency === null || currency === void 0 ? void 0 : currency.wrapped;
        })
        : [];
    const unsupportedTokens = useUnsupportedTokens();
    return (jsxs(DetailsFooter, Object.assign({ show: show }, { children: [jsx(Modal, Object.assign({ isOpen: showDetails, onDismiss: () => setShowDetails(false) }, { children: jsx(Card, Object.assign({ padding: "2rem" }, { children: jsxs(AutoColumn, Object.assign({ gap: "lg" }, { children: [jsxs(RowBetween, { children: [jsx(ThemedText.MediumHeader, { children: jsx(Trans, { children: "Unsupported Assets" }, void 0) }, void 0), jsx(CloseIcon$3, { onClick: () => setShowDetails(false) }, void 0)] }, void 0), tokens.map((token) => {
                                var _a;
                                return (token &&
                                    unsupportedTokens &&
                                    Object.keys(unsupportedTokens).includes(token.address) && (jsx(OutlineCard, { children: jsxs(AutoColumn, Object.assign({ gap: "10px" }, { children: [jsxs(AutoRow, Object.assign({ gap: "5px", align: "center" }, { children: [jsx(CurrencyLogo, { currency: token, size: '24px' }, void 0), jsx(ThemedText.Body, Object.assign({ fontWeight: 500 }, { children: token.symbol }), void 0)] }), void 0), chainId && (jsx(ExternalLink, Object.assign({ href: getExplorerLink(chainId, token.address, ExplorerDataType.ADDRESS) }, { children: jsx(AddressText$1, { children: token.address }, void 0) }), void 0))] }), void 0) }, (_a = token.address) === null || _a === void 0 ? void 0 : _a.concat('not-supported'))));
                            }), jsx(AutoColumn, Object.assign({ gap: "lg" }, { children: jsx(ThemedText.Body, Object.assign({ fontWeight: 500 }, { children: jsx(Trans, { children: "Some assets are not available through this interface because they may not work well with the smart contracts or we are unable to allow trading for legal reasons." }, void 0) }), void 0) }), void 0)] }), void 0) }), void 0) }), void 0), jsx(StyledButtonEmpty, Object.assign({ padding: '0', onClick: () => setShowDetails(true) }, { children: jsx(ThemedText.Blue, { children: jsx(Trans, { children: "Read more about unsupported assets" }, void 0) }, void 0) }), void 0)] }), void 0));
}

function formatCurrencyAmount(amount, sigFigs) {
    if (!amount) {
        return '-';
    }
    if (JSBI.equal(amount.quotient, JSBI.BigInt(0))) {
        return '0';
    }
    if (amount.divide(amount.decimalScale).lessThan(new Fraction(1, 100000))) {
        return '<0.00001';
    }
    return amount.toSignificant(sigFigs);
}

var _path;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const SvgDropdown = props => /*#__PURE__*/React.createElement("svg", _extends({
  width: 12,
  height: 7,
  viewBox: "0 0 12 7",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, props), _path || (_path = /*#__PURE__*/React.createElement("path", {
  d: "M0.97168 1L6.20532 6L11.439 1",
  stroke: "#AEAEAE"
})));

const StyledInput = styled.input `
  color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
  width: 0;
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: ${({ theme }) => theme.bg1};
  font-size: ${({ fontSize }) => fontSize !== null && fontSize !== void 0 ? fontSize : '24px'};
  text-align: ${({ align }) => align && align};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  -webkit-appearance: textfield;
  text-align: right;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
`;
const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group
const Input$1 = React__default.memo(function InnerInput(_a) {
    var { value, onUserInput, placeholder, prependSymbol } = _a, rest = __rest(_a, ["value", "onUserInput", "placeholder", "prependSymbol"]);
    const enforcer = (nextUserInput) => {
        if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
            onUserInput(nextUserInput);
        }
    };
    return (jsx(StyledInput, Object.assign({}, rest, { value: prependSymbol && value ? prependSymbol + value : value, onChange: (event) => {
            if (prependSymbol) {
                const value = event.target.value;
                // cut off prepended symbol
                const formattedValue = value.toString().includes(prependSymbol)
                    ? value.toString().slice(1, value.toString().length + 1)
                    : value;
                // replace commas with periods, because uniswap exclusively uses period as the decimal separator
                enforcer(formattedValue.replace(/,/g, '.'));
            }
            else {
                enforcer(event.target.value.replace(/,/g, '.'));
            }
        }, 
        // universal input options
        inputMode: "decimal", autoComplete: "off", autoCorrect: "off", 
        // text-specific options
        type: "text", pattern: "^[0-9]*[.,]?[0-9]*$", placeholder: placeholder || '0.0', minLength: 1, maxLength: 79, spellCheck: "false" }), void 0));
});

/**
 * Returns the last value of type T that passes a filter function
 * @param value changing value
 * @param filterFn function that determines whether a given value should be considered for the last value
 */
function useLast(value, filterFn) {
    const [last, setLast] = useState(filterFn && filterFn(value) ? value : undefined);
    useEffect(() => {
        setLast((last) => {
            const shouldUse = filterFn ? filterFn(value) : true;
            if (shouldUse)
                return value;
            return last;
        });
    }, [filterFn, value]);
    return last;
}

function useToggle(initialState = false) {
    const [state, setState] = useState(initialState);
    const toggle = useCallback(() => setState((state) => !state), []);
    return [state, toggle];
}

const QuestionWrapper = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  width: 18px;
  height: 18px;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;
  font-size: 12px;
  background-color: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text2};

  :hover,
  :focus {
    opacity: 0.7;
  }
`;
const QuestionMark = styled.span `
  font-size: 14px;
`;
function QuestionHelper({ text }) {
    const [show, setShow] = useState(false);
    const open = useCallback(() => setShow(true), [setShow]);
    const close = useCallback(() => setShow(false), [setShow]);
    return (jsx("span", Object.assign({ style: { marginLeft: 4, display: 'flex', alignItems: 'center' } }, { children: jsx(Tooltip, Object.assign({ text: text, show: show }, { children: jsx(QuestionWrapper, Object.assign({ onClick: open, onMouseEnter: open, onMouseLeave: close }, { children: jsx(QuestionMark, { children: "?" }, void 0) }), void 0) }), void 0) }), void 0));
}

function currencyId(currency) {
    if (currency.isNative)
        return 'ETH';
    if (currency.isToken)
        return currency.address;
    throw new Error('invalid currency');
}

const MobileWrapper = styled(AutoColumn) `
  ${({ theme }) => theme.mediaWidth.upToSmall `
    display: none;
  `};
`;
const BaseWrapper = styled.div `
  border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.bg3)};
  border-radius: 10px;
  display: flex;
  padding: 6px;

  align-items: center;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.bg2};
  }

  color: ${({ theme, disable }) => disable && theme.text3};
  background-color: ${({ theme, disable }) => disable && theme.bg3};
  filter: ${({ disable }) => disable && 'grayscale(1)'};
`;
function CommonBases({ chainId, onSelect, selectedCurrency, }) {
    var _a;
    const bases = typeof chainId !== 'undefined' ? (_a = COMMON_BASES[chainId]) !== null && _a !== void 0 ? _a : [] : [];
    return bases.length > 0 ? (jsxs(MobileWrapper, Object.assign({ gap: "md" }, { children: [jsxs(AutoRow, { children: [jsx(Text$1, Object.assign({ fontWeight: 500, fontSize: 14 }, { children: jsx(Trans, { children: "Common bases" }, void 0) }), void 0), jsx(QuestionHelper, { text: jsx(Trans, { children: "These tokens are commonly paired with other tokens." }, void 0) }, void 0)] }, void 0), jsx(AutoRow, Object.assign({ gap: "4px" }, { children: bases.map((currency) => {
                    const isSelected = selectedCurrency === null || selectedCurrency === void 0 ? void 0 : selectedCurrency.equals(currency);
                    return (jsxs(BaseWrapper, Object.assign({ onClick: () => !isSelected && onSelect(currency), disable: isSelected }, { children: [jsx(CurrencyLogoFromList, { currency: currency }, void 0), jsx(Text$1, Object.assign({ fontWeight: 500, fontSize: 16 }, { children: currency.symbol }), void 0)] }), currencyId(currency)));
                }) }), void 0)] }), void 0)) : null;
}
/** helper component to retrieve a base currency from the active token lists */
function CurrencyLogoFromList({ currency }) {
    const token = useTokenInfoFromActiveList(currency);
    return jsx(CurrencyLogo, { currency: token, style: { marginRight: 8 } }, void 0);
}

var TokenListLogo = "data:image/svg+xml,%3Csvg%20width%3D%22225%22%20height%3D%22225%22%20viewBox%3D%220%200%20225%20225%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M74.8125%20190.529C65.7561%20190.513%2055.5298%20183.748%2051.9715%20175.42L19.9417%20100.456C16.3834%2092.1277%2020.8404%2085.39%2029.8968%2085.4068L111.417%2085.5579C120.473%2085.5747%20130.699%2092.3395%20134.258%20100.668L166.288%20175.632C169.846%20183.96%20165.389%20190.697%20156.332%20190.681L74.8125%20190.529Z%22%20fill%3D%22%23131313%22%2F%3E%3Cpath%20d%3D%22M92.1541%20164.065C83.0977%20164.049%2072.8715%20157.284%2069.3132%20148.956L28.3003%2052.9672C24.7419%2044.6391%2029.199%2037.9015%2038.2554%2037.9182L142.638%2038.1117C151.695%2038.1285%20161.921%2044.8933%20165.479%2053.2214L206.492%20149.21C210.051%20157.538%20205.594%20164.276%20196.537%20164.259L92.1541%20164.065Z%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M92.1541%20164.065C83.0977%20164.049%2072.8715%20157.284%2069.3132%20148.956L28.3003%2052.9672C24.7419%2044.6391%2029.199%2037.9015%2038.2554%2037.9182L142.638%2038.1117C151.695%2038.1285%20161.921%2044.8933%20165.479%2053.2214L206.492%20149.21C210.051%20157.538%20205.594%20164.276%20196.537%20164.259L92.1541%20164.065Z%22%20fill%3D%22url%28%23paint0_radial%29%22%2F%3E%3Cpath%20d%3D%22M92.1541%20164.065C83.0977%20164.049%2072.8715%20157.284%2069.3132%20148.956L28.3003%2052.9672C24.7419%2044.6391%2029.199%2037.9015%2038.2554%2037.9182L142.638%2038.1117C151.695%2038.1285%20161.921%2044.8933%20165.479%2053.2214L206.492%20149.21C210.051%20157.538%20205.594%20164.276%20196.537%20164.259L92.1541%20164.065Z%22%20fill%3D%22url%28%23paint1_radial%29%22%2F%3E%3Cpath%20d%3D%22M92.1541%20164.065C83.0977%20164.049%2072.8715%20157.284%2069.3132%20148.956L28.3003%2052.9672C24.7419%2044.6391%2029.199%2037.9015%2038.2554%2037.9182L142.638%2038.1117C151.695%2038.1285%20161.921%2044.8933%20165.479%2053.2214L206.492%20149.21C210.051%20157.538%20205.594%20164.276%20196.537%20164.259L92.1541%20164.065Z%22%20fill%3D%22url%28%23paint2_radial%29%22%2F%3E%3Cpath%20d%3D%22M92.1541%20164.065C83.0977%20164.049%2072.8715%20157.284%2069.3132%20148.956L28.3003%2052.9672C24.7419%2044.6391%2029.199%2037.9015%2038.2554%2037.9182L142.638%2038.1117C151.695%2038.1285%20161.921%2044.8933%20165.479%2053.2214L206.492%20149.21C210.051%20157.538%20205.594%20164.276%20196.537%20164.259L92.1541%20164.065Z%22%20fill%3D%22url%28%23paint3_radial%29%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M92.958%20165.95C82.7695%20165.931%2071.265%20158.321%2067.2619%20148.952L26.2489%2052.9632C22.2458%2043.5941%2027.26%2036.0143%2037.4485%2036.0332L141.832%2036.2266C152.02%2036.2455%20163.525%2043.8559%20167.528%2053.225L208.541%20149.214C212.544%20158.583%20207.53%20166.163%20197.341%20166.144L92.958%20165.95ZM71.3614%20148.959C74.475%20156.246%2083.4229%20162.166%2091.3473%20162.18L195.73%20162.374C203.655%20162.388%20207.555%20156.493%20204.441%20149.206L163.428%2053.2174C160.315%2045.9304%20151.367%2040.0111%20143.442%2039.9964L39.0592%2039.803C31.1349%2039.7883%2027.2349%2045.6837%2030.3485%2052.9708L71.3614%20148.959Z%22%20fill%3D%22%23131313%22%2F%3E%3Cpath%20d%3D%22M68.565%2053.3425C81.1781%2053.3659%2095.4205%2062.7875%20100.376%2074.3862C105.332%2085.985%2099.1246%2095.3687%2086.5115%2095.3454C73.8984%2095.322%2059.6559%2085.9004%2054.7001%2074.3016C49.7443%2062.7028%2055.9518%2053.3191%2068.565%2053.3425Z%22%20fill%3D%22%23131313%22%2F%3E%3Cpath%20d%3D%22M90.6891%20104.981C103.302%20105.004%20117.545%20114.425%20122.5%20126.024C127.456%20137.623%20121.249%20147.007%20108.636%20146.983C96.0225%20146.96%2081.7801%20137.538%2076.8243%20125.94C71.8685%20114.341%2078.076%20104.957%2090.6891%20104.981Z%22%20fill%3D%22%23131313%22%2F%3E%3Cpath%20d%3D%22M147.538%20105.142C160.151%20105.166%20174.394%20114.587%20179.349%20126.186C184.305%20137.785%20178.098%20147.168%20165.485%20147.145C152.871%20147.122%20138.629%20137.7%20133.673%20126.101C128.717%20114.503%20134.925%20105.119%20147.538%20105.142Z%22%20fill%3D%22%23131313%22%2F%3E%3Cdefs%3E%3CradialGradient%20id%3D%22paint0_radial%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientUnits%3D%22userSpaceOnUse%22%20gradientTransform%3D%22translate%28134.41%2068.3006%29%20rotate%28-33.9533%29%20scale%2890.6795%2083.3208%29%22%3E%3Cstop%20offset%3D%220.661458%22%20stop-color%3D%22%23C4FCF8%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22white%22%20stop-opacity%3D%220%22%2F%3E%3C%2FradialGradient%3E%3CradialGradient%20id%3D%22paint1_radial%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientUnits%3D%22userSpaceOnUse%22%20gradientTransform%3D%22translate%2842.7873%20129.218%29%20rotate%28-24.1606%29%20scale%28213.359%20196.045%29%22%3E%3Cstop%20stop-color%3D%22%23FF0099%22%20stop-opacity%3D%220.9%22%2F%3E%3Cstop%20offset%3D%220.770833%22%20stop-color%3D%22white%22%20stop-opacity%3D%220%22%2F%3E%3C%2FradialGradient%3E%3CradialGradient%20id%3D%22paint2_radial%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientUnits%3D%22userSpaceOnUse%22%20gradientTransform%3D%22translate%28176.854%20148.655%29%20rotate%28-53.4908%29%20scale%28107.342%2098.6309%29%22%3E%3Cstop%20stop-color%3D%22%23FFEC43%22%2F%3E%3Cstop%20offset%3D%220.805707%22%20stop-color%3D%22%23FFF6A8%22%20stop-opacity%3D%220%22%2F%3E%3C%2FradialGradient%3E%3CradialGradient%20id%3D%22paint3_radial%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientUnits%3D%22userSpaceOnUse%22%20gradientTransform%3D%22translate%2857.5443%2053.4752%29%20rotate%2820.3896%29%20scale%28137.027%20125.907%29%22%3E%3Cstop%20offset%3D%220.125%22%20stop-color%3D%22%235886FE%22%20stop-opacity%3D%220.46%22%2F%3E%3Cstop%20offset%3D%220.673044%22%20stop-color%3D%22white%22%20stop-opacity%3D%220%22%2F%3E%3C%2FradialGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E";

const StyledListLogo = styled(Logo) `
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;
function ListLogo({ logoURI, style, size = '24px', alt, }) {
    const srcs = useHttpLocations(logoURI);
    return jsx(StyledListLogo, { alt: alt, size: size, srcs: srcs, style: style }, void 0);
}

const TokenSection = styled.div `
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) auto;
  grid-gap: 16px;
  align-items: center;

  opacity: ${({ dim }) => (dim ? '0.4' : '1')};
`;
const CheckIcon = styled(CheckCircle) `
  height: 16px;
  width: 16px;
  margin-right: 6px;
  stroke: ${({ theme }) => theme.green1};
`;
const NameOverflow = styled.div `
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
  font-size: 12px;
`;
function ImportRow({ token, style, dim, showImportView, setImportToken, }) {
    const theme = useTheme();
    // check if already active on list or local storage tokens
    const isAdded = useIsUserAddedToken(token);
    const isActive = useIsTokenActive(token);
    const list = token instanceof WrappedTokenInfo ? token.list : undefined;
    return (jsxs(TokenSection, Object.assign({ style: style }, { children: [jsx(CurrencyLogo, { currency: token, size: '24px', style: { opacity: dim ? '0.6' : '1' } }, void 0), jsxs(AutoColumn, Object.assign({ gap: "4px", style: { opacity: dim ? '0.6' : '1' } }, { children: [jsxs(AutoRow, { children: [jsx(ThemedText.Body, Object.assign({ fontWeight: 500 }, { children: token.symbol }), void 0), jsx(ThemedText.DarkGray, Object.assign({ ml: "8px", fontWeight: 300 }, { children: jsx(NameOverflow, Object.assign({ title: token.name }, { children: token.name }), void 0) }), void 0)] }, void 0), list && list.logoURI && (jsxs(RowFixed, { children: [jsx(ThemedText.Small, Object.assign({ mr: "4px", color: theme.text3 }, { children: jsxs(Trans, { children: ["via ", list.name, " "] }, void 0) }), void 0), jsx(ListLogo, { logoURI: list.logoURI, size: "12px" }, void 0)] }, void 0))] }), void 0), !isActive && !isAdded ? (jsx(ButtonPrimary, Object.assign({ width: "fit-content", padding: "6px 12px", fontWeight: 500, fontSize: "14px", onClick: () => {
                    setImportToken && setImportToken(token);
                    showImportView();
                } }, { children: jsx(Trans, { children: "Import" }, void 0) }), void 0)) : (jsxs(RowFixed, Object.assign({ style: { minWidth: 'fit-content' } }, { children: [jsx(CheckIcon, {}, void 0), jsx(ThemedText.Main, Object.assign({ color: theme.green1 }, { children: jsx(Trans, { children: "Active" }, void 0) }), void 0)] }), void 0))] }), void 0));
}

const TextDot = styled.div `
  height: 3px;
  width: 3px;
  background-color: ${({ theme }) => theme.text2};
  border-radius: 50%;
`;
const Checkbox = styled.input `
  border: 1px solid ${({ theme }) => theme.red3};
  height: 20px;
  margin: 0;
`;
const PaddedColumn = styled(AutoColumn) `
  padding: 20px;
`;
const MenuItem = styled(RowBetween) `
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) auto minmax(0, 72px);
  grid-gap: 16px;
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  :hover {
    background-color: ${({ theme, disabled }) => !disabled && theme.bg2};
  }
  opacity: ${({ disabled, selected }) => (disabled || selected ? 0.5 : 1)};
`;
const SearchInput = styled.input `
  position: relative;
  display: flex;
  padding: 16px;
  align-items: center;
  width: 100%;
  white-space: nowrap;
  background: none;
  border: none;
  outline: none;
  border-radius: 20px;
  color: ${({ theme }) => theme.text1};
  border-style: solid;
  border: 1px solid ${({ theme }) => theme.bg3};
  -webkit-appearance: none;

  font-size: 18px;

  ::placeholder {
    color: ${({ theme }) => theme.text3};
  }
  transition: border 100ms;
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }
`;
const Separator = styled.div `
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg2};
`;
const SeparatorDark = styled.div `
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg3};
`;

function currencyKey(currency) {
    return currency.isToken ? currency.address : 'ETHER';
}
const StyledBalanceText = styled(Text$1) `
  white-space: nowrap;
  overflow: hidden;
  max-width: 5rem;
  text-overflow: ellipsis;
`;
const Tag = styled.div `
  background-color: ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.text2};
  font-size: 14px;
  border-radius: 4px;
  padding: 0.25rem 0.3rem 0.25rem 0.3rem;
  max-width: 6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  justify-self: flex-end;
  margin-right: 4px;
`;
const FixedContentRow = styled.div `
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-gap: 16px;
  align-items: center;
`;
function Balance({ balance }) {
    return jsx(StyledBalanceText, Object.assign({ title: balance.toExact() }, { children: balance.toSignificant(4) }), void 0);
}
const TagContainer = styled.div `
  display: flex;
  justify-content: flex-end;
`;
const TokenListLogoWrapper = styled.img `
  height: 20px;
`;
function TokenTags({ currency }) {
    if (!(currency instanceof WrappedTokenInfo)) {
        return jsx("span", {}, void 0);
    }
    const tags = currency.tags;
    if (!tags || tags.length === 0)
        return jsx("span", {}, void 0);
    const tag = tags[0];
    return (jsxs(TagContainer, { children: [jsx(MouseoverTooltip, Object.assign({ text: tag.description }, { children: jsx(Tag, { children: tag.name }, tag.id) }), void 0), tags.length > 1 ? (jsx(MouseoverTooltip, Object.assign({ text: tags
                    .slice(1)
                    .map(({ name, description }) => `${name}: ${description}`)
                    .join('; \n') }, { children: jsx(Tag, { children: "..." }, void 0) }), void 0)) : null] }, void 0));
}
function CurrencyRow({ currency, onSelect, isSelected, otherSelected, style, showCurrencyAmount, }) {
    const { account } = useActiveWeb3React();
    const key = currencyKey(currency);
    const selectedTokenList = useCombinedActiveList();
    const isOnSelectedList = isTokenOnList(selectedTokenList, currency.isToken ? currency : undefined);
    const customAdded = useIsUserAddedToken(currency);
    const balance = useCurrencyBalance(account !== null && account !== void 0 ? account : undefined, currency);
    // only show add or remove buttons if not on selected list
    return (jsxs(MenuItem, Object.assign({ style: style, className: `token-item-${key}`, onClick: () => (isSelected ? null : onSelect()), disabled: isSelected, selected: otherSelected }, { children: [jsx(CurrencyLogo, { currency: currency, size: '24px' }, void 0), jsxs(Column, { children: [jsx(Text$1, Object.assign({ title: currency.name, fontWeight: 500 }, { children: currency.symbol }), void 0), jsx(ThemedText.DarkGray, Object.assign({ ml: "0px", fontSize: '12px', fontWeight: 300 }, { children: !currency.isNative && !isOnSelectedList && customAdded ? (jsxs(Trans, { children: [currency.name, " \u2022 Added by user"] }, void 0)) : (currency.name) }), void 0)] }, void 0), jsx(TokenTags, { currency: currency }, void 0), showCurrencyAmount && (jsx(RowFixed, Object.assign({ style: { justifySelf: 'flex-end' } }, { children: balance ? jsx(Balance, { balance: balance }, void 0) : account ? jsx(Loader, {}, void 0) : null }), void 0))] }), void 0));
}
const BREAK_LINE = 'BREAK';
function isBreakLine(x) {
    return x === BREAK_LINE;
}
function BreakLineComponent({ style }) {
    const theme = useTheme();
    return (jsx(FixedContentRow, Object.assign({ style: style }, { children: jsx(LightGreyCard, Object.assign({ padding: "8px 12px", "$borderRadius": "8px" }, { children: jsxs(RowBetween, { children: [jsxs(RowFixed, { children: [jsx(TokenListLogoWrapper, { src: TokenListLogo }, void 0), jsx(ThemedText.Main, Object.assign({ ml: "6px", fontSize: "12px", color: theme.text1 }, { children: jsx(Trans, { children: "Expanded results from inactive Token Lists" }, void 0) }), void 0)] }, void 0), jsx(QuestionHelper, { text: jsx(Trans, { children: "Tokens from inactive lists. Import specific tokens below or click Manage to activate more lists." }, void 0) }, void 0)] }, void 0) }), void 0) }), void 0));
}
function CurrencyList({ height, currencies, otherListTokens, selectedCurrency, onCurrencySelect, otherCurrency, fixedListRef, showImportView, setImportToken, showCurrencyAmount, }) {
    const itemData = useMemo(() => {
        if (otherListTokens && (otherListTokens === null || otherListTokens === void 0 ? void 0 : otherListTokens.length) > 0) {
            return [...currencies, BREAK_LINE, ...otherListTokens];
        }
        return currencies;
    }, [currencies, otherListTokens]);
    const Row = useCallback(function TokenRow({ data, index, style }) {
        const row = data[index];
        if (isBreakLine(row)) {
            return jsx(BreakLineComponent, { style: style }, void 0);
        }
        const currency = row;
        const isSelected = Boolean(currency && selectedCurrency && selectedCurrency.equals(currency));
        const otherSelected = Boolean(currency && otherCurrency && otherCurrency.equals(currency));
        const handleSelect = () => currency && onCurrencySelect(currency);
        const token = currency === null || currency === void 0 ? void 0 : currency.wrapped;
        const showImport = index > currencies.length;
        if (showImport && token) {
            return (jsx(ImportRow, { style: style, token: token, showImportView: showImportView, setImportToken: setImportToken, dim: true }, void 0));
        }
        else if (currency) {
            return (jsx(CurrencyRow, { style: style, currency: currency, isSelected: isSelected, onSelect: handleSelect, otherSelected: otherSelected, showCurrencyAmount: showCurrencyAmount }, void 0));
        }
        else {
            return null;
        }
    }, [
        currencies.length,
        onCurrencySelect,
        otherCurrency,
        selectedCurrency,
        setImportToken,
        showImportView,
        showCurrencyAmount,
    ]);
    const itemKey = useCallback((index, data) => {
        const currency = data[index];
        if (isBreakLine(currency))
            return BREAK_LINE;
        return currencyKey(currency);
    }, []);
    return (jsx(FixedSizeList, Object.assign({ height: height, ref: fixedListRef, width: "100%", itemData: itemData, itemCount: itemData.length, itemSize: 56, itemKey: itemKey }, { children: Row }), void 0));
}

// compare two token amounts with highest one coming first
function balanceComparator(balanceA, balanceB) {
    if (balanceA && balanceB) {
        return balanceA.greaterThan(balanceB) ? -1 : balanceA.equalTo(balanceB) ? 0 : 1;
    }
    else if (balanceA && balanceA.greaterThan('0')) {
        return -1;
    }
    else if (balanceB && balanceB.greaterThan('0')) {
        return 1;
    }
    return 0;
}
function getTokenComparator(balances) {
    return function sortTokens(tokenA, tokenB) {
        // -1 = a is first
        // 1 = b is first
        // sort by balances
        const balanceA = balances[tokenA.address];
        const balanceB = balances[tokenB.address];
        const balanceComp = balanceComparator(balanceA, balanceB);
        if (balanceComp !== 0)
            return balanceComp;
        if (tokenA.symbol && tokenB.symbol) {
            // sort by symbol
            return tokenA.symbol.toLowerCase() < tokenB.symbol.toLowerCase() ? -1 : 1;
        }
        else {
            return tokenA.symbol ? -1 : tokenB.symbol ? -1 : 0;
        }
    };
}
function useTokenComparator(inverted) {
    const balances = useAllTokenBalances();
    const comparator = useMemo(() => getTokenComparator(balances !== null && balances !== void 0 ? balances : {}), [balances]);
    return useMemo(() => {
        if (inverted) {
            return (tokenA, tokenB) => comparator(tokenA, tokenB) * -1;
        }
        else {
            return comparator;
        }
    }, [inverted, comparator]);
}

const ContentWrapper = styled(Column) `
  width: 100%;
  flex: 1 1;
  position: relative;
`;
const Footer$1 = styled.div `
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background-color: ${({ theme }) => theme.bg1};
  border-top: 1px solid ${({ theme }) => theme.bg2};
`;
function CurrencySearch({ selectedCurrency, onCurrencySelect, otherSelectedCurrency, showCommonBases, showCurrencyAmount, disableNonToken, onDismiss, isOpen, showManageView, showImportView, setImportToken, }) {
    const { chainId } = useActiveWeb3React();
    const theme = useTheme();
    // refs for fixed size lists
    const fixedList = useRef();
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedQuery = useDebounce(searchQuery, 200);
    const [invertSearchOrder] = useState(false);
    const allTokens = useAllTokens();
    // if they input an address, use it
    const isAddressSearch = isAddress(debouncedQuery);
    const searchToken = useToken(debouncedQuery);
    const searchTokenIsAdded = useIsUserAddedToken(searchToken);
    useEffect(() => {
        if (isAddressSearch) {
            ReactGA.event({
                category: 'Currency Select',
                action: 'Search by address',
                label: isAddressSearch,
            });
        }
    }, [isAddressSearch]);
    const tokenComparator = useTokenComparator(invertSearchOrder);
    const filteredTokens = useMemo(() => {
        return filterTokens(Object.values(allTokens), debouncedQuery);
    }, [allTokens, debouncedQuery]);
    const sortedTokens = useMemo(() => {
        return filteredTokens.sort(tokenComparator);
    }, [filteredTokens, tokenComparator]);
    const filteredSortedTokens = useSortedTokensByQuery(sortedTokens, debouncedQuery);
    const ether = useMemo(() => chainId && ExtendedEther.onChain(chainId), [chainId]);
    const filteredSortedTokensWithETH = useMemo(() => {
        const s = debouncedQuery.toLowerCase().trim();
        if (s === '' || s === 'e' || s === 'et' || s === 'eth') {
            return ether ? [ether, ...filteredSortedTokens] : filteredSortedTokens;
        }
        return filteredSortedTokens;
    }, [debouncedQuery, ether, filteredSortedTokens]);
    const handleCurrencySelect = useCallback((currency) => {
        onCurrencySelect(currency);
        onDismiss();
    }, [onDismiss, onCurrencySelect]);
    // clear the input on open
    useEffect(() => {
        if (isOpen)
            setSearchQuery('');
    }, [isOpen]);
    // manage focus on modal show
    const inputRef = useRef();
    const handleInput = useCallback((event) => {
        var _a;
        const input = event.target.value;
        const checksummedInput = isAddress(input);
        setSearchQuery(checksummedInput || input);
        (_a = fixedList.current) === null || _a === void 0 ? void 0 : _a.scrollTo(0);
    }, []);
    const handleEnter = useCallback((e) => {
        var _a;
        if (e.key === 'Enter') {
            const s = debouncedQuery.toLowerCase().trim();
            if (s === 'eth' && ether) {
                handleCurrencySelect(ether);
            }
            else if (filteredSortedTokensWithETH.length > 0) {
                if (((_a = filteredSortedTokensWithETH[0].symbol) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === debouncedQuery.trim().toLowerCase() ||
                    filteredSortedTokensWithETH.length === 1) {
                    handleCurrencySelect(filteredSortedTokensWithETH[0]);
                }
            }
        }
    }, [debouncedQuery, ether, filteredSortedTokensWithETH, handleCurrencySelect]);
    // menu ui
    const [open, toggle] = useToggle(false);
    const node = useRef();
    useOnClickOutside(node, open ? toggle : undefined);
    // if no results on main list, show option to expand into inactive
    const filteredInactiveTokens = useSearchInactiveTokenLists(filteredTokens.length === 0 || (debouncedQuery.length > 2 && !isAddressSearch) ? debouncedQuery : undefined);
    return (jsxs(ContentWrapper, { children: [jsxs(PaddedColumn, Object.assign({ gap: "16px" }, { children: [jsxs(RowBetween, { children: [jsx(Text$1, Object.assign({ fontWeight: 500, fontSize: 16 }, { children: jsx(Trans, { children: "Select a token" }, void 0) }), void 0), jsx(CloseIcon$3, { onClick: onDismiss }, void 0)] }, void 0), jsx(Row, { children: jsx(SearchInput, { type: "text", id: "token-search-input", placeholder: t `Search name or paste address`, autoComplete: "off", value: searchQuery, ref: inputRef, onChange: handleInput, onKeyDown: handleEnter }, void 0) }, void 0), showCommonBases && (jsx(CommonBases, { chainId: chainId, onSelect: handleCurrencySelect, selectedCurrency: selectedCurrency }, void 0))] }), void 0), jsx(Separator, {}, void 0), searchToken && !searchTokenIsAdded ? (jsx(Column, Object.assign({ style: { padding: '20px 0', height: '100%' } }, { children: jsx(ImportRow, { token: searchToken, showImportView: showImportView, setImportToken: setImportToken }, void 0) }), void 0)) : (filteredSortedTokens === null || filteredSortedTokens === void 0 ? void 0 : filteredSortedTokens.length) > 0 || (filteredInactiveTokens === null || filteredInactiveTokens === void 0 ? void 0 : filteredInactiveTokens.length) > 0 ? (jsx("div", Object.assign({ style: { flex: '1' } }, { children: jsx(AutoSizer, Object.assign({ disableWidth: true }, { children: ({ height }) => (jsx(CurrencyList, { height: height, currencies: disableNonToken ? filteredSortedTokens : filteredSortedTokensWithETH, otherListTokens: filteredInactiveTokens, onCurrencySelect: handleCurrencySelect, otherCurrency: otherSelectedCurrency, selectedCurrency: selectedCurrency, fixedListRef: fixedList, showImportView: showImportView, setImportToken: setImportToken, showCurrencyAmount: showCurrencyAmount }, void 0)) }), void 0) }), void 0)) : (jsx(Column, Object.assign({ style: { padding: '20px', height: '100%' } }, { children: jsx(ThemedText.Main, Object.assign({ color: theme.text3, textAlign: "center", mb: "20px" }, { children: jsx(Trans, { children: "No results found." }, void 0) }), void 0) }), void 0)), jsx(Footer$1, { children: jsx(Row, Object.assign({ justify: "center" }, { children: jsx(ButtonText, Object.assign({ onClick: showManageView, color: theme.primary1, className: "list-token-manage-button" }, { children: jsxs(RowFixed, { children: [jsx(IconWrapper$4, Object.assign({ size: "16px", marginRight: "6px", stroke: theme.primaryText1 }, { children: jsx(Edit, {}, void 0) }), void 0), jsx(ThemedText.Main, Object.assign({ color: theme.primaryText1 }, { children: jsx(Trans, { children: "Manage Token Lists" }, void 0) }), void 0)] }, void 0) }), void 0) }), void 0) }, void 0)] }, void 0));
}

// lazily get the validator the first time it is used
const getTokenListValidator = (() => {
    let tokenListValidator;
    return () => {
        if (!tokenListValidator) {
            tokenListValidator = new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
                const [ajv, schema] = yield Promise.all([
                    import('ajv'),
                    Promise.resolve().then(function () { return tokenlist_schema$1; }),
                ]);
                const validator = new ajv.default({ allErrors: true }).compile(schema);
                resolve(validator);
            }));
        }
        return tokenListValidator;
    };
})();
/**
 * Contains the logic for resolving a list URL to a validated token list
 * @param listUrl list url
 * @param resolveENSContentHash resolves an ens name to a contenthash
 */
function getTokenList(listUrl, resolveENSContentHash) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const tokenListValidator = getTokenListValidator();
        const parsedENS = parseENSAddress(listUrl);
        let urls;
        if (parsedENS) {
            let contentHashUri;
            try {
                contentHashUri = yield resolveENSContentHash(parsedENS.ensName);
            }
            catch (error) {
                console.debug(`Failed to resolve ENS name: ${parsedENS.ensName}`, error);
                throw new Error(`Failed to resolve ENS name: ${parsedENS.ensName}`);
            }
            let translatedUri;
            try {
                translatedUri = contenthashToUri(contentHashUri);
            }
            catch (error) {
                console.debug('Failed to translate contenthash to URI', contentHashUri);
                throw new Error(`Failed to translate contenthash to URI: ${contentHashUri}`);
            }
            urls = uriToHttp(`${translatedUri}${(_a = parsedENS.ensPath) !== null && _a !== void 0 ? _a : ''}`);
        }
        else {
            urls = uriToHttp(listUrl);
        }
        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            const isLast = i === urls.length - 1;
            let response;
            try {
                response = yield fetch(url, { credentials: 'omit' });
            }
            catch (error) {
                console.debug('Failed to fetch list', listUrl, error);
                if (isLast)
                    throw new Error(`Failed to download list ${listUrl}`);
                continue;
            }
            if (!response.ok) {
                if (isLast)
                    throw new Error(`Failed to download list ${listUrl}`);
                continue;
            }
            const [json, validator] = yield Promise.all([response.json(), tokenListValidator]);
            if (!validator(json)) {
                const validationErrors = (_c = (_b = validator.errors) === null || _b === void 0 ? void 0 : _b.reduce((memo, error) => {
                    var _a;
                    const add = `${error.dataPath} ${(_a = error.message) !== null && _a !== void 0 ? _a : ''}`;
                    return memo.length > 0 ? `${memo}; ${add}` : `${add}`;
                }, '')) !== null && _c !== void 0 ? _c : 'unknown error';
                throw new Error(`Token list failed validation: ${validationErrors}`);
            }
            return json;
        }
        throw new Error('Unrecognized list URL protocol.');
    });
}

const REGISTRAR_ABI = [
    {
        constant: true,
        inputs: [
            {
                name: 'node',
                type: 'bytes32',
            },
        ],
        name: 'resolver',
        outputs: [
            {
                name: 'resolverAddress',
                type: 'address',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
];
const REGISTRAR_ADDRESS = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
const RESOLVER_ABI = [
    {
        constant: true,
        inputs: [
            {
                internalType: 'bytes32',
                name: 'node',
                type: 'bytes32',
            },
        ],
        name: 'contenthash',
        outputs: [
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
];
// cache the resolver contracts since most of them are the public resolver
function resolverContract(resolverAddress, provider) {
    return new Contract(resolverAddress, RESOLVER_ABI, provider);
}
/**
 * Fetches and decodes the result of an ENS contenthash lookup on mainnet to a URI
 * @param ensName to resolve
 * @param provider provider to use to fetch the data
 */
function resolveENSContentHash(ensName, provider) {
    return __awaiter(this, void 0, void 0, function* () {
        const ensRegistrarContract = new Contract(REGISTRAR_ADDRESS, REGISTRAR_ABI, provider);
        const hash = namehash(ensName);
        const resolverAddress = yield ensRegistrarContract.resolver(hash);
        return resolverContract(resolverAddress, provider).contenthash(hash);
    });
}

function useFetchListCallback() {
    const { chainId, library } = useActiveWeb3React();
    const dispatch = useAppDispatch();
    const ensResolver = useCallback((ensName) => __awaiter(this, void 0, void 0, function* () {
        if (!library || chainId !== 1) {
            const networkLibrary = getNetworkLibrary();
            const network = yield networkLibrary.getNetwork();
            if (networkLibrary && network.chainId === 1) {
                return resolveENSContentHash(ensName, networkLibrary);
            }
            throw new Error('Could not construct mainnet ENS resolver');
        }
        return resolveENSContentHash(ensName, library);
    }), [chainId, library]);
    // note: prevent dispatch if using for list search or unsupported list
    return useCallback((listUrl, sendDispatch = true) => __awaiter(this, void 0, void 0, function* () {
        const requestId = nanoid();
        sendDispatch && dispatch(fetchTokenList.pending({ requestId, url: listUrl }));
        return getTokenList(listUrl, ensResolver)
            .then((tokenList) => {
            sendDispatch && dispatch(fetchTokenList.fulfilled({ url: listUrl, tokenList, requestId }));
            return tokenList;
        })
            .catch((error) => {
            console.debug(`Failed to get list at url ${listUrl}`, error);
            sendDispatch && dispatch(fetchTokenList.rejected({ url: listUrl, requestId, errorMessage: error.message }));
            throw error;
        });
    }), [dispatch, ensResolver]);
}

const Wrapper$8 = styled.div `
  position: relative;
  width: 100%;
  overflow: auto;
`;
function ImportList({ listURL, list, setModalView, onDismiss }) {
    var _a;
    const theme = useTheme();
    const dispatch = useAppDispatch();
    // user must accept
    const [confirmed, setConfirmed] = useState(false);
    const lists = useAllLists();
    const fetchList = useFetchListCallback();
    // monitor is list is loading
    const adding = Boolean((_a = lists[listURL]) === null || _a === void 0 ? void 0 : _a.loadingRequestId);
    const [addError, setAddError] = useState(null);
    const handleAddList = useCallback(() => {
        if (adding)
            return;
        setAddError(null);
        fetchList(listURL)
            .then(() => {
            ReactGA.event({
                category: 'Lists',
                action: 'Add List',
                label: listURL,
            });
            // turn list on
            dispatch(enableList(listURL));
            // go back to lists
            setModalView(CurrencyModalView.manage);
        })
            .catch((error) => {
            ReactGA.event({
                category: 'Lists',
                action: 'Add List Failed',
                label: listURL,
            });
            setAddError(error.message);
            dispatch(removeList(listURL));
        });
    }, [adding, dispatch, fetchList, listURL, setModalView]);
    return (jsxs(Wrapper$8, { children: [jsx(PaddedColumn, Object.assign({ gap: "14px", style: { width: '100%', flex: '1 1' } }, { children: jsxs(RowBetween, { children: [jsx(ArrowLeft, { style: { cursor: 'pointer' }, onClick: () => setModalView(CurrencyModalView.manage) }, void 0), jsx(ThemedText.MediumHeader, { children: jsx(Trans, { children: "Import List" }, void 0) }, void 0), jsx(CloseIcon$3, { onClick: onDismiss }, void 0)] }, void 0) }), void 0), jsx(SectionBreak, {}, void 0), jsx(PaddedColumn, Object.assign({ gap: "md" }, { children: jsxs(AutoColumn, Object.assign({ gap: "md" }, { children: [jsx(Card, Object.assign({ backgroundColor: theme.bg2, padding: "12px 20px" }, { children: jsx(RowBetween, { children: jsxs(RowFixed, { children: [list.logoURI && jsx(ListLogo, { logoURI: list.logoURI, size: "40px" }, void 0), jsxs(AutoColumn, Object.assign({ gap: "sm", style: { marginLeft: '20px' } }, { children: [jsxs(RowFixed, { children: [jsx(ThemedText.Body, Object.assign({ fontWeight: 600, mr: "6px" }, { children: list.name }), void 0), jsx(TextDot, {}, void 0), jsx(ThemedText.Main, Object.assign({ fontSize: '16px', ml: "6px" }, { children: jsxs(Trans, { children: [list.tokens.length, " tokens"] }, void 0) }), void 0)] }, void 0), jsx(ExternalLink, Object.assign({ href: `https://tokenlists.org/token-list?url=${listURL}` }, { children: jsx(ThemedText.Main, Object.assign({ fontSize: '12px', color: theme.blue1 }, { children: listURL }), void 0) }), void 0)] }), void 0)] }, void 0) }, void 0) }), void 0), jsxs(Card, Object.assign({ style: { backgroundColor: transparentize(0.8, theme.red1) } }, { children: [jsxs(AutoColumn, Object.assign({ justify: "center", style: { textAlign: 'center', gap: '16px', marginBottom: '12px' } }, { children: [jsx(AlertTriangle, { stroke: theme.red1, size: 32 }, void 0), jsx(ThemedText.Body, Object.assign({ fontWeight: 500, fontSize: 20, color: theme.red1 }, { children: jsx(Trans, { children: "Import at your own risk" }, void 0) }), void 0)] }), void 0), jsxs(AutoColumn, Object.assign({ style: { textAlign: 'center', gap: '16px', marginBottom: '12px' } }, { children: [jsx(ThemedText.Body, Object.assign({ fontWeight: 500, color: theme.red1 }, { children: jsx(Trans, { children: "By adding this list you are implicitly trusting that the data is correct. Anyone can create a list, including creating fake versions of existing lists and lists that claim to represent projects that do not have one." }, void 0) }), void 0), jsx(ThemedText.Body, Object.assign({ fontWeight: 600, color: theme.red1 }, { children: jsx(Trans, { children: "If you purchase a token from this list, you may not be able to sell it back." }, void 0) }), void 0)] }), void 0), jsxs(AutoRow, Object.assign({ justify: "center", style: { cursor: 'pointer' }, onClick: () => setConfirmed(!confirmed) }, { children: [jsx(Checkbox, { name: "confirmed", type: "checkbox", checked: confirmed, onChange: () => setConfirmed(!confirmed) }, void 0), jsx(ThemedText.Body, Object.assign({ ml: "10px", fontSize: "16px", color: theme.red1, fontWeight: 500 }, { children: jsx(Trans, { children: "I understand" }, void 0) }), void 0)] }), void 0)] }), void 0), jsx(ButtonPrimary, Object.assign({ disabled: !confirmed, altDisabledStyle: true, "$borderRadius": "20px", padding: "10px 1rem", onClick: handleAddList }, { children: jsx(Trans, { children: "Import" }, void 0) }), void 0), addError ? (jsx(ThemedText.Error, Object.assign({ title: addError, style: { textOverflow: 'ellipsis', overflow: 'hidden' }, error: true }, { children: addError }), void 0)) : null] }), void 0) }), void 0)] }, void 0));
}

const WarningWrapper = styled(Card) `
  background-color: ${({ theme, highWarning }) => highWarning ? transparentize(0.8, theme.red1) : transparentize(0.8, theme.yellow2)};
  width: fit-content;
`;
const AddressText = styled(ThemedText.Blue) `
  font-size: 12px;
  word-break: break-all;

  ${({ theme }) => theme.mediaWidth.upToSmall `
    font-size: 10px;
  `}
`;
const TokenImportCard = ({ list, token }) => {
    const theme = useTheme$1();
    const { chainId } = useActiveWeb3React();
    return (jsx(Card, Object.assign({ backgroundColor: theme.bg2, padding: "2rem" }, { children: jsxs(AutoColumn, Object.assign({ gap: "10px", justify: "center" }, { children: [jsx(CurrencyLogo, { currency: token, size: '32px' }, void 0), jsxs(AutoColumn, Object.assign({ gap: "4px", justify: "center" }, { children: [jsx(ThemedText.Body, Object.assign({ ml: "8px", mr: "8px", fontWeight: 500, fontSize: 20 }, { children: token.symbol }), void 0), jsx(ThemedText.DarkGray, Object.assign({ fontWeight: 400, fontSize: 14 }, { children: token.name }), void 0)] }), void 0), chainId && (jsx(ExternalLink, Object.assign({ href: getExplorerLink(chainId, token.address, ExplorerDataType.ADDRESS) }, { children: jsx(AddressText, Object.assign({ fontSize: 12 }, { children: token.address }), void 0) }), void 0)), list !== undefined ? (jsxs(RowFixed, { children: [list.logoURI && jsx(ListLogo, { logoURI: list.logoURI, size: "16px" }, void 0), jsx(ThemedText.Small, Object.assign({ ml: "6px", fontSize: 14, color: theme.text3 }, { children: jsxs(Trans, { children: ["via ", list.name, " token list"] }, void 0) }), void 0)] }, void 0)) : (jsx(WarningWrapper, Object.assign({ "$borderRadius": "4px", padding: "4px", highWarning: true }, { children: jsxs(RowFixed, { children: [jsx(AlertCircle, { stroke: theme.red1, size: "10px" }, void 0), jsx(ThemedText.Body, Object.assign({ color: theme.red1, ml: "4px", fontSize: "10px", fontWeight: 500 }, { children: jsx(Trans, { children: "Unknown Source" }, void 0) }), void 0)] }, void 0) }), void 0))] }), void 0) }), void 0));
};

const Wrapper$7 = styled.div `
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100%;
  width: 100%;
`;
const Button = styled(ButtonPrimary) `
  margin-top: 1em;
  padding: 10px 1em;
`;
const Content = styled.div `
  padding: 1em;
`;
const Copy = styled(ThemedText.Body) `
  text-align: center;
  margin: 0 2em 1em !important;
  font-weight: 400;
  font-size: 16px;
`;
const Header = styled.div `
  align-items: center;
  display: flex;
  gap: 14px;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
`;
const Icon = styled(AlertCircle) `
  stroke: ${({ theme }) => theme.text2};
  width: 48px;
  height: 48px;
`;
const BlockedToken = ({ onBack, onDismiss, blockedTokens }) => (jsxs(Wrapper$7, { children: [jsxs(Header, { children: [onBack ? jsx(ArrowLeft, { style: { cursor: 'pointer' }, onClick: onBack }, void 0) : jsx("div", {}, void 0), jsx(ThemedText.MediumHeader, { children: jsx(Trans, { children: "Token not supported" }, void 0) }, void 0), onDismiss ? jsx(CloseIcon$3, { onClick: onDismiss }, void 0) : jsx("div", {}, void 0)] }, void 0), jsx(Icon, {}, void 0), jsxs(Content, { children: [jsx(Copy, { children: jsx(Trans, { children: "This token is not supported in the Uniswap Labs app" }, void 0) }, void 0), jsx(TokenImportCard, { token: blockedTokens[0] }, void 0), jsx(Button, Object.assign({ disabled: true }, { children: jsx(Trans, { children: "Import" }, void 0) }), void 0)] }, void 0)] }, void 0));

const Wrapper$6 = styled.div `
  position: relative;
  width: 100%;
  overflow: auto;
`;
function ImportToken(props) {
    const { tokens, list, onBack, onDismiss, handleCurrencySelect } = props;
    const theme = useTheme();
    const addToken = useAddUserToken();
    const unsupportedTokens = useUnsupportedTokens();
    const unsupportedSet = new Set(Object.keys(unsupportedTokens));
    const intersection = new Set(tokens.filter((token) => unsupportedSet.has(token.address)));
    if (intersection.size > 0) {
        return jsx(BlockedToken, { onBack: onBack, onDismiss: onDismiss, blockedTokens: Array.from(intersection) }, void 0);
    }
    return (jsxs(Wrapper$6, { children: [jsx(PaddedColumn, Object.assign({ gap: "14px", style: { width: '100%', flex: '1 1' } }, { children: jsxs(RowBetween, { children: [onBack ? jsx(ArrowLeft, { style: { cursor: 'pointer' }, onClick: onBack }, void 0) : jsx("div", {}, void 0), jsx(ThemedText.MediumHeader, { children: jsx(Plural, { value: tokens.length, one: "Import token", other: "Import tokens" }, void 0) }, void 0), onDismiss ? jsx(CloseIcon$3, { onClick: onDismiss }, void 0) : jsx("div", {}, void 0)] }, void 0) }), void 0), jsx(SectionBreak, {}, void 0), jsxs(AutoColumn, Object.assign({ gap: "md", style: { marginBottom: '32px', padding: '1rem' } }, { children: [jsxs(AutoColumn, Object.assign({ justify: "center", style: { textAlign: 'center', gap: '16px', padding: '1rem' } }, { children: [jsx(AlertCircle, { size: 48, stroke: theme.text2, strokeWidth: 1 }, void 0), jsx(ThemedText.Body, Object.assign({ fontWeight: 400, fontSize: 16 }, { children: jsx(Trans, { children: "This token doesn't appear on the active token list(s). Make sure this is the token that you want to trade." }, void 0) }), void 0)] }), void 0), tokens.map((token) => (jsx(TokenImportCard, { token: token, list: list }, 'import' + token.address))), jsx(ButtonPrimary, Object.assign({ altDisabledStyle: true, "$borderRadius": "20px", padding: "10px 1rem", onClick: () => {
                            tokens.map((token) => addToken(token));
                            handleCurrencySelect && handleCurrencySelect(tokens[0]);
                        }, className: ".token-dismiss-button" }, { children: jsx(Trans, { children: "Import" }, void 0) }), void 0)] }), void 0)] }, void 0));
}

function getColorFromUriPath(uri) {
    return __awaiter(this, void 0, void 0, function* () {
        const formattedPath = uriToHttp(uri)[0];
        const palette = yield Vibrant.from(formattedPath).getPalette();
        if (!(palette === null || palette === void 0 ? void 0 : palette.Vibrant)) {
            return null;
        }
        let detectedHex = palette.Vibrant.hex;
        let AAscore = hex(detectedHex, '#FFF');
        while (AAscore < 3) {
            detectedHex = shade(0.005, detectedHex);
            AAscore = hex(detectedHex, '#FFF');
        }
        return detectedHex;
    });
}
function useListColor(listImageUri) {
    const [color, setColor] = useState('#2172E5');
    useLayoutEffect(() => {
        let stale = false;
        if (listImageUri) {
            getColorFromUriPath(listImageUri).then((color) => {
                if (!stale && color !== null) {
                    setColor(color);
                }
            });
        }
        return () => {
            stale = true;
            setColor('#2172E5');
        };
    }, [listImageUri]);
    return color;
}

function listVersionLabel(version) {
    return `v${version.major}.${version.minor}.${version.patch}`;
}

const Wrapper$5 = styled.button `
  border-radius: 20px;
  border: none;
  background: ${({ theme }) => theme.bg1};
  display: flex;
  width: fit-content;
  cursor: pointer;
  outline: none;
  padding: 0.4rem 0.4rem;
  align-items: center;
`;
const ToggleElement$1 = styled.span `
  border-radius: 50%;
  height: 24px;
  width: 24px;
  background-color: ${({ isActive, bgColor, theme }) => (isActive ? bgColor : theme.bg4)};
  :hover {
    opacity: 0.8;
  }
`;
const StatusText = styled(ThemedText.Main) `
  margin: 0 10px;
  width: 24px;
  color: ${({ theme, isActive }) => (isActive ? theme.text1 : theme.text3)};
`;
function ListToggle({ id, isActive, bgColor, toggle }) {
    return (jsxs(Wrapper$5, Object.assign({ id: id, isActive: isActive, onClick: toggle }, { children: [isActive && (jsx(StatusText, Object.assign({ fontWeight: "600", margin: "0 6px", isActive: true }, { children: jsx(Trans, { children: "ON" }, void 0) }), void 0)), jsx(ToggleElement$1, { isActive: isActive, bgColor: bgColor }, void 0), !isActive && (jsx(StatusText, Object.assign({ fontWeight: "600", margin: "0 6px", isActive: false }, { children: jsx(Trans, { children: "OFF" }, void 0) }), void 0))] }), void 0));
}

const Wrapper$4 = styled(Column) `
  height: 100%;
`;
const UnpaddedLinkStyledButton = styled(LinkStyledButton) `
  padding: 0;
  font-size: 1rem;
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
`;
const PopoverContainer = styled.div `
  z-index: 100;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: visibility 150ms linear, opacity 150ms linear;
  background: ${({ theme }) => theme.bg2};
  border: 1px solid ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  color: ${({ theme }) => theme.text2};
  border-radius: 0.5rem;
  padding: 1rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-gap: 8px;
  font-size: 1rem;
  text-align: left;
`;
const StyledMenu$1 = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
`;
const StyledTitleText = styled.div `
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  color: ${({ theme, active }) => (active ? theme.white : theme.text2)};
`;
const StyledListUrlText = styled(ThemedText.Main) `
  font-size: 12px;
  color: ${({ theme, active }) => (active ? theme.white : theme.text2)};
`;
const RowWrapper = styled(Row) `
  background-color: ${({ bgColor, active, theme }) => (active ? bgColor !== null && bgColor !== void 0 ? bgColor : 'transparent' : theme.bg2)};
  opacity: ${({ hasActiveTokens }) => (hasActiveTokens ? 1 : 0.4)};
  transition: 200ms;
  align-items: center;
  padding: 1rem;
  border-radius: 20px;
`;
function listUrlRowHTMLId(listUrl) {
    return `list-row-${listUrl.replace(/\./g, '-')}`;
}
const ListRow = memo(function ListRow({ listUrl }) {
    const { chainId } = useActiveWeb3React();
    const listsByUrl = useAppSelector((state) => state.lists.byUrl);
    const dispatch = useAppDispatch();
    const { current: list, pendingUpdate: pending } = listsByUrl[listUrl];
    const activeTokensOnThisChain = useMemo(() => {
        if (!list || !chainId) {
            return 0;
        }
        return list.tokens.reduce((acc, cur) => (cur.chainId === chainId ? acc + 1 : acc), 0);
    }, [chainId, list]);
    const theme = useTheme();
    const listColor = useListColor(list === null || list === void 0 ? void 0 : list.logoURI);
    const isActive = useIsListActive(listUrl);
    const [open, toggle] = useToggle(false);
    const node = useRef();
    const [referenceElement, setReferenceElement] = useState();
    const [popperElement, setPopperElement] = useState();
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'auto',
        strategy: 'fixed',
        modifiers: [{ name: 'offset', options: { offset: [8, 8] } }],
    });
    useOnClickOutside(node, open ? toggle : undefined);
    const handleAcceptListUpdate = useCallback(() => {
        if (!pending)
            return;
        ReactGA.event({
            category: 'Lists',
            action: 'Update List from List Select',
            label: listUrl,
        });
        dispatch(acceptListUpdate(listUrl));
    }, [dispatch, listUrl, pending]);
    const handleRemoveList = useCallback(() => {
        ReactGA.event({
            category: 'Lists',
            action: 'Start Remove List',
            label: listUrl,
        });
        if (window.prompt(t `Please confirm you would like to remove this list by typing REMOVE`) === `REMOVE`) {
            ReactGA.event({
                category: 'Lists',
                action: 'Confirm Remove List',
                label: listUrl,
            });
            dispatch(removeList(listUrl));
        }
    }, [dispatch, listUrl]);
    const handleEnableList = useCallback(() => {
        ReactGA.event({
            category: 'Lists',
            action: 'Enable List',
            label: listUrl,
        });
        dispatch(enableList(listUrl));
    }, [dispatch, listUrl]);
    const handleDisableList = useCallback(() => {
        ReactGA.event({
            category: 'Lists',
            action: 'Disable List',
            label: listUrl,
        });
        dispatch(disableList(listUrl));
    }, [dispatch, listUrl]);
    if (!list)
        return null;
    return (jsxs(RowWrapper, Object.assign({ active: isActive, hasActiveTokens: activeTokensOnThisChain > 0, bgColor: listColor, id: listUrlRowHTMLId(listUrl) }, { children: [list.logoURI ? (jsx(ListLogo, { size: "40px", style: { marginRight: '1rem' }, logoURI: list.logoURI, alt: `${list.name} list logo` }, void 0)) : (jsx("div", { style: { width: '24px', height: '24px', marginRight: '1rem' } }, void 0)), jsxs(Column, Object.assign({ style: { flex: '1' } }, { children: [jsx(Row, { children: jsx(StyledTitleText, Object.assign({ active: isActive }, { children: list.name }), void 0) }, void 0), jsxs(RowFixed, Object.assign({ mt: "4px" }, { children: [jsx(StyledListUrlText, Object.assign({ active: isActive, mr: "6px" }, { children: jsxs(Trans, { children: [activeTokensOnThisChain, " tokens"] }, void 0) }), void 0), jsxs(StyledMenu$1, Object.assign({ ref: node }, { children: [jsx(ButtonEmpty, Object.assign({ onClick: toggle, ref: setReferenceElement, padding: "0" }, { children: jsx(Settings, { stroke: isActive ? theme.bg1 : theme.text1, size: 12 }, void 0) }), void 0), open && (jsxs(PopoverContainer, Object.assign({ show: true, ref: setPopperElement, style: styles.popper }, attributes.popper, { children: [jsx("div", { children: list && listVersionLabel(list.version) }, void 0), jsx(SeparatorDark, {}, void 0), jsx(ExternalLink, Object.assign({ href: `https://tokenlists.org/token-list?url=${listUrl}` }, { children: jsx(Trans, { children: "View list" }, void 0) }), void 0), jsx(UnpaddedLinkStyledButton, Object.assign({ onClick: handleRemoveList, disabled: Object.keys(listsByUrl).length === 1 }, { children: jsx(Trans, { children: "Remove list" }, void 0) }), void 0), pending && (jsx(UnpaddedLinkStyledButton, Object.assign({ onClick: handleAcceptListUpdate }, { children: jsx(Trans, { children: "Update list" }, void 0) }), void 0))] }), void 0))] }), void 0)] }), void 0)] }), void 0), jsx(ListToggle, { isActive: isActive, bgColor: listColor, toggle: () => {
                    isActive ? handleDisableList() : handleEnableList();
                } }, void 0)] }), listUrl));
});
const ListContainer = styled.div `
  padding: 1rem;
  height: 100%;
  overflow: auto;
  padding-bottom: 80px;
`;
function ManageLists({ setModalView, setImportList, setListUrl, }) {
    const { chainId } = useActiveWeb3React();
    const theme = useTheme();
    const [listUrlInput, setListUrlInput] = useState('');
    const lists = useAllLists();
    const tokenCountByListName = useMemo(() => Object.values(lists).reduce((acc, { current: list }) => {
        if (!list) {
            return acc;
        }
        return Object.assign(Object.assign({}, acc), { [list.name]: list.tokens.reduce((count, token) => (token.chainId === chainId ? count + 1 : count), 0) });
    }, {}), [chainId, lists]);
    // sort by active but only if not visible
    const activeListUrls = useActiveListUrls();
    const handleInput = useCallback((e) => {
        setListUrlInput(e.target.value);
    }, []);
    const fetchList = useFetchListCallback();
    const validUrl = useMemo(() => {
        return uriToHttp(listUrlInput).length > 0 || Boolean(parseENSAddress(listUrlInput));
    }, [listUrlInput]);
    const sortedLists = useMemo(() => {
        const listUrls = Object.keys(lists);
        return listUrls
            .filter((listUrl) => {
            // only show loaded lists, hide unsupported lists
            return Boolean(lists[listUrl].current) && !Boolean(UNSUPPORTED_LIST_URLS.includes(listUrl));
        })
            .sort((listUrlA, listUrlB) => {
            const { current: listA } = lists[listUrlA];
            const { current: listB } = lists[listUrlB];
            // first filter on active lists
            if ((activeListUrls === null || activeListUrls === void 0 ? void 0 : activeListUrls.includes(listUrlA)) && !(activeListUrls === null || activeListUrls === void 0 ? void 0 : activeListUrls.includes(listUrlB))) {
                return -1;
            }
            if (!(activeListUrls === null || activeListUrls === void 0 ? void 0 : activeListUrls.includes(listUrlA)) && (activeListUrls === null || activeListUrls === void 0 ? void 0 : activeListUrls.includes(listUrlB))) {
                return 1;
            }
            if (listA && listB) {
                if (tokenCountByListName[listA.name] > tokenCountByListName[listB.name]) {
                    return -1;
                }
                if (tokenCountByListName[listA.name] < tokenCountByListName[listB.name]) {
                    return 1;
                }
                return listA.name.toLowerCase() < listB.name.toLowerCase()
                    ? -1
                    : listA.name.toLowerCase() === listB.name.toLowerCase()
                        ? 0
                        : 1;
            }
            if (listA)
                return -1;
            if (listB)
                return 1;
            return 0;
        });
    }, [lists, activeListUrls, tokenCountByListName]);
    // temporary fetched list for import flow
    const [tempList, setTempList] = useState();
    const [addError, setAddError] = useState();
    useEffect(() => {
        function fetchTempList() {
            return __awaiter(this, void 0, void 0, function* () {
                fetchList(listUrlInput, false)
                    .then((list) => setTempList(list))
                    .catch(() => setAddError(t `Error importing list`));
            });
        }
        // if valid url, fetch details for card
        if (validUrl) {
            fetchTempList();
        }
        else {
            setTempList(undefined);
            listUrlInput !== '' && setAddError(t `Enter valid list location`);
        }
        // reset error
        if (listUrlInput === '') {
            setAddError(undefined);
        }
    }, [fetchList, listUrlInput, validUrl]);
    // check if list is already imported
    const isImported = Object.keys(lists).includes(listUrlInput);
    // set list values and have parent modal switch to import list view
    const handleImport = useCallback(() => {
        if (!tempList)
            return;
        setImportList(tempList);
        setModalView(CurrencyModalView.importList);
        setListUrl(listUrlInput);
    }, [listUrlInput, setImportList, setListUrl, setModalView, tempList]);
    return (jsxs(Wrapper$4, { children: [jsxs(PaddedColumn, Object.assign({ gap: "14px" }, { children: [jsx(Row, { children: jsx(SearchInput, { type: "text", id: "list-add-input", placeholder: t `https:// or ipfs:// or ENS name`, value: listUrlInput, onChange: handleInput }, void 0) }, void 0), addError ? (jsx(ThemedText.Error, Object.assign({ title: addError, style: { textOverflow: 'ellipsis', overflow: 'hidden' }, error: true }, { children: addError }), void 0)) : null] }), void 0), tempList && (jsx(PaddedColumn, Object.assign({ style: { paddingTop: 0 } }, { children: jsx(Card, Object.assign({ backgroundColor: theme.bg2, padding: "12px 20px" }, { children: jsxs(RowBetween, { children: [jsxs(RowFixed, { children: [tempList.logoURI && jsx(ListLogo, { logoURI: tempList.logoURI, size: "40px" }, void 0), jsxs(AutoColumn, Object.assign({ gap: "4px", style: { marginLeft: '20px' } }, { children: [jsx(ThemedText.Body, Object.assign({ fontWeight: 600 }, { children: tempList.name }), void 0), jsx(ThemedText.Main, Object.assign({ fontSize: '12px' }, { children: jsxs(Trans, { children: [tempList.tokens.length, " tokens"] }, void 0) }), void 0)] }), void 0)] }, void 0), isImported ? (jsxs(RowFixed, { children: [jsx(IconWrapper$4, Object.assign({ stroke: theme.text2, size: "16px", marginRight: '10px' }, { children: jsx(CheckCircle, {}, void 0) }), void 0), jsx(ThemedText.Body, Object.assign({ color: theme.text2 }, { children: jsx(Trans, { children: "Loaded" }, void 0) }), void 0)] }, void 0)) : (jsx(ButtonPrimary, Object.assign({ style: { fontSize: '14px' }, padding: "6px 8px", width: "fit-content", onClick: handleImport }, { children: jsx(Trans, { children: "Import" }, void 0) }), void 0))] }, void 0) }), void 0) }), void 0)), jsx(Separator, {}, void 0), jsx(ListContainer, { children: jsx(AutoColumn, Object.assign({ gap: "md" }, { children: sortedLists.map((listUrl) => (jsx(ListRow, { listUrl: listUrl }, listUrl))) }), void 0) }, void 0)] }, void 0));
}

const Wrapper$3 = styled.div `
  width: 100%;
  height: calc(100% - 60px);
  position: relative;
  padding-bottom: 80px;
`;
const Footer = styled.div `
  position: absolute;
  bottom: 0;
  width: 100%;
  border-radius: 20px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-top: 1px solid ${({ theme }) => theme.bg3};
  padding: 20px;
  text-align: center;
`;
function ManageTokens({ setModalView, setImportToken, }) {
    const { chainId } = useActiveWeb3React();
    const [searchQuery, setSearchQuery] = useState('');
    const theme = useTheme();
    // manage focus on modal show
    const inputRef = useRef();
    const handleInput = useCallback((event) => {
        const input = event.target.value;
        const checksummedInput = isAddress(input);
        setSearchQuery(checksummedInput || input);
    }, []);
    // if they input an address, use it
    const isAddressSearch = isAddress(searchQuery);
    const searchToken = useToken(searchQuery);
    // all tokens for local lisr
    const userAddedTokens = useUserAddedTokens();
    const removeToken = useRemoveUserAddedToken();
    const handleRemoveAll = useCallback(() => {
        if (chainId && userAddedTokens) {
            userAddedTokens.map((token) => {
                return removeToken(chainId, token.address);
            });
        }
    }, [removeToken, userAddedTokens, chainId]);
    const tokenList = useMemo(() => {
        return (chainId &&
            userAddedTokens.map((token) => (jsxs(RowBetween, Object.assign({ width: "100%" }, { children: [jsxs(RowFixed, { children: [jsx(CurrencyLogo, { currency: token, size: '20px' }, void 0), jsx(ExternalLink, Object.assign({ href: getExplorerLink(chainId, token.address, ExplorerDataType.ADDRESS) }, { children: jsx(ThemedText.Main, Object.assign({ ml: '10px', fontWeight: 600 }, { children: token.symbol }), void 0) }), void 0)] }, void 0), jsxs(RowFixed, { children: [jsx(TrashIcon, { onClick: () => removeToken(chainId, token.address) }, void 0), jsx(ExternalLinkIcon, { href: getExplorerLink(chainId, token.address, ExplorerDataType.ADDRESS) }, void 0)] }, void 0)] }), token.address))));
    }, [userAddedTokens, chainId, removeToken]);
    return (jsxs(Wrapper$3, { children: [jsxs(Column, Object.assign({ style: { width: '100%', height: '100%', flex: '1 1' } }, { children: [jsxs(PaddedColumn, Object.assign({ gap: "14px" }, { children: [jsx(Row, { children: jsx(SearchInput, { type: "text", id: "token-search-input", placeholder: '0x0000', value: searchQuery, autoComplete: "off", ref: inputRef, onChange: handleInput }, void 0) }, void 0), searchQuery !== '' && !isAddressSearch && (jsx(ThemedText.Error, Object.assign({ error: true }, { children: jsx(Trans, { children: "Enter valid token address" }, void 0) }), void 0)), searchToken && (jsx(Card, Object.assign({ backgroundColor: theme.bg2, padding: "10px 0" }, { children: jsx(ImportRow, { token: searchToken, showImportView: () => setModalView(CurrencyModalView.importToken), setImportToken: setImportToken, style: { height: 'fit-content' } }, void 0) }), void 0))] }), void 0), jsx(Separator, {}, void 0), jsxs(PaddedColumn, Object.assign({ gap: "lg", style: { overflow: 'auto', marginBottom: '10px' } }, { children: [jsxs(RowBetween, { children: [jsx(ThemedText.Main, Object.assign({ fontWeight: 600 }, { children: jsxs(Trans, { children: [userAddedTokens === null || userAddedTokens === void 0 ? void 0 : userAddedTokens.length, " Custom Tokens"] }, void 0) }), void 0), userAddedTokens.length > 0 && (jsx(ButtonText, Object.assign({ onClick: handleRemoveAll }, { children: jsx(ThemedText.Blue, { children: jsx(Trans, { children: "Clear all" }, void 0) }, void 0) }), void 0))] }, void 0), tokenList] }), void 0)] }), void 0), jsx(Footer, { children: jsx(ThemedText.DarkGray, { children: jsx(Trans, { children: "Tip: Custom tokens are stored locally in your browser" }, void 0) }, void 0) }, void 0)] }, void 0));
}

const Wrapper$2 = styled.div `
  width: 100%;
  position: relative;
  padding-bottom: 80px;
`;
const ToggleWrapper = styled(RowBetween) `
  background-color: ${({ theme }) => theme.bg3};
  border-radius: 12px;
  padding: 6px;
`;
const ToggleOption = styled.div `
  width: 48%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: 600;
  background-color: ${({ theme, active }) => (active ? theme.bg1 : theme.bg3)};
  color: ${({ theme, active }) => (active ? theme.text1 : theme.text2)};
  user-select: none;

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;
function Manage({ onDismiss, setModalView, setImportList, setImportToken, setListUrl, }) {
    // toggle between tokens and lists
    const [showLists, setShowLists] = useState(true);
    return (jsxs(Wrapper$2, { children: [jsx(PaddedColumn, { children: jsxs(RowBetween, { children: [jsx(ArrowLeft, { style: { cursor: 'pointer' }, onClick: () => setModalView(CurrencyModalView.search) }, void 0), jsx(Text$1, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: jsx(Trans, { children: "Manage" }, void 0) }), void 0), jsx(CloseIcon$3, { onClick: onDismiss }, void 0)] }, void 0) }, void 0), jsx(Separator, {}, void 0), jsx(PaddedColumn, Object.assign({ style: { paddingBottom: 0 } }, { children: jsxs(ToggleWrapper, { children: [jsx(ToggleOption, Object.assign({ onClick: () => setShowLists(!showLists), active: showLists }, { children: jsx(Trans, { children: "Lists" }, void 0) }), void 0), jsx(ToggleOption, Object.assign({ onClick: () => setShowLists(!showLists), active: !showLists }, { children: jsx(Trans, { children: "Tokens" }, void 0) }), void 0)] }, void 0) }), void 0), showLists ? (jsx(ManageLists, { setModalView: setModalView, setImportList: setImportList, setListUrl: setListUrl }, void 0)) : (jsx(ManageTokens, { setModalView: setModalView, setImportToken: setImportToken }, void 0))] }, void 0));
}

var CurrencyModalView;
(function (CurrencyModalView) {
    CurrencyModalView[CurrencyModalView["search"] = 0] = "search";
    CurrencyModalView[CurrencyModalView["manage"] = 1] = "manage";
    CurrencyModalView[CurrencyModalView["importToken"] = 2] = "importToken";
    CurrencyModalView[CurrencyModalView["importList"] = 3] = "importList";
})(CurrencyModalView || (CurrencyModalView = {}));
function CurrencySearchModal({ isOpen, onDismiss, onCurrencySelect, selectedCurrency, otherSelectedCurrency, showCommonBases = false, showCurrencyAmount = true, disableNonToken = false, }) {
    const [modalView, setModalView] = useState(CurrencyModalView.manage);
    const lastOpen = useLast(isOpen);
    useEffect(() => {
        if (isOpen && !lastOpen) {
            setModalView(CurrencyModalView.search);
        }
    }, [isOpen, lastOpen]);
    const handleCurrencySelect = useCallback((currency) => {
        onCurrencySelect(currency);
        onDismiss();
    }, [onDismiss, onCurrencySelect]);
    // for token import view
    const prevView = usePrevious(modalView);
    // used for import token flow
    const [importToken, setImportToken] = useState();
    // used for import list
    const [importList, setImportList] = useState();
    const [listURL, setListUrl] = useState();
    const showImportView = useCallback(() => setModalView(CurrencyModalView.importToken), [setModalView]);
    const showManageView = useCallback(() => setModalView(CurrencyModalView.manage), [setModalView]);
    const handleBackImport = useCallback(() => setModalView(prevView && prevView !== CurrencyModalView.importToken ? prevView : CurrencyModalView.search), [setModalView, prevView]);
    // change min height if not searching
    const minHeight = modalView === CurrencyModalView.importToken || modalView === CurrencyModalView.importList ? 40 : 80;
    let content = null;
    switch (modalView) {
        case CurrencyModalView.search:
            content = (jsx(CurrencySearch, { isOpen: isOpen, onDismiss: onDismiss, onCurrencySelect: handleCurrencySelect, selectedCurrency: selectedCurrency, otherSelectedCurrency: otherSelectedCurrency, showCommonBases: showCommonBases, showCurrencyAmount: showCurrencyAmount, disableNonToken: disableNonToken, showImportView: showImportView, setImportToken: setImportToken, showManageView: showManageView }, void 0));
            break;
        case CurrencyModalView.importToken:
            if (importToken) {
                content = (jsx(ImportToken, { tokens: [importToken], onDismiss: onDismiss, list: importToken instanceof WrappedTokenInfo ? importToken.list : undefined, onBack: handleBackImport, handleCurrencySelect: handleCurrencySelect }, void 0));
            }
            break;
        case CurrencyModalView.importList:
            if (importList && listURL) {
                content = jsx(ImportList, { list: importList, listURL: listURL, onDismiss: onDismiss, setModalView: setModalView }, void 0);
            }
            break;
        case CurrencyModalView.manage:
            content = (jsx(Manage, { onDismiss: onDismiss, setModalView: setModalView, setImportToken: setImportToken, setImportList: setImportList, setListUrl: setListUrl }, void 0));
            break;
    }
    return (jsx(Modal, Object.assign({ isOpen: isOpen, onDismiss: onDismiss, maxHeight: 80, minHeight: minHeight }, { children: content }), void 0));
}

const TextWrapper = styled.span `
  margin-left: ${({ margin }) => margin && '4px'};
  color: ${({ theme, link }) => (link ? theme.blue1 : theme.text1)};
  font-size: ${({ fontSize }) => fontSize !== null && fontSize !== void 0 ? fontSize : 'inherit'};

  @media screen and (max-width: 600px) {
    font-size: ${({ adjustSize }) => adjustSize && '12px'};
  }
`;
const HoverInlineText = (_a) => {
    var { text, maxCharacters = 20, margin = false, adjustSize = false, fontSize, link } = _a, rest = __rest(_a, ["text", "maxCharacters", "margin", "adjustSize", "fontSize", "link"]);
    const [showHover, setShowHover] = useState(false);
    if (!text) {
        return jsx("span", {}, void 0);
    }
    if (text.length > maxCharacters) {
        return (jsx(Tooltip, Object.assign({ text: text, show: showHover }, { children: jsx(TextWrapper, Object.assign({ onMouseEnter: () => setShowHover(true), onMouseLeave: () => setShowHover(false), margin: margin, adjustSize: adjustSize, link: link, fontSize: fontSize }, rest, { children: ' ' + text.slice(0, maxCharacters - 1) + '...' }), void 0) }), void 0));
    }
    return (jsx(TextWrapper, Object.assign({ margin: margin, adjustSize: adjustSize, link: link, fontSize: fontSize }, rest, { children: text }), void 0));
};

function FiatValue({ fiatValue, priceImpact, }) {
    const theme = useTheme();
    const priceImpactColor = useMemo(() => {
        if (!priceImpact)
            return undefined;
        if (priceImpact.lessThan('0'))
            return theme.green1;
        const severity = warningSeverity(priceImpact);
        if (severity < 1)
            return theme.text3;
        if (severity < 3)
            return theme.yellow1;
        return theme.red1;
    }, [priceImpact, theme.green1, theme.red1, theme.text3, theme.yellow1]);
    return (jsxs(ThemedText.Body, Object.assign({ fontSize: 14, color: fiatValue ? theme.text2 : theme.text4 }, { children: [fiatValue ? (jsxs(Trans, { children: ["~$ ", jsx(HoverInlineText, { text: fiatValue === null || fiatValue === void 0 ? void 0 : fiatValue.toSignificant(6, { groupSeparator: ',' }) }, void 0)] }, void 0)) : (''), priceImpact ? (jsxs("span", Object.assign({ style: { color: priceImpactColor } }, { children: [' ', "(", jsxs(Trans, { children: [priceImpact.multiply(-1).toSignificant(3), "%"] }, void 0), ")"] }), void 0)) : null] }), void 0));
}

const InputPanel = styled.div `
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '16px' : '20px')};
  background-color: ${({ theme, hideInput }) => (hideInput ? 'transparent' : theme.bg2)};
  z-index: 1;
  width: ${({ hideInput }) => (hideInput ? '100%' : 'initial')};
`;
const FixedContainer = styled.div `
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.bg1};
  opacity: 0.95;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;
const Container$1 = styled.div `
  border-radius: ${({ hideInput }) => (hideInput ? '16px' : '20px')};
  border: 1px solid ${({ theme, hideInput }) => (hideInput ? ' transparent' : theme.bg2)};
  background-color: ${({ theme }) => theme.bg1};
  width: ${({ hideInput }) => (hideInput ? '100%' : 'initial')};
  :focus,
  :hover {
    border: 1px solid ${({ theme, hideInput }) => (hideInput ? ' transparent' : theme.bg3)};
  }
`;
const CurrencySelect = styled(ButtonGray) `
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  align-items: center;
  font-size: 24px;
  font-weight: 500;
  background-color: ${({ selected, theme }) => (selected ? theme.bg0 : theme.primary1)};
  color: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
  border-radius: 16px;
  box-shadow: ${({ selected }) => (selected ? 'none' : '0px 6px 10px rgba(0, 0, 0, 0.075)')};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  height: ${({ hideInput }) => (hideInput ? '2.8rem' : '2.4rem')};
  width: ${({ hideInput }) => (hideInput ? '100%' : 'initial')};
  padding: 0 8px;
  justify-content: space-between;
  margin-right: ${({ hideInput }) => (hideInput ? '0' : '12px')};
  :focus,
  :hover {
    background-color: ${({ selected, theme }) => (selected ? theme.bg2 : darken(0.05, theme.primary1))};
  }
`;
const InputRow = styled.div `
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: space-between;
  padding: ${({ selected }) => (selected ? ' 1rem 1rem 0.75rem 1rem' : '1rem 1rem 0.75rem 1rem')};
`;
const LabelRow = styled.div `
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0 1rem 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`;
const FiatRow = styled(LabelRow) `
  justify-content: flex-end;
`;
const Aligner = styled.span `
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const StyledDropDown = styled(SvgDropdown) `
  margin: 0 0.25rem 0 0.35rem;
  height: 35%;

  path {
    stroke: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
    stroke-width: 1.5px;
  }
`;
const StyledTokenName = styled.span `
  ${({ active }) => (active ? '  margin: 0 0.25rem 0 0.25rem;' : '  margin: 0 0.25rem 0 0.25rem;')}
  font-size:  ${({ active }) => (active ? '18px' : '18px')};
`;
const StyledBalanceMax = styled.button `
  background-color: transparent;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  color: ${({ theme }) => theme.primaryText1};
  opacity: ${({ disabled }) => (!disabled ? 1 : 0.4)};
  pointer-events: ${({ disabled }) => (!disabled ? 'initial' : 'none')};
  margin-left: 0.25rem;

  :focus {
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall `
    margin-right: 0.5rem;
  `};
`;
const StyledNumericalInput = styled(Input$1) `
  ${loadingOpacityMixin}
`;
function CurrencyInputPanel(_a) {
    var { value, onUserInput, onMax, showMaxButton, onCurrencySelect, currency, otherCurrency, id, showCommonBases, showCurrencyAmount, disableNonToken, renderBalance, fiatValue, priceImpact, hideBalance = false, pair = null, // used for double token logo
    hideInput = false, locked = false, loading = false } = _a, rest = __rest(_a, ["value", "onUserInput", "onMax", "showMaxButton", "onCurrencySelect", "currency", "otherCurrency", "id", "showCommonBases", "showCurrencyAmount", "disableNonToken", "renderBalance", "fiatValue", "priceImpact", "hideBalance", "pair", "hideInput", "locked", "loading"]);
    const [modalOpen, setModalOpen] = useState(false);
    const { account } = useActiveWeb3React();
    const selectedCurrencyBalance = useCurrencyBalance(account !== null && account !== void 0 ? account : undefined, currency !== null && currency !== void 0 ? currency : undefined);
    const theme = useTheme();
    const handleDismissSearch = useCallback(() => {
        setModalOpen(false);
    }, [setModalOpen]);
    return (jsxs(InputPanel, Object.assign({ id: id, hideInput: hideInput }, rest, { children: [locked && (jsx(FixedContainer, { children: jsxs(AutoColumn, Object.assign({ gap: "sm", justify: "center" }, { children: [jsx(Lock, {}, void 0), jsx(ThemedText.Label, Object.assign({ fontSize: "12px", textAlign: "center", padding: "0 12px" }, { children: jsx(Trans, { children: "The market price is outside your specified price range. Single-asset deposit only." }, void 0) }), void 0)] }), void 0) }, void 0)), jsxs(Container$1, Object.assign({ hideInput: hideInput }, { children: [jsxs(InputRow, Object.assign({ style: hideInput ? { padding: '0', borderRadius: '8px' } : {}, selected: !onCurrencySelect }, { children: [jsx(CurrencySelect, Object.assign({ visible: currency !== undefined, selected: !!currency, hideInput: hideInput, className: "open-currency-select-button", onClick: () => {
                                    if (onCurrencySelect) {
                                        setModalOpen(true);
                                    }
                                } }, { children: jsxs(Aligner, { children: [jsxs(RowFixed, { children: [pair ? (jsx("span", Object.assign({ style: { marginRight: '0.5rem' } }, { children: jsx(DoubleCurrencyLogo, { currency0: pair.token0, currency1: pair.token1, size: 24, margin: true }, void 0) }), void 0)) : currency ? (jsx(CurrencyLogo, { style: { marginRight: '0.5rem' }, currency: currency, size: '24px' }, void 0)) : null, pair ? (jsxs(StyledTokenName, Object.assign({ className: "pair-name-container" }, { children: [pair === null || pair === void 0 ? void 0 : pair.token0.symbol, ":", pair === null || pair === void 0 ? void 0 : pair.token1.symbol] }), void 0)) : (jsx(StyledTokenName, Object.assign({ className: "token-symbol-container", active: Boolean(currency && currency.symbol) }, { children: (currency && currency.symbol && currency.symbol.length > 20
                                                        ? currency.symbol.slice(0, 4) +
                                                            '...' +
                                                            currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
                                                        : currency === null || currency === void 0 ? void 0 : currency.symbol) || jsx(Trans, { children: "Select a token" }, void 0) }), void 0))] }, void 0), onCurrencySelect && jsx(StyledDropDown, { selected: !!currency }, void 0)] }, void 0) }), void 0), !hideInput && (jsx(StyledNumericalInput, { className: "token-amount-input", value: value, onUserInput: onUserInput, "$loading": loading }, void 0))] }), void 0), !hideInput && !hideBalance && (jsx(FiatRow, { children: jsxs(RowBetween, { children: [account ? (jsxs(RowFixed, Object.assign({ style: { height: '17px' } }, { children: [jsx(ThemedText.Body, Object.assign({ onClick: onMax, color: theme.text2, fontWeight: 400, fontSize: 14, style: { display: 'inline', cursor: 'pointer' } }, { children: !hideBalance && currency && selectedCurrencyBalance ? (renderBalance ? (renderBalance(selectedCurrencyBalance)) : (jsxs(Trans, { children: ["Balance: ", formatCurrencyAmount(selectedCurrencyBalance, 4), " ", currency.symbol] }, void 0))) : null }), void 0), showMaxButton && selectedCurrencyBalance ? (jsx(StyledBalanceMax, Object.assign({ onClick: onMax }, { children: jsx(Trans, { children: "(Max)" }, void 0) }), void 0)) : null] }), void 0)) : (jsx("span", {}, void 0)), jsx(LoadingOpacityContainer, Object.assign({ "$loading": loading }, { children: jsx(FiatValue, { fiatValue: fiatValue, priceImpact: priceImpact }, void 0) }), void 0)] }, void 0) }, void 0))] }), void 0), onCurrencySelect && (jsx(CurrencySearchModal, { isOpen: modalOpen, onDismiss: handleDismissSearch, onCurrencySelect: onCurrencySelect, selectedCurrency: currency, otherSelectedCurrency: otherCurrency, showCommonBases: showCommonBases, showCurrencyAmount: showCurrencyAmount, disableNonToken: disableNonToken }, void 0))] }), void 0));
}

/**
 * Given the price impact, get user confirmation.
 *
 * @param priceImpactWithoutFee price impact of the trade without the fee.
 */
function confirmPriceImpactWithoutFee(priceImpactWithoutFee) {
    if (!priceImpactWithoutFee.lessThan(PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN)) {
        return (window.prompt(`This swap has a price impact of at least ${PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN.toFixed(0)}%. Please type the word "confirm" to continue with this swap.`) === 'confirm');
    }
    else if (!priceImpactWithoutFee.lessThan(ALLOWED_PRICE_IMPACT_HIGH)) {
        return window.confirm(`This swap has a price impact of at least ${ALLOWED_PRICE_IMPACT_HIGH.toFixed(0)}%. Please confirm that you would like to continue with this swap.`);
    }
    return true;
}

function useAddTokenToMetamask(currencyToAdd) {
    const { library } = useActiveWeb3React();
    const token = currencyToAdd === null || currencyToAdd === void 0 ? void 0 : currencyToAdd.wrapped;
    const [success, setSuccess] = useState();
    const addToken = useCallback(() => {
        if (library && library.provider.isMetaMask && library.provider.request && token) {
            library.provider
                .request({
                method: 'wallet_watchAsset',
                params: {
                    //@ts-ignore // need this for incorrect ethers provider type
                    type: 'ERC20',
                    options: {
                        address: token.address,
                        symbol: token.symbol,
                        decimals: token.decimals,
                        image: getTokenLogoURL(token.address),
                    },
                },
            })
                .then((success) => {
                setSuccess(success);
            })
                .catch(() => setSuccess(false));
        }
        else {
            setSuccess(false);
        }
    }, [library, token]);
    return { addToken, success };
}

const Wrapper$1 = styled.div `
  height: 90px;
  width: 90px;
`;
const dash = keyframes `
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;
const dashCheck = keyframes `
  0% {
    stroke-dashoffset: -100;
  }
  100% {
    stroke-dashoffset: 900;
  }
`;
const Circle = styled.circle `
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
  -webkit-animation: ${dash} 0.9s ease-in-out;
  animation: ${dash} 0.9s ease-in-out;
`;
const PolyLine = styled.polyline `
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
  stroke-dashoffset: -100;
  -webkit-animation: ${dashCheck} 0.9s 0.35s ease-in-out forwards;
  animation: ${dashCheck} 0.9s 0.35s ease-in-out forwards;
`;
function AnimatedConfirmation() {
    const theme = useTheme();
    return (jsx(Wrapper$1, Object.assign({ className: "w4rAnimated_checkmark" }, { children: jsxs("svg", Object.assign({ version: "1.1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 130.2 130.2" }, { children: [jsx(Circle, { className: "path circle", fill: "none", stroke: theme.green1, strokeWidth: "6", strokeMiterlimit: "10", cx: "65.1", cy: "65.1", r: "62.1" }, void 0), jsx(PolyLine, { className: "path check", fill: "none", stroke: theme.green1, strokeWidth: "6", strokeLinecap: "round", strokeMiterlimit: "10", points: "100.2,40.2 51.5,88.8 29.8,67.5 " }, void 0)] }), void 0) }), void 0));
}

const Wrapper = styled.div `
  width: 100%;
  padding: 1rem;
`;
const Section = styled(AutoColumn) `
  padding: ${({ inline }) => (inline ? '0' : '0')};
`;
const BottomSection = styled(Section) `
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;
const ConfirmedIcon = styled(ColumnCenter) `
  padding: ${({ inline }) => (inline ? '20px 0' : '32px 0;')};
`;
const StyledLogo = styled.img `
  height: 16px;
  width: 16px;
  margin-left: 6px;
`;
function ConfirmationPendingContent({ onDismiss, pendingText, inline, }) {
    return (jsx(Wrapper, { children: jsxs(AutoColumn, Object.assign({ gap: "md" }, { children: [!inline && (jsxs(RowBetween, { children: [jsx("div", {}, void 0), jsx(CloseIcon$3, { onClick: onDismiss }, void 0)] }, void 0)), jsx(ConfirmedIcon, Object.assign({ inline: inline }, { children: jsx(CustomLightSpinner, { src: Circle$1, alt: "loader", size: inline ? '40px' : '90px' }, void 0) }), void 0), jsxs(AutoColumn, Object.assign({ gap: "12px", justify: 'center' }, { children: [jsx(Text$1, Object.assign({ fontWeight: 500, fontSize: 20, textAlign: "center" }, { children: jsx(Trans, { children: "Waiting For Confirmation" }, void 0) }), void 0), jsx(Text$1, Object.assign({ fontWeight: 400, fontSize: 16, textAlign: "center" }, { children: pendingText }), void 0), jsx(Text$1, Object.assign({ fontWeight: 500, fontSize: 14, color: "#565A69", textAlign: "center", marginBottom: "12px" }, { children: jsx(Trans, { children: "Confirm this transaction in your wallet" }, void 0) }), void 0)] }), void 0)] }), void 0) }, void 0));
}
function TransactionSubmittedContent({ onDismiss, chainId, hash, currencyToAdd, inline, }) {
    var _a;
    const theme = useContext(ThemeContext);
    const { library } = useActiveWeb3React();
    const { addToken, success } = useAddTokenToMetamask(currencyToAdd);
    return (jsx(Wrapper, { children: jsxs(Section, Object.assign({ inline: inline }, { children: [!inline && (jsxs(RowBetween, { children: [jsx("div", {}, void 0), jsx(CloseIcon$3, { onClick: onDismiss }, void 0)] }, void 0)), jsx(ConfirmedIcon, Object.assign({ inline: inline }, { children: jsx(ArrowUpCircle, { strokeWidth: 0.5, size: inline ? '40px' : '90px', color: theme.primary1 }, void 0) }), void 0), jsxs(AutoColumn, Object.assign({ gap: "12px", justify: 'center' }, { children: [jsx(Text$1, Object.assign({ fontWeight: 500, fontSize: 20, textAlign: "center" }, { children: jsx(Trans, { children: "Transaction Submitted" }, void 0) }), void 0), chainId && hash && (jsx(ExternalLink, Object.assign({ href: getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION) }, { children: jsx(Text$1, Object.assign({ fontWeight: 500, fontSize: 14, color: theme.primary1 }, { children: jsx(Trans, { children: "View on Explorer" }, void 0) }), void 0) }), void 0)), currencyToAdd && ((_a = library === null || library === void 0 ? void 0 : library.provider) === null || _a === void 0 ? void 0 : _a.isMetaMask) && (jsx(ButtonLight, Object.assign({ mt: "12px", padding: "6px 12px", width: "fit-content", onClick: addToken }, { children: !success ? (jsx(RowFixed, { children: jsxs(Trans, { children: ["Add ", currencyToAdd.symbol, " to Metamask ", jsx(StyledLogo, { src: MetaMaskLogo }, void 0)] }, void 0) }, void 0)) : (jsxs(RowFixed, { children: [jsxs(Trans, { children: ["Added ", currencyToAdd.symbol, " "] }, void 0), jsx(CheckCircle, { size: '16px', stroke: theme.green1, style: { marginLeft: '6px' } }, void 0)] }, void 0)) }), void 0)), jsx(ButtonPrimary, Object.assign({ onClick: onDismiss, style: { margin: '20px 0 0 0' } }, { children: jsx(Text$1, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: inline ? jsx(Trans, { children: "Return" }, void 0) : jsx(Trans, { children: "Close" }, void 0) }), void 0) }), void 0)] }), void 0)] }), void 0) }, void 0));
}
function ConfirmationModalContent({ title, bottomContent, onDismiss, topContent, }) {
    return (jsxs(Wrapper, { children: [jsxs(Section, { children: [jsxs(RowBetween, { children: [jsx(Text$1, Object.assign({ fontWeight: 500, fontSize: 16 }, { children: title }), void 0), jsx(CloseIcon$3, { onClick: onDismiss }, void 0)] }, void 0), topContent()] }, void 0), bottomContent && jsx(BottomSection, Object.assign({ gap: "12px" }, { children: bottomContent() }), void 0)] }, void 0));
}
function TransactionErrorContent({ message, onDismiss }) {
    const theme = useContext(ThemeContext);
    return (jsxs(Wrapper, { children: [jsxs(Section, { children: [jsxs(RowBetween, { children: [jsx(Text$1, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: jsx(Trans, { children: "Error" }, void 0) }), void 0), jsx(CloseIcon$3, { onClick: onDismiss }, void 0)] }, void 0), jsxs(AutoColumn, Object.assign({ style: { marginTop: 20, padding: '2rem 0' }, gap: "24px", justify: "center" }, { children: [jsx(AlertTriangle, { color: theme.red1, style: { strokeWidth: 1.5 }, size: 64 }, void 0), jsx(Text$1, Object.assign({ fontWeight: 500, fontSize: 16, color: theme.red1, style: { textAlign: 'center', width: '85%', wordBreak: 'break-word' } }, { children: message }), void 0)] }), void 0)] }, void 0), jsx(BottomSection, Object.assign({ gap: "12px" }, { children: jsx(ButtonPrimary, Object.assign({ onClick: onDismiss }, { children: jsx(Trans, { children: "Dismiss" }, void 0) }), void 0) }), void 0)] }, void 0));
}
function L2Content({ onDismiss, chainId, hash, pendingText, inline, }) {
    var _a;
    const theme = useContext(ThemeContext);
    const transaction = useTransaction(hash);
    const confirmed = useIsTransactionConfirmed(hash);
    const transactionSuccess = ((_a = transaction === null || transaction === void 0 ? void 0 : transaction.receipt) === null || _a === void 0 ? void 0 : _a.status) === 1;
    // convert unix time difference to seconds
    const secondsToConfirm = (transaction === null || transaction === void 0 ? void 0 : transaction.confirmedTime)
        ? (transaction.confirmedTime - transaction.addedTime) / 1000
        : undefined;
    const info = CHAIN_INFO[chainId];
    return (jsx(Wrapper, { children: jsxs(Section, Object.assign({ inline: inline }, { children: [!inline && (jsxs(RowBetween, Object.assign({ mb: "16px" }, { children: [jsx(Badge, { children: jsxs(RowFixed, { children: [jsx(StyledLogo, { src: info.logoUrl, style: { margin: '0 8px 0 0' } }, void 0), info.label] }, void 0) }, void 0), jsx(CloseIcon$3, { onClick: onDismiss }, void 0)] }), void 0)), jsx(ConfirmedIcon, Object.assign({ inline: inline }, { children: confirmed ? (transactionSuccess ? (
                    // <CheckCircle strokeWidth={1} size={inline ? '40px' : '90px'} color={theme.green1} />
                    jsx(AnimatedConfirmation, {}, void 0)) : (jsx(AlertCircle, { strokeWidth: 1, size: inline ? '40px' : '90px', color: theme.red1 }, void 0))) : (jsx(CustomLightSpinner, { src: Circle$1, alt: "loader", size: inline ? '40px' : '90px' }, void 0)) }), void 0), jsxs(AutoColumn, Object.assign({ gap: "12px", justify: 'center' }, { children: [jsx(Text$1, Object.assign({ fontWeight: 500, fontSize: 20, textAlign: "center" }, { children: !hash ? (jsx(Trans, { children: "Confirm transaction in wallet" }, void 0)) : !confirmed ? (jsx(Trans, { children: "Transaction Submitted" }, void 0)) : transactionSuccess ? (jsx(Trans, { children: "Success" }, void 0)) : (jsx(Trans, { children: "Error" }, void 0)) }), void 0), jsx(Text$1, Object.assign({ fontWeight: 400, fontSize: 16, textAlign: "center" }, { children: transaction ? jsx(TransactionSummary, { info: transaction.info }, void 0) : pendingText }), void 0), chainId && hash ? (jsx(ExternalLink, Object.assign({ href: getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION) }, { children: jsx(Text$1, Object.assign({ fontWeight: 500, fontSize: 14, color: theme.primary1 }, { children: jsx(Trans, { children: "View on Explorer" }, void 0) }), void 0) }), void 0)) : (jsx("div", { style: { height: '17px' } }, void 0)), jsx(Text$1, Object.assign({ color: theme.text3, style: { margin: '20px 0 0 0' }, fontSize: '14px' }, { children: !secondsToConfirm ? (jsx("div", { style: { height: '24px' } }, void 0)) : (jsxs("div", { children: [jsx(Trans, { children: "Transaction completed in " }, void 0), jsxs("span", Object.assign({ style: { fontWeight: 500, marginLeft: '4px', color: theme.text1 } }, { children: [secondsToConfirm, " seconds \uD83C\uDF89"] }), void 0)] }, void 0)) }), void 0), jsx(ButtonPrimary, Object.assign({ onClick: onDismiss, style: { margin: '4px 0 0 0' } }, { children: jsx(Text$1, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: inline ? jsx(Trans, { children: "Return" }, void 0) : jsx(Trans, { children: "Close" }, void 0) }), void 0) }), void 0)] }), void 0)] }), void 0) }, void 0));
}
function TransactionConfirmationModal({ isOpen, onDismiss, attemptingTxn, hash, pendingText, content, currencyToAdd, }) {
    const { chainId } = useActiveWeb3React();
    const isL2 = Boolean(chainId && L2_CHAIN_IDS.includes(chainId));
    if (!chainId)
        return null;
    // confirmation screen
    return (jsx(Modal, Object.assign({ isOpen: isOpen, onDismiss: onDismiss, maxHeight: 90 }, { children: isL2 && (hash || attemptingTxn) ? (jsx(L2Content, { chainId: chainId, hash: hash, onDismiss: onDismiss, pendingText: pendingText }, void 0)) : attemptingTxn ? (jsx(ConfirmationPendingContent, { onDismiss: onDismiss, pendingText: pendingText }, void 0)) : hash ? (jsx(TransactionSubmittedContent, { chainId: chainId, hash: hash, onDismiss: onDismiss, currencyToAdd: currencyToAdd }, void 0)) : (content()) }), void 0));
}

function SwapModalFooter({ onConfirm, swapErrorMessage, disabledConfirm, }) {
    return (jsx(Fragment, { children: jsxs(AutoRow, { children: [jsx(ButtonError, Object.assign({ onClick: onConfirm, disabled: disabledConfirm, style: { margin: '10px 0 0 0' }, id: "confirm-swap-or-send" }, { children: jsx(Text$1, Object.assign({ fontSize: 20, fontWeight: 500 }, { children: jsx(Trans, { children: "Confirm Swap" }, void 0) }), void 0) }), void 0), swapErrorMessage ? jsx(SwapCallbackError, { error: swapErrorMessage }, void 0) : null] }, void 0) }, void 0));
}

function computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput) {
    if (!fiatValueOutput || !fiatValueInput)
        return undefined;
    if (!fiatValueInput.currency.equals(fiatValueOutput.currency))
        return undefined;
    if (JSBI.equal(fiatValueInput.quotient, JSBI.BigInt(0)))
        return undefined;
    const pct = ONE_HUNDRED_PERCENT$1.subtract(fiatValueOutput.divide(fiatValueInput));
    return new Percent(pct.numerator, pct.denominator);
}

const ArrowWrapper = styled.div `
  padding: 4px;
  border-radius: 12px;
  height: 32px;
  width: 32px;
  position: relative;
  margin-top: -18px;
  margin-bottom: -18px;
  left: calc(50% - 16px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bg1};
  border: 4px solid;
  border-color: ${({ theme }) => theme.bg0};
  z-index: 2;
`;
function SwapModalHeader({ trade, allowedSlippage, recipient, showAcceptChanges, onAcceptChanges, }) {
    const theme = useContext(ThemeContext);
    const [showInverted, setShowInverted] = useState(false);
    const fiatValueInput = useUSDCValue(trade.inputAmount);
    const fiatValueOutput = useUSDCValue(trade.outputAmount);
    return (jsxs(AutoColumn, Object.assign({ gap: '4px', style: { marginTop: '1rem' } }, { children: [jsx(LightCard, Object.assign({ padding: "0.75rem 1rem" }, { children: jsxs(AutoColumn, Object.assign({ gap: '8px' }, { children: [jsxs(RowBetween, { children: [jsx(ThemedText.Body, Object.assign({ color: theme.text3, fontWeight: 500, fontSize: 14 }, { children: jsx(Trans, { children: "From" }, void 0) }), void 0), jsx(FiatValue, { fiatValue: fiatValueInput }, void 0)] }, void 0), jsxs(RowBetween, Object.assign({ align: "center" }, { children: [jsxs(RowFixed, Object.assign({ gap: '0px' }, { children: [jsx(CurrencyLogo, { currency: trade.inputAmount.currency, size: '20px', style: { marginRight: '12px' } }, void 0), jsx(Text$1, Object.assign({ fontSize: 20, fontWeight: 500 }, { children: trade.inputAmount.currency.symbol }), void 0)] }), void 0), jsx(RowFixed, Object.assign({ gap: '0px' }, { children: jsx(TruncatedText, Object.assign({ fontSize: 24, fontWeight: 500, color: showAcceptChanges && trade.tradeType === TradeType.EXACT_OUTPUT ? theme.primary1 : '' }, { children: trade.inputAmount.toSignificant(6) }), void 0) }), void 0)] }), void 0)] }), void 0) }), void 0), jsx(ArrowWrapper, { children: jsx(ArrowDown, { size: "16", color: theme.text2 }, void 0) }, void 0), jsx(LightCard, Object.assign({ padding: "0.75rem 1rem", style: { marginBottom: '0.25rem' } }, { children: jsxs(AutoColumn, Object.assign({ gap: '8px' }, { children: [jsxs(RowBetween, { children: [jsx(ThemedText.Body, Object.assign({ color: theme.text3, fontWeight: 500, fontSize: 14 }, { children: jsx(Trans, { children: "To" }, void 0) }), void 0), jsx(ThemedText.Body, Object.assign({ fontSize: 14, color: theme.text3 }, { children: jsx(FiatValue, { fiatValue: fiatValueOutput, priceImpact: computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput) }, void 0) }), void 0)] }, void 0), jsxs(RowBetween, Object.assign({ align: "flex-end" }, { children: [jsxs(RowFixed, Object.assign({ gap: '0px' }, { children: [jsx(CurrencyLogo, { currency: trade.outputAmount.currency, size: '20px', style: { marginRight: '12px' } }, void 0), jsx(Text$1, Object.assign({ fontSize: 20, fontWeight: 500 }, { children: trade.outputAmount.currency.symbol }), void 0)] }), void 0), jsx(RowFixed, Object.assign({ gap: '0px' }, { children: jsx(TruncatedText, Object.assign({ fontSize: 24, fontWeight: 500 }, { children: trade.outputAmount.toSignificant(6) }), void 0) }), void 0)] }), void 0)] }), void 0) }), void 0), jsxs(RowBetween, Object.assign({ style: { marginTop: '0.25rem', padding: '0 1rem' } }, { children: [jsx(ThemedText.Body, Object.assign({ color: theme.text2, fontWeight: 500, fontSize: 14 }, { children: jsx(Trans, { children: "Price" }, void 0) }), void 0), jsx(TradePrice, { price: trade.executionPrice, showInverted: showInverted, setShowInverted: setShowInverted }, void 0)] }), void 0), jsx(LightCard, Object.assign({ style: { padding: '.75rem', marginTop: '0.5rem' } }, { children: jsx(AdvancedSwapDetails, { trade: trade, allowedSlippage: allowedSlippage }, void 0) }), void 0), showAcceptChanges ? (jsx(SwapShowAcceptChanges, Object.assign({ justify: "flex-start", gap: '0px' }, { children: jsxs(RowBetween, { children: [jsxs(RowFixed, { children: [jsx(AlertTriangle, { size: 20, style: { marginRight: '8px', minWidth: 24 } }, void 0), jsx(ThemedText.Main, Object.assign({ color: theme.primary1 }, { children: jsx(Trans, { children: "Price Updated" }, void 0) }), void 0)] }, void 0), jsx(ButtonPrimary, Object.assign({ style: { padding: '.5rem', width: 'fit-content', fontSize: '0.825rem', borderRadius: '12px' }, onClick: onAcceptChanges }, { children: jsx(Trans, { children: "Accept" }, void 0) }), void 0)] }, void 0) }), void 0)) : null, jsx(AutoColumn, Object.assign({ justify: "flex-start", gap: "sm", style: { padding: '.75rem 1rem' } }, { children: trade.tradeType === TradeType.EXACT_INPUT ? (jsx(ThemedText.Italic, Object.assign({ fontWeight: 400, textAlign: "left", style: { width: '100%' } }, { children: jsxs(Trans, { children: ["Output is estimated. You will receive at least", ' ', jsxs("b", { children: [trade.minimumAmountOut(allowedSlippage).toSignificant(6), " ", trade.outputAmount.currency.symbol] }, void 0), ' ', "or the transaction will revert."] }, void 0) }), void 0)) : (jsx(ThemedText.Italic, Object.assign({ fontWeight: 400, textAlign: "left", style: { width: '100%' } }, { children: jsxs(Trans, { children: ["Input is estimated. You will sell at most", ' ', jsxs("b", { children: [trade.maximumAmountIn(allowedSlippage).toSignificant(6), " ", trade.inputAmount.currency.symbol] }, void 0), ' ', "or the transaction will revert."] }, void 0) }), void 0)) }), void 0), recipient !== null ? (jsx(AutoColumn, Object.assign({ justify: "flex-start", gap: "sm", style: { padding: '12px 0 0 0px' } }, { children: jsx(ThemedText.Main, { children: jsxs(Trans, { children: ["Output will be sent to", ' ', jsx("b", Object.assign({ title: recipient }, { children: isAddress(recipient) ? shortenAddress(recipient) : recipient }), void 0)] }, void 0) }, void 0) }), void 0)) : null] }), void 0));
}

/**
 * Returns true if the trade requires a confirmation of details before we can submit it
 * @param args either a pair of V2 trades or a pair of V3 trades
 */
function tradeMeaningfullyDiffers(...args) {
    const [tradeA, tradeB] = args;
    return (tradeA.tradeType !== tradeB.tradeType ||
        !tradeA.inputAmount.currency.equals(tradeB.inputAmount.currency) ||
        !tradeA.inputAmount.equalTo(tradeB.inputAmount) ||
        !tradeA.outputAmount.currency.equals(tradeB.outputAmount.currency) ||
        !tradeA.outputAmount.equalTo(tradeB.outputAmount));
}
function ConfirmSwapModal({ trade, originalTrade, onAcceptChanges, allowedSlippage, onConfirm, onDismiss, recipient, swapErrorMessage, isOpen, attemptingTxn, txHash, }) {
    var _a, _b, _c, _d, _e, _f;
    const showAcceptChanges = useMemo(() => Boolean((trade instanceof Trade &&
        originalTrade instanceof Trade &&
        tradeMeaningfullyDiffers(trade, originalTrade)) ||
        (trade instanceof Trade$1 &&
            originalTrade instanceof Trade$1 &&
            tradeMeaningfullyDiffers(trade, originalTrade))), [originalTrade, trade]);
    const modalHeader = useCallback(() => {
        return trade ? (jsx(SwapModalHeader, { trade: trade, allowedSlippage: allowedSlippage, recipient: recipient, showAcceptChanges: showAcceptChanges, onAcceptChanges: onAcceptChanges }, void 0)) : null;
    }, [allowedSlippage, onAcceptChanges, recipient, showAcceptChanges, trade]);
    const modalBottom = useCallback(() => {
        return trade ? (jsx(SwapModalFooter, { onConfirm: onConfirm, trade: trade, disabledConfirm: showAcceptChanges, swapErrorMessage: swapErrorMessage }, void 0)) : null;
    }, [onConfirm, showAcceptChanges, swapErrorMessage, trade]);
    // text to show while loading
    const pendingText = (jsxs(Trans, { children: ["Swapping ", (_a = trade === null || trade === void 0 ? void 0 : trade.inputAmount) === null || _a === void 0 ? void 0 : _a.toSignificant(6), " ", (_c = (_b = trade === null || trade === void 0 ? void 0 : trade.inputAmount) === null || _b === void 0 ? void 0 : _b.currency) === null || _c === void 0 ? void 0 : _c.symbol, " for", ' ', (_d = trade === null || trade === void 0 ? void 0 : trade.outputAmount) === null || _d === void 0 ? void 0 : _d.toSignificant(6), " ", (_f = (_e = trade === null || trade === void 0 ? void 0 : trade.outputAmount) === null || _e === void 0 ? void 0 : _e.currency) === null || _f === void 0 ? void 0 : _f.symbol] }, void 0));
    const confirmationContent = useCallback(() => swapErrorMessage ? (jsx(TransactionErrorContent, { onDismiss: onDismiss, message: swapErrorMessage }, void 0)) : (jsx(ConfirmationModalContent, { title: jsx(Trans, { children: "Confirm Swap" }, void 0), onDismiss: onDismiss, topContent: modalHeader, bottomContent: modalBottom }, void 0)), [onDismiss, modalBottom, modalHeader, swapErrorMessage]);
    return (jsx(TransactionConfirmationModal, { isOpen: isOpen, onDismiss: onDismiss, attemptingTxn: attemptingTxn, hash: txHash, content: confirmationContent, pendingText: pendingText, currencyToAdd: trade === null || trade === void 0 ? void 0 : trade.outputAmount.currency }, void 0));
}

const ToggleElement = styled.span `
  padding: 0.25rem 0.6rem;
  border-radius: 9px;
  background: ${({ theme, isActive, isOnSwitch }) => (isActive ? (isOnSwitch ? theme.primary1 : theme.bg4) : 'none')};
  color: ${({ theme, isActive }) => (isActive ? theme.white : theme.text2)};
  font-size: 14px;
  font-weight: ${({ isOnSwitch }) => (isOnSwitch ? '500' : '400')};
  :hover {
    user-select: ${({ isOnSwitch }) => (isOnSwitch ? 'none' : 'initial')};
    background: ${({ theme, isActive, isOnSwitch }) => isActive ? (isOnSwitch ? darken(0.05, theme.primary1) : darken(0.05, theme.bg4)) : 'none'};
    color: ${({ theme, isActive, isOnSwitch }) => (isActive ? (isOnSwitch ? theme.white : theme.white) : theme.text3)};
  }
`;
const StyledToggle = styled.button `
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.bg0};
  display: flex;
  width: fit-content;
  cursor: pointer;
  outline: none;
  padding: 2px;
`;
function Toggle({ id, isActive, toggle, checked = jsx(Trans, { children: "On" }, void 0), unchecked = jsx(Trans, { children: "Off" }, void 0), }) {
    return (jsxs(StyledToggle, Object.assign({ id: id, isActive: isActive, onClick: toggle }, { children: [jsx(ToggleElement, Object.assign({ isActive: isActive, isOnSwitch: true }, { children: checked }), void 0), jsx(ToggleElement, Object.assign({ isActive: !isActive, isOnSwitch: false }, { children: unchecked }), void 0)] }), void 0));
}

var SlippageError;
(function (SlippageError) {
    SlippageError["InvalidInput"] = "InvalidInput";
})(SlippageError || (SlippageError = {}));
var DeadlineError;
(function (DeadlineError) {
    DeadlineError["InvalidInput"] = "InvalidInput";
})(DeadlineError || (DeadlineError = {}));
const FancyButton = styled.button `
  color: ${({ theme }) => theme.text1};
  align-items: center;
  height: 2rem;
  border-radius: 36px;
  font-size: 1rem;
  width: auto;
  min-width: 3.5rem;
  border: 1px solid ${({ theme }) => theme.bg3};
  outline: none;
  background: ${({ theme }) => theme.bg1};
  :hover {
    border: 1px solid ${({ theme }) => theme.bg4};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
  }
`;
const Option = styled(FancyButton) `
  margin-right: 8px;
  :hover {
    cursor: pointer;
  }
  background-color: ${({ active, theme }) => active && theme.primary1};
  color: ${({ active, theme }) => (active ? theme.white : theme.text1)};
`;
const Input = styled.input `
  background: ${({ theme }) => theme.bg1};
  font-size: 16px;
  width: auto;
  outline: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  color: ${({ theme, color }) => (color === 'red' ? theme.red1 : theme.text1)};
  text-align: right;
`;
const OptionCustom = styled(FancyButton) `
  height: 2rem;
  position: relative;
  padding: 0 0.75rem;
  flex: 1;
  border: ${({ theme, active, warning }) => active ? `1px solid ${warning ? theme.red1 : theme.primary1}` : warning && `1px solid ${theme.red1}`};
  :hover {
    border: ${({ theme, active, warning }) => active && `1px solid ${warning ? darken(0.1, theme.red1) : darken(0.1, theme.primary1)}`};
  }

  input {
    width: 100%;
    height: 100%;
    border: 0px;
    border-radius: 2rem;
  }
`;
const SlippageEmojiContainer = styled.span `
  color: #f3841e;
  ${({ theme }) => theme.mediaWidth.upToSmall `
    display: none;
  `}
`;
const THREE_DAYS_IN_SECONDS = ms `3 days` / 1000;
function TransactionSettings({ placeholderSlippage }) {
    const { chainId } = useActiveWeb3React();
    const theme = useContext(ThemeContext);
    const userSlippageTolerance = useUserSlippageTolerance();
    const setUserSlippageTolerance = useSetUserSlippageTolerance();
    const [deadline, setDeadline] = useUserTransactionTTL();
    const [slippageInput, setSlippageInput] = useState('');
    const [slippageError, setSlippageError] = useState(false);
    const [deadlineInput, setDeadlineInput] = useState('');
    const [deadlineError, setDeadlineError] = useState(false);
    function parseSlippageInput(value) {
        // populate what the user typed and clear the error
        setSlippageInput(value);
        setSlippageError(false);
        if (value.length === 0) {
            setUserSlippageTolerance('auto');
        }
        else {
            const parsed = Math.floor(Number.parseFloat(value) * 100);
            if (!Number.isInteger(parsed) || parsed < 0 || parsed > 5000) {
                setUserSlippageTolerance('auto');
                if (value !== '.') {
                    setSlippageError(SlippageError.InvalidInput);
                }
            }
            else {
                setUserSlippageTolerance(new Percent(parsed, 10000));
            }
        }
    }
    const tooLow = userSlippageTolerance !== 'auto' && userSlippageTolerance.lessThan(new Percent(5, 10000));
    const tooHigh = userSlippageTolerance !== 'auto' && userSlippageTolerance.greaterThan(new Percent(1, 100));
    function parseCustomDeadline(value) {
        // populate what the user typed and clear the error
        setDeadlineInput(value);
        setDeadlineError(false);
        if (value.length === 0) {
            setDeadline(DEFAULT_DEADLINE_FROM_NOW);
        }
        else {
            try {
                const parsed = Math.floor(Number.parseFloat(value) * 60);
                if (!Number.isInteger(parsed) || parsed < 60 || parsed > THREE_DAYS_IN_SECONDS) {
                    setDeadlineError(DeadlineError.InvalidInput);
                }
                else {
                    setDeadline(parsed);
                }
            }
            catch (error) {
                console.error(error);
                setDeadlineError(DeadlineError.InvalidInput);
            }
        }
    }
    const showCustomDeadlineRow = Boolean(chainId && !L2_CHAIN_IDS.includes(chainId));
    return (jsxs(AutoColumn, Object.assign({ gap: "md" }, { children: [jsxs(AutoColumn, Object.assign({ gap: "sm" }, { children: [jsxs(RowFixed, { children: [jsx(ThemedText.Black, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: jsx(Trans, { children: "Slippage tolerance" }, void 0) }), void 0), jsx(QuestionHelper, { text: jsx(Trans, { children: "Your transaction will revert if the price changes unfavorably by more than this percentage." }, void 0) }, void 0)] }, void 0), jsxs(RowBetween, { children: [jsx(Option, Object.assign({ onClick: () => {
                                    parseSlippageInput('');
                                }, active: userSlippageTolerance === 'auto' }, { children: jsx(Trans, { children: "Auto" }, void 0) }), void 0), jsx(OptionCustom, Object.assign({ active: userSlippageTolerance !== 'auto', warning: !!slippageError, tabIndex: -1 }, { children: jsxs(RowBetween, { children: [tooLow || tooHigh ? (jsx(SlippageEmojiContainer, { children: jsx("span", Object.assign({ role: "img", "aria-label": "warning" }, { children: "\u26A0\uFE0F" }), void 0) }, void 0)) : null, jsx(Input, { placeholder: placeholderSlippage.toFixed(2), value: slippageInput.length > 0
                                                ? slippageInput
                                                : userSlippageTolerance === 'auto'
                                                    ? ''
                                                    : userSlippageTolerance.toFixed(2), onChange: (e) => parseSlippageInput(e.target.value), onBlur: () => {
                                                setSlippageInput('');
                                                setSlippageError(false);
                                            }, color: slippageError ? 'red' : '' }, void 0), "%"] }, void 0) }), void 0)] }, void 0), slippageError || tooLow || tooHigh ? (jsx(RowBetween, Object.assign({ style: {
                            fontSize: '14px',
                            paddingTop: '7px',
                            color: slippageError ? 'red' : '#F3841E',
                        } }, { children: slippageError ? (jsx(Trans, { children: "Enter a valid slippage percentage" }, void 0)) : tooLow ? (jsx(Trans, { children: "Your transaction may fail" }, void 0)) : (jsx(Trans, { children: "Your transaction may be frontrun" }, void 0)) }), void 0)) : null] }), void 0), showCustomDeadlineRow && (jsxs(AutoColumn, Object.assign({ gap: "sm" }, { children: [jsxs(RowFixed, { children: [jsx(ThemedText.Black, Object.assign({ fontSize: 14, fontWeight: 400, color: theme.text2 }, { children: jsx(Trans, { children: "Transaction deadline" }, void 0) }), void 0), jsx(QuestionHelper, { text: jsx(Trans, { children: "Your transaction will revert if it is pending for more than this period of time." }, void 0) }, void 0)] }, void 0), jsxs(RowFixed, { children: [jsx(OptionCustom, Object.assign({ style: { width: '80px' }, warning: !!deadlineError, tabIndex: -1 }, { children: jsx(Input, { placeholder: (DEFAULT_DEADLINE_FROM_NOW / 60).toString(), value: deadlineInput.length > 0
                                        ? deadlineInput
                                        : deadline === DEFAULT_DEADLINE_FROM_NOW
                                            ? ''
                                            : (deadline / 60).toString(), onChange: (e) => parseCustomDeadline(e.target.value), onBlur: () => {
                                        setDeadlineInput('');
                                        setDeadlineError(false);
                                    }, color: deadlineError ? 'red' : '' }, void 0) }), void 0), jsx(ThemedText.Body, Object.assign({ style: { paddingLeft: '8px' }, fontSize: 14 }, { children: jsx(Trans, { children: "minutes" }, void 0) }), void 0)] }, void 0)] }), void 0))] }), void 0));
}

const StyledMenuIcon = styled(Settings) `
  height: 20px;
  width: 20px;

  > * {
    stroke: ${({ theme }) => theme.text2};
  }

  :hover {
    opacity: 0.7;
  }
`;
const StyledCloseIcon = styled(X) `
  height: 20px;
  width: 20px;
  :hover {
    cursor: pointer;
  }

  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`;
const StyledMenuButton = styled.button `
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  border-radius: 0.5rem;
  height: 20px;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
  }
`;
const EmojiWrapper = styled.div `
  position: absolute;
  bottom: -6px;
  right: 0px;
  font-size: 14px;
`;
const StyledMenu = styled.div `
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`;
const MenuFlyout = styled.span `
  min-width: 20.125rem;
  background-color: ${({ theme }) => theme.bg2};
  border: 1px solid ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 2rem;
  right: 0rem;
  z-index: 100;

  ${({ theme }) => theme.mediaWidth.upToMedium `
    min-width: 18.125rem;
  `};

  user-select: none;
`;
const Break = styled.div `
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg3};
`;
const ModalContentWrapper = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 20px;
`;
function SettingsTab({ placeholderSlippage }) {
    const { chainId } = useActiveWeb3React();
    const node = useRef();
    const open = useModalOpen(ApplicationModal.SETTINGS);
    const toggle = useToggleSettingsMenu();
    const theme = useContext(ThemeContext);
    const [expertMode, toggleExpertMode] = useExpertModeManager();
    const [clientSideRouter, setClientSideRouter] = useClientSideRouter();
    // show confirmation view before turning on
    const [showConfirmation, setShowConfirmation] = useState(false);
    useOnClickOutside(node, open ? toggle : undefined);
    return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    jsxs(StyledMenu, Object.assign({ ref: node }, { children: [jsx(Modal, Object.assign({ isOpen: showConfirmation, onDismiss: () => setShowConfirmation(false), maxHeight: 100 }, { children: jsx(ModalContentWrapper, { children: jsxs(AutoColumn, Object.assign({ gap: "lg" }, { children: [jsxs(RowBetween, Object.assign({ style: { padding: '0 2rem' } }, { children: [jsx("div", {}, void 0), jsx(Text$1, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: jsx(Trans, { children: "Are you sure?" }, void 0) }), void 0), jsx(StyledCloseIcon, { onClick: () => setShowConfirmation(false) }, void 0)] }), void 0), jsx(Break, {}, void 0), jsxs(AutoColumn, Object.assign({ gap: "lg", style: { padding: '0 2rem' } }, { children: [jsx(Text$1, Object.assign({ fontWeight: 500, fontSize: 20 }, { children: jsx(Trans, { children: "Expert mode turns off the confirm transaction prompt and allows high slippage trades that often result in bad rates and lost funds." }, void 0) }), void 0), jsx(Text$1, Object.assign({ fontWeight: 600, fontSize: 20 }, { children: jsx(Trans, { children: "ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING." }, void 0) }), void 0), jsx(ButtonError, Object.assign({ error: true, padding: '12px', onClick: () => {
                                            const confirmWord = t `confirm`;
                                            if (window.prompt(t `Please type the word "${confirmWord}" to enable expert mode.`) === confirmWord) {
                                                toggleExpertMode();
                                                setShowConfirmation(false);
                                            }
                                        } }, { children: jsx(Text$1, Object.assign({ fontSize: 20, fontWeight: 500, id: "confirm-expert-mode" }, { children: jsx(Trans, { children: "Turn On Expert Mode" }, void 0) }), void 0) }), void 0)] }), void 0)] }), void 0) }, void 0) }), void 0), jsxs(StyledMenuButton, Object.assign({ onClick: toggle, id: "open-settings-dialog-button", "aria-label": t `Transaction Settings` }, { children: [jsx(StyledMenuIcon, {}, void 0), expertMode ? (jsx(EmojiWrapper, { children: jsx("span", Object.assign({ role: "img", "aria-label": "wizard-icon" }, { children: "\uD83E\uDDD9" }), void 0) }, void 0)) : null] }), void 0), open && (jsx(MenuFlyout, { children: jsxs(AutoColumn, Object.assign({ gap: "md", style: { padding: '1rem' } }, { children: [jsx(Text$1, Object.assign({ fontWeight: 600, fontSize: 14 }, { children: jsx(Trans, { children: "Transaction Settings" }, void 0) }), void 0), jsx(TransactionSettings, { placeholderSlippage: placeholderSlippage }, void 0), jsx(Text$1, Object.assign({ fontWeight: 600, fontSize: 14 }, { children: jsx(Trans, { children: "Interface Settings" }, void 0) }), void 0), chainId === SupportedChainId.MAINNET && (jsxs(RowBetween, { children: [jsxs(RowFixed, { children: [jsx(ThemedText.Black, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: jsx(Trans, { children: "Auto Router" }, void 0) }), void 0), jsx(QuestionHelper, { text: jsx(Trans, { children: "Use the Uniswap Labs API to get better pricing through a more efficient route." }, void 0) }, void 0)] }, void 0), jsx(Toggle, { id: "toggle-optimized-router-button", isActive: !clientSideRouter, toggle: () => {
                                        ReactGA.event({
                                            category: 'Routing',
                                            action: clientSideRouter ? 'enable routing API' : 'disable routing API',
                                        });
                                        setClientSideRouter(!clientSideRouter);
                                    } }, void 0)] }, void 0)), jsxs(RowBetween, { children: [jsxs(RowFixed, { children: [jsx(ThemedText.Black, Object.assign({ fontWeight: 400, fontSize: 14, color: theme.text2 }, { children: jsx(Trans, { children: "Expert Mode" }, void 0) }), void 0), jsx(QuestionHelper, { text: jsx(Trans, { children: "Allow high price impact trades and skip the confirm screen. Use at your own risk." }, void 0) }, void 0)] }, void 0), jsx(Toggle, { id: "toggle-expert-mode-button", isActive: expertMode, toggle: expertMode
                                        ? () => {
                                            toggleExpertMode();
                                            setShowConfirmation(false);
                                        }
                                        : () => {
                                            toggle();
                                            setShowConfirmation(true);
                                        } }, void 0)] }, void 0)] }), void 0) }, void 0))] }), void 0));
}

const StyledSwapHeader = styled.div `
  padding: 1rem 1.25rem 0.5rem 1.25rem;
  width: 100%;
  color: ${({ theme }) => theme.text2};
`;
function SwapHeader({ allowedSlippage }) {
    return (jsx(StyledSwapHeader, { children: jsxs(RowBetween, { children: [jsx(RowFixed, { children: jsx(ThemedText.Black, Object.assign({ fontWeight: 500, fontSize: 16, style: { marginRight: '8px' } }, { children: jsx(Trans, { children: "Swap" }, void 0) }), void 0) }, void 0), jsx(RowFixed, { children: jsx(SettingsTab, { placeholderSlippage: allowedSlippage }, void 0) }, void 0)] }, void 0) }, void 0));
}

const Container = styled(ThemedText.Small) `
  opacity: 0.6;
  :hover {
    opacity: 1;
  }
  margin-top: 1rem !important;
`;
const useTargetLocale = (activeLocale) => {
    const browserLocale = useMemo(() => navigatorLocale(), []);
    if (browserLocale && (browserLocale !== DEFAULT_LOCALE || activeLocale !== DEFAULT_LOCALE)) {
        if (activeLocale === browserLocale) {
            return DEFAULT_LOCALE;
        }
        else {
            return browserLocale;
        }
    }
    return null;
};
function SwitchLocaleLink() {
    const activeLocale = useActiveLocale();
    const targetLocale = useTargetLocale(activeLocale);
    const { to, onClick } = useLocationLinkProps(targetLocale);
    if (!targetLocale || !to)
        return null;
    return (jsx(Container, { children: jsxs(Trans, { children: ["Uniswap available in:", ' ', jsx(StyledInternalLink, Object.assign({ onClick: onClick, to: to }, { children: LOCALE_LABEL[targetLocale] }), void 0)] }, void 0) }, void 0));
}

function TokenWarningModal({ isOpen, tokens, onConfirm, onDismiss, }) {
    return (jsx(Modal, Object.assign({ isOpen: isOpen, onDismiss: onDismiss, maxHeight: 100 }, { children: jsx(ImportToken, { tokens: tokens, handleCurrencySelect: onConfirm }, void 0) }), void 0));
}

function useTokenAllowance(token, owner, spender) {
    const contract = useTokenContract(token === null || token === void 0 ? void 0 : token.address, false);
    const inputs = useMemo(() => [owner, spender], [owner, spender]);
    const allowance = useSingleCallResult(contract, 'allowance', inputs).result;
    return useMemo(() => (token && allowance ? CurrencyAmount.fromRawAmount(token, allowance.toString()) : undefined), [token, allowance]);
}

var ApprovalState;
(function (ApprovalState) {
    ApprovalState["UNKNOWN"] = "UNKNOWN";
    ApprovalState["NOT_APPROVED"] = "NOT_APPROVED";
    ApprovalState["PENDING"] = "PENDING";
    ApprovalState["APPROVED"] = "APPROVED";
})(ApprovalState || (ApprovalState = {}));
// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
function useApproveCallback(amountToApprove, spender) {
    var _a;
    const { account, chainId } = useActiveWeb3React();
    const token = ((_a = amountToApprove === null || amountToApprove === void 0 ? void 0 : amountToApprove.currency) === null || _a === void 0 ? void 0 : _a.isToken) ? amountToApprove.currency : undefined;
    const currentAllowance = useTokenAllowance(token, account !== null && account !== void 0 ? account : undefined, spender);
    const pendingApproval = useHasPendingApproval(token === null || token === void 0 ? void 0 : token.address, spender);
    // check the current approval status
    const approvalState = useMemo(() => {
        if (!amountToApprove || !spender)
            return ApprovalState.UNKNOWN;
        if (amountToApprove.currency.isNative)
            return ApprovalState.APPROVED;
        // we might not have enough data to know whether or not we need to approve
        if (!currentAllowance)
            return ApprovalState.UNKNOWN;
        // amountToApprove will be defined if currentAllowance is
        return currentAllowance.lessThan(amountToApprove)
            ? pendingApproval
                ? ApprovalState.PENDING
                : ApprovalState.NOT_APPROVED
            : ApprovalState.APPROVED;
    }, [amountToApprove, currentAllowance, pendingApproval, spender]);
    const tokenContract = useTokenContract(token === null || token === void 0 ? void 0 : token.address);
    const addTransaction = useTransactionAdder();
    const approve = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        if (approvalState !== ApprovalState.NOT_APPROVED) {
            console.error('approve was called unnecessarily');
            return;
        }
        if (!chainId) {
            console.error('no chainId');
            return;
        }
        if (!token) {
            console.error('no token');
            return;
        }
        if (!tokenContract) {
            console.error('tokenContract is null');
            return;
        }
        if (!amountToApprove) {
            console.error('missing amount to approve');
            return;
        }
        if (!spender) {
            console.error('no spender');
            return;
        }
        let useExact = false;
        const estimatedGas = yield tokenContract.estimateGas.approve(spender, MaxUint256).catch(() => {
            // general fallback for tokens who restrict approval amounts
            useExact = true;
            return tokenContract.estimateGas.approve(spender, amountToApprove.quotient.toString());
        });
        return tokenContract
            .approve(spender, useExact ? amountToApprove.quotient.toString() : MaxUint256, {
            gasLimit: calculateGasMargin(estimatedGas),
        })
            .then((response) => {
            addTransaction(response, { type: TransactionType.APPROVAL, tokenAddress: token.address, spender });
        })
            .catch((error) => {
            console.debug('Failed to approve token', error);
            throw error;
        });
    }), [approvalState, token, tokenContract, amountToApprove, spender, addTransaction, chainId]);
    return [approvalState, approve];
}
// wraps useApproveCallback in the context of a swap
function useApproveCallbackFromTrade(trade, allowedSlippage) {
    const { chainId } = useActiveWeb3React();
    const v3SwapRouterAddress = chainId ? SWAP_ROUTER_ADDRESSES[chainId] : undefined;
    const amountToApprove = useMemo(() => (trade && trade.inputAmount.currency.isToken ? trade.maximumAmountIn(allowedSlippage) : undefined), [trade, allowedSlippage]);
    return useApproveCallback(amountToApprove, chainId
        ? trade instanceof Trade
            ? V2_ROUTER_ADDRESS[chainId]
            : trade instanceof Trade$1
                ? v3SwapRouterAddress
                : undefined
        : undefined);
}

function useIsArgentWallet() {
    var _a, _b;
    const { account } = useActiveWeb3React();
    const argentWalletDetector = useArgentWalletDetectorContract();
    const inputs = useMemo(() => [account !== null && account !== void 0 ? account : undefined], [account]);
    const call = useSingleCallResult(argentWalletDetector, 'isArgentWallet', inputs, NEVER_RELOAD);
    return (_b = (_a = call === null || call === void 0 ? void 0 : call.result) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : false;
}

// combines the block timestamp with the user setting to give the deadline that should be used for any submitted transaction
function useTransactionDeadline() {
    const { chainId } = useActiveWeb3React();
    const ttl = useAppSelector((state) => state.user.userDeadline);
    const blockTimestamp = useCurrentBlockTimestamp();
    return useMemo(() => {
        if (blockTimestamp && chainId && L2_CHAIN_IDS.includes(chainId))
            return blockTimestamp.add(L2_DEADLINE_FROM_NOW);
        if (blockTimestamp && ttl)
            return blockTimestamp.add(ttl);
        return undefined;
    }, [blockTimestamp, chainId, ttl]);
}

var PermitType;
(function (PermitType) {
    PermitType[PermitType["AMOUNT"] = 1] = "AMOUNT";
    PermitType[PermitType["ALLOWED"] = 2] = "ALLOWED";
})(PermitType || (PermitType = {}));
// 20 minutes to submit after signing
const PERMIT_VALIDITY_BUFFER = 20 * 60;
// todo: read this information from extensions on token lists or elsewhere (permit registry?)
const PERMITTABLE_TOKENS = {
    1: {
        [USDC.address]: { type: PermitType.AMOUNT, name: 'USD Coin', version: '2' },
        [DAI.address]: { type: PermitType.ALLOWED, name: 'Dai Stablecoin', version: '1' },
        [UNI[1].address]: { type: PermitType.AMOUNT, name: 'Uniswap' },
    },
    4: {
        '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735': { type: PermitType.ALLOWED, name: 'Dai Stablecoin', version: '1' },
        [UNI[4].address]: { type: PermitType.AMOUNT, name: 'Uniswap' },
    },
    3: {
        [UNI[3].address]: { type: PermitType.AMOUNT, name: 'Uniswap' },
        '0x07865c6E87B9F70255377e024ace6630C1Eaa37F': { type: PermitType.AMOUNT, name: 'USD Coin', version: '2' },
    },
    5: {
        [UNI[5].address]: { type: PermitType.AMOUNT, name: 'Uniswap' },
    },
    42: {
        [UNI[42].address]: { type: PermitType.AMOUNT, name: 'Uniswap' },
    },
};
var UseERC20PermitState;
(function (UseERC20PermitState) {
    // returned for any reason, e.g. it is an argent wallet, or the currency does not support it
    UseERC20PermitState[UseERC20PermitState["NOT_APPLICABLE"] = 0] = "NOT_APPLICABLE";
    UseERC20PermitState[UseERC20PermitState["LOADING"] = 1] = "LOADING";
    UseERC20PermitState[UseERC20PermitState["NOT_SIGNED"] = 2] = "NOT_SIGNED";
    UseERC20PermitState[UseERC20PermitState["SIGNED"] = 3] = "SIGNED";
})(UseERC20PermitState || (UseERC20PermitState = {}));
const EIP712_DOMAIN_TYPE = [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
];
const EIP712_DOMAIN_TYPE_NO_VERSION = [
    { name: 'name', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
];
const EIP2612_TYPE = [
    { name: 'owner', type: 'address' },
    { name: 'spender', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'deadline', type: 'uint256' },
];
const PERMIT_ALLOWED_TYPE = [
    { name: 'holder', type: 'address' },
    { name: 'spender', type: 'address' },
    { name: 'nonce', type: 'uint256' },
    { name: 'expiry', type: 'uint256' },
    { name: 'allowed', type: 'bool' },
];
function useERC20Permit(currencyAmount, spender, overridePermitInfo) {
    var _a, _b;
    const { account, chainId, library } = useActiveWeb3React();
    const transactionDeadline = useTransactionDeadline();
    const tokenAddress = ((_a = currencyAmount === null || currencyAmount === void 0 ? void 0 : currencyAmount.currency) === null || _a === void 0 ? void 0 : _a.isToken) ? currencyAmount.currency.address : undefined;
    const eip2612Contract = useEIP2612Contract(tokenAddress);
    const isArgentWallet = useIsArgentWallet();
    const nonceInputs = useMemo(() => [account !== null && account !== void 0 ? account : undefined], [account]);
    const tokenNonceState = useSingleCallResult(eip2612Contract, 'nonces', nonceInputs);
    const permitInfo = overridePermitInfo !== null && overridePermitInfo !== void 0 ? overridePermitInfo : (chainId && tokenAddress ? (_b = PERMITTABLE_TOKENS[chainId]) === null || _b === void 0 ? void 0 : _b[tokenAddress] : undefined);
    const [signatureData, setSignatureData] = useState(null);
    return useMemo(() => {
        var _a, _b;
        if (isArgentWallet ||
            !currencyAmount ||
            !eip2612Contract ||
            !account ||
            !chainId ||
            !transactionDeadline ||
            !library ||
            !tokenNonceState.valid ||
            !tokenAddress ||
            !spender ||
            !permitInfo) {
            return {
                state: UseERC20PermitState.NOT_APPLICABLE,
                signatureData: null,
                gatherPermitSignature: null,
            };
        }
        const nonceNumber = (_b = (_a = tokenNonceState.result) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.toNumber();
        if (tokenNonceState.loading || typeof nonceNumber !== 'number') {
            return {
                state: UseERC20PermitState.LOADING,
                signatureData: null,
                gatherPermitSignature: null,
            };
        }
        const isSignatureDataValid = signatureData &&
            signatureData.owner === account &&
            signatureData.deadline >= transactionDeadline.toNumber() &&
            signatureData.tokenAddress === tokenAddress &&
            signatureData.nonce === nonceNumber &&
            signatureData.spender === spender &&
            ('allowed' in signatureData || JSBI.equal(JSBI.BigInt(signatureData.amount), currencyAmount.quotient));
        return {
            state: isSignatureDataValid ? UseERC20PermitState.SIGNED : UseERC20PermitState.NOT_SIGNED,
            signatureData: isSignatureDataValid ? signatureData : null,
            gatherPermitSignature: function gatherPermitSignature() {
                return __awaiter(this, void 0, void 0, function* () {
                    const allowed = permitInfo.type === PermitType.ALLOWED;
                    const signatureDeadline = transactionDeadline.toNumber() + PERMIT_VALIDITY_BUFFER;
                    const value = currencyAmount.quotient.toString();
                    const message = allowed
                        ? {
                            holder: account,
                            spender,
                            allowed,
                            nonce: nonceNumber,
                            expiry: signatureDeadline,
                        }
                        : {
                            owner: account,
                            spender,
                            value,
                            nonce: nonceNumber,
                            deadline: signatureDeadline,
                        };
                    const domain = permitInfo.version
                        ? {
                            name: permitInfo.name,
                            version: permitInfo.version,
                            verifyingContract: tokenAddress,
                            chainId,
                        }
                        : {
                            name: permitInfo.name,
                            verifyingContract: tokenAddress,
                            chainId,
                        };
                    const data = JSON.stringify({
                        types: {
                            EIP712Domain: permitInfo.version ? EIP712_DOMAIN_TYPE : EIP712_DOMAIN_TYPE_NO_VERSION,
                            Permit: allowed ? PERMIT_ALLOWED_TYPE : EIP2612_TYPE,
                        },
                        domain,
                        primaryType: 'Permit',
                        message,
                    });
                    return library
                        .send('eth_signTypedData_v4', [account, data])
                        .then(splitSignature)
                        .then((signature) => {
                        setSignatureData(Object.assign(Object.assign({ v: signature.v, r: signature.r, s: signature.s, deadline: signatureDeadline }, (allowed ? { allowed } : { amount: value })), { nonce: nonceNumber, chainId, owner: account, spender,
                            tokenAddress, permitType: permitInfo.type }));
                    });
                });
            },
        };
    }, [
        currencyAmount,
        eip2612Contract,
        account,
        chainId,
        isArgentWallet,
        transactionDeadline,
        library,
        tokenNonceState.loading,
        tokenNonceState.valid,
        tokenNonceState.result,
        tokenAddress,
        spender,
        permitInfo,
        signatureData,
    ]);
}
({
    version: '1',
    name: 'Uniswap V2',
    type: PermitType.AMOUNT,
});
function useERC20PermitFromTrade(trade, allowedSlippage) {
    const { chainId } = useActiveWeb3React();
    const swapRouterAddress = chainId ? SWAP_ROUTER_ADDRESSES[chainId] : undefined;
    const amountToApprove = useMemo(() => (trade ? trade.maximumAmountIn(allowedSlippage) : undefined), [trade, allowedSlippage]);
    return useERC20Permit(amountToApprove, 
    // v2 router does not support
    trade instanceof Trade ? undefined : trade instanceof Trade$1 ? swapRouterAddress : undefined, null);
}

/**
 * Returns true if the input currency or output currency cannot be traded in the interface
 * @param currencyIn the input currency to check
 * @param currencyOut the output currency to check
 */
function useIsSwapUnsupported(currencyIn, currencyOut) {
    const unsupportedTokens = useUnsupportedTokens();
    return useMemo(() => {
        if (!unsupportedTokens) {
            return false;
        }
        const currencyInUnsupported = Boolean((currencyIn === null || currencyIn === void 0 ? void 0 : currencyIn.isToken) && unsupportedTokens[currencyIn.address]);
        const currencyOutUnsupported = Boolean((currencyOut === null || currencyOut === void 0 ? void 0 : currencyOut.isToken) && unsupportedTokens[currencyOut.address]);
        return currencyInUnsupported || currencyOutUnsupported;
    }, [currencyIn, currencyOut, unsupportedTokens]);
}

const ERC20_INTERFACE = new Interface([
    {
        constant: false,
        inputs: [
            { name: '_spender', type: 'address' },
            { name: '_value', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
]);
function approveAmountCalldata(amount, spender) {
    if (!amount.currency.isToken)
        throw new Error('Must call with an amount of token');
    const approveData = ERC20_INTERFACE.encodeFunctionData('approve', [spender, toHex(amount.quotient)]);
    return {
        to: amount.currency.address,
        data: approveData,
        value: '0x0',
    };
}

var ArgentWalletContractABI = [
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "to",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "value",
						type: "uint256"
					},
					{
						internalType: "bytes",
						name: "data",
						type: "bytes"
					}
				],
				name: "_transactions",
				type: "tuple[]"
			}
		],
		name: "wc_multiCall",
		outputs: [
			{
				internalType: "bytes[]",
				name: "",
				type: "bytes[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "_msgHash",
				type: "bytes32"
			},
			{
				internalType: "bytes",
				name: "_signature",
				type: "bytes"
			}
		],
		name: "isValidSignature",
		outputs: [
			{
				internalType: "bytes4",
				name: "",
				type: "bytes4"
			}
		],
		stateMutability: "view",
		type: "function"
	}
];

function useArgentWalletContract() {
    const { account } = useActiveWeb3React();
    const isArgentWallet = useIsArgentWallet();
    return useContract(isArgentWallet ? account !== null && account !== void 0 ? account : undefined : undefined, ArgentWalletContractABI, true);
}

var SwapCallbackState;
(function (SwapCallbackState) {
    SwapCallbackState[SwapCallbackState["INVALID"] = 0] = "INVALID";
    SwapCallbackState[SwapCallbackState["LOADING"] = 1] = "LOADING";
    SwapCallbackState[SwapCallbackState["VALID"] = 2] = "VALID";
})(SwapCallbackState || (SwapCallbackState = {}));
/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName the ENS name or address of the recipient of the swap output
 * @param signatureData the signature data of the permit of the input token amount, if available
 */
function useSwapCallArguments(trade, // trade to execute, required
allowedSlippage, // in bips
recipientAddressOrName, // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
signatureData) {
    const { account, chainId, library } = useActiveWeb3React();
    const { address: recipientAddress } = useENS(recipientAddressOrName);
    const recipient = recipientAddressOrName === null ? account : recipientAddress;
    const deadline = useTransactionDeadline();
    const routerContract = useV2RouterContract();
    const argentWalletContract = useArgentWalletContract();
    return useMemo(() => {
        if (!trade || !recipient || !library || !account || !chainId || !deadline)
            return [];
        if (trade instanceof Trade) {
            if (!routerContract)
                return [];
            const swapMethods = [];
            swapMethods.push(Router.swapCallParameters(trade, {
                feeOnTransfer: false,
                allowedSlippage,
                recipient,
                deadline: deadline.toNumber(),
            }));
            if (trade.tradeType === TradeType.EXACT_INPUT) {
                swapMethods.push(Router.swapCallParameters(trade, {
                    feeOnTransfer: true,
                    allowedSlippage,
                    recipient,
                    deadline: deadline.toNumber(),
                }));
            }
            return swapMethods.map(({ methodName, args, value }) => {
                if (argentWalletContract && trade.inputAmount.currency.isToken) {
                    return {
                        address: argentWalletContract.address,
                        calldata: argentWalletContract.interface.encodeFunctionData('wc_multiCall', [
                            [
                                approveAmountCalldata(trade.maximumAmountIn(allowedSlippage), routerContract.address),
                                {
                                    to: routerContract.address,
                                    value,
                                    data: routerContract.interface.encodeFunctionData(methodName, args),
                                },
                            ],
                        ]),
                        value: '0x0',
                    };
                }
                else {
                    return {
                        address: routerContract.address,
                        calldata: routerContract.interface.encodeFunctionData(methodName, args),
                        value,
                    };
                }
            });
        }
        else {
            // trade is V3Trade
            const swapRouterAddress = chainId ? SWAP_ROUTER_ADDRESSES[chainId] : undefined;
            if (!swapRouterAddress)
                return [];
            const { value, calldata } = SwapRouter.swapCallParameters(trade, Object.assign({ recipient, slippageTolerance: allowedSlippage, deadline: deadline.toString() }, (signatureData
                ? {
                    inputTokenPermit: 'allowed' in signatureData
                        ? {
                            expiry: signatureData.deadline,
                            nonce: signatureData.nonce,
                            s: signatureData.s,
                            r: signatureData.r,
                            v: signatureData.v,
                        }
                        : {
                            deadline: signatureData.deadline,
                            amount: signatureData.amount,
                            s: signatureData.s,
                            r: signatureData.r,
                            v: signatureData.v,
                        },
                }
                : {})));
            if (argentWalletContract && trade.inputAmount.currency.isToken) {
                return [
                    {
                        address: argentWalletContract.address,
                        calldata: argentWalletContract.interface.encodeFunctionData('wc_multiCall', [
                            [
                                approveAmountCalldata(trade.maximumAmountIn(allowedSlippage), swapRouterAddress),
                                {
                                    to: swapRouterAddress,
                                    value,
                                    data: calldata,
                                },
                            ],
                        ]),
                        value: '0x0',
                    },
                ];
            }
            return [
                {
                    address: swapRouterAddress,
                    calldata,
                    value,
                },
            ];
        }
    }, [
        account,
        allowedSlippage,
        argentWalletContract,
        chainId,
        deadline,
        library,
        recipient,
        routerContract,
        signatureData,
        trade,
    ]);
}
/**
 * This is hacking out the revert reason from the ethers provider thrown error however it can.
 * This object seems to be undocumented by ethers.
 * @param error an error from the ethers provider
 */
function swapErrorToUserReadableMessage(error) {
    var _a, _b, _c, _d;
    let reason;
    while (Boolean(error)) {
        reason = (_b = (_a = error.reason) !== null && _a !== void 0 ? _a : error.message) !== null && _b !== void 0 ? _b : reason;
        error = (_c = error.error) !== null && _c !== void 0 ? _c : (_d = error.data) === null || _d === void 0 ? void 0 : _d.originalError;
    }
    if ((reason === null || reason === void 0 ? void 0 : reason.indexOf('execution reverted: ')) === 0)
        reason = reason.substr('execution reverted: '.length);
    switch (reason) {
        case 'UniswapV2Router: EXPIRED':
            return (jsx(Trans, { children: "The transaction could not be sent because the deadline has passed. Please check that your transaction deadline is not too low." }, void 0));
        case 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT':
        case 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT':
            return (jsx(Trans, { children: "This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance." }, void 0));
        case 'TransferHelper: TRANSFER_FROM_FAILED':
            return jsx(Trans, { children: "The input token cannot be transferred. There may be an issue with the input token." }, void 0);
        case 'UniswapV2: TRANSFER_FAILED':
            return jsx(Trans, { children: "The output token cannot be transferred. There may be an issue with the output token." }, void 0);
        case 'UniswapV2: K':
            return (jsx(Trans, { children: "The Uniswap invariant x*y=k was not satisfied by the swap. This usually means one of the tokens you are swapping incorporates custom behavior on transfer." }, void 0));
        case 'Too little received':
        case 'Too much requested':
        case 'STF':
            return (jsx(Trans, { children: "This transaction will not succeed due to price movement. Try increasing your slippage tolerance. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3." }, void 0));
        case 'TF':
            return (jsx(Trans, { children: "The output token cannot be transferred. There may be an issue with the output token. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3." }, void 0));
        default:
            if ((reason === null || reason === void 0 ? void 0 : reason.indexOf('undefined is not an object')) !== -1) {
                console.error(error, reason);
                return (jsx(Trans, { children: "An error occurred when trying to execute this swap. You may need to increase your slippage tolerance. If that does not work, there may be an incompatibility with the token you are trading. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3." }, void 0));
            }
            return (jsxs(Trans, { children: ["Unknown error", reason ? `: "${reason}"` : '', ". Try increasing your slippage tolerance. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3."] }, void 0));
    }
}
// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
function useSwapCallback(trade, // trade to execute, required
allowedSlippage, // in bips
recipientAddressOrName, // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
signatureData) {
    const { account, chainId, library } = useActiveWeb3React();
    const swapCalls = useSwapCallArguments(trade, allowedSlippage, recipientAddressOrName, signatureData);
    const addTransaction = useTransactionAdder();
    const { address: recipientAddress } = useENS(recipientAddressOrName);
    const recipient = recipientAddressOrName === null ? account : recipientAddress;
    return useMemo(() => {
        if (!trade || !library || !account || !chainId) {
            return { state: SwapCallbackState.INVALID, callback: null, error: jsx(Trans, { children: "Missing dependencies" }, void 0) };
        }
        if (!recipient) {
            if (recipientAddressOrName !== null) {
                return { state: SwapCallbackState.INVALID, callback: null, error: jsx(Trans, { children: "Invalid recipient" }, void 0) };
            }
            else {
                return { state: SwapCallbackState.LOADING, callback: null, error: null };
            }
        }
        return {
            state: SwapCallbackState.VALID,
            callback: function onSwap() {
                return __awaiter(this, void 0, void 0, function* () {
                    const estimatedCalls = yield Promise.all(swapCalls.map((call) => {
                        const { address, calldata, value } = call;
                        const tx = !value || isZero(value)
                            ? { from: account, to: address, data: calldata }
                            : {
                                from: account,
                                to: address,
                                data: calldata,
                                value,
                            };
                        return library
                            .estimateGas(tx)
                            .then((gasEstimate) => {
                            return {
                                call,
                                gasEstimate,
                            };
                        })
                            .catch((gasError) => {
                            console.debug('Gas estimate failed, trying eth_call to extract error', call);
                            return library
                                .call(tx)
                                .then((result) => {
                                console.debug('Unexpected successful call after failed estimate gas', call, gasError, result);
                                return { call, error: jsx(Trans, { children: "Unexpected issue with estimating the gas. Please try again." }, void 0) };
                            })
                                .catch((callError) => {
                                console.debug('Call threw error', call, callError);
                                return { call, error: swapErrorToUserReadableMessage(callError) };
                            });
                        });
                    }));
                    // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
                    let bestCallOption = estimatedCalls.find((el, ix, list) => 'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]));
                    // check if any calls errored with a recognizable error
                    if (!bestCallOption) {
                        const errorCalls = estimatedCalls.filter((call) => 'error' in call);
                        if (errorCalls.length > 0)
                            throw errorCalls[errorCalls.length - 1].error;
                        const firstNoErrorCall = estimatedCalls.find((call) => !('error' in call));
                        if (!firstNoErrorCall)
                            throw new Error(t `Unexpected error. Could not estimate gas for the swap.`);
                        bestCallOption = firstNoErrorCall;
                    }
                    const { call: { address, calldata, value }, } = bestCallOption;
                    return library
                        .getSigner()
                        .sendTransaction(Object.assign(Object.assign({ from: account, to: address, data: calldata }, ('gasEstimate' in bestCallOption ? { gasLimit: calculateGasMargin(bestCallOption.gasEstimate) } : {})), (value && !isZero(value) ? { value } : {})))
                        .then((response) => {
                        addTransaction(response, trade.tradeType === TradeType.EXACT_INPUT
                            ? {
                                type: TransactionType.SWAP,
                                tradeType: TradeType.EXACT_INPUT,
                                inputCurrencyId: currencyId(trade.inputAmount.currency),
                                inputCurrencyAmountRaw: trade.inputAmount.quotient.toString(),
                                expectedOutputCurrencyAmountRaw: trade.outputAmount.quotient.toString(),
                                outputCurrencyId: currencyId(trade.outputAmount.currency),
                                minimumOutputCurrencyAmountRaw: trade.minimumAmountOut(allowedSlippage).quotient.toString(),
                            }
                            : {
                                type: TransactionType.SWAP,
                                tradeType: TradeType.EXACT_OUTPUT,
                                inputCurrencyId: currencyId(trade.inputAmount.currency),
                                maximumInputCurrencyAmountRaw: trade.maximumAmountIn(allowedSlippage).quotient.toString(),
                                outputCurrencyId: currencyId(trade.outputAmount.currency),
                                outputCurrencyAmountRaw: trade.outputAmount.quotient.toString(),
                                expectedInputCurrencyAmountRaw: trade.inputAmount.quotient.toString(),
                            });
                        return response.hash;
                    })
                        .catch((error) => {
                        // if the user rejected the tx, pass this along
                        if ((error === null || error === void 0 ? void 0 : error.code) === 4001) {
                            throw new Error(t `Transaction rejected.`);
                        }
                        else {
                            // otherwise, the error was unexpected and we need to convey that
                            console.error(`Swap failed`, error, address, calldata, value);
                            throw new Error(t `Swap failed: ${swapErrorToUserReadableMessage(error)}`);
                        }
                    });
                });
            },
            error: null,
        };
    }, [trade, library, account, chainId, recipient, recipientAddressOrName, swapCalls, addTransaction, allowedSlippage]);
}

var WrapType;
(function (WrapType) {
    WrapType[WrapType["NOT_APPLICABLE"] = 0] = "NOT_APPLICABLE";
    WrapType[WrapType["WRAP"] = 1] = "WRAP";
    WrapType[WrapType["UNWRAP"] = 2] = "UNWRAP";
})(WrapType || (WrapType = {}));
const NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE };
/**
 * Given the selected input and output currency, return a wrap callback
 * @param inputCurrency the selected input currency
 * @param outputCurrency the selected output currency
 * @param typedValue the user input value
 */
function useWrapCallback(inputCurrency, outputCurrency, typedValue) {
    const { chainId, account } = useActiveWeb3React();
    const wethContract = useWETHContract();
    const balance = useCurrencyBalance(account !== null && account !== void 0 ? account : undefined, inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined);
    // we can always parse the amount typed as the input currency, since wrapping is 1:1
    const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined), [inputCurrency, typedValue]);
    const addTransaction = useTransactionAdder();
    return useMemo(() => {
        if (!wethContract || !chainId || !inputCurrency || !outputCurrency)
            return NOT_APPLICABLE;
        const weth = WETH9_EXTENDED[chainId];
        if (!weth)
            return NOT_APPLICABLE;
        const hasInputAmount = Boolean(inputAmount === null || inputAmount === void 0 ? void 0 : inputAmount.greaterThan('0'));
        const sufficientBalance = inputAmount && balance && !balance.lessThan(inputAmount);
        if (inputCurrency.isNative && weth.equals(outputCurrency)) {
            return {
                wrapType: WrapType.WRAP,
                execute: sufficientBalance && inputAmount
                    ? () => __awaiter(this, void 0, void 0, function* () {
                        try {
                            const txReceipt = yield wethContract.deposit({ value: `0x${inputAmount.quotient.toString(16)}` });
                            addTransaction(txReceipt, {
                                type: TransactionType.WRAP,
                                unwrapped: false,
                                currencyAmountRaw: inputAmount === null || inputAmount === void 0 ? void 0 : inputAmount.quotient.toString(),
                            });
                        }
                        catch (error) {
                            console.error('Could not deposit', error);
                        }
                    })
                    : undefined,
                inputError: sufficientBalance ? undefined : hasInputAmount ? 'Insufficient ETH balance' : 'Enter ETH amount',
            };
        }
        else if (weth.equals(inputCurrency) && outputCurrency.isNative) {
            return {
                wrapType: WrapType.UNWRAP,
                execute: sufficientBalance && inputAmount
                    ? () => __awaiter(this, void 0, void 0, function* () {
                        try {
                            const txReceipt = yield wethContract.withdraw(`0x${inputAmount.quotient.toString(16)}`);
                            addTransaction(txReceipt, {
                                type: TransactionType.WRAP,
                                unwrapped: true,
                                currencyAmountRaw: inputAmount === null || inputAmount === void 0 ? void 0 : inputAmount.quotient.toString(),
                            });
                        }
                        catch (error) {
                            console.error('Could not withdraw', error);
                        }
                    })
                    : undefined,
                inputError: sufficientBalance ? undefined : hasInputAmount ? 'Insufficient WETH balance' : 'Enter WETH amount',
            };
        }
        else {
            return NOT_APPLICABLE;
        }
    }, [wethContract, chainId, inputCurrency, outputCurrency, inputAmount, balance, addTransaction]);
}

const MIN_NATIVE_CURRENCY_FOR_GAS = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)); // .01 ETH
/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
function maxAmountSpend(currencyAmount) {
    if (!currencyAmount)
        return undefined;
    if (currencyAmount.currency.isNative) {
        if (JSBI.greaterThan(currencyAmount.quotient, MIN_NATIVE_CURRENCY_FOR_GAS)) {
            return CurrencyAmount.fromRawAmount(currencyAmount.currency, JSBI.subtract(currencyAmount.quotient, MIN_NATIVE_CURRENCY_FOR_GAS));
        }
        else {
            return CurrencyAmount.fromRawAmount(currencyAmount.currency, JSBI.BigInt(0));
        }
    }
    return currencyAmount;
}

const BodyWrapper$1 = styled.main `
  position: relative;
  margin-top: ${({ margin }) => margin !== null && margin !== void 0 ? margin : '0px'};
  max-width: ${({ maxWidth }) => maxWidth !== null && maxWidth !== void 0 ? maxWidth : '480px'};
  width: 100%;
  background: ${({ theme }) => theme.bg0};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 24px;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  z-index: ${Z_INDEX.deprecated_content};
`;
/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
function AppBody(_a) {
    var { children } = _a, rest = __rest(_a, ["children"]);
    return jsx(BodyWrapper$1, Object.assign({}, rest, { children: children }), void 0);
}

const StyledInfo = styled(Info) `
  height: 16px;
  width: 16px;
  margin-left: 4px;
  color: ${({ theme }) => theme.text3};
  :hover {
    color: ${({ theme }) => theme.text1};
  }
`;
function Swap({ history }) {
    var _a, _b, _c, _d, _e;
    const { account } = useActiveWeb3React();
    const loadedUrlParams = useDefaultsFromURLSearch();
    // token warning stuff
    const [loadedInputCurrency, loadedOutputCurrency] = [
        useCurrency(loadedUrlParams === null || loadedUrlParams === void 0 ? void 0 : loadedUrlParams.inputCurrencyId),
        useCurrency(loadedUrlParams === null || loadedUrlParams === void 0 ? void 0 : loadedUrlParams.outputCurrencyId),
    ];
    const [dismissTokenWarning, setDismissTokenWarning] = useState(false);
    const urlLoadedTokens = useMemo(() => { var _a, _b; return (_b = (_a = [loadedInputCurrency, loadedOutputCurrency]) === null || _a === void 0 ? void 0 : _a.filter((c) => { var _a; return (_a = c === null || c === void 0 ? void 0 : c.isToken) !== null && _a !== void 0 ? _a : false; })) !== null && _b !== void 0 ? _b : []; }, [loadedInputCurrency, loadedOutputCurrency]);
    const handleConfirmTokenWarning = useCallback(() => {
        setDismissTokenWarning(true);
    }, []);
    // dismiss warning if all imported tokens are in active lists
    const defaultTokens = useAllTokens();
    const importTokensNotInDefault = useMemo(() => urlLoadedTokens &&
        urlLoadedTokens.filter((token) => {
            return !Boolean(token.address in defaultTokens);
        }), [defaultTokens, urlLoadedTokens]);
    const theme = useContext(ThemeContext);
    // toggle wallet when disconnected
    const toggleWalletModal = useWalletModalToggle();
    // for expert mode
    const [isExpertMode] = useExpertModeManager();
    // get version from the url
    const toggledVersion = useToggledVersion();
    // swap state
    const { independentField, typedValue, recipient } = useSwapState();
    const { v3Trade: { state: v3TradeState }, bestTrade: trade, allowedSlippage, currencyBalances, parsedAmount, currencies, inputError: swapInputError, } = useDerivedSwapInfo(toggledVersion);
    const { wrapType, execute: onWrap, inputError: wrapInputError, } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue);
    const showWrap = wrapType !== WrapType.NOT_APPLICABLE;
    const { address: recipientAddress } = useENSAddress(recipient);
    const parsedAmounts = useMemo(() => showWrap
        ? {
            [Field.INPUT]: parsedAmount,
            [Field.OUTPUT]: parsedAmount,
        }
        : {
            [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade === null || trade === void 0 ? void 0 : trade.inputAmount,
            [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade === null || trade === void 0 ? void 0 : trade.outputAmount,
        }, [independentField, parsedAmount, showWrap, trade]);
    const [routeNotFound, routeIsLoading, routeIsSyncing] = useMemo(() => [
        trade instanceof Trade$1 ? !(trade === null || trade === void 0 ? void 0 : trade.swaps) : !(trade === null || trade === void 0 ? void 0 : trade.route),
        V3TradeState.LOADING === v3TradeState,
        V3TradeState.SYNCING === v3TradeState,
    ], [trade, v3TradeState]);
    const fiatValueInput = useUSDCValue(parsedAmounts[Field.INPUT]);
    const fiatValueOutput = useUSDCValue(parsedAmounts[Field.OUTPUT]);
    const priceImpact = routeIsSyncing ? undefined : computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput);
    const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers();
    const isValid = !swapInputError;
    const dependentField = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT;
    const handleTypeInput = useCallback((value) => {
        onUserInput(Field.INPUT, value);
    }, [onUserInput]);
    const handleTypeOutput = useCallback((value) => {
        onUserInput(Field.OUTPUT, value);
    }, [onUserInput]);
    // reset if they close warning without tokens in params
    const handleDismissTokenWarning = useCallback(() => {
        setDismissTokenWarning(true);
        history.push('/swap/');
    }, [history]);
    // modal and loading
    const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState({
        showConfirm: false,
        tradeToConfirm: undefined,
        attemptingTxn: false,
        swapErrorMessage: undefined,
        txHash: undefined,
    });
    const formattedAmounts = useMemo(() => {
        var _a, _b, _c, _d;
        return ({
            [independentField]: typedValue,
            [dependentField]: showWrap
                ? (_b = (_a = parsedAmounts[independentField]) === null || _a === void 0 ? void 0 : _a.toExact()) !== null && _b !== void 0 ? _b : ''
                : (_d = (_c = parsedAmounts[dependentField]) === null || _c === void 0 ? void 0 : _c.toSignificant(6)) !== null && _d !== void 0 ? _d : '',
        });
    }, [dependentField, independentField, parsedAmounts, showWrap, typedValue]);
    const userHasSpecifiedInputOutput = Boolean(currencies[Field.INPUT] && currencies[Field.OUTPUT] && ((_a = parsedAmounts[independentField]) === null || _a === void 0 ? void 0 : _a.greaterThan(JSBI.BigInt(0))));
    // check whether the user has approved the router on the input token
    const [approvalState, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage);
    const { state: signatureState, signatureData, gatherPermitSignature, } = useERC20PermitFromTrade(trade, allowedSlippage);
    const handleApprove = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        if (signatureState === UseERC20PermitState.NOT_SIGNED && gatherPermitSignature) {
            try {
                yield gatherPermitSignature();
            }
            catch (error) {
                // try to approve if gatherPermitSignature failed for any reason other than the user rejecting it
                if ((error === null || error === void 0 ? void 0 : error.code) !== 4001) {
                    yield approveCallback();
                }
            }
        }
        else {
            yield approveCallback();
            ReactGA.event({
                category: 'Swap',
                action: 'Approve',
                label: [trade === null || trade === void 0 ? void 0 : trade.inputAmount.currency.symbol, toggledVersion].join('/'),
            });
        }
    }), [approveCallback, gatherPermitSignature, signatureState, toggledVersion, trade === null || trade === void 0 ? void 0 : trade.inputAmount.currency.symbol]);
    // check if user has gone through approval process, used to show two step buttons, reset on token change
    const [approvalSubmitted, setApprovalSubmitted] = useState(false);
    // mark when a user has submitted an approval, reset onTokenSelection for input field
    useEffect(() => {
        if (approvalState === ApprovalState.PENDING) {
            setApprovalSubmitted(true);
        }
    }, [approvalState, approvalSubmitted]);
    const maxInputAmount = useMemo(() => maxAmountSpend(currencyBalances[Field.INPUT]), [currencyBalances]);
    const showMaxButton = Boolean((maxInputAmount === null || maxInputAmount === void 0 ? void 0 : maxInputAmount.greaterThan(0)) && !((_b = parsedAmounts[Field.INPUT]) === null || _b === void 0 ? void 0 : _b.equalTo(maxInputAmount)));
    // the callback to execute the swap
    const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(trade, allowedSlippage, recipient, signatureData);
    const handleSwap = useCallback(() => {
        if (!swapCallback) {
            return;
        }
        if (priceImpact && !confirmPriceImpactWithoutFee(priceImpact)) {
            return;
        }
        setSwapState({ attemptingTxn: true, tradeToConfirm, showConfirm, swapErrorMessage: undefined, txHash: undefined });
        swapCallback()
            .then((hash) => {
            var _a, _b, _c, _d;
            setSwapState({ attemptingTxn: false, tradeToConfirm, showConfirm, swapErrorMessage: undefined, txHash: hash });
            ReactGA.event({
                category: 'Swap',
                action: recipient === null
                    ? 'Swap w/o Send'
                    : (recipientAddress !== null && recipientAddress !== void 0 ? recipientAddress : recipient) === account
                        ? 'Swap w/o Send + recipient'
                        : 'Swap w/ Send',
                label: [
                    (_b = (_a = trade === null || trade === void 0 ? void 0 : trade.inputAmount) === null || _a === void 0 ? void 0 : _a.currency) === null || _b === void 0 ? void 0 : _b.symbol,
                    (_d = (_c = trade === null || trade === void 0 ? void 0 : trade.outputAmount) === null || _c === void 0 ? void 0 : _c.currency) === null || _d === void 0 ? void 0 : _d.symbol,
                    getTradeVersion(trade),
                    'MH',
                ].join('/'),
            });
        })
            .catch((error) => {
            setSwapState({
                attemptingTxn: false,
                tradeToConfirm,
                showConfirm,
                swapErrorMessage: error.message,
                txHash: undefined,
            });
        });
    }, [swapCallback, priceImpact, tradeToConfirm, showConfirm, recipient, recipientAddress, account, trade]);
    // errors
    const [showInverted, setShowInverted] = useState(false);
    // warnings on the greater of fiat value price impact and execution price impact
    const priceImpactSeverity = useMemo(() => {
        const executionPriceImpact = trade === null || trade === void 0 ? void 0 : trade.priceImpact;
        return warningSeverity(executionPriceImpact && priceImpact
            ? executionPriceImpact.greaterThan(priceImpact)
                ? executionPriceImpact
                : priceImpact
            : executionPriceImpact !== null && executionPriceImpact !== void 0 ? executionPriceImpact : priceImpact);
    }, [priceImpact, trade]);
    const isArgentWallet = useIsArgentWallet();
    // show approve flow when: no error on inputs, not approved or pending, or approved in current session
    // never show if price impact is above threshold in non expert mode
    const showApproveFlow = !isArgentWallet &&
        !swapInputError &&
        (approvalState === ApprovalState.NOT_APPROVED ||
            approvalState === ApprovalState.PENDING ||
            (approvalSubmitted && approvalState === ApprovalState.APPROVED)) &&
        !(priceImpactSeverity > 3 && !isExpertMode);
    const handleConfirmDismiss = useCallback(() => {
        setSwapState({ showConfirm: false, tradeToConfirm, attemptingTxn, swapErrorMessage, txHash });
        // if there was a tx hash, we want to clear the input
        if (txHash) {
            onUserInput(Field.INPUT, '');
        }
    }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash]);
    const handleAcceptChanges = useCallback(() => {
        setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn, showConfirm });
    }, [attemptingTxn, showConfirm, swapErrorMessage, trade, txHash]);
    const handleInputSelect = useCallback((inputCurrency) => {
        setApprovalSubmitted(false); // reset 2 step UI for approvals
        onCurrencySelection(Field.INPUT, inputCurrency);
    }, [onCurrencySelection]);
    const handleMaxInput = useCallback(() => {
        maxInputAmount && onUserInput(Field.INPUT, maxInputAmount.toExact());
        ReactGA.event({
            category: 'Swap',
            action: 'Max',
        });
    }, [maxInputAmount, onUserInput]);
    const handleOutputSelect = useCallback((outputCurrency) => onCurrencySelection(Field.OUTPUT, outputCurrency), [onCurrencySelection]);
    const swapIsUnsupported = useIsSwapUnsupported(currencies[Field.INPUT], currencies[Field.OUTPUT]);
    const priceImpactTooHigh = priceImpactSeverity > 3 && !isExpertMode;
    return (jsxs(Fragment, { children: [jsx(TokenWarningModal, { isOpen: importTokensNotInDefault.length > 0 && !dismissTokenWarning, tokens: importTokensNotInDefault, onConfirm: handleConfirmTokenWarning, onDismiss: handleDismissTokenWarning }, void 0), jsx(NetworkAlert, {}, void 0), jsxs(AppBody, { children: [jsx(SwapHeader, { allowedSlippage: allowedSlippage }, void 0), jsxs(Wrapper$d, Object.assign({ id: "swap-page" }, { children: [jsx(ConfirmSwapModal, { isOpen: showConfirm, trade: trade, originalTrade: tradeToConfirm, onAcceptChanges: handleAcceptChanges, attemptingTxn: attemptingTxn, txHash: txHash, recipient: recipient, allowedSlippage: allowedSlippage, onConfirm: handleSwap, swapErrorMessage: swapErrorMessage, onDismiss: handleConfirmDismiss }, void 0), jsxs(AutoColumn, Object.assign({ gap: 'sm' }, { children: [jsxs("div", Object.assign({ style: { display: 'relative' } }, { children: [jsx(CurrencyInputPanel, { label: independentField === Field.OUTPUT && !showWrap ? jsx(Trans, { children: "From (at most)" }, void 0) : jsx(Trans, { children: "From" }, void 0), value: formattedAmounts[Field.INPUT], showMaxButton: showMaxButton, currency: currencies[Field.INPUT], onUserInput: handleTypeInput, onMax: handleMaxInput, fiatValue: fiatValueInput !== null && fiatValueInput !== void 0 ? fiatValueInput : undefined, onCurrencySelect: handleInputSelect, otherCurrency: currencies[Field.OUTPUT], showCommonBases: true, id: "swap-currency-input", loading: independentField === Field.OUTPUT && routeIsSyncing }, void 0), jsx(ArrowWrapper$1, Object.assign({ clickable: true }, { children: jsx(ArrowDown, { size: "16", onClick: () => {
                                                        setApprovalSubmitted(false); // reset 2 step UI for approvals
                                                        onSwitchTokens();
                                                    }, color: currencies[Field.INPUT] && currencies[Field.OUTPUT] ? theme.text1 : theme.text3 }, void 0) }), void 0), jsx(CurrencyInputPanel, { value: formattedAmounts[Field.OUTPUT], onUserInput: handleTypeOutput, label: independentField === Field.INPUT && !showWrap ? jsx(Trans, { children: "To (at least)" }, void 0) : jsx(Trans, { children: "To" }, void 0), showMaxButton: false, hideBalance: false, fiatValue: fiatValueOutput !== null && fiatValueOutput !== void 0 ? fiatValueOutput : undefined, priceImpact: priceImpact, currency: currencies[Field.OUTPUT], onCurrencySelect: handleOutputSelect, otherCurrency: currencies[Field.INPUT], showCommonBases: true, id: "swap-currency-output", loading: independentField === Field.INPUT && routeIsSyncing }, void 0)] }), void 0), recipient !== null && !showWrap ? (jsxs(Fragment, { children: [jsxs(AutoRow, Object.assign({ justify: "space-between", style: { padding: '0 1rem' } }, { children: [jsx(ArrowWrapper$1, Object.assign({ clickable: false }, { children: jsx(ArrowDown, { size: "16", color: theme.text2 }, void 0) }), void 0), jsx(LinkStyledButton, Object.assign({ id: "remove-recipient-button", onClick: () => onChangeRecipient(null) }, { children: jsx(Trans, { children: "- Remove recipient" }, void 0) }), void 0)] }), void 0), jsx(AddressInputPanel, { id: "recipient", value: recipient, onChange: onChangeRecipient }, void 0)] }, void 0)) : null, !showWrap && trade && (jsxs(Row, Object.assign({ justify: !trade ? 'center' : 'space-between' }, { children: [jsx(RowFixed, Object.assign({ style: { position: 'relative' } }, { children: jsx(MouseoverTooltipContent, Object.assign({ wrap: false, content: jsx(ResponsiveTooltipContainer, { children: jsx(SwapRoute, { trade: trade, syncing: routeIsSyncing }, void 0) }, void 0), placement: "bottom", onOpen: () => ReactGA.event({
                                                        category: 'Swap',
                                                        action: 'Router Tooltip Open',
                                                    }) }, { children: jsxs(AutoRow, Object.assign({ gap: "4px", width: "auto" }, { children: [jsx(AutoRouterLogo, {}, void 0), jsx(LoadingOpacityContainer, Object.assign({ "$loading": routeIsSyncing }, { children: trade instanceof Trade$1 && trade.swaps.length > 1 && (jsxs(ThemedText.Blue, Object.assign({ fontSize: 14 }, { children: [trade.swaps.length, " routes"] }), void 0)) }), void 0)] }), void 0) }), void 0) }), void 0), jsxs(RowFixed, { children: [jsx(LoadingOpacityContainer, Object.assign({ "$loading": routeIsSyncing }, { children: jsx(TradePrice, { price: trade.executionPrice, showInverted: showInverted, setShowInverted: setShowInverted }, void 0) }), void 0), jsx(MouseoverTooltipContent, Object.assign({ wrap: false, content: jsx(ResponsiveTooltipContainer, Object.assign({ origin: "top right", width: '295px' }, { children: jsx(AdvancedSwapDetails, { trade: trade, allowedSlippage: allowedSlippage, syncing: routeIsSyncing }, void 0) }), void 0), placement: "bottom", onOpen: () => ReactGA.event({
                                                            category: 'Swap',
                                                            action: 'Transaction Details Tooltip Open',
                                                        }) }, { children: jsx(StyledInfo, {}, void 0) }), void 0)] }, void 0)] }), void 0)), jsxs("div", { children: [swapIsUnsupported ? (jsx(ButtonPrimary, Object.assign({ disabled: true }, { children: jsx(ThemedText.Main, Object.assign({ mb: "4px" }, { children: jsx(Trans, { children: "Unsupported Asset" }, void 0) }), void 0) }), void 0)) : !account ? (jsx(ButtonLight, Object.assign({ onClick: toggleWalletModal }, { children: jsx(Trans, { children: "Connect Wallet" }, void 0) }), void 0)) : showWrap ? (jsx(ButtonPrimary, Object.assign({ disabled: Boolean(wrapInputError), onClick: onWrap }, { children: wrapInputError !== null && wrapInputError !== void 0 ? wrapInputError : (wrapType === WrapType.WRAP ? (jsx(Trans, { children: "Wrap" }, void 0)) : wrapType === WrapType.UNWRAP ? (jsx(Trans, { children: "Unwrap" }, void 0)) : null) }), void 0)) : routeIsSyncing || routeIsLoading ? (jsx(GreyCard, Object.assign({ style: { textAlign: 'center' } }, { children: jsx(ThemedText.Main, Object.assign({ mb: "4px" }, { children: jsx(Dots, { children: jsx(Trans, { children: "Loading" }, void 0) }, void 0) }), void 0) }), void 0)) : routeNotFound && userHasSpecifiedInputOutput ? (jsx(GreyCard, Object.assign({ style: { textAlign: 'center' } }, { children: jsx(ThemedText.Main, Object.assign({ mb: "4px" }, { children: jsx(Trans, { children: "Insufficient liquidity for this trade." }, void 0) }), void 0) }), void 0)) : showApproveFlow ? (jsx(AutoRow, Object.assign({ style: { flexWrap: 'nowrap', width: '100%' } }, { children: jsxs(AutoColumn, Object.assign({ style: { width: '100%' }, gap: "12px" }, { children: [jsx(ButtonConfirmed, Object.assign({ onClick: handleApprove, disabled: approvalState !== ApprovalState.NOT_APPROVED ||
                                                                approvalSubmitted ||
                                                                signatureState === UseERC20PermitState.SIGNED, width: "100%", altDisabledStyle: approvalState === ApprovalState.PENDING, confirmed: approvalState === ApprovalState.APPROVED || signatureState === UseERC20PermitState.SIGNED }, { children: jsxs(AutoRow, Object.assign({ justify: "space-between", style: { flexWrap: 'nowrap' } }, { children: [jsxs("span", Object.assign({ style: { display: 'flex', alignItems: 'center' } }, { children: [jsx(CurrencyLogo, { currency: currencies[Field.INPUT], size: '20px', style: { marginRight: '8px', flexShrink: 0 } }, void 0), approvalState === ApprovalState.APPROVED || signatureState === UseERC20PermitState.SIGNED ? (jsxs(Trans, { children: ["You can now trade ", (_c = currencies[Field.INPUT]) === null || _c === void 0 ? void 0 : _c.symbol] }, void 0)) : (jsxs(Trans, { children: ["Allow the Uniswap Protocol to use your ", (_d = currencies[Field.INPUT]) === null || _d === void 0 ? void 0 : _d.symbol] }, void 0))] }), void 0), approvalState === ApprovalState.PENDING ? (jsx(Loader, { stroke: "white" }, void 0)) : (approvalSubmitted && approvalState === ApprovalState.APPROVED) ||
                                                                        signatureState === UseERC20PermitState.SIGNED ? (jsx(CheckCircle, { size: "20", color: theme.green1 }, void 0)) : (jsx(MouseoverTooltip, Object.assign({ text: jsxs(Trans, { children: ["You must give the Uniswap smart contracts permission to use your", ' ', (_e = currencies[Field.INPUT]) === null || _e === void 0 ? void 0 : _e.symbol, ". You only have to do this once per token."] }, void 0) }, { children: jsx(HelpCircle, { size: "20", color: 'white', style: { marginLeft: '8px' } }, void 0) }), void 0))] }), void 0) }), void 0), jsx(ButtonError, Object.assign({ onClick: () => {
                                                                if (isExpertMode) {
                                                                    handleSwap();
                                                                }
                                                                else {
                                                                    setSwapState({
                                                                        tradeToConfirm: trade,
                                                                        attemptingTxn: false,
                                                                        swapErrorMessage: undefined,
                                                                        showConfirm: true,
                                                                        txHash: undefined,
                                                                    });
                                                                }
                                                            }, width: "100%", id: "swap-button", disabled: !isValid ||
                                                                (approvalState !== ApprovalState.APPROVED && signatureState !== UseERC20PermitState.SIGNED) ||
                                                                priceImpactTooHigh, error: isValid && priceImpactSeverity > 2 }, { children: jsx(Text$1, Object.assign({ fontSize: 16, fontWeight: 500 }, { children: priceImpactTooHigh ? (jsx(Trans, { children: "High Price Impact" }, void 0)) : priceImpactSeverity > 2 ? (jsx(Trans, { children: "Swap Anyway" }, void 0)) : (jsx(Trans, { children: "Swap" }, void 0)) }), void 0) }), void 0)] }), void 0) }), void 0)) : (jsx(ButtonError, Object.assign({ onClick: () => {
                                                    if (isExpertMode) {
                                                        handleSwap();
                                                    }
                                                    else {
                                                        setSwapState({
                                                            tradeToConfirm: trade,
                                                            attemptingTxn: false,
                                                            swapErrorMessage: undefined,
                                                            showConfirm: true,
                                                            txHash: undefined,
                                                        });
                                                    }
                                                }, id: "swap-button", disabled: !isValid || priceImpactTooHigh || !!swapCallbackError, error: isValid && priceImpactSeverity > 2 && !swapCallbackError }, { children: jsx(Text$1, Object.assign({ fontSize: 20, fontWeight: 500 }, { children: swapInputError ? (swapInputError) : priceImpactTooHigh ? (jsx(Trans, { children: "Price Impact Too High" }, void 0)) : priceImpactSeverity > 2 ? (jsx(Trans, { children: "Swap Anyway" }, void 0)) : (jsx(Trans, { children: "Swap" }, void 0)) }), void 0) }), void 0)), isExpertMode && swapErrorMessage ? jsx(SwapCallbackError, { error: swapErrorMessage }, void 0) : null] }, void 0)] }), void 0)] }), void 0)] }, void 0), jsx(SwitchLocaleLink, {}, void 0), !swapIsUnsupported ? null : (jsx(UnsupportedCurrencyFooter, { show: swapIsUnsupported, currencies: [currencies[Field.INPUT], currencies[Field.OUTPUT]] }, void 0))] }, void 0));
}

// Redirects to swap but only replace the pathname
function RedirectPathToSwapOnly({ location }) {
    return jsx(Redirect, { to: Object.assign(Object.assign({}, location), { pathname: '/swap' }) }, void 0);
}

function DarkModeQueryParamReader({ location: { search } }) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!search)
            return;
        if (search.length < 2)
            return;
        const parsed = parse(search, {
            parseArrays: false,
            ignoreQueryPrefix: true,
        });
        const theme = parsed.theme;
        if (typeof theme !== 'string')
            return;
        if (theme.toLowerCase() === 'light') {
            dispatch(updateUserDarkMode({ userDarkMode: false }));
        }
        else if (theme.toLowerCase() === 'dark') {
            dispatch(updateUserDarkMode({ userDarkMode: true }));
        }
    }, [dispatch, search]);
    return null;
}

// const Vote = lazy(() => import('./Vote'))
const AppWrapper = styled.div `
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`;
const BodyWrapper = styled.div `
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 120px 16px 0px 16px;
  align-items: center;
  flex: 1;
  z-index: 1;

  ${({ theme }) => theme.mediaWidth.upToSmall `
    padding: 6rem 16px 16px 16px;
  `};
`;
const HeaderWrapper = styled.div `
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`;
const Marginer = styled.div `
  margin-top: 5rem;
`;
function TopLevelModals() {
    const open = useModalOpen(ApplicationModal.ADDRESS_CLAIM);
    const toggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM);
    return jsx(AddressClaimModal, { isOpen: open, onDismiss: toggle }, void 0);
}
function App() {
    return (jsxs(ErrorBoundary, { children: [jsx(Route$2, { component: DarkModeQueryParamReader }, void 0), jsx(Route$2, { component: ApeModeQueryParamReader }, void 0), jsx(Web3ReactManager, { children: jsxs(AppWrapper, { children: [jsx(HeaderWrapper, { children: jsx(Header$2, {}, void 0) }, void 0), jsxs(BodyWrapper, { children: [jsx(Popups, {}, void 0), jsx(Polling, {}, void 0), jsx(TopLevelModals, {}, void 0), jsx(Suspense, Object.assign({ fallback: jsx(Loader, {}, void 0) }, { children: jsxs(Switch, { children: [jsx(Route$2, { exact: true, strict: true, path: "/swap", component: Swap }, void 0), jsx(Route$2, { component: RedirectPathToSwapOnly }, void 0)] }, void 0) }), void 0), jsx(Marginer, {}, void 0)] }, void 0)] }, void 0) }, void 0)] }, void 0));
}

// SDN OFAC addresses
const BLOCKED_ADDRESSES = [
    '0x7Db418b5D567A4e0E8c59Ad71BE1FcE48f3E6107',
    '0x72a5843cc08275C8171E582972Aa4fDa8C397B2A',
    '0x7F19720A857F834887FC9A7bC0a0fBe7Fc7f8102',
    '0xA7e5d5A720f06526557c513402f2e6B5fA20b008',
    '0x1da5821544e25c636c1417Ba96Ade4Cf6D2f9B5A',
    '0x9F4cda013E354b8fC285BF4b9A60460cEe7f7Ea9',
    '0x19Aa5Fe80D33a56D56c78e82eA5E50E5d80b4Dff',
    '0x2f389cE8bD8ff92De3402FFCe4691d17fC4f6535',
    '0xe7aa314c77F4233C18C6CC84384A9247c0cf367B',
    '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
    '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
    '0x901bb9583b24D97e995513C6778dc6888AB6870e',
    '0x8576aCC5C05D6Ce88f4e49bf65BdF0C62F91353C',
    '0xC8a65Fadf0e0dDAf421F28FEAb69Bf6E2E589963',
    '0x308eD4B7b49797e1A98D3818bFF6fe5385410370',
];
function Blocklist({ children }) {
    const { account } = useActiveWeb3React();
    const blocked = useMemo(() => Boolean(account && BLOCKED_ADDRESSES.indexOf(account) !== -1), [account]);
    if (blocked) {
        return (jsx("div", { children: jsx(Trans, { children: "Blocked address" }, void 0) }, void 0));
    }
    return jsx(Fragment, { children: children }, void 0);
}

const plurals = {
    'af-ZA': af,
    'ar-SA': ar,
    'ca-ES': ca,
    'cs-CZ': cs,
    'da-DK': da,
    'de-DE': de,
    'el-GR': el,
    'en-US': en,
    'es-ES': es,
    'fi-FI': fi,
    'fr-FR': fr,
    'he-IL': he,
    'hu-HU': hu,
    'id-ID': id,
    'it-IT': it,
    'ja-JP': ja,
    'ko-KR': ko,
    'nl-NL': nl,
    'no-NO': no,
    'pl-PL': pl,
    'pt-BR': pt,
    'pt-PT': pt,
    'ro-RO': ro,
    'ru-RU': ru,
    'sr-SP': sr,
    'sv-SE': sv,
    'sw-TZ': sw,
    'tr-TR': tr,
    'uk-UA': uk,
    'vi-VN': vi,
    'zh-CN': zh,
    'zh-TW': zh,
};
function dynamicActivate(locale) {
    return __awaiter(this, void 0, void 0, function* () {
        i18n.loadLocaleData(locale, { plurals: () => plurals[locale] });
        const { messages } = locale === DEFAULT_LOCALE ? { messages: enUS.messages } : yield import(`locales/${locale}`);
        i18n.load(locale, messages);
        i18n.activate(locale);
    });
}
dynamicActivate(initialLocale);
function LanguageProvider({ children }) {
    const locale = useActiveLocale();
    const [, setUserLocale] = useUserLocaleManager();
    useEffect(() => {
        dynamicActivate(locale)
            .then(() => {
            document.documentElement.setAttribute('lang', locale);
            setUserLocale(locale); // stores the selected locale to persist across sessions
        })
            .catch((error) => {
            console.error('Failed to activate locale', locale, error);
        });
    }, [locale, setUserLocale]);
    return (jsx(I18nProvider, Object.assign({ forceRenderOnLocaleChange: false, i18n: i18n }, { children: children }), void 0));
}

var Bundle_OrderBy;
(function (Bundle_OrderBy) {
    Bundle_OrderBy["Id"] = "id";
    Bundle_OrderBy["EthPriceUsd"] = "ethPriceUSD";
})(Bundle_OrderBy || (Bundle_OrderBy = {}));
var Burn_OrderBy;
(function (Burn_OrderBy) {
    Burn_OrderBy["Id"] = "id";
    Burn_OrderBy["Transaction"] = "transaction";
    Burn_OrderBy["Pool"] = "pool";
    Burn_OrderBy["Token0"] = "token0";
    Burn_OrderBy["Token1"] = "token1";
    Burn_OrderBy["Timestamp"] = "timestamp";
    Burn_OrderBy["Owner"] = "owner";
    Burn_OrderBy["Origin"] = "origin";
    Burn_OrderBy["Amount"] = "amount";
    Burn_OrderBy["Amount0"] = "amount0";
    Burn_OrderBy["Amount1"] = "amount1";
    Burn_OrderBy["AmountUsd"] = "amountUSD";
    Burn_OrderBy["TickLower"] = "tickLower";
    Burn_OrderBy["TickUpper"] = "tickUpper";
    Burn_OrderBy["LogIndex"] = "logIndex";
})(Burn_OrderBy || (Burn_OrderBy = {}));
var Collect_OrderBy;
(function (Collect_OrderBy) {
    Collect_OrderBy["Id"] = "id";
    Collect_OrderBy["Transaction"] = "transaction";
    Collect_OrderBy["Timestamp"] = "timestamp";
    Collect_OrderBy["Pool"] = "pool";
    Collect_OrderBy["Owner"] = "owner";
    Collect_OrderBy["Amount0"] = "amount0";
    Collect_OrderBy["Amount1"] = "amount1";
    Collect_OrderBy["AmountUsd"] = "amountUSD";
    Collect_OrderBy["TickLower"] = "tickLower";
    Collect_OrderBy["TickUpper"] = "tickUpper";
    Collect_OrderBy["LogIndex"] = "logIndex";
})(Collect_OrderBy || (Collect_OrderBy = {}));
var Factory_OrderBy;
(function (Factory_OrderBy) {
    Factory_OrderBy["Id"] = "id";
    Factory_OrderBy["PoolCount"] = "poolCount";
    Factory_OrderBy["TxCount"] = "txCount";
    Factory_OrderBy["TotalVolumeUsd"] = "totalVolumeUSD";
    Factory_OrderBy["TotalVolumeEth"] = "totalVolumeETH";
    Factory_OrderBy["TotalFeesUsd"] = "totalFeesUSD";
    Factory_OrderBy["TotalFeesEth"] = "totalFeesETH";
    Factory_OrderBy["UntrackedVolumeUsd"] = "untrackedVolumeUSD";
    Factory_OrderBy["TotalValueLockedUsd"] = "totalValueLockedUSD";
    Factory_OrderBy["TotalValueLockedEth"] = "totalValueLockedETH";
    Factory_OrderBy["TotalValueLockedUsdUntracked"] = "totalValueLockedUSDUntracked";
    Factory_OrderBy["TotalValueLockedEthUntracked"] = "totalValueLockedETHUntracked";
    Factory_OrderBy["Owner"] = "owner";
})(Factory_OrderBy || (Factory_OrderBy = {}));
var Flash_OrderBy;
(function (Flash_OrderBy) {
    Flash_OrderBy["Id"] = "id";
    Flash_OrderBy["Transaction"] = "transaction";
    Flash_OrderBy["Timestamp"] = "timestamp";
    Flash_OrderBy["Pool"] = "pool";
    Flash_OrderBy["Sender"] = "sender";
    Flash_OrderBy["Recipient"] = "recipient";
    Flash_OrderBy["Amount0"] = "amount0";
    Flash_OrderBy["Amount1"] = "amount1";
    Flash_OrderBy["AmountUsd"] = "amountUSD";
    Flash_OrderBy["Amount0Paid"] = "amount0Paid";
    Flash_OrderBy["Amount1Paid"] = "amount1Paid";
    Flash_OrderBy["LogIndex"] = "logIndex";
})(Flash_OrderBy || (Flash_OrderBy = {}));
var Mint_OrderBy;
(function (Mint_OrderBy) {
    Mint_OrderBy["Id"] = "id";
    Mint_OrderBy["Transaction"] = "transaction";
    Mint_OrderBy["Timestamp"] = "timestamp";
    Mint_OrderBy["Pool"] = "pool";
    Mint_OrderBy["Token0"] = "token0";
    Mint_OrderBy["Token1"] = "token1";
    Mint_OrderBy["Owner"] = "owner";
    Mint_OrderBy["Sender"] = "sender";
    Mint_OrderBy["Origin"] = "origin";
    Mint_OrderBy["Amount"] = "amount";
    Mint_OrderBy["Amount0"] = "amount0";
    Mint_OrderBy["Amount1"] = "amount1";
    Mint_OrderBy["AmountUsd"] = "amountUSD";
    Mint_OrderBy["TickLower"] = "tickLower";
    Mint_OrderBy["TickUpper"] = "tickUpper";
    Mint_OrderBy["LogIndex"] = "logIndex";
})(Mint_OrderBy || (Mint_OrderBy = {}));
var OrderDirection;
(function (OrderDirection) {
    OrderDirection["Asc"] = "asc";
    OrderDirection["Desc"] = "desc";
})(OrderDirection || (OrderDirection = {}));
var PoolDayData_OrderBy;
(function (PoolDayData_OrderBy) {
    PoolDayData_OrderBy["Id"] = "id";
    PoolDayData_OrderBy["Date"] = "date";
    PoolDayData_OrderBy["Pool"] = "pool";
    PoolDayData_OrderBy["Liquidity"] = "liquidity";
    PoolDayData_OrderBy["SqrtPrice"] = "sqrtPrice";
    PoolDayData_OrderBy["Token0Price"] = "token0Price";
    PoolDayData_OrderBy["Token1Price"] = "token1Price";
    PoolDayData_OrderBy["Tick"] = "tick";
    PoolDayData_OrderBy["FeeGrowthGlobal0X128"] = "feeGrowthGlobal0X128";
    PoolDayData_OrderBy["FeeGrowthGlobal1X128"] = "feeGrowthGlobal1X128";
    PoolDayData_OrderBy["TvlUsd"] = "tvlUSD";
    PoolDayData_OrderBy["VolumeToken0"] = "volumeToken0";
    PoolDayData_OrderBy["VolumeToken1"] = "volumeToken1";
    PoolDayData_OrderBy["VolumeUsd"] = "volumeUSD";
    PoolDayData_OrderBy["FeesUsd"] = "feesUSD";
    PoolDayData_OrderBy["TxCount"] = "txCount";
    PoolDayData_OrderBy["Open"] = "open";
    PoolDayData_OrderBy["High"] = "high";
    PoolDayData_OrderBy["Low"] = "low";
    PoolDayData_OrderBy["Close"] = "close";
})(PoolDayData_OrderBy || (PoolDayData_OrderBy = {}));
var PoolHourData_OrderBy;
(function (PoolHourData_OrderBy) {
    PoolHourData_OrderBy["Id"] = "id";
    PoolHourData_OrderBy["PeriodStartUnix"] = "periodStartUnix";
    PoolHourData_OrderBy["Pool"] = "pool";
    PoolHourData_OrderBy["Liquidity"] = "liquidity";
    PoolHourData_OrderBy["SqrtPrice"] = "sqrtPrice";
    PoolHourData_OrderBy["Token0Price"] = "token0Price";
    PoolHourData_OrderBy["Token1Price"] = "token1Price";
    PoolHourData_OrderBy["Tick"] = "tick";
    PoolHourData_OrderBy["FeeGrowthGlobal0X128"] = "feeGrowthGlobal0X128";
    PoolHourData_OrderBy["FeeGrowthGlobal1X128"] = "feeGrowthGlobal1X128";
    PoolHourData_OrderBy["TvlUsd"] = "tvlUSD";
    PoolHourData_OrderBy["VolumeToken0"] = "volumeToken0";
    PoolHourData_OrderBy["VolumeToken1"] = "volumeToken1";
    PoolHourData_OrderBy["VolumeUsd"] = "volumeUSD";
    PoolHourData_OrderBy["FeesUsd"] = "feesUSD";
    PoolHourData_OrderBy["TxCount"] = "txCount";
    PoolHourData_OrderBy["Open"] = "open";
    PoolHourData_OrderBy["High"] = "high";
    PoolHourData_OrderBy["Low"] = "low";
    PoolHourData_OrderBy["Close"] = "close";
})(PoolHourData_OrderBy || (PoolHourData_OrderBy = {}));
var Pool_OrderBy;
(function (Pool_OrderBy) {
    Pool_OrderBy["Id"] = "id";
    Pool_OrderBy["CreatedAtTimestamp"] = "createdAtTimestamp";
    Pool_OrderBy["CreatedAtBlockNumber"] = "createdAtBlockNumber";
    Pool_OrderBy["Token0"] = "token0";
    Pool_OrderBy["Token1"] = "token1";
    Pool_OrderBy["FeeTier"] = "feeTier";
    Pool_OrderBy["Liquidity"] = "liquidity";
    Pool_OrderBy["SqrtPrice"] = "sqrtPrice";
    Pool_OrderBy["FeeGrowthGlobal0X128"] = "feeGrowthGlobal0X128";
    Pool_OrderBy["FeeGrowthGlobal1X128"] = "feeGrowthGlobal1X128";
    Pool_OrderBy["Token0Price"] = "token0Price";
    Pool_OrderBy["Token1Price"] = "token1Price";
    Pool_OrderBy["Tick"] = "tick";
    Pool_OrderBy["ObservationIndex"] = "observationIndex";
    Pool_OrderBy["VolumeToken0"] = "volumeToken0";
    Pool_OrderBy["VolumeToken1"] = "volumeToken1";
    Pool_OrderBy["VolumeUsd"] = "volumeUSD";
    Pool_OrderBy["UntrackedVolumeUsd"] = "untrackedVolumeUSD";
    Pool_OrderBy["FeesUsd"] = "feesUSD";
    Pool_OrderBy["TxCount"] = "txCount";
    Pool_OrderBy["CollectedFeesToken0"] = "collectedFeesToken0";
    Pool_OrderBy["CollectedFeesToken1"] = "collectedFeesToken1";
    Pool_OrderBy["CollectedFeesUsd"] = "collectedFeesUSD";
    Pool_OrderBy["TotalValueLockedToken0"] = "totalValueLockedToken0";
    Pool_OrderBy["TotalValueLockedToken1"] = "totalValueLockedToken1";
    Pool_OrderBy["TotalValueLockedEth"] = "totalValueLockedETH";
    Pool_OrderBy["TotalValueLockedUsd"] = "totalValueLockedUSD";
    Pool_OrderBy["TotalValueLockedUsdUntracked"] = "totalValueLockedUSDUntracked";
    Pool_OrderBy["LiquidityProviderCount"] = "liquidityProviderCount";
    Pool_OrderBy["PoolHourData"] = "poolHourData";
    Pool_OrderBy["PoolDayData"] = "poolDayData";
    Pool_OrderBy["Mints"] = "mints";
    Pool_OrderBy["Burns"] = "burns";
    Pool_OrderBy["Swaps"] = "swaps";
    Pool_OrderBy["Collects"] = "collects";
    Pool_OrderBy["Ticks"] = "ticks";
})(Pool_OrderBy || (Pool_OrderBy = {}));
var PositionSnapshot_OrderBy;
(function (PositionSnapshot_OrderBy) {
    PositionSnapshot_OrderBy["Id"] = "id";
    PositionSnapshot_OrderBy["Owner"] = "owner";
    PositionSnapshot_OrderBy["Pool"] = "pool";
    PositionSnapshot_OrderBy["Position"] = "position";
    PositionSnapshot_OrderBy["BlockNumber"] = "blockNumber";
    PositionSnapshot_OrderBy["Timestamp"] = "timestamp";
    PositionSnapshot_OrderBy["Liquidity"] = "liquidity";
    PositionSnapshot_OrderBy["DepositedToken0"] = "depositedToken0";
    PositionSnapshot_OrderBy["DepositedToken1"] = "depositedToken1";
    PositionSnapshot_OrderBy["WithdrawnToken0"] = "withdrawnToken0";
    PositionSnapshot_OrderBy["WithdrawnToken1"] = "withdrawnToken1";
    PositionSnapshot_OrderBy["CollectedFeesToken0"] = "collectedFeesToken0";
    PositionSnapshot_OrderBy["CollectedFeesToken1"] = "collectedFeesToken1";
    PositionSnapshot_OrderBy["Transaction"] = "transaction";
    PositionSnapshot_OrderBy["FeeGrowthInside0LastX128"] = "feeGrowthInside0LastX128";
    PositionSnapshot_OrderBy["FeeGrowthInside1LastX128"] = "feeGrowthInside1LastX128";
})(PositionSnapshot_OrderBy || (PositionSnapshot_OrderBy = {}));
var Position_OrderBy;
(function (Position_OrderBy) {
    Position_OrderBy["Id"] = "id";
    Position_OrderBy["Owner"] = "owner";
    Position_OrderBy["Pool"] = "pool";
    Position_OrderBy["Token0"] = "token0";
    Position_OrderBy["Token1"] = "token1";
    Position_OrderBy["TickLower"] = "tickLower";
    Position_OrderBy["TickUpper"] = "tickUpper";
    Position_OrderBy["Liquidity"] = "liquidity";
    Position_OrderBy["DepositedToken0"] = "depositedToken0";
    Position_OrderBy["DepositedToken1"] = "depositedToken1";
    Position_OrderBy["WithdrawnToken0"] = "withdrawnToken0";
    Position_OrderBy["WithdrawnToken1"] = "withdrawnToken1";
    Position_OrderBy["CollectedFeesToken0"] = "collectedFeesToken0";
    Position_OrderBy["CollectedFeesToken1"] = "collectedFeesToken1";
    Position_OrderBy["Transaction"] = "transaction";
    Position_OrderBy["FeeGrowthInside0LastX128"] = "feeGrowthInside0LastX128";
    Position_OrderBy["FeeGrowthInside1LastX128"] = "feeGrowthInside1LastX128";
})(Position_OrderBy || (Position_OrderBy = {}));
var Swap_OrderBy;
(function (Swap_OrderBy) {
    Swap_OrderBy["Id"] = "id";
    Swap_OrderBy["Transaction"] = "transaction";
    Swap_OrderBy["Timestamp"] = "timestamp";
    Swap_OrderBy["Pool"] = "pool";
    Swap_OrderBy["Token0"] = "token0";
    Swap_OrderBy["Token1"] = "token1";
    Swap_OrderBy["Sender"] = "sender";
    Swap_OrderBy["Recipient"] = "recipient";
    Swap_OrderBy["Origin"] = "origin";
    Swap_OrderBy["Amount0"] = "amount0";
    Swap_OrderBy["Amount1"] = "amount1";
    Swap_OrderBy["AmountUsd"] = "amountUSD";
    Swap_OrderBy["SqrtPriceX96"] = "sqrtPriceX96";
    Swap_OrderBy["Tick"] = "tick";
    Swap_OrderBy["LogIndex"] = "logIndex";
})(Swap_OrderBy || (Swap_OrderBy = {}));
var TickDayData_OrderBy;
(function (TickDayData_OrderBy) {
    TickDayData_OrderBy["Id"] = "id";
    TickDayData_OrderBy["Date"] = "date";
    TickDayData_OrderBy["Pool"] = "pool";
    TickDayData_OrderBy["Tick"] = "tick";
    TickDayData_OrderBy["LiquidityGross"] = "liquidityGross";
    TickDayData_OrderBy["LiquidityNet"] = "liquidityNet";
    TickDayData_OrderBy["VolumeToken0"] = "volumeToken0";
    TickDayData_OrderBy["VolumeToken1"] = "volumeToken1";
    TickDayData_OrderBy["VolumeUsd"] = "volumeUSD";
    TickDayData_OrderBy["FeesUsd"] = "feesUSD";
    TickDayData_OrderBy["FeeGrowthOutside0X128"] = "feeGrowthOutside0X128";
    TickDayData_OrderBy["FeeGrowthOutside1X128"] = "feeGrowthOutside1X128";
})(TickDayData_OrderBy || (TickDayData_OrderBy = {}));
var TickHourData_OrderBy;
(function (TickHourData_OrderBy) {
    TickHourData_OrderBy["Id"] = "id";
    TickHourData_OrderBy["PeriodStartUnix"] = "periodStartUnix";
    TickHourData_OrderBy["Pool"] = "pool";
    TickHourData_OrderBy["Tick"] = "tick";
    TickHourData_OrderBy["LiquidityGross"] = "liquidityGross";
    TickHourData_OrderBy["LiquidityNet"] = "liquidityNet";
    TickHourData_OrderBy["VolumeToken0"] = "volumeToken0";
    TickHourData_OrderBy["VolumeToken1"] = "volumeToken1";
    TickHourData_OrderBy["VolumeUsd"] = "volumeUSD";
    TickHourData_OrderBy["FeesUsd"] = "feesUSD";
})(TickHourData_OrderBy || (TickHourData_OrderBy = {}));
var Tick_OrderBy;
(function (Tick_OrderBy) {
    Tick_OrderBy["Id"] = "id";
    Tick_OrderBy["PoolAddress"] = "poolAddress";
    Tick_OrderBy["TickIdx"] = "tickIdx";
    Tick_OrderBy["Pool"] = "pool";
    Tick_OrderBy["LiquidityGross"] = "liquidityGross";
    Tick_OrderBy["LiquidityNet"] = "liquidityNet";
    Tick_OrderBy["Price0"] = "price0";
    Tick_OrderBy["Price1"] = "price1";
    Tick_OrderBy["VolumeToken0"] = "volumeToken0";
    Tick_OrderBy["VolumeToken1"] = "volumeToken1";
    Tick_OrderBy["VolumeUsd"] = "volumeUSD";
    Tick_OrderBy["UntrackedVolumeUsd"] = "untrackedVolumeUSD";
    Tick_OrderBy["FeesUsd"] = "feesUSD";
    Tick_OrderBy["CollectedFeesToken0"] = "collectedFeesToken0";
    Tick_OrderBy["CollectedFeesToken1"] = "collectedFeesToken1";
    Tick_OrderBy["CollectedFeesUsd"] = "collectedFeesUSD";
    Tick_OrderBy["CreatedAtTimestamp"] = "createdAtTimestamp";
    Tick_OrderBy["CreatedAtBlockNumber"] = "createdAtBlockNumber";
    Tick_OrderBy["LiquidityProviderCount"] = "liquidityProviderCount";
    Tick_OrderBy["FeeGrowthOutside0X128"] = "feeGrowthOutside0X128";
    Tick_OrderBy["FeeGrowthOutside1X128"] = "feeGrowthOutside1X128";
})(Tick_OrderBy || (Tick_OrderBy = {}));
var TokenDayData_OrderBy;
(function (TokenDayData_OrderBy) {
    TokenDayData_OrderBy["Id"] = "id";
    TokenDayData_OrderBy["Date"] = "date";
    TokenDayData_OrderBy["Token"] = "token";
    TokenDayData_OrderBy["Volume"] = "volume";
    TokenDayData_OrderBy["VolumeUsd"] = "volumeUSD";
    TokenDayData_OrderBy["UntrackedVolumeUsd"] = "untrackedVolumeUSD";
    TokenDayData_OrderBy["TotalValueLocked"] = "totalValueLocked";
    TokenDayData_OrderBy["TotalValueLockedUsd"] = "totalValueLockedUSD";
    TokenDayData_OrderBy["PriceUsd"] = "priceUSD";
    TokenDayData_OrderBy["FeesUsd"] = "feesUSD";
    TokenDayData_OrderBy["Open"] = "open";
    TokenDayData_OrderBy["High"] = "high";
    TokenDayData_OrderBy["Low"] = "low";
    TokenDayData_OrderBy["Close"] = "close";
})(TokenDayData_OrderBy || (TokenDayData_OrderBy = {}));
var TokenHourData_OrderBy;
(function (TokenHourData_OrderBy) {
    TokenHourData_OrderBy["Id"] = "id";
    TokenHourData_OrderBy["PeriodStartUnix"] = "periodStartUnix";
    TokenHourData_OrderBy["Token"] = "token";
    TokenHourData_OrderBy["Volume"] = "volume";
    TokenHourData_OrderBy["VolumeUsd"] = "volumeUSD";
    TokenHourData_OrderBy["UntrackedVolumeUsd"] = "untrackedVolumeUSD";
    TokenHourData_OrderBy["TotalValueLocked"] = "totalValueLocked";
    TokenHourData_OrderBy["TotalValueLockedUsd"] = "totalValueLockedUSD";
    TokenHourData_OrderBy["PriceUsd"] = "priceUSD";
    TokenHourData_OrderBy["FeesUsd"] = "feesUSD";
    TokenHourData_OrderBy["Open"] = "open";
    TokenHourData_OrderBy["High"] = "high";
    TokenHourData_OrderBy["Low"] = "low";
    TokenHourData_OrderBy["Close"] = "close";
})(TokenHourData_OrderBy || (TokenHourData_OrderBy = {}));
var Token_OrderBy;
(function (Token_OrderBy) {
    Token_OrderBy["Id"] = "id";
    Token_OrderBy["Symbol"] = "symbol";
    Token_OrderBy["Name"] = "name";
    Token_OrderBy["Decimals"] = "decimals";
    Token_OrderBy["TotalSupply"] = "totalSupply";
    Token_OrderBy["Volume"] = "volume";
    Token_OrderBy["VolumeUsd"] = "volumeUSD";
    Token_OrderBy["UntrackedVolumeUsd"] = "untrackedVolumeUSD";
    Token_OrderBy["FeesUsd"] = "feesUSD";
    Token_OrderBy["TxCount"] = "txCount";
    Token_OrderBy["PoolCount"] = "poolCount";
    Token_OrderBy["TotalValueLocked"] = "totalValueLocked";
    Token_OrderBy["TotalValueLockedUsd"] = "totalValueLockedUSD";
    Token_OrderBy["TotalValueLockedUsdUntracked"] = "totalValueLockedUSDUntracked";
    Token_OrderBy["DerivedEth"] = "derivedETH";
    Token_OrderBy["WhitelistPools"] = "whitelistPools";
    Token_OrderBy["TokenDayData"] = "tokenDayData";
})(Token_OrderBy || (Token_OrderBy = {}));
var Transaction_OrderBy;
(function (Transaction_OrderBy) {
    Transaction_OrderBy["Id"] = "id";
    Transaction_OrderBy["BlockNumber"] = "blockNumber";
    Transaction_OrderBy["Timestamp"] = "timestamp";
    Transaction_OrderBy["GasUsed"] = "gasUsed";
    Transaction_OrderBy["GasPrice"] = "gasPrice";
    Transaction_OrderBy["Mints"] = "mints";
    Transaction_OrderBy["Burns"] = "burns";
    Transaction_OrderBy["Swaps"] = "swaps";
    Transaction_OrderBy["Flashed"] = "flashed";
    Transaction_OrderBy["Collects"] = "collects";
})(Transaction_OrderBy || (Transaction_OrderBy = {}));
var UniswapDayData_OrderBy;
(function (UniswapDayData_OrderBy) {
    UniswapDayData_OrderBy["Id"] = "id";
    UniswapDayData_OrderBy["Date"] = "date";
    UniswapDayData_OrderBy["VolumeEth"] = "volumeETH";
    UniswapDayData_OrderBy["VolumeUsd"] = "volumeUSD";
    UniswapDayData_OrderBy["VolumeUsdUntracked"] = "volumeUSDUntracked";
    UniswapDayData_OrderBy["FeesUsd"] = "feesUSD";
    UniswapDayData_OrderBy["TxCount"] = "txCount";
    UniswapDayData_OrderBy["TvlUsd"] = "tvlUSD";
})(UniswapDayData_OrderBy || (UniswapDayData_OrderBy = {}));
var _SubgraphErrorPolicy_;
(function (_SubgraphErrorPolicy_) {
    /** Data will be returned even if the subgraph has indexing errors */
    _SubgraphErrorPolicy_["Allow"] = "allow";
    /** If the subgraph has indexing errors, data will be omitted. The default. */
    _SubgraphErrorPolicy_["Deny"] = "deny";
})(_SubgraphErrorPolicy_ || (_SubgraphErrorPolicy_ = {}));
const AllV3TicksDocument = `
    query allV3Ticks($poolAddress: String!, $skip: Int!) {
  ticks(
    first: 1000
    skip: $skip
    where: {poolAddress: $poolAddress}
    orderBy: tickIdx
  ) {
    tickIdx
    liquidityNet
    price0
    price1
  }
}
    `;
const FeeTierDistributionDocument = `
    query feeTierDistribution($token0: String!, $token1: String!) {
  _meta {
    block {
      number
    }
  }
  asToken0: pools(
    orderBy: totalValueLockedToken0
    orderDirection: desc
    where: {token0: $token0, token1: $token1}
  ) {
    feeTier
    totalValueLockedToken0
    totalValueLockedToken1
  }
  asToken1: pools(
    orderBy: totalValueLockedToken0
    orderDirection: desc
    where: {token0: $token1, token1: $token0}
  ) {
    feeTier
    totalValueLockedToken0
    totalValueLockedToken1
  }
}
    `;
const injectedRtkApi = api$1.injectEndpoints({
    endpoints: (build) => ({
        allV3Ticks: build.query({
            query: (variables) => ({ document: AllV3TicksDocument, variables })
        }),
        feeTierDistribution: build.query({
            query: (variables) => ({ document: FeeTierDistributionDocument, variables })
        }),
    }),
});

// tag that should be applied to queries that need to be invalidated when the chain changes
const CHAIN_TAG = 'Chain';
// enhanced api to provide/invalidate tags
const api = injectedRtkApi.enhanceEndpoints({
    addTagTypes: [CHAIN_TAG],
    endpoints: {
        allV3Ticks: {
            providesTags: [CHAIN_TAG],
        },
        feeTierDistribution: {
            providesTags: [CHAIN_TAG],
        },
    },
});

/**
 * Returns the input chain ID if chain is supported. If not, return undefined
 * @param chainId a chain ID, which will be returned if it is a supported chain ID
 */
function supportedChainId(chainId) {
    if (chainId in SupportedChainId) {
        return chainId;
    }
    return undefined;
}

function useQueryCacheInvalidator() {
    const dispatch = useAppDispatch();
    // subscribe to `chainId` changes in the redux store rather than Web3
    // this will ensure that when `invalidateTags` is called, the latest
    // `chainId` is available in redux to build the subgraph url
    const chainId = useAppSelector((state) => state.application.chainId);
    useEffect(() => {
        dispatch(api.util.invalidateTags([CHAIN_TAG]));
    }, [chainId, dispatch]);
}
function Updater$5() {
    const { account, chainId, library } = useActiveWeb3React();
    const dispatch = useAppDispatch();
    const windowVisible = useIsWindowVisible();
    const [state, setState] = useState({
        chainId,
        blockNumber: null,
    });
    useQueryCacheInvalidator();
    const blockNumberCallback = useCallback((blockNumber) => {
        setState((state) => {
            if (chainId === state.chainId) {
                if (typeof state.blockNumber !== 'number')
                    return { chainId, blockNumber };
                return { chainId, blockNumber: Math.max(blockNumber, state.blockNumber) };
            }
            return state;
        });
    }, [chainId, setState]);
    // attach/detach listeners
    useEffect(() => {
        if (!library || !chainId || !windowVisible)
            return undefined;
        setState({ chainId, blockNumber: null });
        library
            .getBlockNumber()
            .then(blockNumberCallback)
            .catch((error) => console.error(`Failed to get block number for chainId: ${chainId}`, error));
        library.on('block', blockNumberCallback);
        return () => {
            library.removeListener('block', blockNumberCallback);
        };
    }, [dispatch, chainId, library, blockNumberCallback, windowVisible]);
    const debouncedState = useDebounce(state, 100);
    useEffect(() => {
        if (!debouncedState.chainId || !debouncedState.blockNumber || !windowVisible)
            return;
        dispatch(updateBlockNumber({ chainId: debouncedState.chainId, blockNumber: debouncedState.blockNumber }));
    }, [windowVisible, dispatch, debouncedState.blockNumber, debouncedState.chainId]);
    useEffect(() => {
        var _a;
        dispatch(updateChainId({ chainId: debouncedState.chainId ? (_a = supportedChainId(debouncedState.chainId)) !== null && _a !== void 0 ? _a : null : null }));
    }, [dispatch, debouncedState.chainId]);
    const implements3085 = useAppSelector((state) => state.application.implements3085);
    useEffect(() => {
        var _a;
        if (!((_a = library === null || library === void 0 ? void 0 : library.provider) === null || _a === void 0 ? void 0 : _a.request)) {
            dispatch(setImplements3085({ implements3085: false }));
        }
        else if (account && !implements3085) {
            switchToNetwork({ library })
                .then((x) => x !== null && x !== void 0 ? x : dispatch(setImplements3085({ implements3085: true })))
                .catch(() => dispatch(setImplements3085({ implements3085: false })));
        }
        else if (!account && implements3085) {
            dispatch(setImplements3085({ implements3085: false }));
        }
    }, [account, dispatch, implements3085, library]);
    return null;
}

function Updater$4() {
    const { chainId, library } = useActiveWeb3React();
    const dispatch = useAppDispatch();
    const isWindowVisible = useIsWindowVisible();
    // get all loaded lists, and the active urls
    const lists = useAllLists();
    const activeListUrls = useActiveListUrls();
    const fetchList = useFetchListCallback();
    const fetchAllListsCallback = useCallback(() => {
        if (!isWindowVisible)
            return;
        Object.keys(lists).forEach((url) => fetchList(url).catch((error) => console.debug('interval list fetching error', error)));
    }, [fetchList, isWindowVisible, lists]);
    useEffect(() => {
        if (chainId && [SupportedChainId.OPTIMISM, SupportedChainId.OPTIMISTIC_KOVAN].includes(chainId)) {
            dispatch(enableList(OPTIMISM_LIST));
        }
        if (chainId && [SupportedChainId.ARBITRUM_ONE, SupportedChainId.ARBITRUM_RINKEBY].includes(chainId)) {
            dispatch(enableList(ARBITRUM_LIST));
        }
    }, [chainId, dispatch]);
    // fetch all lists every 10 minutes, but only after we initialize library
    useInterval(fetchAllListsCallback, library ? 1000 * 60 * 10 : null);
    // whenever a list is not loaded and not loading, try again to load it
    useEffect(() => {
        Object.keys(lists).forEach((listUrl) => {
            const list = lists[listUrl];
            if (!list.current && !list.loadingRequestId && !list.error) {
                fetchList(listUrl).catch((error) => console.debug('list added fetching error', error));
            }
        });
    }, [dispatch, fetchList, library, lists]);
    // if any lists from unsupported lists are loaded, check them too (in case new updates since last visit)
    useEffect(() => {
        UNSUPPORTED_LIST_URLS.forEach((listUrl) => {
            const list = lists[listUrl];
            if (!list || (!list.current && !list.loadingRequestId && !list.error)) {
                fetchList(listUrl).catch((error) => console.debug('list added fetching error', error));
            }
        });
    }, [dispatch, fetchList, library, lists]);
    // automatically update lists if versions are minor/patch
    useEffect(() => {
        Object.keys(lists).forEach((listUrl) => {
            const list = lists[listUrl];
            if (list.current && list.pendingUpdate) {
                const bump = getVersionUpgrade(list.current.version, list.pendingUpdate.version);
                switch (bump) {
                    case VersionUpgrade.NONE:
                        throw new Error('unexpected no version bump');
                    case VersionUpgrade.PATCH:
                    case VersionUpgrade.MINOR:
                        const min = minVersionBump(list.current.tokens, list.pendingUpdate.tokens);
                        // automatically update minor/patch as long as bump matches the min update
                        if (bump >= min) {
                            dispatch(acceptListUpdate(listUrl));
                        }
                        else {
                            console.error(`List at url ${listUrl} could not automatically update because the version bump was only PATCH/MINOR while the update had breaking changes and should have been MAJOR`);
                        }
                        break;
                    // update any active or inactive lists
                    case VersionUpgrade.MAJOR:
                        dispatch(acceptListUpdate(listUrl));
                }
            }
        });
    }, [dispatch, lists, activeListUrls]);
    return null;
}

function Updater$3() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.logs);
    const { chainId, library } = useActiveWeb3React();
    const blockNumber = useBlockNumber();
    const filtersNeedFetch = useMemo(() => {
        if (!chainId || typeof blockNumber !== 'number')
            return [];
        const active = state[chainId];
        if (!active)
            return [];
        return Object.keys(active)
            .filter((key) => {
            const { fetchingBlockNumber, results, listeners } = active[key];
            if (listeners === 0)
                return false;
            if (typeof fetchingBlockNumber === 'number' && fetchingBlockNumber >= blockNumber)
                return false;
            if (results && typeof results.blockNumber === 'number' && results.blockNumber >= blockNumber)
                return false;
            return true;
        })
            .map((key) => keyToFilter(key));
    }, [blockNumber, chainId, state]);
    useEffect(() => {
        if (!library || !chainId || typeof blockNumber !== 'number' || filtersNeedFetch.length === 0)
            return;
        dispatch(fetchingLogs({ chainId, filters: filtersNeedFetch, blockNumber }));
        filtersNeedFetch.forEach((filter) => {
            library
                .getLogs(Object.assign(Object.assign({}, filter), { fromBlock: 0, toBlock: blockNumber }))
                .then((logs) => {
                dispatch(fetchedLogs({
                    chainId,
                    filter,
                    results: { logs, blockNumber },
                }));
            })
                .catch((error) => {
                console.error('Failed to get logs', filter, error);
                dispatch(fetchedLogsError({
                    chainId,
                    filter,
                    blockNumber,
                }));
            });
        });
    }, [blockNumber, chainId, dispatch, filtersNeedFetch, library]);
    return null;
}

// Create Updater wrappers that pull needed info from store
function Updater$2() {
    const latestBlockNumber = useBlockNumber();
    const { chainId } = useActiveWeb3React();
    const multicall2Contract = useMulticall2Contract();
    return jsx(multicall.Updater, { chainId: chainId, latestBlockNumber: latestBlockNumber, contract: multicall2Contract }, void 0);
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function waitRandom(min, max) {
    return wait(min + Math.round(Math.random() * Math.max(0, max - min)));
}
/**
 * This error is thrown if the function is cancelled before completing
 */
class CancelledError extends Error {
    constructor() {
        super('Cancelled');
        this.isCancelledError = true;
    }
}
/**
 * Throw this error if the function should retry
 */
class RetryableError extends Error {
    constructor() {
        super(...arguments);
        this.isRetryableError = true;
    }
}
/**
 * Retries the function that returns the promise until the promise successfully resolves up to n retries
 * @param fn function to retry
 * @param n how many times to retry
 * @param minWait min wait between retries in ms
 * @param maxWait max wait between retries in ms
 */
function retry(fn, { n, minWait, maxWait }) {
    let completed = false;
    let rejectCancelled;
    const promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        rejectCancelled = reject;
        while (true) {
            let result;
            try {
                result = yield fn();
                if (!completed) {
                    resolve(result);
                    completed = true;
                }
                break;
            }
            catch (error) {
                if (completed) {
                    break;
                }
                if (n <= 0 || !error.isRetryableError) {
                    reject(error);
                    completed = true;
                    break;
                }
                n--;
            }
            yield waitRandom(minWait, maxWait);
        }
    }));
    return {
        promise,
        cancel: () => {
            if (completed)
                return;
            completed = true;
            rejectCancelled(new CancelledError());
        },
    };
}

function shouldCheck(lastBlockNumber, tx) {
    if (tx.receipt)
        return false;
    if (!tx.lastCheckedBlockNumber)
        return true;
    const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber;
    if (blocksSinceCheck < 1)
        return false;
    const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60;
    if (minutesPending > 60) {
        // every 10 blocks if pending for longer than an hour
        return blocksSinceCheck > 9;
    }
    else if (minutesPending > 5) {
        // every 3 blocks if pending more than 5 minutes
        return blocksSinceCheck > 2;
    }
    else {
        // otherwise every block
        return true;
    }
}
const RETRY_OPTIONS_BY_CHAIN_ID = {
    [SupportedChainId.ARBITRUM_ONE]: { n: 10, minWait: 250, maxWait: 1000 },
    [SupportedChainId.ARBITRUM_RINKEBY]: { n: 10, minWait: 250, maxWait: 1000 },
    [SupportedChainId.OPTIMISTIC_KOVAN]: { n: 10, minWait: 250, maxWait: 1000 },
    [SupportedChainId.OPTIMISM]: { n: 10, minWait: 250, maxWait: 1000 },
};
const DEFAULT_RETRY_OPTIONS = { n: 1, minWait: 0, maxWait: 0 };
function Updater$1() {
    const { chainId, library } = useActiveWeb3React();
    const lastBlockNumber = useBlockNumber();
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.transactions);
    const transactions = useMemo(() => { var _a; return (chainId ? (_a = state[chainId]) !== null && _a !== void 0 ? _a : {} : {}); }, [chainId, state]);
    // show popup on confirm
    const addPopup = useAddPopup();
    // speed up popup dismisall time if on L2
    const isL2 = Boolean(chainId && L2_CHAIN_IDS.includes(chainId));
    const getReceipt = useCallback((hash) => {
        var _a;
        if (!library || !chainId)
            throw new Error('No library or chainId');
        const retryOptions = (_a = RETRY_OPTIONS_BY_CHAIN_ID[chainId]) !== null && _a !== void 0 ? _a : DEFAULT_RETRY_OPTIONS;
        return retry(() => library.getTransactionReceipt(hash).then((receipt) => {
            if (receipt === null) {
                console.debug('Retrying for hash', hash);
                throw new RetryableError();
            }
            return receipt;
        }), retryOptions);
    }, [chainId, library]);
    useEffect(() => {
        if (!chainId || !library || !lastBlockNumber)
            return;
        const cancels = Object.keys(transactions)
            .filter((hash) => shouldCheck(lastBlockNumber, transactions[hash]))
            .map((hash) => {
            const { promise, cancel } = getReceipt(hash);
            promise
                .then((receipt) => {
                if (receipt) {
                    dispatch(finalizeTransaction({
                        chainId,
                        hash,
                        receipt: {
                            blockHash: receipt.blockHash,
                            blockNumber: receipt.blockNumber,
                            contractAddress: receipt.contractAddress,
                            from: receipt.from,
                            status: receipt.status,
                            to: receipt.to,
                            transactionHash: receipt.transactionHash,
                            transactionIndex: receipt.transactionIndex,
                        },
                    }));
                    addPopup({
                        txn: {
                            hash,
                        },
                    }, hash, isL2 ? L2_TXN_DISMISS_MS : DEFAULT_TXN_DISMISS_MS);
                    // the receipt was fetched before the block, fast forward to that block to trigger balance updates
                    if (receipt.blockNumber > lastBlockNumber) {
                        dispatch(updateBlockNumber({ chainId, blockNumber: receipt.blockNumber }));
                    }
                }
                else {
                    dispatch(checkedTransaction({ chainId, hash, blockNumber: lastBlockNumber }));
                }
            })
                .catch((error) => {
                if (!error.isCancelledError) {
                    console.error(`Failed to check transaction hash: ${hash}`, error);
                }
            });
            return cancel;
        });
        return () => {
            cancels.forEach((cancel) => cancel());
        };
    }, [chainId, library, transactions, lastBlockNumber, dispatch, addPopup, getReceipt, isL2]);
    return null;
}

function Updater() {
    const dispatch = useAppDispatch();
    // keep dark mode in sync with the system
    useEffect(() => {
        const darkHandler = (match) => {
            dispatch(updateMatchesDarkMode({ matchesDarkMode: match.matches }));
        };
        const match = window === null || window === void 0 ? void 0 : window.matchMedia('(prefers-color-scheme: dark)');
        dispatch(updateMatchesDarkMode({ matchesDarkMode: match.matches }));
        if (match === null || match === void 0 ? void 0 : match.addListener) {
            match === null || match === void 0 ? void 0 : match.addListener(darkHandler);
        }
        else if (match === null || match === void 0 ? void 0 : match.addEventListener) {
            match === null || match === void 0 ? void 0 : match.addEventListener('change', darkHandler);
        }
        return () => {
            if (match === null || match === void 0 ? void 0 : match.removeListener) {
                match === null || match === void 0 ? void 0 : match.removeListener(darkHandler);
            }
            else if (match === null || match === void 0 ? void 0 : match.removeEventListener) {
                match === null || match === void 0 ? void 0 : match.removeEventListener('change', darkHandler);
            }
        };
    }, [dispatch]);
    return null;
}

const initialStyles = {
    width: '200vw',
    height: '200vh',
    transform: 'translate(-50vw, -100vh)',
};
const backgroundResetStyles = {
    width: '100vw',
    height: '100vh',
    transform: 'unset',
};
const backgroundRadialGradientElement = document.getElementById('background-radial-gradient');
const setBackground = (newValues) => Object.entries(newValues).forEach(([key, value]) => {
    if (backgroundRadialGradientElement) {
        backgroundRadialGradientElement.style[key] = value;
    }
});
function RadialGradientByChainUpdater() {
    const { chainId } = useActiveWeb3React();
    const [darkMode] = useDarkModeManager();
    // manage background color
    useEffect(() => {
        if (!backgroundRadialGradientElement) {
            return;
        }
        switch (chainId) {
            case SupportedChainId.ARBITRUM_ONE:
            case SupportedChainId.ARBITRUM_RINKEBY:
                setBackground(backgroundResetStyles);
                const arbitrumLightGradient = 'radial-gradient(150% 100% at 50% 0%, #CDE8FB 0%, #FCF3F9 50%, #FFFFFF 100%)';
                const arbitrumDarkGradient = 'radial-gradient(150% 100% at 50% 0%, #0A294B 0%, #221E30 50%, #1F2128 100%)';
                backgroundRadialGradientElement.style.background = darkMode ? arbitrumDarkGradient : arbitrumLightGradient;
                break;
            case SupportedChainId.OPTIMISM:
            case SupportedChainId.OPTIMISTIC_KOVAN:
                setBackground(backgroundResetStyles);
                const optimismLightGradient = 'radial-gradient(150% 100% at 50% 0%, #FFFBF2 2%, #FFF4F9 53%, #FFFFFF 100%)';
                const optimismDarkGradient = 'radial-gradient(150% 100% at 50% 0%, #3E2E38 2%, #2C1F2D 53%, #1F2128 100%)';
                backgroundRadialGradientElement.style.background = darkMode ? optimismDarkGradient : optimismLightGradient;
                break;
            default:
                setBackground(initialStyles);
                backgroundRadialGradientElement.style.background = '';
        }
    }, [darkMode, chainId]);
    return null;
}

function Updaters() {
    return (jsxs(Fragment, { children: [jsx(RadialGradientByChainUpdater, {}, void 0), jsx(Updater$4, {}, void 0), jsx(Updater, {}, void 0), jsx(Updater$5, {}, void 0), jsx(Updater$1, {}, void 0), jsx(Updater$2, {}, void 0), jsx(Updater$3, {}, void 0)] }, void 0));
}

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);
const Providers = (props) => (jsx(Provider, Object.assign({ store: store }, { children: jsx(HashRouter, { children: jsx(LanguageProvider, { children: jsx(Web3ReactProvider, Object.assign({ getLibrary: getLibrary }, { children: jsx(Web3ProviderNetwork, Object.assign({ getLibrary: getLibrary }, { children: jsxs(Blocklist, { children: [jsx(Updaters, {}, void 0), jsxs(ThemeProvider, { children: [jsx(ThemedGlobalStyle, {}, void 0), props.children] }, void 0)] }, void 0) }), void 0) }), void 0) }, void 0) }, void 0) }), void 0));

var fortmatic=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n});},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(e,t){e.exports=function(e){return e&&e.__esModule?e:{default:e}};},function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")};},function(e,t,r){function n(){return Math.floor(9e4*Math.random())+1e4}Object.defineProperty(t,"__esModule",{value:!0}),t.sendAsyncWrapper=function(e,t){var r=this;return new Promise(function(o,a){r.sendAsync({jsonrpc:"2.0",id:n(),method:e,params:t||[]},function(e,t){e?a(e):o(t.result);});})},t.sendFortmaticAsyncWrapper=function(e){var t=this;return new Promise(function(r,n){t.getProvider().sendFortmaticAsync(e,function(e,t){e?n(e):r(t?t.result:{});});})},t.randomId=n,t.findExistingResponse=function(e,t){for(var r=0;r<e.length;r++)if(e[r].id===t)return e[r];return null};},function(e,t,r){e.exports=r(4);},function(e,t,r){var n=r(0),o=n(r(1)),a=n(r(5)),i=r(2),s="fm_composeSend",c="fm_logout",u="fm_get_balances",l="fm_get_transactions",f="fm_is_logged_in",d="fm_accountSettings",h="fm_deposit",p="fm_get_user",m="fm_configure",y={};e.exports=function e(t,r,n){var g=this;if((0, o.default)(this,e),this.fortmaticClient="https://x2.fortmatic.com",!t)throw new Error("Please provide a Fortmatic API key that you acquired from the developer dashboard.");this.apiKey=t,this.options=n,this.ethNetwork=r,this.queryParams=btoa(JSON.stringify({API_KEY:t,ETH_NETWORK:r})),this.transactions={send:function(e,t){var r=new v(s,{to:e.to,value:e.amount});g.getProvider().sendFortmaticAsync(r,t);}},this.getProvider=function(){return y["fortmatic-".concat(g.queryParams)]||(y["fortmatic-".concat(g.queryParams)]=new a.default(g.fortmaticClient,{API_KEY:t,ETH_NETWORK:r})),y["fortmatic-".concat(g.queryParams)]},this.user={login:function(){return g.getProvider().enable()},logout:function(){g.getProvider().account=null,g.getProvider().network=null;var e=new v(c);return i.sendFortmaticAsyncWrapper.call(g,e)},getUser:function(){var e=new v(p);return i.sendFortmaticAsyncWrapper.call(g,e)},getBalances:function(){var e=new v(u);return i.sendFortmaticAsyncWrapper.call(g,e)},getTransactions:function(){var e=new v(l);return i.sendFortmaticAsyncWrapper.call(g,e)},isLoggedIn:function(){var e=new v(f);return i.sendFortmaticAsyncWrapper.call(g,e)},settings:function(){var e=new v(d);return i.sendFortmaticAsyncWrapper.call(g,e)},deposit:function(e){var t=new v(h,e);return i.sendFortmaticAsyncWrapper.call(g,t)}},this.configure=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=new v(m);return t.params=[e],i.sendFortmaticAsyncWrapper.call(g,t)};};var v=function e(t,r){(0, o.default)(this,e),this.id=(0, i.randomId)(),this.method=t,this.params=r?[r]:[{}];};},function(e,t,r){var n=r(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(r(6)),a=n(r(9)),i=n(r(1)),s=n(r(10)),c=r(11),u=n(r(12)),l=r(2),f=function(){function e(t,r){if((0, i.default)(this,e),this.fortmaticClient=t,this.requests={},this.queue=[],this.account=null,this.network=null,this.isFortmatic=!0,this.overlayReady=!1,this.isLoggedIn=!1,this.postMessages={FORTMATIC_HANDLE_BATCH_REQUEST:"FORTMATIC_HANDLE_BATCH_REQUEST",FORTMATIC_HANDLE_REQUEST:"FORTMATIC_HANDLE_REQUEST",FORTMATIC_HANDLE_FORTMATIC_REQUEST:"FORTMATIC_HANDLE_FORTMATIC_REQUEST",FORTMATIC_HANDLE_RESPONSE:"FORTMATIC_HANDLE_RESPONSE",FORTMATIC_OVERLAY_READY:"FORTMATIC_OVERLAY_READY",FORTMATIC_SHOW_OVERLAY:"FORTMATIC_SHOW_OVERLAY",FORTMATIC_HIDE_OVERLAY:"FORTMATIC_HIDE_OVERLAY",FORTMATIC_USER_DENIED:"FORTMATIC_USER_DENIED",FORTMATIC_USER_LOGOUT:"FORTMATIC_USER_LOGOUT",FORTMATIC_UNAUTHORIZED_API_KEY:"FORTMATIC_UNAUTHORIZED_API_KEY"},!r.API_KEY)throw new Error("Please provide a Fortmatic API key that you acquired from the developer dashboard.");this.options={API_KEY:r.API_KEY,ETH_NETWORK:r.ETH_NETWORK,DOMAIN_ORIGIN:window.location?window.location.origin:"",version:c.version},this.queryParams=btoa(JSON.stringify(this.options)),this.constructPostMessage(),this.overlay=this.createOverlay(),this.listenMessage();}return (0, s.default)(e,[{key:"constructPostMessage",value:function(){var e=this;Object.keys(this.postMessages).map(function(t){e.postMessages[t]+="-".concat(e.queryParams);});}},{key:"createOverlay",value:function(){var e=this;return new Promise(function(t,r){var n=function(){if(function(){var t=!0,r=!1,n=void 0;try{for(var o,a=document.getElementsByClassName("fortmatic-iframe")[Symbol.iterator]();!(t=(o=a.next()).done);t=!0)if(o.value.src.includes(e.queryParams))return !1}catch(e){r=!0,n=e;}finally{try{t||null==a.return||a.return();}finally{if(r)throw n}}return !0}()){var r=document.createElement("style");r.innerHTML=u.default.css,r.type="text/css",document.head.appendChild(r);var n=document.createElement("iframe");n.className="fortmatic-iframe",n.src="".concat(e.fortmaticClient,"/send?params=").concat(e.queryParams),document.body.appendChild(n);var o=document.createElement("img");o.src="https://static.fortmatic.com/assets/trans.gif",document.body.appendChild(o),t({iframe:n});}else console.error("Fortmatic: Duplicate instances found.");};["loaded","interactive","complete"].indexOf(document.readyState)>-1?n():window.addEventListener("load",n.bind(e),!1);})}},{key:"showOverlay",value:function(){var e=(0, a.default)(o.default.mark(function e(){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.overlay;case 2:e.sent.iframe.style.display="block";case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"hideOverlay",value:function(){var e=(0, a.default)(o.default.mark(function e(){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.overlay;case 2:e.sent.iframe.style.display="none";case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"sendAsync",value:function(e,t){e.length>0?this.enqueue({payload:{id:(0, l.randomId)(),batch:e.map(function(e){return e.id=(0, l.randomId)(),e}),method:"eth_batchRequest"},cb:t}):this.enqueue({payload:e,cb:t});}},{key:"sendFortmaticAsync",value:function(e,t){this.enqueue({payload:e,cb:t,isNative:!0});}},{key:"send",value:function(e,t){if("string"==typeof e)return l.sendAsyncWrapper.call(this,e,t);if(!t){console.warn("Non-async web3 methods will be deprecated in web3 > 1.0, and are not supported by the Fortmatic provider. An async method to be used instead."),this.sendAsync(e,function(){});var r={};switch(e.method){case"eth_accounts":r=this.account?[this.account]:[];break;case"eth_coinbase":r=this.account;break;case"net_version":r=this.network||(this.options.API_KEY.startsWith("pk_live")?1:4);break;case"eth_uninstallFilter":r=!0;break;default:r={};}return {id:e.id,jsonrpc:e.jsonrpc,result:r}}this.sendAsync(e,t);}},{key:"enqueue",value:function(e){this.queue.push(e),this.overlayReady&&this.dequeue();}},{key:"dequeue",value:function(){var e=(0, a.default)(o.default.mark(function e(){var t,r,n,a=this;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==this.queue.length){e.next=2;break}return e.abrupt("return");case 2:if(!(t=this.queue.shift())){e.next=11;break}return r=t.payload,n=t.cb,r.id=(0, l.randomId)(),e.next=9,this.postMessage(t.isNative?this.postMessages.FORTMATIC_HANDLE_FORTMATIC_REQUEST:this.postMessages.FORTMATIC_HANDLE_REQUEST,t.payload);case 9:r.batch&&r.batch.length>0?(r.batch.forEach(function(e){a.requests[e.id]={parentId:r.id,payload:e,cb:function(e,t){var n=a.requests[r.id].batchResponse;if(e&&e.response&&!(0, l.findExistingResponse)(n,e.response.id))throw n.push({jsonrpc:"2.0",id:e.response.id,error:{code:e.response.code,message:e.response.message}}),a.requests[r.id].cb(null,n),e.response;if(t&&t.result&&!(0, l.findExistingResponse)(n,t.id))return n.push(t);throw new Error("Fortmatic: unexpected callback behavior")}};}),this.requests[r.id]={payload:r,cb:n,batchResponse:[]}):this.requests[r.id]={payload:r,cb:n},this.dequeue();case 11:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"postMessage",value:function(){var e=(0, a.default)(o.default.mark(function e(t,r){var n;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.overlay;case 2:if(!(n=e.sent).iframe.contentWindow){e.next=7;break}n.iframe.contentWindow.postMessage({msgType:t,payload:r},"*"),e.next=8;break;case 7:throw new Error("Fortmatic: Modal is not ready.");case 8:case"end":return e.stop()}},e,this)}));return function(t,r){return e.apply(this,arguments)}}()},{key:"enable",value:function(){return l.sendAsyncWrapper.call(this,"eth_accounts")}},{key:"listenMessage",value:function(){var e=this;window.addEventListener("message",function(t){if(t.origin===e.fortmaticClient){var r=t.data.response?t.data.response.id:null;switch(t.data.msgType){case e.postMessages.FORTMATIC_OVERLAY_READY:e.overlayReady=!0,e.dequeue();break;case e.postMessages.FORTMATIC_HANDLE_RESPONSE:try{e.requests[r].cb(null,t.data.response);var n=e.requests[r].parentId;n&&e.requests[n].payload.batch.length===e.requests[n].batchResponse.length&&e.requests[n].cb(null,e.requests[n].batchResponse),"eth_accounts"===e.requests[r].payload.method?e.account=t.data.response.result[0]:"eth_coinbase"===e.requests[r].payload.method?e.account=t.data.response.result:"net_version"===e.requests[r].payload.method&&(e.network=t.data.response.result);}catch(e){}e.isLoggedIn=!0,e.dequeue();break;case e.postMessages.FORTMATIC_HIDE_OVERLAY:e.hideOverlay();break;case e.postMessages.FORTMATIC_SHOW_OVERLAY:e.showOverlay();break;case e.postMessages.FORTMATIC_USER_LOGOUT:e.account=null,e.network=null,e.isLoggedIn=!1;break;case e.postMessages.FORTMATIC_UNAUTHORIZED_API_KEY:throw e.overlayReady=!1,new Error("Given API key is not authorized to access the resource.");case e.postMessages.FORTMATIC_USER_DENIED:if(r){var o=t.data.response&&t.data.response.message?t.data.response.message:"Fortmatic: Modal was closed without executing action!",a=t.data.response&&t.data.response.code?t.data.response.code:1;e.requests[r].cb({message:o,code:a,response:t.data.response});}else e.queue.forEach(function(e){return e.cb({message:"Fortmatic: Modal was closed without executing action!",code:1})});e.dequeue();}}});}}]),e}();t.default=f;},function(e,t,r){e.exports=r(7);},function(e,t,r){var n=function(){return this||"object"==typeof self&&self}()||Function("return this")(),o=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,a=o&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,e.exports=r(8),o)n.regeneratorRuntime=a;else try{delete n.regeneratorRuntime;}catch(e){n.regeneratorRuntime=void 0;}},function(e,t){!function(t){var r,n=Object.prototype,o=n.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",s=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag",u="object"==typeof e,l=t.regeneratorRuntime;if(l)u&&(e.exports=l);else {(l=t.regeneratorRuntime=u?e.exports:{}).wrap=_;var f="suspendedStart",d="suspendedYield",h="executing",p="completed",m={},y={};y[i]=function(){return this};var v=Object.getPrototypeOf,g=v&&v(v(L([])));g&&g!==n&&o.call(g,i)&&(y=g);var b=A.prototype=w.prototype=Object.create(y);T.prototype=b.constructor=A,A.constructor=T,A[c]=T.displayName="GeneratorFunction",l.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return !!t&&(t===T||"GeneratorFunction"===(t.displayName||t.name))},l.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,A):(e.__proto__=A,c in e||(e[c]="GeneratorFunction")),e.prototype=Object.create(b),e},l.awrap=function(e){return {__await:e}},O(R.prototype),R.prototype[s]=function(){return this},l.AsyncIterator=R,l.async=function(e,t,r,n){var o=new R(_(e,t,r,n));return l.isGeneratorFunction(t)?o:o.next().then(function(e){return e.done?e.value:o.next()})},O(b),b[c]="Generator",b[i]=function(){return this},b.toString=function(){return "[object Generator]"},l.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},l.values=L,F.prototype={constructor:F,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(M),!e)for(var t in this)"t"===t.charAt(0)&&o.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=r);},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(n,o){return s.type="throw",s.arg=e,t.next=n,o&&(t.method="next",t.arg=r),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],s=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=o.call(i,"catchLoc"),u=o.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else {if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=e,i.arg=t,a?(this.method="next",this.next=a.finallyLoc,m):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return "break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),m},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),M(r),m}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;M(r);}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:L(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=r),m}};}function _(e,t,r,n){var o=t&&t.prototype instanceof w?t:w,a=Object.create(o.prototype),i=new F(n||[]);return a._invoke=function(e,t,r){var n=f;return function(o,a){if(n===h)throw new Error("Generator is already running");if(n===p){if("throw"===o)throw a;return k()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var s=I(i,r);if(s){if(s===m)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=p,r.arg;r.dispatchException(r.arg);}else "return"===r.method&&r.abrupt("return",r.arg);n=h;var c=E(e,t,r);if("normal"===c.type){if(n=r.done?p:d,c.arg===m)continue;return {value:c.arg,done:r.done}}"throw"===c.type&&(n=p,r.method="throw",r.arg=c.arg);}}}(e,r,i),a}function E(e,t,r){try{return {type:"normal",arg:e.call(t,r)}}catch(e){return {type:"throw",arg:e}}}function w(){}function T(){}function A(){}function O(e){["next","throw","return"].forEach(function(t){e[t]=function(e){return this._invoke(t,e)};});}function R(e){var t;this._invoke=function(r,n){function a(){return new Promise(function(t,a){!function t(r,n,a,i){var s=E(e[r],e,n);if("throw"!==s.type){var c=s.arg,u=c.value;return u&&"object"==typeof u&&o.call(u,"__await")?Promise.resolve(u.__await).then(function(e){t("next",e,a,i);},function(e){t("throw",e,a,i);}):Promise.resolve(u).then(function(e){c.value=e,a(c);},function(e){return t("throw",e,a,i)})}i(s.arg);}(r,n,t,a);})}return t=t?t.then(a,a):a()};}function I(e,t){var n=e.iterator[t.method];if(n===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=r,I(e,t),"throw"===t.method))return m;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method");}return m}var o=E(n,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,m;var a=o.arg;return a?a.done?(t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=r),t.delegate=null,m):a:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,m)}function x(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t);}function M(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t;}function F(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(x,this),this.reset(!0);}function L(e){if(e){var t=e[i];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,a=function t(){for(;++n<e.length;)if(o.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=r,t.done=!0,t};return a.next=a}}return {next:k}}function k(){return {value:r,done:!0}}}(function(){return this||"object"==typeof self&&self}()||Function("return this")());},function(e,t){function r(e,t,r,n,o,a,i){try{var s=e[a](i),c=s.value;}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(n,o);}e.exports=function(e){return function(){var t=this,n=arguments;return new Promise(function(o,a){var i=e.apply(t,n);function s(e){r(i,o,a,s,c,"next",e);}function c(e){r(i,o,a,s,c,"throw",e);}s(void 0);})}};},function(e,t){function r(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n);}}e.exports=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e};},function(e){e.exports={name:"fortmatic",version:"1.1.3",description:"Fortmatic Javascript SDK",main:"lib/fortmatic.js",scripts:{build:"WEBPACK_ENV=production webpack","build:dev":"WEBPACK_ENV=development BABEL_ENV=development webpack --progress --colors --watch",test:"nyc --reporter=lcov --reporter=text-summary ava"},author:"Fortmatic <team@fortmatic.com> (https://fortmatic.com/)",license:"MIT",repository:{type:"git",url:"https://github.com/fortmatic/fortmatic-js"},keywords:["Auth","Login","Web3","Crypto","Ethereum","MetaMask","Wallet","Blockchain","Dapp"],homepage:"https://www.fortmatic.com",ava:{require:["@babel/register"],files:["test/**/*.spec.js"],babel:{testOptions:{presets:["@babel/env"],plugins:["@babel/plugin-proposal-function-bind","@babel/plugin-transform-runtime"]}},verbose:!0},nyc:{all:!1,"check-coverage":!0,"per-file":!0,lines:80,statements:80,functions:80,branches:80,include:["src/**/*.js"],exclude:["*/style.js"],require:[],reporter:["html","lcov"]},dependencies:{"@babel/runtime":"7.3.4"},devDependencies:{"@babel/core":"7.3.4","@babel/plugin-proposal-function-bind":"7.2.0","@babel/plugin-transform-modules-commonjs":"7.2.0","@babel/plugin-transform-runtime":"7.3.4","@babel/preset-env":"7.3.4","@babel/register":"7.0.0",ava:"2.2.0","babel-eslint":"10.0.1","babel-loader":"8.0.5",eslint:"5.9.0",lodash:"4.17.11",nyc:"13.1.0",sinon:"7.1.1",webpack:"4.26.1","webpack-cli":"3.1.2"}};},function(e,t,r){t.css="\n  .fortmatic-iframe {\n    display: none;\n    position: fixed;\n    top: 0;\n    right: 0;\n    width: 100%;\n    height: 100%;\n    border: none;\n    border-radius: 0;\n    z-index: 2147483647;\n  }\n";}]);

var fortmatic$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  'default': fortmatic
}, [fortmatic]));

var $schema = "http://json-schema.org/draft-07/schema#";
var $id = "https://uniswap.org/tokenlist.schema.json";
var title = "Uniswap Token List";
var description = "Schema for lists of tokens compatible with the Uniswap Interface";
var definitions = {
	Version: {
		type: "object",
		description: "The version of the list, used in change detection",
		examples: [
			{
				major: 1,
				minor: 0,
				patch: 0
			}
		],
		additionalProperties: false,
		properties: {
			major: {
				type: "integer",
				description: "The major version of the list. Must be incremented when tokens are removed from the list or token addresses are changed.",
				minimum: 0,
				examples: [
					1,
					2
				]
			},
			minor: {
				type: "integer",
				description: "The minor version of the list. Must be incremented when tokens are added to the list.",
				minimum: 0,
				examples: [
					0,
					1
				]
			},
			patch: {
				type: "integer",
				description: "The patch version of the list. Must be incremented for any changes to the list.",
				minimum: 0,
				examples: [
					0,
					1
				]
			}
		},
		required: [
			"major",
			"minor",
			"patch"
		]
	},
	TagIdentifier: {
		type: "string",
		description: "The unique identifier of a tag",
		minLength: 1,
		maxLength: 10,
		pattern: "^[\\w]+$",
		examples: [
			"compound",
			"stablecoin"
		]
	},
	ExtensionIdentifier: {
		type: "string",
		description: "The name of a token extension property",
		minLength: 1,
		maxLength: 40,
		pattern: "^[\\w]+$",
		examples: [
			"color",
			"is_fee_on_transfer",
			"aliases"
		]
	},
	ExtensionMap: {
		type: "object",
		description: "An object containing any arbitrary or vendor-specific token metadata",
		maxProperties: 10,
		propertyNames: {
			$ref: "#/definitions/ExtensionIdentifier"
		},
		additionalProperties: {
			$ref: "#/definitions/ExtensionValue"
		},
		examples: [
			{
				color: "#000000",
				is_verified_by_me: true
			},
			{
				"x-bridged-addresses-by-chain": {
					"1": {
						bridgeAddress: "0x4200000000000000000000000000000000000010",
						tokenAddress: "0x4200000000000000000000000000000000000010"
					}
				}
			}
		]
	},
	ExtensionPrimitiveValue: {
		anyOf: [
			{
				type: "string",
				minLength: 1,
				maxLength: 42,
				examples: [
					"#00000"
				]
			},
			{
				type: "boolean",
				examples: [
					true
				]
			},
			{
				type: "number",
				examples: [
					15
				]
			},
			{
				type: "null"
			}
		]
	},
	ExtensionValue: {
		anyOf: [
			{
				$ref: "#/definitions/ExtensionPrimitiveValue"
			},
			{
				type: "object",
				maxProperties: 10,
				propertyNames: {
					$ref: "#/definitions/ExtensionIdentifier"
				},
				additionalProperties: {
					$ref: "#/definitions/ExtensionValueInner0"
				}
			}
		]
	},
	ExtensionValueInner0: {
		anyOf: [
			{
				$ref: "#/definitions/ExtensionPrimitiveValue"
			},
			{
				type: "object",
				maxProperties: 10,
				propertyNames: {
					$ref: "#/definitions/ExtensionIdentifier"
				},
				additionalProperties: {
					$ref: "#/definitions/ExtensionValueInner1"
				}
			}
		]
	},
	ExtensionValueInner1: {
		anyOf: [
			{
				$ref: "#/definitions/ExtensionPrimitiveValue"
			}
		]
	},
	TagDefinition: {
		type: "object",
		description: "Definition of a tag that can be associated with a token via its identifier",
		additionalProperties: false,
		properties: {
			name: {
				type: "string",
				description: "The name of the tag",
				pattern: "^[ \\w]+$",
				minLength: 1,
				maxLength: 20
			},
			description: {
				type: "string",
				description: "A user-friendly description of the tag",
				pattern: "^[ \\w\\.,:]+$",
				minLength: 1,
				maxLength: 200
			}
		},
		required: [
			"name",
			"description"
		],
		examples: [
			{
				name: "Stablecoin",
				description: "A token with value pegged to another asset"
			}
		]
	},
	TokenInfo: {
		type: "object",
		description: "Metadata for a single token in a token list",
		additionalProperties: false,
		properties: {
			chainId: {
				type: "integer",
				description: "The chain ID of the Ethereum network where this token is deployed",
				minimum: 1,
				examples: [
					1,
					42
				]
			},
			address: {
				type: "string",
				description: "The checksummed address of the token on the specified chain ID",
				pattern: "^0x[a-fA-F0-9]{40}$",
				examples: [
					"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
				]
			},
			decimals: {
				type: "integer",
				description: "The number of decimals for the token balance",
				minimum: 0,
				maximum: 255,
				examples: [
					18
				]
			},
			name: {
				type: "string",
				description: "The name of the token",
				minLength: 1,
				maxLength: 40,
				pattern: "^[ \\w.'+\\-%/À-ÖØ-öø-ÿ:&\\[\\]\\(\\)]+$",
				examples: [
					"USD Coin"
				]
			},
			symbol: {
				type: "string",
				description: "The symbol for the token; must be alphanumeric",
				pattern: "^[a-zA-Z0-9+\\-%/$.]+$",
				minLength: 1,
				maxLength: 20,
				examples: [
					"USDC"
				]
			},
			logoURI: {
				type: "string",
				description: "A URI to the token logo asset; if not set, interface will attempt to find a logo based on the token address; suggest SVG or PNG of size 64x64",
				format: "uri",
				examples: [
					"ipfs://QmXfzKRvjZz3u5JRgC4v5mGVbm9ahrUiB4DgzHBsnWbTMM"
				]
			},
			tags: {
				type: "array",
				description: "An array of tag identifiers associated with the token; tags are defined at the list level",
				items: {
					$ref: "#/definitions/TagIdentifier"
				},
				maxItems: 10,
				examples: [
					"stablecoin",
					"compound"
				]
			},
			extensions: {
				$ref: "#/definitions/ExtensionMap"
			}
		},
		required: [
			"chainId",
			"address",
			"decimals",
			"name",
			"symbol"
		]
	}
};
var type = "object";
var additionalProperties = false;
var properties = {
	name: {
		type: "string",
		description: "The name of the token list",
		minLength: 1,
		maxLength: 20,
		pattern: "^[\\w ]+$",
		examples: [
			"My Token List"
		]
	},
	timestamp: {
		type: "string",
		format: "date-time",
		description: "The timestamp of this list version; i.e. when this immutable version of the list was created"
	},
	version: {
		$ref: "#/definitions/Version"
	},
	tokens: {
		type: "array",
		description: "The list of tokens included in the list",
		items: {
			$ref: "#/definitions/TokenInfo"
		},
		minItems: 1,
		maxItems: 10000
	},
	keywords: {
		type: "array",
		description: "Keywords associated with the contents of the list; may be used in list discoverability",
		items: {
			type: "string",
			description: "A keyword to describe the contents of the list",
			minLength: 1,
			maxLength: 20,
			pattern: "^[\\w ]+$",
			examples: [
				"compound",
				"lending",
				"personal tokens"
			]
		},
		maxItems: 20,
		uniqueItems: true
	},
	tags: {
		type: "object",
		description: "A mapping of tag identifiers to their name and description",
		propertyNames: {
			$ref: "#/definitions/TagIdentifier"
		},
		additionalProperties: {
			$ref: "#/definitions/TagDefinition"
		},
		maxProperties: 20,
		examples: [
			{
				stablecoin: {
					name: "Stablecoin",
					description: "A token with value pegged to another asset"
				}
			}
		]
	},
	logoURI: {
		type: "string",
		description: "A URI for the logo of the token list; prefer SVG or PNG of size 256x256",
		format: "uri",
		examples: [
			"ipfs://QmXfzKRvjZz3u5JRgC4v5mGVbm9ahrUiB4DgzHBsnWbTMM"
		]
	}
};
var required = [
	"name",
	"timestamp",
	"version",
	"tokens"
];
var tokenlist_schema = {
	$schema: $schema,
	$id: $id,
	title: title,
	description: description,
	definitions: definitions,
	type: type,
	additionalProperties: additionalProperties,
	properties: properties,
	required: required
};

var tokenlist_schema$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $schema: $schema,
  $id: $id,
  title: title,
  description: description,
  definitions: definitions,
  type: type,
  additionalProperties: additionalProperties,
  properties: properties,
  required: required,
  'default': tokenlist_schema
});

export { App, Providers, serviceWorkerRegistration };
