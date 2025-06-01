import { EmailAddressEntity } from "./email-address-entity";
import { PlatformEntity } from "./platform-entity";
import { ProviderEntity } from "./provider-entity";

interface EmailEntity {
    emailAddress: EmailAddressEntity
    platform: PlatformEntity 
    name: string
    lastName: string
    birthDate: string
    username: string
    phone: string
    password: string
    id: number
}

export {
    EmailEntity
}