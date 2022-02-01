import { keyframes as _keyframes } from "styled-components";
import _styled from "styled-components";
import React from 'react';
import { ArrowLeft, ExternalLink as LinkIconFeather, Trash, X } from 'react-feather';
import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';
import { anonymizeLink } from "../utils/anonymizeLink";
import { jsx as _jsx } from "react/jsx-runtime";
export const ButtonText = _styled.button.withConfig({
  displayName: "components__ButtonText",
  componentId: "sc-1cchcrx-0"
})(["outline:none;border:none;font-size:inherit;padding:0;margin:0;background:none;cursor:pointer;:hover{opacity:0.7;}:focus{text-decoration:underline;}"]);
export const CloseIcon = _styled(X).withConfig({
  displayName: "components__CloseIcon",
  componentId: "sc-1cchcrx-1"
})(["cursor:pointer;"]); // for wrapper react feather icons

export const IconWrapper = _styled.div.withConfig({
  displayName: "components__IconWrapper",
  componentId: "sc-1cchcrx-2"
})(["display:flex;align-items:center;justify-content:center;width:", ";height:", ";margin-right:", ";margin-left:", ";& > *{stroke:", ";}"], _ref => {
  let {
    size
  } = _ref;
  return size !== null && size !== void 0 ? size : '20px';
}, _ref2 => {
  let {
    size
  } = _ref2;
  return size !== null && size !== void 0 ? size : '20px';
}, _ref3 => {
  let {
    marginRight
  } = _ref3;
  return marginRight !== null && marginRight !== void 0 ? marginRight : 0;
}, _ref4 => {
  let {
    marginLeft
  } = _ref4;
  return marginLeft !== null && marginLeft !== void 0 ? marginLeft : 0;
}, _ref5 => {
  let {
    theme,
    stroke
  } = _ref5;
  return stroke !== null && stroke !== void 0 ? stroke : theme.blue1;
}); // A button that triggers some onClick result, but looks like a link.

export const LinkStyledButton = _styled.button.withConfig({
  displayName: "components__LinkStyledButton",
  componentId: "sc-1cchcrx-3"
})(["border:none;text-decoration:none;background:none;cursor:", ";color:", ";font-weight:500;:hover{text-decoration:", ";}:focus{outline:none;text-decoration:", ";}:active{text-decoration:none;}"], _ref6 => {
  let {
    disabled
  } = _ref6;
  return disabled ? 'default' : 'pointer';
}, _ref7 => {
  let {
    theme,
    disabled
  } = _ref7;
  return disabled ? theme.text2 : theme.primary1;
}, _ref8 => {
  let {
    disabled
  } = _ref8;
  return disabled ? null : 'underline';
}, _ref9 => {
  let {
    disabled
  } = _ref9;
  return disabled ? null : 'underline';
}); // An internal link from the react-router-dom library that is correctly styled

export const StyledInternalLink = _styled(Link).withConfig({
  displayName: "components__StyledInternalLink",
  componentId: "sc-1cchcrx-4"
})(["text-decoration:none;cursor:pointer;color:", ";font-weight:500;:hover{text-decoration:underline;}:focus{outline:none;text-decoration:underline;}:active{text-decoration:none;}"], _ref10 => {
  let {
    theme
  } = _ref10;
  return theme.primary1;
});

const StyledLink = _styled.a.withConfig({
  displayName: "components__StyledLink",
  componentId: "sc-1cchcrx-5"
})(["text-decoration:none;cursor:pointer;color:", ";font-weight:500;:hover{text-decoration:underline;}:focus{outline:none;text-decoration:underline;}:active{text-decoration:none;}"], _ref11 => {
  let {
    theme
  } = _ref11;
  return theme.primary1;
});

const LinkIconWrapper = _styled.a.withConfig({
  displayName: "components__LinkIconWrapper",
  componentId: "sc-1cchcrx-6"
})(["text-decoration:none;cursor:pointer;align-items:center;justify-content:center;display:flex;:hover{text-decoration:none;opacity:0.7;}:focus{outline:none;text-decoration:none;}:active{text-decoration:none;}"]);

const LinkIcon = _styled(LinkIconFeather).withConfig({
  displayName: "components__LinkIcon",
  componentId: "sc-1cchcrx-7"
})(["height:16px;width:18px;margin-left:10px;stroke:", ";"], _ref12 => {
  let {
    theme
  } = _ref12;
  return theme.blue1;
});

export const TrashIcon = _styled(Trash).withConfig({
  displayName: "components__TrashIcon",
  componentId: "sc-1cchcrx-8"
})(["height:16px;width:18px;margin-left:10px;stroke:", ";cursor:pointer;align-items:center;justify-content:center;display:flex;:hover{opacity:0.7;}"], _ref13 => {
  let {
    theme
  } = _ref13;
  return theme.text3;
});
const rotateImg = _keyframes`
  0% {
    transform: perspective(1000px) rotateY(0deg);
  }

  100% {
    transform: perspective(1000px) rotateY(360deg);
  }
`;
export const UniTokenAnimated = _styled.img.withConfig({
  displayName: "components__UniTokenAnimated",
  componentId: "sc-1cchcrx-9"
})(["animation:", " 5s cubic-bezier(0.83,0,0.17,1) infinite;padding:2rem 0 0 0;filter:drop-shadow(0px 2px 4px rgba(0,0,0,0.15));"], rotateImg);

function handleClickExternalLink(event) {
  const {
    target,
    href
  } = event.currentTarget;
  const anonymizedHref = anonymizeLink(href); // don't prevent default, don't redirect if it's a new tab

  if (target === '_blank' || event.ctrlKey || event.metaKey) {
    ReactGA.outboundLink({
      label: anonymizedHref
    }, () => {
      console.debug('Fired outbound link event', anonymizedHref);
    });
  } else {
    event.preventDefault(); // send a ReactGA event and then trigger a location change

    ReactGA.outboundLink({
      label: anonymizedHref
    }, () => {
      window.location.href = anonymizedHref;
    });
  }
}
/**
 * Outbound link that handles firing google analytics events
 */


export function ExternalLink(_ref14) {
  let {
    target = '_blank',
    href,
    rel = 'noopener noreferrer',
    ...rest
  } = _ref14;
  return /*#__PURE__*/_jsx(StyledLink, {
    target: target,
    rel: rel,
    href: href,
    onClick: handleClickExternalLink,
    ...rest
  });
}
export function ExternalLinkIcon(_ref15) {
  let {
    target = '_blank',
    href,
    rel = 'noopener noreferrer',
    ...rest
  } = _ref15;
  return /*#__PURE__*/_jsx(LinkIconWrapper, {
    target: target,
    rel: rel,
    href: href,
    onClick: handleClickExternalLink,
    ...rest,
    children: /*#__PURE__*/_jsx(LinkIcon, {})
  });
}
const rotate = _keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = _styled.img.withConfig({
  displayName: "components__Spinner",
  componentId: "sc-1cchcrx-10"
})(["animation:2s ", " linear infinite;width:16px;height:16px;"], rotate);

const BackArrowLink = _styled(StyledInternalLink).withConfig({
  displayName: "components__BackArrowLink",
  componentId: "sc-1cchcrx-11"
})(["color:", ";"], _ref16 => {
  let {
    theme
  } = _ref16;
  return theme.text1;
});

export function BackArrow(_ref17) {
  let {
    to
  } = _ref17;
  return /*#__PURE__*/_jsx(BackArrowLink, {
    to: to,
    children: /*#__PURE__*/_jsx(ArrowLeft, {})
  });
}
export const CustomLightSpinner = _styled(Spinner).withConfig({
  displayName: "components__CustomLightSpinner",
  componentId: "sc-1cchcrx-12"
})(["height:", ";width:", ";"], _ref18 => {
  let {
    size
  } = _ref18;
  return size;
}, _ref19 => {
  let {
    size
  } = _ref19;
  return size;
});
export const HideSmall = _styled.span.withConfig({
  displayName: "components__HideSmall",
  componentId: "sc-1cchcrx-13"
})(["", ";"], _ref20 => {
  let {
    theme
  } = _ref20;
  return theme.mediaWidth.upToSmall`
    display: none;
  `;
});
export const HideExtraSmall = _styled.span.withConfig({
  displayName: "components__HideExtraSmall",
  componentId: "sc-1cchcrx-14"
})(["", ";"], _ref21 => {
  let {
    theme
  } = _ref21;
  return theme.mediaWidth.upToExtraSmall`
    display: none;
  `;
});
export const SmallOnly = _styled.span.withConfig({
  displayName: "components__SmallOnly",
  componentId: "sc-1cchcrx-15"
})(["display:none;", ";"], _ref22 => {
  let {
    theme
  } = _ref22;
  return theme.mediaWidth.upToSmall`
    display: block;
  `;
});