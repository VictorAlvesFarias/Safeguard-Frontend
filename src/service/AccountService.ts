import axios from 'axios'
import Cookies from 'js-cookie';
import { env } from '../environment';

export class AccountService {

    public token: string = Cookies.get('jwtApplicationToken') 

    public async Add(body) {
        const response = await axios.post(env+"/create-account-network",body,{
            headers:{
                Authorization: `Bearer  ${this.token}`
            }
        })
        
        return response.data.data
    }

    public async Remove(id) {
        const response = await axios.delete(env+"/delete-account-network?id="+ id,{
            headers:{
                Authorization: `Bearer  ${this.token}`
            }
        })

        return response.data.data
    }

    public async GetAll() {
        const response = await axios.get(env+"/get-accounts-network",{
            headers:{
                Authorization: `Bearer  ${this.token}`
            }
        })
        
        return response.data.data
    } 
}