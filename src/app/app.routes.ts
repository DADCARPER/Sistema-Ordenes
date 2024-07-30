import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { LoginComponent } from './pages/login/login.component';
import { CompaniaComponent } from './pages/compania/compania.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';


export const routes: Routes = [

    { path: '', component: LoginComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'compania', component: CompaniaComponent },
    { path: 'empresas', component: EmpresasComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '**', redirectTo: '', pathMatch:'full' }  

];
