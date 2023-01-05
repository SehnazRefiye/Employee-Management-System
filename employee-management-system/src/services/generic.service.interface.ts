export interface GenericServiceInterface { }

export interface EmployeeServiceInterface extends GenericServiceInterface {
  getTitleChangesByEmployeeId(employeeId: number): Promise<any>;
}

export interface DepartmentServiceInterface extends GenericServiceInterface {
  getEmployeeCountByDepartment(departmentId: number): Promise<any>;
}

export interface ManagerServiceInterface extends GenericServiceInterface {
  getManagers(): Promise<any>;
  getEmployeesByManagerId(managerId: number): Promise<any>;
  getHierarchy(): Promise<any>;
}

export interface SalaryServiceInterface extends GenericServiceInterface {
  getAverageSalaryByDepartment(departmentId: number): Promise<any>;
}
