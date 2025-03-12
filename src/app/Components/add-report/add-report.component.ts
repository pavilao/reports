import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from '../../Services/report.service';
import { CameraService } from '../../Services/camera.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-report',
  imports: [FormsModule, NgIf],
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css'],
})
export class AddReportComponent {
  title = '';
  image = '';
  description = '';
  author = '';
  departamento = '';
  date = ''; 

  constructor(
    private reportService: ReportService, 
    private cameraService: CameraService, 
    private router: Router
  ) {}

  async takePicture() {
    try {
      const photoData = await this.cameraService.takePicture();
      this.image = photoData.imageUrl;  // Guardar URL de la imagen
      this.date = photoData.date;  // Guardar la fecha de la imagen
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }
  
  async addReport() {
    if (!this.title || !this.image || !this.description || !this.author || !this.departamento) {
      alert("⚠️ Todos los campos son obligatorios.");
      return;
    }
  
    await this.reportService.addReport({
      id: Math.random().toString(36).substr(2, 9),
      title: this.title,
      author: this.author,
      departamento: this.departamento,
      image: this.image,  // Se guarda la URL en lugar de base64
      date: this.date, // Se usa la fecha de la foto
      description: this.description,
    });

    this.router.navigate(['/reports']);
  }

  cancel() {
    this.router.navigate(['/reports']);
  }
}
