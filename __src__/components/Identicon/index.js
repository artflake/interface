import _styled from "styled-components";
import jazzicon from '@metamask/jazzicon';
import useENSAvatar from 'hooks/useENSAvatar';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useActiveWeb3React } from '../../hooks/web3';
import { jsx as _jsx } from "react/jsx-runtime";

const StyledIdenticon = _styled.div.withConfig({
  displayName: "Identicon__StyledIdenticon",
  componentId: "sc-z4caw7-0"
})(["height:1rem;width:1rem;border-radius:1.125rem;background-color:", ";font-size:initial;"], _ref => {
  let {
    theme
  } = _ref;
  return theme.bg4;
});

const StyledAvatar = _styled.img.withConfig({
  displayName: "Identicon__StyledAvatar",
  componentId: "sc-z4caw7-1"
})(["height:inherit;width:inherit;border-radius:inherit;"]);

export default function Identicon() {
  const {
    account
  } = useActiveWeb3React();
  const {
    avatar
  } = useENSAvatar(account !== null && account !== void 0 ? account : undefined);
  const [fetchable, setFetchable] = useState(true);
  const icon = useMemo(() => account && jazzicon(16, parseInt(account.slice(2, 10), 16)), [account]);
  const iconRef = useRef(null);
  useLayoutEffect(() => {
    const current = iconRef.current;

    if (icon) {
      current === null || current === void 0 ? void 0 : current.appendChild(icon);
      return () => {
        current === null || current === void 0 ? void 0 : current.removeChild(icon);
      };
    }

    return;
  }, [icon, iconRef]);
  return /*#__PURE__*/_jsx(StyledIdenticon, {
    children: avatar && fetchable ? /*#__PURE__*/_jsx(StyledAvatar, {
      alt: "avatar",
      src: avatar,
      onError: () => setFetchable(false)
    }) : /*#__PURE__*/_jsx("span", {
      ref: iconRef
    })
  });
}