<!-- https://www.formget.com/form-login-codeigniter/ -->

<!------ Bootsrap ---------->
<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>

<!------ Main CSS ------>
<link href="<?php echo base_url(); ?>assets/css/login.css" rel="stylesheet" type="text/css"/>

<html>
    <body id="LoginForm">
        <div class="container h-100">
            <div class="login-form row align-items-center h-100">

                <div class="main-div col-6 mx-auto">
                    <h2 class="form-heading">Connexion</h2>
                    <div class="panel">
                        <p>Veuillez entrez votre nom d'utilisateur et votre mot de passe</p>
                    </div>

                    <form id="Login">
                        <div class="form-group">
                            <input type="text" class="form-control" id="inputEmail" placeholder="Nom d'utilisateur">
                        </div>

                        <div class="form-group">
                             <input type="password" class="form-control" id="inputPassword" placeholder="Mot de passe">
                        </div>

                        <button type="submit" class="btn btn-primary" action="c_login/check_login" method="post"> Login</button>
                    </form>

                </div>
            </div>
        </div>
    </body>
</html>