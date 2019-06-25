import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      { 
        path: 'suppliers-location', 
        loadChildren: '../suppliers-location/suppliers-location.module#SuppliersLocationPageModule' 
      },
      { 
        path: 'suppliers', 
        loadChildren: '../suppliers/suppliers.module#SuppliersPageModule' 
      },
    ]
  },
  {
    path: '',
    redirectTo: '/menu/suppliers'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
