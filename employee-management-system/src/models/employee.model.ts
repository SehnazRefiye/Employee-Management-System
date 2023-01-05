import { belongsTo, Entity, model, property } from '@loopback/repository';
import { Department, DepartmentWithRelations } from './department.model';

@model({
  settings: { postgresql: { table: 'employee' } },
})
export class Employee extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  first_name: string;

  @property({
    type: 'string',
    required: true,
  })
  last_name: string;

  @property({
    type: 'string',
    required: true,
  })
  phone_number: string;

  @property({
    type: 'string',
    required: true,
  })
  hire_date: string;

  @property({
    type: 'number',
    required: true,
  })
  salary: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @belongsTo(() => Department, { name: 'department' })
  departmentId: number;

  @belongsTo(() => Employee, { name: 'manager' })
  managerId: number;

  [prop: string]: any;

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  // describe navigational properties here
  manager?: EmployeeWithRelations;
  department?: DepartmentWithRelations;
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
