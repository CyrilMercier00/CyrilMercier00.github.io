(function ($)
{
    const site = $('#base').val(); // Adresse du site pour le service REST 
    const valVibrationsMax = 6;          // Valeur maxmimale de vibratios. Determine la hauteur max du graphique


    var arrayChart = [];                 // Array contenant les graphiques crées 
    var seuil = [];                      // Array contenant les seuils récupérés 
    var graph_created = false;           // Verifie si les graphiques sont initialisés
    var seuil_added = false;             // Verifie si les seuils ont bien été recupérés
    var nbCapteurs = 0;                  // Nombre max de capteurs

    // Code html a inserer pour creer un graphique, separé en deux pour pouvoir inserer l'id du graphique
    var code_html1 = "<div class='col-lg-8'> \n\
    <div class='au-card recent-report'> \n\
    <div class='au-card-inner'> \n\
    <h3 class='title-2'>Capteur ";

    var code_html2 = "</h3> \n\
    <div class='recent-report__chart'> \n\
    <canvas id='graphCapteur";

    var code_html3 = "'></canvas> \n\
    </div> \n\
    </div> \n\
    </div> \n\
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

    // --- Début fichier config du graphiqe  ---
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
                            fontSize: 11
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
                    radius: 3,
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

    // Extraire le parametre de l'url
    query = window.location.toString();
    query = query.split("/");
    query = query.pop();



// --------------------------------------------
// --------  DEBUT programme principal  -------
// --------------------------------------------
    initLbl();
    getCapteurs();
    setInterval(insererDataTest, 1000);
// --------------------------------------------
// --------   FIN programme principal  --------
// --------------------------------------------




    // ------ Recupere les capteurs ------
    function getCapteurs() {
        if (graph_created === false) {
            url = site + "/REST/capteur/" + query;

            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                success: function (result)
                {
                    for (i = 0; i < result.length; i++)
                    {
                        $("#divGraph").append(code_html1 + (i + 1).toString() + code_html2 + i + code_html3);
                        var ctx = document.getElementById("graphCapteur" + [i]);     // Creer un graphique pour chaque div 
                        if (ctx)
                        {
                            console.log("GRAPH - Canvas détectté pour le graphique " + i);
                            ctx.height = 230;
                            arrayChart.push(new Chart(ctx, config));
                        }
                    }
                    console.log('getCapteur OK');
                }
            });
        }
    }



    // ------ Creer et afficher les graphs ------
    function creerGraph(prmNbCapteurs)
    {

        console.log("GRAPH - début");

        getValSeuil();
        graph_created = true;
        console.log("GRAPH - fait");
    }



    // ------ Ajouter les labels ------
    function initLbl()
    {
        // Heure actuelle
        dataHeures.push(date.getHours() + 'h');
        // 60 minutes
        for (i = 0; i < 60; i++)
        {
            dataHeures.push('');
        }
        // Heure actuelle +1
        dataHeures.push(date.getHours() + 1 + 'h');
        console.log('label OK');
    }



    // ------ Recuperer les valeurs du seuil ------
    function getValSeuil()
    {
        if (seuil_added !== true)
        {
            url = site + '/REST/norme/1';
            console.log(url);

            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                success: function (result)
                {
                    for (i = 0; i < result.length; i++)
                    {
                        seuil[i] = result[i]['seuil'];
                    }
                    seuil_added = true;
                }
            });
        }
        console.log('seuil OK');
    }



    // --------------------------------------------
    // --------  FONCTIONS POUR LES TESTS  -------- 
    // --------------------------------------------

    function insererDataTest()
    {
        if (seuil_added === true)
        {
            for (i = 0; i < arrayChart.length; i++)
            {
                arrayChart[i].data.datasets[0].data.push(nbreRandom());
                arrayChart[i].data.datasets[1].data.push(seuil[0]);
                arrayChart[i].data.datasets[2].data.push(seuil[1]);
                arrayChart[i].data.datasets[3].data.push(seuil[2]);
                arrayChart[i].data.datasets[4].data.push(seuil[3]);
            }

            for (i = 0; i < arrayChart.length; i++)
            {
                arrayChart[i].update();       // Mise a jour de donnéess
            }

        }
    }



    function nbreRandom()
    {
        return (Math.random() * (0.80 - 0.0) + 0.0).toFixed(2);
    }
})(jQuery);
