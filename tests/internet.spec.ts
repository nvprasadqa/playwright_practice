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

test('handle date picker', async ({page}) => {

  await page.goto("https://the-internet.herokuapp.com/date_pickers");
  await page.locator("#date").fill("2027-04-15");
  await page.locator('#time').fill('22:33');
  await page.waitForTimeout(2000);
  const appointment = page.locator('#widget-date');
  await appointment.scrollIntoViewIfNeeded();
  await page.locator('#open-calendar').click();
  const targetMonth = 'July 2028';
  const targetDate = 20;

  const currentMonthYear = page.locator('#calendar-month');
  const nextButton = page.locator('#next-month');
  const dateSelection = page.locator('//button[text()='+targetDate+']');

  while(true) {

    const  valueMonthYear = await currentMonthYear.innerText();
    if(valueMonthYear===targetMonth){
      await dateSelection.click();
      break;

    }

    else {
      await nextButton.click();

    }
  }

  await page.waitForTimeout(5000);

}
);

test('mouse hover operations', async({page}) =>{
  await page.goto('https://the-internet.herokuapp.com/hovers');

  await page.locator("//img[@alt='User Avatar']").first().hover();
  await page.getByRole('link', {name:'View profile'}).click();
  await page.waitForTimeout(3000);





});



test('verify wait timeouts', async ({page}) =>{

 
  await page.goto('https://the-internet.herokuapp.com/windows');
  await page.getByRole('link', {name:'sdfsd'}).click({timeout: 2000});
  
});

test('Handle Alert', async ({ page }) => {

  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async dialog => {

        console.log(dialog.message());

        await dialog.accept();

    });
    await page.getByRole('button', {
        name: 'Click for JS Alert'
    }).click();

        await page.getByRole('button', {
        name: 'Click for JS Confirm'
    }).click();

    await page.getByRole('button', {
        name: 'Click for JS Prompt'
    }).click();

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


test('playwright file upload', async ({ page }) => {
  await page.getByText("File Upload").click();
  const fileUplaod =await page.locator("input[id='file-upload']");
  await fileUplaod.setInputFiles("C:/Users/nvpra/Downloads/Playwright_TypeScript_Learning_Roadmap.pdf");
await page.locator("input[id='file-submit']").click();
const fileMessage = await page.locator("//h3[text()='File Uploaded!']");
await expect(fileMessage).toBeVisible();


});

test("validate all the links and count ", async ({page})=>{
  const pageLinks = page.locator("//div[@id='content']//ul//a");
  const linksCount = await pageLinks.count();
  await expect(linksCount).toBe(76);
  console.log(await pageLinks.first().innerText())
  console.log(await pageLinks.last().textContent())
  console.log(await pageLinks.nth(5).textContent())

  // for(let linkText of await pageLinks.all()){

  //   console.log(await linkText.textContent())



  // }


  // for(let i =0;i<linksCount;i++){

  //   console.log(await pageLinks.nth(i).textContent());


  // }

});

test("handles keyboard and mouse operations", async ({page})=>{
  await page.goto('https://the-internet.herokuapp.com/key_presses');
  const input = await page.locator('#target');
  await input.click();
  await page.keyboard.type('e');
  await page.keyboard.press('Tab');
   await page.keyboard.press('Enter');
  
});



test('test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.getByRole('link', { name: 'Dropdown', exact: true }).click();
  await page.getByText('Dropdown List Please select').click();
  await page.locator('#dropdown').selectOption('2');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Elemental Selenium' }).click();
  const page1 = await page1Promise;
});




