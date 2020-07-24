import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LogsService } from '../logs.service';
import { CallsService } from '../../calls/calls.service';
import { ClientService } from '../../shared/client.service';
import { SalesPersonService } from '../../shared/sales-person.service';
import { Call } from '../../calls/call.model';
import { UsersService } from 'src/app/users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Log } from '../log.model';
import { SalesPerson } from 'src/app/shared/sales-person.model';
import { Client } from 'src/app/shared/client.model';

@Component({
  selector: 'app-new-logs',
  templateUrl: './new-logs.component.html',
  styleUrls: ['./new-logs.component.css'],
})
export class NewLogsComponent implements OnInit {
  newLogForm: FormGroup;
  calls: Call[] = [];

  callDateVal: string;
  callDurationVal: string;
  salesFirstName: string;
  salesLastName: string;
  salesPhoneNumber: string;
  clientFirstName: string;
  clientLastName: string;
  clientPhoneNumber: string;

  constructor(
    private logService: LogsService,
    private callService: CallsService,
    private clientService: ClientService,
    private salesPersonService: SalesPersonService,
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.newLogForm = new FormGroup({
      callDate: new FormControl(this.callDateVal, [Validators.required]),
      callDuration: new FormControl(this.callDurationVal, [
        Validators.required,
      ]),
      salesFirstName: new FormControl(this.salesFirstName, [
        Validators.required,
      ]),
      salesLastName: new FormControl(this.salesLastName, [Validators.required]),
      salesPhoneNumber: new FormControl(this.salesPhoneNumber),
      clientFirstName: new FormControl(this.clientFirstName, [
        Validators.required,
      ]),
      clientLastName: new FormControl(this.clientLastName, [
        Validators.required,
      ]),
      clientPhoneNumber: new FormControl(this.clientPhoneNumber),
    });
  }

  onSubmit() {
    if (this.newLogForm.valid) {
      let newSalesPerson: SalesPerson;
      let newClient: Client;
      let newCall: Call;

      newSalesPerson = this.buildSalesPerson(newSalesPerson);
      newClient = this.buildClient(newClient);
      // salesPerson = this.salesPersonService.addSalesPerson(salesPerson);
      this.salesPersonService.addSalesPerson(newSalesPerson).subscribe((salesPerson) => {
        newSalesPerson = salesPerson;
        this.clientService.addClient(newClient).subscribe((client) => {
          newClient = client;
          newCall = this.buildCall(newCall, newSalesPerson, newClient);
          this.callService.addCall(newCall).subscribe(call => {
            const newLog = this.buildLog(call);
            console.log(newLog);
            this.logService.addLog(newLog).subscribe(() => {
              this.router.navigate(['existing'], { relativeTo: this.route.parent });
            });
          });
        });
      });
    }
  }

  private buildLog(call: Call) {
    return new Log(
      0,
      { ...call },
      this.userService.getCurrentUser(),
      new Date()
    );
  }

  private buildCall(call: Call, salesPerson: SalesPerson, client: Client) {
    call = new Call(
      0,
      new Date(this.newLogForm.get('callDate').value),
      this.newLogForm.get('callDuration').value,
      { ...salesPerson },
      { ...client }
    );
    return call;
  }

  private buildClient(client: Client) {
    client = new Client(
      0,
      this.newLogForm.get('clientFirstName').value,
      this.newLogForm.get('clientLastName').value,
      this.newLogForm.get('clientPhoneNumber').value
    );
    return client;
  }

  private buildSalesPerson(salesPerson: SalesPerson) {
    salesPerson = new SalesPerson(
      0,
      this.newLogForm.get('salesFirstName').value,
      this.newLogForm.get('salesLastName').value,
      this.newLogForm.get('salesPhoneNumber').value
    );
    return salesPerson;
  }

  resetForm() {
    this.newLogForm.reset();
  }
}
