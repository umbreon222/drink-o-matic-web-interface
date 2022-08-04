import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/settings.service';
import { Cup } from 'src/models/cup';

@Component({
  selector: 'app-cup-picker-dialog',
  templateUrl: './cup-picker-dialog.component.html',
  styleUrls: ['./cup-picker-dialog.component.scss']
})
export class CupPickerDialogComponent implements OnInit {
  selectedCup: Cup | undefined;
  cups: Cup[];

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.settings$.subscribe(settings => {
      this.cups = settings.cups;
    });
  }
}
