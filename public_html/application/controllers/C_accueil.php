<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class C_accueil extends CI_Controller {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        // Verification de la validitee de la session
        if (($this->session->userdata('logged_in') == true)) {

            $page = $this->load->view('V_accueil','',true);
            
            $data = array(
                'page' => $page,
                'css_location' => 'V_accueil.css',
                'javascript_location' => 'C_accueil.js'
            );
            
            $this->load->view('common/v_template', array('data' => $data), false);
        } else {
            redirect('C_login');
        }
    }

}
