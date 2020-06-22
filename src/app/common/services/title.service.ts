import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class TitleService {
    constructor(private _title: Title) { }

    changeTitle(name) {
        this._title.setTitle(`${name} | DelOffice`);
    }
}