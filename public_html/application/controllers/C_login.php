<?php

defined('BASEPATH') OR exit('No direct script access allowed');

Class C_login extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->library('form_validation');
    }

    public function index() {
        $this->load->view('v_login');
    }

    public function check_login() {
        $this->load->model('m_login');      // Contient les methodes pour la verification du mdp
        
        // Nettoyer l'input    
        $this->form_validation->set_rules('username', 'nom d\'utilisateur', 'trim|required');
        $this->form_validation->set_rules('password', 'mot de passe', 'trim|required');

        if ($this->form_validation->run() == FALSE) {
            // Input invalide
            $this->load->view('v_login');   
            
        } else {
            // Sauvegarde de l'input
            $data = array(
                'user_name' => $this->input->post('username'),
                'user_password' => $this->input->post('password')
            );

            // Verification du mdp dans la BDD
            if ($this->m_login->check_pass($data)) {
                // Succes: Demmarer session avec les données suivantes
                $data_session = array(
                    'username' => $this->input->post('username'),
                    'logged_in' => TRUE,
                );
                $this->session->set_userdata($data_session);
                redirect('c_accueil');
                
            } else {
                // Echec, redirection avec message d'erreur
                $data['error_message'] = "Nom d'utilisateur ou mot de passe incorrect";
                $this->load->view('v_login', $data);
            }
        }
    }

}
