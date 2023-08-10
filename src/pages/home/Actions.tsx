import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { adminRoomUrl } from '@/config'
import pages from '@/pages/page-list'

const Actions: React.FC = () => {
	const { t } = useTranslation()

	return (
		<section className="actions container-md my-3">
			{pages.map(
				({ description, path, hideInActions }) =>
					!hideInActions && (
						<Link
							className="action btn btn-outline-primary"
							to={path}
							key={path}
						>
							{t(description)}
						</Link>
					)
			)}
			<a
				className="action btn btn-outline-primary"
				href={`${adminRoomUrl}/upload_registration_file/`}
				target="_blank"
				rel="noopener noreferrer"
			>
				{t('New users registration')}
			</a>
		</section>
	)
}

export default Actions
