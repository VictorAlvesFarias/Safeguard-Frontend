import axios from "axios";
import { env } from "../environment";
import { BaseService } from "./base-service";
import { ProviderEntity } from "../interfaces/entities/provider-entity";
import { RecoveryKey } from "../interfaces/entities/recovery-key-entity";

class RecoveryKeyService extends BaseService {
    public async add(data) {
        const result = this.post<any>({ api: env, href: "/create-recovery-key" }, data)

        return result;
    }

    public async remove(id) {
        const result = this.delete({ api: env, href: "/delete-recovery-key", params: { id: id } })

        return result;
    }

    public async getAll(params) {
        const response = await this.get<RecoveryKey[]>({ api: env, href: "/get-recovery-keys", params: params })
        return response
    }
}

const recoveryKeyService = new RecoveryKeyService()

export {
    recoveryKeyService,
    RecoveryKeyService
}
