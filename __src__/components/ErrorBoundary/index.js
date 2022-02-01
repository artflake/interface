import _styled from "styled-components";
import { Trans } from "@lingui/react";
import React from 'react';
import ReactGA from 'react-ga';
import store from "../../state";
import { ExternalLink, ThemedText } from "../../theme";
import { userAgent } from "../../utils/userAgent";
import { AutoColumn } from "../Column";
import { AutoRow } from "../Row";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const FallbackWrapper = _styled.div.withConfig({
  displayName: "ErrorBoundary__FallbackWrapper",
  componentId: "sc-n7dgia-0"
})(["display:flex;flex-direction:column;width:100%;align-items:center;z-index:1;"]);

const BodyWrapper = _styled.div.withConfig({
  displayName: "ErrorBoundary__BodyWrapper",
  componentId: "sc-n7dgia-1"
})(["padding:1rem;width:100%;white-space:;"]);

const CodeBlockWrapper = _styled.div.withConfig({
  displayName: "ErrorBoundary__CodeBlockWrapper",
  componentId: "sc-n7dgia-2"
})(["background:", ";overflow:auto;white-space:pre;box-shadow:0px 0px 1px rgba(0,0,0,0.01),0px 4px 8px rgba(0,0,0,0.04),0px 16px 24px rgba(0,0,0,0.04),0px 24px 32px rgba(0,0,0,0.01);border-radius:24px;padding:18px 24px;color:", ";"], _ref => {
  let {
    theme
  } = _ref;
  return theme.bg0;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.text1;
});

const LinkWrapper = _styled.div.withConfig({
  displayName: "ErrorBoundary__LinkWrapper",
  componentId: "sc-n7dgia-3"
})(["color:", ";padding:6px 24px;"], _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.blue1;
});

const SomethingWentWrongWrapper = _styled.div.withConfig({
  displayName: "ErrorBoundary__SomethingWentWrongWrapper",
  componentId: "sc-n7dgia-4"
})(["padding:6px 24px;"]);

const IS_UNISWAP = window.location.hostname === 'app.uniswap.org';
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    return {
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    ReactGA.exception({ ...error,
      ...errorInfo,
      fatal: true
    });
  }

  render() {
    const {
      error
    } = this.state;

    if (error !== null) {
      const encodedBody = encodeURIComponent(issueBody(error));
      return /*#__PURE__*/_jsx(FallbackWrapper, {
        children: /*#__PURE__*/_jsx(BodyWrapper, {
          children: /*#__PURE__*/_jsxs(AutoColumn, {
            gap: 'md',
            children: [/*#__PURE__*/_jsx(SomethingWentWrongWrapper, {
              children: /*#__PURE__*/_jsx(ThemedText.Label, {
                fontSize: 24,
                fontWeight: 600,
                children: /*#__PURE__*/_jsx(Trans, {
                  id: "Something went wrong"
                })
              })
            }), /*#__PURE__*/_jsx(CodeBlockWrapper, {
              children: /*#__PURE__*/_jsx("code", {
                children: /*#__PURE__*/_jsx(ThemedText.Main, {
                  fontSize: 10,
                  children: error.stack
                })
              })
            }), IS_UNISWAP ? /*#__PURE__*/_jsxs(AutoRow, {
              children: [/*#__PURE__*/_jsx(LinkWrapper, {
                children: /*#__PURE__*/_jsx(ExternalLink, {
                  id: "create-github-issue-link",
                  href: `https://github.com/Uniswap/uniswap-interface/issues/new?assignees=&labels=bug&body=${encodedBody}&title=${encodeURIComponent(`Crash report: \`${error.name}${error.message && `: ${error.message}`}\``)}`,
                  target: "_blank",
                  children: /*#__PURE__*/_jsxs(ThemedText.Link, {
                    fontSize: 16,
                    children: [/*#__PURE__*/_jsx(Trans, {
                      id: "Create an issue on GitHub"
                    }), /*#__PURE__*/_jsx("span", {
                      children: "\u2197"
                    })]
                  })
                })
              }), /*#__PURE__*/_jsx(LinkWrapper, {
                children: /*#__PURE__*/_jsx(ExternalLink, {
                  id: "get-support-on-discord",
                  href: "https://discord.gg/FCfyBSbCU5",
                  target: "_blank",
                  children: /*#__PURE__*/_jsxs(ThemedText.Link, {
                    fontSize: 16,
                    children: [/*#__PURE__*/_jsx(Trans, {
                      id: "Get support on Discord"
                    }), /*#__PURE__*/_jsx("span", {
                      children: "\u2197"
                    })]
                  })
                })
              })]
            }) : null]
          })
        })
      });
    }

    return this.props.children;
  }

}

function getRelevantState() {
  const path = window.location.hash;

  if (!path.startsWith('#/')) {
    return null;
  }

  const pieces = path.substring(2).split(/[/\\?]/);

  switch (pieces[0]) {
    case 'swap':
      return 'swap';

    case 'add':
      if (pieces[1] === 'v2') return 'mint';else return 'mintV3';

    case 'remove':
      if (pieces[1] === 'v2') return 'burn';else return 'burnV3';
  }

  return null;
}

function issueBody(error) {
  const relevantState = getRelevantState();
  const deviceData = userAgent;
  return `## URL
  
${window.location.href}

${relevantState ? `## \`${relevantState}\` state
    
\`\`\`json
${JSON.stringify(store.getState()[relevantState], null, 2)}
\`\`\`
` : ''}
${error.name && `## Error

\`\`\`
${error.name}${error.message && `: ${error.message}`}
\`\`\`
`}
${error.stack && `## Stacktrace

\`\`\`
${error.stack}
\`\`\`
`}
${deviceData && `## Device data

\`\`\`json
${JSON.stringify(deviceData, null, 2)}
\`\`\`
`}
`;
}