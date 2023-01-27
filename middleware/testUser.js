import { BadRequestError } from '../errors/index.js'

export const testUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError('Test User is Read Only')
  }
  next()
}
