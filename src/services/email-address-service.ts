import axios from "axios";
import { env } from "../environment";
import { BaseService } from "./base-service";
import { EmailAddressEntity } from "../interfaces/entities/email-address-entity";

class EmailAddressService extends BaseService {
    public async add(data) {
        const result = this.post<any>({ api: env, href: "/create-email-address" }, data)

        return result;
    }

    public async update(data, id) {
        const result = this.put<any>({ api: env, href: "/edit-email-address", params: { id: id } }, data)

        return result;
    }

    public async remove(id) {
        const result = this.delete({ api: env, href: "/delete-email-address", params: { id: id } })

        return result;
    }

    public async getAll() {
        const response = await this.get<EmailAddressEntity[]>({ api: env, href: "/get-email-addresses" })
        return response
    }

    public async getById(params) {
        const response = await this.get<EmailAddressEntity>({ api: env, href: "/get-email-address-by-id", params: params })
        return response
    }
}

const emailAddressService = new EmailAddressService()

export {
    EmailAddressService,
    emailAddressService
}
