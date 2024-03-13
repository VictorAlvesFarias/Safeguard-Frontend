import axios from 'axios'
import Cookies from 'js-cookie';
import { env } from '../environment';

export class SignupService {

    public token: string = Cookies.get('jwtApplicationToken') 

    public async Signup(body) {
        const response = await axios.post(env+"create-account-network",body,{
            headers:{
                Authorization: `Bearer  ${this.token}`
            }
        })

        return response
    }

}