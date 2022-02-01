import { ThemeContext as _ThemeContext } from "styled-components";
import { useContext } from 'react';
export default function useTheme() {
  return useContext(_ThemeContext);
}