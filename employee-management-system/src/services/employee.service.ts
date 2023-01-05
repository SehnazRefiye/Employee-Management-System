import { bind, inject, BindingScope } from '@loopback/core';
import { FilterBuilder } from '@loopback/filter';
import { EmployeeRepository, TitleRepository } from '../repositories';
import { EmployeeServiceInterface } from './generic.service.interface';

@bind({ scope: BindingScope.TRANSIENT })
export class EmployeeService implements EmployeeServiceInterface {
  constructor(
    @inject('employee.repository')
    private employeeRepository: EmployeeRepository,
    @inject('title.repository')
    private titleRepository: TitleRepository,
  ) { }

  async getTitleChangesByEmployeeId(employeeId: number) {
    const filterBuilder = new FilterBuilder();
    const filter = filterBuilder
      .order(['id DESC'])
      .where({ managerId: employeeId })
      .build();

    const titleChanges = (await this.titleRepository.find(filter)).filter(
      tc => tc.employeeId === employeeId,
    );
    const employee = await this.employeeRepository.findById(employeeId);
    return { ...employee, titleChanges };
  }
}
