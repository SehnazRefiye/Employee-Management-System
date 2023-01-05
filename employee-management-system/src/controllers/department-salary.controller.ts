import { inject } from '@loopback/core';
import { param, get } from '@loopback/rest';
import { SalaryService } from '../services';

export class DepartmentSalaryController {
  constructor(
    @inject('salary.service')
    private salaryService: SalaryService,
  ) { }

  // DEPARTMENT TO AVERAGE SALARY
  @get('/departments/{id}/average/salary', {
    responses: {
      '200': {
        description: 'Department model count',
        content: {
          'application/json': {},
        },
      },
    },
  })
  async averageSalary(
    @param.path.number('id') id: number
  ): Promise<number> {
    console.log(`GET /departments/${id}/average/salary`);
    return this.salaryService.getAverageSalaryByDepartment(id);
  }
}