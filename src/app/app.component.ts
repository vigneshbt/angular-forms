import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { PasswordValidator } from 'shared/password.validaor';
import { forbiddenNameValidator } from 'shared/user-name.validator';
import { RegistrationService } from 'reactive-forms/registration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  'registrationForm': FormGroup;
  get userName(){
    return this.registrationForm.get('userName')
  }

  get email(){
    return this.registrationForm.get('email')
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }
  constructor(private fb: FormBuilder, private _registrationService: RegistrationService) {}

  ngOnInit(){
    this.registrationForm = this.fb.group({
      userName: ['',[Validators.required, Validators.minLength(3),forbiddenNameValidator(/password/)]],
      email: [''],
      subscribe:[false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      alternateEmails: this.fb.array([])
    },{Validator: PasswordValidator});

    this.registrationForm.get('subscribe')?.valueChanges
    .subscribe(checkedValue =>{
      const email = this.registrationForm.get('email');
      if (checkedValue) {
        email?.setValidators(Validators.required);
      } else{
        email?.clearValidators();
      }
      email?.updateValueAndValidity();
    });
  }

  LoadApiData() {
    this.registrationForm.patchValue({
      userName: 'Bruce',
    password: 'test',
    confirmPassword: 'test'
  });
}
onSubmit() {
  console.log(this.registrationForm.value);
  this._registrationService.register(this.registrationForm.value)
  .subscribe(
    response => console.log('Success!',response),
    error => console.error('Error!',error)
    );

}
}
