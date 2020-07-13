import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: any = []

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUsers().subscribe(
      res => {
        this.users = res;
      },
      err => console.error(err)
    );
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(
      res => {
        console.log(res)
        this.getUser()
      },
      err => {
        console.error(err)
      }
    )
  }

  putUser(id: String) {
    console.log(id)
  }

}
