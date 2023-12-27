class apiServices {
  baseUrl = 'http://localhost:3000'
  constructor () {
    this.login = `${this.baseUrl}/auth/login`;
    this.register = `${this.baseUrl}/auth/register`;
  }
}

export default new apiServices()