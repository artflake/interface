import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAppDispatch } from "../../state/hooks";
import { ApplicationModal, setOpenModal } from "../../state/application/reducer"; // Redirects to swap but only replace the pathname

import { jsx as _jsx } from "react/jsx-runtime";
export function RedirectPathToSwapOnly(_ref) {
  let {
    location
  } = _ref;
  return /*#__PURE__*/_jsx(Redirect, {
    to: { ...location,
      pathname: '/swap'
    }
  });
} // Redirects from the /swap/:outputCurrency path to the /swap?outputCurrency=:outputCurrency format

export function RedirectToSwap(props) {
  const {
    location: {
      search
    },
    match: {
      params: {
        outputCurrency
      }
    }
  } = props;
  return /*#__PURE__*/_jsx(Redirect, {
    to: { ...props.location,
      pathname: '/swap',
      search: search && search.length > 1 ? `${search}&outputCurrency=${outputCurrency}` : `?outputCurrency=${outputCurrency}`
    }
  });
}
export function OpenClaimAddressModalAndRedirectToSwap(props) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setOpenModal(ApplicationModal.ADDRESS_CLAIM));
  }, [dispatch]);
  return /*#__PURE__*/_jsx(RedirectPathToSwapOnly, { ...props
  });
}