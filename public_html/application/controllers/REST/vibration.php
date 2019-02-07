<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_controller.php';

class capteurs extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('m_vibration');
    }

    public function index_post($dto) {
        $this->response($this->m_capteurs->insert_vibration($dto));
    }

    public function index_get() {
        $this->response($this->m_capteurs->get_vibration());
    }

}
