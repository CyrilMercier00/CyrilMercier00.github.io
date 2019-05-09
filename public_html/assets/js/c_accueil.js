// ------------------------------ GRAPHIQUES -----------------------------------
(function ($)
{
    const site = $('#url_js').val();
    var listeCreated = false;          // verifie si la liste des machines a été crée

    // --- Code Appli principal --- 
        getAllMachines();
    // --- Fin code principal --- 



    function getAllMachines()
    {
        url = site + '/REST/machine';
        if (listeCreated === false)
        {
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                success: affichage
            });
        }
    }



    function affichage(prmData)
    {
        for (i = 0; i < prmData.length; i++)  // pour toute les données recupérées
        {
            $('#liste_machines').append("<li> <a href=" 
                    + site 
                    + "/c_machine/" 
                    + i 
                    + " class\"list-group-item group-item-action\">" 
                    + prmData[i]['nom'] 
                    + "</a> </li>");
        }
        listeCreated = true;
    }
    
    
    
})(jQuery);
