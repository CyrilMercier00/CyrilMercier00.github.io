(function ($)
{
    const site = "http://localhost:82/"; // Adresse du site pour le service REST
    var arrayChart = [];                 // Array contenant les graphiques crées 
    var graph_created = false;           // verifie si les graphiques sont initialisés
    var nbCapteurs = 0;                  // Nombre max de capteurs
    var i = 0;                           // Compteur
    const valVibrationsMax = 6;          // Valeur maxmimale de vibratios. Determine la hauteur max du graphique

    //Heure pour le label
    var date = new Date();
    var dataHeures = [date.getHours() - 1 + 'h', date.getHours() + 'h', date.getHours() + 1 + 'h'];

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
    // --- Fin fichier config du graphiqe  ---



    // --- Code Appli principal --- 
    try
    {
        initWebsocketMQTT();
        getNumCapteurs();
        $('#btnVal').on('click', insererDataTest); // handler bouton ajouter valeurs
    } catch (error)
    {
        console.log(error);
    }



    function getNumCapteurs()
    {
        // Recuperer le nombre de capteurs a afficher
        if (graph_created === false) {
            url = site + 'vibration/index.php/REST/moteur';
            console.log('getNumCapteurs - début'),
                    $.ajax({
                        type: "GET",
                        url: url,
                        dataType: "json",
                        success: function (result)
                        {

                            nbCapteurs = result.length;
                            console.log('getNumCapteurs - succes, ' + nbCapteurs + ' capteurs détecté(s)');
                            // setInterval(rafraichirGraphiques, 1000);  // Rafraichir les graphiques toutes les secondes
                            creerGraph(nbCapteurs);                   // Creer une div pour chaque capteur
                        }
                    });
        }
    }



    function creerGraph(prmNbCapteurs)
    {
        console.log("GRAPH - début");
        console.log("GRAPH - " + prmNbCapteurs + " capteurs");
        for (i = 0; i < prmNbCapteurs; i++)
        {
            $("#divGraph").append(code_html1 + i + code_html2 + i + code_html3);     // Le code html est separé en deux partie, le i correspond a l'id du graphique 
            var ctx = document.getElementById("graphCapteur" + [i]);     // Creer un graphique pour chaque div 
            if (ctx)
            {
                console.log("GRAPH - Canvas détectté pour le graphique " + i);
                ctx.height = 230;
                arrayChart.push(new Chart(ctx, config));
            }
        }
        graph_created = true;                     // Pour ne pas recreer les div en boucle
        console.log("GRAPH - fait");
    }



    function updateGraph(prmJsonDecoded)
    {
        numGraph = prmJsonDecoded['numGraph'];
        valVibration = prmJsonDecoded['valVibration'];

        arrayChart['numGraph'].data.datasets[0].data.push(valVibration);

        arrayChart['numGraph'].update();       // Mise a jour de données
    }



    function initWebsocketMQTT()
    {
        try {
            host = "172.16.129.32";
            port = 9001;
            idClient = "clientjs";

            // Création du client MQTT 
            console.log(client = new Paho.MQTT.Client(host, port, idClient));

            // Definir les handlers a utiliser
            client.onConnectionLost = onConnectionLost;
            client.onMessageArrived = onMessageArrived;

            // Succès de la connexion au serveur MQTT
            client.connect({onSuccess: function ()
                {
                    console.log("MQTT - Client MQTT connecté a l'adresse: '" + client.host + "', port: '" + client.port + " path: " + client.path);
                    client.subscribe("vibration");
                    message = new Paho.MQTT.Message("AH");
                    message.destinationName = "vibration";
                    client.send(message);
                    console.log("MQTT - Message '" + message.payloadString + "' envoyé");
                }
            });



            // Handler connection perdue
            function onConnectionLost(responseObject)
            {
                if (responseObject.errorCode !== 0) {
                    console.log("MQTT - Connection perdue: " + responseObject.errorMessage);
                }
            }
            ;



            // Handler Reception de message
            function onMessageArrived(message)
            {
                console.log("MQTT - Message reçu: " + message.payloadString);
                message_decoded = json_decode(message.payloadString);
                updateGraph(message_decoded);           // Logique pour mettre a jour le graphique
            }
            ;

        } catch (e) {
            console.log("MQTT - Erreur: " + e);
        }
    }


    function insererDataTest()
    { 
        for (i = 0; i < arrayChart.length; i++)
        {
            numGraph = i;
            valVibration = (Math.random() * (0.80 - 0.0) + 0.0);
            alert( arrayChart['numGraph'].datasets[0].data.push(valVibration) );

            arrayChart['numGraph'].datasets[0].data.push(valVibration);

            arrayChart['numGraph'].update();       // Mise a jour de données
        }
    }

})(jQuery);