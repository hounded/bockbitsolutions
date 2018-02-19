import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Property } from '../com.blockbitsolutions';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class PropertyService {

	
		private NAMESPACE: string = 'com.blockbitsolutions.Property';
	



    constructor(private dataService: DataService<Property>) {
    };

    public getAll(): Observable<Property[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Property> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Property> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Property> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Property> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
