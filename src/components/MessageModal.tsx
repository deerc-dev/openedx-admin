import React, { ReactNode, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

interface Props {
	show: boolean
	setShow: (s: boolean) => void
	header: ReactNode
	body: ReactNode
	showButtons?: boolean
}

const MessageModal: React.FC<Props> = ({ showButtons = true, ...props }) => (
	<Modal show={props.show} onHide={() => props.setShow(false)}>
		<Modal.Header closeButton>
			<h4>{props.header}</h4>
		</Modal.Header>
		<Modal.Body>{props.body}</Modal.Body>
		<Modal.Footer className="d-flex justify-content-right">
			{showButtons && <Button onClick={() => props.setShow(false)}>OK</Button>}
		</Modal.Footer>
	</Modal>
)

type UseModalProps = Omit<Props, 'show' | 'setShow' | 'showButtons'>

export const useModal = (props?: UseModalProps) => {
	const { header, body } = props ?? { header: '', body: '' }
	const [modal, setModal] = useState<Omit<Props, 'setShow'>>({
		show: false,
		header,
		body,
	})
	const showModal = (header: ReactNode, body: ReactNode) =>
		setModal({ show: true, header, body })
	const setShow = (show: boolean) => setModal({ ...modal, show })
	return [{ ...modal, setShow }, showModal] as const
}

export default MessageModal
