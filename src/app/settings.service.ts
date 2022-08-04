import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Cup } from 'src/models/cup';
import { Drink } from 'src/models/drink';
import { Ingredient } from 'src/models/ingredient';
import { Pump } from 'src/models/pump';
import { Settings } from 'src/models/settings';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings: Settings;
  public settings$ = new BehaviorSubject<Settings>(new Settings());

  constructor(private apiService: ApiService) {
    this.loadSettings();
  }

  public loadSettings(forceRefresh: boolean = false): void {
    if (!forceRefresh && this.settings) {
      this.settings$.next(this.settings);
      return;
    }
    this.apiService.getSettings().pipe(first()).subscribe(settings => {
      this.settings = settings;
      this.settings$.next(this.settings);
    });
  }

  public storeCups(cups: Cup[]): Observable<any> {
    this.settings.cups = cups;
    return this.storeSettings();
  }

  public storeIngredients(ingredients: Ingredient[]): Observable<any> {
    this.settings.ingredients = ingredients;
    return this.storeSettings();
  }

  public storePumps(pumps: Pump[]): Observable<any> {
    this.settings.pumps = pumps;
    return this.storeSettings();
  }

  public storeDrinks(drinks: Drink[]): Observable<any> {
    this.settings.drinks = drinks;
    return this.storeSettings();
  }

  private storeSettings(): Observable<any> {
    this.settings$.next(this.settings);
    return this.apiService.putSettings(this.settings);
  }
}
