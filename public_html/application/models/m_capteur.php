<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class m_capteur extends CI_Model {

    public function insert_capteur($prmDto_decoded) {
        // Donnees a inserer
        $data = array(
            'type' => json_decode($prmDto_decoded['type']),
            'nom' => json_decode($prmDto_decoded['nom']),
            'localisation' => $prmDto_decoded[localisation]
        );

        return $this->db->insert('machine', $data)->result();
    }

    public function get_capteur_by_machine($prmIdMachine) {
        $condition = array(
            'moteur.idMachine' => $prmIdMachine,
        );
        
        $this->db->select('idMoteur, fonction'); 
        return $this->db->get_where('moteur', $condition)->result();
    }

    public function delete_capteur($prmIdMachine) {
        return $this->db->delete('machine', array('idMachine' => $prmIdMachine))->result();
    }

}
