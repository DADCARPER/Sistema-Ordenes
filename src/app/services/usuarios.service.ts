import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  URL = environment.api

  private _http= inject(HttpClient);

  cargausuarios(accion:number,token:any):Observable<any>{
    
    const body = {
      accion,
      token
    }
    return this._http.post(`${this.URL}/usuarios`,body)

  }

}
