import usePrevious from 'hooks/usePrevious';
import { useCallback, useEffect, useState } from 'react';
import useLast from '../../hooks/useLast';
import { WrappedTokenInfo } from '../../state/lists/wrappedTokenInfo';
import Modal from '../Modal';
import { CurrencySearch } from './CurrencySearch';
import { ImportList } from './ImportList';
import { ImportToken } from './ImportToken';
import Manage from './Manage';
import { jsx as _jsx } from "react/jsx-runtime";
export let CurrencyModalView;

(function (CurrencyModalView) {
  CurrencyModalView[CurrencyModalView["search"] = 0] = "search";
  CurrencyModalView[CurrencyModalView["manage"] = 1] = "manage";
  CurrencyModalView[CurrencyModalView["importToken"] = 2] = "importToken";
  CurrencyModalView[CurrencyModalView["importList"] = 3] = "importList";
})(CurrencyModalView || (CurrencyModalView = {}));

export default function CurrencySearchModal(_ref) {
  let {
    isOpen,
    onDismiss,
    onCurrencySelect,
    selectedCurrency,
    otherSelectedCurrency,
    showCommonBases = false,
    showCurrencyAmount = true,
    disableNonToken = false
  } = _ref;
  const [modalView, setModalView] = useState(CurrencyModalView.manage);
  const lastOpen = useLast(isOpen);
  useEffect(() => {
    if (isOpen && !lastOpen) {
      setModalView(CurrencyModalView.search);
    }
  }, [isOpen, lastOpen]);
  const handleCurrencySelect = useCallback(currency => {
    onCurrencySelect(currency);
    onDismiss();
  }, [onDismiss, onCurrencySelect]); // for token import view

  const prevView = usePrevious(modalView); // used for import token flow

  const [importToken, setImportToken] = useState(); // used for import list

  const [importList, setImportList] = useState();
  const [listURL, setListUrl] = useState();
  const showImportView = useCallback(() => setModalView(CurrencyModalView.importToken), [setModalView]);
  const showManageView = useCallback(() => setModalView(CurrencyModalView.manage), [setModalView]);
  const handleBackImport = useCallback(() => setModalView(prevView && prevView !== CurrencyModalView.importToken ? prevView : CurrencyModalView.search), [setModalView, prevView]); // change min height if not searching

  const minHeight = modalView === CurrencyModalView.importToken || modalView === CurrencyModalView.importList ? 40 : 80;
  let content = null;

  switch (modalView) {
    case CurrencyModalView.search:
      content = /*#__PURE__*/_jsx(CurrencySearch, {
        isOpen: isOpen,
        onDismiss: onDismiss,
        onCurrencySelect: handleCurrencySelect,
        selectedCurrency: selectedCurrency,
        otherSelectedCurrency: otherSelectedCurrency,
        showCommonBases: showCommonBases,
        showCurrencyAmount: showCurrencyAmount,
        disableNonToken: disableNonToken,
        showImportView: showImportView,
        setImportToken: setImportToken,
        showManageView: showManageView
      });
      break;

    case CurrencyModalView.importToken:
      if (importToken) {
        content = /*#__PURE__*/_jsx(ImportToken, {
          tokens: [importToken],
          onDismiss: onDismiss,
          list: importToken instanceof WrappedTokenInfo ? importToken.list : undefined,
          onBack: handleBackImport,
          handleCurrencySelect: handleCurrencySelect
        });
      }

      break;

    case CurrencyModalView.importList:
      if (importList && listURL) {
        content = /*#__PURE__*/_jsx(ImportList, {
          list: importList,
          listURL: listURL,
          onDismiss: onDismiss,
          setModalView: setModalView
        });
      }

      break;

    case CurrencyModalView.manage:
      content = /*#__PURE__*/_jsx(Manage, {
        onDismiss: onDismiss,
        setModalView: setModalView,
        setImportToken: setImportToken,
        setImportList: setImportList,
        setListUrl: setListUrl
      });
      break;
  }

  return /*#__PURE__*/_jsx(Modal, {
    isOpen: isOpen,
    onDismiss: onDismiss,
    maxHeight: 80,
    minHeight: minHeight,
    children: content
  });
}