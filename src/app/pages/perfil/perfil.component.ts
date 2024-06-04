import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { TemplatetopComponent } from '../templatetop/templatetop.component';
import { TemplatebotComponent } from '../templatebot/templatebot.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule,TemplatetopComponent,TemplatebotComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  private _login = inject(AuthService);

  ngOnInit(): void {
    //this.sendlogin();
    console.log("hola");
  }
  
  sendlogin(){

    // this._login.loginsesion("administracion@prevencionvialintegral.com","123456").subscribe(data =>{
    //   let dataResponse = data;
    //   if(dataResponse.status == "ok"){
    //     localStorage.setItem("token",dataResponse.result.token);
    //     this.router.navigate(['dashboard']);
    //   }else{
    //     this.errorstatus = true;
    //     this.errormensaje = dataResponse.result.error_msg;
    //   }
    //   console.log("iniciosesion correctamente"+dataResponse.status);
    
    // });
  }

}
