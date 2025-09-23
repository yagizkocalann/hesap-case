Feature: Individual Credit

    Scenario: Search Credit
        Given I open the Hesap homepage
        When I close the opportunity pop-up on homepage
        When I dismiss the cookie banner on homepage
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