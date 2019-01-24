<?php

session_start(); // Demmarer une session pour Code Igniter

Class User_Authentication extends CI_Controller {

    public function __construct() {
        parent::__construct();

    // Charger les bibliotheques
        $this->load->helper('form');                // Pour creer un formulaire
        $this->load->library('form_validation');    // Pour traiter les donnees du formulaire
        $this->load->library('session');            // Pour creer une session
        
    // Charger les modeles        
        $this->load->model('m_auth');               // Model pour les requetes d'authentification
    }

// Page de login
    public function index() {
        $this->load->view('v_login');
    }

// Check for user login process
    public function user_login() {

        $this->form_validation->set_rules('username', 'Username', 'trim|required|xss_clean');
        $this->form_validation->set_rules('password', 'Password', 'trim|required|xss_clean');

        if ($this->form_validation->run() == FALSE) {
            if (isset($this->session->userdata['logged_in'])) {
                $this->load->view('v_accueil');
            } else {
                $this->load->view('v_login');
            }
        } else {
            $data = array(
                'username' => $this->input->post('username'),
                'password' => $this->input->post('password')
            );
            $result = $this->login_database->login($data);
            if ($result == TRUE) {

                $username = $this->input->post('username');
                $result = $this->login_database->read_user_information($username);
                if ($result != false) {
                    $session_data = array(
                        'username' => $result[0]->user_name,
                        'email' => $result[0]->user_email,
                    );
// Add user data in session
                    $this->session->set_userdata('logged_in', $session_data);
                    $this->load->view('admin_page');
                }
            } else {
                $data = array(
                    'error_message' => 'Invalid Username or Password'
                );
                $this->load->view('login_form', $data);
            }
        }
    }

// Logout from admin page
    public function logout() {

// Removing session data
        $sess_array = array(
            'username' => ''
        );
        $this->session->unset_userdata('logged_in', $sess_array);
        $data['message_display'] = 'Successfully Logout';
        $this->load->view('login_form', $data);
    }

}
?>