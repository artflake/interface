import { ThemeContext as _ThemeContext } from "styled-components";
import _styled from "styled-components";
import { useContext } from 'react';
import { ThemedText } from "../../theme";
import { AutoColumn } from "../Column";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

const Wrapper = _styled(AutoColumn).withConfig({
  displayName: "ProgressSteps__Wrapper",
  componentId: "sc-dlion8-0"
})(["margin-right:8px;height:100%;"]);

const Grouping = _styled(AutoColumn).withConfig({
  displayName: "ProgressSteps__Grouping",
  componentId: "sc-dlion8-1"
})(["width:fit-content;padding:4px;border-radius:16px;"]);

const Circle = _styled.div.withConfig({
  displayName: "ProgressSteps__Circle",
  componentId: "sc-dlion8-2"
})(["width:48px;height:48px;background-color:", ";border-radius:50%;color:", ";display:flex;align-items:center;justify-content:center;line-height:8px;font-size:16px;padding:1rem;"], _ref => {
  let {
    theme,
    confirmed,
    disabled
  } = _ref;
  return disabled ? theme.bg3 : confirmed ? theme.green1 : theme.primary1;
}, _ref2 => {
  let {
    theme,
    disabled
  } = _ref2;
  return disabled ? theme.text3 : theme.text1;
});

const CircleRow = _styled.div.withConfig({
  displayName: "ProgressSteps__CircleRow",
  componentId: "sc-dlion8-3"
})(["display:flex;flex-direction:column;align-items:center;"]);

/**
 * Based on array of steps, create a step counter of circles.
 * A circle can be enabled, disabled, or confirmed. States are derived
 * from previous step.
 *
 * An extra circle is added to represent the ability to swap, add, or remove.
 * This step will never be marked as complete (because no 'txn done' state in body ui).
 *
 * @param steps  array of booleans where true means step is complete
 */
export default function ProgressCircles(_ref3) {
  let {
    steps,
    disabled = false,
    ...rest
  } = _ref3;
  const theme = useContext(_ThemeContext);
  return /*#__PURE__*/_jsx(Wrapper, {
    justify: 'center',
    ...rest,
    children: /*#__PURE__*/_jsxs(Grouping, {
      children: [steps.map((step, i) => {
        return /*#__PURE__*/_jsxs(CircleRow, {
          children: [/*#__PURE__*/_jsx(Circle, {
            confirmed: step,
            disabled: disabled || !steps[i - 1] && i !== 0,
            children: step ? '✓' : i + 1 + '.'
          }), /*#__PURE__*/_jsx(ThemedText.Main, {
            color: theme.text4,
            children: "|"
          })]
        }, i);
      }), /*#__PURE__*/_jsx(Circle, {
        disabled: disabled || !steps[steps.length - 1],
        children: steps.length + 1 + '.'
      })]
    })
  });
}