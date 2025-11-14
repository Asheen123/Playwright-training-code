import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
 // await page.getByText('Punched In', { exact: true }).click();
 await page.getByRole('heading', { name: 'Dashboard' }).click();
 //await page.screenshot({ path: 'dashboard.png' });
  //await page.getByRole('listitem').filter({ hasText: 'TLePXLN naELtXs' }).locator('i').click();
  await page.locator("//i[@class = 'oxd-icon bi-caret-down-fill oxd-userdropdown-icon']").click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

