

let nameDir = ["Rafael", "Carlos","José Manuel","David Jonathan","Juan Carlos","Daniela","Willhelm","Eucario","Alonso","Luis Fernando"];
let lastName = ["Zorrilla", "León","Sánchez","García","Celorio","Marinelli","Schmidt","León","Montaño","Álvarez"];
let cargo = ["Presidente", "Vicepresidente","Secretario","Tesorero","Consejo de vigilancia","FUNDADOR HONORARIO (SOCIO)","Gerente","SOCIO FUNDADOR HONORARIO","Vocal","Vocal"];
let img = ["img/man.png", "img/man.png","img/man.png","img/man.png","img/man.png","img/woman.png","img/man.png","img/man.png","img/man.png","img/man.png"];

$(".slider-directivos").slick({
  pauseOnHover: false,
  dots: false,
  arrows: true,
  autoplay: false,
  speed: 1000,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    }
  ],
});

var lastScrollTop = 0;
$(window).scroll(function (e) {
  $altoportada = $('.ancla').height();
  var st = $(this).scrollTop();
  if (st > $altoportada) {
    $('nav').addClass('activo')
  } else {
    $('nav').removeClass('activo')
  }
  if ($(".responsive-menu").hasClass("activo")) {
    $('nav').addClass('scrolldown')
  }
  lastScrollTop = st;

});


$(".burguer").click(function () {
  $(".menu").toggleClass("active");
  $(".burguer").toggleClass("active");
});

$(".tarjas").hover(function () {
  $(".tarjas-list").toggleClass("hide");
});

//funcion para rotar el slider 3D
let current_rotation = 0;
$(".arrow-left").click(function () {
  current_rotation += 72;
  document.querySelector("#carousel").style.transform =
    "rotateY(" + current_rotation + "deg)";
});

$(".arrow-right").click(function () {
  current_rotation -= 72;
  document.querySelector("#carousel").style.transform =
    "rotateY(" + current_rotation + "deg)";
});

const counterz = document.querySelectorAll(".value");
const speedz = 1000;

counterz.forEach((counter) => {
  const animate = () => {
    const value = +counter.getAttribute("akhi");
    const data = +counter.innerText;

    const time = value / speedz;
    if (data < value) {
      counter.innerText = Math.ceil(data + time);
      setTimeout(animate, 1);
    } else {
      counter.innerText = value;
    }
  };

  animate();
});

async function getEvent(option) {
  temp = false;
  const yourServerUrl =
    "https://api-us-east-1.graphcms.com/v2/ckxrslv5g1dga01z93loq8v5e/master";
  const yourQuery = {
    query: `query getEvent {
        event(orderBy: createdAt_DESC, first: 1) {
          id
          titleEvent
          front_page {
            url
          }
          back_page {
            url
          }
          description
          date_event
          short_description
        }
      }
      `,
  };

  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", yourServerUrl, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onloadend = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
      //console.log(xhr.response);
      if (option == 1) {
        document.getElementById("titleEvent").innerHTML =
          xhr.response["data"]["event"][0]["titleEvent"];
        document.getElementById("short_description").innerHTML =
          xhr.response["data"]["event"][0]["short_description"];

        var element = document.getElementById("eventBackground");
        element.style["background-image"] =
          "url(" + xhr.response["data"]["event"][0]["front_page"]["url"] + ")";
          element.style["background-size"] = "contain";
          element.style["background-repeat"] = "no-repeat";
          element.style["background-position"] = "center";
      } else {
        document.getElementById("titleEvent").innerHTML =
          xhr.response["data"]["event"][0]["titleEvent"];
        document.getElementById("description").innerHTML =
          xhr.response["data"]["event"][0]["description"];
        //var tempDate = xhr.response['data']['event'][0]['date_event'].split("T", 3);
        //document.getElementById('date').innerHTML = tempDate[0];
        var element = document.getElementById("eventBackground");
        element.style["background-image"] =
          "url(" + xhr.response["data"]["event"][0]["back_page"]["url"] + ")";
        //var image = document.getElementById("eventBackground");
        //image.src = xhr.response['data']['event'][0]['back_page']['url'];
      }
    }
  };
  xhr.send(JSON.stringify(yourQuery));
}

async function getBannerEvent() {
  temp = false;
  const yourServerUrl =
    "https://api-us-east-1.graphcms.com/v2/ckxrslv5g1dga01z93loq8v5e/master";
  const yourQuery = {
    query: `query Banner {
        banners {
          imageBanner {
            url
          }
        }
      }
      `,
  };

  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", yourServerUrl, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onloadend = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
      console.log(xhr.response);
      var element = document.getElementById("bannerBackground");
      element.style["background-image"] =
        "url(" + xhr.response["data"]["banners"][0]["imageBanner"]["url"] + ")";
    }
  };
  xhr.send(JSON.stringify(yourQuery));
}

// esta funcion se ejecuta en el body del index
function init() {
  getEvent(1);
}

// esta funcion se ejecuta en el body de event
function initEvent() {
  getEvent(2);
  getBannerEvent();
}



async function getSlider() {
  temp = false;
  const yourServerUrl =
    "https://api-us-east-1.graphcms.com/v2/ckxrslv5g1dga01z93loq8v5e/master";
  const yourQuery = {
    query: `query MyQuery {
        sliders {
          imagen {
            url
          }
          texto
        }
      }
      `,
  };

  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", yourServerUrl, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onloadend = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
      const post = xhr.response["data"]["sliders"];
      for (var i = 0; i < post.length; i++) {
        document.querySelector(".slider-info").insertAdjacentHTML(
          "beforeend",
          `<div class="slide">
            <img src="` +
            post[i]["imagen"]["url"] +
            `">
            <h2>` +
            post[i]["texto"] +
            `</h2>
          </div>`
        );
      }
      $(".slider-info").slick({
        pauseOnHover: false,
        dots: false,
        arrows: false,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 1800,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "60px",
        variableWidth: true,
      });
    }
  };
  xhr.send(JSON.stringify(yourQuery));
}

async function getLogos() {
  temp = false;
  const yourServerUrl =
    "https://api-us-east-1.graphcms.com/v2/ckxrslv5g1dga01z93loq8v5e/master";
  const yourQuery = {
    query: `query MyQuery {
      sliderLogos1 {
        imagenlogo {
          url
        }
      }
    }
      `,
  };

  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", yourServerUrl, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onloadend = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
      const post = xhr.response["data"]["sliderLogos1"];
      for (var i = 0; i < post.length; i++) {
        document.querySelector("#containerSocios").insertAdjacentHTML(
          "beforeend",
          `
            <div class="slide">
            <img src="` +
            post[i]["imagenlogo"]["url"] +
            `">
            </div>
          `
        );
      }
      $(".slider-logos").slick({
        pauseOnHover: false,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1500,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 850,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          }
        ],
      });
    }
  };
  xhr.send(JSON.stringify(yourQuery));
}

async function getPost() {
  temp = false;
  const yourServerUrl =
    "https://api-us-east-1.graphcms.com/v2/ckxrslv5g1dga01z93loq8v5e/master";
  const yourQuery = {
    query: `query Posts {
        postsConnection {
               edges {
                 cursor
                 node {
                   author {
                     bio
                     name
                     id
                     photo {
                       url
                     }
                   }
                   createdAt
                   slug
                   title
                   excerpt
                   featuredImage {
                     url
                   }
                   categories {
                     name
                     slug
                   }
                 }
     }
       }
     }
      `,
  };
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", yourServerUrl, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onloadend = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
      //console.log(xhr.response['data']['postsConnection']['edges']);
      const post = xhr.response["data"]["postsConnection"]["edges"];
      for (var i = 0; i < post.length; i++) {
        //console.log(post[i]);
        document.querySelector("#newsSLider").insertAdjacentHTML(
          "beforeend",
          `<div class="slide">
            <div class="left">
              <img src="` +
            post[i]["node"]["featuredImage"]["url"] +
            `">
            </div>
            <div class="right">
              <p class="date">31.07.2020</p>
                <h3>` +
            post[i]["node"]["title"] +
            `</h3>
              <p>` +
            post[i]["node"]["excerpt"] +
            `</p>

                <a href='noticia.html?id=` +
            post[i]["cursor"] +
            `' class="button">Ver más</a>

            </div>
          </div>`
        );
      }

      $(".slider-noticias").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        arrows: true,
        dots: false,
        autoplay: false,
        autoplaySpeed: 4000,
        prevArrow: $(".prev"),
        nextArrow: $(".next"),
        pauseOnHover: false,
      });
    }
  };
  xhr.send(JSON.stringify(yourQuery));
}


async function getBannersHome() {
  const yourServerUrl =
    "https://api-us-east-1.graphcms.com/v2/ckxrslv5g1dga01z93loq8v5e/master";
  const yourQuery = {
    query: `query MyQuery {
      bannerHomes {
        imageBanner {
          url
        }
      }
    }`,
  };
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", yourServerUrl, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onloadend = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
      console.log(xhr.response);
      const post = xhr.response["data"]["bannerHomes"];
      for (var i = 0; i < post.length; i++) {

        document.querySelector("#bannerHome").insertAdjacentHTML(
          "beforeend",
          `<div class="slide" >
            <img src="`+post[i]['imageBanner']['url']+`">
          </div>`
        );
      }

      $(".slider-banners").slick({
        pauseOnHover: false,
        dots: false,
        arrows: false,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 1800,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0px",
        variableWidth: true,
        adaptiveHeight: true
      });
    }
  };
  xhr.send(JSON.stringify(yourQuery));
}

async function getNew() {
  var idTem = parent.document.URL.substring(
    parent.document.URL.indexOf("?")
  ).split("=");
  console.log(idTem[1]);
  temp = false;
  const yourServerUrl =
    "https://api-us-east-1.graphcms.com/v2/ckxrslv5g1dga01z93loq8v5e/master";
  const yourQuery = {
    query:
      `query MyQuery {
        postsConnection(where: {id: "`+idTem[1]+`"}) {
          edges {
            node {
              id
              title
              featuredImage {
                url
              }
              content {
                html
              }
              createdAt
              categories {
                name
              }
            }
            cursor
          }
        }
      }
  `
  };

  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("POST", yourServerUrl, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onloadend = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
      //console.log(xhr.response['data']['postsConnection']['edges']);
      const post = xhr.response["data"]["postsConnection"]["edges"];
      //for(var i = 0; i < post.length; i++){
      console.log(post[0]);
      var image = document.getElementById("eventBackground");
      image.src = post[0]["node"]["featuredImage"]["url"];
      document.getElementById("titleEvent").innerHTML =
        post[0]["node"]["title"];
      document.getElementById("text").innerHTML =
        post[0]["node"]["content"]["html"];
      for (var i = 0; i < post[0]["node"]["categories"].length; i++) {
        document.querySelector("#categorias").insertAdjacentHTML(
          "beforeend",
          `
              <span class="cursor-pointer block border-b pb-3 mb-3">` +
            post[0]["node"]["categories"][i]["name"] +
            `</span><br>
            `
        );
      }
      //}

    }
  };
  xhr.send(JSON.stringify(yourQuery));
}

// varible para el slide de directivos
var coutTemp = 0;
var coutTempTwo = 0;
//
function initDirective(){
  for(var x = 0; x<5; x++){
    document.querySelector("#dire").insertAdjacentHTML(
      "beforeend",
      `<div class=" item `+ ( x<1 ? `active` : ``) +`">
        <img src="`+img[x]+`">
        <h3>`+cargo[x]+`</h3>
        <div class="texto">
          <p>`+nameDir[x]+`</p>
          <h1>`+lastName[x]+`</h1>
          <h2>`+cargo[x]+`</h2>
        </div>
      </div>`
    );
  }

  $(".item").click(function () {
    $(".item").removeClass("active");
    $(this).addClass("active");
  });
  coutTempTwo = x;
}

var select = document.getElementById('dire');
var element = document.getElementById("leftid"); 
element.onclick = function() {
  //$('#dire').find('div').first().remove();
  console.log('value', coutTemp)
  if(coutTemp > 0){
    coutTemp--;
    coutTempTwo--;
    $(".item").removeClass("active"); 
    
    document.querySelector("#dire").insertAdjacentHTML(
      "afterbegin",
      `<div class=" item">
        <img src="`+img[coutTemp]+`">
        <h3>`+cargo[coutTemp]+`</h3>
        <div class="texto">
          <p>`+nameDir[coutTemp]+`</p>
          <h1>`+lastName[coutTemp]+`</h1>
          <h2>`+cargo[coutTemp]+`</h2>
        </div>
      </div>`
    );
    $('#dire').find('div').first().addClass('active');
    select.removeChild(select.lastElementChild);
    
    $(".item").click(function () {
      $(".item").removeClass("active");
      $(this).toggleClass("active");
    });
  }
}

var element = document.getElementById("rigthid"); 
element.onclick = function() {
  //$('#dire').find('div').first().remove();
  console.log('value', coutTemp)
  if(coutTempTwo < 10){
    coutTemp++;
    coutTempTwo++;
    $(".item").removeClass("active");
    select.removeChild(select.firstElementChild);
    $(".item").removeClass("active"); 
   
    document.querySelector("#dire").insertAdjacentHTML(
      "beforeend",
      `<div class=" item active">
        <img src="`+img[(coutTempTwo-1)]+`">
        <h3>`+cargo[(coutTempTwo-1)]+`</h3>
        <div class="texto">
          <p>`+nameDir[(coutTempTwo-1)]+`</p>
          <h1>`+lastName[(coutTempTwo-1)]+`</h1>
          <h2>`+cargo[(coutTempTwo-1)]+`</h2>
        </div>
      </div>`
    );
   
    
    $(".item").click(function () {
      $(".item").removeClass("active");
      $(this).toggleClass("active");
    });
  }
  
}




// esta funcion se ejecuta en el body del index
function init() {
  getEvent(1);
  getPost();
  getSlider();
  //getBannerSlider()
  getBannersHome();
  getLogos()
  initDirective();
}

// esta funcion se ejecuta en el body de event
function initEvent() {
  getEvent(2);
  getBannerEvent();
}

// esta funcion se ejecuta en el body de event
function initNew() {
  getNew();
}

$(document).ready(function () {
 

  $(".boton").click(function () {
    //$(".slid").toggleClass("active");
   
  });

  $(".burguer").click(function () {
    $(".responsive-nav").toggleClass("active");
  });

  var result = (pourcentage * total) / 100;
  $(".pie").css("strokeDasharray", result);

  //funcion de la galeria de noticias
  $(".card").click(function () {
    $(this).toggleClass("active");
  });
});

var pourcentage = 80;
var total = 158;

//animacion de los textos GSAP
const textos = gsap.utils.toArray(".text");
textos.forEach((text) => {
  gsap.from(text, {
    opacity: 0,
    y: -50,
    delay: 0.3,
    ease: Expo.easeOut,
    duration: 1,
    scrollTrigger: {
      trigger: text,
      toggleActions: "restart none none reverse",
      start: "top 80%",
      //markers:true
    },
  });
});
