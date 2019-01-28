<?php

defined('BASEPATH') OR exit('No direct script access allowed');

Class c_login extends CI_Controller {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $this->load->helper('form');              // Pour creer un formulaire
        $this->load->library('form_validation');  // Pour verifier si les données du formulaire sont correctes
        $this->load->library('session');          // Pour creer une session

        $this->load->view('v_login');
    }

    public function check_login() {
        $data = array(
            'user_name' => $this->input->post('username'),
            'user_password' => $this->input->post('password')
        );

        $this->load->model('m_login', $data);
    }

}
