import { ProviderEntity } from "./provider-entity";

interface EmailEntity {
    provider: ProviderEntity
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