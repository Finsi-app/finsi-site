/* RENATO BARROSO - OCT 2022 */
/* -- ren.dev89@gmail.com -- */

const scrollToID = (id) => {
  // Scroll the window to an element selected by its ID

  const el = $(`#${id}`)[0];
  const style = getComputedStyle(el);
  const top = el.offsetTop + parseFloat(style.paddingTop);

  window.scrollTo({ top: top, behavior: "smooth" });
};

const getTestimonialImage = (picture) => {
  // Returns a div with the user picture for the testimonial card

  const div = document.createElement("div");
  div.style.background = `url(${picture}) no-repeat center`;
  div.classList.add("testimonial-pic");
  return div;
};

const getTestimonialText = (name, occupation, text) => {
  // Returns a div with the text parts of the testimonial card

  const div = document.createElement("div");
  const nameEl = document.createElement("p");
  const occupationEl = document.createElement("p");
  const textEl = document.createElement("p");

  nameEl.innerHTML = name;
  nameEl.classList.add("testimonial-name");
  occupationEl.innerHTML = occupation;
  occupationEl.classList.add("testimonial-occupation");
  textEl.innerHTML = text;
  textEl.classList.add("testimonial-text");

  div.appendChild(nameEl);
  div.appendChild(occupationEl);
  div.appendChild(textEl);

  return div;
};

const getTestimonialContainer = (name, occupation, text, picture) => {
  // Returns the main container of the testimonial card

  const container = document.createElement("div");
  const mainDiv = document.createElement("div");
  const imgDiv = getTestimonialImage(picture);
  const textDiv = getTestimonialText(name, occupation, text);

  mainDiv.classList.add("testimonial-wrapper");
  mainDiv.appendChild(imgDiv);
  mainDiv.appendChild(textDiv);
  container.appendChild(mainDiv);

  return container;
};

const createTestimonial = (sliderID, name, occupation, text, picture) => {
  // Creates an user testimonial card element and appends it to the slider

  const div = getTestimonialContainer(name, occupation, text, picture);
  const sliderDiv = document.getElementById(sliderID);
  sliderDiv.appendChild(div);
};

const limitThumbText = (text) => {
  // Limits the ammount of words the thumbnails display before cutting to "..."
  // Currently allows up to 25 words

  const maxWords = 25;
  const words = text.split(" ");

  if (words.length <= maxWords) {
    return text;
  }

  const limitedWords = words.slice(0, maxWords);
  const editedText = limitedWords.join(" ") + "...";
  return editedText;
};

const getThumbImage = (picture) => {
  // Returns the upper part of the thumbnail card

  const div = document.createElement("div");
  div.style.background = `magenta url(${picture}) no-repeat center`;
  div.classList.add("thumb-pic");
  return div;
};

const getThumbText = (title, text, url) => {
  // Returns a div with the text elements of the thumbnail card

  const div = document.createElement("div");
  const titleEl = document.createElement("p");
  const textEl = document.createElement("p");
  const link = document.createElement("a");

  titleEl.innerHTML = title;
  titleEl.classList.add("thumb-title");
  textEl.innerHTML = limitThumbText(text);
  textEl.classList.add("thumb-text");
  link.innerHTML = "Continuar lendo";
  link.setAttribute("href", url);
  link.classList.add("thumb-link");

  div.appendChild(titleEl);
  div.appendChild(textEl);
  div.appendChild(link);
  div.classList.add("thumb-info");

  return div;
};

const getThumbContainer = (picture, title, text, url) => {
  // Returns the bottom part of the tumbnail card

  const container = document.createElement("div");
  const mainDiv = document.createElement("div");
  const imgDiv = getThumbImage(picture);
  const textDiv = getThumbText(title, text, url);

  mainDiv.classList.add("thumb-wrapper");
  mainDiv.appendChild(imgDiv);
  mainDiv.appendChild(textDiv);
  container.appendChild(mainDiv);

  return container;
};

const createThumb = (sliderID, picture, title, text, url) => {
  // Creates a blog post thumbnail card element and appends it to the slider

  const div = getThumbContainer(picture, title, text, url);
  const sliderDiv = document.getElementById(sliderID);
  sliderDiv.appendChild(div);
};

const testAnimations = (e) => {
  // Aux method for testing the transition animations
  // Keys 1-7 toggle the animation of each section

  const key = e.key;
  let div;
  switch (key) {
    case "1":
      div = $("#title");
      break;

    case "2":
      div = $("#topics");
      break;

    case "3":
      div = $("#security");
      break;

    case "4":
      div = $("#features");
      break;

    case "5":
      div = $("#testimonials");
      break;

    case "6":
      div = $("#posts");
      break;

    case "7":
      div = $("#subscribe");
      break;

    default:
      return;
  }

  div[0].classList.toggle("onscreen");
};

const getFOV = (e) => {
  // Returns the current user field of view
  // Represents the maximum y coord the user can see on screen

  return e.target.scrollingElement.scrollTop + window.innerHeight;
};

const getSectionActivationPoint = (sectionEl) => {
  // Returns the y threshold the scroll must cross to activate the section
  // Currently set to 65% of the section height

  return sectionEl.offsetTop + sectionEl.offsetHeight * 0.65;
};

const scrollCallback = (e) => {
  // Activate the section animations while the user scrolls down the page
  // When all of the sections have been activated, removes the listener

  const fov = getFOV(e);
  const inactiveSections = $("section:not(.onscreen)").toArray();

  if (inactiveSections.length === 0) {
    document.removeEventListener("scroll", scrollCallback);
    return;
  }

  inactiveSections.forEach((s) => {
    const threshold = getSectionActivationPoint(s);
    if (fov >= threshold) {
      s.classList.add("onscreen");
    }
  });
};

const initPage = () => {
  createTestimonial(
    "slider-testimonials",
    "Raissa Leal",
    "Fisioterapeuta",
    "Apenas amei esse App, consigo criar todos os meus orçamentos e minhas categorias favoritas, fora toda a praticidade de colocar minhas despesas.",
    "assets/images/user1.webp"
  );

  createTestimonial(
    "slider-testimonials",
    "Rodrigo Muniz",
    "Administrador",
    "Eu sempre gostei de organizar minhas finanças, mas sempre ficava confuso com todos os gráficos e muitos itens para inserir. Com esse novo app da Finsi, está tudo mais fácil.",
    "assets/images/user2.webp"
  );

  createThumb(
    "slider-posts",
    "assets/images/post1.webp",
    "32 gastos que dão direito à restituição do imposto de renda",
    "O período após o início das entregas de declarações do imposto de renda é marcado pela expectativa em relação...",
    "/"
  );

  createThumb(
    "slider-posts",
    "assets/images/post2.webp",
    "32 gastos que dão direito à restituição do imposto de renda",
    "O período após o início das entregas de declarações do imposto de renda é marcado pela expectativa em relação...",
    "/"
  );

  createThumb(
    "slider-posts",
    "assets/images/post1.webp",
    "32 gastos que dão direito à restituição do imposto de renda",
    "O período após o início das entregas de declarações do imposto de renda é marcado pela expectativa em relação...",
    "/"
  );

  createThumb(
    "slider-posts",
    "assets/images/post2.webp",
    "32 gastos que dão direito à restituição do imposto de renda",
    "O período após o início das entregas de declarações do imposto de renda é marcado pela expectativa em relação...",
    "/"
  );

  $("#slider-testimonials").slick({
    arrows: false,
    dots: true,
    pauseOnDotsHover: true,
    autoplay: false,
  });

  $("#slider-posts").slick({
    slidesToShow: 3,
    autoplay: false,
    prevArrow: $("#btn-prev"),
    nextArrow: $("#btn-next"),
    responsive: [
      {
        breakpoint: 1050,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 1, centerMode: true, centerPadding: "10%" },
      },
    ],
  });

  // document.addEventListener("keyup", testAnimations);
  document.addEventListener("scroll", scrollCallback);

  // Fires once on startup for when scroll is at 0
  document.dispatchEvent(new Event("scroll"));
};

$(document).ready(initPage);
