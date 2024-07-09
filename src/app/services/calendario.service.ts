import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  URL = environment.api

  private _http= inject(HttpClient);

  cargaeventos(accion:number,numcalendario:number,micalen:any,token:string):Observable<any>{
    
    const body = {
      accion,
      numcalendario,
      micalen,
      token
    }
    return this._http.post(`${this.URL}/calendario`,body)

  }
}
