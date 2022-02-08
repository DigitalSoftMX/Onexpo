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

