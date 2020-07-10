/*
    Carousel
*/
$('#carousel-example').on('slide.bs.carousel', function (e) {
    /*
        CC 2.0 License Iatek LLC 2018 - Attribution required
    */

    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 4;
    var totalItems = $('.carousel-item').length;

    if (idx >= totalItems - (itemsPerSlide - 1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i = 0; i < it; i++) {
            // append slides to end
            if (e.direction == "left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
});

// $('#carousel-example').carousel('pause')
// $('#carousel-example').carousel({
//     interval: 5000
// })

// $('#carousel-example').carousel({
//     wrap: false
// }).on('slid.bs.carousel', function () {
//     curSlide = $('.active');
//     if (curSlide.is(':first-child')) {
//         $('.left').hide();
//         $('.right').show();
//     } else if (curSlide.is(':last-child')) {
//         $('.right').hide();
//         $('.left').show();
//     } else {
//         $('.left').show();
//         $('.right').show();
//     }
// });
//
