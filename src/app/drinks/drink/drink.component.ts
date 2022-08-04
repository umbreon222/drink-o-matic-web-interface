import { Component, EventEmitter, Input, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DrinkConfigDialogComponent } from '../drink-config-dialog/drink-config-dialog.component';
import { Drink } from 'src/models/drink';
import { ApiService } from 'src/app/api.service';
import { ConfirmDefaultCupDialogComponent } from '../confirm-default-cup-dialog/confirm-default-cup-dialog.component';
import { CupPickerDialogComponent } from '../cup-picker-dialog/cup-picker-dialog.component';
import { Cup } from 'src/models/cup';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss']
})
export class DrinkComponent {
  @Input()
  public drink: Drink;

  @Output()
  public onUpdateDrink = new EventEmitter<Drink>();

  @Output()
  public onDeleteDrink = new EventEmitter<Drink>();

  constructor(private dialog: MatDialog, private apiService: ApiService) { }

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
    if (this.drink.defaultCupId) {
      let dialogHandle = this.dialog.open(ConfirmDefaultCupDialogComponent, {
        width: '500px',
        data: this.drink.defaultCupId
      });

      dialogHandle.afterClosed().pipe(first()).subscribe((result: Cup) => {
        if (result) {
          this.submitDrinkForProcessing(result);
          return;
        }
        
        this.launchCupPickerDialog();
      });

      return;
    }

    this.launchCupPickerDialog();
  }

  launchCupPickerDialog() {
    let dialogHandle = this.dialog.open(CupPickerDialogComponent, {
      width: '500px'
    });

    dialogHandle.afterClosed().pipe(first()).subscribe((selectedCup: Cup) => {
      if (selectedCup) {
        this.submitDrinkForProcessing(selectedCup);
      }
    });
  }

  submitDrinkForProcessing(selectedCup: Cup): void {
    console.log(`Submitting drink for processing: ${this.drink.name} using cup ${selectedCup.name}`);
    this.drink.ingredientMeasurements.forEach(ingredientMeasurement => {
      // this.apiService.postPump().subscribe(() => {});
    });
  }
}
