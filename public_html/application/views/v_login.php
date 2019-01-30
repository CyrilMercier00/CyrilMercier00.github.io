<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

<!-- Bootstrap CSS-->
<link href="<?php echo base_url(); ?>assets/vendor/bootstrap-4.1/bootstrap.min.css" rel="stylesheet" media="all">

<!------ Main CSS ------>
<link href="<?php echo base_url(); ?>assets/css/login.css" rel="stylesheet" type="text/css"/>

<html>
    <body>
        <div class="container h-100">
            <div class="row align-items-center h-75">

                <div class="main-div col-6 mx-auto login-form shadow">
                    <h2 class="form-heading text-center">Connexion</h2>

                    <form method="post" action="<?php echo site_url('c_login/check_login') ?>">
                        <div class="form-group ">
                            <input type="text" class="form-control" name="username" placeholder="Nom d'utilisateur">
                        </div>

                        <div class="form-group mb-3">
                            <input type="password" class="form-control" name="password" placeholder="Mot de passe">
                        </div>

                        <button type="submit" name="submit" class="btn col-4 btn-custom" > Valider </button>
                    </form>
                    <ul>
                        <?php
                        echo validation_errors('<li>', '</li>');
                        if (isset($error_message)) {
                            echo $error_message;
                        }
                        ?>
                    </ul>
                </div>
            </div>
        </div>
    </body>
</html>

<!-- Jquery JS -->
<script src="<?php echo base_url(); ?>assets/vendor/jquery-3.2.1.min.js"></script>

<!-- Bootstrap JS -->
<script src="<?php echo base_url(); ?>assets/vendor/bootstrap-4.1/popper.min.js"></script>
<script src="<?php echo base_url(); ?>assets/vendor/bootstrap-4.1/bootstrap.min.js"></script>