import { useState } from 'react'
import type { PropsWithChildren } from 'react'

const Confirmation: React.FC<
	{
		ConfirmationMessage: React.FC<{
			answer: (isConfirmed: boolean) => void
		}>
		onReject: () => void
	} & PropsWithChildren
> = ({ ConfirmationMessage, onReject, children }) => {
	const [confirmed, setConfirmed] = useState<boolean>(false)
	const answer = (isConfirmed: boolean) =>
		isConfirmed ? setConfirmed(true) : onReject()

	return confirmed ? <>{children}</> : <ConfirmationMessage {...{ answer }} />
}

export default Confirmation
