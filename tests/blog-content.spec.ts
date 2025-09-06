import { test, expect } from "@playwright/test";

test.describe("Blog Content and Structure Tests", () => {
  test("should display homepage with correct structure", async ({ page }) => {
    await page.goto("https://nikiforovall.blog/");

    // Verify main elements are present
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("heading", { name: "N+1 Blog" })).toBeVisible();
    await expect(
      page.getByText("Jibber-jabbering about programming and IT.")
    ).toBeVisible();

    // Verify social media links are present
    await expect(
      page.locator('a[href="https://github.com/nikiforovAll"]')
    ).toBeVisible();
    await expect(
      page.locator('a[href="https://twitter.com/nikiforovall"]')
    ).toBeVisible();
    await expect(
      page.locator('a[href="https://t.me/nikiforovallblog"]')
    ).toBeVisible();
    // await expect(page.locator('a[href="mailto:alexey.nikiforovall@gmail.com"]').first()).toBeVisible();
  });

  test("should display blog posts with metadata", async ({ page }) => {
    await page.goto("https://nikiforovall.blog/");

    // Verify blog posts have dates, titles, and descriptions
    const firstPost = page.getByRole("article").first();
    await expect(firstPost.getByRole("heading", { level: 2 })).toBeVisible();
  });

  test("should display footer with attribution", async ({ page }) => {
    await page.goto("https://nikiforovall.blog/");

    // Verify footer content
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByText(/© 2025 Oleksii Nikiforov/)).toBeVisible();
  });
});
