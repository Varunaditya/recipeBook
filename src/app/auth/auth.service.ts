import * as firebase from 'firebase';
import {_catch} from 'rxjs/operator/catch';
import { Router } from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

  constructor(private router: Router) {}

  token: string;

  signUpUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      );
  }

  signInUser(email: string, password: string) {
    // console.log(1);
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        resolve => {
          this.router.navigate(['/recipes']);
          firebase.auth().currentUser.getToken()
            .then(
              (token: string) => this.token = token
            );
        }
      )
      .catch(
        error => console.log(error)
    );
  }

  getToken() {
    firebase.auth().currentUser.getToken()
      .then(
      (token: string) => this.token = token
    );
    return this.token;
  }

  isAuthenticated() {
    // console.log(this.location.origin);
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }
}
