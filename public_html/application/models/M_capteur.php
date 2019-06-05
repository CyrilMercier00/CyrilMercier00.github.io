<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class M_capteur extends CI_Model {

    public function get_capteur_by_moteur($prmIdMachine) {
        $condition = array(
            'moteur.idMachine' => $prmIdMachine,
        );

        $this->db->select('idMoteur, fonction');
        return $this->db->get_where('moteur', $condition)->result();
    }

}
