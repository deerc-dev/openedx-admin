import React, { ReactNode, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

interface Props {
	show: boolean
	setShow: (s: boolean) => void
	header: ReactNode
	body: ReactNode
	confirmHandler: () => unknown
}

const ConfirmModal: React.FC<Props> = (props) => {
	const { show, setShow, header, body, confirmHandler } = props
	return (
		<Modal show={show} onHide={() => setShow(false)}>
			<Modal.Header closeButton>
				<h4>{header}</h4>
			</Modal.Header>
			{body && <Modal.Body>{body}</Modal.Body>}
			<Modal.Footer className="d-flex justify-content-right">
				<Button
					onClick={() => {
						setShow(false)
						confirmHandler()
					}}
				>
					OK
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

type UseModalProps = Omit<Props, 'show' | 'setShow' | 'showButtons'>

export const useConfirmModal = (props?: UseModalProps) => {
	const { header, body, confirmHandler } = props ?? {
		header: '',
		body: '',
		confirmHandler: () => null,
	}

	const [modal, setModal] = useState<Omit<Props, 'setShow'>>({
		show: false,
		header,
		body,
		confirmHandler,
	})

	const showModal = (
		header: ReactNode,
		body: ReactNode,
		confirmHandler: () => unknown
	) => setModal({ show: true, header, body, confirmHandler })
	const setShow = (show: boolean) => setModal({ ...modal, show })

	return [{ ...modal, setShow }, showModal] as const
}

export default ConfirmModal
