// ------------------------------ GRAPHIQUES -----------------------------------
(function($) {
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
            $('#divmap').append("<a class='tooltip' href='" +
                site +
                "C_machine/" +
                i +
                "' id='machine" + i + "'>" +
                "<span class='tooltiptext'>" +
                prmData[i]['nom'] +
                "</span>  </a>"
            );
        }
        listeCreated = true;
    }

    // "<area shape='rect' coords='0,0,0,0' href='" + site + "/c_machine/" + i + "' alt='test '>"


})(jQuery);