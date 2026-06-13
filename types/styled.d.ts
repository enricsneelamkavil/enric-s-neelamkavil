// Augments styled-components' DefaultTheme with our Theme type so that
// the `theme` prop in styled-components template literals is fully typed.
//
// This file must be in the TypeScript include path (root types/ dir is
// covered by tsconfig "**/*.ts").

import type { Theme } from '../styles/theme'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
