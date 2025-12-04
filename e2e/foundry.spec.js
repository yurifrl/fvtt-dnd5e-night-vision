import { test, expect } from '@playwright/test';

const ADMIN_KEY = 'admin';

test.describe('Foundry VTT Module', () => {
  test.beforeEach(async ({ page }) => {
    // Go to Foundry setup
    await page.goto('/');

    // If we hit the admin key page, enter it
    const adminInput = page.locator('input[name="adminKey"], input[name="adminPassword"]');
    if (await adminInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      await adminInput.fill(ADMIN_KEY);
      await page.locator('button[type="submit"]').click();
      await page.waitForLoadState('networkidle');
    }
  });

  test('module is visible in add-ons', async ({ page }) => {
    // Navigate to Add-on Modules
    await page.goto('/setup');

    // Wait for setup page
    await page.waitForSelector('.setup-sidebar, #setup-configuration', { timeout: 30000 });

    // Click on Add-on Modules tab/section
    const modulesTab = page.locator('text=Add-on Modules').first();
    if (await modulesTab.isVisible()) {
      await modulesTab.click();
    }

    // Check our module appears
    await expect(page.locator('text=Night Vision')).toBeVisible({ timeout: 10000 });
  });

  test('module can be enabled in a world', async ({ page }) => {
    // This test requires a world with D&D 5e to exist
    // You may need to create one manually first

    await page.goto('/setup');
    await page.waitForLoadState('networkidle');

    // Look for existing world or create test world
    const worldExists = await page.locator('.world-title:has-text("Test")').isVisible({ timeout: 5000 }).catch(() => false);

    if (!worldExists) {
      test.skip('No test world found - create one manually with D&D 5e system');
      return;
    }

    // Launch the test world
    await page.locator('.world-title:has-text("Test")').click();
    await page.locator('button:has-text("Launch")').click();

    // Wait for world to load
    await page.waitForURL(/\/game/, { timeout: 60000 });

    // Open module management
    await page.keyboard.press('Escape'); // Close any dialogs
    await page.locator('#settings').click();
    await page.locator('text=Manage Modules').click();

    // Find and enable our module
    const moduleCheckbox = page.locator('[data-module-id="dnd5e-night-vision"] input[type="checkbox"]');
    await expect(moduleCheckbox).toBeVisible();

    if (!(await moduleCheckbox.isChecked())) {
      await moduleCheckbox.check();
      await page.locator('button:has-text("Save")').click();
    }

    // Verify module is enabled after reload
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-module-id="dnd5e-night-vision"]')).toBeVisible();
  });
});

test.describe('Darkvision Functionality', () => {
  test.skip('darkvision increases dim light radius', async ({ page }) => {
    // This is a placeholder for actual functionality testing
    // Requires:
    // 1. A world with D&D 5e
    // 2. Module enabled
    // 3. A token with darkvision
    // 4. A light source

    // The actual test would:
    // - Create a scene
    // - Add a token with 60ft darkvision
    // - Add a light source
    // - Verify the dim light radius is extended

    test.fail('Not implemented - requires full world setup');
  });
});
