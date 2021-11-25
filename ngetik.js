const txtElement = ['Akses Kapan Saja', 'Dimana Saja', 'dan Gratis tentunya'];
let cont = 0;
let txtIndex = 0;
let currentTxt = ' ';
let words = ' ';

(function ngetik(){
  
    if (cont == txtElement.length) {
        cont = 0;
    }
    
    currentTxt = txtElement[cont];
    
    words = currentTxt.slice(0, ++txtIndex);
    document.querySelector('.efek-ngetik').textContent = words;
    
    if(words.length == currentTxt.length){
        cont++;
        txtIndex = 0;
    }
    
    setTimeout(ngetik, 200);
    
    
}) ();
