import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cup } from 'src/models/cup';

@Component({
  selector: 'app-cup-config-dialog',
  templateUrl: './cup-config-dialog.component.html',
  styleUrls: ['./cup-config-dialog.component.scss']
})
export class CupConfigDialogComponent implements OnInit {
  cupForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CupConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private cup: Cup,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.cupForm = this.formBuilder.group({
      imageUrl: this.cup.imageUrl,
      name: this.cup.name,
      volumeMl: this.cup.volumeMl
    });
  }

  onSubmit() {
    const updatedCup: Cup = {
      id: this.cup.id,
      imageUrl: this.cupForm.value.imageUrl,
      name: this.cupForm.value.name,
      volumeMl: this.cupForm.value.volumeMl
    }

    this.dialogRef.close(updatedCup);
  }
}