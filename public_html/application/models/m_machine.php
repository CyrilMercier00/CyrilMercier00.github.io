<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class m_machine extends CI_Model {

    public function get_all_machine() {
        return $this->db->get('machine')->result();
    }
    
}
