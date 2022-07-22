import { Inject, Injectable } from '@angular/core';
import { Pump } from 'src/models/pump';
import { Settings, SETTINGS } from 'src/models/settings';

@Injectable({
  providedIn: 'root'
})
export class PumpsService {
  private pumps: Pump[] = [];

  constructor(@Inject(SETTINGS) settings: Settings) {
    this.pumps = settings.pumps;
  }

  getPumps(): Pump[] {
    return [...this.pumps];
  }
}
