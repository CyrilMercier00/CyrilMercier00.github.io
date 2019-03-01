<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div class="overview-wrap">
                <h2 class="title-1">Appareils connectés :</h2>
                <button class="au-btn au-btn-icon au-btn--blue">
                    <i class="zmdi zmdi-plus"></i>Ajouter un capteur</button>
            </div>
        </div>
    </div>
    <div class="row" id="divGraph">
        <div class="col-lg-6">
            <div class="au-card recent-report">
                <div class="au-card-inner">
                    <h3 class="title-2">Capteur 1</h3>
                    <div class="recent-report__chart">
                        <canvas id="graphCapteur1"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="au-card recent-report">
                <div class="au-card-inner">
                    <h3 class="title-2">Capteur 2</h3>
                    <!--    DESCRIPTION COURBES
                    <div class="chart-info">
                        <div class="chart-info__left">
                            <div class="chart-note">
                                <span class="dot dot--blue"></span>
                                <span class="chart-text">Vibrations</span>
                            </div>
                        </div>
                    </div>
                    -->
                    <div class="recent-report__chart">
                        <canvas id="recent-rep2-chart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="row">
        <div class="col-lg-8">
            <div class="au-card au-card--no-shadow au-card--no-pad m-b-40">
                <div class="au-card-title" style="">
                    <div class="bg-overlay bg-overlay--blue"></div>

                    <h3> <i class="zmdi zmdi-account-calendar"></i>Journal d'évènement</h3>
                    <button class="au-btn-plus">
                        <i class="zmdi zmdi-plus"></i>
                    </button>
                </div>
                <div class="au-task js-list-load">
                    <div class="au-task-list js-scrollbar3">
                        <div class="au-task__item au-task__item--danger">
                            <div class="au-task__item-inner">
                                <h5 class="task">
                                    <a href="#">Exemple évènement très important</a>
                                </h5>
                                <span class="time">10:00</span>
                            </div>
                        </div>
                        <div class="au-task__item au-task__item--warning">
                            <div class="au-task__item-inner">
                                <h5 class="task">
                                    <a href="#">Exemple évènement important</a>
                                </h5>
                                <span class="time">11:00</span>
                            </div>
                        </div>
                        <div class="au-task__item au-task__item--success">
                            <div class="au-task__item-inner">
                                <h5 class="task">
                                    <a href="#">Exemple évènement</a>
                                </h5>
                                <span class="time">03:30</span>
                            </div>
                        </div>
                        <div class="au-task__item au-task__item--danger js-load-item">
                            <div class="au-task__item-inner">
                                <h5 class="task">
                                    <a href="#">Meeting about plan for Admin Template 2018</a>
                                </h5>
                                <span class="time">10:00 AM</span>
                            </div>
                        </div>
                        <div class="au-task__item au-task__item--warning js-load-item">
                            <div class="au-task__item-inner">
                                <h5 class="task">
                                    <a href="#">Create new task for Dashboard</a>
                                </h5>
                                <span class="time">11:00 AM</span>
                            </div>
                        </div>
                    </div>
                    <div class="au-task__footer">
                        <button class="au-btn au-btn-load js-load-btn">load more</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>