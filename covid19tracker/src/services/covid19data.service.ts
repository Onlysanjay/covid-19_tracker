import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Covid19dataService {
  url = "https://api.covid19india.org/data.json";
  constructor(private http: HttpClient) { }
  /**
   * getCovidData
   * @param getCovidData to get data from https://api.covid19india.org
   */
  public getCovidData() {
    return this.http.get(this.url)
  }
}
