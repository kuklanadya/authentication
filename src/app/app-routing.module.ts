import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/components/sign-in/sign-in.component';
import { IsLoggedGuard } from './shared/guards/is-logged.guard';
import { ChangePasswordComponent } from './auth/components/change-password/change-password.component';
import { AsideMenuComponent } from './home/components/aside-menu/aside-menu.component';
import { AuthLogsComponent } from './users/components/auth-logs/auth-logs.component';
import { OperationLogsComponent } from './users/components/operation-logs/operation-logs.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/sign-in'
    },
    {
        path: '',
        canActivate: [IsLoggedGuard],
        component: AsideMenuComponent,
        children: [
            {
                path: 'users',
                loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
            },
            {
                path: 'info',
                loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'auth-logs',
                component: AuthLogsComponent
            },
            {
                path: 'operation-logs',
                component: OperationLogsComponent
            },
            {
                path: 'change-password',
                component: ChangePasswordComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: '/change-password'
            },
        ]
    },
    {
        path: 'sign-in',
        component: SignInComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
