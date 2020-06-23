import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../../../../common/services/category.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  category$: Observable<any>;

  constructor(private _cat: CategoryService) { }
  ngOnInit() {
    this.category$ = this._cat.getTree();
  }

}
