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
    
    public function get_vibration($prmIdMoteur) {
        // Requete pour les 12 dernieres vivration par ordre decroissant
        return $this->db->order_by('idVibration', 'DESC')->limit(12)->get_where('vibration', array('idMoteur' => $prmIdMoteur))->result();
    }
    
    public function get_seuil($prmOrdreSeuil) {
        return $this->db->get_where('vibration', array('ordre' => $prmOrdreSeuil))->result();
    }

}
