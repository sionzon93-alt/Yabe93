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
  bulwagan: {
    title: "Bulwagang NCST Portal",
    description:
      "A centralized university cultural platform built to streamline student talent auditions, broadcast official event announcements, and organize performance media archives through an interactive responsive dashboard.",
    stack: "PHP / MYSQL / JAVASCRIPT / HTML5 / CSS3",
  },
  portfolio: {
    title: "Bulwagang NCST Portal",
    description:
      "A centralized university cultural platform built to streamline student talent auditions, broadcast official event announcements, and organize performance media archives through an interactive responsive dashboard.",
    stack: "PHP / MYSQL / JAVASCRIPT / HTML5 / CSS3",
  },
  "cooking-quest": {
    title: "Cooking Quests Engine",
    description:
      "An interactive recipe-crafting adventure engine developed in Python, featuring turn-based event logic, dynamic player inventory state management, and branching interactive cooking quests.",
    stack: "PYTHON 3 / OOP / STATE MACHINE / TERMINAL GUI",
  },
  "java-minesweeper": {
    title: "Java Minesweeper Arcade",
    description:
      "A custom desktop puzzle game built from the ground up in Java, incorporating recursive flood-fill grid clearing algorithms, dynamic minefield generation, timer scoring, and custom Swing GUI components.",
    stack: "JAVA / SWING GUI / OOP PATTERNS / ALGORITHMS",
  },
};

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.forEach((link) =>
  link.addEventListener("click", () => nav.classList.remove("open")),
);
const navResumeBtn = document.querySelector(".nav-resume-btn");
if (navResumeBtn) {
  navResumeBtn.addEventListener("click", () => nav.classList.remove("open"));
}

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
  const projectKey = card.dataset.project;
  const project = projects[projectKey];
  if (!project) return;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalStack.textContent = project.stack;
  const cardImage = card.querySelector("img");
  if (cardImage) {
    modalProjectImage.src = cardImage.src;
    modalProjectImage.alt = cardImage.alt;
    const fullviewLink = projectModal.querySelector(".modal-fullview-link");
    if (fullviewLink) {
      fullviewLink.href = cardImage.src;
    }
  }
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

// Project Card click handling (cards and View Project buttons)
document.addEventListener("click", (event) => {
  const card = event.target.closest(".project-card");
  if (card) {
    openProject(card);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    if (document.activeElement && document.activeElement.classList.contains("project-card")) {
      event.preventDefault();
      openProject(document.activeElement);
    }
  }
});

// Category Filter Pills logic
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;

    document.querySelectorAll(".project-card").forEach((card) => {
      const categories = card.dataset.category || "";
      if (filter === "all" || categories.includes(filter)) {
        card.style.display = "";
        card.classList.add("visible");
      } else {
        card.style.display = "none";
      }
    });
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

// Contact Section Interactivity
const copyEmailBtn = document.querySelector(".copy-email-btn");
if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", async () => {
    const email = copyEmailBtn.dataset.email || "sionzon93@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      const copyIcon = copyEmailBtn.querySelector(".copy-icon");
      const checkIcon = copyEmailBtn.querySelector(".check-icon");
      if (copyIcon && checkIcon) {
        copyIcon.style.display = "none";
        checkIcon.style.display = "block";
        setTimeout(() => {
          copyIcon.style.display = "block";
          checkIcon.style.display = "none";
        }, 2000);
      }
    } catch {
      // Fallback
      const tempInput = document.createElement("input");
      tempInput.value = email;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    }
  });
}

const contactForm = document.querySelector("#portfolio-contact-form");
const contactFeedback = document.querySelector("#contact-form-feedback");
const submitBtn = document.querySelector(".contact-submit-btn");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#contact-name").value.trim();
    const email = document.querySelector("#contact-email").value.trim();
    const message = document.querySelector("#contact-message").value.trim();

    if (!name || !email || !message) return;

    // Direct Gmail Web composer link & mailto fallback
    const subjectText = `Portfolio Message from ${name}`;
    const bodyText = `Hi Terd,\n\n${message}\n\n---\nSender Name: ${name}\nSender Email: ${email}`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=sionzon93@gmail.com&su=${encodeURIComponent(
      subjectText
    )}&body=${encodeURIComponent(bodyText)}`;

    const mailtoUrl = `mailto:sionzon93@gmail.com?subject=${encodeURIComponent(
      subjectText
    )}&body=${encodeURIComponent(bodyText)}`;

    // Also attempt background delivery
    fetch("https://formsubmit.co/ajax/sionzon93@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Email: email,
        Message: message,
        _subject: subjectText,
      }),
    }).catch(() => {});

    // Open Gmail composer in a new tab
    const openedTab = window.open(gmailUrl, "_blank");

    if (contactFeedback) {
      contactFeedback.className = "form-feedback success";
      contactFeedback.innerHTML = `
        <div style="font-size: 14px; font-weight: 700; margin-bottom: 6px;">
          ✓ Message Prepared for <u>sionzon93@gmail.com</u>!
        </div>
        <p style="margin: 0 0 10px; font-size: 12px; color: #102536;">
          Click below to send via Gmail or your email app:
        </p>
        <div class="form-quick-actions">
          <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="quick-mail-btn gmail-btn">
            Open in Gmail Web ↗
          </a>
          <a href="${mailtoUrl}" class="quick-mail-btn mailto-btn">
            Open in Email App ✉
          </a>
        </div>
      `;
      contactFeedback.style.display = "block";
    }

    contactForm.reset();
  });
}


