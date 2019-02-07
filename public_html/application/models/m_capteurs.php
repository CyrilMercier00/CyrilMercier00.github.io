<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class m_capteurs extends CI_Model {

    public function get_all_machines() {
        return $this->db->get('machine')->result();
    }

}
