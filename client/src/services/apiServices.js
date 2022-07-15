import http from './http-common'

export class apiService {
  signup(username, email, password, passwordConfirm) {
    console.log('Service signup not set up')
    // const data = { username, email, password, passwordConfirm }
    // return http.post('/signup', data)
  }

  updateUser() {
    console.log('Service updateUser not set up')
  }

  forgotPassword() {
    console.log('Service forgotPassword not set up')
  }

  resetPassword() {
    console.log('Service resetPassword not set up')
  }

  getHighScores() {
    console.log('Service getHighScores not set up')
  }
}

export default new apiService()
