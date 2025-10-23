
class PracticePage{

    static loadHomePage(){
       cy.visit('https://www.briskergroup.nl/en/')
       cy.url().should('include', 'briskergroup')

       cy.log(`The url contains the text - briskergroup`)
    }

    static clickonOurBranchsMenu(){
        cy.get(`body > header:nth-child(2) > div:nth-child(1) > nav:nth-child(3) > ul:nth-child(1) > li:nth-child(2) > a:nth-child(1)`).click({force:true})

    }

    static verifyThePresenceOfTentooAndPayforPeopleClient(){

        cy.xpath(`//h2[normalize-space()='Tentoo']`).should('contain.text', 'Tentoo')
        cy.xpath(`//h2[normalize-space()='Pay for People']`).should('contain.text', 'Pay for People')
       
    }
    
    static verifyAppURLconsistsOfEnLanguage(){
   

    cy.url().should('include', '/en/')
    cy.log(`The url contains the language code - en`)
    }

    static verifyAppURLconsistsOfDomainBriskergroup(){
   

    cy.url().should('include', 'briskergroup')
    cy.log(`The url contains the domain - briskergroup`)
    }
    


    static verifyThePresenceOfFourMenuOptions(){
        cy.get(':nth-child(1) > .mainmenu__link').should('contain.text', 'NL')
        
    }

   
}

export default PracticePage;