import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    console.log("Validating registration form");
    if(user.username == undefined || user.password == undefined) {
      return false;
    } else {
      return true;
    }
  }

}
