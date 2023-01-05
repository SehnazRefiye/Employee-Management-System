import { bind, inject, BindingScope } from '@loopback/core';
import { EmployeeRepository } from '../repositories';
import { DepartmentService } from './department.service';
import { SalaryServiceInterface } from './generic.service.interface';

@bind({ scope: BindingScope.TRANSIENT })
export class SalaryService implements SalaryServiceInterface {
  constructor(
    @inject('employee.repository')
    private employeeRepository: EmployeeRepository,
    @inject('department.service')
    private departmentService: DepartmentService,
  ) { }

  async getAverageSalaryByDepartment(departmentId: number) {
    return (
      (await this.employeeRepository.find())
        .filter(emp => emp.departmentId === departmentId)
        .map(emp => emp.salary)
        .reduce((a, b) => a + b, 0) /
      (await this.departmentService.getEmployeeCountByDepartment(departmentId))
    );
  }
}
