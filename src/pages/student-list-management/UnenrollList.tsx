import { useState } from 'react'

import CheckboxList from '@/components/CheckboxList'

import EnrollmentModal from './EnrollmentModal'

const UnenrollList: React.FC<{
	students: string[]
	course: string
	title: string
}> = ({ students: allStudents, course, title }) => {
	const hide = () => setStudents(null)

	const [students, setStudents] = useState<string[] | null>(null)

	return (
		<>
			<CheckboxList
				items={allStudents}
				callback={setStudents}
				{...{ title }}
				callbackButtonText="Unenroll"
			/>
			<EnrollmentModal
				users={students || []}
				course={course}
				show={students !== null}
				hide={hide}
				action="unenroll"
			/>
		</>
	)
}

export default UnenrollList
