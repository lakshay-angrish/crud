import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;

  constructor(private http: HttpClient, private dialogRef: MatDialogRef<EditUserComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
   }

  ngOnInit(): void {
  }

  updateUser() {
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    }
    this.http.post('http://localhost:3000/addData', data, {
      responseType: 'text'
    }).subscribe((response) => {
      console.log(response);
      window.location.reload();
    }, (error) => {
      console.log(error);
      alert('Server Error');
    });
  }

  deleteUser() {
    this.http.delete('http://localhost:3000/deleteUser?email=' + this.email, {
      responseType: 'text'
    }).subscribe((response) => {
      console.log(response);
      window.location.reload();
    }, (error) => {
      console.log(error);
      alert('Server Error');
    });
  }

}
