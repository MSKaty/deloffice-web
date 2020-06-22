import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../common/services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  category$: Observable<any>;

  constructor(private _cat: CategoryService) { }

  ngOnInit() {
    this.category$ = this._cat.getTree();
  }

}
