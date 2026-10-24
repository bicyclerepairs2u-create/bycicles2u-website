'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'

const muiTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: {
    light: {
      palette: {
        text: {
          primary: '#171717',
          secondary: '#525252',
        },
        background: {
          default: '#ffffff',
          paper: '#ffffff',
        },
        divider: '#e5e5e5',
      },
    },
    dark: {
      palette: {
        text: {
          primary: '#fafafa',
          secondary: '#d4d4d4',
        },
        background: {
          default: '#0a0a0a',
          paper: '#171717',
        },
        divider: '#404040',
      },
    },
  },
  typography: {
    fontFamily: 'Roboto, system-ui, sans-serif',
  },
})

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </NextThemesProvider>
  )
}
