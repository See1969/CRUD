import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DEFAULT_CUSTOMER } from '../shared/data/mock.data';
import { HttpService } from '../shared/services/http.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit(): void {
    this.httpService.createData(this.form.value).subscribe((_: any) => {
      this.form.reset();
    });
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      mobile: [null, [Validators.required, Validators.minLength(8)]],
      location: [null, [Validators.required]],
    });

    this.form.setValue(DEFAULT_CUSTOMER);
  }
}
