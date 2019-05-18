<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class M_colonne extends CI_Model {

    public function get_all_colonne($idMachine) {
        $condition = array(
            'colonne.idColonne' => $idMachine
        );

        return $this->db->select('idColonne')->get_where('colonne', $condition)->result();
    }

}
