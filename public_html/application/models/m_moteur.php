<?php
class m_moteur extends CI_Model {

    public function get_all_moteurs() {
        return $this->db->get('moteur')->result();
    }

}
