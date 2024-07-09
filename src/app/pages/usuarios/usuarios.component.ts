import { Component, OnInit, inject } from '@angular/core';
import { TemplatebotComponent } from '../templatebot/templatebot.component';
import { TemplatetopComponent } from '../templatetop/templatetop.component';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { UsuariosService } from '../../services/usuarios.service';




@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [TemplatebotComponent,TemplatetopComponent,AgGridAngular],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {


  public pacientes:any;

  private _usuarios = inject(UsuariosService);

  // Column Definitions: Defines the columns to be displayed.

  colDefs: ColDef[] =  [
    { headerName: "#", valueGetter: "node.rowIndex + 1", minWidth: 60, maxWidth: 70  },
    { headerName: "Foto", field: "urlfoto", cellRenderer: this.fotoRenderer, cellRendererParams: (params:any) => ({ imageUrl: params.data.urlfoto, maxHeight: '40px' }),width: 70, minWidth: 90, maxWidth: 100 },
    { headerName: "Nombres", field: "nombrecompleto", filter: true, floatingFilter: true, suppressHeaderMenuButton: true, suppressFloatingFilterButton:  true,width: 200, minWidth: 100, maxWidth: 250 },
    { headerName: "Apellidos", field: "apellidocompleto", filter: true, floatingFilter: true, suppressHeaderMenuButton: true, suppressFloatingFilterButton:  true,width: 200, minWidth: 100, maxWidth: 250  },
    { headerName: "Correo", field: "correo", filter: true, floatingFilter: true, suppressHeaderMenuButton: true, suppressFloatingFilterButton:  true,width: 300, minWidth: 100, maxWidth: 350},
    { headerName: "Celular", field: "celular",width: 120, minWidth: 100, maxWidth: 200  },
    { headerName: "Roll", field: "roll", filter: true, floatingFilter: true, suppressHeaderMenuButton: true, suppressFloatingFilterButton:  true,width: 100, minWidth: 90, maxWidth: 160 },
    { headerName: "Firma", field: "urlfirma", cellRenderer: this.imageRenderer, cellRendererParams: (params:any) => ({ imageUrl: params.data.urlfirma, maxHeight: '25px' }),width: 140, minWidth: 100, maxWidth: 140 },
    { headerName: "Estado", field: "estado", filter: true, floatingFilter: true, suppressHeaderMenuButton: true, suppressFloatingFilterButton:  true,width: 100, minWidth: 90, maxWidth: 160 },
    { headerName: "Fecha", field: "fechamodificado", filter: true, floatingFilter: true, suppressHeaderMenuButton: true, suppressFloatingFilterButton:  true ,width: 160, minWidth: 100, maxWidth: 350 }
    //{ field: "escolaridad",valueFormatter: this.formatoEscolaridad, width: 120, minWidth: 120, maxWidth: 160 }
  ];


  cargarpaicentes(){
    let token = "d9f495f93f200f5be8c002eb4c9b22ba";
    this._usuarios.cargausuarios(1,token).subscribe(data=>{
      console.log(data);
      this.pacientes= data;
    
  })
  }

  activomodal(content:any,event:any){

    //this.id = event.data.pacienteid;
  }

  imageRenderer(params:any) {
    const imageUrl = params.imageUrl;
    const maxHeight = params.maxHeight;
    return `<img src="./assets/${imageUrl}" style="max-height: ${maxHeight};">`;
  }

  fotoRenderer(param:any) {
    const imageUrl = param.imageUrl;
    const maxHeight = param.maxHeight;
    return `<img src="./assets/${imageUrl}" style="max-height: ${maxHeight};">`;
  }

  ngOnInit(): void {
    console.log("holaaaaaaaaaaaaaaaa");
    this.cargarpaicentes();
  }
    


  sendlogin(){

    
    
  }

}
