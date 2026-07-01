// ── MODAL CON NAVEGACIÓN ──
let modalFolder = '';
let modalIndex = 1;
const modalTotal = 3;

function openModal(folder, index) {
  modalFolder = folder;
  modalIndex = index;
  updateModal();
  document.getElementById("modal").style.display = "flex";
}

function updateModal() {
  document.getElementById("modalImg").src = `./img/${modalFolder}/${modalIndex}.webp`;
  document.getElementById("modalCounter").textContent = `${modalIndex} / ${modalTotal}`;
}

function modalNav(dir) {
  modalIndex = ((modalIndex - 1 + dir + modalTotal) % modalTotal) + 1;
  updateModal();
}

function closeModal() { document.getElementById("modal").style.display="none"; }

document.addEventListener("keydown", function(e) {
  if (document.getElementById("modal").style.display === "flex") {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") modalNav(1);
    if (e.key === "ArrowLeft") modalNav(-1);
  } else {
    if (e.key === "Escape") closeMenu();
  }
});

// Cerrar modal al hacer click en el overlay
document.getElementById("modal").addEventListener("click", function(e) {
  if (e.target === this) closeModal();
});

function toggleMenu() {
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("drawerOverlay");
  drawer.classList.toggle("open");
  overlay.classList.toggle("open");
  document.body.style.overflow = drawer.classList.contains("open") ? "hidden" : "";
}
function closeMenu() {
  document.getElementById("drawer").classList.remove("open");
  document.getElementById("drawerOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

function enviarWhatsApp(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const profesion = document.getElementById("profesion").value;
  const mensaje = document.getElementById("mensaje").value;
  const texto = "Hola, soy " + nombre + (profesion ? ", " + profesion + "." : ".") + " " + mensaje;
  window.open("https://wa.me/5491130409543?text=" + encodeURIComponent(texto), "_blank");
}

const galleryObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => { entry.target.classList.add('visible'); }, i * 80);
      galleryObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.gallery-item').forEach(item => galleryObserver.observe(item));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll('.stagger-item');
      siblings.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 120);
      });
      staggerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.stagger-item').forEach(el => staggerObserver.observe(el));

// Back to top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

// Active nav indicator
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector('nav a[href="#' + entry.target.id + '"]');
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(section => navObserver.observe(section));