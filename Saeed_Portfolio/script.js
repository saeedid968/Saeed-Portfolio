const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  menuToggle.classList.toggle("active");
});

const applyTheme = (theme) => {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-mode", isDark);
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  }
};

const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

applyTheme(storedTheme ? storedTheme : prefersDark.matches ? "dark" : "light");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  });
}

prefersDark.addEventListener("change", (event) => {
  if (!localStorage.getItem("theme")) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

var typed = new Typed(".typing", {
  strings: ["Web Developer", "Mern Stack Developer", "Frontend Specialist"],
  typeSpeed: 90,
  backSpeed: 50,
  loop: true,
});

const typed2 = new Typed(".typing-2", {
  strings: ["Web Developer", "Mern Stack Developer", "Freelancer"],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true,
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-container ul a li");

const options = {
  threshold: 0.6,  // how much of section should be visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.parentElement.getAttribute("href").replace("#", "") === entry.target.id) {
          link.classList.add("active");
        }
      });
    }
  });
}, options);

sections.forEach(section => {
  observer.observe(section);
});

const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");
const submitBtn = document.getElementById("submitBtn");
const btnText = submitBtn.querySelector(".btn-text");
const spinner = submitBtn.querySelector(".spinner");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  spinner.style.display = "inline-block";
  btnText.textContent = "";
  submitBtn.disabled = true;

  const formData = new FormData(form);

  try {
    await fetch("https://formsubmit.co/ajax/saeedid968@gmail.com", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });

    toast.textContent = "Thanks for reaching out. I’ll get back to you soon!";
    toast.classList.add("show", "success");
    toast.classList.remove("error");

    form.reset();
  } catch (error) {
    toast.textContent = "Something went wrong. Please try again later!";
    toast.classList.add("show", "error");
    toast.classList.remove("success");
  } finally {
    spinner.style.display = "none";
    btnText.textContent = "Send Message";
    submitBtn.disabled = false;

    setTimeout(() => {
      toast.classList.remove("show", "success", "error");
    }, 5000);
  }
});
