import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user'
import {UserService} from '../../../services/user.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-post-user',
  templateUrl: './post-user.component.html',
  styleUrls: ['./post-user.component.scss']
})
export class PostUserComponent implements OnInit {

  user: User = {
    names: '',
    lastNames: '',
    email: '',
    password: ''
  }

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.userService.user = new User();
    }
  }

  postUser() {
    console.log(this.user)
    // this.userService.postUser(this.user)
    //   .subscribe(
    //     res => {
    //       console.log(res)
    //     },
    //     err => {
    //       console.error(err)
    //     }
    //   )
  }

}
