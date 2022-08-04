import { Component, EventEmitter, Input, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Cup } from 'src/models/cup';
import { CupConfigDialogComponent } from '../cup-config-dialog/cup-config-dialog.component';

@Component({
  selector: 'app-cup',
  templateUrl: './cup.component.html',
  styleUrls: ['./cup.component.scss']
})
export class CupComponent {
  @Input()
  cup: Cup;

  @Output()
  public onUpdateCup = new EventEmitter<Cup>();

  @Output()
  public onDeleteCup = new EventEmitter<Cup>();

  constructor(private dialog: MatDialog) { }

  openCupConfig() {
    let dialogHandle = this.dialog.open(CupConfigDialogComponent, {
      width: '500px',
      data: this.cup,
    });

    dialogHandle.afterClosed().pipe(first()).subscribe((result: Cup) => {
      if (result) {
        this.cup = result;
        this.onUpdateCup.emit(this.cup);
      }
    });
  }

  deleteCupClicked() {
    this.onDeleteCup.emit(this.cup);
  }
}
