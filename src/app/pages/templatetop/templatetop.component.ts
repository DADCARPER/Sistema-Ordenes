import { Component, inject } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-templatetop',
  standalone: true,
  imports: [],
  templateUrl: './templatetop.component.html',
  styleUrl: './templatetop.component.css'
})
export class TemplatetopComponent {

  private _router = inject(Router);

  logout():void{

    sessionStorage.clear();
    this._router.navigate(['login']);

  }

}
