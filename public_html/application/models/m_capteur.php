<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class m_capteur extends CI_Model {

    public function get_all_capteurs() {
        return $this->db->get('machine')->result();
    }

    public function insert_capteur($prmDto_decoded) {
        // Donnees a inserer
        $data = array(
            'type' => json_decode($prmDto_decoded['type']),
            'nom' => json_decode($prmDto_decoded['nom']),
            'localisation' => $prmDto_decoded[localisation]
        );

        return $this->db->insert('machine', $data)->result;
    }

    public function get_capteur_et_colonne($idMachine) {
        $cond = array(
            'colonne.idMachine' => $idMachine,
            'machine.idMachine' => $idMachine
        );
        return $this->db->get_where('machine , colonne', $cond)->result();
    }

}
