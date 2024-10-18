
import axios from 'axios';
import { env } from '../environment';
import { BaseService } from './base-service';

class SignupService extends BaseService {
  async signupPost(data) {
    const result = this.post({ api: env, href: "/create-user", params: "" }, data)
      .then(response => {
        return response
      })
      .catch((error) => {
        throw error
      })

    return await result
  }
}

const signupService = new   SignupService()

export {
  SignupService,
  signupService
}