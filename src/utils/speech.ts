export function speech(text: string) {
  const ssu = new SpeechSynthesisUtterance();
  ssu.text = text;
  ssu.lang = "ja-JP";
  //speechSynthesis.speak(ssu);
}
