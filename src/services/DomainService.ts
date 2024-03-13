import axios from 'axios'
import Cookies from 'js-cookie';
import { env } from '../environment';

export class DomainService {

    public token: string = Cookies.get('jwtApplicationToken') 

    public async Add(body) {
        const response = await axios.post(env+"/create-provider",body,{
            headers:{
                Authorization: `Bearer  ${this.token}`
            }
        })

        return response.data.data
    }

    public async Remove(id) {
        const response = await axios.delete(env+"/delete-provider?id="+ id,{
            headers:{
                Authorization: `Bearer  ${this.token}`
            }
        })

        return response.data.data
    }

    public async GetAll() {
        const response = await axios.get(env+"/get-providers",{
            headers:{
                Authorization: `Bearer  ${this.token}`
            }
        })
        return response.data.data
    }

}