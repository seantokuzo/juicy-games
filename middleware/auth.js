import jwt from 'jsonwebtoken'
import { UnauthenticatedError } from '../errors/index.js'

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication Invalid')
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    console.log(process.env.TEST_USER_ID);
    const testUser = payload.userId === process.env.TEST_USER_ID
    req.user = { userId: payload.userId, testUser }
    next()
  } catch (err) {
    throw new UnauthenticatedError('Authentication Invalid')
  }
}

export default auth
