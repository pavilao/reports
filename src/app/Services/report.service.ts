import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

export interface Report {
  id: string;
  title: string;
  author: string;
  image: string; // URL de la imagen
  date: string;
  description: string;
  departamento: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private reports: Report[] = [];
  private reportsSubject = new BehaviorSubject<Report[]>(this.reports);
  private readonly STORAGE_KEY = 'reports';

  constructor() {
    this.loadReports(); // Cargar reportes almacenados al iniciar
  }

  getReports() {
    return this.reportsSubject.asObservable();
  }

  async addReport(report: Report) {
    if (!report.date) {
      report.date = new Date().toLocaleString();
    }

    this.reports.push(report);
    this.reportsSubject.next([...this.reports]);
    await this.saveReports(); // Guardar en almacenamiento local
  }

  getReportById(id: string): Report | undefined {
    return this.reports.find(report => report.id === id);
  }

  async deleteReport(id: string) {
    this.reports = this.reports.filter(report => report.id !== id);
    this.reportsSubject.next([...this.reports]);
    await this.saveReports();
  }

  private async saveReports() {
    await Preferences.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(this.reports),
    });
  }

  private async loadReports() {
    const { value } = await Preferences.get({ key: this.STORAGE_KEY });
    if (value) {
      this.reports = JSON.parse(value);
      this.reportsSubject.next([...this.reports]);
    }
  }
}
