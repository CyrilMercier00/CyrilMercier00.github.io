<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class c_user extends CI_Controller {

    public function __construct() {
        parent::__construct();
    }
    
    public function newUser () {
        
    }

    public function changePass() {
        
    }

    public function logout() {
        $this->session->sess_destroy();
        redirect('c_login');
    }

}
