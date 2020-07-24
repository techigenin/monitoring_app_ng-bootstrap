import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { Call } from './call.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CallsService {
  private callsArray: Call[] = [];
  callsChanged = new Subject<Call[]>();

  constructor(private http: HttpClient) {}

  fetchCalls() {
    return this.http.get<Call[]>(environment.baseURL + 'calls').pipe(
      tap((calls) => {
        this.callsArray = calls;
      })
    );
  }

  get calls() {
    return this.callsArray.slice();
  }

  getCall(id: number) {
    return this.calls.find((c) => c.id === +id);
  }

  addCall(call: Call): Observable<Call> {
    return this.http.post<Call>(environment.baseURL + 'calls', call).pipe(
      tap((c) => {
        this.callsArray.push(c);
        this.callsChanged.next(this.calls);
      })
    );
  }
}
