import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private idSource = new BehaviorSubject<string>('default message');
  currentId = this.idSource.asObservable();

  constructor() { }

  changeId(id: string) {
    this.idSource.next(id);
  }
}
