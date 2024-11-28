export function speech(text: string, delay: number = 0): Promise<void> {
  return new Promise((resolve, reject) => {
    const ssu = new SpeechSynthesisUtterance();
    ssu.text = text;
    ssu.lang = "ja-JP";

    // 発話の完了イベント
    ssu.onend = (event) => {
      console.log("発話が完了しました:", event);
      resolve();
    };

    // 発話のエラーハンドリング
    ssu.onerror = (event) => {
      console.error("発話中にエラーが発生しました:", event);
      reject(event);
    };

    setTimeout(() => {
      console.log("発話を開始します");
      speechSynthesis.speak(ssu);
    }, delay);
  });
}
