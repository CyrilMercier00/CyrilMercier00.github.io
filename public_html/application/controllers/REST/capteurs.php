<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_controller.php';

class capteurs extends REST_Controller {

    public function __construct() {
        parent::__construct();
    }

    public function index_get() {
        $this->load->model('m_capteurs') ;
        
        $this->response($this->m_capteurs->get_all_machines() );
    }

}
