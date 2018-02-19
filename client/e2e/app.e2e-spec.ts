import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for client', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be client', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('client');
    })
  });

  it('navbar-brand should be property@0.0.1',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('property@0.0.1');
  });

  
    it('Vendor component should be loadable',() => {
      page.navigateTo('/Vendor');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Vendor');
    });

    it('Vendor table should have 6 columns',() => {
      page.navigateTo('/Vendor');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  
    it('Purchaser component should be loadable',() => {
      page.navigateTo('/Purchaser');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Purchaser');
    });

    it('Purchaser table should have 5 columns',() => {
      page.navigateTo('/Purchaser');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });

  
    it('Property component should be loadable',() => {
      page.navigateTo('/Property');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Property');
    });

    it('Property table should have 9 columns',() => {
      page.navigateTo('/Property');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });

  
    it('Agreement component should be loadable',() => {
      page.navigateTo('/Agreement');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Agreement');
    });

    it('Agreement table should have 9 columns',() => {
      page.navigateTo('/Agreement');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });

  

});
