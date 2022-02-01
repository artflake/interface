import { DEFAULT_TXN_DISMISS_MS } from 'constants/misc';
import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { useActiveWeb3React } from '../../hooks/web3';
import { addPopup, ApplicationModal, removePopup, setOpenModal } from './reducer';
export function useBlockNumber() {
  const {
    chainId
  } = useActiveWeb3React();
  return useAppSelector(state => state.application.blockNumber[chainId !== null && chainId !== void 0 ? chainId : -1]);
}
export function useModalOpen(modal) {
  const openModal = useAppSelector(state => state.application.openModal);
  return openModal === modal;
}
export function useToggleModal(modal) {
  const open = useModalOpen(modal);
  const dispatch = useAppDispatch();
  return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open]);
}
export function useWalletModalToggle() {
  return useToggleModal(ApplicationModal.WALLET);
}
export function useToggleSettingsMenu() {
  return useToggleModal(ApplicationModal.SETTINGS);
}
export function useShowClaimPopup() {
  return useModalOpen(ApplicationModal.CLAIM_POPUP);
}
export function useToggleShowClaimPopup() {
  return useToggleModal(ApplicationModal.CLAIM_POPUP);
}
export function useToggleSelfClaimModal() {
  return useToggleModal(ApplicationModal.SELF_CLAIM);
}
export function useToggleDelegateModal() {
  return useToggleModal(ApplicationModal.DELEGATE);
}
export function useToggleVoteModal() {
  return useToggleModal(ApplicationModal.VOTE);
}
export function useTogglePrivacyPolicy() {
  return useToggleModal(ApplicationModal.PRIVACY_POLICY);
} // returns a function that allows adding a popup

export function useAddPopup() {
  const dispatch = useAppDispatch();
  return useCallback((content, key, removeAfterMs) => {
    dispatch(addPopup({
      content,
      key,
      removeAfterMs: removeAfterMs !== null && removeAfterMs !== void 0 ? removeAfterMs : DEFAULT_TXN_DISMISS_MS
    }));
  }, [dispatch]);
} // returns a function that allows removing a popup via its key

export function useRemovePopup() {
  const dispatch = useAppDispatch();
  return useCallback(key => {
    dispatch(removePopup({
      key
    }));
  }, [dispatch]);
} // get the list of active popups

export function useActivePopups() {
  const list = useAppSelector(state => state.application.popupList);
  return useMemo(() => list.filter(item => item.show), [list]);
}