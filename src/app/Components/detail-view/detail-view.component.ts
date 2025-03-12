import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService, Report } from '../../Services/report.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css'],
})
export class DetailViewComponent implements OnInit {
  report!: Report;

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const foundReport = this.reportService.getReportById(id);
      if (foundReport) {
        this.report = foundReport;
      } else {
        this.router.navigate(['/reports']);
      }
    }
  }

  deleteReport() {
    this.reportService.deleteReport(this.report.id);
    this.router.navigate(['/reports']);
  }
  back() {
    this.router.navigate(['/reports']);
  }
}
