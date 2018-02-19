import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AgreementService } from './Agreement.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Agreement',
	templateUrl: './Agreement.component.html',
	styleUrls: ['./Agreement.component.css'],
  providers: [AgreementService]
})
export class AgreementComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          id = new FormControl("", Validators.required);
        
  
      
          conditions = new FormControl("", Validators.required);
        
  
      
          financialCondition = new FormControl("", Validators.required);
        
  
      
          paymentPurchasePrice = new FormControl("", Validators.required);
        
  
      
          status = new FormControl("", Validators.required);
        
  
      
          purchaser = new FormControl("", Validators.required);
        
  
      
          vendor = new FormControl("", Validators.required);
        
  
      
          property = new FormControl("", Validators.required);
        
  


  constructor(private serviceAgreement:AgreementService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          id:this.id,
        
    
        
          conditions:this.conditions,
        
    
        
          financialCondition:this.financialCondition,
        
    
        
          paymentPurchasePrice:this.paymentPurchasePrice,
        
    
        
          status:this.status,
        
    
        
          purchaser:this.purchaser,
        
    
        
          vendor:this.vendor,
        
    
        
          property:this.property
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceAgreement.getAll()
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
      $class: "com.blockbitsolutions.Agreement",
      
        
          "id":this.id.value,
        
      
        
          "conditions":this.conditions.value,
        
      
        
          "financialCondition":this.financialCondition.value,
        
      
        
          "paymentPurchasePrice":this.paymentPurchasePrice.value,
        
      
        
          "status":this.status.value,
        
      
        
          "purchaser":this.purchaser.value,
        
      
        
          "vendor":this.vendor.value,
        
      
        
          "property":this.property.value
        
      
    };

    this.myForm.setValue({
      
        
          "id":null,
        
      
        
          "conditions":null,
        
      
        
          "financialCondition":null,
        
      
        
          "paymentPurchasePrice":null,
        
      
        
          "status":null,
        
      
        
          "purchaser":null,
        
      
        
          "vendor":null,
        
      
        
          "property":null
        
      
    });

    return this.serviceAgreement.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "id":null,
        
      
        
          "conditions":null,
        
      
        
          "financialCondition":null,
        
      
        
          "paymentPurchasePrice":null,
        
      
        
          "status":null,
        
      
        
          "purchaser":null,
        
      
        
          "vendor":null,
        
      
        
          "property":null 
        
      
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
      $class: "com.blockbitsolutions.Agreement",
      
        
          
        
    
        
          
            "conditions":this.conditions.value,
          
        
    
        
          
            "financialCondition":this.financialCondition.value,
          
        
    
        
          
            "paymentPurchasePrice":this.paymentPurchasePrice.value,
          
        
    
        
          
            "status":this.status.value,
          
        
    
        
          
            "purchaser":this.purchaser.value,
          
        
    
        
          
            "vendor":this.vendor.value,
          
        
    
        
          
            "property":this.property.value
          
        
    
    };

    return this.serviceAgreement.updateAsset(form.get("id").value,this.asset)
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

    return this.serviceAgreement.deleteAsset(this.currentId)
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

    return this.serviceAgreement.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "id":null,
          
        
          
            "conditions":null,
          
        
          
            "financialCondition":null,
          
        
          
            "paymentPurchasePrice":null,
          
        
          
            "status":null,
          
        
          
            "purchaser":null,
          
        
          
            "vendor":null,
          
        
          
            "property":null 
          
        
      };



      
        if(result.id){
          
            formObject.id = result.id;
          
        }else{
          formObject.id = null;
        }
      
        if(result.conditions){
          
            formObject.conditions = result.conditions;
          
        }else{
          formObject.conditions = null;
        }
      
        if(result.financialCondition){
          
            formObject.financialCondition = result.financialCondition;
          
        }else{
          formObject.financialCondition = null;
        }
      
        if(result.paymentPurchasePrice){
          
            formObject.paymentPurchasePrice = result.paymentPurchasePrice;
          
        }else{
          formObject.paymentPurchasePrice = null;
        }
      
        if(result.status){
          
            formObject.status = result.status;
          
        }else{
          formObject.status = null;
        }
      
        if(result.purchaser){
          
            formObject.purchaser = result.purchaser;
          
        }else{
          formObject.purchaser = null;
        }
      
        if(result.vendor){
          
            formObject.vendor = result.vendor;
          
        }else{
          formObject.vendor = null;
        }
      
        if(result.property){
          
            formObject.property = result.property;
          
        }else{
          formObject.property = null;
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
      
        
          "id":null,
        
      
        
          "conditions":null,
        
      
        
          "financialCondition":null,
        
      
        
          "paymentPurchasePrice":null,
        
      
        
          "status":null,
        
      
        
          "purchaser":null,
        
      
        
          "vendor":null,
        
      
        
          "property":null 
        
      
      });
  }

}
