import { StoredFileEntity } from "./stored-file-entity"

interface EmailFileEntity {
    storedFile: StoredFileEntity
    id: number
    emailId: number
}

export {
    EmailFileEntity
}