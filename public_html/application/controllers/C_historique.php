<?php

defined('BASEPATH') OR exit('No direct script access allowed');

Class C_historique extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library('form_validation');
    }

    public function index() {
        if (($this->session->userdata('logged_in') == true)) {

            $page = $this->load->view('V_historique', '', true);

            $data = array(
                'page' => $page,
                'css_location' => 'v_historique.css',
                'javascript_location' => 'c_historique.js'
            );

            $this->load->view('common/V_template', array('data' => $data), false);
        } else {
            redirect('C_login');
        }
    }
}