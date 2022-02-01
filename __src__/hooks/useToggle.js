import { useCallback, useState } from 'react';
export default function useToggle() {
  let initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState(state => !state), []);
  return [state, toggle];
}