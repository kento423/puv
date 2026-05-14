import { test, expect } from '@playwright/test';

test.describe('Pokemon Counter Form Flow', () => {

  test('should open counter form, select pokemon, fill inputs and submit successfully with mock', async ({ page }) => {
    // 1. 本番のDBを汚さないよう、POSTリクエストをモック(傍受)して成功を返すように設定
    await page.route('**/api/pokemon/*/counters', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: "Success" }),
      });
    });

    // 2. ポケモン一覧から最初のポケモンの詳細ページへアクセス
    await page.goto('/pokemon');
    const firstPokemonLink = page.locator('a[href^="/pokemon/"]').first();
    await firstPokemonLink.waitFor();
    await firstPokemonLink.click();

    // 詳細ページに遷移したことを確認
    await expect(page).toHaveURL(/.*\/pokemon\/[^/]+/);

    // 3. カウンターを追加するボタンをクリック
    const addCounterBtn = page.getByRole('button', { name: '＋ カウンターを追加する' });
    await expect(addCounterBtn).toBeVisible();
    await addCounterBtn.click();

    // 4. フォームが開いたことを確認 (ラベルテキスト)
    await expect(page.getByText('ポケモンを選択 *', { exact: true })).toBeVisible();

    // 5. Combobox (ポケモン選択) を開く
    const combobox = page.getByRole('combobox').first();
    await combobox.click();
    
    // 検索窓に文字を入れてから、何か1つピックする（一覧の一番上のアイテムを選択）
    // リストの中に何がいるか不明なので、最初のアイテムを選ぶ
    const firstOption = page.locator('[cmdk-item]').first();
    await expect(firstOption).toBeVisible();
    await firstOption.click();

    // 6. カウンター種類（ハードカウンター）を選択
    const hardCounterBtn = page.getByRole('button', { name: /ハードカウンター/i }).first();
    await expect(hardCounterBtn).toBeVisible();
    await hardCounterBtn.click();

    // 7. 理由テキストを入力
    const reasonInput = page.getByPlaceholder('このポケモンが有効な理由や対策方法を入力してください');
    await expect(reasonInput).toBeVisible();
    await reasonInput.fill('E2Eテストによる自動入力：これは強力なカウンターです。');

    // 8. 追加ボタンをクリックして送信
    const submitBtn = page.getByRole('button', { name: '追加', exact: true }).first();
    await submitBtn.click();

    // 9. フォームが閉じて、元の「＋ カウンターを追加する」ボタンが再び表示されることを検証
    // APIがモックされて200を返すため、正常に閉じるはず
    await expect(addCounterBtn).toBeVisible();
    await expect(reasonInput).toBeHidden(); 
  });
  
});
