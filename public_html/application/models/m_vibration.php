<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class m_vibration extends CI_Model {

    public function insert_vibration($prmDto) {
        // Donnees a inserer
        $data = array(
            'valeur' => json_decode($prmDto['valeur']),
            'idMoteur' => json_decode($prmDto['idMoteur']),
        );

        $this->db->insert('vibration', $data);
    }

    public function get_vibration($idMoteur) {
        return $this->db->get_where('vibration', array('idMoteur' => $idMoteur))->result();
    }

}
