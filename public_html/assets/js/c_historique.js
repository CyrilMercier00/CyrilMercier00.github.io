(function ($)
{
    const  site = $('#url_js').val();                           // Adresse du site pour le service REST
    var numMachine = window.location.pathname.split("/").pop(); // Recupere le numero de la machine dans l'url
    var arrayChart = [];                                        // Array contenant les graphiques crées 
    var listeCreated = false;                                   // Verifie si les graphiques sont initialisés
    
    // Heure pour le label
    var date = new Date();
    var dataHeures = [date.getHours() - 1 + 'h', date.getHours() + 'h', date.getHours() + 1 + 'h'];

    // Code html a inserer pour créer un graphique, separé pouvoir inserer des données
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

    // --- DEBUT fichier config du graphiqe  ---
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
                    data: [0.71],
                    pointBackgroundColor: transparent,
                    fill: 'origin'
                },
                {
                    label: 'Seuil B',
                    backgroundColor: bg_jaune,
                    borderColor: ln_jaune,
                    pointHoverBackgroundColor: transparent,
                    borderWidth: 0,
                    pointRadius: 0,
                    data: ['1.8'],
                    pointBackgroundColor: transparent,
                    fill: '-1'
                },
                {
                    label: 'Seuil C',
                    backgroundColor: bg_orange,
                    borderColor: ln_orange,
                    pointHoverBackgroundColor: transparent,
                    borderWidth: 0,
                    pointRadius: 0,
                    data: ['4.5'],
                    pointBackgroundColor: transparent,
                    fill: '-1'
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
    // --- FIN fichier config du graphiqe  ---

    // DEBUT code principal 
    if (listeCreated != true)
    {
        getAllCapteurs(numMachine);
    }
    // FIN code principal


    function getAllCapteurs(prmNumMachine)
    {
        url = site + '/REST/capteur/' + prmNumMachine;

        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: function (result)
            {
                nbCapteurs = result.length;
                console.log("getAllCapteurs - succes, " + nbCapteurs + " detectés");

                for (i = 0; i < nbCapteurs; i++)
                {
                    $("#divGraph").append(code_html1 + i + code_html2 + i + code_html3);
                    var ctx = document.getElementById("graphCapteur" + [i]);
                    {
                        console.log("GRAPH - Canvas détecté pour le graphique " + i);
                        ctx.height = 230;
                        arrayChart[i] = new Chart(ctx, config);
                    }
                    getDataGraph(i);
                }
                listeCreated = true;
            }
        });

    }


    function getDataGraph(prmNumCapteur)
    {
        url = site + '/REST/vibration/' + numMachine;
        console.log(url);
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: function (result)
            {
                for (i = 0; i < result.length; i++)
                {
                    arrayChart[prmNumCapteur].data.datasets[0].data.push(result[i]['valeur']);
                }
                arrayChart[prmNumCapteur].update() ;
            }
        });
    }

})(jQuery);