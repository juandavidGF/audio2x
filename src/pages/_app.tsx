import '@/styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next';
import { Comfortaa } from 'next/font/google'

const inter = Comfortaa({ subsets: ['latin'] })

function App({ Component, pageProps }: AppProps) {
  return <UserProvider>
		<main className={inter.className}>
			<Component {...pageProps} />
		</main>
	</UserProvider>
	
}

export default appWithTranslation(App);