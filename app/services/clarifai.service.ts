import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import * as Rx from 'rxjs';

@Injectable()
export class ClarifaiService {
    private token$: Rx.Observable<string>;

    constructor(private http: Http) {
    }

    tagWithEncodedData(encodedData: any): Rx.Observable<string[]> {
        return this.getToken()
            .map(token => {
                let headers = new Headers({'Authorization': `Bearer ${token}`});
                return new RequestOptions({ headers: headers });
            })
            .flatMap(options =>
                this.http.post('https://api.clarifai.com/v1/tag', {
                    encoded_data: encodedData
                }, options))
            .map(response => response.json().results[0].result.tag.classes as string[]);
    }

    private getToken(): Rx.Observable<string> {
        if (!this.token$) {
            let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
            this.token$ = this.http.get(`~/secrets.json`)
                .map(result => result.json())
                .map(apiKeys => `client_id=${apiKeys.client_id}&client_secret=${apiKeys.client_secret}&grant_type=client_credentials`)
                .switchMap(body => this.http.post('https://api.clarifai.com/v1/token/', body, {headers: headers}))
                .map(response => response.json().access_token)
                .cache();
        }
        return this.token$;
    }
}
