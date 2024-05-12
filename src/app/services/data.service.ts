import { Injectable } from '@angular/core';

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public messages: Message[] = [
    
  ];

  constructor() { }

  public getMessages(): Message[] {
    return this.messages;
  }

  public addMessage(message:any){
    this.messages.push({
      fromName: `${message?.name?.first} ${message?.name?.last}`,
      subject: message?.location?.timezone?.description,
      date: message?.dob?.date,
      id: 7,
      read: false
    });
  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }
}
