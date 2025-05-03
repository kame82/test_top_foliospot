// メディアクエリの定義
const mediaQueries = {
  pc: "(min-width: 768px)",
  sp: "(max-width: 767px)",
};

// 現在の画面サイズを判定する関数
export function isPC() {
  return window.matchMedia(mediaQueries.pc).matches;
}

export function isSP() {
  return window.matchMedia(mediaQueries.sp).matches;
}

// 画面サイズ変更時のリスナー登録
export function onMediaChange(query, callback) {
  const mediaQueryList = window.matchMedia(query);
  mediaQueryList.addEventListener("change", (event) => {
    callback(event.matches);
  });
}
