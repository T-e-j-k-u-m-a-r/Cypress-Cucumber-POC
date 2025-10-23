# Feature ID: 1122

Feature: Brisk Group Application

  Scenario: Verify the presence of clients
    Given I successfully browse to the Application
    When I click on ourbrand menu
    Then I should see the client Tentoo and Pay4me
    Then Application url should have the language code en
    Then Application url should have the domain as briskergroup