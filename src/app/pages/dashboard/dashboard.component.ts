import { Component, ViewChild, TemplateRef, ViewContainerRef, OnInit, inject } from '@angular/core';
import { TemplatetopComponent } from '../templatetop/templatetop.component';
import { TemplatebotComponent } from '../templatebot/templatebot.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { NgbModal, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import tippy, { Instance } from 'tippy.js';
import { CalendarioService } from '../../services/calendario.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { an } from '@fullcalendar/core/internal-common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,TemplatetopComponent,TemplatebotComponent,FullCalendarModule,NgbTooltipModule,NgbModule,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {


  lastClicked: number = 0;
  events: any;

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

 

  @ViewChild('modal1') modal1!: TemplateRef<any>; // Referencia al template del modal

  private _calendario = inject(CalendarioService);
  private _serviciomodal = inject(NgbModal);
  private _formbuilder = inject(FormBuilder);


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

  })


  
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

  cargareventos(){
    let token = "d9f495f93f200f5be8c002eb4c9b22ba";
    this._calendario.cargaeventos(1,1,1,token).subscribe((events: any[]) => {
      console.log(events);
      
      this.calendarOptions.events = (events || []).map(event => {
        const mappedEvent = {
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
  
        // Log para ver el valor de allDay después de la conversión
        console.log(`Event: ${mappedEvent.start}, All Day: ${mappedEvent.allDay}`);
  
        return mappedEvent;
      });
      
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    
    headerToolbar: {
      left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      center: 'title',
      right: 'today prev,next'
    },
    
    events: [], // Usar la propiedad events del componente
    height: 'auto',
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
    eventClick: (info) => this.handleEventClick(info), // Manejador de clics en eventos
    //eventContent: (arg) => this.renderEventContent(arg), // Manejador para personalizar contenido del evento

    eventMouseEnter: this.handleEventMouseEnter.bind(this),
    eventMouseLeave: this.handleEventMouseLeave.bind(this)

  };

  handleDateClick(arg:any) {
    alert('date click! ' + arg.dateStr)
  }

  ngOnInit(){
    
    this.cargareventos();
    // tippy('.fc-event fc-event-start fc-event-end fc-event-past fc-daygrid-event fc-daygrid-dot-event', {
    //   content: "I'm a Tippy tooltip!",
    // });
  }

  handleEventClick(info: any) {
    
    this.tituloevento = info.event.title;
    this.startevento = this.formatTime(info.event.start);
    this.endevento = info.event.end ? this.formatTime(info.event.end) : 'Sin hora de fin'; // Manejo de evento sin hora de fin
    this.starmilitar = this.formatTime2(info.event.start);
    this.endmilitar = info.event.end ? this.formatTime2(info.event.end) : 'Sin hora de fin'; // Manejo de evento sin hora de fin
    this.fechainicial = this.formatDate(info.event.start);
    this.fechafinal = info.event.end ? this.formatDate(info.event.end) : 'Sin fecha de fin'; // Manejo de evento sin fecha de fin
    this.descripcionevento = info.event.extendedProps.description;
    this.usuarioevento = info.event.extendedProps.userId;
    this.quienasigno = info.event.extendedProps.asignado;
    this.todoeldia = info.event.allDay;
    console.log("todo el dia :"+this.fechainicial);

    //alert(`Evento: ${info.event.title}\nDescripción: ${info.event.extendedProps.description}`);
    this.activomodal1(this.modal1);
    
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
    this.cargareventos();
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
        <div style="margin: 10px 0 10px 0;"><i class="fas fa-user fa-fw"></i> ${info.event.extendedProps.userId}</div>
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


  activomodal1(content:any){
  
    let urlbase = "https://test-ctp.prevencionvialintegral.com/ctp?dni=";
    this._serviciomodal.open(content,{ centered: true });

    console.log(this.todoeldia);
    // this.tituloevento = info.event.title;
    // this.startevento = this.formatTime(info.event.start);
    // this.endevento = this.formatTime(info.event.end);
    // this.descripcionevento = info.event.extendedProps.description;
    // this.usuarioevento = info.event.extendedProps.userId;
    // this.quienasigno = info.event.extendedProps.asignado;
    

  }

  activomodal2(content:any){
  
    let urlbase = "https://test-ctp.prevencionvialintegral.com/ctp?dni=";

    this.formueditar.patchValue({

      'titulo':this.tituloevento,
      'finicial': this.fechainicial,
      'ffinal': this.fechafinal,
      'hinicial': this.starmilitar,
      'hfinal': this.endmilitar,
      'descripcion': this.descripcionevento,
      'nombrecompleto': this.usuarioevento,
      'nombreasignador': this.quienasigno,
      'backgroundColor': this.tituloevento,
      'allDay': this.quienasigno

    })

    
    this._serviciomodal.open(content,{ centered: true });

  }

  guardar(){

  }
  

}
