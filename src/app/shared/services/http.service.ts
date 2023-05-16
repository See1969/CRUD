import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DEFAULT_CUSTOMER } from '../data/mock.data';
import { CustomerInterface } from '../types/customer.interface';
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
  createData(): void {
    this.http.post(`${url}.json`, DEFAULT_CUSTOMER, httpOptions).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }
  // Read => GET
  getData(): Observable<CustomerInterface[]> {
    return this.http
      .get<ResponseCustomerInterface>(`${url}.json`, httpOptions)
      .pipe(
        map((res) => {
          const arr: CustomerInterface[] = [];
          Object.keys(res).forEach((key) => arr.push({ key, ...res[key] }));
          return arr;
        })
      );
    // .subscribe({
    //   next: (res: ResponseCustomerInterface) => {
    //     Object.keys(res).forEach((key) => {
    //       this.customers.push({ key, ...res[key] });
    //     });
    //   },
    //   error: (err) => console.log(err),
    // });
  }
  // Update => PUT, PATCH
  updateData(): void {}
  // Delete => DELETE
  deleteData(): void {}
}
