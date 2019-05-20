<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Colonne extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('M_colonne');
    }

    public function index_get($idMachine) {
        $this->response($this->M_colonne->get_all_colonne($idMachine));
    }

}
