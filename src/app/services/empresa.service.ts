import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  URL = environment.api

  private _http= inject(HttpClient);

  cargaproveedor(idcompania:any,accion:number,token:any):Observable<any>{
    
    const body = {
      accion,
      idcompania,
      token
    }
    return this._http.post(`${this.URL}/empresas`,body)

  }

}
