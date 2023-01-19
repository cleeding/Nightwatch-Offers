const { Given, Then, When, Before } = require('@cucumber/cucumber');
const { getGherkinScenarioLocationMap } = require('@cucumber/cucumber/lib/formatter/helpers/gherkin_document_parser');

const homePage = "https://www.vouchercodes.co.uk";
const categories = "a[id='categories-dialog']";
const restaurants = "body > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > section:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(3) > span:nth-child(2)";
const findButtonRestaurants = "button[class='mx-auto mb-2 w-full px-12 md:w-auto font-normal overflow-hidden text-white duration-500 transition-all ease-out-quint focus:outline-none rounded-tl rounded-tr rounded-bl rounded-br hover:no-underline flex items-center justify-center bg-green border-green hover:bg-green-800 hover:border-green-800 h-12 px-2']";
const firstLocalOffer = "/html/body/div[1]/div/div/div[1]/div[3]/div[1]/div[1]/article[1]";

const fs = require('fs');
const myConsole = new console.Console(fs.createWriteStream('./output.txt'));

Given(/^I open Vouchercodes's home page$/, () => {
  browser
    .windowMaximize()
    .url(homePage)
    .waitForElementPresent('body', 1000)
    .assert.urlContains("vouchercodes");
  myConsole.log('Check: url contains vouchercodes text');
});

Then(/^the title is "([^"]*)"$/, title => {
  browser.assert.titleEquals(title)
  myConsole.log('Check: actual title matches expected');
});

Then('I click on Categories', () => {
  browser.click(categories)
  myConsole.log('user clicks on categories');
});

Then(/^I click on Restaurants and the page title is "([^"]*)"$/, restaurantsTitle => {
  browser.click(restaurants)
    .assert.titleEquals(restaurantsTitle)
    .pause(2000)
  myConsole.log('user clicks on Restaurants')
  myConsole.log('Check: Restaurants page title matches expected')
});

When(/^I search "([^"]*)" in the search box with Any date and Any people$/, location => {
  browser.sendKeys('input[id=google-autocomplete]', [location, browser.Keys.DOWN])
    .pause(2000)
    .sendKeys('input[id=google-autocomplete]', browser.Keys.DOWN)
    .sendKeys('input[id=google-autocomplete]', browser.Keys.ENTER)
    .pause(2000)
    .click(findButtonRestaurants)
    .pause(2000)
  myConsole.log('user selects location, date, number of people and clicks search button')
});

When(/^I search "([^"]*)" in the search box and select "([^"]*)" and "([^"]*)"$/, (location, day, people) => {
  browser.sendKeys('input[id=google-autocomplete]', [location, browser.Keys.DOWN])
    .pause(2000)
    .sendKeys('input[id=google-autocomplete]', browser.Keys.DOWN)
    .sendKeys('input[id=google-autocomplete]', browser.Keys.ENTER)
    .pause(2000)
    .useXpath().useXpath().setValue("//select[@id='day-select']", day)
    .useXpath().setValue("//select[@id='people-select']", people)
    .useCss().waitForElementPresent(findButtonRestaurants, 5000)
    .useCss().click(findButtonRestaurants)
  myConsole.log('user selects location, date, number of people and clicks search button')
});

Then(/^the search results should display at least one local restaurant offer$/, () => {
  //Assert that the page displays the first result for local restaurant offers (for Div 1 parent element of article. Div 2 parent is for inspirational offers)
  browser
    .useXpath()
    .isPresent({
      suppressNotFoundErrors: true,
      selector: firstLocalOffer
    },
      function (isPresent) {
        if (isPresent.value) {
          console.log("present")
          myConsole.log("Check: local restaurant offers are displayed - Div 1 parent element of article present")

        } else {
          myConsole.log("Check: local restaurant offers are not displayed - Div 1 parent element of article not present")
          browser.useXpath().assert.visible(firstLocalOffer);
        }
      })
});
