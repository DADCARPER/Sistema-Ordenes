import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  errorstatus:boolean = false;
  errormensaje:string = '';

  
  private _authservice = inject(AuthService);
  private _router = inject(Router);

  constructor(public _formbuilder:FormBuilder) {
    
  }

  formuloguin:FormGroup = this._formbuilder.group({

    
    correoelectronico: ['',[Validators.required,Validators.email,Validators.maxLength(55)]],
    contrasena: ['',[Validators.required,Validators.maxLength(25),Validators.minLength(3)]]

  })

  ngOnInit(){
    this.revisartokenenbase();
  }

  revisartokenenbase(){
    if(localStorage.getItem("token")){
      this._router.navigate(['dashboard']);
    }
  }

  enviar():void{
    this.errorstatus = false; // se usa para al dar clic el mensaje de error se muestre nuevamente
    //console.log(this.formuloguin);
    if (this.formuloguin.valid) {

      // const datosFormulario:FormuloginI = {

      //   usuario: this.formuloguin.value.correoelectronico ?? '',
      //   password: this.formuloguin.value.contrasena ?? '',

      // }

      //console.log(datosFormulario);
      this._authservice.loginsesion(this.formuloguin.value.correoelectronico ?? '',this.formuloguin.value.contrasena ?? '').subscribe(data =>{
        let dataResponse = data;
        if(dataResponse.status == "oko"){
          localStorage.setItem("token",dataResponse.result.token);
          this._router.navigate(['dashboard']);
        }else{
          this.errorstatus = true;
          this.errormensaje = dataResponse.result.error_msg;
        }
        //console.log(data);
      })
      

    }
  }

}
