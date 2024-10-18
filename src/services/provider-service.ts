import axios from "axios";
import { env } from "../environment";
import { BaseService } from "./base-service";
import { ProviderEntity } from "../interfaces/entities/provider-entity";

class ProviderService extends BaseService {
    public async add(data) {
        const result = this.post<any>({ api: env, href: "/create-provider" }, data)

        return result;
    }

    public async update(data, id) {
        const result = this.put<any>({ api: env, href: "/edit-provider", params: { id: id } }, data)

        return result;
    }

    public async remove(id) {
        const result = this.delete({ api: env, href: "/delete-provider", params: { id: id } })

        return result;
    }

    public async getAll() {
        const response = await this.get<ProviderEntity[]>({ api: env, href: "/get-providers" })
        return response
    }

    public async getById(params) {
        const response = await this.get({ api: env, href: "/get-provider-by-id", params: params })
        return response
    }
}

const providerService = new ProviderService()

export {
    ProviderService,
    providerService
}
