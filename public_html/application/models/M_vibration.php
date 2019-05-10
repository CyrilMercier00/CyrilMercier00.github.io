<?php

defined('BASEPATH') or exit('No direct script access allowed');

class M_vibration extends CI_Model
{

    public function insert_vibration($prmDto)
    {
        // Donnees a inserer
        $data = array(
            'valeur' => json_decode($prmDto['valeur']),
            'idMoteur' => json_decode($prmDto['idMoteur']),
        );

        return $this->db->insert('vibration', $data);
    }

    public function get_vibration($prmIdMachine, $prmDate)
    {
        $i = 0;     // Compter le nombre de moteurs

        // ---- Selectionner tous les moteurs de la machine ----
        $result = $this->db
            ->get_where('moteur', array('idMachine' => $prmIdMachine))
            ->result_array();
       
        foreach ($result as $row) {
            $moteur[$i] = $row['idMoteur'];
            $i++;
        }

        $prmDate = str_split($prmDate);
        $année = (String)($prmDate[0] . (String)$prmDate[1] . (String)$prmDate[2] . (String)$prmDate[3]);
        $mois =  (String)($prmDate[4] . (String)$prmDate[5]);
        $jour =  (String)($prmDate[6] . (String)$prmDate[7]);
        $stringDate = $année .'-'. $mois .'-'. $jour;

        // ---- Selectionner les vibrations pour les moteurs avec la date ----
        $this->db->like('date', $stringDate)
            ->select('valeur, idMoteur, date')
            ->where_in('idMoteur', $moteur);

        return $this->db
            ->order_by('idMoteur', 'ASC')      // Besoin pour les graph
            ->order_by('idVibration', 'ASC')   // Besoin pour les graph
            ->get('vibration')->result();
    }
}
