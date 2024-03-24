// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../shared/services/auth.service';

// @Component({
//   selector: 'app-registration',
//   templateUrl: './registration.component.html',
//   styleUrls: ['./registration.component.css']
// })
// export class RegistrationComponent implements OnInit {

//   registrationForm!: FormGroup;

//   constructor(private formBuilder: FormBuilder, private authService: AuthService) { }


//   private validationMessages: { [key: string]: { [key: string]: string } } = {

//     username : {
//       required: 'Le nom de l\'utilisateur est obligatoire',
//       minlength: 'Le nom de l\'utilisateur doit comporter au moins 3 caractères',
//       maxlength: 'le nom de l\'utilisateur doit comporter au plus 50 caractères'
//     },
//     firstname : {
//       required: 'Le nom est obligatoire',
//       minlength: 'Le nom doit comporter au moins 3 caractères',
//       maxlength: 'le nom doit comporter au plus 50 caractères'
//     },
//     lastname : {
//       required: 'Le prénom est obligatoire',
//       minlength: 'Le prénom doit comporter au moins 3 caractères',
//       maxlength: 'le prénom doit comporter au plus 50 caractères'
//     },
//     email:{
//       required: 'l\'adresse mail est obligatoire',
//     },
//     password: {
//       required: 'le mot de passe est obligatoire',
//       minlength: 'le mot de passe doit comporter au moins 8 caractères'
//     }
//   }

//   ngOnInit(): void {
//     this.registrationForm = this.formBuilder.group({
//       username: ['', Validators.required],
//       firstname: ['', Validators.required],
//       lastname: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(8)]]
//     });
//   }  




//   // Fonction pour soumettre le formulaire
//   onSubmit(): void {
//     if (this.registrationForm.valid) {
//       // Envoyer les données d'inscription au service d'authentification
//       console.log(this.registrationForm.value);
//     } else {
//       // Afficher des messages d'erreur ou prendre d'autres mesures
//       console.log('Invalid form');
//     }
//   }

// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  validationMessages = {
    
    username : {
            required: 'Le nom de l\'utilisateur est obligatoire',
            minlength: 'Le nom de l\'utilisateur doit comporter au moins 3 caractères',
            maxlength: 'le nom de l\'utilisateur doit comporter au plus 50 caractères'
            },
    firstname : {
            required: 'Le nom est obligatoire',
            minlength: 'Le nom doit comporter au moins 3 caractères',
            maxlength: 'le nom doit comporter au plus 50 caractères'
          },
    lastname : {
            required: 'Le prénom est obligatoire',
            minlength: 'Le prénom doit comporter au moins 3 caractères',
            maxlength: 'le prénom doit comporter au plus 50 caractères'
          },
    email:{
            required: 'l\'adresse mail est obligatoire',
          },
    password: {
            required: 'le mot de passe est obligatoire',
            minlength: 'le mot de passe doit comporter au moins 8 caractères'
          }
  };

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.createRegistrationForm();
  }

  createRegistrationForm(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      const { firstname, lastname, email, password } = formData; // Extraction des valeurs du formulaire
      const username = formData.username; // Vous pouvez également accéder directement à formData.username si besoin
  
      // Appel de la méthode register avec tous les paramètres requis
      this.authService.register(username, firstname, lastname, email, password).subscribe(
        (response) => {
          // Gérer la réponse du service d'authentification en cas de succès
          console.log('Inscription réussie:', response);
        },
        (error) => {
          // Gérer l'erreur du service d'authentification en cas d'échec
          console.error('Erreur lors de l\'inscription:', error);
        }
      );
    } else {
      // Afficher des messages d'erreur ou prendre d'autres mesures
      console.log('Formulaire invalide');
    }
  }
  
}
