import { Component, EventEmitter, Input, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DrinkConfigDialogComponent } from '../drink-config-dialog/drink-config-dialog.component';
import { Drink } from 'src/models/drink';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss']
})
export class DrinkComponent {
  @Input()
  public drink: Drink;

  @Output()
  public onSubmitDrinkForProcessing = new EventEmitter<Drink>();

  @Output()
  public onUpdateDrink = new EventEmitter<Drink>();

  @Output()
  public onDeleteDrink = new EventEmitter<Drink>();

  constructor(private dialog: MatDialog) { }

  openDrinkConfig() {
    let dialogHandle = this.dialog.open(DrinkConfigDialogComponent, {
      width: '500px',
      data: this.drink,
    });

    dialogHandle.afterClosed().pipe(first()).subscribe((result: Drink) => {
      if (result) {
        this.drink = result;
        this.onUpdateDrink.emit(this.drink);
      }
    });
  }

  deleteDrinkClicked() {
    this.onDeleteDrink.emit(this.drink);
  }

  requestSubmitDrinkForProcessing() {
    this.onSubmitDrinkForProcessing.emit(this.drink);
  }
}
