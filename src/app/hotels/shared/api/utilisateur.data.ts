import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IUtilisateur } from '../models/utilisateur';

/**
 * Initial data for in memory web api
 *
 * @export
 * @class UtilisateurData
 * @implements {InMemoryDbService}
 */
export class UtilisateurData implements InMemoryDbService {

  createDb(): Record<string, IUtilisateur[]> {
    const utilisateurs: IUtilisateur[] = [
      
{
    id: 1, 
    username: "Boris",
    firstname:"Belle vue au bord de la mer",
    lastname: 'Alain',
    email: 'boris@gmail.com',
    password: 'boris0000',
},
{
    id: 2, 
    username: "Donald",
    firstname:"Belle vue au bord de la mer",
    lastname: 'Bobo',
    email: 'donald@gmail.com',
    password: 'donald0000',
},
  {
    id: 3, 
    username: "Lanvin",
    firstname:"Belle vue au bord de la mer",
    lastname: 'Rudy',
    email: 'lanvin@gmail.com',
    password: 'lanvin0000',
},
{
    id: 4, 
    username: "Quentin",
    firstname:"Belle vue au bord de la mer",
    lastname: 'Durand',
    email: 'quentin@gmail.com',
    password: 'quentin0000',
},
{
    id: 5, 
    username: "Max",
    firstname:"Belle vue au bord de la mer",
    lastname: 'Darius',
    email: 'max@gmail.com',
    password: 'maxmax0000',
}
    
    ];

    return { utilisateurs };
  }


  genId(utilisateurs: IUtilisateur[]): number {
    return utilisateurs.length > 0 ? Math.max(...utilisateurs.map(utilisateur => utilisateur.id)) + 1 : 1;
  }
}
