const projects = [
  {
    title: "Proyecto Escalera inclinada para acceso de Limpieza - Songa",
    photos: [
      "assets/projects/proyecto-escalera-inclinada-para-acceso-de-limpieza-songa/01.jpg",
      "assets/projects/proyecto-escalera-inclinada-para-acceso-de-limpieza-songa/02.jpg",
      "assets/projects/proyecto-escalera-inclinada-para-acceso-de-limpieza-songa/03.jpg",
      "assets/projects/proyecto-escalera-inclinada-para-acceso-de-limpieza-songa/04.jpg",
      "assets/projects/proyecto-escalera-inclinada-para-acceso-de-limpieza-songa/05.jpg",
      "assets/projects/proyecto-escalera-inclinada-para-acceso-de-limpieza-songa/06.jpg",
      "assets/projects/proyecto-escalera-inclinada-para-acceso-de-limpieza-songa/07.jpg",
      "assets/projects/proyecto-escalera-inclinada-para-acceso-de-limpieza-songa/08.jpg",
      "assets/projects/proyecto-escalera-inclinada-para-acceso-de-limpieza-songa/09.jpg",
      "assets/projects/proyecto-escalera-inclinada-para-acceso-de-limpieza-songa/10.jpg",
      "assets/projects/proyecto-escalera-inclinada-para-acceso-de-limpieza-songa/11.jpg",
      "assets/projects/proyecto-escalera-inclinada-para-acceso-de-limpieza-songa/12.jpg"
    ]
  },
  {
    title: "Proyecto protección de Pantallas - Songa",
    photos: [
      "assets/projects/proyecto-proteccion-de-pantallas-songa/01.jpg",
      "assets/projects/proyecto-proteccion-de-pantallas-songa/02.jpg",
      "assets/projects/proyecto-proteccion-de-pantallas-songa/03.jpg",
      "assets/projects/proyecto-proteccion-de-pantallas-songa/04.jpg",
      "assets/projects/proyecto-proteccion-de-pantallas-songa/05.jpg",
      "assets/projects/proyecto-proteccion-de-pantallas-songa/06.jpg"
    ]
  },
  {
    title: "Proyecto Tanque Santa Elena",
    photos: [
      "assets/projects/proyecto-tanque-santa-elena/01.jpg",
      "assets/projects/proyecto-tanque-santa-elena/02.jpg",
      "assets/projects/proyecto-tanque-santa-elena/03.jpg",
      "assets/projects/proyecto-tanque-santa-elena/04.jpg",
      "assets/projects/proyecto-tanque-santa-elena/05.jpg",
      "assets/projects/proyecto-tanque-santa-elena/06.jpg",
      "assets/projects/proyecto-tanque-santa-elena/07.jpg",
      "assets/projects/proyecto-tanque-santa-elena/08.jpg",
      "assets/projects/proyecto-tanque-santa-elena/09.jpg",
      "assets/projects/proyecto-tanque-santa-elena/10.jpg",
      "assets/projects/proyecto-tanque-santa-elena/11.jpg"
    ]
  }
];

const menuToggle = document.querySelector(".menu-toggle");
const mainMenu = document.querySelector(".main-menu");

menuToggle.addEventListener("click", () => {
  const isOpen = mainMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainMenu.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    mainMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

const dialog = document.querySelector(".gallery-dialog");
const galleryImage = document.querySelector("#gallery-image");
const galleryTitle = document.querySelector("#gallery-title");
const galleryCount = document.querySelector("#gallery-count");
const thumbs = document.querySelector("#gallery-thumbs");
const closeButton = document.querySelector(".dialog-close");
const previousButton = document.querySelector(".gallery-nav.prev");
const nextButton = document.querySelector(".gallery-nav.next");

let activeProject = 0;
let activePhoto = 0;

function setPhoto(index) {
  const project = projects[activeProject];
  activePhoto = (index + project.photos.length) % project.photos.length;
  galleryImage.src = project.photos[activePhoto];
  galleryImage.alt = `${project.title} - foto ${activePhoto + 1}`;
  galleryCount.textContent = `${activePhoto + 1} de ${project.photos.length}`;

  thumbs.querySelectorAll("button").forEach((button, buttonIndex) => {
    button.classList.toggle("active", buttonIndex === activePhoto);
  });
}

function openProject(index) {
  activeProject = index;
  activePhoto = 0;
  const project = projects[activeProject];
  galleryTitle.textContent = project.title;
  thumbs.innerHTML = "";

  project.photos.forEach((photo, photoIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Ver foto ${photoIndex + 1}`);

    const img = document.createElement("img");
    img.src = photo;
    img.alt = "";
    button.appendChild(img);

    button.addEventListener("click", () => setPhoto(photoIndex));
    thumbs.appendChild(button);
  });

  setPhoto(0);
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => openProject(Number(card.dataset.project)));
});

closeButton.addEventListener("click", () => dialog.close());
previousButton.addEventListener("click", () => setPhoto(activePhoto - 1));
nextButton.addEventListener("click", () => setPhoto(activePhoto + 1));

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

document.addEventListener("keydown", (event) => {
  if (!dialog.open) return;
  if (event.key === "ArrowLeft") setPhoto(activePhoto - 1);
  if (event.key === "ArrowRight") setPhoto(activePhoto + 1);
});
