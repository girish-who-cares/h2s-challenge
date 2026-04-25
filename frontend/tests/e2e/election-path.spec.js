import { test, expect } from '@playwright/test';

test.describe('ElectionPath E2E Flow with Checkboxes', () => {
  test('User must complete checkboxes sequentially to progress', async ({ page }) => {
    // Navigate to local website
    await page.goto('/');

    // Verify Onboarding Screen
    await expect(page.locator('h1').first()).toContainText('Your simple guide to voting.');

    // Make selections
    await page.click('button:has-text("A few weeks away")');
    await page.selectOption('select', 'CA');

    // Click "Show My Election Path"
    await page.click('button:has-text("Show My Election Path")');

    // Verify Timeline Screen loads and Step 1 is expanded
    await expect(page.locator('h1').first()).toContainText('Your Election Journey');
    
    // Select all step cards (group flex)
    const steps = page.locator('.group.flex.gap-md');
    
    // Verify Step 2 is locked (has "lock" icon or is grayscale)
    const step2 = steps.nth(1);
    await expect(step2.locator('.material-symbols-outlined').first()).toContainText('lock');
    
    // Assert primary button is disabled because todos aren't checked
    const primaryBtn = steps.first().locator('button:has-text("Checklist")');
    await expect(primaryBtn).toBeDisabled();
    
    // Check off all todos in step 1
    const checkboxes = steps.first().locator('input[type="checkbox"]');
    const count = await checkboxes.count();
    for (let i = 0; i < count; i++) {
       await checkboxes.nth(i).click();
    }
    
    // Primary button should now be enabled and say "Mark as Done"
    const markDoneBtn = steps.first().locator('button:has-text("Mark as Done")');
    await expect(markDoneBtn).toBeEnabled();
    
    // Click it to complete Step 1
    await markDoneBtn.click();
    
    // Verify step 2 is no longer locked and auto-expanded (icon changes)
    await expect(step2.locator('.material-symbols-outlined').first()).not.toContainText('lock');
    await expect(step2.locator('.material-symbols-outlined').first()).toContainText('edit_calendar');

    // Verify progress text changed
    await expect(page.locator('text=1 of 6 steps completed')).toBeVisible();
  });
});
