<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

<!DOCTYPE html>
<html lang="en">

    <head>
        <!-- Required meta tags-->
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="au theme template">
        <meta name="author" content="Hau Nguyen">
        <meta name="keywords" content="au theme template">

        <!-- Title Page-->
        <title>Maintenance des moteurs</title>

        <!-- Fontfaces CSS-->
        <link href="<?php echo base_url(); ?>assets/css/font-face.css" rel="stylesheet" media="all">
        <link href="<?php echo base_url(); ?>assets/vendor/font-awesome-4.7/css/font-awesome.min.css" rel="stylesheet" media="all">
        <link href="<?php echo base_url(); ?>assets/vendor/font-awesome-5/css/fontawesome-all.min.css" rel="stylesheet" media="all">
        <link href="<?php echo base_url(); ?>assets/vendor/mdi-font/css/material-design-iconic-font.min.css" rel="stylesheet" media="all">

        <!-- Bootstrap CSS-->
        <link href="<?php echo base_url(); ?>assets/vendor/bootstrap-4.1/bootstrap.min.css" rel="stylesheet" media="all">

        <!-- Vendor CSS-->
        <link href="<?php echo base_url(); ?>assets/vendor/animsition/animsition.min.css" rel="stylesheet" media="all">
        <link href="<?php echo base_url(); ?>assets/vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet" media="all">
        <link href="<?php echo base_url(); ?>assets/vendor/wow/animate.css" rel="stylesheet" media="all">
        <link href="<?php echo base_url(); ?>assets/vendor/css-hamburgers/hamburgers.min.css" rel="stylesheet" media="all">
        <link href="<?php echo base_url(); ?>assets/vendor/slick/slick.css" rel="stylesheet" media="all">
        <link href="<?php echo base_url(); ?>assets/vendor/select2/select2.min.css" rel="stylesheet" media="all">
        <link href="<?php echo base_url(); ?>assets/vendor/perfect-scrollbar/perfect-scrollbar.css" rel="stylesheet" media="all">

        <!-- Bootstrap theme CSS -->
        <link href="<?php echo base_url(); ?>assets/css/theme.css" rel="stylesheet" media="all">

        <!-- Main CSS-->
        <link href="<?php echo base_url(); ?>assets/css/v_accueil.css" rel="stylesheet" type="text/css"/>

    </head>

    <body class="animsition">
        <div class="page-wrapper">

            <!-- MENU SIDEBAR-->
            <aside class="menu-sidebar d-none d-lg-block">
                <div class="logo">
                    <a href="#">
                        <img src="<?php echo base_url(); ?>assets/images/icon/logo.png" alt="Emerson" />
                    </a>
                </div>
                <div class="menu-sidebar__content js-scrollbar3">
                    <nav class="navbar-sidebar">
                        <ul class="list-unstyled navbar__list">
                            <li>
                                <a href="<?php echo site_url()?>/c_accueil">
                                    <i class="fas fa-home"></i>Accueil</a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="fas fa-clock"></i>Historique</a>
                            </li>
                            <li class="has-sub">
                                <a class="js-arrow" href="#">
                                    <i class="fas fa-user"></i>Compte</a>
                                <ul class="list-unstyled navbar__sub-list js-sub-list">
                                    <li>
                                        <a href="login.html">Nouvel utilisateur</a>
                                    </li>
                                    <li>
                                        <a href="register.html">Changer le mot de passe</a>
                                    </li>
                                    <li>
                                        <a href="<?php echo site_url('c_accueil/logout') ?>">Déonnexion</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
            <!-- END MENU SIDEBAR-->

            <!-- PAGE CONTAINER-->
            <div class="page-container">


                <!-- MAIN CONTENT-->
                <div class="main-content">        
                    <div class="section__content section__content--p30">
                        <?php echo $data['page']; ?>
                    </div>
                </div>
                <!-- END MAIN CONTENT-->
                <!-- END PAGE CONTAINER-->
            </div>

        </div>

        <!-- Jquery JS -->
        <script src="<?php echo base_url(); ?>assets/vendor/jquery-3.2.1.min.js"></script>

        <!-- Bootstrap JS -->
        <script src="<?php echo base_url(); ?>assets/vendor/bootstrap-4.1/popper.min.js"></script>
        <script src="<?php echo base_url(); ?>assets/vendor/bootstrap-4.1/bootstrap.min.js"></script>

        <!-- Vendor JS -->
        <script src="<?php echo base_url(); ?>assets/vendor/slick/slick.min.js"></script>
        <script src="<?php echo base_url(); ?>assets/vendor/wow/wow.min.js"></script>
        <script src="<?php echo base_url(); ?>assets/vendor/animsition/animsition.min.js"></script>
        <script src="<?php echo base_url(); ?>assets/vendor/bootstrap-progressbar/bootstrap-progressbar.min.js"></script>
        <script src="<?php echo base_url(); ?>assets/vendor/counter-up/jquery.waypoints.min.js"></script>
        <script src="<?php echo base_url(); ?>assets/vendor/counter-up/jquery.counterup.min.js"></script>
        <script src="<?php echo base_url(); ?>assets/vendor/circle-progress/circle-progress.min.js"></script>
        <script src="<?php echo base_url(); ?>assets/vendor/perfect-scrollbar/perfect-scrollbar.js"></script>
        <script src="<?php echo base_url(); ?>assets/vendor/chartjs/Chart.bundle.min.js"></script>
        <script src="<?php echo base_url(); ?>assets/vendor/select2/select2.min.js"></script>


        <!-- Main JS -->
        <script src="<?php echo base_url(); ?>assets/js/c_accueil.js"></script>

    </body>

</html>
<!-- end document-->
