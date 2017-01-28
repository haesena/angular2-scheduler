import { Injectable }     from '@angular/core';
import { Http, URLSearchParams, Response, Headers, RequestOptions } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/toPromise'

@Injectable()
export class SchedulerHttpService {

    constructor (private http: Http) {}

    private apiUrl = 'http://192.168.1.40/events.php';

    getEvents(minDate: string, maxDate: string) : any {

        let params: URLSearchParams = new URLSearchParams();
        params.set('min_date', minDate);
        params.set('max_date', maxDate);

        return this.http.get(this.apiUrl, { search: params })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}