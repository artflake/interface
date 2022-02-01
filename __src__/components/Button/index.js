import _styled from "styled-components";
import useTheme from "../../hooks/useTheme";
import { darken } from 'polished';
import { Check, ChevronDown } from 'react-feather';
import { Button as RebassButton } from 'rebass/styled-components';
import { RowBetween } from "../Row";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const BaseButton = _styled(RebassButton).withConfig({
  displayName: "Button__BaseButton",
  componentId: "sc-fwrjc2-0"
})(["padding:", ";width:", ";font-weight:500;text-align:center;border-radius:", ";outline:none;border:1px solid transparent;color:white;text-decoration:none;display:flex;justify-content:center;flex-wrap:nowrap;align-items:center;cursor:pointer;position:relative;z-index:1;&:disabled{cursor:auto;pointer-events:none;}will-change:transform;transition:transform 450ms ease;transform:perspective(1px) translateZ(0);> *{user-select:none;}> a{text-decoration:none;}"], _ref => {
  let {
    padding
  } = _ref;
  return padding !== null && padding !== void 0 ? padding : '16px';
}, _ref2 => {
  let {
    width
  } = _ref2;
  return width !== null && width !== void 0 ? width : '100%';
}, _ref3 => {
  let {
    $borderRadius
  } = _ref3;
  return $borderRadius !== null && $borderRadius !== void 0 ? $borderRadius : '20px';
});
export const ButtonPrimary = _styled(BaseButton).withConfig({
  displayName: "Button__ButtonPrimary",
  componentId: "sc-fwrjc2-1"
})(["background-color:", ";color:white;&:focus{box-shadow:0 0 0 1pt ", ";background-color:", ";}&:hover{background-color:", ";}&:active{box-shadow:0 0 0 1pt ", ";background-color:", ";}&:disabled{background-color:", ";color:", ";cursor:auto;box-shadow:none;border:1px solid transparent;outline:none;}"], _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.primary1;
}, _ref5 => {
  let {
    theme
  } = _ref5;
  return darken(0.05, theme.primary1);
}, _ref6 => {
  let {
    theme
  } = _ref6;
  return darken(0.05, theme.primary1);
}, _ref7 => {
  let {
    theme
  } = _ref7;
  return darken(0.05, theme.primary1);
}, _ref8 => {
  let {
    theme
  } = _ref8;
  return darken(0.1, theme.primary1);
}, _ref9 => {
  let {
    theme
  } = _ref9;
  return darken(0.1, theme.primary1);
}, _ref10 => {
  let {
    theme,
    altDisabledStyle,
    disabled
  } = _ref10;
  return altDisabledStyle ? disabled ? theme.primary1 : theme.bg2 : theme.bg2;
}, _ref11 => {
  let {
    altDisabledStyle,
    disabled,
    theme
  } = _ref11;
  return altDisabledStyle ? disabled ? theme.white : theme.text2 : theme.text2;
});
export const ButtonLight = _styled(BaseButton).withConfig({
  displayName: "Button__ButtonLight",
  componentId: "sc-fwrjc2-2"
})(["background-color:", ";color:", ";font-size:16px;font-weight:500;&:focus{box-shadow:0 0 0 1pt ", ";background-color:", ";}&:hover{background-color:", ";}&:active{box-shadow:0 0 0 1pt ", ";background-color:", ";}:disabled{opacity:0.4;:hover{cursor:auto;background-color:", ";box-shadow:none;border:1px solid transparent;outline:none;}}"], _ref12 => {
  let {
    theme
  } = _ref12;
  return theme.primary5;
}, _ref13 => {
  let {
    theme
  } = _ref13;
  return theme.primaryText1;
}, _ref14 => {
  let {
    theme,
    disabled
  } = _ref14;
  return !disabled && darken(0.03, theme.primary5);
}, _ref15 => {
  let {
    theme,
    disabled
  } = _ref15;
  return !disabled && darken(0.03, theme.primary5);
}, _ref16 => {
  let {
    theme,
    disabled
  } = _ref16;
  return !disabled && darken(0.03, theme.primary5);
}, _ref17 => {
  let {
    theme,
    disabled
  } = _ref17;
  return !disabled && darken(0.05, theme.primary5);
}, _ref18 => {
  let {
    theme,
    disabled
  } = _ref18;
  return !disabled && darken(0.05, theme.primary5);
}, _ref19 => {
  let {
    theme
  } = _ref19;
  return theme.primary5;
});
export const ButtonGray = _styled(BaseButton).withConfig({
  displayName: "Button__ButtonGray",
  componentId: "sc-fwrjc2-3"
})(["background-color:", ";color:", ";font-size:16px;font-weight:500;&:hover{background-color:", ";}&:active{background-color:", ";}"], _ref20 => {
  let {
    theme
  } = _ref20;
  return theme.bg1;
}, _ref21 => {
  let {
    theme
  } = _ref21;
  return theme.text2;
}, _ref22 => {
  let {
    theme,
    disabled
  } = _ref22;
  return !disabled && darken(0.05, theme.bg2);
}, _ref23 => {
  let {
    theme,
    disabled
  } = _ref23;
  return !disabled && darken(0.1, theme.bg2);
});
export const ButtonSecondary = _styled(BaseButton).withConfig({
  displayName: "Button__ButtonSecondary",
  componentId: "sc-fwrjc2-4"
})(["border:1px solid ", ";color:", ";background-color:transparent;font-size:16px;border-radius:12px;padding:", ";&:focus{box-shadow:0 0 0 1pt ", ";border:1px solid ", ";}&:hover{border:1px solid ", ";}&:active{box-shadow:0 0 0 1pt ", ";border:1px solid ", ";}&:disabled{opacity:50%;cursor:auto;}a:hover{text-decoration:none;}"], _ref24 => {
  let {
    theme
  } = _ref24;
  return theme.primary4;
}, _ref25 => {
  let {
    theme
  } = _ref25;
  return theme.primary1;
}, _ref26 => {
  let {
    padding
  } = _ref26;
  return padding ? padding : '10px';
}, _ref27 => {
  let {
    theme
  } = _ref27;
  return theme.primary4;
}, _ref28 => {
  let {
    theme
  } = _ref28;
  return theme.primary3;
}, _ref29 => {
  let {
    theme
  } = _ref29;
  return theme.primary3;
}, _ref30 => {
  let {
    theme
  } = _ref30;
  return theme.primary4;
}, _ref31 => {
  let {
    theme
  } = _ref31;
  return theme.primary3;
});
export const ButtonOutlined = _styled(BaseButton).withConfig({
  displayName: "Button__ButtonOutlined",
  componentId: "sc-fwrjc2-5"
})(["border:1px solid ", ";background-color:transparent;color:", ";&:focus{box-shadow:0 0 0 1px ", ";}&:hover{box-shadow:0 0 0 1px ", ";}&:active{box-shadow:0 0 0 1px ", ";}&:disabled{opacity:50%;cursor:auto;}"], _ref32 => {
  let {
    theme
  } = _ref32;
  return theme.bg2;
}, _ref33 => {
  let {
    theme
  } = _ref33;
  return theme.text1;
}, _ref34 => {
  let {
    theme
  } = _ref34;
  return theme.bg4;
}, _ref35 => {
  let {
    theme
  } = _ref35;
  return theme.bg4;
}, _ref36 => {
  let {
    theme
  } = _ref36;
  return theme.bg4;
});
export const ButtonYellow = _styled(BaseButton).withConfig({
  displayName: "Button__ButtonYellow",
  componentId: "sc-fwrjc2-6"
})(["background-color:", ";color:white;&:focus{box-shadow:0 0 0 1pt ", ";background-color:", ";}&:hover{background-color:", ";}&:active{box-shadow:0 0 0 1pt ", ";background-color:", ";}&:disabled{background-color:", ";opacity:50%;cursor:auto;}"], _ref37 => {
  let {
    theme
  } = _ref37;
  return theme.yellow3;
}, _ref38 => {
  let {
    theme
  } = _ref38;
  return darken(0.05, theme.yellow3);
}, _ref39 => {
  let {
    theme
  } = _ref39;
  return darken(0.05, theme.yellow3);
}, _ref40 => {
  let {
    theme
  } = _ref40;
  return darken(0.05, theme.yellow3);
}, _ref41 => {
  let {
    theme
  } = _ref41;
  return darken(0.1, theme.yellow3);
}, _ref42 => {
  let {
    theme
  } = _ref42;
  return darken(0.1, theme.yellow3);
}, _ref43 => {
  let {
    theme
  } = _ref43;
  return theme.yellow3;
});
export const ButtonEmpty = _styled(BaseButton).withConfig({
  displayName: "Button__ButtonEmpty",
  componentId: "sc-fwrjc2-7"
})(["background-color:transparent;color:", ";display:flex;justify-content:center;align-items:center;&:focus{text-decoration:underline;}&:hover{text-decoration:none;}&:active{text-decoration:none;}&:disabled{opacity:50%;cursor:auto;}"], _ref44 => {
  let {
    theme
  } = _ref44;
  return theme.primary1;
});
export const ButtonText = _styled(BaseButton).withConfig({
  displayName: "Button__ButtonText",
  componentId: "sc-fwrjc2-8"
})(["padding:0;width:fit-content;background:none;text-decoration:none;&:focus{text-decoration:underline;}&:hover{opacity:0.9;}&:active{text-decoration:underline;}&:disabled{opacity:50%;cursor:auto;}"]);

const ButtonConfirmedStyle = _styled(BaseButton).withConfig({
  displayName: "Button__ButtonConfirmedStyle",
  componentId: "sc-fwrjc2-9"
})(["background-color:", ";color:", ";&:disabled{background-color:", ";color:", ";cursor:auto;}"], _ref45 => {
  let {
    theme
  } = _ref45;
  return theme.bg3;
}, _ref46 => {
  let {
    theme
  } = _ref46;
  return theme.text1;
}, _ref47 => {
  let {
    theme
  } = _ref47;
  return theme.bg2;
}, _ref48 => {
  let {
    theme
  } = _ref48;
  return theme.text2;
});

const ButtonErrorStyle = _styled(BaseButton).withConfig({
  displayName: "Button__ButtonErrorStyle",
  componentId: "sc-fwrjc2-10"
})(["background-color:", ";border:1px solid ", ";&:focus{box-shadow:0 0 0 1pt ", ";background-color:", ";}&:hover{background-color:", ";}&:active{box-shadow:0 0 0 1pt ", ";background-color:", ";}&:disabled{opacity:50%;cursor:auto;box-shadow:none;background-color:", ";border:1px solid ", ";}"], _ref49 => {
  let {
    theme
  } = _ref49;
  return theme.red1;
}, _ref50 => {
  let {
    theme
  } = _ref50;
  return theme.red1;
}, _ref51 => {
  let {
    theme
  } = _ref51;
  return darken(0.05, theme.red1);
}, _ref52 => {
  let {
    theme
  } = _ref52;
  return darken(0.05, theme.red1);
}, _ref53 => {
  let {
    theme
  } = _ref53;
  return darken(0.05, theme.red1);
}, _ref54 => {
  let {
    theme
  } = _ref54;
  return darken(0.1, theme.red1);
}, _ref55 => {
  let {
    theme
  } = _ref55;
  return darken(0.1, theme.red1);
}, _ref56 => {
  let {
    theme
  } = _ref56;
  return theme.red1;
}, _ref57 => {
  let {
    theme
  } = _ref57;
  return theme.red1;
});

export function ButtonConfirmed(_ref58) {
  let {
    confirmed,
    altDisabledStyle,
    ...rest
  } = _ref58;

  if (confirmed) {
    return /*#__PURE__*/_jsx(ButtonConfirmedStyle, { ...rest
    });
  } else {
    return /*#__PURE__*/_jsx(ButtonPrimary, { ...rest,
      altDisabledStyle: altDisabledStyle
    });
  }
}
export function ButtonError(_ref59) {
  let {
    error,
    ...rest
  } = _ref59;

  if (error) {
    return /*#__PURE__*/_jsx(ButtonErrorStyle, { ...rest
    });
  } else {
    return /*#__PURE__*/_jsx(ButtonPrimary, { ...rest
    });
  }
}
export function ButtonDropdown(_ref60) {
  let {
    disabled = false,
    children,
    ...rest
  } = _ref60;
  return /*#__PURE__*/_jsx(ButtonPrimary, { ...rest,
    disabled: disabled,
    children: /*#__PURE__*/_jsxs(RowBetween, {
      children: [/*#__PURE__*/_jsx("div", {
        style: {
          display: 'flex',
          alignItems: 'center'
        },
        children: children
      }), /*#__PURE__*/_jsx(ChevronDown, {
        size: 24
      })]
    })
  });
}
export function ButtonDropdownLight(_ref61) {
  let {
    disabled = false,
    children,
    ...rest
  } = _ref61;
  return /*#__PURE__*/_jsx(ButtonOutlined, { ...rest,
    disabled: disabled,
    children: /*#__PURE__*/_jsxs(RowBetween, {
      children: [/*#__PURE__*/_jsx("div", {
        style: {
          display: 'flex',
          alignItems: 'center'
        },
        children: children
      }), /*#__PURE__*/_jsx(ChevronDown, {
        size: 24
      })]
    })
  });
}

const ActiveOutlined = _styled(ButtonOutlined).withConfig({
  displayName: "Button__ActiveOutlined",
  componentId: "sc-fwrjc2-11"
})(["border:1px solid;border-color:", ";"], _ref62 => {
  let {
    theme
  } = _ref62;
  return theme.primary1;
});

const Circle = _styled.div.withConfig({
  displayName: "Button__Circle",
  componentId: "sc-fwrjc2-12"
})(["height:17px;width:17px;border-radius:50%;background-color:", ";display:flex;align-items:center;justify-content:center;"], _ref63 => {
  let {
    theme
  } = _ref63;
  return theme.primary1;
});

const CheckboxWrapper = _styled.div.withConfig({
  displayName: "Button__CheckboxWrapper",
  componentId: "sc-fwrjc2-13"
})(["width:20px;padding:0 10px;position:absolute;top:11px;right:15px;"]);

const ResponsiveCheck = _styled(Check).withConfig({
  displayName: "Button__ResponsiveCheck",
  componentId: "sc-fwrjc2-14"
})(["size:13px;"]);

export function ButtonRadioChecked(_ref64) {
  let {
    active = false,
    children,
    ...rest
  } = _ref64;
  const theme = useTheme();

  if (!active) {
    return /*#__PURE__*/_jsx(ButtonOutlined, {
      $borderRadius: "12px",
      padding: "12px 8px",
      ...rest,
      children: /*#__PURE__*/_jsx(RowBetween, {
        children: children
      })
    });
  } else {
    return /*#__PURE__*/_jsx(ActiveOutlined, { ...rest,
      padding: "12px 8px",
      $borderRadius: "12px",
      children: /*#__PURE__*/_jsxs(RowBetween, {
        children: [children, /*#__PURE__*/_jsx(CheckboxWrapper, {
          children: /*#__PURE__*/_jsx(Circle, {
            children: /*#__PURE__*/_jsx(ResponsiveCheck, {
              size: 13,
              stroke: theme.white
            })
          })
        })]
      })
    });
  }
}