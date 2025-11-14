const { test, expect } = require('@playwright/test');
const testData = require('./TestData/credentials.json');
test.describe('WebOrder Login Tests', () => {
let page;
test.beforeEach(async ({ browser }) => {
const context = await browser.newContext();
page = await context.newPage();
await page.setViewportSize({ width: 1920, height: 1080 });
});
test('Positive - Valid Login and Logout', async () => {
await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
await page.locator('#ctl00_MainContent_username').fill(testData.positive.username);
await page.locator('#ctl00_MainContent_password').fill(testData.positive.password);
await page.locator('#ctl00_MainContent_login_button').click();
await page.waitForLoadState('networkidle');
await expect(page.getByRole('link', { name: testData.positive.expectedResult })).toBeVisible();
await page.getByRole('link', { name: testData.positive.expectedResult }).click();
});
testData.negative.forEach(scenario => {
test(`Negative - ${scenario.testName}`, async () => {
await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
await page.locator('#ctl00_MainContent_username').fill(scenario.username);
await page.locator('#ctl00_MainContent_password').fill(scenario.password);
await page.locator('#ctl00_MainContent_login_button').click();
await page.waitForLoadState('networkidle');
await expect(page.locator('text=' + scenario.expectedError)).toBeVisible();
});
});
test.afterEach(async ({ browser }) => {
});
});
