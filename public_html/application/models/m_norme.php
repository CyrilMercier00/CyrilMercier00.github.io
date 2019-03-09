<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class m_norme extends CI_Model {

    public function get_seuil($idOrdre) {
        $condition = array(
            'ordre' => $idOrdre
        );

        return $this->db->get_where('niveaunorme', $condition)->result();
    }

}
