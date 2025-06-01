import { EmailEntity } from "./email-entity";
import { PlatformEntity } from "./platform-entity";
import { ProviderEntity } from "./provider-entity";

interface EmailAddressEntity {
    provider: ProviderEntity
    username: string
    id: number
}

export {
    EmailAddressEntity
}