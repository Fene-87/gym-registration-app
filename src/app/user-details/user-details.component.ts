import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  public userId!: number;
  userDetail!: User;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.userId = val['id'];
      this.fetchUserDetails(this.userId)
    })
  }

  fetchUserDetails(userId: number) {
    this.api.getRegisteredUserId(this.userId)
    .subscribe(res => {
      this.userDetail = res;
    })
  }

}
