import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crud';
  firstName: string;
  lastName: string;
  email: string;
  users: any;

  constructor(private http: HttpClient, private dialogBox: MatDialog) {
  }

  ngOnInit() {
    this.getUsers();
  }

  addData() {
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    };

    this.http.post('http://localhost:3000/addData', data, {
      responseType: 'text'
    }).subscribe((response) => {
      console.log(response);
      window.location.reload();
    }, (error) => {
      console.log(error);
    });
  }

  getUsers() {
    this.http.get('http://localhost:3000/getUsers', {
      responseType: 'json'
    }).subscribe((response) => {
      this.users = response;
      console.log(this.users);
    }, (error) => {
      console.log('error');
    });
  }

  openEditUserDialog(user) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = user;

    const dialogRef = this.dialogBox.open(EditUserComponent, dialogConfig);
  }
}
