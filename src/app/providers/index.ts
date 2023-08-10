import compose from 'compose-function'

import { withAuth } from '@/entities/auth'

import { withRouter } from './with-router'

export const withProviders = compose(withRouter, withAuth)
