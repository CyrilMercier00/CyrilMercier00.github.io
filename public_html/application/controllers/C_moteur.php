<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class C_moteur extends CI_Controller {

    public function __construct() {
        parent::__construct();
    }

    public function index($prmIdMoteur) {
        // Verification de la validitee de la session
        if (($this->session->userdata('logged_in') == true)) {
            if (isset($prmIdMoteur)) {
                $this->load->model('M_capteur');

                $page = $this->load->view('V_machine', '', true);
                $data = array(
                    'page' => $page,
                    'css_location' => 'moteur.css',
                    'javascript_location' => 'c_moteur.js',
                    'numMachine' => $this->uri->segment(2)
                );

                $this->load->view('common/V_template', array('data' => $data), false);
            } else {
                redirect('C_accueil');
            }
        } else {
            redirect('C_login');
        }
    }

}
