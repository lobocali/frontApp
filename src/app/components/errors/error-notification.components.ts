import { Component, Input } from '@angular/core';

@Component({
  selector: 'error-notification',
  templateUrl: './error-notification.component.html',
})
export class ErrorNotificationComponent {
  @Input() errorMessage: string | null = null;
}
