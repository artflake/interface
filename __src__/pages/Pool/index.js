import { ThemeContext as _ThemeContext } from "styled-components";
import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { ButtonGray, ButtonOutlined, ButtonPrimary } from "../../components/Button";
import { AutoColumn } from "../../components/Column";
import DowntimeWarning from "../../components/DowntimeWarning";
import { FlyoutAlignment, NewMenu } from "../../components/Menu";
import { SwapPoolTabs } from "../../components/NavigationTabs";
import { NetworkAlert } from "../../components/NetworkAlert/NetworkAlert";
import PositionList from "../../components/PositionList";
import { RowBetween, RowFixed } from "../../components/Row";
import { SwitchLocaleLink } from "../../components/SwitchLocaleLink";
import { L2_CHAIN_IDS } from "../../constants/chains";
import { useV3Positions } from "../../hooks/useV3Positions";
import { useActiveWeb3React } from "../../hooks/web3";
import { useContext } from 'react';
import { BookOpen, ChevronDown, ChevronsRight, Inbox, Layers, PlusCircle } from 'react-feather';
import { Link } from 'react-router-dom';
import { useWalletModalToggle } from "../../state/application/hooks";
import { useUserHideClosedPositions } from "../../state/user/hooks";
import { HideSmall, ThemedText } from "../../theme";
import CTACards from "./CTACards";
import { LoadingRows } from "./styleds";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

const PageWrapper = _styled(AutoColumn).withConfig({
  displayName: "Pool__PageWrapper",
  componentId: "sc-sqfwcm-0"
})(["max-width:870px;width:100%;", ";", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.mediaWidth.upToMedium`
    max-width: 800px;
  `;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.mediaWidth.upToSmall`
    max-width: 500px;
  `;
});

const TitleRow = _styled(RowBetween).withConfig({
  displayName: "Pool__TitleRow",
  componentId: "sc-sqfwcm-1"
})(["color:", ";", ";"], _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.text2;
}, _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
  `;
});

const ButtonRow = _styled(RowFixed).withConfig({
  displayName: "Pool__ButtonRow",
  componentId: "sc-sqfwcm-2"
})(["& > *:not(:last-child){margin-left:8px;}", ";"], _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.mediaWidth.upToSmall`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    flex-direction: row-reverse;
  `;
});

const Menu = _styled(NewMenu).withConfig({
  displayName: "Pool__Menu",
  componentId: "sc-sqfwcm-3"
})(["margin-left:0;", ";a{width:100%;}"], _ref6 => {
  let {
    theme
  } = _ref6;
  return theme.mediaWidth.upToSmall`
    flex: 1 1 auto;
    width: 49%;
    right: 0px;
  `;
});

const MenuItem = _styled.div.withConfig({
  displayName: "Pool__MenuItem",
  componentId: "sc-sqfwcm-4"
})(["align-items:center;display:flex;justify-content:space-between;width:100%;font-weight:500;"]);

const MoreOptionsButton = _styled(ButtonGray).withConfig({
  displayName: "Pool__MoreOptionsButton",
  componentId: "sc-sqfwcm-5"
})(["border-radius:12px;flex:1 1 auto;padding:6px 8px;width:100%;background-color:", ";margin-right:8px;"], _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.bg0;
});

const NoLiquidity = _styled.div.withConfig({
  displayName: "Pool__NoLiquidity",
  componentId: "sc-sqfwcm-6"
})(["align-items:center;display:flex;flex-direction:column;justify-content:center;margin:auto;max-width:300px;min-height:25vh;"]);

const ResponsiveButtonPrimary = _styled(ButtonPrimary).withConfig({
  displayName: "Pool__ResponsiveButtonPrimary",
  componentId: "sc-sqfwcm-7"
})(["border-radius:12px;padding:6px 8px;width:fit-content;", ";"], _ref8 => {
  let {
    theme
  } = _ref8;
  return theme.mediaWidth.upToSmall`
    flex: 1 1 auto;
    width: 100%;
  `;
});

const MainContentWrapper = _styled.main.withConfig({
  displayName: "Pool__MainContentWrapper",
  componentId: "sc-sqfwcm-8"
})(["background-color:", ";padding:8px;border-radius:20px;display:flex;flex-direction:column;"], _ref9 => {
  let {
    theme
  } = _ref9;
  return theme.bg0;
});

const ShowInactiveToggle = _styled.div.withConfig({
  displayName: "Pool__ShowInactiveToggle",
  componentId: "sc-sqfwcm-9"
})(["display:flex;align-items:center;justify-items:end;grid-column-gap:4px;padding:0 8px;", ";"], _ref10 => {
  let {
    theme
  } = _ref10;
  return theme.mediaWidth.upToMedium`
    margin-bottom: 12px;
  `;
});

const ResponsiveRow = _styled(RowFixed).withConfig({
  displayName: "Pool__ResponsiveRow",
  componentId: "sc-sqfwcm-10"
})(["justify-content:space-between;width:100%;", ";"], _ref11 => {
  let {
    theme
  } = _ref11;
  return theme.mediaWidth.upToMedium`
    flex-direction: column-reverse;
  `;
});

export default function Pool() {
  var _positions$reduce;

  const {
    account,
    chainId
  } = useActiveWeb3React();
  const toggleWalletModal = useWalletModalToggle();
  const theme = useContext(_ThemeContext);
  const [userHideClosedPositions, setUserHideClosedPositions] = useUserHideClosedPositions();
  const {
    positions,
    loading: positionsLoading
  } = useV3Positions(account);
  const [openPositions, closedPositions] = (_positions$reduce = positions === null || positions === void 0 ? void 0 : positions.reduce((acc, p) => {
    var _p$liquidity;

    acc[(_p$liquidity = p.liquidity) !== null && _p$liquidity !== void 0 && _p$liquidity.isZero() ? 1 : 0].push(p);
    return acc;
  }, [[], []])) !== null && _positions$reduce !== void 0 ? _positions$reduce : [[], []];
  const filteredPositions = [...openPositions, ...(userHideClosedPositions ? [] : closedPositions)];
  const showConnectAWallet = Boolean(!account);
  const showV2Features = !!chainId && !L2_CHAIN_IDS.includes(chainId);
  const menuItems = [{
    content: /*#__PURE__*/_jsxs(MenuItem, {
      children: [/*#__PURE__*/_jsx(Trans, {
        id: "Create a pool"
      }), /*#__PURE__*/_jsx(PlusCircle, {
        size: 16
      })]
    }),
    link: '/add/ETH',
    external: false
  }, {
    content: /*#__PURE__*/_jsxs(MenuItem, {
      children: [/*#__PURE__*/_jsx(Trans, {
        id: "Migrate"
      }), /*#__PURE__*/_jsx(ChevronsRight, {
        size: 16
      })]
    }),
    link: '/migrate/v2',
    external: false
  }, {
    content: /*#__PURE__*/_jsxs(MenuItem, {
      children: [/*#__PURE__*/_jsx(Trans, {
        id: "V2 liquidity"
      }), /*#__PURE__*/_jsx(Layers, {
        size: 16
      })]
    }),
    link: '/pool/v2',
    external: false
  }, {
    content: /*#__PURE__*/_jsxs(MenuItem, {
      children: [/*#__PURE__*/_jsx(Trans, {
        id: "Learn"
      }), /*#__PURE__*/_jsx(BookOpen, {
        size: 16
      })]
    }),
    link: 'https://docs.uniswap.org/',
    external: true
  }];
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(PageWrapper, {
      children: [/*#__PURE__*/_jsx(SwapPoolTabs, {
        active: 'pool'
      }), /*#__PURE__*/_jsx(AutoColumn, {
        gap: "lg",
        justify: "center",
        children: /*#__PURE__*/_jsxs(AutoColumn, {
          gap: "lg",
          style: {
            width: '100%'
          },
          children: [/*#__PURE__*/_jsxs(TitleRow, {
            style: {
              marginTop: '1rem'
            },
            padding: '0',
            children: [/*#__PURE__*/_jsx(ThemedText.Body, {
              fontSize: '20px',
              children: /*#__PURE__*/_jsx(Trans, {
                id: "Pools Overview"
              })
            }), /*#__PURE__*/_jsxs(ButtonRow, {
              children: [showV2Features && /*#__PURE__*/_jsx(Menu, {
                menuItems: menuItems,
                flyoutAlignment: FlyoutAlignment.LEFT,
                ToggleUI: props => /*#__PURE__*/_jsx(MoreOptionsButton, { ...props,
                  children: /*#__PURE__*/_jsxs(ThemedText.Body, {
                    style: {
                      alignItems: 'center',
                      display: 'flex'
                    },
                    children: [/*#__PURE__*/_jsx(Trans, {
                      id: "More"
                    }), /*#__PURE__*/_jsx(ChevronDown, {
                      size: 15
                    })]
                  })
                })
              }), /*#__PURE__*/_jsxs(ResponsiveButtonPrimary, {
                id: "join-pool-button",
                as: Link,
                to: "/add/ETH",
                children: ["+ ", /*#__PURE__*/_jsx(Trans, {
                  id: "New Position"
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs(HideSmall, {
            children: [/*#__PURE__*/_jsx(NetworkAlert, {
              thin: true
            }), /*#__PURE__*/_jsx(DowntimeWarning, {}), /*#__PURE__*/_jsx(CTACards, {})]
          }), /*#__PURE__*/_jsx(MainContentWrapper, {
            children: positionsLoading ? /*#__PURE__*/_jsxs(LoadingRows, {
              children: [/*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {}), /*#__PURE__*/_jsx("div", {})]
            }) : filteredPositions && filteredPositions.length > 0 ? /*#__PURE__*/_jsx(PositionList, {
              positions: filteredPositions
            }) : /*#__PURE__*/_jsxs(NoLiquidity, {
              children: [/*#__PURE__*/_jsxs(ThemedText.Body, {
                color: theme.text3,
                textAlign: "center",
                children: [/*#__PURE__*/_jsx(Inbox, {
                  size: 48,
                  strokeWidth: 1,
                  style: {
                    marginBottom: '.5rem'
                  }
                }), /*#__PURE__*/_jsx("div", {
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Your V3 liquidity positions will appear here."
                  })
                })]
              }), showConnectAWallet && /*#__PURE__*/_jsx(ButtonPrimary, {
                style: {
                  marginTop: '2em',
                  padding: '8px 16px'
                },
                onClick: toggleWalletModal,
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Connect a wallet"
                })
              })]
            })
          }), /*#__PURE__*/_jsxs(ResponsiveRow, {
            children: [showV2Features && /*#__PURE__*/_jsxs(RowFixed, {
              children: [/*#__PURE__*/_jsxs(ButtonOutlined, {
                as: Link,
                to: "/pool/v2",
                id: "import-pool-link",
                style: {
                  padding: '8px 16px',
                  margin: '0 4px',
                  borderRadius: '12px',
                  width: 'fit-content',
                  fontSize: '14px'
                },
                children: [/*#__PURE__*/_jsx(Layers, {
                  size: 14,
                  style: {
                    marginRight: '8px'
                  }
                }), /*#__PURE__*/_jsx(Trans, {
                  id: "View V2 Liquidity"
                })]
              }), positions && positions.length > 0 && /*#__PURE__*/_jsxs(ButtonOutlined, {
                as: Link,
                to: "/migrate/v2",
                id: "import-pool-link",
                style: {
                  padding: '8px 16px',
                  margin: '0 4px',
                  borderRadius: '12px',
                  width: 'fit-content',
                  fontSize: '14px'
                },
                children: [/*#__PURE__*/_jsx(ChevronsRight, {
                  size: 16,
                  style: {
                    marginRight: '8px'
                  }
                }), /*#__PURE__*/_jsx(Trans, {
                  id: "Migrate Liquidity"
                })]
              })]
            }), closedPositions.length > 0 ? /*#__PURE__*/_jsxs(ShowInactiveToggle, {
              children: [/*#__PURE__*/_jsx("label", {
                children: /*#__PURE__*/_jsx(ThemedText.Body, {
                  onClick: () => setUserHideClosedPositions(!userHideClosedPositions),
                  children: /*#__PURE__*/_jsx(Trans, {
                    id: "Show closed positions"
                  })
                })
              }), /*#__PURE__*/_jsx("input", {
                type: "checkbox",
                onClick: () => setUserHideClosedPositions(!userHideClosedPositions),
                checked: !userHideClosedPositions
              })]
            }) : null]
          })]
        })
      })]
    }), /*#__PURE__*/_jsx(SwitchLocaleLink, {})]
  });
}