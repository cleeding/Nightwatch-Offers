Feature: Checking local restaurant offers results page

  Scenario: Searching vouchercodes for a local restaurant offer on Any date and with Any people

    Given I open Vouchercodes's home page
    And the title is "VoucherCodes - Exclusive Discount Codes & Vouchers"
    And I click on Categories
    And I click on Restaurants and the page title is "Restaurant Vouchers, Codes & Offers for January 2023"
    When I search "London" in the search box with Any date and Any people
    Then the search results should display at least one local restaurant offer

  Scenario Outline: Searching vouchercodes for a local restaurant offer on tomorrow date and with 10+ people

    Given I open Vouchercodes's home page
    And the title is "VoucherCodes - Exclusive Discount Codes & Vouchers"
    And I click on Categories
    And I click on Restaurants and the page title is "Restaurant Vouchers, Codes & Offers for January 2023"
    When I search "<location>" in the search box and select "<day>" and "<people>"
    Then the search results should display at least one local restaurant offer

    Examples:
      | location | day      | people |
      | London   | Tomorrow | 10+    |