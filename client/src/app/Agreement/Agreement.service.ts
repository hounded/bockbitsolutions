import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Agreement } from '../com.blockbitsolutions';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class AgreementService {

	
		private NAMESPACE: string = 'com.blockbitsolutions.Agreement';
	



    constructor(private dataService: DataService<Agreement>) {
    };

    public getAll(): Observable<Agreement[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Agreement> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Agreement> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Agreement> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Agreement> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
