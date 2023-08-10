import { useTranslation } from 'react-i18next'

import { FormTemplateWithModal } from '@/components/form'
import { changePassword } from '@/requests'

const ChangePassword: React.FC = () => {
	const { t } = useTranslation()

	return (
		<FormTemplateWithModal
			header={t('Change user password')}
			fields={[
				{ name: 'user', label: t('Username or email') },
				{ name: 'password', label: t('New password') },
			]}
			submitBtnText={t('Change')}
			handler={changePassword}
		/>
	)
}

export default ChangePassword
