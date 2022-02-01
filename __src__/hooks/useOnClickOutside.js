import { useEffect, useRef } from 'react';
export function useOnClickOutside(node, handler) {
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);
  useEffect(() => {
    const handleClickOutside = e => {
      var _node$current$contain, _node$current;

      if ((_node$current$contain = (_node$current = node.current) === null || _node$current === void 0 ? void 0 : _node$current.contains(e.target)) !== null && _node$current$contain !== void 0 ? _node$current$contain : false) {
        return;
      }

      if (handlerRef.current) handlerRef.current();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [node]);
}