import { Container, NavDropdown, Navbar } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import RusFlag from '@/assets/russia-flag-icon.svg'
import USAFlag from '@/assets/united-states-flag-icon.svg'

interface Props {
	isAuthenticating: boolean
}

const LangIcon: React.FC<{ lang: string }> = ({ lang, ...rest }) => {
	switch (lang) {
		case 'ru':
			return (
				<img className="locale-image" src={RusFlag} alt="Русский" {...rest} />
			)
		case 'en':
			return (
				<img className="locale-image" src={USAFlag} alt="English" {...rest} />
			)
		default:
			return <div>no image</div>
	}
}

const LangButton: React.FC<{ lang: string }> = ({ lang }) => {
	const { i18n } = useTranslation()
	switch (lang) {
		case 'ru':
			return (
				<button className="locale" onClick={() => i18n.changeLanguage('ru')}>
					<LangIcon lang="ru" /> Русский
				</button>
			)
		default:
			return (
				<button className="locale" onClick={() => i18n.changeLanguage('en')}>
					<LangIcon lang="en" /> English
				</button>
			)
	}
}

const LangDropdown: React.FC = () => {
	const { i18n } = useTranslation()
	return (
		<NavDropdown
			title={<LangIcon lang={i18n.language} />}
			className="text-white"
			drop="start"
		>
			<NavDropdown.Item>
				<LangButton lang="ru" />
			</NavDropdown.Item>
			<NavDropdown.Item>
				<LangButton lang="en" />
			</NavDropdown.Item>
		</NavDropdown>
	)
}

const NavBar: React.FC<Props> = () => {
	const location = useLocation()
	const { t } = useTranslation()
	return (
		<Navbar bg="primary" variant="dark" sticky="top">
			<Container fluid="md">
				<Navbar.Brand as={Link} to="/">
					{location.pathname === '/' || location.pathname === '/login' ? (
						'Open edX Admin'
					) : (
						<>
							<span className="arrow left"></span>
							{t('Back to Home')}
						</>
					)}
				</Navbar.Brand>

				<LangDropdown />
			</Container>
		</Navbar>
	)
}

export default NavBar
