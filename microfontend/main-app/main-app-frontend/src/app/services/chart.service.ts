import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private baseUrl = 'http://localhost:100';

  constructor(private http: HttpClient) { }
  getChartData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/chart-data`);
  }
  getChart(chartId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/chart/${chartId}`);
  }
  getColumnValues(database: string, tableName: string, column: string): Observable<any> {
    const params = new HttpParams()
      .set('database', database)
      .set('tableName', tableName)
      .set('column', column);
    return this.http.get<any>(`${this.baseUrl}/column-values`, { params });
  }
}
