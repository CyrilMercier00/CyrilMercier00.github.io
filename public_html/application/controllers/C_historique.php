<?php

defined('BASEPATH') OR exit('No direct script access allowed');

Class C_historique extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library('form_validation');
    }

    public function index() {

        $page = $this->load->view('v_historique','', true);
        
        $data = array(
            'page' => $page,
            'css_location' => 'v_historique.css',
            'javascript_location' => 'c_historique.js'
        );
        
        $this->load->view('common/v_template', array('data' => $data), false);
    }

}
