import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import Spinner from '@/components/Spinner'

const LoadingPage = () => {
	const { t } = useTranslation()

	return (
		<Container id="loading" className="page d-flex justify-content-center">
			<div className="message-wrapper">
				<h1 className="text-center">{t('Loading')}...</h1>
				<div className="d-flex justify-content-center">
					<Spinner />
				</div>
			</div>
		</Container>
	)
}

export default LoadingPage
