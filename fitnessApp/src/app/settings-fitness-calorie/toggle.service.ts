import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private kCalToggleSubject = new BehaviorSubject<boolean | null>(null); // Initialize with null
  kCalToggle$ = this.kCalToggleSubject.asObservable();

  setKCalToggle(value: boolean | null) {
    this.kCalToggleSubject.next(value);
  }
}
