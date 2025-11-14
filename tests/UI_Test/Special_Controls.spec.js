//import { test, expect } from require('@playwright/test');
import { test, expect } from '@playwright/test';

test('Right Click', async ({ page }) => {
    //Visit the OrnageHRM Website
    await page.goto("http://swisnl.github.io/jQuery-contextMenu/demo.html");
    
   // Right Click on Button
    //await page.pause()
    //await page.dblclick("//span[text()='right click me']");
    //await page.click("//span[text()='right click me']",{ button: 'right'});
     await page.locator("//span[text()='right click me']").click({ button: 'right' });
    await page.waitForTimeout(5000)
    await page.locator('.context-menu-list.context-menu-root').click()
    //await page.click('.context-menu-icon-edit > span')
    await page.waitForTimeout(5000)
});


test('Scroll To Particular Element Example @sanity', async ({ page }) => {
 
  test.setTimeout(800000)
  await page.goto('https://stackoverflow.com/');
  //await page.pause()
  const element = page.locator("//a[text()='Press']")
  await element.scrollIntoViewIfNeeded();
  await element.click()
  await page.waitForTimeout(5000)
});

test('Dynamic Load Element- Wait for Selector', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/dynamic-loading/2');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.waitForSelector("//h4[normalize-space()='Hello World!']");
    await expect(page.locator("//h4[normalize-space()='Hello World!']")).toHaveText("Hello World!")
  });

  test('Dynamic Load Element- Wait for Load State with specific time', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/slow');
    await page.waitForTimeout(10000) // Forceful time 
    await expect(page.locator("//strong[normalize-space()='The slow task has finished. Thanks for waiting!']")).toHaveText("The slow task has finished. Thanks for waiting!")
  });

test.only('File Upload', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/upload')
        await page.waitForLoadState()
        //Loading Image file
        const filepath = 'tests/Test_Data/Sample1.txt'
        //console.log(filepath)
        await page.locator('#file-upload').setInputFiles(filepath)
        await page.locator('#file-submit').click()
        //await page.locator('#file-submit').click({timeout:5000})
        await page.waitForSelector("//h3[normalize-space()='File Uploaded!']")
        //await page.waitForTimeout(5000)
        await expect(page.locator('#uploaded-files')).toContainText('Sample1.txt')
        //await page.routeFromHAR
    })

