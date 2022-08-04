import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Pump } from 'src/models/pump';
import { PumpConfigDialogComponent } from '../pump-config-dialog/pump-config-dialog.component';

@Component({
  selector: 'app-pump',
  templateUrl: './pump.component.html',
  styleUrls: ['./pump.component.scss']
})
export class PumpComponent implements OnInit {
  @Input()
  public pump: Pump

  @Output()
  public onUpdatePump = new EventEmitter<Pump>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  openIngredientConfig() {
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
