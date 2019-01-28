<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// Controlleur de la page principale du site.

class c_accueil extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library('session');          // Pour creer une session
    }

    public function index() {
        // Verification de la validitee de la session
        if (($this->session->userdata('logged_in') == true)) {

            $session_data = $this->session->userdata('logged_in');
            $data['username'] = $session_data['username'];
            $this->load->view('v_accueil', $data);  // --> Verif OUI
        } else {
             redirect('c_login');                   // --> Verif NON   
        }
    }

}
