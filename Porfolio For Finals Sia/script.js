const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const projectCards = document.querySelectorAll(".project-card");
const projectModal = document.querySelector(".project-modal");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector(".modal-description");
const modalStack = document.querySelector(".modal-stack");
const modalClose = document.querySelector(".modal-close");
const modalProjectImage = document.querySelector(".modal-project-image");
const resumeModal = document.querySelector(".resume-modal");
const resumeClose = document.querySelector(".resume-close");
const resumePrint = document.querySelector(".resume-print");
const resumeTriggers = document.querySelectorAll("[data-open-resume]");
const projects = {
  portfolio: {
    title: "Personal Portfolio",
    description:
      "A responsive portfolio experience that uses bold editorial typography, a structured grid, and clear storytelling to present a developer’s work with personality.",
    stack: "HTML / CSS / JAVASCRIPT",
  },
  "student-hub": {
    title: "Student Hub",
    description:
      "A focused student dashboard concept that brings schedules, resources, and useful campus information into one organized and approachable space.",
    stack: "UI DESIGN / UX RESEARCH / PROTOTYPE",
  },
  "data-motion": {
    title: "Data in Motion",
    description:
      "A visual data exploration that turns complex information into readable patterns, making important details easier to understand and act on.",
    stack: "JAVASCRIPT / DATA VISUALIZATION / UI",
  },
};

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.forEach((link) =>
  link.addEventListener("click", () => nav.classList.remove("open")),
);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) =>
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`,
        ),
      );
    });
  },
  { rootMargin: "-35% 0px -55% 0px" },
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => revealObserver.observe(element));
setTimeout(() => {
  document
    .querySelectorAll(".reveal:not(.visible)")
    .forEach((element) => element.classList.add("visible"));
}, 1500);

function openProject(card) {
  const project = projects[card.dataset.project];
  if (!project) return;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalStack.textContent = project.stack;
  const cardImage = card.querySelector(".project-art img");
  modalProjectImage.src = cardImage.src;
  modalProjectImage.alt = cardImage.alt;
  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeProject() {
  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => openProject(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(card);
    }
  });
});

modalClose.addEventListener("click", closeProject);
projectModal.addEventListener("click", (event) => {
  if (event.target === projectModal) closeProject();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectModal.classList.contains("open"))
    closeProject();
});

function openResume() {
  resumeModal.classList.add("open");
  resumeModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  resumeClose.focus();
}

function closeResume() {
  resumeModal.classList.remove("open");
  resumeModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

resumeTriggers.forEach((trigger) =>
  trigger.addEventListener("click", openResume),
);
resumeClose.addEventListener("click", closeResume);
resumePrint.addEventListener("click", () => window.print());
resumeModal.addEventListener("click", (event) => {
  if (event.target === resumeModal) closeResume();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && resumeModal.classList.contains("open"))
    closeResume();
});
