import { useEffect } from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

	useEffect(() => {
		window.dataLayer = window.dataLayer || [];
		function gtag() { dataLayer.push(arguments); }
		gtag('js', new Date());

		gtag('config', 'AW-11148352893');
	}, [])

	return (
		<Html lang="de">
			<Head>
				<meta name="google-site-verification" content="N2tEqjmEa6dAKEmjfJlEc705r01Z1pjwGHm89yhYmYk" />
				<link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
				<link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css" />
				<link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-solid.css" />
				<link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-regular.css" />
				<script async src="https://www.googletagmanager.com/gtag/js?id=AW-11148352893"></script>
			</Head>
			<body className='overflow-x-hidden'>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}