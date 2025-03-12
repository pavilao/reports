import { Component, OnInit } from '@angular/core';
import { ReportService, Report } from '../../Services/report.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-reports',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  reports: Report[] = [];
  filteredReports: Report[] = [];
  searchTerm: string = '';

  constructor(private reportService: ReportService, private router: Router) {}

  ngOnInit() {
    this.reportService.getReports().subscribe(data => {
      this.reports = data;
      this.filteredReports = data; // Inicialmente, todos los reportes son filtrados
    });
  }

  filterReports() {
    if (this.searchTerm) {
      this.filteredReports = this.reports.filter(report =>
        report.departamento.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredReports = this.reports; // Si no hay término de búsqueda, mostrar todos
    }
  }

  viewDetails(id: string) {
    this.router.navigate(['/detail-view', id]);
  }
}