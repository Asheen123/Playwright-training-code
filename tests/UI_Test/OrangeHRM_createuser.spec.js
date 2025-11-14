import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await page.getByRole('button', { name: ' Add' }).click();
  await page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first().click();
  await page.getByRole('option', { name: 'Admin' }).click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).fill('Remas');
  await page.getByText('Remas  Abdullah').click();
  await page.locator('div:nth-child(3) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click();
  await page.getByRole('option', { name: 'Enabled' }).click();
  await page.getByRole('textbox').nth(2).click();
  const ExpUserName = 'Asheen' + Math.random() * 1000000;
  await page.getByRole('textbox').nth(2).fill(ExpUserName);
  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill('asheen@1990');
  await page.getByRole('textbox').nth(4).click();
  await page.getByRole('textbox').nth(4).fill('asheen@1990');
  await page.getByRole('button', { name: 'Save' }).click();
  //await expect(page.locator("//td[text()='Dixit1']")).toHaveText('Dixit1')
  //await (page.getByText(ExpUserName)).tohaveText(ExpUserName);
  await page.waitForSelector(".orangehrm-container");
  await expect(page.locator("//div[normalize-space()='"+ExpUserName+"']")).toHaveText(ExpUserName);
  //await expect(page.locator("//div[text()='"+ExpUserName+"']")).toHaveText(ExpUserName);
  //await page.getByRole('listitem').filter({ hasText: 'manda user' }).locator('i').click();
    await page.locator("//i[@class = 'oxd-icon bi-caret-down-fill oxd-userdropdown-icon']").click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
});