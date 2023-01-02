import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Pump } from 'src/models/pump';
import { PumpConfigDialogComponent } from '../pump-config-dialog/pump-config-dialog.component';
import { SettingsService } from 'src/app/settings.service';
import { Ingredient } from 'src/models/ingredient';

@Component({
  selector: 'app-pump',
  templateUrl: './pump.component.html',
  styleUrls: ['./pump.component.scss']
})
export class PumpComponent implements OnInit {
  @Input()
  public pump: Pump
  public ingredient: Ingredient | null

  @Output()
  public onUpdatePump = new EventEmitter<Pump>();

  constructor(private dialog: MatDialog, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.ingredient = null;
    if (this.pump.ingredientId){
      this.settingsService.settings$.subscribe(settings => {
        this.ingredient = settings.ingredients.find(ingredient => this.pump.ingredientId === ingredient.id) ?? null;
      });
    }
  }
  
  openPumpConfig() {
    let dialogHandle = this.dialog.open(PumpConfigDialogComponent, {
      width: '500px',
      data: this.pump,
    });

    dialogHandle.afterClosed().pipe(first()).subscribe((result: Pump) => {
      if (result) {
        this.pump = result;
        this.onUpdatePump.emit(this.pump);
      }
    });
  }
}
