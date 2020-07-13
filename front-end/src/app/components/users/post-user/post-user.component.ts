import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user'
import {UserService} from '../../../services/user.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

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

  edit: boolean = false;

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    // if(params._id) {
    //   this.userService.putUser(params._id)
    //     .subscribe(
    //       res => {
    //         console.log(res);
    //         this.user = res;
    //         this.edit = true;
    //       },
    //       err => {
    //         console.error(err)
    //       }
    //     )
    // }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.userService.user = new User();
    }
  }

  postUser() {
    delete this.user._id;

    console.log(this.user)
    this.userService.postUser(this.user)
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(['/users']);
        },
        err => {
          console.error(err)
        }
      )
  }

  putUser() {
    this.userService.putUser(this.user._id, this.user)
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(['/users'])
        },
        err => {
          console.error(err)
        }
      )
  }

}
