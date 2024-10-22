import { FileEntity } from "./file-entity"

interface ProviderEntity {
    name: string
    description: string
    signature: string
    image: FileEntity
    id: number
}

export {
    ProviderEntity
}