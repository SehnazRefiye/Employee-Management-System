import { inject } from '@loopback/core';
import { param, get } from '@loopback/rest';
import { EmployeeService } from '../services';

export class TitleChangeHistoryController {
  constructor(
    @inject('employee.service')
    private employeeService: EmployeeService,
  ) { }

  // retrieves employee info with title change history
  @get('/employees/{id}/title/change/history', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: {
          'application/json': {},
        },
      },
    },
  })
  async getTitleChangesByEmployeeId(
    @param.path.number('id') id: number,
  ): Promise<any> {
    console.log(`GET /employees/${id}/title/change/history`);
    return this.employeeService.getTitleChangesByEmployeeId(id);
  }
}
