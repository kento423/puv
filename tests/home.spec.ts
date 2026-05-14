import { test, expect } from '@playwright/test';

test.describe('Home Page & Navigation Flow', () => {

  test('should load the homepage and display the main title', async ({ page }) => {
    // ページへ遷移
    await page.goto('/');

    // タイトルが存在するか確認
    await expect(page.getByRole('heading', { name: /Unite Community/i, level: 1 })).toBeVisible();

    // ポケモンカウンター図鑑へのリンクが存在することを確認
    const counterLink = page.locator('a[href="/pokemon"]');
    await expect(counterLink).toBeVisible();
  });

  test('should navigate to meta board and switch tabs', async ({ page }) => {
    // ページへ遷移
    await page.goto('/meta');

    // ヘッダーが存在するか
    await expect(page.getByRole('heading', { level: 1, name: /アプデ後情報掲示板/i })).toBeVisible();

    // タブをクリックして切り替えるテスト (BAN候補)
    const banTab = page.locator('button', { hasText: 'BAN候補' }).first();
    await expect(banTab).toBeVisible();
    await banTab.click();

    // URLや内容が切り替わることを確認
    await expect(page).toHaveURL(/.*tab=ban.*/);
  });

});
