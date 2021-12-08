"use strict";

const slide = $(".up");
const silde_div = $(".searchSection");

let news = document.querySelector(".news");
let set_language = "en",
  set_category = "general",
  set_random = "";

slide.click(function () {
  silde_div.slideToggle();
  slide.toggleClass("bi-chevron-up");
  slide.toggleClass("bi-chevron-down");
});

// Funtion to parse and pass required data into set function

get(set_category, set_random);

function get(category, q) {
  set_language = $("#language").find(":selected").text();
  if (set_language === "English") {
    set_language = "en";
  } else if (set_language === "Arabic") {
    set_language = "ar";
  } else if (set_language === "France") {
    set_language = "fr";
  } else if (set_language === "Italian") {
    set_language = "it";
  }

  fetch(
    `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=c67ad22d18c3408c943d89e9da8ddfb9&pageSize=20&language=${set_language}&q=${q}`
  )
    .then((response) => {
      if (!response.ok) {
        alert("No News found...!");
        throw new Error("No data found");
      }
      return response.json();
    })
    .then((data) => set(data));
}

// To create new container of news div

function set(data) {
  console.log(data);
  news.innerHTML = "";
  for (let i = 0; i < data.totalResults; i++) {
    let container = document.createElement("div");
    container.classList.add("container");
    let img_section = document.createElement("div");
    img_section.classList.add("imageSection");
    let image = document.createElement("img");
    image.src = data.articles[i].urlToImage;
    image.classList.add("editImage");
    img_section.appendChild(image);
    container.appendChild(img_section);

    let container2 = document.createElement("div");

    container2.classList.add("container2");
    let heading = document.createElement("h2");
    heading.classList.add("newsH2");
    let a = document.createElement("a");
    a.href = data.articles[i].url;
    a.innerText = data.articles[i].title;

    heading.appendChild(a);
    container2.appendChild(heading);

    let paragraph = document.createElement("p");
    paragraph.classList.add("newsP");
    paragraph.innerText = data.articles[i].description;

    container2.appendChild(paragraph);

    let source = document.createElement("div");
    source.classList.add("source");

    let newspub = document.createElement("span");
    newspub.classList.add("newsPub");
    newspub.innerText = data.articles[i].publishedAt;

    source.appendChild(newspub);

    let newsname = document.createElement("span");
    newsname.classList.add("newsNam");
    newsname.innerText = data.articles[i].source.name;

    source.appendChild(newsname);

    container2.appendChild(source);

    container.appendChild(container2);

    news.appendChild(container);
  }
  if (data.totalResults === 0) {
    alert("No data found ...!");
  }
}

// When any category in page is clicked it's value will pe pass to category

let list = $("li");

list.click(function (event) {
  let list_selected = $(this).attr("id");
  list.removeClass("addColor");
  $("#" + list_selected).addClass("addColor");
  set_category = list_selected;
  get(set_category, set_random);
});

// when any keyword is searched

const search = document.querySelector(".search");

search.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    const text = String(search.value);

    if (text === "") {
      alert("Please enter something to fetch data 🙂");
    } else {
      set_random = text;
      set_category = "";
      list.removeClass("addColor");
      search.value = "";
      get(set_category, set_random);
      set_random = "";
    }
  }
});
