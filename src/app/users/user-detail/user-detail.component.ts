import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from 'src/app/core/data-services/user-data.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User = { id: 0, name: '', birthdate: null };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private userService: UserDataService, private router: Router) {}

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.getUserDetail(this.route.snapshot.params['id']);
  }

  getUserDetail(id) {
    this.userService.getUser(id).subscribe(data => {
      this.user = data;
      console.log(this.user);
      this.isLoadingResults = false;
    });
  }

  deleteUser(id) {
    this.isLoadingResults = true;
    this.userService.deleteUser(id).subscribe(
      res => {
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
