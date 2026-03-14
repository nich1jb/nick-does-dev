export const triggerSystemWipeEffect = () => {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background =
    "radial-gradient(circle at center, rgba(120, 0, 0, 0.25), #000 65%)";
  overlay.style.opacity = "0";
  overlay.style.transition = "opacity 1200ms ease";
  overlay.style.zIndex = "99999";
  overlay.style.pointerEvents = "none";

  const status = document.createElement("div");
  status.style.position = "absolute";
  status.style.left = "50%";
  status.style.top = "50%";
  status.style.transform = "translate(-50%, -50%)";
  status.style.color = "#ff5555";
  status.style.fontFamily = '"Courier New", monospace';
  status.style.fontSize = "18px";
  status.style.textAlign = "center";
  status.style.whiteSpace = "pre-line";
  status.style.textShadow = "0 0 10px rgba(255, 0, 0, 0.75)";
  status.textContent = "rm: deleting /...";

  const scan = document.createElement("div");
  scan.style.position = "absolute";
  scan.style.inset = "0";
  scan.style.background =
    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255, 0, 0, 0.08) 3px, rgba(255, 0, 0, 0.08) 5px)";
  scan.style.mixBlendMode = "screen";

  overlay.appendChild(scan);
  overlay.appendChild(status);

  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";

  requestAnimationFrame(() => {
    overlay.style.opacity = "1";
  });

  window.setTimeout(() => {
    status.textContent = "kernel panic: critical filesystem damage detected";
  }, 1100);

  window.setTimeout(() => {
    status.textContent = "attempting recovery...\nrecovery failed";
    overlay.style.transform = "translateX(3px)";
  }, 2400);

  window.setTimeout(() => {
    overlay.style.transform = "translateX(-3px)";
  }, 2650);

  window.setTimeout(() => {
    overlay.style.transform = "translateX(0)";
    status.textContent = "system halted";
  }, 3100);

  window.setTimeout(() => {
    window.location.href = "/404";
  }, 4300);
};
