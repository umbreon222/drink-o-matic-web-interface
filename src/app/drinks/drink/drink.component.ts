import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss']
})
export class DrinkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openDrinkConfig() {
    console.log('openDrinkConfig()');
  }

  deleteDrinkClicked() {
    console.log('deleteDrinkClicked()');
  }
}
