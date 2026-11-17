// Run with the Playwright browser tool after navigating to /jvm or /en/jvm.
async (page) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const results = [];
  for (const width of [1480, 1848, 2560, 1024, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    const article = page.locator("article").filter({ hasText: "~/projects/moscollector" }).first();
    await article.locator("button").focus();
    await article.locator("figure").first().waitFor();
    await page.waitForFunction(() => document.documentElement.scrollWidth <= innerWidth, null, { timeout: 5000 });
    const card = await article.locator(".selection-card").boundingBox();
    const screenshots = await article.locator("figure").filter({ has: page.locator("img") }).evaluateAll(
      (nodes) => nodes.map((node) => node.getBoundingClientRect().toJSON()),
    );
    const left = screenshots.filter((box) => box.right <= card.x).length;
    const right = screenshots.filter((box) => box.left >= card.x + card.width).length;
    if (width >= 1480 && (left !== 3 || right !== 3)) {
      throw new Error(`Expected three screenshots on each side at ${width}px; got ${left}/${right}`);
    }
    if (width < 1480 && screenshots.some((box) => box.top < card.y + card.height - 1)) {
      throw new Error(`Compact media overlaps the card at ${width}px`);
    }
    if (await article.locator("figure").count() !== 7) throw new Error("Media was lost");
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) {
      throw new Error(`Horizontal overflow at ${width}px`);
    }
    if (await article.evaluate((node) => node.nextElementSibling.getBoundingClientRect().top < node.getBoundingClientRect().bottom - 1)) {
      throw new Error(`Media overlaps the next project at ${width}px`);
    }
    results.push({ width, left, right });
  }
  // Material visibility must remain controllable with a keyboard on touch layouts.
  const article = page.locator("article").filter({ hasText: "~/projects/moscollector" }).first();
  const button = article.locator("button");
  await button.press("Enter");
  await page.locator("#projects-heading").click();
  if (await article.locator("figure").count() !== 7) throw new Error("Pinned materials disappeared");
  await button.press("Enter");
  await page.locator("#projects-heading").click();
  if (await article.locator("figure").count() !== 0) throw new Error("Materials did not close");
  return results;
}
