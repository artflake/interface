import { useState } from 'react';
import { Slash } from 'react-feather';
import useTheme from "../../hooks/useTheme";
import { jsx as _jsx } from "react/jsx-runtime";
const BAD_SRCS = {};

/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
export default function Logo(_ref) {
  let {
    srcs,
    alt,
    style,
    ...rest
  } = _ref;
  const [, refresh] = useState(0);
  const theme = useTheme();
  const src = srcs.find(src => !BAD_SRCS[src]);

  if (src) {
    return /*#__PURE__*/_jsx("img", { ...rest,
      alt: alt,
      src: src,
      style: style,
      onError: () => {
        if (src) BAD_SRCS[src] = true;
        refresh(i => i + 1);
      }
    });
  }

  return /*#__PURE__*/_jsx(Slash, { ...rest,
    style: { ...style,
      color: theme.bg4
    }
  });
}