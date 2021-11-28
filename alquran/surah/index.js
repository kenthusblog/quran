// Mengambil parameter nama dan nomer surat dari url
window.onload = function () {
   const parameter = document.location.href.split('?')[1].split('&');
   const nomerSurat = parameter[1].split('=')[1]

   // Request ke api dengan parameter yang sudah diambil
   $.ajax({
      url: `https://api.quran.sutanlab.id/surah/${nomerSurat}`,
      success: results => {
         // Mengecek apakah yang dihasilkan dari request API adalah JSON atau String
         results = typeof results == 'string' ? JSON.parse(results) : results

         const dataAyat = results.data.verses;
         const namaSurat = results.data.name.transliteration.id
         const jumlahsurat = results.data.numberOfVerses
         const golongansurat = results.data.revelation.id
         const tafsirsurat = results.data.tafsir.id
         const nama1surat = results.data.name.translation.id
         const arabsurat = results.data.name.short
         let fragmentDaftarAyat = '';

         $('.nama-surat').text(namaSurat);
         $('.jumlah-surat').text(jumlahsurat);
         $('.golongan-surat').text(golongansurat);
         $('.tafsir-surat').text(tafsirsurat);
         $('.nama1-surat').text(nama1surat);
         $('.arab-surat').text(arabsurat);
         $('title').text(`Moco Quran - Surah ${namaSurat}`)
         
         dataAyat.forEach(ayat => {
            const audio = ayat.audio.primary
            nomer = ayat.number.inSurah
            teksArab = ayat.text.arab
            teksLatin = ayat.text.transliteration.en
            arti = ayat.translation.id
            tafsir = ayat.tafsir.id.short
            suara = ayat.audio.primary

            fragmentDaftarAyat += `
               <div class="ayat p-3 p-sm-4">
               
     <div class='post-shareIcon facebook'>
     <a aria-label='Share button' expr:href='https://kenthus.netlify.app/alquran/surah/?nama=${arti}&nomer=${teksarab}' rel='nofollow noreferrer' role='button' target='_blank' title='Share to Facebook'>
<svg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'><path d='M24,3H8A5,5,0,0,0,3,8V24a5,5,0,0,0,5,5H24a5,5,0,0,0,5-5V8A5,5,0,0,0,24,3Zm3,21a3,3,0,0,1-3,3H17V18h4a1,1,0,0,0,0-2H17V14a2,2,0,0,1,2-2h2a1,1,0,0,0,0-2H19a4,4,0,0,0-4,4v2H12a1,1,0,0,0,0,2h3v9H8a3,3,0,0,1-3-3V8A3,3,0,0,1,8,5H24a3,3,0,0,1,3,3Z'/></svg>
                 </a>
                      </div>
               
               
               
               
               
               
               
               
               
                  <div class="mb-0 py-2 me-3">                 
              <h3 class="nomer-ayat text-center" style="font-style: italic;">${nomer}.</h3>
                     <span class="last-read far fa-bookmark" style="font-size: 1.8rem; cursor: pointer;"></span>
                  </div>
                  <div class="detail-ayat mb-2 w-100">
                     <h1 class="text-end m-0" style="font-weight: 600; line-height: 1.5;">${teksArab}</h1>
                      <div class="bacaan-ayat mb-3">
                        <audio controls>
                           <source src="${audio}">
                        </audio>
                     </div>
                     <div class="bacaan-latin" style="width: 100%; max-width: 700px;">
                        <h5 style="font-style: italic;">${teksLatin}</h5>
                     </div>
                     <div class="info-ayat mb-3 mb-sm-0" style="overflow: hidden;">
                        <div class="info mt-3" style="letter-spacing: 1px;">
                           <div class="arti mb-3">
                              <h6 class="m-0" style="font-weight: 600;">Arti:</h6>
                              <h6 class="m-0" style="font-weight: 400;">${arti}</h6>
                           </div>
                           <div class="tafsir">
                              <h6 class="m-0" style="font-weight: 600;">Tafsir:</h6>
                              <h6 class="m-0" style="font-weight: 400;">${tafsir}</h6>
                           </div>
                        </div>
                     </div>
                  </div>

                  <span class="expand-detail">
                     <img src="../../img/arrow-down.png">
                  </span>
               </div>
            `;
         })

         $('.daftar-ayat .container').html(fragmentDaftarAyat);

         document.querySelector('.autoplay').style.display = 'flex'

         // Lihat detail ayat saat tombol expand di click
         const expandDetail = document.querySelectorAll('.expand-detail');
         expandDetail.forEach(expand => {
            expand.addEventListener('click', function () {
               this.parentElement.querySelector('.info-ayat').classList.toggle('open');
               this.classList.toggle('open');

               if (this.parentElement.querySelector('.info-ayat').classList.contains('open')) {
                  const infoHeight = getComputedStyle(this.parentElement.querySelector('.info')).height;
                  this.parentElement.querySelector('.info-ayat').style.height = `calc(${infoHeight} + 2rem)`;
               } else {
                  this.parentElement.querySelector('.info-ayat').style.height = '0';
               }
            })
         });

         audioSetting();

         // Last-read labels
         const lastReadLabels = document.querySelectorAll('.ayat .last-read');
         if (JSON.parse(localStorage.getItem('Moco Quran')).bacaanTerakhir && JSON.parse(localStorage.getItem('Moco Quran')).bacaanTerakhir.nomerSurat == nomerSurat) {
            const bacaanAyatTerakhir = JSON.parse(localStorage.getItem('Moco Quran')).bacaanTerakhir.nomerAyat;
            lastReadLabels[bacaanAyatTerakhir].classList.add('fas')
            lastReadLabels[bacaanAyatTerakhir].classList.remove('far')

            // Loncat ke ayat yang terkahir dibaca
            let elementBacaanAyatTerakhir = $('.last-read.fas').parent().parent();
            $('html, body').animate({
               scrollTop: elementBacaanAyatTerakhir.offset().top - parseFloat(getComputedStyle(document.querySelector('nav')).height.replace('px', '')) - 20
            })
         }

         // Toggle label last-read saat di click
         for (let i = 0; i < lastReadLabels.length; i++) {
            lastReadLabels[i].addEventListener('click', function () {
               if (lastReadLabels[i].classList.contains('far')) {
                  this.classList.remove('far')
                  this.classList.add('fas')

                  for (let j = 0; j < lastReadLabels.length; j++) {
                     if (j != i) {
                        lastReadLabels[j].classList.remove('fas')
                        lastReadLabels[j].classList.add('far')
                     }
                  }

                  setBacaanTerakhir(parseInt(nomerSurat), i)
               } else {
                  this.classList.remove('fas')
                  this.classList.add('far')

                  const islamicBit = JSON.parse(localStorage.getItem('ISLAMIC BIT'))
                  delete islamicBit.bacaanTerakhir

                  setToLocalStorage(islamicBit)
               }
            })
         }
      }
   })
}

// Saat salah satu audio diputar, maka stop audio yang lain dipause
function audioSetting() {
   const audios = document.querySelectorAll('audio')
   for (let i = 0; i < audios.length; i++) {
      audios[i].addEventListener('play', function () {
         this.currentTime = 0;
         for (let j = 0; j < audios.length; j++) {
            if (j != i) {
               audios[j].pause();
            }
         }
      })
   }
}

// Membuat fitur autoplay
let indexAwal = 0;
let isPlayed = false;

document.querySelector('.autoplay').addEventListener('click', function () {
   if (this.classList.contains('fa-play')) {
      isPlayed = true;
      this.classList.remove('fa-play')
      this.classList.add('fa-pause')
      autoPlay(indexAwal)
   } else {
      isPlayed = false;
      this.classList.remove('fa-pause')
      this.classList.add('fa-play')
   }
})

function autoPlay(index) {
   const audios = document.querySelectorAll('audio');
   let indexPlayedAudio = index;
   if (indexPlayedAudio === document.querySelectorAll('.ayat').length) {
      document.querySelector('.autoplay').classList.remove('fa-pause')
      document.querySelector('.autoplay').classList.add('fa-play')
      return
   }

   // Auto scroll saat berganti audio bacaan ayat
   document.querySelectorAll('.ayat')[indexPlayedAudio].classList.add('current-play')
   const bacaanAyat = $('.current-play')
   $('html, body').animate({
      scrollTop: bacaanAyat.offset().top - parseFloat(getComputedStyle(document.querySelector('nav')).height.replace('px', '')) - 20
   })

   audios[indexPlayedAudio].play();
   const checkPlayedAudio = setInterval(() => {
      if (isPlayed) {
         if (audios[indexPlayedAudio].paused) {
            clearInterval(checkPlayedAudio)
            document.querySelectorAll('.ayat')[indexPlayedAudio].classList.remove('current-play')
            autoPlay(++indexPlayedAudio)
         }
      } else {
         indexAwal = indexPlayedAudio
         audios[indexPlayedAudio].pause()
      }
   }, 1);
}

// Mendapatakn surat dan ayat yang terkahir dibaca
if (!localStorage.getItem('moco Quran')) {
   localStorage.setItem('Moco Quran', JSON.stringify({}))
}

function setBacaanTerakhir(nomerSurat, nomerAyat) {
   const islamicBit = JSON.parse(localStorage.getItem('ISLAMIC BIT'))
   islamicBit.bacaanTerakhir = {
      nomerSurat: nomerSurat,
      nomerAyat: nomerAyat
   }
   setToLocalStorage(islamicBit)
}

function setToLocalStorage(value) {
   localStorage.setItem('Moco Quran', JSON.stringify(value))
}


// Auto last-read
// const navbarHeight = parseFloat(getComputedStyle(document.querySelector('nav')).height.replace('px', ''));
// const daftarAyatPadTop = parseFloat(getComputedStyle(document.querySelector('.daftar-ayat')).paddingTop.replace('px', ''));

// window.onscroll = function () {
//    const daftarAyat = document.querySelectorAll('.ayat');
//    const ayatMarBottom = parseFloat(getComputedStyle(document.querySelector('.ayat')).marginBottom.replace('px', ''));

//    const minOffsetLastRead = navbarHeight * -1 - daftarAyatPadTop - (ayatMarBottom / 3)
//    const maxOffsetLastRead = navbarHeight + daftarAyatPadTop + (ayatMarBottom / 3)

//    console.log(`${minOffsetLastRead} - ${maxOffsetLastRead}`)

//    daftarAyat.forEach((ayat, nomer) => {
//       console.log(`${nomer} : ${ayat.getBoundingClientRect().y}`)
//       if (ayat.getBoundingClientRect().y > minOffsetLastRead && ayat.getBoundingClientRect().y <= maxOffsetLastRead) {
//          ayat.classList.add('last-read')
//       } else {
//          ayat.classList.remove('last-read')
//       }
//    })
// }
