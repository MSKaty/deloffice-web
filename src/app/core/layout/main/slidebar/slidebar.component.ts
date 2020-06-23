import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../common/services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.scss']
})
export class SlidebarComponent implements OnInit {
  category$: Observable<any>;
  constructor(private _cat: CategoryService) { }

  ngOnInit() {
    this.category$ = this._cat.getTree();
  }

}
