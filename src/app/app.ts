import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class App implements OnInit {
  private msalService = inject(MsalService);
  private msalBroadcastService = inject(MsalBroadcastService);

  ngOnInit(): void {
    this.msalBroadcastService.inProgress$
      .pipe(filter((status) => status === InteractionStatus.None))
      .subscribe(() => {
        if (!this.msalService.instance.getActiveAccount()) {
          const accounts = this.msalService.instance.getAllAccounts();
          if (accounts.length > 0) {
            this.msalService.instance.setActiveAccount(accounts[0]);
          }
        }
      });
  }
}