// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'Test form workflow': (browser) => {
    const server = browser.globals.devServerURL

    browser
      .url(server)
      .waitForElementPresent('#App', 5000)
      .waitForElementPresent('form', 5000)
      .setValue('#AppForm__CountryCode', '+61')
      .setValue('#AppForm__PhoneNumber', '412345678')
      .setValue('#AppForm__Dir', 'GT')
      .setValue('#AppForm__Price', 5000)
      .click('form button[type=submit]')
      .waitForElementNotPresent('form', 5000)
      .waitForElementPresent('button', 5000)
      .click('button')
      .waitForElementPresent('form', 5000)
      .end()
  }
}
