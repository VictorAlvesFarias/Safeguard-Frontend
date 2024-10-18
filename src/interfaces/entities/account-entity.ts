import { EmailEntity } from "./email-entity";
import { PlatformEntity } from "./platform-entity";
import { ProviderEntity } from "./provider-entity";

interface AccountEntity {
    platform: PlatformEntity
    email: EmailEntity
    name: string
    username: string
    phone: string
    password: string
    id: number
}

export {
    AccountEntity
}