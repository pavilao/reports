import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, PermissionStatus } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  private async checkPermissions(): Promise<boolean> {
    const permissions: PermissionStatus = await Camera.checkPermissions();
    if (permissions.camera === 'granted' && permissions.photos === 'granted') {
      return true;
    }

    const request = await Camera.requestPermissions();
    return request.camera === 'granted' && request.photos === 'granted';
  }

  async takePicture(): Promise<{ imageUrl: string; date: string }> {
    const hasPermission = await this.checkPermissions();
    if (!hasPermission) {
      throw new Error('Permisos de cámara no otorgados');
    }

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    if (!image.webPath) {
      throw new Error('Error al tomar la foto');
    }

    return {
      imageUrl: image.webPath,
      date: this.formatDate(new Date()) // Agregar fecha formateada
    };
  }

  private formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    };
  
    let formattedDate = date.toLocaleDateString('es-ES', options);
  
    // Capitalizar la primera letra de cada palabra (día de la semana y mes)
    return formattedDate.replace(/\b\w/g, (char) => char.toUpperCase());
  }
  
}
