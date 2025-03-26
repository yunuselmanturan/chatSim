import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: false
})
export class ChatComponent {
  clients: string[] = [];
  clientCount = 0;

  joinClient(): void {
    this.clientCount++;
    const newClientId = 'Client' + this.clientCount;
    this.clients.push(newClientId);
  }

  removeClient(clientId: string): void {
    this.clients = this.clients.filter(client => client !== clientId);
  }
}
