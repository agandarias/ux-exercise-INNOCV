import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private apiURL: string;

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.apiURL = environment.apiURL;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL).pipe(
      map((userArray: User[]) => {
        userArray.map((user: User) => {
          // const birthdate = this.datePipe.transform(user.birthdate, 'dd-MM-yyyy');
          // console.log('birthdate: ', birthdate);
          // user.birthdate = birthdate;
          return user;
        });
        return userArray;
      }),
      tap(_ => console.log('Fetch users')),
      catchError(this.handleError('getUsers', []))
    );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  addUser(user: NgForm): Observable<User> {
    return this.http.post<User>(this.apiURL, user).pipe(
      tap(_ => console.log(`added user=${user}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  updateUser(user: NgForm): Observable<User> {
    const url = `${this.apiURL}`;
    return this.http.put(url, user).pipe(
      tap(_ => console.log(`updated user=${user}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  deleteUser(id): Observable<User> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<User>(url).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
