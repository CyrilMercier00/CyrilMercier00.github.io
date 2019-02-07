<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_controller.php';

class machines extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('m_machines');
    }

    public function index_get() {
        $data = array(
        'type' => $this->post('type'),
        'nom' => $this->post('nom'),
        'localisation' => $this->post('localisation'),
        );

        $this->response( $this->m_capteurs->insert_capteur($data) );
    }

}
