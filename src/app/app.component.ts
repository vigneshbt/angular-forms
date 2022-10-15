import { Component } from '@angular/core';
import { User } from './user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
topics=['Angular','React','Vue'];

userModel = new User('','rob@gmail.com',9876543210,'','morning',true);
}
