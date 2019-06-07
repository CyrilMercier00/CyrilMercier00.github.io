(function ($) {
    /* ---------- DECLARATION DES VARIABLES ----------- */

    const site_url = $('#url_js').val(); // Adresse du site
    const base_url = $('#url2_js').val(); // Adresse du site sans index

    const valVibrationsMax = 6; // Hauteur du graphiqie
    const tentativeRecoMQTTMax = 3; // Nombre de tentatives de reconnexion autorisées

    var arrayChart = []; // Array contenant les graphiques crées
    var arrayConfig = []; // Array contenant les config pour les graphiques   
    var seuil = []; // Array contenant les seuils récupérés 
    var graph_created = false; // Verifie si les graphiques sont initialisés
    var seuil_added = false; // Verifie si les seuils ont bien été recupérés
    var nbCapteurs = 0; // Nombre max de capteurs
    var numMachine = parseInt(window.location.pathname.split("/").pop()); // Extraire le numero de la machine depui l'url
    var freqMes = 0; // Frequence de mesure d'un moteur
    var doOnce = false; // Pour ne faire qu'une fois la requete  

    //Heure pour le label
    var date = new Date();
    var dataHeures = [];

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
    /*----------------- FIN DECLARATION ------------------*/

    initWebsocketMQTT();
    getNumCapteurs();


    // ------  Recuperer le nombre de capteurs a afficher ------ 
    function getNumCapteurs() {
        if (graph_created === false) {
            url = site_url + 'REST/machine/' + numMachine;
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                success: function (result) {
                    nbCapteurs = result.length;
                    if (nbCapteurs > 0) {
                        creerGraph(nbCapteurs, result); // Creer une div pour chaque capteur
                    } else {
                        // Afficher un message si il n'y a aucun capteur
                        $("#divGraph").append('<figure> \n\
                        <img src="' + base_url + 'assets/images/icon/supersad.png" class="img-fluid mx-auto d-block" > \n\
                        <figcaption> <br> Il n\'y a aucun capteur pour cette machine. </figcaption> \n\
                        </figure> ');
                        $("#divGraph").css("margin-top", "5%");
                    }
                }
            });
        }
    }



    // ------  Créer les graphiques danns la page ------ 
    function creerGraph(prmNbCapteurs, prmResult) {
        for (i = 0; i < prmNbCapteurs; i++) {
            $("#divGraph").append(code_html1 + prmResult[i]['fonction'] + code_html2 + i + code_html3);
            var ctx = document.getElementById("graphCapteur" + [i]); // Creer un graphique pour chaque div
            if (ctx) {
                ctx.height = 230;
                freqMes = prmResult[i]['freqMesure'];
                arrayChart.push(new Chart(ctx, getNewConfig()));
                initTime(i);
            }
        }
        getValSeuil();
        graph_created = true; // Pour ne pas recreer les div en boucle
    }



    // ------ Recupere les valeurs de seuil ------ 
    function getValSeuil() {
        url = site_url + '/REST/norme/1';
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: function (result) {
                if (doOnce === false) {
                    for (i = 0; i < result.length; i++) {
                        seuil[i] = result[i]['seuil'];
                    }
                    seuil_added = true;
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
                    for (i = 0; i < arrayChart.length; i++) {
                        arrayChart[i].update;
                    }
                }
                doOnce = true;
            }
        });
    }




    // ------  Mise a jour des graph avec les valeurs instant ------ 
    function updateGraph(prmData) {

         numGraph = prmData['id_moteur'];
         valVibration = parseFloat(prmData['accel']);
         debugger;
         arrayConfig['numGraph'].data.datasets[0].data.push(valVibration);
         arrayConfig['numGraph'].data.labels.push(" ");
         arrayChart['numGraph'].update(); // Mise a jour de données
    }




    // ------  Affichage de l'heure actuelle ------ 
    function initTime(prmIdCapteur) {
        // Heure actuelle
        if (date.getMinutes() < 10) {
            arrayConfig[prmIdCapteur].data.labels.push(date.getHours() + 'h0' + date.getMinutes());
        } else {
            arrayConfig[prmIdCapteur].data.labels.push(date.getHours() + 'h' + date.getMinutes());
        }
    }




    // ------  Initialisation de l'ecoute MQTT ------ 
    function initWebsocketMQTT() {
        host = "172.16.129.32";
        port = 9001;
        idClient = "clientjs";

        // Création du client MQTT
        var client = new Paho.MQTT.Client(host, port, idClient);

        // Definir les handlers a utiliser
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;

        // Succès de la connexion au serveur MQTT
        client.connect({
            reconnect: true,
            onSuccess: onConnect,
            onFailure: onConnectError
        });

        // Handler connection reussie 
        function onConnect() {
            console.log("MQTT - Connection réussie");
            client.subscribe('/vibration/vib');
        }

        function onConnectError() {

        }

        // Handler connection perdue
        function onConnectionLost(responseObject) {
            if (responseObject.errorCode !== 0) {
                console.log("MQTT - Connection perdue: " + responseObject.errorMessage);
            }

        }

        // Handler Reception de message
        function onMessageArrived(message) {
            console.log("MQTT - Message reçu: " + message.payloadString);
            donnees = JSON.parse(message.payloadString);
            updateGraph(donnees['data']);
        }
    }




    // ------ Creer une config pour chaque graph ------
    function getNewConfig() {

        // --- Début fichier config du graphiqe  ---
        config = {
            type: 'line',
            data: {
                labels: [], datasets: [
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
        return arrayConfig[arrayConfig.length - 1]; // Derniere valeur
    }

})(jQuery);
