import { keyframes as _keyframes } from "styled-components";
import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { ButtonGray } from "../Button";
import { OutlineCard } from "../Card";
import { AutoColumn } from "../Column";
import { useCallback, useEffect, useState } from 'react';
import { Minus, Plus } from 'react-feather';
import { ThemedText } from "../../theme";
import { Input as NumericalInput } from "../NumericalInput";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const pulse = color => _keyframes`
  0% {
    box-shadow: 0 0 0 0 ${color};
  }

  70% {
    box-shadow: 0 0 0 2px ${color};
  }

  100% {
    box-shadow: 0 0 0 0 ${color};
  }
`;

const InputRow = _styled.div.withConfig({
  displayName: "InputStepCounter__InputRow",
  componentId: "sc-kflffs-0"
})(["display:grid;grid-template-columns:30px 1fr 30px;"]);

const SmallButton = _styled(ButtonGray).withConfig({
  displayName: "InputStepCounter__SmallButton",
  componentId: "sc-kflffs-1"
})(["border-radius:8px;padding:4px;"]);

const FocusedOutlineCard = _styled(OutlineCard).withConfig({
  displayName: "InputStepCounter__FocusedOutlineCard",
  componentId: "sc-kflffs-2"
})(["border-color:", ";padding:12px;animation:", " 0.8s linear;"], _ref => {
  let {
    active,
    theme
  } = _ref;
  return active && theme.blue1;
}, _ref2 => {
  let {
    pulsing,
    theme
  } = _ref2;
  return pulsing && pulse(theme.blue1);
});

const StyledInput = _styled(NumericalInput).withConfig({
  displayName: "InputStepCounter__StyledInput",
  componentId: "sc-kflffs-3"
})(["background-color:transparent;text-align:center;width:100%;font-weight:500;padding:0 10px;", ";", ";"], _ref3 => {
  let {
    theme
  } = _ref3;
  return theme.mediaWidth.upToSmall`
    font-size: 16px;
  `;
}, _ref4 => {
  let {
    theme
  } = _ref4;
  return theme.mediaWidth.upToExtraSmall`
    font-size: 12px;
  `;
});

const InputTitle = _styled(ThemedText.Small).withConfig({
  displayName: "InputStepCounter__InputTitle",
  componentId: "sc-kflffs-4"
})(["color:", ";font-size:12px;font-weight:500;"], _ref5 => {
  let {
    theme
  } = _ref5;
  return theme.text2;
});

const ButtonLabel = _styled(ThemedText.White).withConfig({
  displayName: "InputStepCounter__ButtonLabel",
  componentId: "sc-kflffs-5"
})(["color:", " !important;"], _ref6 => {
  let {
    theme,
    disabled
  } = _ref6;
  return disabled ? theme.text2 : theme.text1;
});

const StepCounter = _ref7 => {
  let {
    value,
    decrement,
    increment,
    decrementDisabled = false,
    incrementDisabled = false,
    width,
    locked,
    onUserInput,
    title,
    tokenA,
    tokenB
  } = _ref7;
  //  for focus state, styled components doesnt let you select input parent container
  const [active, setActive] = useState(false); // let user type value and only update parent value on blur

  const [localValue, setLocalValue] = useState('');
  const [useLocalValue, setUseLocalValue] = useState(false); // animation if parent value updates local value

  const [pulsing, setPulsing] = useState(false);

  const handleOnFocus = () => {
    setUseLocalValue(true);
    setActive(true);
  };

  const handleOnBlur = useCallback(() => {
    setUseLocalValue(false);
    setActive(false);
    onUserInput(localValue); // trigger update on parent value
  }, [localValue, onUserInput]); // for button clicks

  const handleDecrement = useCallback(() => {
    setUseLocalValue(false);
    onUserInput(decrement());
  }, [decrement, onUserInput]);
  const handleIncrement = useCallback(() => {
    setUseLocalValue(false);
    onUserInput(increment());
  }, [increment, onUserInput]);
  useEffect(() => {
    if (localValue !== value && !useLocalValue) {
      setTimeout(() => {
        setLocalValue(value); // reset local value to match parent

        setPulsing(true); // trigger animation

        setTimeout(function () {
          setPulsing(false);
        }, 1800);
      }, 0);
    }
  }, [localValue, useLocalValue, value]);
  return /*#__PURE__*/_jsx(FocusedOutlineCard, {
    pulsing: pulsing,
    active: active,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    width: width,
    children: /*#__PURE__*/_jsxs(AutoColumn, {
      gap: "6px",
      children: [/*#__PURE__*/_jsx(InputTitle, {
        fontSize: 12,
        textAlign: "center",
        children: title
      }), /*#__PURE__*/_jsxs(InputRow, {
        children: [!locked && /*#__PURE__*/_jsx(SmallButton, {
          onClick: handleDecrement,
          disabled: decrementDisabled,
          children: /*#__PURE__*/_jsx(ButtonLabel, {
            disabled: decrementDisabled,
            fontSize: "12px",
            children: /*#__PURE__*/_jsx(Minus, {
              size: 18
            })
          })
        }), /*#__PURE__*/_jsx(StyledInput, {
          className: "rate-input-0",
          value: localValue,
          fontSize: "20px",
          disabled: locked,
          onUserInput: val => {
            setLocalValue(val);
          }
        }), !locked && /*#__PURE__*/_jsx(SmallButton, {
          onClick: handleIncrement,
          disabled: incrementDisabled,
          children: /*#__PURE__*/_jsx(ButtonLabel, {
            disabled: incrementDisabled,
            fontSize: "12px",
            children: /*#__PURE__*/_jsx(Plus, {
              size: 18
            })
          })
        })]
      }), /*#__PURE__*/_jsx(InputTitle, {
        fontSize: 12,
        textAlign: "center",
        children: /*#__PURE__*/_jsx(Trans, {
          id: "{tokenB} per {tokenA}",
          values: {
            tokenB: tokenB,
            tokenA: tokenA
          }
        })
      })]
    })
  });
};

export default StepCounter;