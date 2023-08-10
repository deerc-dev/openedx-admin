import { Button, Card, Form, ListGroup } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { FormGroup } from '@/components/form'

const CheckboxList: React.FC<{
	items: string[]
	title: string
	callbackButtonText: string
	callback(items: string[]): void
}> = ({ items, title, callback, callbackButtonText }) => {
	const { t } = useTranslation()

	const { register, handleSubmit, watch, reset } = useForm<{
		[x: string]: boolean
	}>({
		defaultValues: items.reduce((obj, st) => ({ ...obj, [st]: false }), {}),
	})

	const sts = watch(items)
	const disabled = !sts.some((el) => el)

	const onSubmit: SubmitHandler<{
		[x: string]: boolean
	}> = (items) =>
		callback(
			Object.entries(items)
				.filter((item) => item[1])
				.map((item) => item[0])
		)

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Card as="section" className="mt-3">
				<Card.Header className="checkbox-list" as="h2">
					<div className="checkbox-list__title">{title}</div>
					<div className="checkbox-list__actions">
						<Button variant="danger" type="submit" {...{ disabled }}>
							{t(callbackButtonText)}
						</Button>
						<Button
							variant="secondary"
							onClick={() => reset()}
							{...{ disabled }}
						>
							{t('Cancel')}
						</Button>
					</div>
				</Card.Header>
				<Card.Body>
					<ListGroup variant="flush">
						{items.map((name) => (
							<ListGroup.Item key={name}>
								<FormGroup
									{...{ register, watch, name }}
									type="checkbox"
									label={name}
								/>
							</ListGroup.Item>
						))}
					</ListGroup>
				</Card.Body>
			</Card>
		</Form>
	)
}

export default CheckboxList
