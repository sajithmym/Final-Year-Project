import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { settings } from 'Static_values';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private apiUrl = settings.APIURL;
    constructor(private http: HttpClient) { }

    getDoctors(category: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/doctor/get-all-doctors`);
    }

    getTimes(Date: string, doctorId: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/doctor/doctors-free-times`, { doctorId, Date });
    }

    bookAppointment(doctorId: string, Date: string, date: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/appointments`, { doctorId, Date });
    }
}