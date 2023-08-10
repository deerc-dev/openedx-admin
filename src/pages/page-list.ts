import ActivateCourse from './activate-course'
import AddRemoveStudent from './add-or-remove-student'
import ChangePassword from './change-password'
import FileLinks from './file-links'
import Grades from './grades'
import Home from './home'
import ListCourses from './list-courses'
import StudentsListManagement from './student-list-management'

const pages = [
	{
		description: 'Home page',
		path: '/',
		component: Home,
		hideInActions: true,
	},
	{
		description: 'Get a list of student grades',
		path: '/grades',
		component: Grades,
	},
	{
		description: 'Course student list management',
		path: '/course/student-list-management',
		component: StudentsListManagement,
	},
	{
		description: 'Enroll or unenroll a student',
		path: '/course/students/enrollment',
		component: AddRemoveStudent,
	},
	{
		description: 'Get a list of student courses',
		path: '/student/courses',
		component: ListCourses,
	},
	{
		description: 'Get a list of student files in a course',
		path: '/student/files',
		component: FileLinks,
	},
	{
		description: 'Change user password',
		path: '/student/change-password',
		component: ChangePassword,
	},
	{
		description: 'Activate course',
		path: '/course/activate',
		component: ActivateCourse,
	},
]

export default pages
