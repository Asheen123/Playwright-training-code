import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage.js';
import { HomePage } from '../../page-objects/HomePage.js';

let users = [];

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new LoginPage(page);

  users = await loginPage.readDataFromJSONFile(
    './tests/ZeroBank_Test_PageObject/TestData/login_tcs.json'
  );

  await context.close();
});

test.describe('Login / Logout Flow @smoke', () => {
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await homePage.visit();
  });

  test('Execute all login scenarios from JSON', async ({ page }) => {
    for (const user of users) {
      test.info().annotations.push({ type: 'case', description: user.TestCaseID });

      await homePage.clickOnSignIn();
      await loginPage.login(user.login, user.password);
      await page.waitForLoadState("networkidle");
      if (user.login === 'username' && user.password === 'password') {
 // ✅ Expect redirect after successful login
          // Bypass SSL issue or go directly to transfer page
        await page.goto("http://zero.webappsecurity.com");
        await page.waitForLoadState("networkidle");
        await homePage.logout();
        await page.waitForLoadState("networkidle");
        await homePage.VerifyURL('http://zero.webappsecurity.com/index.html');
        //await homePage.clickOnSignIn();
      } else {
        await loginPage.assertErrorMessage();
        await page.goto("http://zero.webappsecurity.com");
      }
      //await homePage.clickOnSignIn();
    }
    
  });
});
