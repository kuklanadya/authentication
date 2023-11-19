import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideMenuComponent } from './components/aside-menu/aside-menu.component';
import { AuthorInfoComponent } from './components/author-info/author-info.component';
import { RouterModule } from '@angular/router';
import { homeRoutes } from './home.routing';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [
    AsideMenuComponent,
    AuthorInfoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    MaterialModule,
  ]
})
export class HomeModule { }
