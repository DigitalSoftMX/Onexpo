$('.slider-noticias').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
    dots:false,
    autoplay: false,
    autoplaySpeed: 4000,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
    pauseOnHover:false
});


$('.slider-info').slick({
  pauseOnHover:false,
  dots: false,
  arrows:false,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 1800,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '60px',
  variableWidth: true
});

$('.prev').click(function () {
  $('.slid').toggleClass('prev');
});

$('.next').click(function () {
  $('.slid').toggleClass('next');
});

$('.burguer').click(function () {
  $('.menu').toggleClass('active');
  $('.burguer').toggleClass('active');
});

$('.tarjas').hover(function () {
  $('.tarjas-list').toggleClass('hide');
});


//funcion para rotar el slider 3D
let current_rotation = 0;
$(".arrow-left").click(function () {
  current_rotation += 72;
  document.querySelector("#carousel").style.transform = 'rotateY(' + current_rotation + 'deg)';
});

$(".arrow-right").click(function () {
  current_rotation -= 72;
  document.querySelector("#carousel").style.transform = 'rotateY(' + current_rotation + 'deg)';
});

const counterz = document.querySelectorAll('.value');
const speedz = 1000;

counterz.forEach( counter => {
   const animate = () => {
      const value = +counter.getAttribute('akhi');
      const data = +counter.innerText;
     
      const time = value / speedz;
     if(data < value) {
          counter.innerText = Math.ceil(data + time);
          setTimeout(animate, 1);
        }else{
          counter.innerText = value;
        }
     
   }
   
   animate();
});


 async function getEvent(option) {
  temp = false;
  const yourServerUrl = 'https://api-us-east-1.graphcms.com/v2/ckxrslv5g1dga01z93loq8v5e/master'
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
      `
  };

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('POST', yourServerUrl,true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onloadend = function() {             
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
      console.log(xhr.response);
      if(option == 1){

        document.getElementById('titleEvent').innerHTML = xhr.response['data']['event'][0]['titleEvent'];
        document.getElementById('short_description').innerHTML = xhr.response['data']['event'][0]['short_description'];
      
        var element = document.getElementById('eventBackground');
        element.style['background-image'] = 'url('+xhr.response['data']['event'][0]['front_page']['url']+')';
  
      }else{
        document.getElementById('titleEvent').innerHTML = xhr.response['data']['event'][0]['titleEvent'];
        document.getElementById('description').innerHTML = xhr.response['data']['event'][0]['description'];
        //var tempDate = xhr.response['data']['event'][0]['date_event'].split("T", 3);
        //document.getElementById('date').innerHTML = tempDate[0];

        var image = document.getElementById("eventBackground");
        image.src = xhr.response['data']['event'][0]['back_page']['url'];

      }
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
}


$(document).ready(function() {
  $(".item").click(function () {
      $(".item").removeClass("active");
      $(this).addClass("active");   
  });

  $(".burguer").click(function () {
    $(".responsive-nav").toggleClass("active");
  });

  var result = ((pourcentage * total) / 100);
  $('.pie').css('strokeDasharray', result);


  //funcion de la galeria de noticias
  $(".card").click(function () {
    $(this).toggleClass("active");   
  });

});


var pourcentage = 80;
var total = 158;


//animacion de los textos GSAP
const textos = gsap.utils.toArray('.text');
textos.forEach(text => {
  gsap.from(text, { 
    opacity:0,
    y:-50, 
    delay:.3,
    ease: Expo.easeOut,
    duration: 1,
    scrollTrigger: {
      trigger: text,
      toggleActions:"restart none none reverse",
      start:"top 80%",
      //markers:true
    }
  })
});

