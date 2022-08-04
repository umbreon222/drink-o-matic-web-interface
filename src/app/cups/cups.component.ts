import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Cup } from 'src/models/cup';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-cups',
  templateUrl: './cups.component.html',
  styleUrls: ['./cups.component.scss']
})
export class CupsComponent implements OnInit {
  public cups: Cup[] = [];

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.settingsService.settings$.subscribe(settings => {
      this.cups = settings.cups;
    });
  }

  deleteCup(eventInput: any) {
    console.log('deleteCup(): Not implemented yet.');
    return;
    let cupToDelete = eventInput as Cup;
    if (!cupToDelete) {
      return;
    }

    let cupIndex = this.cups.findIndex(ingredient => ingredient.id === cupToDelete.id);
    if (cupIndex > -1) {
      this.cups.splice(cupIndex, 1);
    }
  }

  updateCup(eventInput: any) {
    let cupToUpdate = eventInput as Cup;
    if (!cupToUpdate) {
      return;
    }

    let cupIndex = this.cups.findIndex(cup => cup.id === cupToUpdate.id);
    if (cupIndex > -1) {
      this.cups[cupIndex] = cupToUpdate;
      this.settingsService.storeCups(this.cups).pipe(first()).subscribe();
    }
  }
}
