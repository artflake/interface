import _styled from "styled-components";
import React from 'react';
import { ExternalLink } from '../../theme';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const InfoCard = _styled.button.withConfig({
  displayName: "Option__InfoCard",
  componentId: "sc-us24id-0"
})(["background-color:", ";padding:1rem;outline:none;border:1px solid;border-radius:12px;width:100% !important;&:focus{box-shadow:0 0 0 1px ", ";}border-color:", ";"], _ref => {
  let {
    theme,
    active
  } = _ref;
  return active ? theme.bg3 : theme.bg2;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.primary1;
}, _ref3 => {
  let {
    theme,
    active
  } = _ref3;
  return active ? 'transparent' : theme.bg3;
});

const OptionCard = _styled(InfoCard).withConfig({
  displayName: "Option__OptionCard",
  componentId: "sc-us24id-1"
})(["display:flex;flex-direction:row;align-items:center;justify-content:space-between;margin-top:2rem;padding:1rem;"]);

const OptionCardLeft = _styled.div.withConfig({
  displayName: "Option__OptionCardLeft",
  componentId: "sc-us24id-2"
})(["", ";justify-content:center;height:100%;"], _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.flexColumnNoWrap;
});

const OptionCardClickable = _styled(OptionCard).withConfig({
  displayName: "Option__OptionCardClickable",
  componentId: "sc-us24id-3"
})(["margin-top:0;&:hover{cursor:", ";border:", ";}opacity:", ";"], _ref5 => {
  let {
    clickable
  } = _ref5;
  return clickable ? 'pointer' : '';
}, _ref6 => {
  let {
    clickable,
    theme
  } = _ref6;
  return clickable ? `1px solid ${theme.primary1}` : ``;
}, _ref7 => {
  let {
    disabled
  } = _ref7;
  return disabled ? '0.5' : '1';
});

const GreenCircle = _styled.div.withConfig({
  displayName: "Option__GreenCircle",
  componentId: "sc-us24id-4"
})(["", " justify-content:center;align-items:center;&:first-child{height:8px;width:8px;margin-right:8px;background-color:", ";border-radius:50%;}"], _ref8 => {
  let {
    theme
  } = _ref8;
  return theme.flexRowNoWrap;
}, _ref9 => {
  let {
    theme
  } = _ref9;
  return theme.green1;
});

const CircleWrapper = _styled.div.withConfig({
  displayName: "Option__CircleWrapper",
  componentId: "sc-us24id-5"
})(["color:", ";display:flex;justify-content:center;align-items:center;"], _ref10 => {
  let {
    theme
  } = _ref10;
  return theme.green1;
});

const HeaderText = _styled.div.withConfig({
  displayName: "Option__HeaderText",
  componentId: "sc-us24id-6"
})(["", ";color:", ";font-size:1rem;font-weight:500;"], _ref11 => {
  let {
    theme
  } = _ref11;
  return theme.flexRowNoWrap;
}, props => props.color === 'blue' ? _ref12 => {
  let {
    theme
  } = _ref12;
  return theme.primary1;
} : _ref13 => {
  let {
    theme
  } = _ref13;
  return theme.text1;
});

const SubHeader = _styled.div.withConfig({
  displayName: "Option__SubHeader",
  componentId: "sc-us24id-7"
})(["color:", ";margin-top:10px;font-size:12px;"], _ref14 => {
  let {
    theme
  } = _ref14;
  return theme.text1;
});

const IconWrapper = _styled.div.withConfig({
  displayName: "Option__IconWrapper",
  componentId: "sc-us24id-8"
})(["", ";align-items:center;justify-content:center;& > img,span{height:", ";width:", ";}", ";"], _ref15 => {
  let {
    theme
  } = _ref15;
  return theme.flexColumnNoWrap;
}, _ref16 => {
  let {
    size
  } = _ref16;
  return size ? size + 'px' : '24px';
}, _ref17 => {
  let {
    size
  } = _ref17;
  return size ? size + 'px' : '24px';
}, _ref18 => {
  let {
    theme
  } = _ref18;
  return theme.mediaWidth.upToMedium`
    align-items: flex-end;
  `;
});

export default function Option(_ref19) {
  let {
    link = null,
    clickable = true,
    size,
    onClick = null,
    color,
    header,
    subheader = null,
    icon,
    active = false,
    id
  } = _ref19;

  const content = /*#__PURE__*/_jsxs(OptionCardClickable, {
    id: id,
    onClick: onClick,
    clickable: clickable && !active,
    active: active,
    children: [/*#__PURE__*/_jsxs(OptionCardLeft, {
      children: [/*#__PURE__*/_jsxs(HeaderText, {
        color: color,
        children: [active ? /*#__PURE__*/_jsx(CircleWrapper, {
          children: /*#__PURE__*/_jsx(GreenCircle, {
            children: /*#__PURE__*/_jsx("div", {})
          })
        }) : '', header]
      }), subheader && /*#__PURE__*/_jsx(SubHeader, {
        children: subheader
      })]
    }), /*#__PURE__*/_jsx(IconWrapper, {
      size: size,
      children: /*#__PURE__*/_jsx("img", {
        src: icon,
        alt: 'Icon'
      })
    })]
  });

  if (link) {
    return /*#__PURE__*/_jsx(ExternalLink, {
      href: link,
      children: content
    });
  }

  return content;
}