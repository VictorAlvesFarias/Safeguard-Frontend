import axios, { toFormData } from "axios";
import { env } from "../environment";
import { BaseService } from "./base-service";
import { FileEntity } from "../interfaces/entities/file-entity";

class FileService extends BaseService {
    public async add(data) {
        const result = this.post<any>({ api: env, href: "/upload-file" }, toFormData(data))

        return result;
    }

    public async remove(id) {
        const result = this.delete({ api: env, href: "/delete-file", params: { id: id } })

        return result;
    }

    public async getAll() {
        const response = await this.get<FileEntity[]>({ api: env, href: "/get-files" })
        return response
    }
}

const fileService = new FileService()

export {
    FileService,
    fileService
}
