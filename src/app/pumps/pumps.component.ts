import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Pump } from 'src/models/pump';
import { ApiService } from '../api.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-pumps',
  templateUrl: './pumps.component.html',
  styleUrls: ['./pumps.component.scss']
})
export class PumpsComponent implements OnInit {
  public pumps: Pump[] = [];

  constructor(private settingsService: SettingsService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.settingsService.settings$.subscribe(settings => {
      this.pumps = settings.pumps;
      if (this.pumps && this.pumps.length === 0) {
        this.apiService.getPumpStates().subscribe(pumpStates => {
          console.log(pumpStates);
          this.pumps = pumpStates.map(pumpState => {
            return { pumpNumber: pumpState.pumpNumber, ingredientId: null } as Pump
          });
          this.settingsService.storePumps(this.pumps).pipe(first()).subscribe();
        });
      }
    });
  }

  updatePump(eventInput: any) {
    let pumpToUpdate = eventInput as Pump;
    if (!pumpToUpdate) {
      return;
    }

    let pumpIndex = this.pumps.findIndex(pump => pump.pumpNumber === pumpToUpdate.pumpNumber);
    if (pumpIndex > -1) {
      this.pumps[pumpIndex] = pumpToUpdate;
      this.settingsService.storePumps(this.pumps).pipe(first()).subscribe();
    }
  }
}
