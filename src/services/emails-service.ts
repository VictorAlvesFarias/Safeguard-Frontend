import axios from "axios";
import { env } from "../environment";
import { BaseService } from "./base-service";
import { EmailEntity } from "../interfaces/entities/email-entity";

class EmailService extends BaseService {
    public async add(data) {
        const result = this.post<any>({ api: env, href: "/create-email" }, data)

        return result;
    }

    public async update(data, id) {
        const result = this.put<any>({ api: env, href: "/edit-email", params: { id: id } }, data)

        return result;
    }

    public async remove(id) {
        const result = this.delete({ api: env, href: "/delete-email", params: { id: id } })

        return result;
    }

    public async getAll() {
        const response = await this.get<EmailEntity[]>({ api: env, href: "/get-emails" })
        return response
    }

    public async getById(params) {
        const response = await this.get<EmailEntity>({ api: env, href: "/get-email-by-id", params: params })
        return response
    }
}

const emailService = new EmailService()

export {
    EmailService,
    emailService
}
