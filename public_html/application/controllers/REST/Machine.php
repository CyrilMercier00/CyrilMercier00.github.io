<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Machine extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('M_machine');
        $this->load->model('M_moteur');
    }

    public function index_get() {
        $idMachine = $this->uri->segment(3);

        if (isset($idMachine)) {
            $this->response($this->M_moteur->get_moteur_by_id_machine($idMachine));
        } else {
            $this->response($this->M_machine->get_all_machine());
        }
    }

}
