export interface CourseGrades {
	course_id: string
	email: string
	user_id: number
	username: string
	passed: boolean
	percent: number
	letter_grade: string | null
	section_breakdown: {
		attempted: boolean
		category: string
		is_graded: boolean
		label: string
		letter_grade: string | null
		module_id: string
		percent: number
		score_earned: number
		score_possible: number
		subsection_name: string
	}[]
}

export interface FileLinks {
	course_id: string
	username: string
	links: string[]
}

export interface Left<E> {
	left: E
}

export interface Right<A> {
	right: A
}

export type Either<E, A> = Left<E> | Right<A>
