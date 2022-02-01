import { ThemeProvider as _ThemeProvider } from "styled-components";
import { css as _css } from "styled-components";
import { createGlobalStyle as _createGlobalStyle } from "styled-components";
import _styled from "styled-components";
import React, { useMemo } from 'react';
import { Text } from 'rebass';
import { useIsDarkMode } from '../state/user/hooks';
import { jsx as _jsx } from "react/jsx-runtime";
export * from './components';
export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280
}; // Migrating to a standard z-index system https://getbootstrap.com/docs/5.0/layout/z-index/
// Please avoid using deprecated numbers

export let Z_INDEX;

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
  ;

  accumulator[size] = (a, b, c) => _css`
      @media (max-width: ${MEDIA_WIDTHS[size]}px) {
        ${_css(a, b, c)}
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
    blue4: darkMode ? '#153d6f70' : '#C4D9F8' // blue5: darkMode ? '#153d6f70' : '#EBF4FF',

  };
}

function theme(darkMode) {
  return { ...colors(darkMode),
    grids: {
      sm: 8,
      md: 12,
      lg: 24
    },
    //shadows
    shadow1: darkMode ? '#000' : '#2F80ED',
    // media queries
    mediaWidth: mediaWidthTemplates,
    // css snippets
    flexColumnNoWrap: _css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: _css`
      display: flex;
      flex-flow: row nowrap;
    `
  };
}

export default function ThemeProvider(_ref) {
  let {
    children
  } = _ref;
  const darkMode = useIsDarkMode();
  const themeObject = useMemo(() => theme(darkMode), [darkMode]);
  return /*#__PURE__*/_jsx(_ThemeProvider, {
    theme: themeObject,
    children: children
  });
}

const TextWrapper = _styled(Text).withConfig({
  displayName: "theme__TextWrapper",
  componentId: "sc-18nh1jk-0"
})(["color:", ";"], _ref2 => {
  let {
    color,
    theme
  } = _ref2;
  return theme[color];
});
/**
 * Preset styles of the Rebass Text component
 */


export const ThemedText = {
  Main(props) {
    return /*#__PURE__*/_jsx(TextWrapper, {
      fontWeight: 500,
      color: 'text2',
      ...props
    });
  },

  Link(props) {
    return /*#__PURE__*/_jsx(TextWrapper, {
      fontWeight: 500,
      color: 'primary1',
      ...props
    });
  },

  Label(props) {
    return /*#__PURE__*/_jsx(TextWrapper, {
      fontWeight: 600,
      color: 'text1',
      ...props
    });
  },

  Black(props) {
    return /*#__PURE__*/_jsx(TextWrapper, {
      fontWeight: 500,
      color: 'text1',
      ...props
    });
  },

  White(props) {
    return /*#__PURE__*/_jsx(TextWrapper, {
      fontWeight: 500,
      color: 'white',
      ...props
    });
  },

  Body(props) {
    return /*#__PURE__*/_jsx(TextWrapper, {
      fontWeight: 400,
      fontSize: 16,
      color: 'text1',
      ...props
    });
  },

  LargeHeader(props) {
    return /*#__PURE__*/_jsx(TextWrapper, {
      fontWeight: 600,
      fontSize: 24,
      ...props
    });
  },

  MediumHeader(props) {
    return /*#__PURE__*/_jsx(TextWrapper, {
      fontWeight: 500,
      fontSize: 20,
      ...props
    });
  },

  SubHeader(props) {
    return /*#__PURE__*/_jsx(TextWrapper, {
      fontWeight: 400,
      fontSize: 14,
      ...props
    });
  },

  Small(props) {
    return /*#__PURE__*/_jsx(TextWrapper, {
      fontWeight: 500,
      fontSize: 11,
      ...props
    });
  },

  Blue(props) {
    return /*#__PURE__*/_jsx(TextWrapper, {
      fontWeight: 500,
      color: 'blue1',
      ...props
    });
  },

  Yellow(props) {
    return /*#__PURE__*/_jsx(TextWrapper, {
      fontWeight: 500,
      color: 'yellow3',
      ...props
    });
  },

  DarkGray(props) {
    return /*#__PURE__*/_jsx(TextWrapper, {
      fontWeight: 500,
      color: 'text3',
      ...props
    });
  },

  Gray(props) {
    return /*#__PURE__*/_jsx(TextWrapper, {
      fontWeight: 500,
      color: 'bg3',
      ...props
    });
  },

  Italic(props) {
    return /*#__PURE__*/_jsx(TextWrapper, {
      fontWeight: 500,
      fontSize: 12,
      fontStyle: 'italic',
      color: 'text2',
      ...props
    });
  },

  Error(_ref3) {
    let {
      error,
      ...props
    } = _ref3;
    return /*#__PURE__*/_jsx(TextWrapper, {
      fontWeight: 500,
      color: error ? 'red1' : 'text2',
      ...props
    });
  }

};
export const ThemedGlobalStyle = _createGlobalStyle`
html {
  color: ${_ref4 => {
  let {
    theme
  } = _ref4;
  return theme.text1;
}};
  background-color: ${_ref5 => {
  let {
    theme
  } = _ref5;
  return theme.bg1;
}} !important;
}

a {
 color: ${_ref6 => {
  let {
    theme
  } = _ref6;
  return theme.blue1;
}}; 
}
`;