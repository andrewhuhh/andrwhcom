const root = document.documentElement;

document.querySelector(".theme-toggle").addEventListener("click", () => {
  const theme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {}
});

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
