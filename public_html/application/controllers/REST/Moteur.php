<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Moteur extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('M_moteur');
    }

    public function index_get() {
        $idMoteur = $this->uri->segment(3);
        if (isset($idMoteur)) {
            $this->response($this->M_moteur->get_moteur_by_id($idMoteur));
        } else {
            $this->response($this->M_moteur->get_all_moteurs());
        }
    }

    public function index_post() {
        $dto = $this->input->post(NULL, true);

        $this->response($this->M_capteur->insert_moteur($dto));
    }

    public function index_delete($idMoteur) {
        $this->response($this->M_capteur->delete_moteur($idMoteur));
    }

}
