<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_controller.php';

class capteurs extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('m_vibration');
    }

    public function index_post() {
        $data = array(
            'idMachine' => $this->post('idMachine'),
            'valVibration' => $this->post('valVibration'),
        );

        $this->response($this->m_capteurs->insert_vibration($data));
    }

}
