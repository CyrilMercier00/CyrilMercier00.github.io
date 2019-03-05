(function ($)
{
    var arrayChart = [];               // Array contenant les graphiques crées 
    var graph_created = false;         // verifie si les graphiques sont initialisés
    var nbCapteurs = 0;                // Nombre max de capteurs
    const valVibrationsMax = 6;        // Valeur maxmimale de vibratios. Determine la hauteur max du graphique

    //Heure pour le label
    var date = new Date();
    var dataHeures = [date.getHours() - 1 + 'h', date.getHours() + 'h', date.getHours() + 1 + 'h'];

    // Code html a inserer pour creer un graphique, separé en deux pour pouvoir inserer l'id du graphique
    var code_html1 = "<div class='col-lg-6'> \n\
    <div class='au-card recent-report'> \n\
    <div class='au-card-inner'> \n\
    <h3 class='title-2'>Capteur 1</h3> \n\
    <div class='recent-report__chart'> \n\
    <canvas id='graphCapteur";
    var code_html2 = "'></canvas> \n\
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

    // --- Fichier config du graphiqe  ---
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
                    fill: 'origin'
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
                    fill: '-1'
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

    // --- Code Appli principal --- 
    try
    {
        getNumCapteurs();
    } catch (error)
    {
        console.log(error);
    }

function getNumCapteurs()
{
    // Recuperer le nombre de capteurs a afficher
    if (graph_created === false) {
        url = 'http://localhost:82/vibration/index.php/REST/moteur';

        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: function (result)
            {
                nbCapteurs = result.length;
                setInterval(rafraichirGraphiques, 1000);  // Rafraichir les graphiques toutes les secondes
                creerGraph(nbCapteurs);                   // Creer une div pour chaque capteur
            }
        });
    }
}





function creerGraph(prmNbCapteurs)
{
    for (i = 0; prmNbCapteurs < i; i++)
    {
        document.getElementById("divGraph").appendChild(code_html1 + i + code_html2);     // Le code html est separé en deux partie, le i correspond a l'id du graphique 
        console.log('html ' + i + ' fait.');
        var ctx = document.getElementById("graphCapteur" + [i]);                        // Creer un graphique pour chaque div 

        if (ctx)
        {
            ctx.height = 230;
            arrayChart[i] = new Chart + [i](ctx, config);
        }
    }
    graph_created = true;                     // Pour ne pas recreer les div en boucle
}





function rafraichirGraphiques()
{
    for (i = 0; i < nbCapteurs; i++)
    {
        getValVibrations(1);      // Recuperer les vibrations pour le capteur 
        getValSeuil(1);           // Recuperer le seuil pour le capteur   
        arrayChart[i].update();   // Mise a jour de données
    }
}





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
            arrayChart[i].data.datasets[0].data = [];     // Supprime les anciennes données
            for (i = 0; i < result.length; i++)     // Les remplacer par les nouvelles
            {
                arrayChart.data.datasets[0].data.push(result[i]['valeur']);
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
            // Supprime les anciennes données
            arrayChart[i].data.datasets[1].data = [];
            arrayChart[i].data.datasets[2].data = [];
            arrayChart[i].data.datasets[3].data = [];

            // Remplacer le seuil sur toute la longueur de la courbe
            for (i = 0; i < arrayChart[i].data.datasets[0].data.length; i++)  // pour toute les données recupérées
            {
                arrayChart[i].data.datasets[1].data.push(result[1]['seuil']);
                arrayChart[i].data.datasets[2].data.push(result[2]['seuil']);
                arrayChart[i].data.datasets[3].data.push(result[3]['seuil']);
                arrayChart[i].data.datasets[4].data.push(6);
            }
        }
    });
}




})(jQuery);