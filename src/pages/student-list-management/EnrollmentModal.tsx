import { useEffect, useState } from 'react'
import { Button, ListGroup, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import Confirmation from '@/components/Confirmation'
import { addStudent, removeStudent } from '@/requests'
import { isLeft } from '@/utils'

const EnrollmentConfirmationInfo: React.FC<{
	course: string
	users: string[]
	action: 'enroll' | 'unenroll'
	answer: (isConfirmed: boolean) => void
}> = ({ course, users, action, answer }) => {
	const { t } = useTranslation()
	return (
		<>
			<p>
				{action === 'enroll'
					? t('The following users will be enrolled in the course')
					: t('The following users will be unenrolled from the course')}{' '}
				&quot;{course}&quot;
			</p>
			<ListGroup as="ol" numbered>
				{users.map((user) => (
					<ListGroup.Item as="li" key={user}>
						{user}
					</ListGroup.Item>
				))}
			</ListGroup>
			<div className="enrollment-modal-buttons mt-3 d-flex justify-content-end">
				<Button variant="secondary" onClick={() => answer(false)}>
					{t('Cancel')}
				</Button>
				<Button
					variant={action === 'unenroll' ? 'danger' : 'primary'}
					onClick={() => answer(true)}
				>
					{t('Confirm')}
				</Button>
			</div>
		</>
	)
}

const EnrollStatuses: React.FC<{
	statuses: { user: string; status: string }[]
	course: string
	action: 'enroll' | 'unenroll'
}> = ({ statuses, course, action }) => {
	const { t } = useTranslation()

	return (
		<>
			<p>
				{action === 'enroll'
					? t('Enrolling users in the course')
					: t('Unenrolling users from the course')}{' '}
				&quot;{course}&quot;
			</p>
			<ListGroup as="ol" numbered>
				{statuses.map(({ user, status }) => (
					<ListGroup.Item as="li" key={user} className="enroll-status">
						<div className="username">{user}</div>
						<div className="status">{status}</div>
					</ListGroup.Item>
				))}
			</ListGroup>
		</>
	)
}

const EnrollmentBody: React.FC<{
	users: string[]
	course: string
	action: 'enroll' | 'unenroll'
	handleClose: () => void
}> = ({ users, course, action, handleClose }) => {
	const { t } = useTranslation()

	const [submitting, setSubmitting] = useState<boolean>(true)

	const [statuses, setStatuses] = useState<{ user: string; status: string }[]>(
		users.map((user) => ({ user, status: t('Pending') }))
	)

	useEffect(() => {
		Promise.all(
			users.map((user) =>
				(action === 'enroll' ? addStudent : removeStudent)({
					user,
					course,
				}).then((res) => {
					if (isLeft(res)) {
						setStatuses((statuses) =>
							statuses.map((el) =>
								el.user === user ? { user, status: t('Error') } : el
							)
						)
					} else {
						setStatuses((statuses) =>
							statuses.map((el) =>
								el.user === user ? { user, status: t(res.right.status) } : el
							)
						)
					}
				})
			)
		).then(() => setSubmitting(false))
	}, [])

	return (
		<>
			<EnrollStatuses {...{ statuses, course, action }} />
			<div className="enrollment-modal-buttons mt-3 d-flex justify-content-end">
				<Button variant="primary" onClick={handleClose} disabled={submitting}>
					{t('Continue')}
				</Button>
			</div>
		</>
	)
}

interface ModalProps {
	show: boolean
	hide: () => void
	users: string[]
	course: string
	action: 'enroll' | 'unenroll'
}

const EnrollmentModal: React.FC<ModalProps> = ({
	show,
	hide,
	users,
	course,
	action,
}) => {
	const { t } = useTranslation()

	if (!show) return <></>
	return (
		<Modal show={show}>
			<Modal.Header>
				<Modal.Title>
					{action === 'enroll'
						? t('Enrolling students')
						: t('Unenrolling students')}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Confirmation
					ConfirmationMessage={({ answer }) => (
						<EnrollmentConfirmationInfo
							{...{ course, users, action, answer }}
						/>
					)}
					onReject={hide}
				>
					<EnrollmentBody {...{ course, users, action, handleClose: hide }} />
				</Confirmation>
				{/* <EnrollmentBody {...{ users, course, action, handleClose }} /> */}
			</Modal.Body>
		</Modal>
	)
}

export default EnrollmentModal
