const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  menuToggle.classList.toggle("active");
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
        if (link.parentElement.getAttribute("href").replace("#","") === entry.target.id) {
          link.classList.add("active");
        }
      });
    }
  });
}, options);

sections.forEach(section => {
  observer.observe(section);
});