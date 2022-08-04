export class DomainError extends Error {
  name: string
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}

export class RepositoryError extends DomainError {}
export class UnknownRepositoryError extends RepositoryError {}
export class CouldNotFindError extends RepositoryError {}
export class PersistError extends RepositoryError {}
export class CouldNotFindTreeError extends CouldNotFindError {}
export class CouldNotPersistTreeError extends PersistError {}
export class CouldNotPersistTreeMetadataError extends PersistError {}
export class CouldNotFindTreeMetadataError extends CouldNotFindError {}
