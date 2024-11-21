export function speech(text: string, delay: number = 0) {
  console.log("speech", text, delay);
  const ssu = new SpeechSynthesisUtterance();
  ssu.text = text;
  ssu.lang = "ja-JP";
  setTimeout(() => {
    speechSynthesis.speak(ssu);
  }, delay);
}
