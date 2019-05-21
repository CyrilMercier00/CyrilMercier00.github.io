<?php

class M_moteur extends CI_Model {

    public function get_all_moteurs() {
        return $this->db->select('idMoteur,fonction')->get('moteur')->result();
    }

    // -------------------------------------------------------------------  

    public function get_moteur_by_id_machine($idMachine) {
        $condition = array(
            'idMachine' => $idMachine,
        );

        return $this->db->select('idMoteur,fonction,freqMesure')->get_where('moteur', $condition)->result();
    }

    // -------------------------------------------------------------------

    public function get_moteur_by_id_moteur($idMoteur) {
        $condition = array(
            'idMoteur' => $idMoteur,
        );

        return $this->db->select('idMoteur,fonction,freqMesure')->get_where('moteur', $condition)->result();
    }

}
