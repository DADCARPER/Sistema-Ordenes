import { Component, ViewChild, TemplateRef, ViewContainerRef, OnInit, inject } from '@angular/core';
import { TemplatetopComponent } from '../templatetop/templatetop.component';
import { TemplatenavComponent } from '../templatenav/templatenav.component';
import { TemplatebotComponent } from '../templatebot/templatebot.component';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { NgbModal, NgbModule, NgbTooltipModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import tippy, { Instance } from 'tippy.js';
import { CalendarioService } from '../../services/calendario.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { an } from '@fullcalendar/core/internal-common';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,TemplatetopComponent,TemplatenavComponent,TemplatebotComponent,FullCalendarModule,NgbTooltipModule,NgbModule,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  @ViewChild('fullcalendar') calendarComponent!: FullCalendarComponent;

  //modals
  modal0?: NgbModalRef;
  @ViewChild('modal1') modal1!: TemplateRef<any>; // Referencia al template del modal
  modal2?: NgbModalRef;
  modal3?: NgbModalRef;
  @ViewChild('modal4') modal4!: TemplateRef<any>; // Referencia al template del modal
  modal5?: NgbModalRef;

  lastClicked: number = 0;
  events: any;
  eventoactualdioclic: any;

  creareventoactualdioclic: any;
  nombrequiencrea: any;

  idevento:any;
  tituloevento: any;
  startevento: any;
  starmilitar: any;
  endevento: any;
  endmilitar: any;
  fechainicial: any;
  fechafinal:any;
  descripcionevento: any;
  usuarioevento: any;
  quienasigno: any;
  todoeldia: any;

  tippyreloj: any;

  idlogueado: any;
  roll:any;
  pacientes:any;

 
  lastClickTime:any;

  vistatotal: string = 'no';

  selectedValues: string[] = []; // Array para almacenar los valores seleccionados del select crear
  selectedNames: string[] = []; // Array para almacenar los nombres completos seleccionados
  

  private _calendario = inject(CalendarioService);
  private _serviciomodal = inject(NgbModal);
  private _formbuilder = inject(FormBuilder);
  private _router = inject(Router);
  private _usuarios = inject(UsuariosService);




  //Formulario editar

  formueditar = this._formbuilder.group({

    titulo: ['',[Validators.required,Validators.maxLength(90),Validators.minLength(3)]],
    finicial: ['',[Validators.required,Validators.maxLength(12),Validators.minLength(4)]],
    ffinal: ['',[Validators.required,Validators.maxLength(12),Validators.minLength(4)]],
    hinicial: ['',[Validators.required,Validators.maxLength(12),Validators.minLength(4)]],
    hfinal: ['',[Validators.required,Validators.maxLength(12),Validators.minLength(4)]],
    descripcion: ['',[Validators.maxLength(5000)]],
    nombrecompleto: ['',[Validators.required,Validators.maxLength(12),Validators.minLength(4)]],
    nombreasignador: ['',[Validators.required,Validators.maxLength(12),Validators.minLength(4)]],
    backgroundColor: ['',[Validators.required,Validators.maxLength(12),Validators.minLength(4)]],
    boderColor: ['',[Validators.required,Validators.maxLength(12),Validators.minLength(4)]],
    allDay: ['',[Validators.maxLength(1),Validators.minLength(1)]]

  });


  
  // events = [
  //   { title: 'event 1event 1event 1event 1asdfasdf', date: '2024-06-03', backgroundColor: 'red', borderColor: 'darkred', extendedProps: {
  //     description: 'Almuerzo mensual del equipo para discutir temas generales.',
  //     userId: 'DAVID CARVAJAL PERNETT', fechaini: '2024-06-17', fechafin: '2024-06-20', horaini: '15:00:00', horafin: '23:00:00' }},
  //   { title: 'event 2', start: '2024-06-04T15:00:00', end: '2024-06-04T18:00:00', description: 'Descripción de la reunión 1 numero de orden 85325 con todo los datos puesto como telefono y mucho mas', userId: 'DAVID CARVAJAL PERNETT' },
  //   { title: 'Visita de campo', start: '2024-06-20T15:00:00', end: '2024-06-30T15:00:00', description: 'Descripción Orden 85325 con todo los datos puesto como telefono y mucho mas', userId: 'DAVID CARVAJAL PERNETT' },
  //   { title: 'Visita de campo2', start: '2024-06-20T15:00:00', end: '2024-06-30T15:00:00',backgroundColor: 'red', description: 'Descripción Orden 85325 con todo los datos puesto como telefono y mucho mas', userId: 'DAVID CARVAJAL PERNETT' },
  //   { title: 'Visita de campo2', start: '2024-06-21T15:00:00', end: '2024-06-30T15:00:00',backgroundColor: 'green', description: 'Descripción Orden 85325 con todo los datos puesto como telefono y mucho mas', userId: 'DAVID CARVAJAL PERNETT' },
  //   { title: 'Visita de campo2', start: '2024-07-21T15:00:00', end: '2024-07-22T15:00:00',backgroundColor: 'gray', description: 'Descripción Orden 85325 con todo los datos puesto como telefono y mucho mas', userId: 'DAVID CARVAJAL PERNETT' },
  //   { title: 'Visita de campo2', start: '2024-07-21T15:00:00', end: '2024-07-22T15:00:00',backgroundColor: 'purple', borderColor: 'purple', description: 'Descripción Orden 85325 con todo los datos puesto como telefono y mucho mas', userId: 'DAVID CARVAJAL PERNETT' }
  // ];

  cargareventos(accion:any,numcalendar:any,idusuario:any,token:any){
    //let token = "d9f495f93f200f5be8c002eb4c9b22ba";
    this._calendario.cargaeventos(accion,numcalendar,idusuario,token).subscribe((events: any[]) => {
      console.log(events);
      
      this.calendarOptions.events = (events || []).map(event => {
        const mappedEvent = {
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.allDay === '1' || !event.end ? null : event.end, // Si es allDay o end no está presente, se asigna null
          allDay: event.allDay === '1', // Convertir '1' a true y '0' a false
          description: event.description || 'No hay descripción.',
          backgroundColor: event.nombreasignador == null ? event.backgroundColor : 'red',
          borderColor: event.nombreasignador == null ? event.borderColor : 'red',
          userId: event.nombrecompleto,
          asignado: event.nombreasignador,
          display: 'auto'
        };
  
        this.nombrequiencrea = mappedEvent.userId; //asigno el nombre para usarlo al momento de crear un evento

        // Log para ver el valor de allDay después de la conversión
        console.log(`Event: ${mappedEvent.userId}, All Day: ${mappedEvent.asignado}`);
  
        return mappedEvent;
      });
      
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    
    headerToolbar: {
      left: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
      center: 'title',
      right: 'today prev,next'
    },

    footerToolbar: {
        //left: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth,listWeek,listDay' // Añade tus botones personalizados aquí
    },
    
    events: [], // Usar la propiedad events del componente

    aspectRatio: 1.5, // Relación de aspecto
    height: 'auto', // Altura automática para ser responsivo

    themeSystem: 'bootstrap',  // Usando el tema de Bootstrap
    navLinks: true,  // Habilitar los enlaces de navegación
    dayHeaderFormat: { weekday: 'long' }, // Mostrar días de la semana completos
    eventTimeFormat: { // Formato de la hora del evento
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short' // Mostrar am/pm
    },
    slotLabelFormat: { // Formato de la etiqueta de la ranura (slot) de tiempo
      hour: 'numeric',
      minute: '2-digit',
      hour12: true // Usar formato de 12 horas (am/pm)
    },
    listDayFormat: { // Formato de la hora en la vista de agenda
      hour: 'numeric',
      minute: '2-digit',
      hour12: true // Usar formato de 12 horas (am/pm)
    },


    // eventContent: { html: `<div class="fc-event-title" placement="top" ngbTooltip="{{ arg.event.extendedProps.description || '' }}">
    //                       {{ arg.event.title.toUpperCase() }}
    //                     </div>` },

    // eventContent: (arg) => {

    //   const eventEl = document.createElement('div');
    //   eventEl.innerText = arg.event.title + ' - Creado por: ' + arg.event.extendedProps["userId"];
    //   return { domNodes: [eventEl] };
    // },
    

    locale: esLocale, // Configura el idioma del calendario a español
    dateClick: (arg) => this.handleDateClick(arg),// Manejador de clics en la fecha
    eventClick: (info) => this.handleEventClick(info,this.modal1), // Manejador de clics en eventos
    //eventContent: (arg) => this.renderEventContent(arg), // Manejador para personalizar contenido del evento

    eventMouseEnter: this.handleEventMouseEnter.bind(this),
    eventMouseLeave: this.handleEventMouseLeave.bind(this)

  };

  handleDateClick(arg:any) {

    // console.log('Fecha clicada:', arg.date); //Fri Jul 12 2024 00:00:00 GMT-0500 (hora estándar de Colombia)
    // console.log('Fecha clicada (ISO):', arg.dateStr); //2024-07-12
    // console.log('Es todo el día:', arg.allDay); //true
    // console.log('Elemento DOM:', arg.dayEl);// html del cuadro
    // console.log('Evento JS:', arg.jsEvent); // eventos
    // console.log('Vista:', arg.view); // vista de dode se da clic
    // if (arg.resource) {
    //   console.log('Recurso:', arg.resource);
    // }
    // if (arg.seg) {
    //   console.log('Segmento:', arg.seg);
    // }

    const currentTime = new Date().getTime();
    const timeDiff = currentTime - this.lastClickTime;

    if (timeDiff < 300 && timeDiff > 0) {
      // Doble clic detectado
      //this.handleDateDoubleClick(arg);
      //alert('date click! ' + arg.dateStr); // muestra la fecha que se dio clic. DATO IMPORTANTE!
      this.creareventoactualdioclic = arg;
      this.formueditar.reset();// importante resetear las advertencias.
      this.formueditar.patchValue({ // limpio el formulario para crear un nuevo evento

        'titulo':"",
        'finicial':arg.dateStr,
        'ffinal':arg.dateStr,
        'hinicial':"08:00",
        'hfinal':"18:00",
        'descripcion':"",
        'nombrecompleto': this.usuarioevento
  
      });
      this.formueditar.get("nombreasignador")?.setValue("0");
      this.modal5 = this._serviciomodal.open(this.modal4,{ centered: true });

    } else {
      // Actualizar el tiempo del último clic
      this.lastClickTime = currentTime;
    }
    
  }

  ngOnInit(){

    // valido que usuario existe y verifico roll
    if(sessionStorage.getItem("tk") && sessionStorage.getItem("us") && sessionStorage.getItem("rl") ){

      this.roll = sessionStorage.getItem("rl");
      this.idlogueado = sessionStorage.getItem("us");

      //this._router.navigate(['usuarios']);
      this.cargareventos(1,1,sessionStorage.getItem("us"),sessionStorage.getItem("tk")); ///SI PONGO ID USUARIO MUESTRA LO DEL USUARIO SI PONGO "SI" MUESTRA TODO
      
      //llamos todos los usuarios registrados
      this._usuarios.cargausuarios(1,sessionStorage.getItem("tk")).subscribe(data=>{
        
        data.sort((a:any, b:any) => a.nombrecompleto.localeCompare(b.nombrecompleto)); //ordeno el array por nombre A-Z campo llamado nombrecompleto.

        this.formueditar.get("nombreasignador")?.setValue(sessionStorage.getItem("us"));

        console.log(data);

        this.pacientes= data;
      
      });

    }else{
      this.logout();
    }
    
    
    // tippy('.fc-event fc-event-start fc-event-end fc-event-past fc-daygrid-event fc-daygrid-dot-event', {
    //   content: "I'm a Tippy tooltip!",
    // });
  }

  handleEventClick(info: any,content: TemplateRef<any>) {

    this.eventoactualdioclic = info.event;

    this.idevento = info.event.id;
    this.tituloevento = info.event.title;
    this.startevento = this.formatTime(info.event.start);
    this.endevento = info.event.end ? this.formatTime(info.event.end) : '11:59 p.m.'; // Manejo de evento sin hora de fin
    this.starmilitar = this.formatTime2(info.event.start);
    this.endmilitar = info.event.end ? this.formatTime2(info.event.end) : 'Sin hora de fin'; // Manejo de evento sin hora de fin
    this.fechainicial = this.formatDate(info.event.start);
    this.fechafinal = info.event.end ? this.formatDate(info.event.end) : 'Sin fecha de fin'; // Manejo de evento sin fecha de fin
    this.descripcionevento = info.event.extendedProps.description;
    this.usuarioevento = info.event.extendedProps.userId;
    this.quienasigno = info.event.extendedProps.asignado;
    this.todoeldia = info.event.allDay;
    console.log("todo el dia :"+this.usuarioevento);

    this.modal0 = this._serviciomodal.open(content,{ centered: true });
    //alert(`Evento: ${info.event.title}\nDescripción: ${info.event.extendedProps.description}`);
    //this.activomodal1(this.modal1,info);
    
  }

  editEvent(event: any) {
    // Aquí puedes agregar la lógica para modificar el evento
    const action = prompt('Ingrese "edit" para editar el título o "delete" para eliminar el evento:', '');
    if (action === 'edit') {
      const newTitle = prompt('Ingrese el nuevo título para el evento:', event.title);
      if (newTitle) {
        event.setProp('title', newTitle);
      }
    } else if (action === 'delete') {
      this.removeEvent(event);
    }
  }

  removeEvent(event: any) {
    if (confirm(`¿Estás seguro de que deseas eliminar el evento "${event.title}"?`)) {
      event.remove();
    }
  }

  renderEventContent(arg: any) {

    let startTime = arg.event.start ? this.formatTime(arg.event.start) : '';
    let endTime = arg.event.end ? ' - ' + this.formatTime(arg.event.end) : '';
    let timeText = startTime + endTime;

    return { html: `${timeText}${arg.event.title}` };
  

    // const eventEl = document.createElement('div');
    // eventEl.innerHTML = `
    //   <div class="fc-event-title" placement="top" ngbTooltip="${arg.event.extendedProps.description || ''}">
    //     ${arg.event.title.toUpperCase()}
    //   </div>
    // `;
    // return { domNodes: [eventEl] };
    ///----------------------------
    // contentEl.innerHTML = `
    //   <div class="fc-event-title" placement="top" ngbTooltip="${arg.event.extendedProps.description || ''}">
    //     ${arg.event.title.toUpperCase()}
    //   </div>
    // `;
    //return arg.event.title.toUpperCase();
  }

  addEvent() {
    this.cargareventos(1,1,sessionStorage.getItem("us"),sessionStorage.getItem("tk"));
  }

  /////////////////////

  handleEventMouseEnter(info: any) {

    if (!info.el) {
      console.error('Element not found for the event');
      return;
    }

    // Verifica si ya existe una instancia de tippy y destrúyela para evitar duplicados
    if (info.el._tooltip) {
      info.el._tooltip.destroy();
    }
  
    
    if (info.event.allDay){
      this.tippyreloj = `<h6> <i class="fa-regular fa-clock"></i> Todo el día. </h6>`;
    }else{
      this.tippyreloj = `<h6> <i class="fa-regular fa-clock"></i> De : ${this.formatTime(info.event.start)} Hasta : ${this.formatTime(info.event.end)} </h6>`;
    }

    const tooltipInstance = tippy(info.el, {
      //content: '<h6>'+info.event.title+'</h6><hr><p>'+info.event.extendedProps.description+'</p><p>Contenido adicional para verificar el tamaño del tooltip y asegurarse de que se redimensione correctamente.</p>'+info.event.extendedProps.userId+'',
      
      content: `
        
        <h6 style="margin-top: 10px;" ><i class="fa-regular fa-calendar-days"></i> ${info.event.title} </h6>
        <hr>
        ${this.tippyreloj}
        <hr>
        <p><i class="fa-solid fa-bars-staggered"> </i> ${info.event.extendedProps.description}</p>
        
        <hr>
        <div style="margin: 10px 0 10px 0;"><i class="fas fa-user fa-fw"></i> ${info.event.extendedProps.userId == null ? 'Día festivo' : info.event.extendedProps.userId}</div>
      `,
      maxWidth: 500,
      allowHTML: true,
      animation: 'fade',
      interactive: true,
      appendTo: document.body, // Solucionar problema de accesibilidad
      
    });

    // Asegúrate de que tooltipInstance no sea de tipo never
    if (Array.isArray(tooltipInstance)) {
      info.el._tooltip = tooltipInstance[0];
      tooltipInstance[0].show();
    } else {
      info.el._tooltip = tooltipInstance;
      //tooltipInstance[0].show();
    }
  }

  handleEventMouseLeave(info: any) {
 
    if (info.el._tooltip) {
      info.el._tooltip.destroy();
      delete info.el._tooltip;
    }
  }

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  formatTime2(date: Date): string {
    return new Date(date).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: false });
  }

  // Función para formatear la fecha
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  activomodal1(content:any,info:any){
  

    this._serviciomodal.open(content,{ centered: true });

    console.log(info.event.title);
    // this.tituloevento = info.event.title;
    // this.startevento = this.formatTime(info.event.start);
    // this.endevento = this.formatTime(info.event.end);
    // this.descripcionevento = info.event.extendedProps.description;
    // this.usuarioevento = info.event.extendedProps.userId;
    // this.quienasigno = info.event.extendedProps.asignado;
    

  }

  activomodal2(content:any){

    this.formueditar.patchValue({

      'titulo':this.tituloevento,
      'finicial': this.fechainicial,
      'ffinal': this.fechafinal,
      'hinicial': this.starmilitar,
      'hfinal': this.endmilitar,
      'descripcion': this.descripcionevento,
      'nombrecompleto': this.usuarioevento,
      'nombreasignador': sessionStorage.getItem("us"),
      'backgroundColor': this.tituloevento,
      'allDay': this.quienasigno

    })

    
    this.modal2 = this._serviciomodal.open(content,{ centered: true });

  }

  logout():void{

    sessionStorage.clear();
    this._router.navigate(['login']);

  }
  
  guardar(){
    this._calendario.editarevento(2,1,this.idevento,this.formueditar.value.titulo,this.formueditar.value.finicial,this.formueditar.value.ffinal,this.formueditar.value.hinicial,this.formueditar.value.hfinal,this.formueditar.value.descripcion,sessionStorage.getItem("tk")).subscribe((events: any[]) => {
      console.log(this.formueditar.value.finicial+'T'+this.formueditar.value.hinicial+':00');
    });

    this.eventoactualdioclic.setProp('title', this.formueditar.value.titulo);
    this.eventoactualdioclic.setStart(this.formueditar.value.finicial+'T'+this.formueditar.value.hinicial+':00');
    this.eventoactualdioclic.setEnd(this.formueditar.value.ffinal+'T'+this.formueditar.value.hfinal+':00');
    this.eventoactualdioclic.setExtendedProp('description', this.formueditar.value.descripcion);

    this.modal2?.dismiss();
    this.modal0?.dismiss();


  }

  eliminarevento(content:any){
    
    this.modal3 = this._serviciomodal.open(content, { size: 'sm', centered: true });

    
  }
  
  sieliminaevento(){
    this._calendario.eliminarevento(4,1,this.idevento,sessionStorage.getItem("tk")).subscribe((events: any[]) => {
      console.log(events);
    });
    this.eventoactualdioclic.remove();
    this.modal3?.dismiss();
    this.modal2?.dismiss();
    this.modal0?.dismiss();
  
  }

  crear(){

    let color:any;
    let usuarioID: any;
    let usuarioIDasignado: any;
    let bordecolor: any;
    let colorfondo: any;

    let acceso:number = 0;
    

    console.log("halassssssssssssssssssss "+ this.formueditar.value.nombreasignador);
    // console.log( "halassssssssssssssssssss "+typeof sessionStorage.getItem("us"));
    if(this.formueditar.value.nombreasignador == "0" ){

      usuarioID = sessionStorage.getItem("us");
      usuarioIDasignado = ""; //si valor es 0 id es igual al de la sesion el campo debe ir vacio
      color = sessionStorage.getItem("cl");
      bordecolor = sessionStorage.getItem("cl");
      colorfondo = sessionStorage.getItem("cl");

    }else if(this.formueditar.value.nombreasignador == ""){ /// la peticion de crear viene de un suario sin rol de administrador crea evento en su propio calendario
      
      
      usuarioID = sessionStorage.getItem("us");  
      usuarioIDasignado = this.formueditar.value.nombreasignador;   
      color = "#fac307";
      bordecolor = "#fac307";
      colorfondo = "#fac307";

    }else{ //esta peticion es la ultima y es del usuario que asigna a otra agenda

      acceso = 1;
      this.selectedValues.forEach(num =>{
        
        usuarioID = num;  ///// DEBO INVERTIR LOS ID PUESTO QUE NECESITO QUE SE VEA EN OTRA CUENTA QUE NO ES LA DEL CREADOR.
        usuarioIDasignado = sessionStorage.getItem("us");   ///// DEBO INVERTIR LOS ID PUESTO QUE NECESITO QUE SE VEA EN OTRA CUENTA QUE NO ES LA DEL CREADOR.
        color = sessionStorage.getItem("cl");
        bordecolor = sessionStorage.getItem("cl");
        colorfondo = sessionStorage.getItem("cl");
        console.log(num);

        if(num == usuarioIDasignado ){
          usuarioIDasignado="";
        }

        this._calendario.crearevento(3,1,this.formueditar.value.titulo,this.formueditar.value.finicial,this.formueditar.value.ffinal,this.formueditar.value.hinicial,this.formueditar.value.hfinal,usuarioID,usuarioIDasignado,this.formueditar.value.descripcion,color,sessionStorage.getItem("tk")).subscribe((events: any[]) => {
          //console.log(events);
        });
      
      });
      
      
    }

    if(acceso == 0){

      this._calendario.crearevento(3,1,this.formueditar.value.titulo,this.formueditar.value.finicial,this.formueditar.value.ffinal,this.formueditar.value.hinicial,this.formueditar.value.hfinal,usuarioID,usuarioIDasignado,this.formueditar.value.descripcion,color,sessionStorage.getItem("tk")).subscribe((events: any[]) => {
        //console.log(events);
      });
    
    }

    const calendarApi = this.calendarComponent.getApi();

    calendarApi.addEvent({
      title: this.formueditar.value.titulo!,
      start: this.formueditar.value.finicial+'T'+this.formueditar.value.hinicial+':00',
      end: this.formueditar.value.ffinal+'T'+this.formueditar.value.hfinal+':00',
      extendedProps: {
        description: this.formueditar.value.descripcion,
        userId: this.nombrequiencrea
      },
      borderColor: bordecolor, 
      backgroundColor: colorfondo 
    });



    if (this.vistatotal === 'no'){
      this.cargareventos(1,1,sessionStorage.getItem("us"),sessionStorage.getItem("tk"));
    }else{
      this.cargareventos(1,1,"si",sessionStorage.getItem("tk"));
    }

    acceso = 0;
    this.selectedValues = []; //limpio el array
    this.selectedNames = []; //limpio el array

    this.modal5?.dismiss();
      

  }

  toggleVista(): void {
    //this.vistatotal = this.vistatotal === 'no' ? 'si' : 'no';
    console.log(this.vistatotal);
    
      if (this.vistatotal === 'no'){
        this.vistatotal = "si";
        this.cargareventos(1,1,"si",sessionStorage.getItem("tk"));
        
      }else{
        this.vistatotal = "no";
        this.cargareventos(1,1,sessionStorage.getItem("us"),sessionStorage.getItem("tk"));
      }

    }
    

    onSelectChange(event: Event) {
      const selectElement = event.target as HTMLSelectElement;
      const selectedValue = selectElement.value;
      //console.log('Valor seleccionado:', selectedValue);

      if (selectedValue === '0' || this.selectedValues.includes(selectedValue)) {
        return; // No hacer nada si el valor seleccionado es "0" o ya está en el array
      }
  
      // Almacenar el valor seleccionado en el array
      this.selectedValues.push(selectedValue);
  
      // Buscar el nombre completo del paciente correspondiente al usuarioid seleccionado
      const selectedPaciente = this.pacientes.find((paciente:any) => paciente.usuarioid === selectedValue);
      if (selectedPaciente) {
        //const nombreCompleto = `${selectedPaciente.nombrecompleto} ${selectedPaciente.apellidocompleto}`;
        const nombreCompleto = `${selectedPaciente.nombrecompleto}`;
        this.selectedNames.push(nombreCompleto);
        console.log('Nombres seleccionados:', this.selectedNames);
      }
  
      console.log('Valores seleccionados:', this.selectedValues); // Mostrar el array en la consola
    }


    removeName(index: number) {
      // Eliminar el nombre y su correspondiente valor seleccionado de los arrays
      this.selectedNames.splice(index, 1);
      this.selectedValues.splice(index, 1);
      //console.log('Nombre eliminado, nuevos nombres seleccionados:', this.selectedNames);
      //console.log('Nuevo array de valores seleccionados:', this.selectedValues);
    }


}
