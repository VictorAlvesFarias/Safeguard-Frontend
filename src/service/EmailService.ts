import axios from 'axios'
import Cookies from 'js-cookie';
import { env } from '../environment';

export class EmailService {

    public token: string = Cookies.get('jwtApplicationToken') 

    public async Add(body) {
        const response = await axios.post(env+"/create-email",body,{
            headers:{
                Authorization: `Bearer  ${this.token}`
            }
        })
        
        return response.data.data
    }

    public async Remove(id) {
        const response = await axios.delete(env+"/delete-email?id="+ id,{
            headers:{
                Authorization: `Bearer  ${this.token}`
            }
        })

        return response.data.data
    }

    public async GetAll() {
        const response = await axios.get(env+"/get-emails",{
            headers:{
                Authorization: `Bearer  ${this.token}`
            }
        })

        return response.data.data
    }

}