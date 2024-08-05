import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
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
    if(sessionStorage.getItem("tk")){
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
        //console.log(data);
        if(dataResponse.status == "ok"){
          sessionStorage.setItem("tk",dataResponse.result.token);
          sessionStorage.setItem("rl",dataResponse.result.rol);
          sessionStorage.setItem("us",dataResponse.result.id);
          sessionStorage.setItem("cl",dataResponse.result.colores);
          sessionStorage.setItem("pn",dataResponse.result.pnombre);
          sessionStorage.setItem("sn",dataResponse.result.snombre);
          sessionStorage.setItem("pa",dataResponse.result.papellido);
          sessionStorage.setItem("sa",dataResponse.result.sapellido);
          sessionStorage.setItem("co",dataResponse.result.correo);
          sessionStorage.setItem("fo",dataResponse.result.foto);

          this._router.navigate(['dashboard']);
        }else{
          
          this.errorstatus = true;
          this.errormensaje = dataResponse.result.error_msg;
        }
        
      })
      

    }
  }

}
