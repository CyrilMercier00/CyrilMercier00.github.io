// ------------------------------ GRAPHIQUES -----------------------------------
$(document).ready(function ()
{
    chargerGraphiques();
    
    // Rafraichir le graphique
    setInterval(rafraichirGraphiques() , 1000);

    function chargerGraphiques()
    {
        try
        {
            const bd_brandProduct3 = 'rgba(0,181,233,0.9)';
            const ln_blue = 'rgba(0,173,95,0.9)';
            const bg_vert = 'rgba(137, 209, 66, 0.72)';
            const transparent = 'transparent';

            var dataVibration = [];  // Contient la valeur des 12 dernieres 
            getValeurVibration(1, dataVibration);

            var dataSeuils = [];    // Contient la valeur de tous les suils
            var dataSeuilA = [];    // Contient la valeur du seuil A
            var dataSeuilB = [];    // Contient la valeur du seuil B
            var dataSeuilC = [];    // Contient la valeur du seuil C

            // Demande et sauvegarde de la valeur des seuils
            getValeurSeuil(1, dataSeuils);
            dataSeuilA = dataSeuils[1];
            dataSeuilB = dataSeuils[1];
            dataSeuilC = dataSeuils[2];

            var ctx = document.getElementById("graphCapteur1");
            if (ctx) {
                ctx.height = 230;
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', ''],
                        datasets: [
                            {
                                label: 'Valeur des vibrations',
                                backgroundColor: transparent,
                                borderColor: ln_blue,
                                pointHoverBackgroundColor: '#fff',
                                borderWidth: 0,
                                data: dataVibration,
                                pointBackgroundColor: ln_blue
                            },
                            {
                                label: 'Seuil A',
                                backgroundColor: bg_vert,
                                borderColor: bd_brandProduct3,
                                pointHoverBackgroundColor: '#fff',
                                borderWidth: 0,
                                data: dataSeuilA,
                                pointBackgroundColor: bd_brandProduct3

                            }
                        ]
                    },
                    options: {
                        maintainAspectRatio: false,
                        legend: {
                            display: false
                        },
                        responsive: true,
                        scales: {
                            xAxes: [{
                                    gridLines: {
                                        drawOnChartArea: true,
                                        color: '#f2f2f2'
                                    },
                                    ticks: {
                                        fontFamily: "Poppins",
                                        fontSize: 12
                                    }
                                }],
                            yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        maxTicksLimit: 5,
                                        stepSize: 1,
                                        max: 6,
                                        fontFamily: "Poppins",
                                        fontSize: 11
                                    },
                                    gridLines: {
                                        display: false,
                                        color: '#f2f2f2'
                                    }
                                }]
                        },
                        elements: {
                            point: {
                                radius: 3,
                                hoverRadius: 4,
                                hoverBorderWidth: 3,
                                backgroundColor: '#333'
                            }
                        }


                    }
                });
            }
        } catch (error) {
            console.log(error);
        }

    }
});

function getValeurVibration(prmNumVibration, prmDataArray) 
{
    url = 'http://localhost:82/vibration/index.php/REST/vibration/' + prmNumVibration;

    // Recuperation des valeurs pour le capteur
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (data)
        {
            // Sauvegarder les valeurs dans un array
            for (var i = 0; i < data.length; i++)
            {
                prmDataArray[i] = data[i]['valeur'];
            }
        },
        error: function (xhr, status, error)
        {
            console.log("erreur fonction getValeurVibration: " + xhr.responseText);
        }
    });
}

function getValeurSeuil(prmOrdre, prmDataArray) 
{
    url = 'http://localhost:82/vibration/index.php/REST/norme/' + prmOrdre;

    // Recuperation des valeurs pour le capteur
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (data)
        {
            // Sauvegarder les valeurs dans un array
            for (var i = 0; i < data.length; i++)
            {
                prmDataArray[i] = data[i]['seuil'];
            }
        },
        error: function (xhr, status, error)
        {
            console.log("erreur fonction getValeurVibration: " + xhr.responseText);
        }
    });
}

function rafraichirGraphiques()
{
    // TODO
}
// ------------------------- ANIMATION CHARGEMENT PAGE -------------------------
(function ($) {
    // USE STRICT
    "use strict";
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 900,
        outDuration: 900,
        linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([class^="chosen-single"])',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'page-loader',
        loadingInner: '<div class="page-loader__spin"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: ['animation-duration', '-webkit-animation-duration'],
        overlay: false,
        overlayClass: 'animsition-overlay-slide',
        overlayParentElement: 'html',
        transition: function (url) {
            window.location.href = url;
        }
    });
})(jQuery);
// ------------------------------ AFFICHAGE MENU -------------------------------
(function ($) {
    // USE STRICT
    "use strict";
    // Dropdown 
    try {
        var menu = $('.js-item-menu');
        var sub_menu_is_showed = -1;
        for (var i = 0; i < menu.length; i++) {
            $(menu[i]).on('click', function (e) {
                e.preventDefault();
                $('.js-right-sidebar').removeClass("show-sidebar");
                if (jQuery.inArray(this, menu) === sub_menu_is_showed) {
                    $(this).toggleClass('show-dropdown');
                    sub_menu_is_showed = -1;
                } else {
                    for (var i = 0; i < menu.length; i++) {
                        $(menu[i]).removeClass("show-dropdown");
                    }
                    $(this).toggleClass('show-dropdown');
                    sub_menu_is_showed = jQuery.inArray(this, menu);
                }
            });
        }
        $(".js-item-menu, .js-dropdown").click(function (event) {
            event.stopPropagation();
        });
        $("body,html").on("click", function () {
            for (var i = 0; i < menu.length; i++) {
                menu[i].classList.remove("show-dropdown");
            }
            sub_menu_is_showed = -1;
        });
    } catch (error) {
        console.log(error);
    }

    var wW = $(window).width();
    // Right Sidebar
    var right_sidebar = $('.js-right-sidebar');
    var sidebar_btn = $('.js-sidebar-btn');
    sidebar_btn.on('click', function (e) {
        e.preventDefault();
        for (var i = 0; i < menu.length; i++) {
            menu[i].classList.remove("show-dropdown");
        }
        sub_menu_is_showed = -1;
        right_sidebar.toggleClass("show-sidebar");
    });
    $(".js-right-sidebar, .js-sidebar-btn").click(function (event) {
        event.stopPropagation();
    });
    $("body,html").on("click", function () {
        right_sidebar.removeClass("show-sidebar");
    });
    // Sublist Sidebar
    try {
        var arrow = $('.js-arrow');
        arrow.each(function () {
            var that = $(this);
            that.on('click', function (e) {
                e.preventDefault();
                that.find(".arrow").toggleClass("up");
                that.toggleClass("open");
                that.parent().find('.js-sub-list').slideToggle("250");
            });
        });
    } catch (error) {
        console.log(error);
    }


    try {
        // Hamburger Menu
        $('.hamburger').on('click', function () {
            $(this).toggleClass('is-active');
            $('.navbar-mobile').slideToggle('500');
        });
        $('.navbar-mobile__list li.has-dropdown > a').on('click', function () {
            var dropdown = $(this).siblings('ul.navbar-mobile__dropdown');
            $(this).toggleClass('active');
            $(dropdown).slideToggle('500');
            return false;
        });
    } catch (error) {
        console.log(error);
    }
})(jQuery);
// ------------------------------ LOAD MORE --------------------------------
(function ($) {
    // USE STRICT
    "use strict";
    // Load more
    try {
        var list_load = $('.js-list-load');
        if (list_load[0]) {
            list_load.each(function () {
                var that = $(this);
                that.find('.js-load-item').hide();
                var load_btn = that.find('.js-load-btn');
                load_btn.on('click', function (e) {
                    $(this).text("Loading...").delay(1500).queue(function (next) {
                        $(this).hide();
                        that.find(".js-load-item").fadeToggle("slow", 'swing');
                    });
                    e.preventDefault();
                });
            });
        }
    } catch (error) {
        console.log(error);
    }

})(jQuery);