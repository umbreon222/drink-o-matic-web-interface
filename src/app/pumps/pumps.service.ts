import { Injectable } from '@angular/core';
import { Pump } from 'src/models/pump';

@Injectable({
  providedIn: 'root'
})
export class PumpsService {
  private pumps: Pump[] = [];

  constructor() {
    this.loadPumps();
  }

  loadPumps(): void {
    this.pumps = [
      {
        pumpNumber: 1,
        ingredientId: 'ingredient1'
      },
    ];
  }

  storePumps(pumps: Pump[]): void {
    this.pumps = pumps;
    console.log('storePumps()');
  }

  getPumps(): Pump[] {
    return [...this.pumps];
  }
}
