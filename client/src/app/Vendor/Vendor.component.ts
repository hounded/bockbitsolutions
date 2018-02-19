import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { VendorService } from './Vendor.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Vendor',
	templateUrl: './Vendor.component.html',
	styleUrls: ['./Vendor.component.css'],
  providers: [VendorService]
})
export class VendorComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          gst = new FormControl("", Validators.required);
        
  
      
          id = new FormControl("", Validators.required);
        
  
      
          description = new FormControl("", Validators.required);
        
  
      
          FirstName = new FormControl("", Validators.required);
        
  
      
          LastName = new FormControl("", Validators.required);
        
  


  constructor(private serviceVendor:VendorService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          gst:this.gst,
        
    
        
          id:this.id,
        
    
        
          description:this.description,
        
    
        
          FirstName:this.FirstName,
        
    
        
          LastName:this.LastName
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceVendor.getAll()
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
      $class: "com.blockbitsolutions.Vendor",
      
        
          "gst":this.gst.value,
        
      
        
          "id":this.id.value,
        
      
        
          "description":this.description.value,
        
      
        
          "FirstName":this.FirstName.value,
        
      
        
          "LastName":this.LastName.value
        
      
    };

    this.myForm.setValue({
      
        
          "gst":null,
        
      
        
          "id":null,
        
      
        
          "description":null,
        
      
        
          "FirstName":null,
        
      
        
          "LastName":null
        
      
    });

    return this.serviceVendor.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "gst":null,
        
      
        
          "id":null,
        
      
        
          "description":null,
        
      
        
          "FirstName":null,
        
      
        
          "LastName":null 
        
      
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
      $class: "com.blockbitsolutions.Vendor",
      
        
          
            "gst":this.gst.value,
          
        
    
        
          
        
    
        
          
            "description":this.description.value,
          
        
    
        
          
            "FirstName":this.FirstName.value,
          
        
    
        
          
            "LastName":this.LastName.value
          
        
    
    };

    return this.serviceVendor.updateAsset(form.get("id").value,this.asset)
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

    return this.serviceVendor.deleteAsset(this.currentId)
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

    return this.serviceVendor.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "gst":null,
          
        
          
            "id":null,
          
        
          
            "description":null,
          
        
          
            "FirstName":null,
          
        
          
            "LastName":null 
          
        
      };



      
        if(result.gst){
          
            formObject.gst = result.gst;
          
        }else{
          formObject.gst = null;
        }
      
        if(result.id){
          
            formObject.id = result.id;
          
        }else{
          formObject.id = null;
        }
      
        if(result.description){
          
            formObject.description = result.description;
          
        }else{
          formObject.description = null;
        }
      
        if(result.FirstName){
          
            formObject.FirstName = result.FirstName;
          
        }else{
          formObject.FirstName = null;
        }
      
        if(result.LastName){
          
            formObject.LastName = result.LastName;
          
        }else{
          formObject.LastName = null;
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
      
        
          "gst":null,
        
      
        
          "id":null,
        
      
        
          "description":null,
        
      
        
          "FirstName":null,
        
      
        
          "LastName":null 
        
      
      });
  }

}
