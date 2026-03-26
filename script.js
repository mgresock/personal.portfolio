const currentPage = document.body.dataset.page;
document.body.classList.add("motion-ready");
const nav = document.querySelector(".site-nav");
const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const year = document.getElementById("year");
const revealNodes = document.querySelectorAll(".reveal");
const contactForms = document.querySelectorAll("[data-contact-form]");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (nav && currentPage) {
  nav.querySelectorAll("a").forEach((link) => {
    const isActive = link.getAttribute("href") === `${currentPage === "home" ? "index" : currentPage}.html`;
    if (isActive) {
      link.classList.add("active");
    }
  });
}

if (toggle && header) {
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    header.classList.toggle("nav-open", !expanded);
  });
}

if (revealNodes.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
  );

  revealNodes.forEach((node, index) => {
    node.style.transitionDelay = `${Math.min(index * 35, 220)}ms`;
    observer.observe(node);
  });
}

if (contactForms.length) {
  contactForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const company = String(data.get("company") || "").trim();
      const message = String(data.get("message") || "").trim();

      const subject = `Portfolio inquiry from ${name || "Website visitor"}`;
      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company / Organization: ${company || "N/A"}`,
        "",
        "Message:",
        message,
      ].join("\n");

      window.location.href =
        `mailto:mcgresock@gmail.com?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;
    });
  });
}
