import { Component, OnInit, HostListener } from '@angular/core';
import { IvysHeaderSearchService } from './ivys-header-search.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-ivys-header-search',
  templateUrl: './ivys-header-search.component.html',
  styleUrls: ['./ivys-header-search.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('0.3s ease-out', 
                    style({  opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('0.3s ease-in', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class IvysHeaderSearchComponent implements OnInit {
  searchedTerm: string;
  isSearchLoading: boolean;
  private userSearchParamSubject = new Subject<string>();

  readonly productList$ = this.userSearchParamSubject.pipe(
    debounceTime(250),
    distinctUntilChanged(),
    switchMap(searchParam => {
      this.isSearchLoading = false;
      return this.ivysHeaderSearchService.liveSearchProduct(searchParam)
    })
  )
  

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.userSearchParamSubject.next('');
    this.searchedTerm = '';
  }

  constructor(private ivysHeaderSearchService: IvysHeaderSearchService) { }

  ngOnInit() {
    this.searchedTerm = '';
    this.isSearchLoading = false;
  }

  onSearch(param: string) {
    if(param.length > 1) {
      this.isSearchLoading = true;
      this.userSearchParamSubject.next(param);
    } else if(param.length <= 1){
      this.userSearchParamSubject.next('');
    }
  }

  getProductImg(imgs: string) {
    const firstImg = imgs.split(',')[0];
    return `${firstImg}`;
  }
  
  clickedInside($event: Event){
    $event.preventDefault();
    $event.stopPropagation();
  }
}
