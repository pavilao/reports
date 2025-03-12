import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,  // Indica que es un componente standalone
  imports: [RouterOutlet, RouterModule, CommonModule],  // Importa RouterModule para usar routerLinkActiveOptions
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';
}
