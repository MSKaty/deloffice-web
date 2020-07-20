import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { AngularFirestore } from '@angular/fire/firestore';
import { MetadataService } from './metadata.service';
import { tap, startWith } from 'rxjs/operators';

const PAGE_KEY: StateKey<string> = makeStateKey<any>('page');

@Injectable({
    providedIn: 'root'
})
export class SEOService {
    constructor(
        public afs: AngularFirestore,
        private _state: TransferState,
        private _metadata: MetadataService
    ) { }

    public ssrFirestoreDoc(path: string): Observable<any> {
        const exists = this._state.get(PAGE_KEY, {} as any);
        return this.afs.doc<any>(`pages/${path}`).valueChanges().pipe(
            tap(page => {
                if (page) {
                    this._state.set(PAGE_KEY, page);
                    this._metadata.generateTags({
                        title: 'DelOffice Ltd',
                        description: page.description,
                        keywords: page.keywords
                    })
                }
            }),
            startWith(exists)
        )
    }


}