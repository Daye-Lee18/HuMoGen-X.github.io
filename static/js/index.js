window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
// var NUM_INTERP_FRAMES = 240;
var NUM_INTERP_FRAMES = 101;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 1; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' +'rose' + String(i).padStart(4, '0') + '.png';
    // var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})


// window.HELP_IMPROVE_VIDEOJS = false;

// var INTERP_BASE_MAIN  = "./static/interpolation/stacked"; // A세트 경로
// var INTERP_BASE_GHOST = "./static/interpolation/ghost";   // B세트 경로

// var NUM_MAIN_FRAMES   = 301;  // A세트 개수
// var NUM_GHOST_FRAMES  = 5;    // B세트 개수
// var K = NUM_GHOST_FRAMES;     // 키프레임 개수 = 고스트 개수(가정)
// var start_num = 1; 

// var main_images  = [];
// var ghost_images = [];
// var keyframe_indices = [];

// // evenly spaced keyframes (예: 300,5 -> [0, 75, 150, 225, 299])
// function computeKeyframes(total, K) {
//   if (K <= 0) return [0];
//   var idxs = [];
//   for (var i = start_num; i < K; i++) {
//     var pos = Math.round(i * (total - 1) / (K - 1));
//     idxs.push(pos);
//   }
//   return idxs;
// }

// function preloadImages() {
//   // A세트(메인) 프레임: rose0000.png ~ rose0299.png
//   for (var i = start_num; i < NUM_MAIN_FRAMES; i++) {
//     var fname = "rose" + String(i).padStart(4, "0") + ".png";
//     var img = new Image();
//     img.src = INTERP_BASE_MAIN + "/" + fname;
//     img.onerror = function(){ console.warn("Main image load fail:", this.src); };
//     main_images[i] = img;
//   }

//   // B세트(고스트) 프레임:
//   // 1) 파일명이 ghost0.png ~ ghost4.png 라면:
//   for (var j = start_num; j < NUM_GHOST_FRAMES; j++) {
//     var gname = "rose" + String(j).padStart(4, "0") + ".png";
//     var gimg = new Image();
//     gimg.src = INTERP_BASE_GHOST + "/" + gname;
//     gimg.onerror = function(){ console.warn("Ghost image load fail:", this.src); };
//     ghost_images[j] = gimg;
//   }

//   // 2) 만약 고스트도 rose0000.png ~ rose0004.png 라면 위 루프를 이렇게 바꾸세요:
//   // for (var j = 0; j < NUM_GHOST_FRAMES; j++) {
//   //   var gname = "rose" + String(j).padStart(4, "0") + ".png";
//   //   ...
//   // }

//   keyframe_indices = computeKeyframes(NUM_MAIN_FRAMES, NUM_GHOST_FRAMES);
//   console.log("Keyframes:", keyframe_indices);
// }

// function renderFrame(i) {
//   var wrapper = document.getElementById("interpolation-image-wrapper");
//   if (!wrapper) return;
//   wrapper.innerHTML = "";

//   // 메인 프레임
//   var base = main_images[i];
//   if (!base) return;
//   var main = base.cloneNode(true);
//   main.className = "main-img";
//   wrapper.appendChild(main);

//   // 키프레임이면 고스트도 겹치기
//   var kIdx = keyframe_indices.indexOf(i);
//   if (kIdx !== -1 && ghost_images[kIdx]) {
//     var ghost = ghost_images[kIdx].cloneNode(true);
//     ghost.className = "ghost-img";
//     wrapper.appendChild(ghost);
//   }
// }

// DOM 로드 후 초기화
// document.addEventListener("DOMContentLoaded", function(){
//   preloadImages();
//   var slider = document.getElementById("interpolation-slider");
//   if (slider) {
//     slider.max = NUM_MAIN_FRAMES - 1;
//     slider.addEventListener("input", function(e){
//       var v = parseInt(e.target.value || "0", 10);
//       renderFrame(v);
//     });
//   }
//   renderFrame(0);
// });

// // ====== Navbar & Carousel ======
// document.addEventListener("DOMContentLoaded", function () {
//   // Navbar burger
//   var burgers = document.querySelectorAll(".navbar-burger");
//   burgers.forEach(function (b) {
//     b.addEventListener("click", function () {
//       b.classList.toggle("is-active");
//       var target = document.getElementById(b.dataset.target || "navMenu");
//       if (target) target.classList.toggle("is-active");
//     });
//   });

//   // bulmaCarousel
//   if (window.bulmaCarousel) {
//     bulmaCarousel.attach(".carousel", {
//       slidesToScroll: 1,
//       slidesToShow: 3,
//       loop: true,
//       infinite: true,
//       autoplay: false,
//       autoplaySpeed: 3000,
//       breakpoints: [
//         { changePoint: 1024, slidesToShow: 3, slidesToScroll: 1 },
//         { changePoint: 768,  slidesToShow: 2, slidesToScroll: 1 },
//         { changePoint: 480,  slidesToShow: 1, slidesToScroll: 1 },
//       ],
//     });
//   }

//   // bulmaSlider
//   if (window.bulmaSlider) bulmaSlider.attach();

//   // ====== Interpolation (메인 + 키프레임에서만 고스트) ======
//   const INTERP_BASE_MAIN  = "./static/interpolation/stacked"; // A세트(전체 300장)
//   const INTERP_BASE_GHOST = "./static/interpolation/ghost";   // B세트(고스트 5장)

//   const NUM_MAIN_FRAMES  = 300;
//   const NUM_GHOST_FRAMES = 5;

//   const mainImages  = new Array(NUM_MAIN_FRAMES);
//   const ghostImages = new Array(NUM_GHOST_FRAMES);
//   let keyframeIndices = [];

//   function computeKeyframes(total, k) {
//     if (k <= 1) return [0];
//     const idxs = [];
//     for (let i = 0; i < k; i++) {
//       idxs.push(Math.round(i * (total - 1) / (k - 1)));
//     }
//     return idxs;
//   }

//   function preloadImages() {
//     // 메인 프레임: rose0000.png ~ rose0299.png
//     for (let i = 0; i < NUM_MAIN_FRAMES; i++) {
//       const img = new Image();
//       img.src = `${INTERP_BASE_MAIN}/rose${String(i).padStart(4, "0")}.png`;
//       mainImages[i] = img;
//     }

//     // 고스트 프레임: ghost0.png ~ ghost4.png (원하는 패턴에 맞춰 변경해도 됨)
//     for (let j = 0; j < NUM_GHOST_FRAMES; j++) {
//       const gimg = new Image();
//       gimg.src = `${INTERP_BASE_GHOST}/ghost${j}.png`;
//       ghostImages[j] = gimg;
//     }

//     keyframeIndices = computeKeyframes(NUM_MAIN_FRAMES, NUM_GHOST_FRAMES);
//     // console.log("Keyframes:", keyframeIndices);
//   }

//   function renderFrame(i) {
//     const wrapper = document.getElementById("interpolation-image-wrapper");
//     if (!wrapper) return;
//     wrapper.innerHTML = "";

//     // 메인
//     const base = mainImages[i];
//     if (base) {
//       const mainNode = base.cloneNode(true);
//       mainNode.className = "main-img";
//       wrapper.appendChild(mainNode);
//     }

//     // 키프레임이면 고스트도 겹치기
//     const kIdx = keyframeIndices.indexOf(i);
//     if (kIdx !== -1 && ghostImages[kIdx]) {
//       const ghostNode = ghostImages[kIdx].cloneNode(true);
//       ghostNode.className = "ghost-img"; // CSS에서 absolute + opacity 스타일 필요
//       wrapper.appendChild(ghostNode);
//     }
//   }

//   // 성능을 위한 rAF 디바운스
//   let rafPending = false;
//   let lastVal = 0;
//   function onSlider(val) {
//     lastVal = parseInt(val || "0", 10);
//     if (rafPending) return;
//     rafPending = true;
//     requestAnimationFrame(() => {
//       renderFrame(lastVal);
//       rafPending = false;
//     });
//   }

//   // 초기화
//   preloadImages();

//   const slider = document.getElementById("interpolation-slider");
//   if (slider) {
//     slider.max = String(NUM_MAIN_FRAMES - 1);
//     slider.addEventListener("input", (e) => onSlider(e.target.value));
//     renderFrame(0);
//   }
// });
