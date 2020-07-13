import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from './components/users/users/users.component';
import {PostUserComponent} from "./components/users/post-user/post-user.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UsersComponent},
  {path: 'form-post-user', component: PostUserComponent},
  {path: 'form-put-user', component: PostUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
