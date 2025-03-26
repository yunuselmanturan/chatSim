import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../../message.model';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-client',
  standalone: false,
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, OnDestroy {
  @Input() clientId: string = '';
  sentMessages: Message[] = [];
  receivedMessages: Message[] = [];
  newMessage: string = '';

  private subscription!: Subscription;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.subscription = this.chatService.getMessage().subscribe((message: Message) => {
      if (message.clientId !== this.clientId) {
        this.receivedMessages.push(message);
      }
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message: Message = {
        clientId: this.clientId,
        message: this.newMessage
      };
      // Save your own sent message
      this.sentMessages.push(message);
      // Broadcast the message
      this.chatService.sendMessage(message);
      this.newMessage = '';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
