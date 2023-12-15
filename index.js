import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://guarapuava.pr.gov.br/servicos/obituario/');

  // Function executed in the browser
  const data = await page.evaluate(() => {
    const content = document.querySelector('.page-box .container .conteudo')
    const contentFormated = new XMLSerializer().serializeToString(content)
    
    return contentFormated
  })

  // Create JSON file
  fs.writeFile('data.json', JSON.stringify(data, null, 1), err => {
    if (err) throw new Error('Something went wrong')
    console.log('done');
  })

  await browser.close();
})();