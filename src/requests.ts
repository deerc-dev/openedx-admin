import type { Either } from '@/types'
import { left, right } from '@/utils'
import whitelist from '@/whitelist.json'

import { adminRoomAPIUrl, edxUrl } from './config'
import type { CourseGrades, FileLinks } from './types'

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

const _grades = (url: string) => get<CourseGrades[]>(url)

export const gradesForStudent: RequestFunction<
	{ user: string; course: string },
	CourseGrades[]
> = ({ user, course }) =>
	_grades(`${adminRoomAPIUrl}/students/get_grades/${user}/${course}/`)

export const gradesForCourse: RequestFunction<
	{ course: string },
	CourseGrades[]
> = ({ course }) => _grades(`${adminRoomAPIUrl}/courses/get_grades/${course}/`)

export const getCourses: RequestFunction<
	{ user: string },
	{ courses: string[] }
> = ({ user: user }) =>
	get<{ courses: string[] }>(`${adminRoomAPIUrl}/students/get_courses/${user}/`)

export const fileLinks: RequestFunction<
	{ user: string; course: string },
	FileLinks
> = ({ user, course }) =>
	get<FileLinks>(`${adminRoomAPIUrl}/courses/docs_loader/${course}/${user}/`)

export const addStudent: RequestFunction<
	{ user: string; course: string },
	StatusResponse
> = ({ user, course }) =>
	post(`${adminRoomAPIUrl}/students/add_student/${user}/${course}/`)

export const removeStudent: RequestFunction<
	{ user: string; course: string },
	StatusResponse
> = ({ user, course }) =>
	post(`${adminRoomAPIUrl}/students/remove_student/${user}/${course}/`)

export const isAuthenticated = async () =>
	fetch(`${edxUrl}/api/user/v1/accounts`, {
		credentials: 'include',
		redirect: 'error',
	})
		.then((res) => {
			if (res.status >= 400) {
				throw false
			}

			return res.json()
		})
		.then(([{ email }]) => {
			if (whitelist.includes(email)) {
				return true
			}

			console.log(`Whitelist doesn't include '${email}'`)
			return false
		})
		.catch(() => false)

export const changePassword: RequestFunction<
	{ user: string; password: string },
	StatusResponse
> = ({ user, password }) =>
	post<StatusResponse>(
		`${adminRoomAPIUrl}/students/change_password/${user}/${password}/`
	)

export const activateCourse: RequestFunction<
	{ course: string },
	StatusResponse
> = ({ course }) => post(`${adminRoomAPIUrl}/courses/activate/${course}/`)
