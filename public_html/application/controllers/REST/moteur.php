<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_controller.php';

class moteur extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('m_moteur');
    }

    public function index_get() {
        $this->response( $this->m_moteur->get_all_moteurs() );
    }
    
    public function index_get($data) {
        $this->response( $this->m_moteur->get_all_moteurs() );
    }
}

// SELECT * FROM machine, colonne WHERE idMoteur = ""