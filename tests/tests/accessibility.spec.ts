import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Login page should have no accessibility violations", async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("Login page should have no critical violations", async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["critical", "serious"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("Login form should be keyboard navigable", async ({ page }) => {
    await page.getByTestId("username").click();
    await expect(page.getByTestId("username")).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByTestId("password")).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByTestId("login-button")).toBeFocused();
  });

  test("Error messages should be visible after failed login", async ({ page }) => {
    await page.getByTestId("login-button").click();
    await expect(page.getByTestId("error")).toBeVisible();
    await expect(page.getByTestId("error")).toContainText(
      "Username is required"
    );
  });

  test("Page should have proper heading hierarchy", async ({ page }) => {
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBeLessThanOrEqual(1);
  });

  test("Page should have lang attribute", async ({ page }) => {
    const html = page.locator("html");
    await expect(html).toHaveAttribute("lang", /.+/);
  });

  test("Login inputs should have accessible names", async ({ page }) => {
    await expect(page.getByTestId("username")).toHaveAttribute(
      "placeholder",
      /.+/
    );
    await expect(page.getByTestId("password")).toHaveAttribute(
      "placeholder",
      /.+/
    );
  });
});
