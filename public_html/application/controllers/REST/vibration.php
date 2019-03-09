<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_controller.php';

class vibration extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('m_vibration');
    }

    public function index_post() {
        $dto = $this->input->post(NULL, true);  // (idData, XSS Filter) Null = tout

        $this->response($this->m_vibration->insert_vibration($dto));
    }

    public function index_get($idMoteur) {
        $this->response($this->m_vibration->get_vibration($idMoteur));
    }

    public function index_get_seuil($ordreSeuil) {
        $this->response($this->m_vibration->get_seuil($ordreSeuil));
    }

}
