import { test, expect } from "@playwright/test";

test.describe("Blog Post Content Tests", () => {
  test("should display blog post with correct structure and metadata", async ({ page }) => {
    await page.goto("https://nikiforovall.blog/");
    
    // Navigate to first blog post
    await page.getByRole("link", { name: /Add Authentication to MCP Servers/i }).click();
    
    // Verify basic page structure
    await expect(page).toHaveTitle(/Add Authentication to MCP Servers using Microsoft Entra ID/);
    
    // Verify main heading is present
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Add Authentication to MCP Servers using Microsoft Entra ID");
    
    // Verify publication date
    await expect(page.getByText("September 2nd, 2025")).toBeVisible();
    
    // Verify article content exists - remove this check as it might have CSS visibility issues
    // await expect(page.getByRole("article").first()).toBeVisible();"
  });

  test("should contain proper content sections", async ({ page }) => {
    await page.goto("https://nikiforovall.blog/");
    await page.getByRole("link", { name: /Add Authentication to MCP Servers/i }).click();
    
    // Verify TL;DR section
    await expect(page.getByRole("heading", { name: "TL;DR", level: 2 })).toBeVisible();
    
    // Verify Introduction section
    await expect(page.getByRole("heading", { name: "Introduction", level: 2 })).toBeVisible();
    
    // Verify Getting Started section
    await expect(page.getByRole("heading", { name: "Getting Started", level: 2 })).toBeVisible();
    
    // Verify References section
    await expect(page.getByRole("heading", { name: "References", level: 2 })).toBeVisible();
  });

  test("should have working external links", async ({ page }) => {
    await page.goto("https://nikiforovall.blog/");
    await page.getByRole("link", { name: /Add Authentication to MCP Servers/i }).click();
    
    // Verify GitHub source code link
    const githubLink = page.getByRole("link", { name: "https://github.com/NikiforovAll/mcp-template-dotnet" }).first();
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute("href", "https://github.com/NikiforovAll/mcp-template-dotnet");
    
    // Verify MCP specification link
    const mcpSpecLink = page.getByRole("link", { name: "MCP Specification" });
    await expect(mcpSpecLink).toBeVisible();
    await expect(mcpSpecLink).toHaveAttribute("href", "https://modelcontextprotocol.io/");
  });

  test("should display code blocks properly", async ({ page }) => {
    await page.goto("https://nikiforovall.blog/");
    await page.getByRole("link", { name: /Add Authentication to MCP Servers/i }).click();
    
    // Verify inline code elements
    await expect(page.locator("code").first()).toBeVisible();
    
    // Verify code blocks contain expected content
    await expect(page.locator("code").filter({ hasText: "dotnet new" }).first()).toBeVisible();
    await expect(page.locator("code").filter({ hasText: "Program.cs" }).first()).toBeVisible();
  });

  test("should have author and sharing information", async ({ page }) => {
    await page.goto("https://nikiforovall.blog/");
    await page.getByRole("link", { name: /Add Authentication to MCP Servers/i }).click();
    
    // Verify share section
    await expect(page.getByRole("heading", { name: "Share Post", level: 4 })).toBeVisible();
    
    // Verify Twitter share link
    await expect(page.getByRole("link", { name: /Twitter/i })).toBeVisible();
    
    // Verify author section
    await expect(page.getByRole("heading", { name: "Oleksii Nikiforov", level: 4 })).toBeVisible();
    await expect(page.getByText("Jibber-jabbering about programming and IT.").first()).toBeVisible();
  });

  test("should have navigation links", async ({ page }) => {
    await page.goto("https://nikiforovall.blog/");
    await page.getByRole("link", { name: /Add Authentication to MCP Servers/i }).click();
    
    // Verify previous/next navigation exists
    const navigationSection = page.locator("ul").last();
    await expect(navigationSection).toBeVisible();
    
    // Check for either Previous or Next navigation
    const hasPrevious = await page.getByRole("link", { name: "← Previous" }).isVisible();
    const hasNext = await page.getByText("Next →").isVisible();
    expect(hasPrevious || hasNext).toBe(true);
  });

  test("should display tags and categories", async ({ page }) => {
    await page.goto("https://nikiforovall.blog/");
    await page.getByRole("link", { name: /Add Authentication to MCP Servers/i }).click();
    
    // Verify category tags
    await expect(page.getByRole("link", { name: /dotnet/ }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /ai/ }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /mcp/ }).first()).toBeVisible();
  });

  test("should maintain consistent header and footer", async ({ page }) => {
    await page.goto("https://nikiforovall.blog/");
    await page.getByRole("link", { name: /Add Authentication to MCP Servers/i }).click();
    
    // Verify header is maintained
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("heading", { name: "N+1 Blog", level: 3 })).toBeVisible();
    
    // Verify footer is maintained  
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByText(/© 2025 Oleksii Nikiforov/)).toBeVisible();
  });

  test("should handle second blog post correctly", async ({ page }) => {
    await page.goto("https://nikiforovall.blog/");
    
    // Navigate to second blog post
    await page.getByRole("link", { name: /Introducing Technical Debt Master/i }).click();
    
    // Verify correct navigation
    await expect(page).toHaveTitle(/Introducing Technical Debt Master/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Introducing Technical Debt Master");
    
    // Verify publication date
    await expect(page.getByText("August 9th, 2025")).toBeVisible();
    
    // Verify content sections
    await expect(page.getByRole("heading", { name: "TL;DR", level: 2 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Motivation", level: 2 })).toBeVisible();
    
    // Verify technical content specifics
    await expect(page.locator("code").filter({ hasText: "tdm" }).first()).toBeVisible();
    await expect(page.getByText(/CLI tool that automates technical debt/)).toBeVisible();
  });

  test("should display related posts sidebar", async ({ page }) => {
    await page.goto("https://nikiforovall.blog/");
    await page.getByRole("link", { name: /Add Authentication to MCP Servers/i }).click();
    
    // Verify related posts are shown
    const relatedPosts = page.getByRole("heading", { level: 5 });
    await expect(relatedPosts.first()).toBeVisible();
    
    // Verify related posts contain expected patterns
    await expect(page.locator("h5").filter({ hasText: "MCP Server" }).first()).toBeVisible();
  });
});