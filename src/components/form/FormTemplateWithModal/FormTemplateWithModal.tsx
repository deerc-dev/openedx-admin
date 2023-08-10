import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import MessageModal, { useModal } from '@/components/MessageModal'
import { FormGroup } from '@/components/form'
import type { FormGroupExternalProps } from '@/components/form'
import type { RequestFunction, StatusResponse } from '@/requests'
import { isLeft } from '@/utils'

interface Props<A extends FieldValues> {
	header: string
	fields: FormGroupExternalProps<A>[]
	submitBtnText: string
	handler: RequestFunction<A, StatusResponse>
}

function FormTemplateWithModal<A extends FieldValues>({
	header,
	fields,
	submitBtnText,
	handler,
}: Props<A>) {
	const { t } = useTranslation()
	const {
		register,
		watch,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<A>()
	const [modalProps, showModal] = useModal()

	const onSubmit: SubmitHandler<A> = async (values) => {
		const res = await handler(values)
		if (isLeft(res)) {
			return showModal(t('Error'), res.left)
		}

		return showModal(t(res.right.status), t(res.right.message))
	}

	return (
		<Container as="main" fluid="md" className="page">
			<Card>
				<Card.Header as="h1">{header}</Card.Header>
				<Card.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						{fields.map((props, i) => (
							<FormGroup
								key={i}
								{...props}
								{...{ register, watch }}
								className="mb-3"
							/>
						))}
						<Button variant="primary" type="submit" disabled={isSubmitting}>
							{submitBtnText}
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<MessageModal {...modalProps} />
		</Container>
	)
}

export default FormTemplateWithModal
