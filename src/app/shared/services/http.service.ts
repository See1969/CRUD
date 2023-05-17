import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DEFAULT_CUSTOMER } from '../data/mock.data';
import { CustomerInterface } from '../types/customer.interface';
import { RequestCustomerInterfase } from '../types/request-customer.interface';
import { ResponseCustomerInterface } from '../types/response-customer.interface';

const url: string =
  'https://angular-firebase-deploy2023-default-rtdb.europe-west1.firebasedatabase.app/customers';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  customers: CustomerInterface[] = [];

  constructor(private http: HttpClient) {}

  //CRUD
  // Create => POST, PATCH(без id/но фактически ошибочное создание данных)
  createData(customer: CustomerInterface): void {
    this.http
      .post<RequestCustomerInterfase>(`${url}.json`, customer, httpOptions)
      .subscribe({
        next: (res: RequestCustomerInterfase) => {
          this.customers.push({ ...{ key: res.name }, ...customer });
        },
        error: (err) => console.log(err),
      });
  }
  // Read => GET
  getData(): void {
    this.http
      .get<ResponseCustomerInterface>(`${url}.json`, httpOptions)
      .pipe(
        map((res) => {
          const arr: CustomerInterface[] = [];
          Object.keys(res).forEach((key) => arr.push({ key, ...res[key] }));
          return arr;
        })
      )
      .subscribe({
        next: (customers: CustomerInterface[]) => {
          this.customers = customers;
        },
        error: (err) => console.log(err),
      });
  }
  // Update => PUT, PATCH
  updateData(): void {}
  // Delete => DELETE
  deleteData(): void {}
}
