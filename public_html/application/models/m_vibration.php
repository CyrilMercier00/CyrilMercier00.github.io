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

    public function get_vibration($prmIdMachine, $prmDate) {
        // ---- Selectionner tous les moteurs de la machine ----
        $result = $this->db
                ->get_where('moteur', array('idMachine' => $prmIdMachine))
                ->result_array();

        $i = 0;     // Compter le nombre de moteurs
        foreach ($result as $row) {
            $moteur[$i] = $row['idMoteur'];
            $i++;
        }

        // ---- Selectionner les vibrations pour les moteurs avec la date ----
        $this->db->like('date', $prmDate)
                ->select('valeur, idMoteur, date')
                ->where_in('idMoteur', $moteur);

        return $this->db
                        ->order_by('idMoteur', 'ASC')      // Besoin pour les graph
                        ->order_by('idVibration', 'ASC')   // Besoin pour les graph
                        ->get('vibration')->result();
    }

}