Feature: Individual Credit

    Scenario: Search Credit
        Given I open the Hesap homepage
        When I close the opportunity pop-up on homepage
        When I dismiss the cookie banner on homepage
        And I click the Individual Credit button from Credit Dropdown
        And I fill the Value field which is 100.000
        And I select the 36 month Period from Period dropdown
        And I click the Hesap'la button
