import { AbstractControl, ControlContainer, ValidatorFn } from "@angular/forms";



export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn{
 return (control:AbstractControl)=>{
    const forbidden = /admin/.test(control.value);
    return forbidden ? { 'forbiddenName':{value: control.value}} : null;
   };
}
