import _styled from "styled-components";
import { Trans } from "@lingui/react";
import useTheme from "../../hooks/useTheme";
import { darken } from 'polished';
import { ArrowLeft } from 'react-feather';
import { Link as HistoryLink, NavLink, useLocation } from 'react-router-dom';
import { Box } from 'rebass';
import { useAppDispatch } from "../../state/hooks";
import { resetMintState } from "../../state/mint/actions";
import { resetMintState as resetMintV3State } from "../../state/mint/v3/actions";
import { ThemedText } from "../../theme";
import Row, { RowBetween } from "../Row";
import SettingsTab from "../Settings";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const Tabs = _styled.div.withConfig({
  displayName: "NavigationTabs__Tabs",
  componentId: "sc-iwajx4-0"
})(["", " align-items:center;border-radius:3rem;justify-content:space-evenly;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.flexRowNoWrap;
});

const activeClassName = 'ACTIVE';

const StyledNavLink = _styled(NavLink).attrs({
  activeClassName
}).withConfig({
  displayName: "NavigationTabs__StyledNavLink",
  componentId: "sc-iwajx4-1"
})(["", " align-items:center;justify-content:center;height:3rem;border-radius:3rem;outline:none;cursor:pointer;text-decoration:none;color:", ";font-size:20px;&.", "{border-radius:12px;font-weight:500;color:", ";}:hover,:focus{color:", ";}"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.flexRowNoWrap;
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.text3;
}, activeClassName, _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.text1;
}, _ref5 => {
  let {
    theme
  } = _ref5;
  return darken(0.1, theme.text1);
});

const StyledHistoryLink = _styled(HistoryLink).withConfig({
  displayName: "NavigationTabs__StyledHistoryLink",
  componentId: "sc-iwajx4-2"
})(["flex:", ";", ";"], _ref6 => {
  let {
    flex
  } = _ref6;
  return flex !== null && flex !== void 0 ? flex : 'none';
}, _ref7 => {
  let {
    theme
  } = _ref7;
  return theme.mediaWidth.upToMedium`
    flex: none;
    margin-right: 10px;
  `;
});

const ActiveText = _styled.div.withConfig({
  displayName: "NavigationTabs__ActiveText",
  componentId: "sc-iwajx4-3"
})(["font-weight:500;font-size:20px;"]);

const StyledArrowLeft = _styled(ArrowLeft).withConfig({
  displayName: "NavigationTabs__StyledArrowLeft",
  componentId: "sc-iwajx4-4"
})(["color:", ";"], _ref8 => {
  let {
    theme
  } = _ref8;
  return theme.text1;
});

export function SwapPoolTabs(_ref9) {
  let {
    active
  } = _ref9;
  return /*#__PURE__*/_jsxs(Tabs, {
    style: {
      marginBottom: '20px',
      display: 'none',
      padding: '1rem 1rem 0 1rem'
    },
    children: [/*#__PURE__*/_jsx(StyledNavLink, {
      id: `swap-nav-link`,
      to: '/swap',
      isActive: () => active === 'swap',
      children: /*#__PURE__*/_jsx(Trans, {
        id: "Swap"
      })
    }), /*#__PURE__*/_jsx(StyledNavLink, {
      id: `pool-nav-link`,
      to: '/pool',
      isActive: () => active === 'pool',
      children: /*#__PURE__*/_jsx(Trans, {
        id: "Pool"
      })
    })]
  });
}
export function FindPoolTabs(_ref10) {
  let {
    origin
  } = _ref10;
  return /*#__PURE__*/_jsx(Tabs, {
    children: /*#__PURE__*/_jsxs(RowBetween, {
      style: {
        padding: '1rem 1rem 0 1rem',
        position: 'relative'
      },
      children: [/*#__PURE__*/_jsx(HistoryLink, {
        to: origin,
        children: /*#__PURE__*/_jsx(StyledArrowLeft, {})
      }), /*#__PURE__*/_jsx(ActiveText, {
        style: {
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)'
        },
        children: /*#__PURE__*/_jsx(Trans, {
          id: "Import V2 Pool"
        })
      })]
    })
  });
}
export function AddRemoveTabs(_ref11) {
  let {
    adding,
    creating,
    defaultSlippage,
    positionID,
    children
  } = _ref11;
  const theme = useTheme(); // reset states on back

  const dispatch = useAppDispatch();
  const location = useLocation(); // detect if back should redirect to v3 or v2 pool page

  const poolLink = location.pathname.includes('add/v2') ? '/pool/v2' : '/pool' + (!!positionID ? `/${positionID.toString()}` : '');
  return /*#__PURE__*/_jsx(Tabs, {
    children: /*#__PURE__*/_jsxs(RowBetween, {
      style: {
        padding: '1rem 1rem 0 1rem'
      },
      children: [/*#__PURE__*/_jsx(StyledHistoryLink, {
        to: poolLink,
        onClick: () => {
          if (adding) {
            // not 100% sure both of these are needed
            dispatch(resetMintState());
            dispatch(resetMintV3State());
          }
        },
        flex: children ? '1' : undefined,
        children: /*#__PURE__*/_jsx(StyledArrowLeft, {
          stroke: theme.text2
        })
      }), /*#__PURE__*/_jsx(ThemedText.MediumHeader, {
        fontWeight: 500,
        fontSize: 20,
        style: {
          flex: '1',
          margin: 'auto',
          textAlign: children ? 'start' : 'center'
        },
        children: creating ? /*#__PURE__*/_jsx(Trans, {
          id: "Create a pair"
        }) : adding ? /*#__PURE__*/_jsx(Trans, {
          id: "Add Liquidity"
        }) : /*#__PURE__*/_jsx(Trans, {
          id: "Remove Liquidity"
        })
      }), /*#__PURE__*/_jsx(Box, {
        style: {
          marginRight: '.5rem'
        },
        children: children
      }), /*#__PURE__*/_jsx(SettingsTab, {
        placeholderSlippage: defaultSlippage
      })]
    })
  });
}
export function CreateProposalTabs() {
  return /*#__PURE__*/_jsx(Tabs, {
    children: /*#__PURE__*/_jsxs(Row, {
      style: {
        padding: '1rem 1rem 0 1rem'
      },
      children: [/*#__PURE__*/_jsx(HistoryLink, {
        to: "/vote",
        children: /*#__PURE__*/_jsx(StyledArrowLeft, {})
      }), /*#__PURE__*/_jsx(ActiveText, {
        style: {
          marginLeft: 'auto',
          marginRight: 'auto'
        },
        children: "Create Proposal"
      })]
    })
  });
}