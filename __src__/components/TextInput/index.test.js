// include style rules in snapshots
import 'jest-styled-components';
import { fireEvent, render, screen } from 'test-utils';
import { ResizingTextArea, TextInput } from './';
import { jsx as _jsx } from "react/jsx-runtime";
describe('TextInput', () => {
  it('renders correctly', () => {
    const {
      asFragment
    } = render( /*#__PURE__*/_jsx(TextInput, {
      className: "testing",
      value: "My test input",
      onUserInput: () => null,
      placeholder: "Test Placeholder",
      fontSize: "12"
    }));
    expect(asFragment()).toMatchSnapshot();
  });
  it('calls the handler on user input', () => {
    const onUserInputSpy = jest.fn();
    render( /*#__PURE__*/_jsx(TextInput, {
      className: "testing",
      value: "",
      onUserInput: onUserInputSpy,
      placeholder: "Test Placeholder",
      fontSize: "12"
    }));
    fireEvent.change(screen.getByPlaceholderText('Test Placeholder'), {
      target: {
        value: 'New value'
      }
    });
    expect(onUserInputSpy).toHaveBeenCalledWith('New value');
    expect(onUserInputSpy).toHaveBeenCalledTimes(1);
  });
});
describe('ResizableTextArea', () => {
  it('renders correctly', () => {
    const {
      asFragment
    } = render( /*#__PURE__*/_jsx(ResizingTextArea, {
      className: "testing",
      value: "My test input",
      onUserInput: () => null,
      placeholder: "Test Placeholder",
      fontSize: "12"
    }));
    expect(asFragment()).toMatchSnapshot();
  });
  it('calls the handler on user input', () => {
    const onUserInputSpy = jest.fn();
    render( /*#__PURE__*/_jsx(ResizingTextArea, {
      className: "testing",
      value: "",
      onUserInput: onUserInputSpy,
      placeholder: "Test Placeholder",
      fontSize: "12"
    }));
    fireEvent.change(screen.getByPlaceholderText('Test Placeholder'), {
      target: {
        value: 'New value'
      }
    });
    expect(onUserInputSpy).toHaveBeenCalledWith('New value');
    expect(onUserInputSpy).toHaveBeenCalledTimes(1);
  });
});