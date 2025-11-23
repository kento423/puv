/**
 * ユーザーの一意のIDを取得または生成します
 */
export function getUserId(): string {
  if (typeof window === "undefined") {
    throw new Error("getUserId can only be called in the browser");
  }

  const STORAGE_KEY = "pv_user_id";
  let userId = localStorage.getItem(STORAGE_KEY);

  if (!userId) {
    // UUID v4 を生成
    userId = "user_" + crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, userId);
  }

  return userId;
}
