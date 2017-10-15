// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'Test form workflow': (browser) => {
    const server = browser.globals.devServerURL

    browser
      .url(server)
      .waitForElementVisible('#App', 5000)
      .waitForElementVisible('.AppForm', 5000)
      .setValue('#AppForm__CountryCode', '+61')
      .setValue('#AppForm__PhoneNumber', '412345678')
      .setValue('#AppForm__Dir', 'GT')
      .setValue('#AppForm__Price', 5000)
      .click('.AppForm button[type=submit]')
      .pause(5000)
      .assert.elementPresent('.Submitted')
      .assert.elementNotPresent('.AppForm')
      .end()
  }
}
