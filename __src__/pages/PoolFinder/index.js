import { Trans } from "@lingui/react";
import JSBI from 'jsbi';
import { useCallback, useEffect, useState } from 'react';
import { Plus } from 'react-feather';
import { useLocation } from 'react-router';
import { Text } from 'rebass';
import { ButtonDropdownLight } from '../../components/Button';
import { LightCard } from '../../components/Card';
import { BlueCard } from '../../components/Card';
import { AutoColumn, ColumnCenter } from '../../components/Column';
import CurrencyLogo from '../../components/CurrencyLogo';
import { FindPoolTabs } from '../../components/NavigationTabs';
import { MinimalPositionCard } from '../../components/PositionCard';
import Row from '../../components/Row';
import CurrencySearchModal from '../../components/SearchModal/CurrencySearchModal';
import { SwitchLocaleLink } from '../../components/SwitchLocaleLink';
import { ExtendedEther } from '../../constants/tokens';
import { PairState, useV2Pair } from '../../hooks/useV2Pairs';
import { useActiveWeb3React } from '../../hooks/web3';
import { usePairAdder } from '../../state/user/hooks';
import { useTokenBalance } from '../../state/wallet/hooks';
import { StyledInternalLink } from '../../theme';
import { ThemedText } from '../../theme';
import { currencyId } from '../../utils/currencyId';
import AppBody from '../AppBody';
import { Dots } from '../Pool/styleds';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var Fields;

(function (Fields) {
  Fields[Fields["TOKEN0"] = 0] = "TOKEN0";
  Fields[Fields["TOKEN1"] = 1] = "TOKEN1";
})(Fields || (Fields = {}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function PoolFinder() {
  var _query$get, _ref;

  const query = useQuery();
  const {
    account,
    chainId
  } = useActiveWeb3React();
  const [showSearch, setShowSearch] = useState(false);
  const [activeField, setActiveField] = useState(Fields.TOKEN1);
  const [currency0, setCurrency0] = useState(() => chainId ? ExtendedEther.onChain(chainId) : null);
  const [currency1, setCurrency1] = useState(null);
  const [pairState, pair] = useV2Pair(currency0 !== null && currency0 !== void 0 ? currency0 : undefined, currency1 !== null && currency1 !== void 0 ? currency1 : undefined);
  const addPair = usePairAdder();
  useEffect(() => {
    if (pair) {
      addPair(pair);
    }
  }, [pair, addPair]);
  const validPairNoLiquidity = pairState === PairState.NOT_EXISTS || Boolean(pairState === PairState.EXISTS && pair && JSBI.equal(pair.reserve0.quotient, JSBI.BigInt(0)) && JSBI.equal(pair.reserve1.quotient, JSBI.BigInt(0)));
  const position = useTokenBalance(account !== null && account !== void 0 ? account : undefined, pair === null || pair === void 0 ? void 0 : pair.liquidityToken);
  const hasPosition = Boolean(position && JSBI.greaterThan(position.quotient, JSBI.BigInt(0)));
  const handleCurrencySelect = useCallback(currency => {
    if (activeField === Fields.TOKEN0) {
      setCurrency0(currency);
    } else {
      setCurrency1(currency);
    }
  }, [activeField]);
  const handleSearchDismiss = useCallback(() => {
    setShowSearch(false);
  }, [setShowSearch]);

  const prerequisiteMessage = /*#__PURE__*/_jsx(LightCard, {
    padding: "45px 10px",
    children: /*#__PURE__*/_jsx(Text, {
      textAlign: "center",
      children: !account ? /*#__PURE__*/_jsx(Trans, {
        id: "Connect to a wallet to find pools"
      }) : /*#__PURE__*/_jsx(Trans, {
        id: "Select a token to find your v2 liquidity."
      })
    })
  });

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(AppBody, {
      children: [/*#__PURE__*/_jsx(FindPoolTabs, {
        origin: (_query$get = query.get('origin')) !== null && _query$get !== void 0 ? _query$get : '/pool/v2'
      }), /*#__PURE__*/_jsxs(AutoColumn, {
        style: {
          padding: '1rem'
        },
        gap: "md",
        children: [/*#__PURE__*/_jsx(BlueCard, {
          children: /*#__PURE__*/_jsx(AutoColumn, {
            gap: "10px",
            children: /*#__PURE__*/_jsx(ThemedText.Link, {
              fontWeight: 400,
              color: 'primaryText1',
              children: /*#__PURE__*/_jsx(Trans, {
                id: "<0>Tip:</0> Use this tool to find v2 pools that don't automatically appear in the interface.",
                components: {
                  0: /*#__PURE__*/_jsx("b", {})
                }
              })
            })
          })
        }), /*#__PURE__*/_jsx(ButtonDropdownLight, {
          onClick: () => {
            setShowSearch(true);
            setActiveField(Fields.TOKEN0);
          },
          children: currency0 ? /*#__PURE__*/_jsxs(Row, {
            children: [/*#__PURE__*/_jsx(CurrencyLogo, {
              currency: currency0
            }), /*#__PURE__*/_jsx(Text, {
              fontWeight: 500,
              fontSize: 20,
              marginLeft: '12px',
              children: currency0.symbol
            })]
          }) : /*#__PURE__*/_jsx(Text, {
            fontWeight: 500,
            fontSize: 20,
            marginLeft: '12px',
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Select a token"
            })
          })
        }), /*#__PURE__*/_jsx(ColumnCenter, {
          children: /*#__PURE__*/_jsx(Plus, {
            size: "16",
            color: "#888D9B"
          })
        }), /*#__PURE__*/_jsx(ButtonDropdownLight, {
          onClick: () => {
            setShowSearch(true);
            setActiveField(Fields.TOKEN1);
          },
          children: currency1 ? /*#__PURE__*/_jsxs(Row, {
            children: [/*#__PURE__*/_jsx(CurrencyLogo, {
              currency: currency1
            }), /*#__PURE__*/_jsx(Text, {
              fontWeight: 500,
              fontSize: 20,
              marginLeft: '12px',
              children: currency1.symbol
            })]
          }) : /*#__PURE__*/_jsx(Text, {
            fontWeight: 500,
            fontSize: 20,
            marginLeft: '12px',
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Select a token"
            })
          })
        }), hasPosition && /*#__PURE__*/_jsxs(ColumnCenter, {
          style: {
            justifyItems: 'center',
            backgroundColor: '',
            padding: '12px 0px',
            borderRadius: '12px'
          },
          children: [/*#__PURE__*/_jsx(Text, {
            textAlign: "center",
            fontWeight: 500,
            children: /*#__PURE__*/_jsx(Trans, {
              id: "Pool Found!"
            })
          }), /*#__PURE__*/_jsx(StyledInternalLink, {
            to: `/pool/v2`,
            children: /*#__PURE__*/_jsx(Text, {
              textAlign: "center",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Manage this pool."
              })
            })
          })]
        }), currency0 && currency1 ? pairState === PairState.EXISTS ? hasPosition && pair ? /*#__PURE__*/_jsx(MinimalPositionCard, {
          pair: pair,
          border: "1px solid #CED0D9"
        }) : /*#__PURE__*/_jsx(LightCard, {
          padding: "45px 10px",
          children: /*#__PURE__*/_jsxs(AutoColumn, {
            gap: "sm",
            justify: "center",
            children: [/*#__PURE__*/_jsx(Text, {
              textAlign: "center",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "You don\u2019t have liquidity in this pool yet."
              })
            }), /*#__PURE__*/_jsx(StyledInternalLink, {
              to: `/add/${currencyId(currency0)}/${currencyId(currency1)}`,
              children: /*#__PURE__*/_jsx(Text, {
                textAlign: "center",
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Add liquidity."
                })
              })
            })]
          })
        }) : validPairNoLiquidity ? /*#__PURE__*/_jsx(LightCard, {
          padding: "45px 10px",
          children: /*#__PURE__*/_jsxs(AutoColumn, {
            gap: "sm",
            justify: "center",
            children: [/*#__PURE__*/_jsx(Text, {
              textAlign: "center",
              children: /*#__PURE__*/_jsx(Trans, {
                id: "No pool found."
              })
            }), /*#__PURE__*/_jsx(StyledInternalLink, {
              to: `/add/${currencyId(currency0)}/${currencyId(currency1)}`,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Create pool."
              })
            })]
          })
        }) : pairState === PairState.INVALID ? /*#__PURE__*/_jsx(LightCard, {
          padding: "45px 10px",
          children: /*#__PURE__*/_jsx(AutoColumn, {
            gap: "sm",
            justify: "center",
            children: /*#__PURE__*/_jsx(Text, {
              textAlign: "center",
              fontWeight: 500,
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Invalid pair."
              })
            })
          })
        }) : pairState === PairState.LOADING ? /*#__PURE__*/_jsx(LightCard, {
          padding: "45px 10px",
          children: /*#__PURE__*/_jsx(AutoColumn, {
            gap: "sm",
            justify: "center",
            children: /*#__PURE__*/_jsxs(Text, {
              textAlign: "center",
              children: [/*#__PURE__*/_jsx(Trans, {
                id: "Loading"
              }), /*#__PURE__*/_jsx(Dots, {})]
            })
          })
        }) : null : prerequisiteMessage]
      }), /*#__PURE__*/_jsx(CurrencySearchModal, {
        isOpen: showSearch,
        onCurrencySelect: handleCurrencySelect,
        onDismiss: handleSearchDismiss,
        showCommonBases: true,
        selectedCurrency: (_ref = activeField === Fields.TOKEN0 ? currency1 : currency0) !== null && _ref !== void 0 ? _ref : undefined
      })]
    }), /*#__PURE__*/_jsx(SwitchLocaleLink, {})]
  });
}