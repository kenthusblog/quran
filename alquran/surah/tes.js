$(document).ready(function() {
                $("a.one").on("click", function(e) {
                    e.preventDefault();
                    $(this).simplePopup();
                });
            });
