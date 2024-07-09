import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { TemplatetopComponent } from '../templatetop/templatetop.component';
import { TemplatebotComponent } from '../templatebot/templatebot.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule,TemplatetopComponent,TemplatebotComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  private _http = inject(HttpClient);
  

  ngOnInit(): void {
    //this.sendlogin();
    console.log("hola");
  }
  
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this._http.post('http://localhost/api_ordenes/upload', formData).subscribe(response => {
        console.log('Image uploaded successfully', response);
      }, error => {
        console.error('Error uploading image', error);
      });
    }
  }

}
