/*!
 * Dark Mode Switch v1.0.1 (https://github.com/coliff/dark-mode-switch)
 * Copyright 2021 C.Oliff
 * Licensed under MIT (https://github.com/coliff/dark-mode-switch/blob/main/LICENSE)
 */

var darkSwitch = document.getElementById("darkSwitch");
window.addEventListener("load", function () {
  if (darkSwitch) {
    initTheme();
    darkSwitch.addEventListener("change", function () {
      resetTheme();
    });
  }
});

/**
 * Summary: function that adds or removes the attribute 'data-theme' depending if
 * the switch is 'on' or 'off'.
 *
 * Description: initTheme is a function that uses localStorage from JavaScript DOM,
 * to store the value of the HTML switch. If the switch was already switched to
 * 'on' it will set an HTML attribute to the body named: 'data-theme' to a 'dark'
 * value. If it is the first time opening the page, or if the switch was off the
 * 'data-theme' attribute will not be set.
 * @return {void}
 */
function initTheme() {
  var darkThemeSelected =
    localStorage.getItem("darkSwitch") !== null &&
    localStorage.getItem("darkSwitch") === "dark";
  darkSwitch.checked = darkThemeSelected;
  darkThemeSelected
    ? document.body.setAttribute("data-theme", "dark")
    : document.body.removeAttribute("data-theme");
}

/**
 * Summary: resetTheme checks if the switch is 'on' or 'off' and if it is toggled
 * on it will set the HTML attribute 'data-theme' to dark so the dark-theme CSS is
 * applied.
 * @return {void}
 */
function resetTheme() {
  if (darkSwitch.checked) {
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("darkSwitch", "dark");
  } else {
    document.body.removeAttribute("data-theme");
    localStorage.removeItem("darkSwitch");
  }
}



$(document).ready(function () {
  $('#theme_toggle').on('click', function () {
    if ($('body').hasClass('dark-theme')) {
      $(this).toggleClass('btn-light');
      $(this).addClass('btn-dark');
      $('h1').html("Light Mode");
      $('body').toggleClass('dark-theme');
      $('.card').toggleClass('dark-theme');
      localStorage.setItem("mode", "light-theme");
    } else {
      $(this).toggleClass('btn-light');
      $(this).removeClass('btn-dark');
      $('h1').html("Dark Mode");
      $('body').toggleClass('dark-theme');
      $('.card').toggleClass('dark-theme');
      localStorage.setItem("mode", "dark-theme");
    }
  })
  //check for localStorage, add as browser preference if missing
  if (!localStorage.getItem("mode")) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      localStorage.setItem("mode", "dark-theme");
    } else {
      localStorage.setItem("mode", "light-theme");
    }
  }
  //set interface to match localStorage
  if (localStorage.getItem("mode") == "dark-theme") {
    $('#theme_toggle').removeClass('btn-dark');
    $('#theme_toggle').addClass('btn-light');
    $('body').addClass('dark-theme');
    $('.card').addClass('dark-theme');
    $('h1').html("Dark Mode");
    document.getElementById("theme_toggle").checked = true;
  } else {
    $('#theme_toggle').addClass('btn-dark');
    $('#theme_toggle').removeClass('btn-light');
    $('body').removeClass('dark-theme');
    $('.card').removeClass('dark-theme');
    $('h1').html("Light Mode");
    document.getElementById("theme_toggle").checked = false;
  };
});












