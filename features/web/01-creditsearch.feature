Feature: Individual Credit

    Background:
        Given I open the Hesap homepage
        And I close the opportunity pop-up on homepage
        And I dismiss the cookie banner on homepage

    Scenario: Search Credit
        When I click the Individual Credit button from Credit Dropdown
        When I fill the Value field which is "<amount>"
        When I select the <period> month Period from Period dropdown
        When I click the Hesap'la button
        Then I check the credit rate between 0 and 1.00

        Examples:
            | amount | period |
            | 50000  | 12     |
            | 100000 | 18     |
            | 150000 | 24     |