import { PropsWithChildren, useEffect } from 'react'

interface Props extends PropsWithChildren {
	isAuthenticated: boolean
	redirectUrl: string
}

const AuthenticatedRoute: React.FC<Props> = ({
	children,
	isAuthenticated,
	redirectUrl,
}: Props) => {
	useEffect(() => {
		if (!isAuthenticated) {
			window.location.href = redirectUrl
		}
	}, [])

	return isAuthenticated ? <>{children}</> : <></>
}

export default AuthenticatedRoute
