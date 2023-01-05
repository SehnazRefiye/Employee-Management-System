import { bind, inject, BindingScope } from '@loopback/core';
import { EmployeeRepository } from '../repositories';
import { DepartmentServiceInterface } from './generic.service.interface';

@bind({ scope: BindingScope.TRANSIENT })
export class DepartmentService implements DepartmentServiceInterface {
  constructor(
    @inject('employee.repository')
    private employeeRepository: EmployeeRepository,
  ) { }

  async getEmployeeCountByDepartment(departmentId: number) {
    return (await this.employeeRepository.find()).filter(
      emp => emp.departmentId === departmentId,
    ).length;
  }
}