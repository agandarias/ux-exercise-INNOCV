import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ErrorService } from '../../models/error.model';

@Component({
  selector: 'app-root',
  templateUrl: './errordialog.component.html'
})

export class ErrorDialogComponent {
  public dataError: ErrorService;
  constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorService) {this.dataError = data; }
}
