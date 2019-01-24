<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// Controlleur de la page principale du site.

class c_accueil extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->helper('url');
    }

    public function index() {
        // Verification de la validitee de la session
        if ($this->session->userdata('logged_in')) {
            
            $session_data = $this->session->userdata('logged_in');
            $data['username'] = $session_data['username'];
            $this->load->view('v_accueil', $data);  // --> Verif OUI
        } else {
            redirect('v_login', 'refresh');         // --> Verif NON   
        }
    }

}
