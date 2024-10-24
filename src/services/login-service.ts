import axios from "axios";
import { env } from "../environment";
import { BaseService } from "./base-service";

class LoginService extends BaseService {
  public async loginPost(data) {
    const result = this.post<any>({ api: env, href: "/sign-in", params: {} }, {
      accessKey: data.email,
      password: data.password
    })

    return result;
  }
}

const loginService = new LoginService()

export {
  LoginService,
  loginService
}
