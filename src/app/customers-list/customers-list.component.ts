import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../shared/services/http.service';
import { CustomerInterface } from '../shared/types/customer.interface';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent implements OnInit {
  constructor(public httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getData();
  }
}
