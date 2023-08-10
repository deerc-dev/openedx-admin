import { useTranslation } from 'react-i18next'

import { FormTemplateWithModal } from '@/components/form'
import { addStudent, removeStudent } from '@/requests'

const AddRemoveStudent: React.FC = () => {
	const { t } = useTranslation()

	return (
		<FormTemplateWithModal
			header={t('Enroll or unenroll a student')}
			fields={[
				{ name: 'user', label: t('Username or email') },
				{ name: 'course', label: t('Course') },
				{
					name: 'action',
					type: 'radios',
					radios: [
						{ value: 'enroll', label: t('Enroll') },
						{ value: 'unenroll', label: t('Unenroll') },
					],
					checked: 'enroll',
				},
			]}
			submitBtnText={t('Submit')}
			handler={(values) =>
				values.action === 'enroll' ? addStudent(values) : removeStudent(values)
			}
		/>
	)
}

export default AddRemoveStudent
