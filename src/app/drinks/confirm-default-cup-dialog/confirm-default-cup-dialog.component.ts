import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SettingsService } from 'src/app/settings.service';
import { Cup } from 'src/models/cup';

@Component({
  selector: 'app-confirm-default-cup-dialog',
  templateUrl: './confirm-default-cup-dialog.component.html',
  styleUrls: ['./confirm-default-cup-dialog.component.scss']
})
export class ConfirmDefaultCupDialogComponent implements OnInit {
  defaultCup: Cup;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDefaultCupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private defaultCupId: string,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.settingsService.settings$.subscribe(settings => {
      let cup = settings.cups.find(c => c.id === this.defaultCupId);
      if (!cup) {
        this.dialogRef.close();
        return;
      }

      this.defaultCup = cup;
    });
  }
}
