import { Injectable }     from '@angular/core';
import { Http, URLSearchParams, Response, Headers, RequestOptions } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/toPromise'

@Injectable()
export class SchedulerHttpService {

    constructor (private http: Http) {}

    private apiUrl = 'http://localhost/events.php';

    getEvents(minDate: string, maxDate: string) : any {

        let params: URLSearchParams = new URLSearchParams();
        params.set('min_date', minDate);
        params.set('max_date', maxDate);

        return this.http.get(this.apiUrl, { search: params })
            .toPromise()
            .then(response => response.json());
    }

}