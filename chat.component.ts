import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']  // corrected property name from styleUrl to styleUrls
})
export class ChatComponent {
  clients: string[] = [];
  clientCount = 0;

  joinClient(): void {
    this.clientCount++;
    const newClientId = 'Client' + this.clientCount;
    this.clients.push(newClientId);
  }
}
