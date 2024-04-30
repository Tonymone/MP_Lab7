import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface User {
  _id: number;
  name: string;
  email: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserCrudServiceService {
  private endpoint = 'http://localhost:3000/users'; // Replace with your actual backend API URL
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.endpoint, user, this.httpOptions).pipe(
      tap((newUser: User) => console.log(`User created: ${newUser.username}`)),
      catchError(this.handleError<User>('createUser'))
    );
  }

  getUser(username: string): Observable<User> {
    const url = `${this.endpoint}/${username}`;
    return this.httpClient.get<User>(url).pipe(
      tap((user: User) => console.log(`User fetched: ${user.username}`)),
      catchError(this.handleError<User>('getUser'))
    );
  }
    
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.endpoint).pipe(
      tap(_ => console.log('Users retrieved!')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  updateUser(username: string, user: User): Observable<User> {
    const url = `${this.endpoint}/${username}`;
    return this.httpClient.put<User>(url, user, this.httpOptions).pipe(
      tap((updatedUser: User) => console.log(`User updated: ${updatedUser.username}`)),
      catchError(this.handleError<User>('updateUser'))
    );
  }

  deleteUser(username: string): Observable<void> {
    const url = `${this.endpoint}/${username}`;
    return this.httpClient.delete<void>(url, this.httpOptions).pipe(
      tap(_ => console.log(`User deleted: ${username}`)),
      catchError(this.handleError<void>('deleteUser'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
