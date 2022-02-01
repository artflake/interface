import ReactConfetti from 'react-confetti';
import { useWindowSize } from "../../hooks/useWindowSize"; // eslint-disable-next-line react/prop-types

import { jsx as _jsx } from "react/jsx-runtime";
export default function Confetti(_ref) {
  let {
    start,
    variant
  } = _ref;
  const {
    width,
    height
  } = useWindowSize();

  const _variant = variant ? variant : height && width && height > 1.5 * width ? 'bottom' : variant;

  return start && width && height ? /*#__PURE__*/_jsx(ReactConfetti, {
    style: {
      zIndex: 1401
    },
    numberOfPieces: 400,
    recycle: false,
    run: true,
    width: width,
    height: height,
    confettiSource: {
      h: height,
      w: width,
      x: 0,
      y: _variant === 'top' ? height * 0.25 : _variant === 'bottom' ? height * 0.75 : height * 0.5
    },
    initialVelocityX: 15,
    initialVelocityY: 30,
    gravity: 0.45,
    tweenDuration: 100,
    wind: 0.05
  }) : null;
}