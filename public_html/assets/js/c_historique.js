(function ($) {
    const site_url = $('#url_js').val();    // Adresse du site
    const base_url = $('#url2_js').val();   // Adresse du site sans index
    const valVibrationsMax = 6;             // Hauteur du graphique

    var arrayChart = [];    // Array contenant les graphiques crées 
    var arrayConfig = [];   // Array contenant les config pour les graphiques   
    var seuil = [];         // Array contenant les seuils récupérés 
    var moteurs;            // Resultat de la requete ajax sur les moteurs
    var nbrCapteurs;        // Nombre de capteurs pour la machine

    var numMachine = parseInt(window.location.pathname.split("/").pop()); // Extraire le numero de la machine depui l'url

    // Code html pour creer un graphique. 
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
    </div>\n\
    </div>";

    //Heure pour le label
    var date = new Date();
    var dataHeures = [];

    // Couleurs utilisées dans les grapgiques
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

    // --------------------------------------------
    // --------  DEBUT programme principal  -------
    // --------------------------------------------
    getMoteur();
    // --------------------------------------------
    // --------   FIN programme principal  --------
    // --------------------------------------------



    // ------ Recuperer les infos sur les moteurs ------
    function getMoteur() {
        url = site_url + '/REST/moteur/' + numMachine;
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: function (result) {
                moteurs = result;
                getCapteurs();
            }
        });
    }
    // -------------------------------------------



    // ------ Recuperer les capteurs ------
    function getCapteurs() {

        url = site_url + "REST/machine/" + numMachine;

        $.ajax({
            type: "GET",
            async: false,
            url: url,
            dataType: "json",
            success: function (result) {
                if (result.length > 0) {

                    nbrCapteurs = result.length;

                    for (i = 0; i < nbrCapteurs; i++) {

                        freqence = result[i]['freqMesure'];

                        // Creation du graphique
                        $("#divGraph").append(code_html1 + result[i]['fonction'] + code_html2 + i + code_html3);

                        var ctx = document.getElementById("graphCapteur" + [i]);

                        if (ctx) {
                            ctx.height = 230;
                            arrayChart.push(new Chart(ctx, getNewConfig()));
                        }

                        initTime(freqence, i);
                    }

                    getValSeuil();
                    updateData();

                } else {
                    // Afficher un message si il n'y a aucun capteur
                    $("#divGraph").append('<figure> \n\
                        <img src="' + base_url + '/assets/images/icon/supersad.png" class="img-fluid mx-auto d-block"> \n\
                        <figcaption> <br> Il n\'y a aucun capteur pour cette machine. </figcaption> \n\
                        </figure> ');
                    $("#divGraph").css("margin-top", "5%");
                }

            }
        });
    }
    // -------------------------------------------



    // ------ Recuperer les valeurs du seuil ------
    function getValSeuil() {

        url = site_url + 'REST/norme/1';

        $.ajax({
            type: "GET",
            async: false,
            url: url,
            dataType: "json",
            success: function (result) {
                for (i = 0; i < result.length; i++) {
                    seuil[i] = result[i]['seuil'];
                }

                // Afficher les seuils sur tous les graphique
                for (i = 0; i < arrayConfig.length; i++) // Pour tous les graph
                {
                    for (j = 0; j < arrayConfig[i].data.labels.length; j++) // Pour tout les labels
                    {
                        // Ajouter la valeurs du seuil
                        arrayConfig[i].data.datasets[1].data.push(seuil[0]);
                        arrayConfig[i].data.datasets[2].data.push(seuil[1]);
                        arrayConfig[i].data.datasets[3].data.push(seuil[2]);
                        arrayConfig[i].data.datasets[4].data.push(seuil[3]);
                    }
                }
                initCalendrier();
            }
        });
    }
    // --------------------------------------------



    // ------ Initialiser l'input date------
    function initCalendrier() {
        // Initialiser le calendrier
        for (i = 0; i < nbrCapteurs; i++) {
            $("#choixDate").on('change', updateData);
            document.getElementById("choixDate").value = date.toISOString().slice(0, 10);
        }

        for (i = 0; i < arrayChart.length; i++) {
            arrayChart[i].update(); // Mise a jour de donnéess
        }
    }




    // ------ MAJ des donnes quand changement de date ------
    function updateData() {

        dates_url = document.getElementById("choixDate").value.split("-");

        url = site_url + 'REST/vibration/' + numMachine + "/" + dates_url[0] + dates_url[1] + dates_url[2];

        $.ajax({
            type: "GET",
            async: false,
            url: url,
            dataType: "json",
            success: succesUpdate
        });

    }





    function succesUpdate(prmResult) {

        clearGraph();

        if (prmResult.length) {
            var indexChart = 0; // Index du graphique dans l'array
            var idMoteurMin = parseInt(prmResult[0]['idMoteur']); // Id du moteur min recupéré

            // Ajouter les données
            for (i = 0; i < prmResult.length; i++) {

                if (idMoteurMin === parseInt(prmResult[i]['idMoteur'])) {
                    arrayConfig[indexChart].data.datasets[0].data.push(prmResult[i]['valeur']);
                } else {
                    indexChart = indexChart + 1;
                    do {
                        idMoteurMin = idMoteurMin + 1;
                    } while (idMoteurMin < prmResult[i]['idMoteur']);
                }
            }

            // Mettre a jour les grpahiques 
            for (i = 0; i < arrayChart.length; i++) {
                arrayChart[i].update(); // Mise a jour de donnéess
            }
        }
    }



    // ---------------- Vider le graph ----------------
    function clearGraph() {

        for (i = 0; i < arrayChart.length; i++) {

            nbDonnees = arrayChart[i].data.datasets[0].data.length;
            for (j = 0; j < nbDonnees; j++) {
                arrayChart[i].data.datasets[0].data.shift();
            }
        }

        for (i = 0; i < arrayChart.length; i++) {
            arrayChart[i].update(); // Mise a jour de donnéess
        }

    }





    // ------ Ajouter les labels ------
    function initTime(prmFreqMesure, prmIdGraph) {

        // 60 minutes
        nbMesureMin = 60 / prmFreqMesure;
        nbMesureHeure = nbMesureMin * 60 - 1;

        for (j = 0; j < 24; j++) {
            arrayConfig[prmIdGraph].data.labels.push(("0" + j).slice(-2) + 'h');

            for (v = 0; v < nbMesureHeure; v++) {
                arrayConfig[prmIdGraph].data.labels.push("");
            }

        }
    }





    // ------ Creer une config pour chaque graph ------
    function getNewConfig() {

        // --- Début fichier config du graphiqe  ---
        config = {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
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
                                autoSkip: false,
                                beginAtZero: true
                            }
                        }],
                    yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                maxTicksLimit: 5,
                                stepSize: 1,
                                autoSkip: false,
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
        return arrayConfig[arrayConfig.length - 1]; // Derniere valeur
    }




})(jQuery);