import { Injectable }     from '@angular/core';
import { Http, URLSearchParams, Response, Headers, RequestOptions } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/toPromise'

@Injectable()
export class SchedulerHttpService {

    constructor (private http: Http) {}

    private apiUrl = 'http://localhost/api';

    getEvents(minDate: string, maxDate: string) : any {

        let username : string = 'USERNAME';
        let password : string = 'PASSWORD';
        let headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(username + ":" + password));

        let params: URLSearchParams = new URLSearchParams();
        params.set('min_date', minDate);
        params.set('max_date', maxDate);

        return this.http.get(this.apiUrl, { search: params, headers: headers })
            .toPromise()
            .then(function (response: Response) {
                let json = response.json();
                for(let event of json) {
                    event.start_date = event.startDate;
                    event.end_date = event.endDate;
                }

                return json;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}