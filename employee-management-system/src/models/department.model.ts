import { belongsTo, Entity, model, property } from '@loopback/repository';
import { Location, LocationWithRelations } from './location.model';

@model({
  settings: { postgresql: { table: 'department' } },
})
export class Department extends Entity {
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
  department_name: string;

  @property({
    type: 'number',
  })
  managerId: number;

  @belongsTo(() => Location)
  locationId: number;

  [prop: string]: any;

  /*
  @property({
    type: 'number',
    required: true,
  })
  locationId: 'number';

  // relation
  @belongsTo(() => Location, { name: 'location' })
  locationId: number;

  [prop: string]: any;
  */

  constructor(data?: Partial<Department>) {
    super(data);
  }
}

export interface DepartmentRelations {
  // describe navigational properties here
  location?: LocationWithRelations;
}

export type DepartmentWithRelations = Department & DepartmentRelations;
