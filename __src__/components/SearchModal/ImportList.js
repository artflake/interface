import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { ButtonPrimary } from 'components/Button';
import Card from 'components/Card';
import { AutoColumn } from 'components/Column';
import ListLogo from 'components/ListLogo';
import { AutoRow, RowBetween, RowFixed } from 'components/Row';
import { SectionBreak } from 'components/swap/styleds';
import { useFetchListCallback } from 'hooks/useFetchListCallback';
import useTheme from 'hooks/useTheme';
import { transparentize } from 'polished';
import { useCallback, useState } from 'react';
import { AlertTriangle, ArrowLeft } from 'react-feather';
import ReactGA from 'react-ga';
import { useAppDispatch } from 'state/hooks';
import { enableList, removeList } from 'state/lists/actions';
import { useAllLists } from 'state/lists/hooks';
import { CloseIcon, ThemedText } from 'theme';
import { ExternalLink } from '../../theme';
import { CurrencyModalView } from './CurrencySearchModal';
import { Checkbox, PaddedColumn, TextDot } from './styleds';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const Wrapper = _styled.div.withConfig({
  displayName: "ImportList__Wrapper",
  componentId: "sc-11ypl1h-0"
})(["position:relative;width:100%;overflow:auto;"]);

export function ImportList(_ref) {
  var _lists$listURL;

  let {
    listURL,
    list,
    setModalView,
    onDismiss
  } = _ref;
  const theme = useTheme();
  const dispatch = useAppDispatch(); // user must accept

  const [confirmed, setConfirmed] = useState(false);
  const lists = useAllLists();
  const fetchList = useFetchListCallback(); // monitor is list is loading

  const adding = Boolean((_lists$listURL = lists[listURL]) === null || _lists$listURL === void 0 ? void 0 : _lists$listURL.loadingRequestId);
  const [addError, setAddError] = useState(null);
  const handleAddList = useCallback(() => {
    if (adding) return;
    setAddError(null);
    fetchList(listURL).then(() => {
      ReactGA.event({
        category: 'Lists',
        action: 'Add List',
        label: listURL
      }); // turn list on

      dispatch(enableList(listURL)); // go back to lists

      setModalView(CurrencyModalView.manage);
    }).catch(error => {
      ReactGA.event({
        category: 'Lists',
        action: 'Add List Failed',
        label: listURL
      });
      setAddError(error.message);
      dispatch(removeList(listURL));
    });
  }, [adding, dispatch, fetchList, listURL, setModalView]);
  return /*#__PURE__*/_jsxs(Wrapper, {
    children: [/*#__PURE__*/_jsx(PaddedColumn, {
      gap: "14px",
      style: {
        width: '100%',
        flex: '1 1'
      },
      children: /*#__PURE__*/_jsxs(RowBetween, {
        children: [/*#__PURE__*/_jsx(ArrowLeft, {
          style: {
            cursor: 'pointer'
          },
          onClick: () => setModalView(CurrencyModalView.manage)
        }), /*#__PURE__*/_jsx(ThemedText.MediumHeader, {
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Import List"
          })
        }), /*#__PURE__*/_jsx(CloseIcon, {
          onClick: onDismiss
        })]
      })
    }), /*#__PURE__*/_jsx(SectionBreak, {}), /*#__PURE__*/_jsx(PaddedColumn, {
      gap: "md",
      children: /*#__PURE__*/_jsxs(AutoColumn, {
        gap: "md",
        children: [/*#__PURE__*/_jsx(Card, {
          backgroundColor: theme.bg2,
          padding: "12px 20px",
          children: /*#__PURE__*/_jsx(RowBetween, {
            children: /*#__PURE__*/_jsxs(RowFixed, {
              children: [list.logoURI && /*#__PURE__*/_jsx(ListLogo, {
                logoURI: list.logoURI,
                size: "40px"
              }), /*#__PURE__*/_jsxs(AutoColumn, {
                gap: "sm",
                style: {
                  marginLeft: '20px'
                },
                children: [/*#__PURE__*/_jsxs(RowFixed, {
                  children: [/*#__PURE__*/_jsx(ThemedText.Body, {
                    fontWeight: 600,
                    mr: "6px",
                    children: list.name
                  }), /*#__PURE__*/_jsx(TextDot, {}), /*#__PURE__*/_jsx(ThemedText.Main, {
                    fontSize: '16px',
                    ml: "6px",
                    children: /*#__PURE__*/_jsx(Trans, {
                      id: "{0} tokens",
                      values: {
                        0: list.tokens.length
                      }
                    })
                  })]
                }), /*#__PURE__*/_jsx(ExternalLink, {
                  href: `https://tokenlists.org/token-list?url=${listURL}`,
                  children: /*#__PURE__*/_jsx(ThemedText.Main, {
                    fontSize: '12px',
                    color: theme.blue1,
                    children: listURL
                  })
                })]
              })]
            })
          })
        }), /*#__PURE__*/_jsxs(Card, {
          style: {
            backgroundColor: transparentize(0.8, theme.red1)
          },
          children: [/*#__PURE__*/_jsxs(AutoColumn, {
            justify: "center",
            style: {
              textAlign: 'center',
              gap: '16px',
              marginBottom: '12px'
            },
            children: [/*#__PURE__*/_jsx(AlertTriangle, {
              stroke: theme.red1,
              size: 32
            }), /*#__PURE__*/_jsx(ThemedText.Body, {
              fontWeight: 500,
              fontSize: 20,
              color: theme.red1,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Import at your own risk"
              })
            })]
          }), /*#__PURE__*/_jsxs(AutoColumn, {
            style: {
              textAlign: 'center',
              gap: '16px',
              marginBottom: '12px'
            },
            children: [/*#__PURE__*/_jsx(ThemedText.Body, {
              fontWeight: 500,
              color: theme.red1,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "By adding this list you are implicitly trusting that the data is correct. Anyone can create a list, including creating fake versions of existing lists and lists that claim to represent projects that do not have one."
              })
            }), /*#__PURE__*/_jsx(ThemedText.Body, {
              fontWeight: 600,
              color: theme.red1,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "If you purchase a token from this list, you may not be able to sell it back."
              })
            })]
          }), /*#__PURE__*/_jsxs(AutoRow, {
            justify: "center",
            style: {
              cursor: 'pointer'
            },
            onClick: () => setConfirmed(!confirmed),
            children: [/*#__PURE__*/_jsx(Checkbox, {
              name: "confirmed",
              type: "checkbox",
              checked: confirmed,
              onChange: () => setConfirmed(!confirmed)
            }), /*#__PURE__*/_jsx(ThemedText.Body, {
              ml: "10px",
              fontSize: "16px",
              color: theme.red1,
              fontWeight: 500,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "I understand"
              })
            })]
          })]
        }), /*#__PURE__*/_jsx(ButtonPrimary, {
          disabled: !confirmed,
          altDisabledStyle: true,
          $borderRadius: "20px",
          padding: "10px 1rem",
          onClick: handleAddList,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Import"
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
      })
    })]
  });
}