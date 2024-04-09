import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
  
export class LoadingServiced {


    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();
  
    setLoading(loading: boolean) {
      this.loadingSubject.next(loading);
    }
}
