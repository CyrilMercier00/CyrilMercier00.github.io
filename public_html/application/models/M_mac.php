<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class M_norme extends CI_Model {

    public function get_mac($idOrdre) {
        $condition = array(
            'ordre' => $idOrdre
        );

        return $this->db->get_where('niveaunorme', $condition)->result();
    }

    public function post_mac($prmDto, $prmIdColonne) {
        
        // Donnees a inserer
        $data = array(
            'addrMac' => json_decode($prmDto['adresse']),
        );

        return $this->db
                ->where('idColonne', $prmIdColonne)
                ->replace('colonne', $data);
    }

}
