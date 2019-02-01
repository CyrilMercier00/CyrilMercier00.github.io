<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class c_accueil extends CI_Controller {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        // Verification de la validitee de la session
        if (($this->session->userdata('logged_in') == true)) {

            $page = $this->load->view('v_accueil','',true);
            $data = array(
                'page' => $page,
                'css_location' => 'v_accueil.css',
                'javascript_location' => 'c_accueil.js'
            );
            
            $this->load->view('common/v_template', array('data' => $data), false);
        } else {
            redirect('c_login');
        }
    }

    public function logout() {
        $this->session->sess_destroy();
        redirect('c_login');
    }

}
