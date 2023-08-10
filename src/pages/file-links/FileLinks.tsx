import { Alert } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { FormTemplateWithResult } from '@/components/form'
import { fileLinks } from '@/requests'

interface FileLinks {
	course_id: string
	username: string
	links: string[]
}

const FileLinks: React.FC = () => {
	const { t } = useTranslation()
	const parseResponse = ({ links }: FileLinks) => (
		<div className="links-list">
			{links.map((link, i) => (
				<Alert key={i}>
					<a
						className="text-truncate d-inline-block"
						href={link}
						rel="noreferrer"
						target="_blank"
						style={{ width: '100%' }}
					>
						{link}
					</a>
				</Alert>
			))}
			{links.length === 0 && (
				<Alert variant="warning">
					{t('No files found for this user and course')}
				</Alert>
			)}
		</div>
	)

	return (
		<FormTemplateWithResult
			header={t('Get additional user files')}
			fields={[
				{ name: 'user', label: t('Username or email') },
				{
					name: 'course',
					label: t('Course'),
				},
			]}
			submitBtnText={t('Submit')}
			handler={fileLinks}
			{...{ parseResponse }}
		/>
	)
}

export default FileLinks
