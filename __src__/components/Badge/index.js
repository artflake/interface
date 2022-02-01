import _styled from "styled-components";
import { readableColor } from 'polished';
export let BadgeVariant;

(function (BadgeVariant) {
  BadgeVariant["DEFAULT"] = "DEFAULT";
  BadgeVariant["NEGATIVE"] = "NEGATIVE";
  BadgeVariant["POSITIVE"] = "POSITIVE";
  BadgeVariant["PRIMARY"] = "PRIMARY";
  BadgeVariant["WARNING"] = "WARNING";
  BadgeVariant["WARNING_OUTLINE"] = "WARNING_OUTLINE";
})(BadgeVariant || (BadgeVariant = {}));

function pickBackgroundColor(variant, theme) {
  switch (variant) {
    case BadgeVariant.NEGATIVE:
      return theme.error;

    case BadgeVariant.POSITIVE:
      return theme.success;

    case BadgeVariant.PRIMARY:
      return theme.primary1;

    case BadgeVariant.WARNING:
      return theme.warning;

    case BadgeVariant.WARNING_OUTLINE:
      return 'transparent';

    default:
      return theme.bg2;
  }
}

function pickBorder(variant, theme) {
  switch (variant) {
    case BadgeVariant.WARNING_OUTLINE:
      return `1px solid ${theme.warning}`;

    default:
      return 'unset';
  }
}

function pickFontColor(variant, theme) {
  switch (variant) {
    case BadgeVariant.NEGATIVE:
      return readableColor(theme.error);

    case BadgeVariant.POSITIVE:
      return readableColor(theme.success);

    case BadgeVariant.WARNING:
      return readableColor(theme.warning);

    case BadgeVariant.WARNING_OUTLINE:
      return theme.warning;

    default:
      return readableColor(theme.bg2);
  }
}

const Badge = _styled.div.withConfig({
  displayName: "Badge",
  componentId: "sc-1mhw5si-0"
})(["align-items:center;background-color:", ";border:", ";border-radius:0.5rem;color:", ";display:inline-flex;padding:4px 6px;justify-content:center;font-weight:500;"], _ref => {
  let {
    theme,
    variant
  } = _ref;
  return pickBackgroundColor(variant, theme);
}, _ref2 => {
  let {
    theme,
    variant
  } = _ref2;
  return pickBorder(variant, theme);
}, _ref3 => {
  let {
    theme,
    variant
  } = _ref3;
  return pickFontColor(variant, theme);
});

export default Badge;