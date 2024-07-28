import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers: any = {
    'X-RapidAPI-Key': '327b4d7150msh0615fa7d15aa6d8p1b75e7jsna0f0d07797a9',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }

  constructor(private http: HttpClient) {
  }

  /**
   * Traer los quipos por liga y año
   * @param league
   */
  async readTeam(league: number = 39): Promise<any> {
    const URL = `https://api-football-v1.p.rapidapi.com/v3/teams?league=${league}&season=2024`;
    return new Promise((resolve, reject) => {
      return this.http?.get(`${URL}`, {headers: this.headers}).subscribe((response: any) => {
        return resolve(response);
      });
    });
  }

  /**
   * Listar los jugadores por equipo
   * @param tema
   */
  async readData(tema: any): Promise<any> {
    const URL = `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=${tema}`;
    return new Promise((resolve, reject) => {
      return this.http?.get(`${URL}`, {headers: this.headers}).subscribe((response: any) => {
        return resolve(response);
      });
    });
  }

}
