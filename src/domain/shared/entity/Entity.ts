export abstract class Entity<TId> {
  protected constructor(readonly id: TId) {}
}

