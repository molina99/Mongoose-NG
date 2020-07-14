import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from "../../models/user";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = {
    names: '',
    lastNames: '',
    email: '',
    password: ''
  }

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  loginUser() {
    let dataLogin = {
      user: {
        email: this.user.email,
        password: this.user.password
      }
    }
    console.log(dataLogin)
    this.userService.loginUser(dataLogin)
      .subscribe(
        res => {
          console.log(res)
          // this.router.navigate(['/users']);
        },
        err => {
          console.log(err)
        }
      )
  }

}
