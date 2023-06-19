import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "LOGIN" }).click();
  await page.getByLabel("Email address").click();
  await page.getByLabel("Email address").fill("s.petkov@mail.bg");
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill("ASdSDA12321!");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page).toHaveURL(/.*home/);
});

test("post", async ({ page }) => {
  await page.getByPlaceholder("What's on your mind, s.petkov?").click();
  await page
    .getByPlaceholder("What's on your mind, s.petkov?")
    .fill("Hey, this is a test!");
  await page.getByRole("button", { name: "Post" }).click();
});

test("profile", async ({ page }) => {
  await page.getByRole("link", { name: "Profile" }).click();
  await expect(page).toHaveURL(/.*profile/);
});

test("like", async ({ page }) => {
  await page
    .locator("div:nth-child(4) > .mantine-UnstyledButton-root")
    .first()
    .click();
  await page
    .locator(
      "div:nth-child(3) > div > div:nth-child(2) > div:nth-child(4) > .mantine-UnstyledButton-root"
    )
    .click();
  await page
    .locator(
      "div:nth-child(4) > div > div:nth-child(2) > div:nth-child(4) > .mantine-UnstyledButton-root"
    )
    .click();
});
