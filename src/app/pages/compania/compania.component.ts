import { Component, OnInit, inject } from '@angular/core';
import { TemplatebotComponent } from '../templatebot/templatebot.component';
import { TemplatenavComponent } from '../templatenav/templatenav.component';
import { TemplatetopComponent } from '../templatetop/templatetop.component';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { CompaniasService } from '../../services/companias.service';



@Component({
  selector: 'app-compania',
  standalone: true,
  imports: [TemplatebotComponent,TemplatenavComponent,TemplatetopComponent,AgGridAngular],
  templateUrl: './compania.component.html',
  styleUrl: './compania.component.css'
})
export class CompaniaComponent {

  public pacientes:any;  

  private _companias = inject(CompaniasService);

  // Column Definitions: Defines the columns to be displayed.

  colDefs: ColDef[] =  [
    { headerName: "#", valueGetter: "node.rowIndex + 1", minWidth: 60, maxWidth: 70  },
    { headerName: "Nit", field: "nit", filter: true, floatingFilter: true, suppressHeaderMenuButton: true, suppressFloatingFilterButton:  true,width: 200, minWidth: 100, maxWidth: 250 },
    { headerName: "Empresa", field: "nombre", filter: true, floatingFilter: true, suppressHeaderMenuButton: true, suppressFloatingFilterButton:  true,width: 200, minWidth: 100, maxWidth: 250  },
    { headerName: "Dirección", field: "direccion", filter: true, floatingFilter: true, suppressHeaderMenuButton: true, suppressFloatingFilterButton:  true,width: 300, minWidth: 100, maxWidth: 350},
    { headerName: "Ciudad", field: "ciudad",width: 120, minWidth: 100, maxWidth: 200  },
    { headerName: "T. Fijo", field: "telefono", filter: true, floatingFilter: true, suppressHeaderMenuButton: true, suppressFloatingFilterButton:  true,width: 100, minWidth: 90, maxWidth: 160 },
    { headerName: "T. Celular", field: "celular", filter: true, floatingFilter: true, suppressHeaderMenuButton: true, suppressFloatingFilterButton:  true,width: 100, minWidth: 90, maxWidth: 160 },
    { headerName: "Correo electronico", field: "correo", filter: true, floatingFilter: true, suppressHeaderMenuButton: true, suppressFloatingFilterButton:  true ,width: 160, minWidth: 100, maxWidth: 350 },
    { headerName: "Contacto", field: "contactonombre", filter: true, floatingFilter: true, suppressHeaderMenuButton: true, suppressFloatingFilterButton:  true,width: 100, minWidth: 90, maxWidth: 160 },
    { headerName: "Cargo contacto", field: "contactocargo", filter: true, floatingFilter: true, suppressHeaderMenuButton: true, suppressFloatingFilterButton:  true,width: 100, minWidth: 90, maxWidth: 160 }
    //{ field: "escolaridad",valueFormatter: this.formatoEscolaridad, width: 120, minWidth: 120, maxWidth: 160 }
  ];

  ngOnInit(): void {
    console.log("holaaaaaaaaaaaaaaaa");
    this.cargarpaicentes();
  }

  cargarpaicentes(){
    let token = "d9f495f93f200f5be8c002eb4c9b22ba";
    this._companias.cargacompanias("si",1,token).subscribe(data=>{
      console.log(data);
      this.pacientes= data;
    
  })
  }

  activomodal(content:any,event:any){

    //this.id = event.data.pacienteid;
  }

}
