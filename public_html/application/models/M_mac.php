<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class M_mac extends CI_Model {

    public function get_mac($idOrdre) {
        $condition = array(
            'ordre' => $idOrdre
        );

        return $this->db->get_where('niveaunorme', $condition)->result();
    }

    public function put_mac($prmDto, $prmIdMachine) {
        // Donnees a inserer
        $data = array('addrMac' => $prmDto['adresse']);

        $this->db->where('idMachine', $prmIdMachine);
        $this->db->update('colonne', $data);
    }

}
