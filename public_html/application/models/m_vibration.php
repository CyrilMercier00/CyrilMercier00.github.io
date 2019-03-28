<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class m_vibration extends CI_Model {

    public function insert_vibration($prmDto) {
        // Donnees a inserer
        $data = array(
            'valeur' => json_decode($prmDto['valeur']),
            'idMoteur' => json_decode($prmDto['idMoteur']),
        );

        return $this->db->insert('vibration', $data);
    }

    public function get_vibration($prmIdMachine) {
        // Selectionner tous les moteurs de la machine
        $result = $this->db->get_where('moteur', array('idMachine' => $prmIdMachine))
                ->result_array();

        $i = 0;
        foreach ($result as $row) {
            $moteur[$i] = $row['idMoteur'];
            $i++;
        }

        // Selectionner les vibrations pour les moteurs
        $this->db->select('valeur, idMoteur')
                ->where_in('idMoteur', $moteur);

        return $this->db->get('vibration')->result();
    }

    public function get_seuil($prmOrdreSeuil) {
        return $this->db->get_where('vibration.idMoteur', array('ordre' => $prmOrdreSeuil))->result();
    }

}
