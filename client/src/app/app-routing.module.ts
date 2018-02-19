import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { VendorComponent } from './Vendor/Vendor.component';
import { PurchaserComponent } from './Purchaser/Purchaser.component';
import { PropertyComponent } from './Property/Property.component';
import { AgreementComponent } from './Agreement/Agreement.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Vendor', component: VendorComponent},
		
		{ path: 'Purchaser', component: PurchaserComponent},
		
		{ path: 'Property', component: PropertyComponent},
		
		{ path: 'Agreement', component: AgreementComponent},
		
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
