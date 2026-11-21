// andrwh.com interactions: the theme toggle and the scroll effects.
// Everything else (entrance animations, the ticker, hover states) is CSS.

// Theme toggle. The initial theme is applied by the inline script in <head>.
const root = document.documentElement;

document.querySelector(".theme-toggle").addEventListener("click", () => {
  const theme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    // Storage can be blocked (private mode); the toggle still works for this visit.
  }
});

// Scroll effects. Adds .is-visible to matching elements while at least
// `amount` of them (0 to 1) is on screen; style.css does the animating.
// With `once`, the class stays after the first time.
function whenVisible(selector, { amount, once = false }) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        target.classList.toggle("is-visible", isIntersecting);
        if (isIntersecting && once) observer.unobserve(target);
      }
    },
    { threshold: amount }
  );

  for (const element of document.querySelectorAll(selector)) {
    observer.observe(element);
  }
}

whenVisible(".pop", { amount: 0.5, once: true });
whenVisible("main .tilt", { amount: 0.5 });
whenVisible(".ticker .tilt", { amount: 0 });
