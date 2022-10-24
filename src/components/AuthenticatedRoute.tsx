import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

interface Props extends PropsWithChildren {
	isAuthenticated: boolean
	redirectPath: string
}

const AuthenticatedRoute: FC<Props> = ({
	children,
	isAuthenticated,
	redirectPath
}: Props) => {
	if (!isAuthenticated) {
		return <Navigate to={redirectPath} replace />
	}

	return <>{children}</>
}

export default AuthenticatedRoute