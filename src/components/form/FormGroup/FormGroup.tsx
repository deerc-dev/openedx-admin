import Form from 'react-bootstrap/Form'
import type {
	FieldValues,
	Path,
	UseFormRegister,
	UseFormWatch,
} from 'react-hook-form'

interface CommonExternalProps<A extends FieldValues> {
	name: Path<A>
	optional?: Path<A>
	className?: string
}

interface ControlAndCheckProps<A extends FieldValues>
	extends CommonExternalProps<A> {
	type?: 'text' | 'checkbox'
	label: string
}

interface RadiosProps<A extends FieldValues> extends CommonExternalProps<A> {
	type: 'radios'
	radios: { value: string; label: string }[]
	checked: string
}

export type FormGroupExternalProps<A extends FieldValues> =
	| ControlAndCheckProps<A>
	| RadiosProps<A>

type FormGroupProps<A extends FieldValues> = {
	register: UseFormRegister<A>
	watch: UseFormWatch<A>
} & (ControlAndCheckProps<A> | RadiosProps<A>)

const Component = <A extends FieldValues>(props: FormGroupProps<A>) => {
	const { name, register, watch, className, ...rest } = props
	const isRadioChecked = rest.type === 'radios' ? watch(name) : null
	switch (rest.type) {
		case 'checkbox':
			return <Form.Check id={name} label={rest.label} {...register(name)} />
		case 'radios':
			return (
				<>
					{rest.radios.map(({ value, label }) => (
						<Form.Check
							id={`${name}-${value}`}
							label={label}
							{...register(name)}
							type="radio"
							value={value}
							key={value}
							checked={isRadioChecked ? undefined : value === rest.checked}
						/>
					))}
				</>
			)

		default:
			return (
				<Form.Group {...{ controlId: name }} {...{ className }}>
					<Form.Label>{rest.label}</Form.Label>
					<Form.Control {...register(name, { required: true })} />
				</Form.Group>
			)
	}
}

const FormGroup = <A extends FieldValues>(props: FormGroupProps<A>) => {
	// props.optional is name of a form field. If field with this name has value `true`, this field is visible
	const isEnabled = props.optional ? props.watch(props.optional) : true

	return isEnabled ? <Component {...props} /> : <></>
}

export default FormGroup
