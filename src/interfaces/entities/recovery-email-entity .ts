import { FileEntity } from "./file-entity"

export interface RecoveryEmail {
    emailId: string
    email: string
    image: FileEntity
    id: number
}