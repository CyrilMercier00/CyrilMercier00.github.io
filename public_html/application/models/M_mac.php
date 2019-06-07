<?php

defined('BASEPATH') or exit('No direct script access allowed');

class M_mac extends CI_Model {

    public function get_mac($prmIdMachine) {
        $condition = array(
            'idMachine' => $prmIdMachine
        );

        return $this->db->select('addrMac')->get_where('colonne', $condition)->result();
    }

    public function put_mac($prmDto, $prmIdMachine) {
        $machineExiste = $this->db->select('idMachine')->get_where('machine', $prmIdMachine)->result();

        if ($machineExiste > 0) {

            $data = array('addrMac' => $prmDto['adresse']);

            $this->db->where('idMachine', $prmIdMachine);
            $this->db->update('colonne', $data);

            return $this->db->affected_rows();
        } else {
            return -2;
        }
    }

}
