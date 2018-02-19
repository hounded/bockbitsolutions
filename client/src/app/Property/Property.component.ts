import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PropertyService } from './Property.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Property',
	templateUrl: './Property.component.html',
	styleUrls: ['./Property.component.css'],
  providers: [PropertyService]
})
export class PropertyComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          ct = new FormControl("", Validators.required);
        
  
      
          address = new FormControl("", Validators.required);
        
  
      
          estate = new FormControl("", Validators.required);
        
  
      
          legalDescription = new FormControl("", Validators.required);
        
  
      
          area = new FormControl("", Validators.required);
        
  
      
          lotFlatUnit = new FormControl("", Validators.required);
        
  
      
          dp = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  


  constructor(private serviceProperty:PropertyService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          ct:this.ct,
        
    
        
          address:this.address,
        
    
        
          estate:this.estate,
        
    
        
          legalDescription:this.legalDescription,
        
    
        
          area:this.area,
        
    
        
          lotFlatUnit:this.lotFlatUnit,
        
    
        
          dp:this.dp,
        
    
        
          owner:this.owner
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceProperty.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "com.blockbitsolutions.Property",
      
        
          "ct":this.ct.value,
        
      
        
          "address":this.address.value,
        
      
        
          "estate":this.estate.value,
        
      
        
          "legalDescription":this.legalDescription.value,
        
      
        
          "area":this.area.value,
        
      
        
          "lotFlatUnit":this.lotFlatUnit.value,
        
      
        
          "dp":this.dp.value,
        
      
        
          "owner":this.owner.value
        
      
    };

    this.myForm.setValue({
      
        
          "ct":null,
        
      
        
          "address":null,
        
      
        
          "estate":null,
        
      
        
          "legalDescription":null,
        
      
        
          "area":null,
        
      
        
          "lotFlatUnit":null,
        
      
        
          "dp":null,
        
      
        
          "owner":null
        
      
    });

    return this.serviceProperty.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "ct":null,
        
      
        
          "address":null,
        
      
        
          "estate":null,
        
      
        
          "legalDescription":null,
        
      
        
          "area":null,
        
      
        
          "lotFlatUnit":null,
        
      
        
          "dp":null,
        
      
        
          "owner":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "com.blockbitsolutions.Property",
      
        
          
        
    
        
          
            "address":this.address.value,
          
        
    
        
          
            "estate":this.estate.value,
          
        
    
        
          
            "legalDescription":this.legalDescription.value,
          
        
    
        
          
            "area":this.area.value,
          
        
    
        
          
            "lotFlatUnit":this.lotFlatUnit.value,
          
        
    
        
          
            "dp":this.dp.value,
          
        
    
        
          
            "owner":this.owner.value
          
        
    
    };

    return this.serviceProperty.updateAsset(form.get("ct").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceProperty.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceProperty.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "ct":null,
          
        
          
            "address":null,
          
        
          
            "estate":null,
          
        
          
            "legalDescription":null,
          
        
          
            "area":null,
          
        
          
            "lotFlatUnit":null,
          
        
          
            "dp":null,
          
        
          
            "owner":null 
          
        
      };



      
        if(result.ct){
          
            formObject.ct = result.ct;
          
        }else{
          formObject.ct = null;
        }
      
        if(result.address){
          
            formObject.address = result.address;
          
        }else{
          formObject.address = null;
        }
      
        if(result.estate){
          
            formObject.estate = result.estate;
          
        }else{
          formObject.estate = null;
        }
      
        if(result.legalDescription){
          
            formObject.legalDescription = result.legalDescription;
          
        }else{
          formObject.legalDescription = null;
        }
      
        if(result.area){
          
            formObject.area = result.area;
          
        }else{
          formObject.area = null;
        }
      
        if(result.lotFlatUnit){
          
            formObject.lotFlatUnit = result.lotFlatUnit;
          
        }else{
          formObject.lotFlatUnit = null;
        }
      
        if(result.dp){
          
            formObject.dp = result.dp;
          
        }else{
          formObject.dp = null;
        }
      
        if(result.owner){
          
            formObject.owner = result.owner;
          
        }else{
          formObject.owner = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "ct":null,
        
      
        
          "address":null,
        
      
        
          "estate":null,
        
      
        
          "legalDescription":null,
        
      
        
          "area":null,
        
      
        
          "lotFlatUnit":null,
        
      
        
          "dp":null,
        
      
        
          "owner":null 
        
      
      });
  }

}
