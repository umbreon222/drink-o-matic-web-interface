import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Drink } from 'src/models/drink';

@Component({
  selector: 'app-drink-config-dialog',
  templateUrl: './drink-config-dialog.component.html',
  styleUrls: ['./drink-config-dialog.component.scss']
})
export class DrinkConfigDialogComponent implements OnInit {
    constructor(
      public dialogRef: MatDialogRef<DrinkConfigDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public drink: Drink,
    ) { }

  ngOnInit(): void { }
  
  closeDialog() {
    this.dialogRef.close(this.drink);
  }
}
