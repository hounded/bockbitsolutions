import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Purchaser } from '../com.blockbitsolutions';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class PurchaserService {

	
		private NAMESPACE: string = 'com.blockbitsolutions.Purchaser';
	



    constructor(private dataService: DataService<Purchaser>) {
    };

    public getAll(): Observable<Purchaser[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Purchaser> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Purchaser> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Purchaser> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Purchaser> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
