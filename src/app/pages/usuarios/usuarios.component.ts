import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TemplatebotComponent } from '../templatebot/templatebot.component';
import { TemplatetopComponent } from '../templatetop/templatetop.component';



@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [TemplatebotComponent,TemplatetopComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {


  private _auth = inject(AuthService);

  ngOnInit(): void {
    console.log("holaaaaaaaaaaaaaaaa");
  }
    


  sendlogin(){

    
    
  }

}
