import { Container } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'

const NotFound = () => {
	const { t } = useTranslation()
	return (
		<Container id="not-found" className="page d-flex justify-content-center">
			<div className="message-wrapper">
				<h1 className="text-center">{t('Page not found')}</h1>
				<p className="text-center">
					<Trans
						i18nKey="pageNotFound"
						values={{ path: window.location.pathname }}
						components={{ 1: <code /> }}
					>
						{`Sorry, the page <1>{{path}}</1> could not be found.`}
					</Trans>
				</p>
			</div>
		</Container>
	)
}

export default NotFound
