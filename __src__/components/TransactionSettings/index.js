import { ThemeContext as _ThemeContext } from "styled-components";
import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { Percent } from '@uniswap/sdk-core';
import { L2_CHAIN_IDS } from "../../constants/chains";
import { DEFAULT_DEADLINE_FROM_NOW } from "../../constants/misc";
import { useActiveWeb3React } from "../../hooks/web3";
import { darken } from 'polished';
import { useContext, useState } from 'react';
import { useSetUserSlippageTolerance, useUserSlippageTolerance, useUserTransactionTTL } from "../../state/user/hooks";
import { ThemedText } from "../../theme";
import { AutoColumn } from "../Column";
import QuestionHelper from "../QuestionHelper";
import { RowBetween, RowFixed } from "../Row";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var SlippageError;

(function (SlippageError) {
  SlippageError["InvalidInput"] = "InvalidInput";
})(SlippageError || (SlippageError = {}));

var DeadlineError;

(function (DeadlineError) {
  DeadlineError["InvalidInput"] = "InvalidInput";
})(DeadlineError || (DeadlineError = {}));

const FancyButton = _styled.button.withConfig({
  displayName: "TransactionSettings__FancyButton",
  componentId: "sc-fzcgd8-0"
})(["color:", ";align-items:center;height:2rem;border-radius:36px;font-size:1rem;width:auto;min-width:3.5rem;border:1px solid ", ";outline:none;background:", ";:hover{border:1px solid ", ";}:focus{border:1px solid ", ";}"], _ref => {
  let {
    theme
  } = _ref;
  return theme.text1;
}, _ref2 => {
  let {
    theme
  } = _ref2;
  return theme.bg3;
}, _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.bg1;
}, _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.bg4;
}, _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.primary1;
});

const Option = _styled(FancyButton).withConfig({
  displayName: "TransactionSettings__Option",
  componentId: "sc-fzcgd8-1"
})(["margin-right:8px;:hover{cursor:pointer;}background-color:", ";color:", ";"], _ref6 => {
  let {
    active,
    theme
  } = _ref6;
  return active && theme.primary1;
}, _ref7 => {
  let {
    active,
    theme
  } = _ref7;
  return active ? theme.white : theme.text1;
});

const Input = _styled.input.withConfig({
  displayName: "TransactionSettings__Input",
  componentId: "sc-fzcgd8-2"
})(["background:", ";font-size:16px;width:auto;outline:none;&::-webkit-outer-spin-button,&::-webkit-inner-spin-button{-webkit-appearance:none;}color:", ";text-align:right;"], _ref8 => {
  let {
    theme
  } = _ref8;
  return theme.bg1;
}, _ref9 => {
  let {
    theme,
    color
  } = _ref9;
  return color === 'red' ? theme.red1 : theme.text1;
});

const OptionCustom = _styled(FancyButton).withConfig({
  displayName: "TransactionSettings__OptionCustom",
  componentId: "sc-fzcgd8-3"
})(["height:2rem;position:relative;padding:0 0.75rem;flex:1;border:", ";:hover{border:", ";}input{width:100%;height:100%;border:0px;border-radius:2rem;}"], _ref10 => {
  let {
    theme,
    active,
    warning
  } = _ref10;
  return active ? `1px solid ${warning ? theme.red1 : theme.primary1}` : warning && `1px solid ${theme.red1}`;
}, _ref11 => {
  let {
    theme,
    active,
    warning
  } = _ref11;
  return active && `1px solid ${warning ? darken(0.1, theme.red1) : darken(0.1, theme.primary1)}`;
});

const SlippageEmojiContainer = _styled.span.withConfig({
  displayName: "TransactionSettings__SlippageEmojiContainer",
  componentId: "sc-fzcgd8-4"
})(["color:#f3841e;", ""], _ref12 => {
  let {
    theme
  } = _ref12;
  return theme.mediaWidth.upToSmall`
    display: none;
  `;
});

const THREE_DAYS_IN_SECONDS = 259200000 / 1000;
export default function TransactionSettings(_ref13) {
  let {
    placeholderSlippage
  } = _ref13;
  const {
    chainId
  } = useActiveWeb3React();
  const theme = useContext(_ThemeContext);
  const userSlippageTolerance = useUserSlippageTolerance();
  const setUserSlippageTolerance = useSetUserSlippageTolerance();
  const [deadline, setDeadline] = useUserTransactionTTL();
  const [slippageInput, setSlippageInput] = useState('');
  const [slippageError, setSlippageError] = useState(false);
  const [deadlineInput, setDeadlineInput] = useState('');
  const [deadlineError, setDeadlineError] = useState(false);

  function parseSlippageInput(value) {
    // populate what the user typed and clear the error
    setSlippageInput(value);
    setSlippageError(false);

    if (value.length === 0) {
      setUserSlippageTolerance('auto');
    } else {
      const parsed = Math.floor(Number.parseFloat(value) * 100);

      if (!Number.isInteger(parsed) || parsed < 0 || parsed > 5000) {
        setUserSlippageTolerance('auto');

        if (value !== '.') {
          setSlippageError(SlippageError.InvalidInput);
        }
      } else {
        setUserSlippageTolerance(new Percent(parsed, 10000));
      }
    }
  }

  const tooLow = userSlippageTolerance !== 'auto' && userSlippageTolerance.lessThan(new Percent(5, 10000));
  const tooHigh = userSlippageTolerance !== 'auto' && userSlippageTolerance.greaterThan(new Percent(1, 100));

  function parseCustomDeadline(value) {
    // populate what the user typed and clear the error
    setDeadlineInput(value);
    setDeadlineError(false);

    if (value.length === 0) {
      setDeadline(DEFAULT_DEADLINE_FROM_NOW);
    } else {
      try {
        const parsed = Math.floor(Number.parseFloat(value) * 60);

        if (!Number.isInteger(parsed) || parsed < 60 || parsed > THREE_DAYS_IN_SECONDS) {
          setDeadlineError(DeadlineError.InvalidInput);
        } else {
          setDeadline(parsed);
        }
      } catch (error) {
        console.error(error);
        setDeadlineError(DeadlineError.InvalidInput);
      }
    }
  }

  const showCustomDeadlineRow = Boolean(chainId && !L2_CHAIN_IDS.includes(chainId));
  return /*#__PURE__*/_jsxs(AutoColumn, {
    gap: "md",
    children: [/*#__PURE__*/_jsxs(AutoColumn, {
      gap: "sm",
      children: [/*#__PURE__*/_jsxs(RowFixed, {
        children: [/*#__PURE__*/_jsx(ThemedText.Black, {
          fontWeight: 400,
          fontSize: 14,
          color: theme.text2,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Slippage tolerance"
          })
        }), /*#__PURE__*/_jsx(QuestionHelper, {
          text: /*#__PURE__*/_jsx(Trans, {
            id: "Your transaction will revert if the price changes unfavorably by more than this percentage."
          })
        })]
      }), /*#__PURE__*/_jsxs(RowBetween, {
        children: [/*#__PURE__*/_jsx(Option, {
          onClick: () => {
            parseSlippageInput('');
          },
          active: userSlippageTolerance === 'auto',
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Auto"
          })
        }), /*#__PURE__*/_jsx(OptionCustom, {
          active: userSlippageTolerance !== 'auto',
          warning: !!slippageError,
          tabIndex: -1,
          children: /*#__PURE__*/_jsxs(RowBetween, {
            children: [tooLow || tooHigh ? /*#__PURE__*/_jsx(SlippageEmojiContainer, {
              children: /*#__PURE__*/_jsx("span", {
                role: "img",
                "aria-label": "warning",
                children: "\u26A0\uFE0F"
              })
            }) : null, /*#__PURE__*/_jsx(Input, {
              placeholder: placeholderSlippage.toFixed(2),
              value: slippageInput.length > 0 ? slippageInput : userSlippageTolerance === 'auto' ? '' : userSlippageTolerance.toFixed(2),
              onChange: e => parseSlippageInput(e.target.value),
              onBlur: () => {
                setSlippageInput('');
                setSlippageError(false);
              },
              color: slippageError ? 'red' : ''
            }), "%"]
          })
        })]
      }), slippageError || tooLow || tooHigh ? /*#__PURE__*/_jsx(RowBetween, {
        style: {
          fontSize: '14px',
          paddingTop: '7px',
          color: slippageError ? 'red' : '#F3841E'
        },
        children: slippageError ? /*#__PURE__*/_jsx(Trans, {
          id: "Enter a valid slippage percentage"
        }) : tooLow ? /*#__PURE__*/_jsx(Trans, {
          id: "Your transaction may fail"
        }) : /*#__PURE__*/_jsx(Trans, {
          id: "Your transaction may be frontrun"
        })
      }) : null]
    }), showCustomDeadlineRow && /*#__PURE__*/_jsxs(AutoColumn, {
      gap: "sm",
      children: [/*#__PURE__*/_jsxs(RowFixed, {
        children: [/*#__PURE__*/_jsx(ThemedText.Black, {
          fontSize: 14,
          fontWeight: 400,
          color: theme.text2,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "Transaction deadline"
          })
        }), /*#__PURE__*/_jsx(QuestionHelper, {
          text: /*#__PURE__*/_jsx(Trans, {
            id: "Your transaction will revert if it is pending for more than this period of time."
          })
        })]
      }), /*#__PURE__*/_jsxs(RowFixed, {
        children: [/*#__PURE__*/_jsx(OptionCustom, {
          style: {
            width: '80px'
          },
          warning: !!deadlineError,
          tabIndex: -1,
          children: /*#__PURE__*/_jsx(Input, {
            placeholder: (DEFAULT_DEADLINE_FROM_NOW / 60).toString(),
            value: deadlineInput.length > 0 ? deadlineInput : deadline === DEFAULT_DEADLINE_FROM_NOW ? '' : (deadline / 60).toString(),
            onChange: e => parseCustomDeadline(e.target.value),
            onBlur: () => {
              setDeadlineInput('');
              setDeadlineError(false);
            },
            color: deadlineError ? 'red' : ''
          })
        }), /*#__PURE__*/_jsx(ThemedText.Body, {
          style: {
            paddingLeft: '8px'
          },
          fontSize: 14,
          children: /*#__PURE__*/_jsx(Trans, {
            id: "minutes"
          })
        })]
      })]
    })]
  });
}