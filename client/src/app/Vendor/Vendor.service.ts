import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Vendor } from '../com.blockbitsolutions';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class VendorService {

	
		private NAMESPACE: string = 'com.blockbitsolutions.Vendor';
	



    constructor(private dataService: DataService<Vendor>) {
    };

    public getAll(): Observable<Vendor[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Vendor> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Vendor> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Vendor> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Vendor> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
