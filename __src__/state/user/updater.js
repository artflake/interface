import { useEffect } from 'react';
import { useAppDispatch } from "../hooks";
import { updateMatchesDarkMode } from "./actions";
export default function Updater() {
  const dispatch = useAppDispatch(); // keep dark mode in sync with the system

  useEffect(() => {
    var _window;

    const darkHandler = match => {
      dispatch(updateMatchesDarkMode({
        matchesDarkMode: match.matches
      }));
    };

    const match = (_window = window) === null || _window === void 0 ? void 0 : _window.matchMedia('(prefers-color-scheme: dark)');
    dispatch(updateMatchesDarkMode({
      matchesDarkMode: match.matches
    }));

    if (match !== null && match !== void 0 && match.addListener) {
      match === null || match === void 0 ? void 0 : match.addListener(darkHandler);
    } else if (match !== null && match !== void 0 && match.addEventListener) {
      match === null || match === void 0 ? void 0 : match.addEventListener('change', darkHandler);
    }

    return () => {
      if (match !== null && match !== void 0 && match.removeListener) {
        match === null || match === void 0 ? void 0 : match.removeListener(darkHandler);
      } else if (match !== null && match !== void 0 && match.removeEventListener) {
        match === null || match === void 0 ? void 0 : match.removeEventListener('change', darkHandler);
      }
    };
  }, [dispatch]);
  return null;
}