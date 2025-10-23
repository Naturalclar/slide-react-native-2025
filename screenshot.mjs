import playwright from "playwright";

(async () => {
  const browser = await playwright["chromium"].launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:5173");
  await page.emulateMedia({ colorScheme: "dark" });
  // wait 3 seconds
  await page.waitForTimeout(2000);

  await page.screenshot({ path: "card.png" });

  await browser.close();
})();
