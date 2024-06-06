import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private apiUrl = 'http://localhost:3000'; // replace with your API URL

    constructor(private http: HttpClient) { }

    getDoctors(category: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/doctors?category=${category}`);
    }

    getTimes(doctorId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/times?doctorId=${doctorId}`);
    }

    bookAppointment(doctorId: string, time: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/appointments`, { doctorId, time });
    }
}