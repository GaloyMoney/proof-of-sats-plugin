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
