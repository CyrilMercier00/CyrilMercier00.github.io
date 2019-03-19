// ------------------------------ GRAPHIQUES -----------------------------------
(function ($)
{
    urlMachine = 'http://localhost:82' ;
    
    var site_url = $('#base').val();
    var listeCreated = false;          // verifie si la liste des machines a été crée

    // --- Code Appli principal --- 
    try
    {
        creerListeMachines();

    } catch (error)
    {
        console.log(error);
    }





    function creerListeMachines()
    {
        getAllMachines();
    }





    function getAllMachines()
    {
        console.log("getAllMachines - début");
        url = urlMachine + '/vibration/index.php/REST/machine';

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