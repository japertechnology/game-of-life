var game = new Game();

const $modalSettings = $("#modal-examples");

$(function () {
    var mouseX = 0;
    var mouseY = 0;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var animationSpeed = 90;
    var intervalID = 0;

    var maxWidth = 80;
    var minWidth = 6;
    var width = 20;

    var isPressedButton = false;
    var isPressedKey = false;
    var isRunning = false;
    var isShowGrid = true;

    function drawCell(x, y, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.rect(x + 1, y + 1, width - 2, width - 2);
        ctx.fill();
    }

    function drawLine(x0, y0, x1, y1, lineWidth, color) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
    }

    function drawGrid() {
        for (var i = 0; i < game.maxColumns; i++) {
            drawLine(width + i * width, 0, width + i * width, game.maxLines * width, 1, "black");
        }

        for (var i = 0; i < game.maxLines; i++) {
            drawLine(0, width + i * width, game.maxColumns * width, width + i * width, 1, "black");
        }
    }

    function drawCells() {

        for (const cell of game.cells.values()) {

            drawCell(cell.j * width, cell.i * width, "black");
        };
    }

    function draw() {
        //Clear the screen before draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (isShowGrid) {
            drawGrid();
        }

        drawCells();
    }

    function step() {
        game.step();
        draw();
    }

    function enableAllButtons() {
        $(".toolbar .btn").removeClass("disabled").removeAttr("disabled");
    }

    function disableAllButtons() {
        $(".toolbar .btn").addClass("disabled").attr("disabled", "disabled");
    }

    function getClickPosition() {
        if (mouseX >= game.maxColumns * width) {
            return;
        }

        if (mouseY >= game.maxLines * width) {
            return;
        }

        return {
            line: Math.floor(mouseY / width),
            column: Math.floor(mouseX / width)
        };
    }

    function resizeCanvas() {

        console.debug("Resizing canvas");

        canvas.width = $("#panel").width();
        canvas.height = $(window).height() - $(".navbar").height() - $(".toolbar").height() - 60;

        draw();
    }

    function zoomIn() {
        //scroll up
        if (width <= maxWidth) {
            width += 2;
        }
        draw();
    }

    function zoomOut() {
        //scroll down
        if (width >= minWidth) {
            width -= 2;
        }
        draw();
    }

    function start() {

        clearInterval(intervalID);

        step();

        if (isRunning) {
            intervalID = setInterval(start, (100 - animationSpeed) * 10);
        }
    }

    $(window).resize(function () {
        resizeCanvas();
    });

    $("canvas").mousemove(function (event) {

        event.preventDefault();

        var rect = canvas.getBoundingClientRect();

        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;

        if (isPressedButton && isPressedKey) {
            var pos = getClickPosition();

            if (pos == null) {
                return;
            }

            game.born(pos.line, pos.column);
        }



    }).mousedown(function (event) {
        event.preventDefault();
        isPressedButton = true;

    }).mouseup(function (event) {

        event.preventDefault();

        isPressedButton = false;

        var pos = getClickPosition();

        if (pos == null || isPressedKey) {
            return;
        }

        game.toggleCell(pos.line, pos.column);

        draw();

    }).bind("mousewheel", function (e) {
        if (e.originalEvent.wheelDelta < 0) {
            zoomOut();
        } else {
            zoomIn();
        }
        //prevent page fom scrolling
        return false;
    }).css("cursor", "pointer");

    $("#startAndStop").click(function (event) {

        isRunning = !isRunning;

        if (isRunning) {

            $("#startAndStop i").addClass("bi-stop-fill").removeClass("bi-play-fill");
            $("#startAndStop span").html("Stop");

            // disableAllButtons();

            start();
        } else {

            $("#startAndStop i").addClass("bi-play-fill").removeClass("bi-stop-fill");
            $("#startAndStop span").html("Play");

            // enableAllButtons();
        }
    });



    $("#zoom-in").click(function (event) {
        zoomIn();
    });

    $("#zoom-out").click(function (event) {
        zoomOut();
    });

    $("#step").click(function (event) {
        step();
    });

    $("#settings").click(function (event) {
        $("#settings-modal").modal("show");
    });

    $("#show-grid-select").change(function () {
        if ($(this).val() == 1) {
            isShowGrid = true;
        } else {
            isShowGrid = false;
        }
        draw();
    });

    $("#slider-speed").on("change", function () {
        animationSpeed = $(this).val();
    });

    $("#menubar-file-export").click(function(event){
        event.preventDefault();

        FileUtils.exportToCSV(game.cells, "positions.csv");

        return false;
    });

    $("#modal-examples a").click(function(event){

        const file = $(this).data("file");

        if (file) {

            $.get(file).then(function (data) {

                game = new Game();

                const lines = data.split("\n").map(e => e.trim());

                for (const line of lines) {

                    if (!line) {
                        continue;
                    }

                    const parts = line.split(",").map(e => e.trim()).map(e => parseInt(e));

                    game.toggleCell(parts[0], parts[1]);
                }

                draw();
            });
        }
    });

    $(".navbar-nav li a").on("click", function () {

        if (!$(this).hasClass("dropdown-toggle")) {
            $(".navbar-collapse").collapse("hide");
        }
    });

    resizeCanvas();
});
