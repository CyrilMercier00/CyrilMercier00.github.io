<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class C_machine extends CI_Controller {

    public function __construct() {
        parent::__construct();
    }

    public function index($prmIdMachine) {
        // Verification de la validitee de la session
        if (($this->session->userdata('logged_in') == true)) {
            if (isset($prmIdMachine)) {
                $this->load->model('M_capteur');

                $page = $this->load->view('V_machine', '', true);
                $data = array(
                    'page' => $page,
                    'css_location' => 'machine.css',
                    'javascript_location' => 'c_machine.js',
                    'numMachine' => $this->uri->segment(2),
                );

                $this->load->view('common/v_template', array('data' => $data), false);
            } else {
                redirect('C_accueil');
            }
        } else {
            redirect('C_login');
        }
    }

}
