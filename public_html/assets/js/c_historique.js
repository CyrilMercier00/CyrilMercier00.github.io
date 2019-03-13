// ------------------------------ GRAPHIQUES -----------------------------------
(function ($)
{
    url = "http://localhost:82/vibration/index.php/REST/";

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (result)
        {
            console.log("getAllCapteurs - succes");
            for (i = 0; i < result.length; i++)  // pour toute les données recupérées
            {
                $('#divGraph').append("<li> <a href=" + site_url + "/c_machine/" + i + " class\"list-group-item group-item-action\"> Machine n°" + i + ": " + result[i]['nom'] + "</a> </li>");
            }
            listeCreated = true;
        }
    });

})(jQuery);