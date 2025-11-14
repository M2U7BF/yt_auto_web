const input = document.getElementById("youtubeUrl");
const historyList = document.getElementById("historyList");

const STORAGE_KEY = "inputHistory";
const MAX_HISTORY = 5;

// 履歴を取得
function loadHistory() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// 履歴を保存
function saveHistory(history) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

// 入力を履歴に追加（重複排除・新しいものを先頭へ）
function addHistory(value) {
  let history = loadHistory();

  // 既存の同じ値を削除
  history = history.filter(item => item !== value);

  // 先頭に追加
  history.unshift(value);

  // 最大5件に制限
  history = history.slice(0, MAX_HISTORY);

  saveHistory(history);
}

// 履歴を描画
function renderHistory() {
  const history = loadHistory();

  if (history.length === 0) {
    historyList.classList.add("hidden");
    return;
  }

  historyList.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;

    li.addEventListener("click", () => {
      input.value = item;
      historyList.classList.add("hidden");
    });

    historyList.appendChild(li);
  });

  historyList.classList.remove("hidden");
}

// 入力確定時（Enter または blur）に履歴追加
input.addEventListener("change", () => {
  const value = input.value.trim();
  if (value) {
    addHistory(value);
  }
});

// focus 時に履歴を表示
input.addEventListener("focus", () => {
  renderHistory();
});

// input 以外をクリックしたら履歴を閉じる
document.addEventListener("click", (e) => {
  if (!input.contains(e.target) && !historyList.contains(e.target)) {
    historyList.classList.add("hidden");
  }
});
