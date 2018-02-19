'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {com.blockbitsolutions.Offer} offer
 * @transaction
 */
function makeOffer(offer) {
    console.log('make offer');

    var id = offer.agreement.id;
    var NS_Agreement        = 'com.blockbitsolutions.Agreement'
    var NS                  = 'com.blockbitsolutions'


    return getAssetRegistry(NS_Agreement)
        .then(function(agreementAssetRegistry) {
            return agreementAssetRegistry.get(id);
        })
        .then(function(agreement) {
            console.log(agreement)
        })
        .catch(function(error){
            console.log(error);
        });
}

/**
 * Sample transaction
 * @param {com.blockbitsolutions.createAgreement} createAgreement
 * @transaction
 */
function createAgreement() {
    console.log('createAgreement');

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    console.log(uuidv4())
    // var agreement = factory.newResource(NS,'Agreement','5');
    // var condition = factory.newConcept(NS,'Condition');
    // var financialCondition = factory.newConcept(NS,'FinancialCondition');
    // var paymentPurchasePrice = factory.newConcept(NS,'PaymentPurchasePrice')
    // var propertyRelation = factory.newRelationship(NS,'Property','1')
    // var purchaserRelation = factory.newRelationship(NS,'Purchaser','1')
    // var vendorRelation = factory.newRelationship(NS,'Vendor','1')

    // condition.description = "Building report required";
    // condition.required = true;

    // financialCondition.description = "Financial Condition";
    // financialCondition.required = true;
    // financialCondition.lender = "Purchaser's choice";
    // financialCondition.amount = "Sufficient to complete purchase";
    // financialCondition.financeDate = "10 working days from the date of this Agreement";

    // paymentPurchasePrice.property = propertyRelation;
    // paymentPurchasePrice.gstIncluded = true;
    // paymentPurchasePrice.purchasePrice = 30000.00;
    // paymentPurchasePrice.deposit = 0;

    // agreement.conditions = [condition];
    // agreement.financialCondition = financialCondition;
    // agreement.paymentPurchasePrice = paymentPurchasePrice;
    // agreement.status = "PROPOSAL";
    // agreement.purchaser = purchaserRelation;
    // agreement.vendor = vendorRelation;
    // agreement.property = propertyRelation;
    // agreementRegister.add(agreement);
}