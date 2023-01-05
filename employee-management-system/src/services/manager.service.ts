import { bind, inject, BindingScope } from '@loopback/core';
import { FilterBuilder } from '@loopback/filter';
import { EmployeeRepository } from '../repositories';
import { ManagerServiceInterface } from './generic.service.interface';

@bind({ scope: BindingScope.TRANSIENT })
export class ManagerService implements ManagerServiceInterface {
  constructor(
    @inject('employee.repository')
    private employeeRepository: EmployeeRepository,
  ) { }

  async getManagers() {
    const filterBuilder = new FilterBuilder();
    const filter = filterBuilder
      .fields('id', 'first_name', 'title')
      .order(['id ASC'])
      .build();

    return (await this.employeeRepository.find(filter)).filter(
      emp => emp.title === 'Yönetici',
    );
  }

  async getEmployeesByManagerId(managerId: number) {
    const filterBuilder = new FilterBuilder();
    const filter = filterBuilder
      .fields('id', 'first_name')
      .order(['id ASC'])
      .where({ managerId: managerId })
      .build();

    return this.employeeRepository.find(filter);
  }

  async getHierarchy() {
    const managers = (await this.getManagers()).map(m => ({
      managerId: m.id,
      managerName: m.first_name,
    }));
    const hierarchy = [];
    for (const m of managers) {
      const employees = (await this.getEmployeesByManagerId(m.managerId)).map(
        e => ({
          first_name: e.first_name,
        }),
      );
      hierarchy.push({ [m.managerName]: employees });
    }
    return hierarchy;
  }
}
