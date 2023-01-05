import { belongsTo, Entity, model, property } from '@loopback/repository';
import { Employee, EmployeeWithRelations } from './employee.model';

@model({
  settings: { postgresql: { table: 'title' } },
})
export class Title extends Entity {
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
  start_date: string;

  @property({
    type: 'string',
  })
  finish_date: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'number',
    required: true,
  })
  departmentId: number;

  @belongsTo(() => Employee, { name: 'employee' })
  employeeId: number;

  [prop: string]: any;

  /*
  @property({
    type: 'number',
    required: true,
  })
  employeeId: number;
  */

  constructor(data?: Partial<Title>) {
    super(data);
  }
}

export interface TitleRelations {
  // describe navigational properties here
  employee?: EmployeeWithRelations;
}

export type TitleWithRelations = Title & TitleRelations;
