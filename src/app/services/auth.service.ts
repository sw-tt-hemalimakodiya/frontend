import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // env: any
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    //this.env = environment
  }

  register(payload: any, cb: any) {
    return this.http.post(environment.BASE_API_URL + "user/register", payload).subscribe(
      response => {
        return cb(response)
      }
    );
  }

  login(payload: any, cb: any) {
    return this.http.post(environment.BASE_API_URL + "user/login", payload).subscribe(
      response => {
        return cb(response)
      }
    );
  }

  SetSelectedUserProfile(data: string) {
    return window.localStorage.setItem(environment.USER_PROFILE, data);
  }

  IsAuthenticated() {
    let userProfile = window.localStorage.getItem(environment.USER_PROFILE);
    if (userProfile) {
      let userProfile2 = JSON.parse(userProfile);
      if (userProfile2 && userProfile2.data && userProfile2.data.authToken) {
        return true;
      }
      else {
        return false;
      }
    } else {
      return false;
    }
  }

  logout(){
    window.localStorage.removeItem(environment.USER_PROFILE);
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']); 
  }
}
