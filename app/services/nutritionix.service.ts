import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Injectable} from "@angular/core";

@Injectable()
export class NutritionixService {
    constructor(private http: Http) {
    }

    getFoods(tagsStr) {
        console.log(tagsStr);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'x-app-id': '69c2a4eb',
            'x-app-key': '9bf5af7d0be73326d37807eab3a59e5e'
        });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post('https://trackapi.nutritionix.com/v2/natural/nutrients', {
                //"query":"for breakfast i ate 2 eggs, bacon, and french toast",
                "query": tagsStr,
                "timezone": "US/Eastern"
            }, options)
            .map((res:Response) => res.json().foods);
    }
}
