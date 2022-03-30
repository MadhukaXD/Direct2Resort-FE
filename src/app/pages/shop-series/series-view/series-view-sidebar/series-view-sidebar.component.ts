import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeriesViewSidebarService } from './series-view-sidebar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-series-view-sidebar',
  templateUrl: './series-view-sidebar.component.html',
  styleUrls: ['./series-view-sidebar.component.scss']
})
export class SeriesViewSidebarComponent implements OnInit {
  routeSub: Subscription;
  categoryInfo: any;
  seriesList: any;
  catIconPath: string;
  constructor(private route: ActivatedRoute, private seriesViewSidebarService: SeriesViewSidebarService,
    private router: Router) { }

  ngOnInit() {
    this.catIconPath = environment.catIconImgPath;
    this.routeSub = this.route.params.subscribe(params => {
      this.getSeriesList(params.seriesId);
    });
  }

  getSeriesList(seriesUrl: string) {
    this.seriesViewSidebarService.getCatAndSeriesList(seriesUrl).subscribe(
      seriesListData => {
        this.categoryInfo = seriesListData.categoryInfo;
        this.seriesList = seriesListData.seriesList;
      },
      (err) => {
        this.router.navigate(['/not-found']);
      }
    )
  }
}
