import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { settings } from 'Static_values';

// AuthService
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${settings.APIURL}/signup`;  // Replace with your actual API URL

    constructor(private http: HttpClient) { }

    checkSignIn(): Observable<any> {
        return this.http.get(`${this.apiUrl}/is-signed-in`, { withCredentials: true });
    }

    logout(): Observable<any> {
        return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
    }
}