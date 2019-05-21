// ------------------------------ GRAPHIQUES -----------------------------------
(function ($) {
    const site = $('#url_js').val();
    var listeCreated = false; // verifie si la liste des machines a été crée

    // --- Code Appli principal --- 
    getAllMachines();
    // --- Fin code principal --- 



    function getAllMachines() {
        url = site + '/REST/machine';
        if (listeCreated === false) {
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                success: affichage
            });
        }
    }



    function affichage(prmData) {
        for (i = 0; i < prmData.length; i++) {
            $('#map').append("<a class='tooltip' href='" +
                    site +
                    "C_machine/" +
                    i +
                    "' id='machine" + i + "'>" +
                    "<span class='tooltiptext'>" +
                    prmData[i]['nom'] +
                    "</span>  </a>"
                    );
            addCSS(i, prmData);
        }
        listeCreated = true;
    }

    // "<area shape='rect' coords='0,0,0,0' href='" + site + "/c_machine/" + i + "' alt='test '>"

    function addCSS(prmID, prmData) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.machine' + prmID + '{ position: absolute; top: ' + prmData[prmID]['posY'] + 'px; left:' + prmData[prmID]['posX'] + 'px; background-image: url("/assets/images/Usine/' +  prmData[prmID]["image"] + '");';
        document.getElementsByTagName('head')[0].appendChild(style);
        
        document.getElementById('machine' + prmID).className += ' machine' + prmID;

    }
})(jQuery);