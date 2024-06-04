import { Component } from '@angular/core';
import { TemplatetopComponent } from '../templatetop/templatetop.component';
import { TemplatebotComponent } from '../templatebot/templatebot.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TemplatetopComponent,TemplatebotComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
