<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_controller.php';

class norme extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('M_norme');
    }

    // Recuperer les capteur & colonnes en rapport avec l'id moteur
    public function index_get($idOrdre) {
        $this->response($this->m_norme->get_seuil($idOrdre));
    }
   
}
