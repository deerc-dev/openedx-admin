import { left, right } from 'fp-ts/lib/Either'
import type { Either } from 'fp-ts/lib/Either'

import { adminRoomAPIUrl, edxUrl } from './config'
import type { ICourseGrades, IFileLinks } from './types'

export interface StatusResponse {
	status: string
	message: string
}

async function _fetch<A>(
	url: string,
	method: 'get' | 'post'
): Promise<Either<string, A>> {
	const res = await fetch(url, { method })

	if (!res.ok) {
		const resText = await res.text()
		console.log(res.status, resText)
		return res.status < 500
			? left(resText)
			: left('Unknown server error, probably some parameters not found')
	}

	try {
		return right(await res.json())
	} catch (err) {
		return left((err as Error).toString())
	}
}

const get = <A>(url: string) => _fetch<A>(url, 'get')
const post = <A>(url: string) => _fetch<A>(url, 'post')

export type RequestFunction<Data, Res> = (
	d: Data
) => Promise<Either<string, Res>>

export const getStudents: RequestFunction<
	{ course: string },
	{ students: string[] }
> = ({ course }: { course: string }) =>
	get(`${adminRoomAPIUrl}/courses/get_students/${course}/`)

const _grades = (url: string) => get<ICourseGrades[]>(url)

export const gradesForStudent: RequestFunction<
	{ username: string; course: string },
	ICourseGrades[]
> = ({ username, course }) =>
	_grades(`${adminRoomAPIUrl}/students/get_grades/${username}/${course}/`)

export const gradesForCourse: RequestFunction<
	{ course: string },
	ICourseGrades[]
> = ({ course }) => _grades(`${adminRoomAPIUrl}/courses/get_grades/${course}/`)

export const getCourses: RequestFunction<
	{ username: string },
	{ courses: string[] }
> = ({ username }) =>
	get<{ courses: string[] }>(
		`${adminRoomAPIUrl}/students/get_courses/${username}/`
	)

export const fileLinks: RequestFunction<
	{ username: string; course: string },
	IFileLinks
> = ({ username, course }) =>
	get<IFileLinks>(
		`${adminRoomAPIUrl}/courses/docs_loader/${course}/${username}/`
	)

export const addStudent: RequestFunction<
	{ username: string; course: string },
	StatusResponse
> = ({ username, course }) =>
	post(`${adminRoomAPIUrl}/students/add_student/${username}/${course}/`)

export const removeStudent: RequestFunction<
	{ username: string; course: string },
	StatusResponse
> = ({ username, course }) =>
	post(`${adminRoomAPIUrl}/students/remove_student/${username}/${course}/`)

export const isAuthenticated = async () =>
	fetch(`${edxUrl}/account/settings`, {
		credentials: 'include',
		redirect: 'error'
	})
		.then(() => true /* no redirects */)
		.catch(() => false)

export const changePassword: RequestFunction<
	{ username: string; password: string },
	StatusResponse
> = ({ username, password }) =>
	post<StatusResponse>(
		`${adminRoomAPIUrl}/students/change_password/${username}/${password}/`
	)

export const activateCourse: RequestFunction<
	{ course: string },
	StatusResponse
> = ({ course }) => post(`${adminRoomAPIUrl}/courses/activate/${course}/`)
