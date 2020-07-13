import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms'

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {PostUserComponent} from './components/users/post-user/post-user.component';
import {HeaderComponent} from './components/home/header/header.component';
import {SidebarComponent} from './components/home/sidebar/sidebar.component';
import {UsersComponent} from './components/users/users/users.component';

/**
 * Services
 */
import {UserService} from './services/user.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PostUserComponent,
    HeaderComponent,
    SidebarComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
