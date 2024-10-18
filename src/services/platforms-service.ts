import axios from "axios";
import { env } from "../environment";
import { BaseService } from "./base-service";
import { PlatformEntity } from "../interfaces/entities/platform-entity";

class PlatformService extends BaseService {
    public async add(data) {
        const result = this.post<any>({ api: env, href: "/create-platform" }, data)

        return result;
    }

    public async update(data, id) {
        const result = this.put<any>({ api: env, href: "/edit-platform", params: { id: id } }, data)

        return result;
    }

    public async remove(id) {
        const result = this.delete({ api: env, href: "/delete-platform", params: { id: id } })

        return result;
    }

    public async getAll() {
        const response = await this.get<PlatformEntity[]>({ api: env, href: "/get-platforms" })
        return response
    }

    public async getById(params) {
        const response = await this.get({ api: env, href: "/get-platform-by-id", params: params })
        return response
    }
}

const platformService = new PlatformService()

export {
    PlatformService,
    platformService
}
