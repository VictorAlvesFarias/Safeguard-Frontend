import axios from "axios";
import { env } from "../environment";
import { BaseService } from "./base-service";

class AccountService extends BaseService {
    public async add(data) {
        const result = this.post<any>({ api: env, href: "/create-account" }, data)

        return result;
    }

    public async update(data, id) {
        const result = this.put<any>({ api: env, href: "/edit-account", params: { id: id } }, data)

        return result;
    }

    public async remove(id) {
        const result = this.delete({ api: env, href: "/delete-account", params: { id: id } })

        return result;
    }

    public async getAll() {
        const response = await this.get({ api: env, href: "/get-accounts" })
        return response
    }

    public async getById(params) {
        const response = await this.get({ api: env, href: "/get-account-by-id", params: params })
        return response
    }
}

const accountService = new AccountService()

export {
    AccountService,
    accountService
}
