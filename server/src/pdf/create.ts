import puppeteer from 'puppeteer';

export default async (template: string) => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.setContent(template);
  await page.emulateMedia('screen');
  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();

  return pdf;
};
