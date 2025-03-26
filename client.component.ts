import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../../message.model';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  standalone: false
})
export class ClientComponent implements OnInit, OnDestroy {
  @Input() clientId: string = '';
  @Output() unsubscribed = new EventEmitter<string>(); // Notify parent when unsubscribed
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
      this.sentMessages.push(message);
      this.chatService.sendMessage(message);
      this.newMessage = '';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.unsubscribed.emit(this.clientId); // Notify parent about unsubscription
  }

  unsubscribe(): void {
    this.ngOnDestroy(); // Trigger unsubscription logic
  }
}
