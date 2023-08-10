import { useTranslation } from 'react-i18next'

import Actions from './Actions'
import './index.css'

const Home: React.FC = () => (
	<main className="page">
		<Lander />
		<Actions />
	</main>
)

const Lander = () => {
	const { t } = useTranslation()
	return (
		<section className="lander">
			<div className="container-md">
				<div className="lander-content">
					<h1>Open edX Admin</h1>
					<p>{t('Web app for an online course platform management')}</p>
				</div>
			</div>
		</section>
	)
}

export default Home
