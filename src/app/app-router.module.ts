import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LogsComponent } from './logs/logs.component';
import { NewLogsComponent } from './logs/new-logs/new-logs.component';
import { ExistingLogsComponent } from './logs/existing-logs/existing-logs.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { ShowCommentsComponent } from './comments/show-comments/show-comments.component';
import { AddEditCommentComponent } from './comments/add-edit-comment/add-edit-comment.component';
import * as Resolvers from './shared/resolvers.service';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'logs',
    component: LogsComponent,
    resolve: [
      Resolvers.LogsResolverService,
      Resolvers.CallResolverService,
      Resolvers.SalesPersonResolver,
      Resolvers.ClientResolver,
      Resolvers.UsersResolverService
    ],
    children: [
      { path: 'new', component: NewLogsComponent },
      {
        path: 'existing',
        component: ExistingLogsComponent,
        children: [
          { path: 'show/:id', component: ShowCommentsComponent },
          { path: 'comments/add/:logId', component: AddEditCommentComponent },
          {
            path: 'comments/edit/:logId/:id',
            component: AddEditCommentComponent,
          },
        ],
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'list',
        component: UserListComponent,
        resolve: [Resolvers.UsersResolverService],
      },
      { path: 'add', component: AddUserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouterModule {}
