<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class c_machine extends CI_Controller {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
        // Verification de la validitee de la session
        if (($this->session->userdata('logged_in') == true)) {

            $this->load->model('m_capteur');

            $page = $this->load->view('v_machine', '', true);
            $data = array(
                'page' => $page,
                'css_location' => 'v_machine.css',
                'javascript_location' => 'c_machine.js'
            );

            $this->load->view('common/v_template', array('data' => $data), false);
        } else {
            redirect('c_login');
        }
    }

}
