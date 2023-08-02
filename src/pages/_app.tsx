import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import { FamilyTreeProvider } from '@/components/FamilyTreeProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <FamilyTreeProvider>
        <Component {...pageProps} />
      </FamilyTreeProvider>
    </ThemeProvider>
  )
}
