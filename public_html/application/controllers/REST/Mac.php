<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Mac extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('M_mac');
    }

    // Recuperer les capteur & colonnes en rapport avec l'id moteur
    public function index_get($idMachine) {
        $this->response($this->M_mac->get_mac($idMachine));
    }

    public function index_put($idMachine) {
        
        $dto = file_get_contents('php://input') ;
        $dto = (array) json_decode($dto);
        
        $this->response($this->M_mac->put_mac($dto, $idMachine));
    }

}
