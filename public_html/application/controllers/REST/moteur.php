<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_controller.php';

class moteur extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('m_moteur');
    }

    public function index_get() {
        $this->response($this->m_moteur->get_all_moteurs());
    }

    public function index_post() {
        $dto = $this->input->post(NULL, true);

        $this->response($this->m_capteur->insert_moteur($dto));
    }

    public function index_delete($idMoteur) {
        $this->response($this->m_capteur->delete_moteur($idMoteur));
    }

}
