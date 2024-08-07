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

  cargaeventos(accion:any,numcalendario:any,micalen:any,token:string):Observable<any>{
    
    const body = {
      accion, // nuevo, editar, eliminar -> 1
      numcalendario, // 1 principal
      micalen, // id usuario que pertenece el calendario
      token
    }
    return this._http.post(`${this.URL}/calendario`,body);

  }

  eliminarevento(accion:any,numcalendario:any,idelimina:any,token:any):Observable<any>{

    const body = {
      accion, // nuevo, editar, eliminar -> 4
      numcalendario, // 1 principal
      idelimina, // id del evento a elminar
      token
    }
    
    return this._http.post(`${this.URL}/calendario`,body);

  }

  editarevento(accion:any,numcalendario:any,ideditar:any,titulo:any,fechinicial:any,fechfinal:any,hinicial:any,hfinal:any,descripcion:any,token:any):Observable<any>{

    const body = {
      accion, // nuevo, editar, eliminar -> 2
      numcalendario, // 1 principal
      ideditar, // id del evento a elminar
      titulo,
      fechinicial,
      fechfinal,
      hinicial,
      hfinal,
      descripcion,
      token
    }
    //console.log(body);
    return this._http.post(`${this.URL}/calendario`,body);

  }

  crearevento(accion:any,numcalendario:any,titulo:any,fechinicial:any,fechfinal:any,hinicial:any,hfinal:any,usuarioid:any,usuarioidasignado:any,descripcion:any,color:any,token:any):Observable<any>{

    const body = {
      accion, // nuevo, editar, eliminar -> 2
      numcalendario, // 1 principal
      titulo, // id del evento a elminar
      descripcion,
      fechinicial,
      fechfinal,
      hinicial,
      hfinal,
      usuarioid,
      usuarioidasignado,
      color,
      token
    }
    //console.log(body);
    return this._http.post(`${this.URL}/calendario`,body);

  }

}
