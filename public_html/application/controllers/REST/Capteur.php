<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Capteur extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('M_capteur');
    }

    // Ajouter un capteur
    public function index_post() {
        $dto = $this->input->post(NULL, true);

        $this->response($this->M_capteur->insert_capteur($dto));
    }

    // Recuperer les capteur & colonnes en rapport avec l'id moteur
    public function index_get($idMoteur) {
        $this->response( $this->M_capteur->get_capteur_by_moteur($idMoteur) );
    }
   
}
