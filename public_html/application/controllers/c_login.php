<?php

session_start(); // Demmarer une session pour Code Igniter

Class User_Authentication extends CI_Controller {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        $this->load->helper('form');              // Pour creer un formulaire
        $this->load->library('form_validation');  // Pour verifier si les données du formulaire sont correctes
        $this->load->library('session');          // Pour creer une session

        $this->load->view('v_login');
    }
}

?>