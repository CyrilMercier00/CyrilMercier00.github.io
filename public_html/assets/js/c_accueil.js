// ------------------------------ GRAPHIQUES -----------------------------------
(function ($)
{
    var date = new Date();
    var dataHeures = [date.getHours() - 1 + 'h', date.getHours() + 'h', date.getHours() + 1 + 'h'];

    // ------ CONFIGURATION GLOBALE DU GRAPHIQUE --------

    // Couleurs utilisées dans les grapgiques
    const ln_blue = 'rgba(80, 140, 200, 1)';

    const ln_vert = 'rgba(140, 210, 65, 1)';
    const bg_vert = 'rgba(140, 210, 65, 0.82)';
    const ln_jaune = 'rgba(220, 220, 60, 1)';
    const bg_jaune = 'rgba(220, 220, 60, 0.82)';
    const ln_orange = 'rgba(255, 160 55, 1)';
    const bg_orange = 'rgba(255, 160, 55, 0.82)';
    const ln_rouge = 'rgba(250, 66, 81, 1)';
    const bg_rouge = 'rgba(250, 66, 81, 0.82)';
    const transparent = 'transparent';

    // Fichier config principal
    config = {
        type: 'line',
        data: {
            labels: dataHeures,
            datasets: [
                {
                    label: 'Valeur des vibrations',
                    backgroundColor: transparent,
                    borderColor: ln_blue,
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 0,
                    data: [],
                    pointBackgroundColor: ln_blue
                },
                {
                    label: 'Seuil A',
                    backgroundColor: bg_vert,
                    borderColor: ln_vert,
                    pointHoverBackgroundColor: transparent,
                    borderWidth: 0,
                    pointRadius:0,
                    data: [],
                    pointBackgroundColor: transparent,
                    fill: 'origin'
                },
                {
                    label: 'Seuil B',
                    backgroundColor: bg_jaune,
                    borderColor: ln_jaune,
                    pointHoverBackgroundColor: transparent,
                    borderWidth: 0,
                    pointRadius:0,
                    data: [],
                    pointBackgroundColor: transparent,
                    fill: '-1'
                },
                {
                    label: 'Seuil C',
                    backgroundColor: bg_orange,
                    borderColor: ln_orange,
                    pointHoverBackgroundColor: transparent,
                    borderWidth: 0,
                    pointRadius:0,
                    data: [],
                    pointBackgroundColor: transparent,
                    fill: '-1'
                },
                {
                    label: 'Seuil D',
                    backgroundColor: bg_rouge,
                    borderColor: transparent,
                    pointHoverBackgroundColor: transparent,
                    borderWidth: 0,
                    pointRadius:0,
                    data: [],
                    pointBackgroundColor: transparent,
                    fill: '-1'
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
                            fontSize: 11
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
    };

    try
    {
        var ctx = document.getElementById("graphCapteur1");
        if (ctx)
        {
            ctx.height = 230;
            var myChart = new Chart(ctx, config);
        }

    } catch (error)
    {
        console.log(error);
    }





    function rafraichirGraphiques()
    {
        getValVibrations(1);
        getValSeuil(1);
        myChart.update();
    }

    setInterval(rafraichirGraphiques, 1000);





    function getValVibrations(prmIdCapteur)
    {
        url = 'http://localhost:82/vibration/index.php/REST/vibration/' + prmIdCapteur;

        // Recuperation des valeurs pour le capteur
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: function (result)
            {
                myChart.data.datasets[0].data = [];     // Vider les anciennes données
                for (i = 0; i < result.length; i++)     // Les remplacer par les nouvelles
                {
                    myChart.data.datasets[0].data.push(result[i]['valeur']);
                }
            }
        });
    }





    function getValSeuil(prmOrdreMoteur)
    {
        url = 'http://localhost:82/vibration/index.php/REST/norme/' + prmOrdreMoteur;

        // Recuperation des valeurs pour le seuil
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: function (result)
            {
                // Vide les anciennes données
                myChart.data.datasets[1].data = [];
                myChart.data.datasets[2].data = [];
                myChart.data.datasets[3].data = [];

                // Remplacer le seuil sur toute la longueur de la courbe
                for (i = 0; i < myChart.data.datasets[0].data.length; i++)
                {
                    myChart.data.datasets[1].data.push(result[1]['seuil']);
                    myChart.data.datasets[2].data.push(result[2]['seuil']);
                    myChart.data.datasets[3].data.push(result[3]['seuil']);
                    myChart.data.datasets[4].data.push(6);
                }
                console.log(myChart.data.datasets[1]);
            }
        });
    }
    
})(jQuery);
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