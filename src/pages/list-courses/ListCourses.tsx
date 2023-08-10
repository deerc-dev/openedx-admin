import { Alert } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { FormTemplateWithResult } from '@/components/form'
import { getCourses } from '@/requests'

const ListCourses: React.FC = () => {
	const { t } = useTranslation()

	const parseResponse = ({ courses }: { courses: string[] }) =>
		courses.length > 0 ? (
			<Alert>
				<ul>
					{courses.map((c) => (
						<li key={c}>{c}</li>
					))}
				</ul>
			</Alert>
		) : (
			<Alert variant="warning">
				{t("User didn't enrolled in any courses")}
			</Alert>
		)

	return (
		<FormTemplateWithResult
			header={t('List of student courses')}
			fields={[{ name: 'user', label: t('Username or email') }]}
			submitBtnText={t('Submit')}
			handler={getCourses}
			{...{ parseResponse }}
		/>
	)
}

export default ListCourses
