import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly http = inject(HttpClient);

  public addEmployee(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/employess', data);
  }

  public updateEmployee(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/employess/${id}`, data);
  }

  public getEmployeeList(): Observable<any> {
    return this.http.get('http://localhost:3000/employess');
  }

  public deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/employess/${id}`);
  }
}
