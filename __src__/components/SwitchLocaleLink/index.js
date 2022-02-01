import _styled from "styled-components";
import { Trans } from "@lingui/react";
import { useLocationLinkProps } from 'hooks/useLocationLinkProps';
import { useMemo } from 'react';
import { DEFAULT_LOCALE, LOCALE_LABEL } from '../../constants/locales';
import { navigatorLocale, useActiveLocale } from '../../hooks/useActiveLocale';
import { StyledInternalLink, ThemedText } from '../../theme';
import { jsx as _jsx } from "react/jsx-runtime";

const Container = _styled(ThemedText.Small).withConfig({
  displayName: "SwitchLocaleLink__Container",
  componentId: "sc-1a9mfh8-0"
})(["opacity:0.6;:hover{opacity:1;}margin-top:1rem !important;"]);

const useTargetLocale = activeLocale => {
  const browserLocale = useMemo(() => navigatorLocale(), []);

  if (browserLocale && (browserLocale !== DEFAULT_LOCALE || activeLocale !== DEFAULT_LOCALE)) {
    if (activeLocale === browserLocale) {
      return DEFAULT_LOCALE;
    } else {
      return browserLocale;
    }
  }

  return null;
};

export function SwitchLocaleLink() {
  const activeLocale = useActiveLocale();
  const targetLocale = useTargetLocale(activeLocale);
  const {
    to,
    onClick
  } = useLocationLinkProps(targetLocale);
  if (!targetLocale || !to) return null;
  return /*#__PURE__*/_jsx(Container, {
    children: /*#__PURE__*/_jsx(Trans, {
      id: "Uniswap available in: <0>{0}</0>",
      values: {
        0: LOCALE_LABEL[targetLocale]
      },
      components: {
        0: /*#__PURE__*/_jsx(StyledInternalLink, {
          onClick: onClick,
          to: to
        })
      }
    })
  });
}