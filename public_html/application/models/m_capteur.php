<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class m_capteur extends CI_Model {

    public function insert_capteur($prmDto) {
        // Donnees a inserer
        $data = array(
            'type' => json_decode($prmDto['type']),
            'nom' => json_decode($prmDto['nom']),
            'localisation' => $prmDto[localisation]
        );

        return $this->db->insert('machine', $data)->result();
    }

    public function get_capteur_by_moteur($prmIdMachine) {
        $condition = array(
            'moteur.idMachine' => $prmIdMachine,
        );

        $this->db->select('idMoteur, fonction');
        return $this->db->get_where('moteur', $condition)->result();
    }

    public function delete_capteur($prmIdMachine) {
        $condition = array(
            'idMachine' => $prmIdMachine
        );

        return $this->db->delete('machine', $condition)->result();
    }

}
