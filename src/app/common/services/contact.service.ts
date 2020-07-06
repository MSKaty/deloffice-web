import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

interface Mail {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl;

    constructor(private _http: HttpClient) { }

    public sendMail(body: Mail) {
        return this._http.post(this.apiUrl + '/sendmail', body);
    }
}