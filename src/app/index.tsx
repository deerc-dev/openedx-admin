import NavBar from '@/components/NavBar'
import { useAuthStartup } from '@/entities/auth'
import Routes from '@/pages'
import LoadingPage from '@/pages/loading'

import './index.scss'
import { withProviders } from './providers'

const App = () => {
	const isAuthenticating = useAuthStartup()

	return (
		<>
			<div className="App">
				<NavBar {...{ isAuthenticating }} />
				{isAuthenticating ? <LoadingPage /> : <Routes />}
			</div>
		</>
	)
}

export default withProviders(App)
