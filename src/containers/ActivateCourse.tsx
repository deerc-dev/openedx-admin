import { FormTemplateWithModal } from '@/components/form'
import { useTranslation } from 'react-i18next'

import { activateCourse } from '../requests'

const ActivateCourse: React.FC = () => {
	const { t } = useTranslation()
	return (
		<FormTemplateWithModal
			header={t('Activate course')}
			fields={[{ controlId: 'course', label: t('Course') }]}
			submitBtnText={t('Activate')}
			handler={activateCourse}
		/>
	)
}

export default ActivateCourse