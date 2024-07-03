import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { settings } from 'Static_values';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private apiUrl = settings.APIURL;
    private httpOptions = { withCredentials: true }
    constructor(private http: HttpClient) { }

    getDoctors(category: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/doctor/get-all-doctors`, this.httpOptions);
    }

    getTimes(Date: string, doctorId: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/doctor/doctors-free-times`, { doctorId, Date }, this.httpOptions);
    }

    bookAppointment(patientId: string, doctorId: string, time: any, date: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/patient/set-appointments`, { patientId, doctorId, date, time }, this.httpOptions);
    }
}