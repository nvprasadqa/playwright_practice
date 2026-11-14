import { test, expect } from '@playwright/test';

test.beforeEach('open browser', async ({page})=>{

 await page.goto("https://the-internet.herokuapp.com/");

});

test('The Internet website title validation',async({page})=> {
  //await page.goto("https://the-internet.herokuapp.com/");
  await expect(page).toHaveTitle('The Internet');
  await page.getByRole('link', {name:"A/B Testing"}).click();
  await expect(page.getByText("A/B Test Variation 1")).toBeVisible();
//  const abLocator = page.getByText("A/B Test Variation 1");
//  await expect(abLocator).toBeVisible();

}
);

test('Large form validation', async({page})=>{

  //await page.goto("https://the-internet.herokuapp.com/");
   await page.locator("//a[text()='Large Form']").click();
 await page.getByLabel("First name").fill("test_first_name");
 await page.getByRole('textbox', {name:'Last name'}).fill("test_last_name");
const countryDropDown =  page.locator("select[id='country']");
await countryDropDown.scrollIntoViewIfNeeded();
await countryDropDown.selectOption("India");

await page.locator("input[value='phone']").click();
await page.locator("input[value='automation']").check();
// const slider = page.locator('#experience');
// let value:number = 30;

// // set value via Js and trigger input +change events - app listens to these 
// await slider.evaluate((el: HTMLInputElement, val)=>{
//   value = val;
//   el.dispatchEvent(new Event('input', {bubbles: true}));
//   el.dispatchEvent(new Event('change', {bubbles: true}));}, value);

  await page.waitForTimeout(3000);
  await page.getByRole('button', {name:'Submit'}).click();
});

test('keyboard&Mouse Operations', async ({page}) =>{

    //await page.goto("https://the-internet.herokuapp.com/");

    // mousehover operation
    //await page.getByRole('link', {name:"Dropdown", exact: true}).hover();
    await page.getByText("Dropdown").last().hover();
  await page.getByText("Drag and Drop").click();
  const  source = page.locator("#column-a");
  const traget  = page.locator("#column-b");
  await source.dragTo(traget);

});

test('validate windows', async ({page})=>{
  await page.getByText("Multiple Windows").click();
  const [newPage] = await Promise.all([page.context().waitForEvent('page'), 
  await page.getByRole('link', {name: "Click Here"}).click()]);
  console.log(await newPage.title())
  await newPage.close();
  // Return to parent window
  await page.bringToFront();
  console.log(await page.title());

});

test('farmes validation', async ({page}) =>{

  await page.getByRole("link",{name: "Frames", exact: true}).click();
  await page.getByRole('link', {name: "iFrame"}).click();
  //await page.locator("//span[text()='File']").click();
  await page.frameLocator("//iframe[@title='Rich Text Area']").locator("//body[@id='tinymce']").fill("this is iframe text");
    await page.locator("//span[text()='File']").click();

  





});





// test('playwright application has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
