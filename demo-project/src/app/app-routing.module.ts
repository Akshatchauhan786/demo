import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RegistrationComponent } from './home/registration/registration.component';
import { AuthGuard } from './services/auth.guard';
import { SharedComponent } from './shared/shared.component';

const routes: Routes = [



    // brfor landing page and login and registration page
    // { path: '', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) }, 
    // brfor landing page and login and registration page


// After landing page and login and registration page

  {path:'',component:HomeComponent, pathMatch: 'full'},
  {path:'login',component:LoginComponent},
  {path:'registration',component:RegistrationComponent},

  { path: 'share', canActivate: [AuthGuard],loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },

  // {path: '', loadChildren:() => import('./shared/shared.module').then(m => m.SharedModule)}

  // {path: 'approved', component:SharedComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
  // schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }
