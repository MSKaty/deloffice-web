import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class AdvertService {
    constructor(
        private _afs: AngularFirestore
    ) { }

    getAdvertsByPage(page: string) {
        return this._afs.collection('adverts', ref => {
            return ref.where('page', '==', page);
        })
    }

    getAdvertsByCategoryId(id: number) {
        console.log(id);
        return this._afs.collection('adverts', ref => {
            return ref.where('categoryID', '==', id);
        })
    }
}