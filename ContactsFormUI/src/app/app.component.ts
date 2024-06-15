import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from '../Models/contact.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as intlTelInput  from 'intl-tel-input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const inputElement = document.querySelector('#phone');
    if (inputElement) {
      intlTelInput.default(inputElement,{
        initialCountry: 'us',
        separateDialCode: true,
        utilsScript:'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
      });
    }
  }
  http = inject(HttpClient);

contactsForm = new FormGroup(
  {
    name: new FormControl<string>(''),
    email: new FormControl<string | null>(''),
    phone: new FormControl<string>(''),
    favorite: new FormControl<boolean>(false)
  }
)
  contacts$ = this.getContacts(); // is an observable that holds the list of contacts fetched from the server

  onFormSubmit()
  {
    const addContactRequest = {
      name: this.contactsForm.value.name,
      email: this.contactsForm.value.email,
      phone: this.contactsForm.value.phone,
      favorite: this.contactsForm.value.favorite
    }
    this.http.post('https://localhost:7028/api/Contacts', addContactRequest)
    .subscribe({ //The .subscribe method is used to handle the observable returned by the post method
      next: (value) => { //The next handler is called when the POST request completes successfully and the response is received.
        console.log(value);
        this.contacts$ =this.getContacts(); //to refresh the contact list
        this.contactsForm.reset(); //Resets the form to its initial state, clearing all input fields. This is useful to prepare the form for adding another new contact.
      }
    });
  }


  onDelete(id : string) {
    this.http.delete(`https://localhost:7028/api/Contacts/${id}`)
    .subscribe({
    next: (value) => {
      alert('Item Deleted');
      this.contacts$ = this.getContacts();
    }
  });
  }

private getContacts() : Observable<Contact[]> // is a private method that fetches the list of contacts from the backend .. It returns an observable of an array of Contact objects
{
  return this.http.get<Contact[]>('https://localhost:7028/api/Contacts'); // sends an HTTP GET request and expects the response to be an array of Contact objects.
}
}





//The importance of using an Observable in the getContacts method lies in its ability to handle asynchronous operations effectively, provide a rich set of operators for transforming data, manage subscriptions and unsubscriptions, and seamlessly integrate with Angular's reactive and template features. This results in a more responsive, maintainable, and scalable application.


//Starts the HTTP request: Without subscribing, the HTTP request will not be sent.
// Handles the response: Defines actions to take when the request completes successfully.
// Updates the UI: Ensures the UI reflects the updated state by refreshing the contacts list.
// Manages errors: Allows for handling errors that occur during the request.
// Triggers side effects: Executes any additional logic needed upon the request's completion.
// Using subscribe ensures that the application behaves correctly and responds appropriately to the result of the HTTP request.