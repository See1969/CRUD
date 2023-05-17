import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
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
  createData(
    customer: CustomerInterface
  ): Observable<RequestCustomerInterfase> {
    return this.http
      .post<RequestCustomerInterfase>(`${url}.json`, customer, httpOptions)
      .pipe(
        tap((res: RequestCustomerInterfase) => {
          this.customers.push({ ...{ key: res.name }, ...customer });
        })
      );
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
  updateData(customer: CustomerInterface, i: number): Observable<any> {
    const { key, ...data } = customer;
    return this.http
      .put(`${url}/${key}.json`, data, httpOptions)
      .pipe(tap(() => (this.customers[i] = customer)));
  }

  // Delete => DELETE
  deleteData(customer: CustomerInterface): void {
    this.http.delete(`${url}/${customer.key}.json`).subscribe({
      next: () => this.customers.splice(this.customers.indexOf(customer), 1),
      error: (err) => console.log(err),
    });
  }
}
