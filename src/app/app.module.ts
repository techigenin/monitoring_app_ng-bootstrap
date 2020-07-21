import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRouterModule } from './app-router.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UserDetailsComponent } from './users/user-list/user-details/user-details.component';
import { UserWarningComponent } from './users/user-warning/user-warning.component';

import { LogsComponent } from './logs/logs.component';
import { NewLogsComponent } from './logs/new-logs/new-logs.component';
import { ExistingLogsComponent } from './logs/existing-logs/existing-logs.component';
import { ShowCommentsComponent } from './comments/show-comments/show-comments.component';
import { AddEditCommentComponent } from './comments/add-edit-comment/add-edit-comment.component';
import { CommentCardComponent } from './comments/comment-card/comment-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    UsersComponent,
    AddUserComponent,
    UserListComponent,
    UserWarningComponent,
    LogsComponent,
    ExistingLogsComponent,
    NewLogsComponent,
    ShowCommentsComponent,
    AddEditCommentComponent,
    CommentCardComponent,
    UserDetailsComponent,
  ],
  imports: [BrowserModule, AppRouterModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [UserWarningComponent],
})
export class AppModule {}
