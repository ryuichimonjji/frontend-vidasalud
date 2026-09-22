import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalService } from '@azure/msal-angular';
import { Appointment, AppointmentsService } from './appointments.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 2rem; font-family: sans-serif;">
      <h2>Atenciones</h2>
      <p *ngIf="isAdmin">Vista de administrador</p>
      <table border="1" cellpadding="8">
        <thead>
          <tr><th>ID</th><th>Paciente</th><th>Prestacion</th><th>Estado</th></tr>
        </thead>
        <tbody>
          <tr *ngFor="let a of appointments">
            <td>{{ a.id }}</td><td>{{ a.patientId }}</td><td>{{ a.serviceId }}</td><td>{{ a.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class AppointmentsComponent implements OnInit {
  private appointmentsService = inject(AppointmentsService);
  private msalService = inject(MsalService);

  appointments: Appointment[] = [];
  isAdmin = false;

  ngOnInit(): void {
    const account = this.msalService.instance.getActiveAccount();
    const roles = (account?.idTokenClaims as any)?.roles ?? [];
    this.isAdmin = roles.includes('Admin');

    this.appointmentsService.list().subscribe({
      next: (data) => (this.appointments = data),
      error: (err) => console.error('Error al cargar atenciones', err),
    });
  }
}