var Game = function () {

    this.cells = {};
    this.maxColumns = 10;
    this.maxLines = 10;

    //Callbacks
    this.onChange = null;
    this.onInit = null;

    this.init = function () {

        this.cells = {};

        if (this.onInit != null) {
            this.onInit();
        }
    };

    this.born = function (line, column) {

        this.cells[line + "," + column] = 1;

        if (this.onChange != null) {
            this.onChange(line, column, "alive");
        }
    };

    this.kill = function (line, column) {

        delete this.cells[line + "," + column];

        if (this.onChange != null) {
            this.onChange(line, column, "dead");
        }
    };

    this.isAlive = function (line, column) {
        return this.cells[line + "," + column] == 1;
    };

    this.appendIfAlive = function (array, line, column) {

        if (this.isAlive(line, column)) {
            array.push({ line, column });
        }

        return array;
    };

    this.getAliveNeighbors = function (line, column) {

        var array = [];

        array = this.appendIfAlive(array, line - 1, column - 1);
        array = this.appendIfAlive(array, line - 1, column);
        array = this.appendIfAlive(array, line - 1, column + 1);

        array = this.appendIfAlive(array, line, column - 1);
        array = this.appendIfAlive(array, line, column + 1);

        array = this.appendIfAlive(array, line + 1, column - 1);
        array = this.appendIfAlive(array, line + 1, column);
        array = this.appendIfAlive(array, line + 1, column + 1);


        return array;
    };

    // retorna quantos vizinhos vivos esta celula tem
    this.getNumberOfAliveNeighbors = function (line, column) {
        return this.getAliveNeighbors(line, column).length;
    };

    this.toggleCell = function(line, column) {

        if (this.isAlive(line, column)) {
            this.kill(line, column);
        } else {
            this.born(line, column);
        }
    };

    this.getCells = function(){

        return Object.keys(this.cells).map(key => {

            let parts = key.split(",");

            return{
                line:parseInt(parts[0]),
                column: parseInt(parts[1])
            };
        });
    };

    this.step = function () {

        let pending = new Set();

        Object.keys(this.cells).forEach(key => {

            let parts = key.split(",");
            let line = parseInt(parts[0]);
            let column = parseInt(parts[1]);

            pending.add((line - 1) + "," + (column - 1));
            pending.add((line - 1) + "," + (column));
            pending.add((line - 1) + "," + (column + 1));

            pending.add((line) + "," + (column - 1));
            pending.add((line) + "," + (column));
            pending.add((line) + "," + (column + 1));

            pending.add((line + 1) + "," + (column - 1));
            pending.add((line + 1) + "," + (column));
            pending.add((line + 1) + "," + (column + 1));
        });

        var nextState = new Array();

        pending.forEach(key => {

            let parts = key.split(",");
            let i = parseInt(parts[0]);
            let j = parseInt(parts[1]);

            var nAliveNeighbors = this.getNumberOfAliveNeighbors(i, j);

            //1 - Qualquer célula viva com menos de dois vizinhos vivos morre de solidão.
            if (this.isAlive(i, j) && nAliveNeighbors < 2) {
                nextState.push({ line: i, column: j, next: "dead" });
            }
            //2 - Qualquer célula viva com mais de três vizinhos vivos morre de superpopulação.
            else if (this.isAlive(i, j) && nAliveNeighbors > 3) {
                nextState.push({ line: i, column: j, next: "dead" });
            }
            //3 - Qualquer célula com exatamente três vizinhos vivos se torna uma célula viva.
            else if (nAliveNeighbors == 3) {
                nextState.push({ line: i, column: j, next: "alive" });
            }
            //3 - Qualquer célula com dois vizinhos vivos continua no mesmo estado para a próxima geração.
            else if (nAliveNeighbors == 2) {
                //Stay state
            }
        });

        var that = this;

        nextState.forEach(function (state) {
            if (state.next == "dead") {
                that.kill(state.line, state.column);
            } else if (state.next == "alive") {
                that.born(state.line, state.column);
            }
            if (that.onChange != null) {
                that.onChange(state.line, state.column, state.next);
            }
        });
    };

    this.init();
};
