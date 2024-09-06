import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";

// 特定のリソースに対してキャッシュ戦略を設定します
registerRoute(
  ({ request }) => request.mode === "navigate",
  new NetworkFirst({
    cacheName: "pages-cache",
  })
);

registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images-cache",
    plugins: [
      {
        cacheWillUpdate: async ({ response }) => {
          // リクエストのレスポンスがOKであることを確認します
          if (response && response.status === 200) {
            return response;
          }
          return null;
        },
      },
    ],
  })
);

// 他のカスタムキャッシュ戦略やイベントリスナーをここに追加できます

self.addEventListener("fetch", () => {
  // カスタムのフェッチイベントリスナーをここに追加できます
});
