import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { azureConfig } from '../auth-config';

export interface Appointment {
  id?: number;
  patientId: string;
  serviceId: string;
  status?: string;
}

@Injectable({ providedIn: 'root' })
export class AppointmentsService {
  private base = `${azureConfig.apiUrl}/api/appointments`;

  constructor(private http: HttpClient) {}

  list(status?: string): Observable<Appointment[]> {
    const url = status ? `${this.base}?status=${status}` : this.base;
    return this.http.get<Appointment[]>(url);
  }
}