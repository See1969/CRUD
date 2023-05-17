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
  isEditPos!: number | null;
  isNotChanged!: boolean;
  tempCustomer!: Partial<CustomerInterface>;

  constructor(public httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getData();
    this.resetEditStatus();
  }

  private resetEditStatus() {
    this.isEditPos = null;
    this.isNotChanged = true;
    this.tempCustomer = this.resetCustomer();
  }

  editCustomer(i: number): void {
    this.isEditPos = i;
  }

  cancelEdit(): void {
    this.resetEditStatus();
  }

  saveCustomer(customer: CustomerInterface, i: number): void {
    const mergedCustomer = { ...customer, ...this.tempCustomer };
    this.httpService.updateData(mergedCustomer, i).subscribe(() => {
      this.resetEditStatus();
    });
  }

  deleteCustomer(customer: CustomerInterface): void {
    this.httpService.deleteData(customer);
  }

  setValue(key: string, original: string, value: string): void {
    const valueTrim = value.trim();

    if (original === value) return;
    if (valueTrim === this.tempCustomer[key as keyof CustomerInterface]) return;

    this.tempCustomer[key as keyof CustomerInterface] = valueTrim;
    this.isNotChanged = false;
  }

  private resetCustomer = (): Partial<CustomerInterface> => ({});
}
