import { BadRequestError } from '../errors/index.js'

export const testUser = (req, res, next) => {
  console.log(req.user.testUser)
  if (req.user.testUser) {
    throw new BadRequestError('Test User is Read Only')
  }
  next()
}
