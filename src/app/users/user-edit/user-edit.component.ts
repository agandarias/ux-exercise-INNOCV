import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from 'src/app/core/data-services/user-data.service';
import { User } from 'src/app/shared/models/user.model';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  id: number;
  isLoadingResults = false;

  constructor(
    private adapter: DateAdapter<any>,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserDataService,
    private formBuilder: FormBuilder,
    private translate: TranslateService

  ) {
    this.adapter.setLocale(this.translate.currentLang);
  }

  ngOnInit() {
    this.getUser(this.route.snapshot.params['id']);
    this.userForm = this.formBuilder.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      birthdate: [null, Validators.required]
    });
  }

  getUser(id: number) {
    this.userService.getUser(id).subscribe((user: User) => {
      this.id = user.id;
      this.userForm.setValue({
        id: user.id,
        name: user.name,
        birthdate: user.birthdate
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    form['birthdate'] = this.datePipe.transform(form['birthdate'], 'yyyy-MM-dd');
    console.log('form: ', form);
    this.userService.updateUser(form).subscribe(
      resp => {
        const id = form['id'];
        this.isLoadingResults = false;
        this.router.navigate(['/user-detail', id]);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  userDetail() {
    this.router.navigate(['/detail', this.id]);
  }
}
