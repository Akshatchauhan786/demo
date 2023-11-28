import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare const gapi: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private zone: NgZone) {
    this.initForm();
    this.loadGoogleSignInScript();
  }

  initForm() {
    // Your existing form initialization code
  }

  loadGoogleSignInScript() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = () => {
      this.renderGoogleSignInButton();
    };
    document.head.appendChild(script);
  }

  renderGoogleSignInButton() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: 'AIzaSyBIS-rtiKxtWH6WogaQzWtlv6UiRazX9vU', // Replace with your Google Client ID
      });

      gapi.signin2.render('google-signin-button', {
        onsuccess: (googleUser: any) => {
          // Handle the signed-in user.
          const profile = googleUser.getBasicProfile();
          this.zone.run(() => {
            // Process the Google user's profile (e.g., send it to your backend).
            console.log('Google Sign-In Success', profile);
          });
        },
        onfailure: (error: any) => {
          console.error('Google Sign-In Failure', error);
        },
      });
    });
  }

  onSignupSubmit() {
    // Your existing signup form submission logic
  }
}
