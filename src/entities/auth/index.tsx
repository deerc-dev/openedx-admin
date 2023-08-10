import React, {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'

import { isAuthenticated } from '@/requests'

const AuthContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>]>(
	[false, () => null]
)

export const withAuth = (Component: React.FC) => {
	return function AuthProvider() {
		const [isAuthenticated, setIsAuthenticated] = useState(false)
		return (
			<AuthContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
				<Component />
			</AuthContext.Provider>
		)
	}
}

export const useAuth = () => useContext(AuthContext)

export const useAuthStartup = () => {
	const [, setAuthenticated] = useAuth()
	const [isAuthenticating, setAuthenticating] = useState(true)

	useEffect(() => {
		setAuthenticating(true)
		if (import.meta.env.VITE_AUTHENTICATION !== 'disabled') {
			isAuthenticated()
				.then(setAuthenticated)
				.then(() => setAuthenticating(false))
		} else {
			setAuthenticated(true)
			setAuthenticating(false)
		}
	}, [])

	return isAuthenticating
}
