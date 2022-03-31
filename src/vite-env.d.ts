/// <reference types="vite/client" />

import 'styled-components';

type ColorVariant = 'primary' | 'success' | 'danger' | 'dark' | 'text' | 'gray-100' | 'gray-200';
type Colors = Record<ColorVariant, string>;

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: Colors;
	}
}
