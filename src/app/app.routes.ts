import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

export const routes: Routes = [

    { path: '', component: DashboardComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: '**', redirectTo: '', pathMatch:'full' }  

];
