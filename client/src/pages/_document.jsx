import { useEffect } from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

	return (
		<Html lang="de">
			<Head>
				<meta name="google-site-verification" content="N2tEqjmEa6dAKEmjfJlEc705r01Z1pjwGHm89yhYmYk" />
			</Head>
			<body className='overflow-x-hidden'>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}