import { test, expect } from '@playwright/test';

test.only('test iframe concept', async ({ page }) => {
  await page.goto('https://netbanking.hdfcbank.com/netbanking/');
  await page.waitForLoadState('networkidle')
 //await page.frame({name: 'login_page'}).click('input[name="fldLoginUserId"]');
  await page.frame({name: 'login_page'}).fill('input[name="fldLoginUserId"]', '1000');
  await page.frame({name: 'login_page'}).click('text=CONTINUE');
  await page.waitForLoadState('networkidle');
  //await page.click('input[name="fldLoginUserId"]');
  // await page.locator("//input[@name='fldLoginUserId']").fill('1000');
  // //await page.fill("//input[@name='fldLoginUserId']", '1000');
  // //await page.locator("text=CONTINUE").click();
  //  await page.click('text=CONTINUE');
  await expect(page).toHaveURL('https://netportal.hdfcbank.com/nb-login/login.jsp');
  await page.waitForTimeout(5000) // Thread.sleep(5000)

});


test('test to check Frame', async ({ page }) => {
  await page.goto('https://netbanking.hdfcbank.com/netbanking/');
  await page.locator('frame[name="login_page"]').contentFrame().getByRole('textbox').fill('1000');
  await page.locator('frame[name="login_page"]').contentFrame().getByRole('link', { name: 'CONTINUE' }).click();
  await expect(page.locator('#main')).toContainText('Password/IPIN');
});