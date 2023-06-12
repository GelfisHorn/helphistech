// Context
import { AppContextProvider } from '../context/AppContextProvider';
// Vercel analytics
import { Analytics } from '@vercel/analytics/react' ;
import '@/styles/globals.css'
// Components
import CookiesBar from '@/components/CookiesBar'

export default function App({ Component, pageProps }) {
	return (
		<AppContextProvider>
			<Component {...pageProps} />
			<Analytics />
			<CookiesBar />
		</AppContextProvider>
	)
}