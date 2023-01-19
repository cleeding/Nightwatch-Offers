# Nightwatch-Offers

Basic Nightwatch + Cucumber BDD demo.

## Installation
1. Clone the project repo to local machine
2. Install project dependencies - whilst in the project directory in terminal, enter the following command:

```bash
$ npm install
```

## Test Execution

```bash
$ npm run e2e-test
```

## Test Evidence
The project collects test evidence in the forms of logging, screenshots, and reporting.

For test logs, once test execution has completed, a log file named output.txt will be generated and saved in the project directory.
Screenshots will be found in the tests_output/screenshots folder. The screenshots functionality can be switched on/off via the nightwatch.conf.js file:

```bash
  test_settings: {
    default: {
      screenshots: {
        enabled: true,
        path: SCREENSHOT_PATH,
        on_failure: true,
        on_error: true
      },
```
HMTL style reporting can be found in tests_output/nightwatch-html-report/index.html
