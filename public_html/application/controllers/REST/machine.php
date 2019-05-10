<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_controller.php';

class machine extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('M_machine');
    }

    public function index_get() {
        $this->response($this->M_machine->get_all_machine());
    }

}
