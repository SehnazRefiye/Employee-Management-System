import { Getter, inject } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository, repository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Location, Department, DepartmentRelations } from '../models';
import { LocationRepository } from './location.repository';

export class DepartmentRepository extends DefaultCrudRepository<
  Department,
  typeof Department.prototype.id,
  DepartmentRelations
> {
  public readonly locationId: BelongsToAccessor<
    Location,
    typeof Department.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,

    @repository.getter('LocationRepository')
    locationRepositoryGetter: Getter<LocationRepository>,
  ) {
    super(Department, dataSource);

    this.locationId = this.createBelongsToAccessorFor(
      'location',
      locationRepositoryGetter);

    this.registerInclusionResolver(
      'location',
      this.locationId.inclusionResolver);
  }
}
