// ------------------------------ GRAPHIQUES -----------------------------------
(function ($)
{
    const site_url = $('#url_js').val();
    var listeCreated = false;          // verifie si la liste des machines a été crée

    // --- Code Appli principal --- 
    try {
        getAllMachines();

    } catch (error) 
    {
        console.log(error);
    }
// --- Fin code principal --- 



    function getAllMachines()
    {
        console.log("getAllMachines - début");
        url = site_url + '/REST/machine';

        if (listeCreated === false)
        {
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                success: function (result)
                {
                    console.log("getAllMachines - succes");
                    for (i = 0; i < result.length; i++)  // pour toute les données recupérées
                    {
                        $('#liste_machines').append("<li> <a href=" + site_url + "/c_machine/" + i + " class\"list-group-item group-item-action\"> Machine: " + result[i]['nom'] + "</a> </li>");
                    }
                    listeCreated = true;
                }
            });
        }
    }

})(jQuery);