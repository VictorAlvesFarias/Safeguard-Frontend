import axios, { toFormData } from "axios";
import { env } from "../environment";
import { BaseService } from "./base-service";
import { FileEntity } from "../interfaces/entities/file-entity";
import { EmailFileEntity } from "../interfaces/entities/email-file-entity";

class EmailFileService extends BaseService {
    public async add(data) {
        const result = this.post<any>({ api: env, href: "/upload-email-file" }, toFormData(data))

        return result;
    }

    public async remove(id) {
        const result = this.delete({ api: env, href: "/delete-email-file", params: { id: id } })

        return result;
    }

    public async getAll(params) {
        const response = await this.get<EmailFileEntity[]>({ api: env, href: "/get-email-files", params })
        return response
    }
}

const emailFileService = new EmailFileService()

export {
    EmailFileService,
    emailFileService
}
