<?php

defined('BASEPATH') or exit('No direct script access allowed');

class M_mac extends CI_Model
{

    public function get_mac($idColonne)
    {
        return $this->db->get_where('idColonne', $idColonne)->result();
    }



    public function put_mac($prmDto, $prmIdMachine)
    {        
        if ( $this->db->get_where('idMachine', $prmIdMachine) > 0) {

            $data = array('addrMac' => $prmDto['adresse']);

            $this->db->where('idMachine', $prmIdMachine);
            $this->db->update('colonne', $data);

            return $this->db->affected_rows;
   
        } else {
            return -2;
        }
    }
}
