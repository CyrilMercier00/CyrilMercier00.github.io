<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class M_login extends CI_Model {

    public function check_pass($data) {
        $valid = false;    // Renvoie true si le login est valide
        // Where
        $condition = array(
            'login' => $data['user_name']
        );

        // Recuperer le mot de passe en tant qu'array
        $query = $this->db->select('pass')->get_where('responsable', $condition);
        $result = $query->result_array();

        // Verification du mot de passe
        if (isset($result[0])) {
            if ($result[0]['pass'] == $data['user_password']) {
                $valid = true;
            }
        }

        return $valid;
    }

}
