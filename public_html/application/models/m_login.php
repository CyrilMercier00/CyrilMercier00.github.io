<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class m_login extends CI_Model {

        public function check_login($data)
        {
                $query = $this->db->select('pass')
                ->from('responsable')
                        ->where('login =' . $data['username'] . 'AND pass=' . $data['password']);
                return $query->result();
        }

}