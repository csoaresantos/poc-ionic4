import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.page.html',
  styleUrls: ['./suppliers.page.scss'],
})
export class SuppliersPage implements OnInit {

  constructor(private menuControl: MenuController) { }

  ngOnInit() {
  }

  openMenu() {
    this.menuControl.toggle();
  }
}
