import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/core/data-services/user-data.service';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  userForm: FormGroup;
  isLoadingResults = false;

  constructor(
    private adapter: DateAdapter<any>,
    private datePipe: DatePipe,
    private router: Router,
    private userService: UserDataService,
    private formBuilder: FormBuilder,
    private translate: TranslateService
  ) {
    this.adapter.setLocale(this.translate.currentLang);
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: [null, Validators.required],
      birthdate: [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    form['birthdate'] = this.datePipe.transform(form['birthdate'], 'yyyy-MM-dd');
    console.log('form: ', form);
    this.userService.addUser(form).subscribe(
      res => {
        // const id = res['_id'];
        this.isLoadingResults = false;
        this.router.navigate(['/users']);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}
