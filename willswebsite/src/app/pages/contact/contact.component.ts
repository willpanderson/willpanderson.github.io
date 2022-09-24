import { Component } from '@angular/core';
import { Contact } from './contact.model';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contacts = [
    new Contact('/william-anderson', 'https://www.linkedin.com/in/william-anderson-a8b8a1161/', 'linkedin', 'linkedin'),
    new Contact('willanderson2300@gmail.com', 'mailto:willanderson2300@gmail.com', 'email', 'envelope'),
    new Contact('/willpanderson', 'https://github.com/willpanderson', 'github', 'github'),
  ];
}
