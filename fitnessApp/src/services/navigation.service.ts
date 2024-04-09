import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private selectInnerItemSource = new Subject<{ innerItem: string, param?: string }>();
    private goBackSource = new Subject<void>();

    selectInnerItem$ = this.selectInnerItemSource.asObservable();
    goBack$ = this.goBackSource.asObservable();

    selectInnerItem(innerItem: string, param?: string) {
        this.selectInnerItemSource.next({ innerItem, param });
    }

    goBack() {
        this.goBackSource.next();
    }
}
