// ------------------------------ GRAPHIQUES -----------------------------------
(function ($) {
    const site_url = $('#url_js').val(); // Adresse du site
    const base_url = $('#url2_js').val();// Adresse du site sans index


    /*  ---------------------------------
     *  ----------- Graphiques ----------
     *  --------------------------------- */

    const valVibrationsMax = 6;  // Hauteur du graphiqie

    var arrayChart = [];                 // Array contenant les graphiques crées
    var arrayConfig = [];                // Array contenant les config pour les graphiques   
    var seuil = [];                      // Array contenant les seuils récupérés 
    var nbCapteurs = 0;                  // Nombre max de capteurs
    
    var numMachine = parseInt(window.location.pathname.split("/").pop()); // Extraire le numero du moteur
    
    //Heure pour le label
    var date = new Date();
    var dataHeures = [];
    
    // Couleur utilisées dans le graphique
    const ln_blue = 'rgba(80, 140, 200, 1)';
    const ln_vert = 'rgba(140, 210, 65, 1)';
    const ln_jaune = 'rgba(220, 220, 60, 1)';
    const ln_orange = 'rgba(255, 160 55, 1)';
    const ln_rouge = 'rgba(250, 66, 81, 1)';
    const bg_vert = 'rgba(140, 210, 65, 0.82)';
    const bg_jaune = 'rgba(220, 220, 60, 0.82)';
    const bg_orange = 'rgba(255, 160, 55, 0.82)';
    const bg_rouge = 'rgba(250, 66, 81, 0.82)';
    const transparent = 'transparent';

    // Code html a inserer pour créer un graphique, separé pouvoir inserer des données
    var code_html1 = "<div class='col-lg-8'> \n\
    <div class='au-card recent-report'> \n\
    <div class='au-card-inner'> \n\
    <h3 class='title-2'>";

    var code_html2 = "</h3> \n\
    <div class='recent-report__chart'> \n\
    <canvas id='graphCapteur";

    var code_html3 = "'></canvas> \n\
    </div> \n\
    </div> \n\
    </div> \n\
    </div>";

    // ------ Creer une config pour chaque graph ------
    function getNewConfig()
    {

        // --- Début fichier config du graphiqe  ---
        config = {
            type: 'line',
            data: {
                labels: dataHeures, datasets: [
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
                        pointRadius: 0,
                        data: [],
                        pointBackgroundColor: transparent,
                        fill: '+1'
                    },
                    {
                        label: 'Seuil B',
                        backgroundColor: bg_jaune,
                        borderColor: ln_jaune,
                        pointHoverBackgroundColor: transparent,
                        borderWidth: 0,
                        pointRadius: 0,
                        data: [],
                        pointBackgroundColor: transparent,
                        fill: '+1'
                    },
                    {
                        label: 'Seuil C',
                        backgroundColor: bg_orange,
                        borderColor: ln_orange,
                        pointHoverBackgroundColor: transparent,
                        borderWidth: 0,
                        pointRadius: 0,
                        data: [],
                        pointBackgroundColor: transparent,
                        fill: '+1'
                    },
                    {
                        label: 'Seuil D',
                        backgroundColor: bg_rouge,
                        borderColor: transparent,
                        pointHoverBackgroundColor: transparent,
                        borderWidth: 0,
                        pointRadius: 0,
                        data: [],
                        pointBackgroundColor: transparent,
                        fill: 'end'
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
                                display: false,
                                drawOnChartArea: true,
                                color: '#f2f2f2'
                            },
                            ticks: {
                                fontFamily: "Poppins",
                                fontSize: 11,
                                beginAtZero: true
                            }
                        }],
                    yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                maxTicksLimit: 5,
                                stepSize: 1,
                                max: valVibrationsMax,
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
                        radius: 0,
                        hoverRadius: 4,
                        hoverBorderWidth: 3,
                        backgroundColor: '#333'
                    }
                },
                tooltips: {
                    mode: 'y'
                }
            }
        };
        // --- Fin fichier config du graphiqe  ---

        arrayConfig.push(config);
        return arrayConfig[arrayConfig.length - 1];  // Derniere valeur
    }
    // ------------------------------------------------ 
})(jQuery);