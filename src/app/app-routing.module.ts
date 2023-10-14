import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchUserComponent } from './components/search-user/search-user.component';
import { ShowUserComponent } from './components/show-user/show-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { scoreGuard } from '../app/guards/score.guard';

const routes: Routes = [
  {path:'', component:SearchUserComponent},
  {path:'show-user/:login', component:ShowUserComponent,
  canActivate: [ scoreGuard ] },
  {path:'list-user/:login', component:ListUserComponent},
  {path:'**', component:SearchUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
