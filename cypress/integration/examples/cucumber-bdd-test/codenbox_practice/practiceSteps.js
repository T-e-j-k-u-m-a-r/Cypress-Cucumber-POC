/// <reference types="Cypress" />

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import PracticePage from './PracticePage'


Given('I successfully browse to the Application', function(){
    PracticePage.loadHomePage();
    
})

When('I click on ourbrand menu', ()=>{
    PracticePage.clickonOurBranchsMenu();

})

Then('I should see the client Tentoo and Pay4me', ()=>{
    PracticePage.verifyThePresenceOfTentooAndPayforPeopleClient();
})


Then('Application url should have the language code en', ()=>{
    PracticePage.verifyAppURLconsistsOfEnLanguage();
})

Then('Application url should have the domain as briskergroup', ()=>{
    PracticePage.verifyAppURLconsistsOfDomainBriskergroup();
})




