import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Login page should have no accessibility violations", async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include("[data-test='login-button']")
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("Login page should have no critical violations", async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["critical", "serious"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("Login form should be keyboard navigable", async ({ page }) => {
    await page.getByTestId("username").focus();
    await expect(page.getByTestId("username")).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByTestId("password")).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByTestId("login-button")).toBeFocused();
  });

  test("Error messages should have proper ARIA attributes", async ({ page }) => {
    await page.getByTestId("login-button").click();
    await expect(page.getByTestId("error")).toBeVisible();
    await expect(page.getByTestId("error")).toHaveAttribute("aria-hidden", "false");
  });

  test("All images should have alt text", async ({ page }) => {
    const images = await page.locator("img").all();
    for (const img of images) {
      await expect(img).toHaveAttribute("alt", /.+/);
    }
  });

  test("Form inputs should have labels", async ({ page }) => {
    const inputs = await page.locator("input").all();
    for (const input of inputs) {
      const id = await input.getAttribute("id");
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        await expect(label).toBeAttached();
      }
    }
  });

  test("Page should have proper heading hierarchy", async ({ page }) => {
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBeLessThanOrEqual(1);
  });

  test("Page should have lang attribute", async ({ page }) => {
    const html = page.locator("html");
    await expect(html).toHaveAttribute("lang", /.+/);
  });
});
