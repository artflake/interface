import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import store from 'state';
import ThemeProvider from 'theme';
import { jsx as _jsx } from "react/jsx-runtime";

const WithProviders = _ref => {
  let {
    children
  } = _ref;
  return /*#__PURE__*/_jsx(Provider, {
    store: store,
    children: /*#__PURE__*/_jsx(ThemeProvider, {
      children: children
    })
  });
};

const customRender = (ui, options) => render(ui, {
  wrapper: WithProviders,
  ...options
});

export * from '@testing-library/react';
export { customRender as render };