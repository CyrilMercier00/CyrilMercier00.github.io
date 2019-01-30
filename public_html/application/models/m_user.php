<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class m_user extends CI_Model {

    public function check_pass($data) {
        $valid = false;    // Login valide ou non

        $query = $this->db->get_where('responsable', array('login' => $data['user_name'] 
                                                          , 'pass' => $data['user_password'])
                                     );

        // Si la requete est valide
        if ($query->num_rows() > 0) {
            $valid = true;
        }

        return $valid;
    }

}
