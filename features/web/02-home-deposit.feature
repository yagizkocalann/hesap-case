Feature: Home deposit widget and newsletter

  Background:
    Given I open the Hesap homepage
    And I close the opportunity pop-up on homepage
    And I dismiss the cookie banner on homepage

  Scenario: Successful deposit calculation from homepage
    When I fill the deposit amount as 100000
    And I fill the deposit days as 32
    And I click the Homepage deposit Hesap'la button
    Then I should see at least one deposit result

  Scenario: Newsletter subscription without required consents shows validation
    When I try to subscribe to the newsletter with email "test@example.com" without accepting consents
    Then I should see a newsletter validation error

