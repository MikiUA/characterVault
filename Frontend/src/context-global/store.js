import React from 'react'
import ErrorBoundary from './ErrorBoundary'
// import { ErrorOverlayContextProvider } from './errorOverlayContext'

import { LanguageContextProvider } from './languageContext'
import OverlayProvider from './showOverlay'
import { ThemeProviderComponent } from './themeProvider'
import { UserContextProvider } from './userContext'

export default function AppContextProvider({children}) {
  return (
    <ErrorBoundary>
      <UserContextProvider>
        {/* <ErrorOverlayContextProvider> */}
        <OverlayProvider>
          <ThemeProviderComponent>
            <LanguageContextProvider>
                {children}
            </LanguageContextProvider>
          </ThemeProviderComponent>
          </OverlayProvider>
        {/* </ErrorOverlayContextProvider> */}
      </UserContextProvider>
    </ErrorBoundary>
  )
}
