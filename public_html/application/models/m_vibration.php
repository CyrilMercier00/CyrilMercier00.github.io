<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class m_vibration extends CI_Model {

    public function insert_vibration($dto) {
        $this->db->insert('vibration', $dto);
    }

    public function get_vibration($data) {
        // $this->db->get_where('vibration', )
    }

}
