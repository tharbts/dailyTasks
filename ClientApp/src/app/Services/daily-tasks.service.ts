import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filter } from '../Models/Filter';
import { DailyTasks } from '../Models/DailyTasks';

@Injectable({
    providedIn: 'root'
})
export class DailyTasksService {

    private readonly endpoint = '/api/dailytasks';
    constructor(private http: HttpClient) { }

    Get(filter: Filter) {
        var endpoint = filter ? this.endpoint + '?' + this.toQueryString(filter) : this.endpoint;
        return this.http.get<DailyTasks[]>(endpoint);
    }

    update(dailyTasks: DailyTasks) {
        return this.http.put<DailyTasks>(this.endpoint, dailyTasks);
    }

    create(dailyTasks: DailyTasks) {
        return this.http.post<DailyTasks>(this.endpoint, dailyTasks);
    }

    toQueryString(obj) {
        var parts = [];

        for (var property in obj) {
            var value = obj[property];
            if (value != null && value != undefined){
                if(value instanceof Date)
                    value = value.toLocaleDateString();
                parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
            }
        }

        return parts.join('&');
    }

}
