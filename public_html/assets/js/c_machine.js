(function ($)
{
    const site = $('#url_js').val();     // Adresse du site pour le service REST
    const valVibrationsMax = 6;          // Hauteur du graphiqie

    var arrayChart = [];                 // Array contenant les graphiques crées 
    var seuil = [];                      // Array contenant les seuils récupérés 
    var graph_created = false;           // Verifie si les graphiques sont initialisés
    var seuil_added = false;             // Verifie si les seuils ont bien été recupérés
    var nbCapteurs = 0;                  // Nombre max de capteurs

    //Heure pour le label
    var date = new Date();
    var dataHeures = [];

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

    // Couleur sutilisées dans le graphique
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



// --------------------------------------------
// --------  DEBUT programme principal  -------
// --------------------------------------------
    initTime();
    initWebsocketMQTT();
    getNumCapteurs();
// --------------------------------------------
// --------   FIN programme principal  --------
// --------------------------------------------



    // ------  Recuperer le nombre de capteurs a afficher ------ 
    function getNumCapteurs()
    {
        if (graph_created === false)
        {
            url = site + '/REST/moteur';
            console.log('getNumCapteurs - début');

            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                success: function (result)
                {
                    nbCapteurs = result.length;
                    setInterval(insererDataTest, 1000); // Rafraichir les données du graphique        
                    creerGraph(nbCapteurs);             // Creer une div pour chaque capteur
                }
            });
        }
    }



    // ------  Créer les graphiques danns la page ------ 
    function creerGraph(prmNbCapteurs)
    {
        for (i = 0; i < prmNbCapteurs; i++)
        {
            $("#divGraph").append(code_html1 + (i + 1).toString() + code_html2 + i + code_html3);

            var ctx = document.getElementById("graphCapteur" + [i]);     // Creer un graphique pour chaque div
            if (ctx)
            {
                ctx.height = 230;
                arrayChart.push(new Chart(ctx, config));
            }
        }
        getValSeuil();
        graph_created = true;                     // Pour ne pas recreer les div en boucle
    }



    // ------ Recupere les valeurs de seuil ------ 
    function getValSeuil()
    {
        url = site + '/REST/norme/1';

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
    // ------------------------------------------------



    // ------  Mise a jour des graph avec les valeurs instant ------ 
    function updateGraph(prmJsonDecoded)
    {
        numGraph = prmJsonDecoded['numGraph'];
        valVibration = prmJsonDecoded['valVibration'];

        arrayChart['numGraph'].data.datasets[0].data.push(valVibration);

        arrayChart['numGraph'].update();       // Mise a jour de données
    }
    // ------------------------------------------------ 



    // ------  Mise a jour des valeurs du label ------ 
    function updateLbl()
    {
        // Verifier si il faut rajouter des minutes
        if (arrayChart[0].data.labels.last < date.getHours())
        {
            console.log("if");

            // Enlever la derniere heure
            for (i = 0; i < 59; i++)
            {
                arrayChart[i].data.labels.slice();
            }
            // Ajouter une heure
            for (i = 0; i < 59; i++)
            {
                arrayChart[i].data.labels.push('');
            }
        }
    }
    // ------------------------------------------------ 



    // ------  Initialisation de l'ecoute MQTT ------ 
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
                    message = new Paho.MQTT.Message("site web connecté");
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
                updateGraph(message.payloadString);  // Logique pour mettre a jour le graphique
            }
            ;

        } catch (e) {
            console.log("MQTT - Erreur: " + e);
        }
    }
    // ------------------------------------------------ 



    // ------  Affichage de l'heure actuelle ------ 
    function initTime()
    {
        // Heure actuelle
        dataHeures.push(date.getHours() + 'h');

        // 60 minutes
        for (i = 0; i < 59; i++)
        {
            dataHeures.push('');
        }
        // Heure actuelle +1
        dataHeures.push(date.getHours() + 1 + 'h');
        setInterval(updateLbl, 3000);
    }
    // --------------------------------------------



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

        arrayConfig.push(config);
        return arrayConfig[arrayConfig.length - 1];  // Derniere valeur
    }
    // ------------------------------------------------ 



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
