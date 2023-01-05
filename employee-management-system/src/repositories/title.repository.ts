import { Getter, inject } from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository
} from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Employee, Title, TitleRelations } from '../models';
import { EmployeeRepository } from './employee.repository';

export class TitleRepository extends DefaultCrudRepository<
  Title,
  typeof Title.prototype.id,
  TitleRelations
> {
  public readonly employeeId: BelongsToAccessor<
    Employee,
    typeof Title.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,

    @repository.getter('EmployeeRepository')
    employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(Title, dataSource);
    this.employeeId = this.createBelongsToAccessorFor(
      'employee',
      employeeRepositoryGetter);

    this.registerInclusionResolver(
      'employee',
      this.employeeId.inclusionResolver);

  }
}
