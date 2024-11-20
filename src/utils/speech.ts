export function speech(text: string, delay: number = 0) {
  const ssu = new SpeechSynthesisUtterance();
  ssu.text = text;
  ssu.lang = "ja-JP";
  setTimeout(() => {
    speechSynthesis.speak(ssu);
  }, delay);
}
