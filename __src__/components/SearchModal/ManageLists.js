import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { i18n } from "@lingui/core";
import Card from 'components/Card';
import { UNSUPPORTED_LIST_URLS } from 'constants/lists';
import { useListColor } from 'hooks/useColor';
import { useActiveWeb3React } from 'hooks/web3';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle, Settings } from 'react-feather';
import ReactGA from 'react-ga';
import { usePopper } from 'react-popper';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { useFetchListCallback } from '../../hooks/useFetchListCallback';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import useTheme from '../../hooks/useTheme';
import useToggle from '../../hooks/useToggle';
import { acceptListUpdate, disableList, enableList, removeList } from '../../state/lists/actions';
import { useActiveListUrls, useAllLists, useIsListActive } from '../../state/lists/hooks';
import { ExternalLink, IconWrapper, LinkStyledButton, ThemedText } from '../../theme';
import listVersionLabel from '../../utils/listVersionLabel';
import { parseENSAddress } from '../../utils/parseENSAddress';
import uriToHttp from '../../utils/uriToHttp';
import { ButtonEmpty, ButtonPrimary } from '../Button';
import Column, { AutoColumn } from '../Column';
import ListLogo from '../ListLogo';
import Row, { RowBetween, RowFixed } from '../Row';
import ListToggle from '../Toggle/ListToggle';
import { CurrencyModalView } from './CurrencySearchModal';
import { PaddedColumn, SearchInput, Separator, SeparatorDark } from './styleds';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const Wrapper = _styled(Column).withConfig({
  displayName: "ManageLists__Wrapper",
  componentId: "sc-z8ju4z-0"
})(["height:100%;"]);

const UnpaddedLinkStyledButton = _styled(LinkStyledButton).withConfig({
  displayName: "ManageLists__UnpaddedLinkStyledButton",
  componentId: "sc-z8ju4z-1"
})(["padding:0;font-size:1rem;opacity:", ";"], _ref => {
  let {
    disabled
  } = _ref;
  return disabled ? '0.4' : '1';
});

const PopoverContainer = _styled.div.withConfig({
  displayName: "ManageLists__PopoverContainer",
  componentId: "sc-z8ju4z-2"
})(["z-index:100;visibility:", ";opacity:", ";transition:visibility 150ms linear,opacity 150ms linear;background:", ";border:1px solid ", ";box-shadow:0px 0px 1px rgba(0,0,0,0.01),0px 4px 8px rgba(0,0,0,0.04),0px 16px 24px rgba(0,0,0,0.04),0px 24px 32px rgba(0,0,0,0.01);color:", ";border-radius:0.5rem;padding:1rem;display:grid;grid-template-rows:1fr;grid-gap:8px;font-size:1rem;text-align:left;"], props => props.show ? 'visible' : 'hidden', props => props.show ? 1 : 0, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.bg2;
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.bg3;
}, _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.text2;
});

const StyledMenu = _styled.div.withConfig({
  displayName: "ManageLists__StyledMenu",
  componentId: "sc-z8ju4z-3"
})(["display:flex;justify-content:center;align-items:center;position:relative;border:none;"]);

const StyledTitleText = _styled.div.withConfig({
  displayName: "ManageLists__StyledTitleText",
  componentId: "sc-z8ju4z-4"
})(["font-size:16px;overflow:hidden;text-overflow:ellipsis;font-weight:600;color:", ";"], _ref5 => {
  let {
    theme,
    active
  } = _ref5;
  return active ? theme.white : theme.text2;
});

const StyledListUrlText = _styled(ThemedText.Main).withConfig({
  displayName: "ManageLists__StyledListUrlText",
  componentId: "sc-z8ju4z-5"
})(["font-size:12px;color:", ";"], _ref6 => {
  let {
    theme,
    active
  } = _ref6;
  return active ? theme.white : theme.text2;
});

const RowWrapper = _styled(Row).withConfig({
  displayName: "ManageLists__RowWrapper",
  componentId: "sc-z8ju4z-6"
})(["background-color:", ";opacity:", ";transition:200ms;align-items:center;padding:1rem;border-radius:20px;"], _ref7 => {
  let {
    bgColor,
    active,
    theme
  } = _ref7;
  return active ? bgColor !== null && bgColor !== void 0 ? bgColor : 'transparent' : theme.bg2;
}, _ref8 => {
  let {
    hasActiveTokens
  } = _ref8;
  return hasActiveTokens ? 1 : 0.4;
});

function listUrlRowHTMLId(listUrl) {
  return `list-row-${listUrl.replace(/\./g, '-')}`;
}

const ListRow = /*#__PURE__*/memo(function ListRow(_ref9) {
  let {
    listUrl
  } = _ref9;
  const {
    chainId
  } = useActiveWeb3React();
  const listsByUrl = useAppSelector(state => state.lists.byUrl);
  const dispatch = useAppDispatch();
  const {
    current: list,
    pendingUpdate: pending
  } = listsByUrl[listUrl];
  const activeTokensOnThisChain = useMemo(() => {
    if (!list || !chainId) {
      return 0;
    }

    return list.tokens.reduce((acc, cur) => cur.chainId === chainId ? acc + 1 : acc, 0);
  }, [chainId, list]);
  const theme = useTheme();
  const listColor = useListColor(list === null || list === void 0 ? void 0 : list.logoURI);
  const isActive = useIsListActive(listUrl);
  const [open, toggle] = useToggle(false);
  const node = useRef();
  const [referenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();
  const {
    styles,
    attributes
  } = usePopper(referenceElement, popperElement, {
    placement: 'auto',
    strategy: 'fixed',
    modifiers: [{
      name: 'offset',
      options: {
        offset: [8, 8]
      }
    }]
  });
  useOnClickOutside(node, open ? toggle : undefined);
  const handleAcceptListUpdate = useCallback(() => {
    if (!pending) return;
    ReactGA.event({
      category: 'Lists',
      action: 'Update List from List Select',
      label: listUrl
    });
    dispatch(acceptListUpdate(listUrl));
  }, [dispatch, listUrl, pending]);
  const handleRemoveList = useCallback(() => {
    ReactGA.event({
      category: 'Lists',
      action: 'Start Remove List',
      label: listUrl
    });

    if (window.prompt(
    /*i18n*/
    i18n._("Please confirm you would like to remove this list by typing REMOVE")) === `REMOVE`) {
      ReactGA.event({
        category: 'Lists',
        action: 'Confirm Remove List',
        label: listUrl
      });
      dispatch(removeList(listUrl));
    }
  }, [dispatch, listUrl]);
  const handleEnableList = useCallback(() => {
    ReactGA.event({
      category: 'Lists',
      action: 'Enable List',
      label: listUrl
    });
    dispatch(enableList(listUrl));
  }, [dispatch, listUrl]);
  const handleDisableList = useCallback(() => {
    ReactGA.event({
      category: 'Lists',
      action: 'Disable List',
      label: listUrl
    });
    dispatch(disableList(listUrl));
  }, [dispatch, listUrl]);
  if (!list) return null;
  return /*#__PURE__*/_jsxs(RowWrapper, {
    active: isActive,
    hasActiveTokens: activeTokensOnThisChain > 0,
    bgColor: listColor,
    id: listUrlRowHTMLId(listUrl),
    children: [list.logoURI ? /*#__PURE__*/_jsx(ListLogo, {
      size: "40px",
      style: {
        marginRight: '1rem'
      },
      logoURI: list.logoURI,
      alt: `${list.name} list logo`
    }) : /*#__PURE__*/_jsx("div", {
      style: {
        width: '24px',
        height: '24px',
        marginRight: '1rem'
      }
    }), /*#__PURE__*/_jsxs(Column, {
      style: {
        flex: '1'
      },
      children: [/*#__PURE__*/_jsx(Row, {
        children: /*#__PURE__*/_jsx(StyledTitleText, {
          active: isActive,
          children: list.name
        })
      }), /*#__PURE__*/_jsxs(RowFixed, {
        mt: "4px",
        children: [/*#__PURE__*/_jsx(StyledListUrlText, {
          active: isActive,
          mr: "6px",
          children: /*#__PURE__*/_jsx(Trans, {
            id: "{activeTokensOnThisChain} tokens",
            values: {
              activeTokensOnThisChain: activeTokensOnThisChain
            }
          })
        }), /*#__PURE__*/_jsxs(StyledMenu, {
          ref: node,
          children: [/*#__PURE__*/_jsx(ButtonEmpty, {
            onClick: toggle,
            ref: setReferenceElement,
            padding: "0",
            children: /*#__PURE__*/_jsx(Settings, {
              stroke: isActive ? theme.bg1 : theme.text1,
              size: 12
            })
          }), open && /*#__PURE__*/_jsxs(PopoverContainer, {
            show: true,
            ref: setPopperElement,
            style: styles.popper,
            ...attributes.popper,
            children: [/*#__PURE__*/_jsx("div", {
              children: list && listVersionLabel(list.version)
            }), /*#__PURE__*/_jsx(SeparatorDark, {}), /*#__PURE__*/_jsx(ExternalLink, {
              href: `https://tokenlists.org/token-list?url=${listUrl}`,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "View list"
              })
            }), /*#__PURE__*/_jsx(UnpaddedLinkStyledButton, {
              onClick: handleRemoveList,
              disabled: Object.keys(listsByUrl).length === 1,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Remove list"
              })
            }), pending && /*#__PURE__*/_jsx(UnpaddedLinkStyledButton, {
              onClick: handleAcceptListUpdate,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Update list"
              })
            })]
          })]
        })]
      })]
    }), /*#__PURE__*/_jsx(ListToggle, {
      isActive: isActive,
      bgColor: listColor,
      toggle: () => {
        isActive ? handleDisableList() : handleEnableList();
      }
    })]
  }, listUrl);
});

const ListContainer = _styled.div.withConfig({
  displayName: "ManageLists__ListContainer",
  componentId: "sc-z8ju4z-7"
})(["padding:1rem;height:100%;overflow:auto;padding-bottom:80px;"]);

export function ManageLists(_ref10) {
  let {
    setModalView,
    setImportList,
    setListUrl
  } = _ref10;
  const {
    chainId
  } = useActiveWeb3React();
  const theme = useTheme();
  const [listUrlInput, setListUrlInput] = useState('');
  const lists = useAllLists();
  const tokenCountByListName = useMemo(() => Object.values(lists).reduce((acc, _ref11) => {
    let {
      current: list
    } = _ref11;

    if (!list) {
      return acc;
    }

    return { ...acc,
      [list.name]: list.tokens.reduce((count, token) => token.chainId === chainId ? count + 1 : count, 0)
    };
  }, {}), [chainId, lists]); // sort by active but only if not visible

  const activeListUrls = useActiveListUrls();
  const handleInput = useCallback(e => {
    setListUrlInput(e.target.value);
  }, []);
  const fetchList = useFetchListCallback();
  const validUrl = useMemo(() => {
    return uriToHttp(listUrlInput).length > 0 || Boolean(parseENSAddress(listUrlInput));
  }, [listUrlInput]);
  const sortedLists = useMemo(() => {
    const listUrls = Object.keys(lists);
    return listUrls.filter(listUrl => {
      // only show loaded lists, hide unsupported lists
      return Boolean(lists[listUrl].current) && !Boolean(UNSUPPORTED_LIST_URLS.includes(listUrl));
    }).sort((listUrlA, listUrlB) => {
      const {
        current: listA
      } = lists[listUrlA];
      const {
        current: listB
      } = lists[listUrlB]; // first filter on active lists

      if (activeListUrls !== null && activeListUrls !== void 0 && activeListUrls.includes(listUrlA) && !(activeListUrls !== null && activeListUrls !== void 0 && activeListUrls.includes(listUrlB))) {
        return -1;
      }

      if (!(activeListUrls !== null && activeListUrls !== void 0 && activeListUrls.includes(listUrlA)) && activeListUrls !== null && activeListUrls !== void 0 && activeListUrls.includes(listUrlB)) {
        return 1;
      }

      if (listA && listB) {
        if (tokenCountByListName[listA.name] > tokenCountByListName[listB.name]) {
          return -1;
        }

        if (tokenCountByListName[listA.name] < tokenCountByListName[listB.name]) {
          return 1;
        }

        return listA.name.toLowerCase() < listB.name.toLowerCase() ? -1 : listA.name.toLowerCase() === listB.name.toLowerCase() ? 0 : 1;
      }

      if (listA) return -1;
      if (listB) return 1;
      return 0;
    });
  }, [lists, activeListUrls, tokenCountByListName]); // temporary fetched list for import flow

  const [tempList, setTempList] = useState();
  const [addError, setAddError] = useState();
  useEffect(() => {
    async function fetchTempList() {
      fetchList(listUrlInput, false).then(list => setTempList(list)).catch(() => setAddError(
      /*i18n*/
      i18n._("Error importing list")));
    } // if valid url, fetch details for card


    if (validUrl) {
      fetchTempList();
    } else {
      setTempList(undefined);
      listUrlInput !== '' && setAddError(
      /*i18n*/
      i18n._("Enter valid list location"));
    } // reset error


    if (listUrlInput === '') {
      setAddError(undefined);
    }
  }, [fetchList, listUrlInput, validUrl]); // check if list is already imported

  const isImported = Object.keys(lists).includes(listUrlInput); // set list values and have parent modal switch to import list view

  const handleImport = useCallback(() => {
    if (!tempList) return;
    setImportList(tempList);
    setModalView(CurrencyModalView.importList);
    setListUrl(listUrlInput);
  }, [listUrlInput, setImportList, setListUrl, setModalView, tempList]);
  return /*#__PURE__*/_jsxs(Wrapper, {
    children: [/*#__PURE__*/_jsxs(PaddedColumn, {
      gap: "14px",
      children: [/*#__PURE__*/_jsx(Row, {
        children: /*#__PURE__*/_jsx(SearchInput, {
          type: "text",
          id: "list-add-input",
          placeholder:
          /*i18n*/
          i18n._("https:// or ipfs:// or ENS name"),
          value: listUrlInput,
          onChange: handleInput
        })
      }), addError ? /*#__PURE__*/_jsx(ThemedText.Error, {
        title: addError,
        style: {
          textOverflow: 'ellipsis',
          overflow: 'hidden'
        },
        error: true,
        children: addError
      }) : null]
    }), tempList && /*#__PURE__*/_jsx(PaddedColumn, {
      style: {
        paddingTop: 0
      },
      children: /*#__PURE__*/_jsx(Card, {
        backgroundColor: theme.bg2,
        padding: "12px 20px",
        children: /*#__PURE__*/_jsxs(RowBetween, {
          children: [/*#__PURE__*/_jsxs(RowFixed, {
            children: [tempList.logoURI && /*#__PURE__*/_jsx(ListLogo, {
              logoURI: tempList.logoURI,
              size: "40px"
            }), /*#__PURE__*/_jsxs(AutoColumn, {
              gap: "4px",
              style: {
                marginLeft: '20px'
              },
              children: [/*#__PURE__*/_jsx(ThemedText.Body, {
                fontWeight: 600,
                children: tempList.name
              }), /*#__PURE__*/_jsx(ThemedText.Main, {
                fontSize: '12px',
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "{0} tokens",
                  values: {
                    0: tempList.tokens.length
                  }
                })
              })]
            })]
          }), isImported ? /*#__PURE__*/_jsxs(RowFixed, {
            children: [/*#__PURE__*/_jsx(IconWrapper, {
              stroke: theme.text2,
              size: "16px",
              marginRight: '10px',
              children: /*#__PURE__*/_jsx(CheckCircle, {})
            }), /*#__PURE__*/_jsx(ThemedText.Body, {
              color: theme.text2,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Loaded"
              })
            })]
          }) : /*#__PURE__*/_jsx(ButtonPrimary, {
            style: {
              fontSize: '14px'
            },
            padding: "6px 8px",
            width: "fit-content",
            onClick: handleImport,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Import"
            })
          })]
        })
      })
    }), /*#__PURE__*/_jsx(Separator, {}), /*#__PURE__*/_jsx(ListContainer, {
      children: /*#__PURE__*/_jsx(AutoColumn, {
        gap: "md",
        children: sortedLists.map(listUrl => /*#__PURE__*/_jsx(ListRow, {
          listUrl: listUrl
        }, listUrl))
      })
    })]
  });
}