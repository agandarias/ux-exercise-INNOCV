import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/core/data-services/user-data.service';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'birthdate'];
  dataSource = new MatTableDataSource<User>();
  noData = this.dataSource.connect().pipe(map(data => data.length === 0));
  users: User[] = [];
  isLoadingResults = true;
  filterForm: FormGroup;
  searchValue = '';

  constructor(private userService: UserDataService, private translate: TranslateService) {}

  ngOnInit() {
    this.getUsers();
  }

  public getUsers() {
    this.isLoadingResults = true;
    this.userService.getUsers().subscribe(users => {
      this.dataSource.data = users;
      this.isLoadingResults = false;
    });
  }

  public search(searchValue: string) {
    console.log('searchValue: ', searchValue);
    this.dataSource.filter = searchValue.trim().toLocaleLowerCase();
  }

  public useLanguage(language: string) {
    this.translate.use(language);
  }
}
