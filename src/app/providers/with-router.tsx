import React from 'react'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

export const withRouter = (component: () => React.ReactElement) => {
	return function RouterWrapper() {
		return (
			<BrowserRouter>
				<Suspense fallback="Loading...">
					{React.createElement(component)}
				</Suspense>
			</BrowserRouter>
		)
	}
}
