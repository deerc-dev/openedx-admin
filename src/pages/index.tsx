import { createElement } from 'react'
import { Route, Routes as Switch } from 'react-router-dom'

import AuthenticatedRoute from '@/components/AuthenticatedRoute'
import { edxUrl } from '@/config'
import { useAuth } from '@/entities/auth'
import NotFound from '@/pages/not-found'

import pages from './page-list'

const Routes: React.FC = () => {
	const [isAuthenticated] = useAuth()
	const routeProps = { isAuthenticated, redirectUrl: `${edxUrl}` }
	return (
		<Switch>
			{pages.map((route) => (
				<Route
					key={route.path}
					path={route.path}
					element={
						<AuthenticatedRoute {...routeProps}>
							{createElement(route.component)}
						</AuthenticatedRoute>
					}
				/>
			))}
			<Route path="*" element={<NotFound />} />
		</Switch>
	)
}

export default Routes
