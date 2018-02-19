import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace com.blockbitsolutions{
   export enum AgreementState {
      PROPOSAL,
      COUNTER,
      AGREED,
   }
   export abstract class party extends Asset {
      id: string;
      description: string;
      FirstName: string;
      LastName: string;
   }
   export class Vendor extends party {
      gst: boolean;
   }
   export class Purchaser extends party {
   }
   export class Property extends Asset {
      ct: string;
      address: string;
      estate: string;
      legalDescription: string;
      area: string;
      lotFlatUnit: string;
      dp: string;
      owner: Vendor;
   }
   export class Agreement extends Asset {
      id: string;
      conditions: Condition[];
      financialCondition: FinancialCondition;
      paymentPurchasePrice: PaymentPurchasePrice;
      status: AgreementState;
      purchaser: Purchaser;
      vendor: Vendor;
      property: Property;
   }
   export class PaymentPurchasePrice {
      property: Property;
      gstIncluded: boolean;
      purchasePrice: number;
      deposit: number;
   }
   export class Condition {
      description: string;
      required: boolean;
   }
   export class FinancialCondition extends Condition {
      lender: string;
      amount: string;
      financeDate: string;
   }
   export class Offer extends Transaction {
      price: number;
      agreement: Agreement;
   }
   export class createAgreement extends Transaction {
      offerPrice: string;
      deposit: string;
      gstIncluded: string;
      vendor: Vendor;
      purchaser: Purchaser;
      property: Property;
   }
   export class SetupDemo extends Transaction {
   }
// }
