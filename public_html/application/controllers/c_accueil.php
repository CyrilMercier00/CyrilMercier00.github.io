<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class c_accueil extends CI_Controller {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        // Verification de la validitee de la session
        if (($this->session->userdata('logged_in') == true)) {
            $this->load->view('v_accueil');         // --> Session valide
        } else {
            redirect('c_login');                   // --> Session invalide 
        }
    }

    public function logout() {
        $this->session->sess_destroy();
        redirect('c_login');
    }

}
