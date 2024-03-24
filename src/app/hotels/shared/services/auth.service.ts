import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUtilisateur } from '../models/utilisateur';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'api/utilisateurs'; // L'URL de votre API d'authentification

  constructor(private http: HttpClient) {}

  // Méthode d'inscription
  register(username: string, firstname: string, lastname: string, email: string, password: string): Observable<IUtilisateur> {
    return this.http.post<IUtilisateur>(`${this.apiUrl}/register`, { username, firstname, lastname, email, password }).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'inscription :', error);
        return of(null); // Gérer l'erreur ici, par exemple en renvoyant null ou un objet d'erreur
      })
    );
  }

  // Méthode de connexion
  login(email: string, password: string): Observable<IUtilisateur> {
    return this.http.post<IUtilisateur>(`${this.apiUrl}/login`, { email, password }).pipe(
      catchError(error => {
        console.error('Erreur lors de la connexion :', error);
        return of(null); // Gérer l'erreur ici, par exemple en renvoyant null ou un objet d'erreur
      })
    );
  }

  // Méthode de déconnexion
  logout(): Observable<IUtilisateur> {
    return this.http.post<IUtilisateur>(`${this.apiUrl}/logout`, {}).pipe(
      catchError(error => {
        console.error('Erreur lors de la déconnexion :', error);
        return of(null); // Gérer l'erreur ici, par exemple en renvoyant null ou un objet d'erreur
      })
    );
  }
}
  




  

  // private handleHttpError(err: HttpErrorResponse) {
  //   let error: string;
  //   if (err.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', err.error.message);
  //     error = `An error occurred: ${err.error.message}`;
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${err.status}, ` +
  //       `body was: ${err.error}`
  //     );
  //     error = `Backend returned code ${err.status}, body was: ${err.error}`;
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(
  //     'Something bad happened; please try again later.'
  //     + '\n'
  //     + error
  //   );
  //}


  // // Méthode pour l'inscription
  // register(username: string, email: string, password: string): Observable<any> {
  //   return this.http.post<any>('/api/utilisateurs', { username, email, password });
  // }

  // // Méthode pour la connexion
  // login(username: string, password: string): Observable<any> {
  //   return this.http.post<any>('/api/login', { username, password });
  // }

  // // Méthode pour la déconnexion
  // logout(): Observable<any> {
  //   return this.http.post<any>('/api/logout', {});
  // }

