import { test, expect } from "@playwright/test";

test.describe("Blog Navigation Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should navigate to blog post from homepage", async ({ page }) => {
    // Click on the first blog post title
    await page
      .getByRole("link").first()
      .click();

    // Verify blog post content is loaded
    await expect(page.getByRole("heading", { level: 1 })).not.toBeEmpty();
  });

  test("should navigate back to homepage via blog title", async ({ page }) => {
    // Navigate to a blog post first
    await page
      .getByRole("link", { name: /Add Authentication to MCP Servers/i })
      .click();

    // Click on the blog title to go back to homepage
    await page.getByRole("link", { name: "N+1 Blog" }).click();

    // Verify back on homepage
    await expect(page).toHaveURL("https://nikiforovall.blog/");
    await expect(page).toHaveTitle("nikiforovall.blog");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "nikiforovall.blog"
    );
  });

  test("should navigate through pagination", async ({ page }) => {
    // Click "Older →" to go to page 2
    await page.getByRole("link", { name: "Older →" }).click();

    // Verify on page 2
    await expect(page).toHaveURL(/.*\/page2\//);
    await expect(page.getByText("Page: 2 of")).toBeVisible();

    // Click "← Newer" to go back to page 1
    await page.getByRole("link", { name: "← Newer" }).click();

    // Verify back on page 1
    await expect(page).toHaveURL("https://nikiforovall.blog/");
    await expect(page.getByText("Page: 1 of")).toBeVisible();
  });

  test("should open GitHub profile in new tab", async ({ context, page }) => {
    // Click GitHub link (assuming it opens in new tab)
    await page
      .locator('a[href="https://github.com/nikiforovAll"]')
      .click();
    // Verify GitHub profile page
    await expect(page).toHaveURL("https://github.com/nikiforovAll");
    await expect(page).toHaveTitle(/NikiforovAll.*GitHub/);
    await page.goBack();
    await expect(page).toHaveURL("https://nikiforovall.blog/");
  });
});
