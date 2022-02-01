import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { useRoutingAPIEnabled } from "../../state/user/hooks";
import { ThemedText } from "../../theme";
import { ReactComponent as AutoRouterIcon } from "../../assets/svg/auto_router.svg";
import { ReactComponent as StaticRouterIcon } from "../../assets/svg/static_route.svg";
import { jsx as _jsx } from "react/jsx-runtime";

const StyledAutoRouterIcon = _styled(AutoRouterIcon).withConfig({
  displayName: "RouterLabel__StyledAutoRouterIcon",
  componentId: "sc-1uzj9pr-0"
})(["height:16px;width:16px;:hover{filter:brightness(1.3);}"]);

const StyledStaticRouterIcon = _styled(StaticRouterIcon).withConfig({
  displayName: "RouterLabel__StyledStaticRouterIcon",
  componentId: "sc-1uzj9pr-1"
})(["height:16px;width:16px;fill:", ";:hover{filter:brightness(1.3);}"], _ref => {
  let {
    theme
  } = _ref;
  return theme.text3;
});

const StyledAutoRouterLabel = _styled(ThemedText.Black).withConfig({
  displayName: "RouterLabel__StyledAutoRouterLabel",
  componentId: "sc-1uzj9pr-2"
})(["line-height:1rem;color:", ";@supports (-webkit-background-clip:text) and (-webkit-text-fill-color:transparent){background-image:linear-gradient(90deg,#2172e5 0%,#54e521 163.16%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}"], _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.green1;
});

export function AutoRouterLogo() {
  const routingAPIEnabled = useRoutingAPIEnabled();
  return routingAPIEnabled ? /*#__PURE__*/_jsx(StyledAutoRouterIcon, {}) : /*#__PURE__*/_jsx(StyledStaticRouterIcon, {});
}
export function AutoRouterLabel() {
  const routingAPIEnabled = useRoutingAPIEnabled();
  return routingAPIEnabled ? /*#__PURE__*/_jsx(StyledAutoRouterLabel, {
    fontSize: 14,
    children: "Auto Router"
  }) : /*#__PURE__*/_jsx(ThemedText.Black, {
    fontSize: 14,
    children: /*#__PURE__*/_jsx(Trans, {
      id: "Trade Route"
    })
  });
}