<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class m_capteurs extends CI_Model {

    public function check_pass() {
        $query = $this->db->get('machine');

        return $query->$result ;
    }

}
