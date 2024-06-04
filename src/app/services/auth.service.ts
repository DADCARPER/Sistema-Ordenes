import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = environment.api

  private _http= inject(HttpClient);

  loginsesion(correo:string,password:string):Observable<any>{
    
    const body = {
      correo,
      password
    }
    return this._http.post(`${this.URL}/auth`,body)

  }

  
}
