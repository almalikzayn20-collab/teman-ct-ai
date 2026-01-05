export function estimateVideoSeconds(scenes = []) {
  return scenes.reduce((total, s) => {
    const sec = Number(
      String(s.duration || "5s").replace("s", "")
    );
    return total + (isNaN(sec) ? 5 : sec);
  }, 0);
}
