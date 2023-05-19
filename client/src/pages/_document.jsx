import { useEffect } from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

	useEffect(() => {
		window.dataLayer = window.dataLayer || []
		function gtag(){dataLayer.push(arguments)}
		gtag('js', new Date())

		gtag('config', 'G-M2B027NX0L')
	}, [])

	return (
		<Html lang="en">
			<Head>
				{/* <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css" /> */}
				{/* Google tag (gtag.js) */}
				<script async src="https://www.googletagmanager.com/gtag/js?id=G-M2B027NX0L"></script>
			</Head>
			<body className='overflow-x-hidden'>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}