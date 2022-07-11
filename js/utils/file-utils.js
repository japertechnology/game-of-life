class FileUtils {

    static parseContent(content, hasHeader) {

        var data = [];

        content.split("\n").forEach((rows, i) => {

            if (hasHeader && i == 0) {
                return;
            }

            rows = rows.trim();

            if (!rows) {
                return;
            }

            let array = rows.split(",").map(e => parseFloat(e));

            data.push({
                x: array[0],
                y: array[1],
            });
        });

        return data;
    }

    static readCSV(file, hasHeader, callback) {

        var fileReader = new FileReader();

        fileReader.onload = function (e) {

            var content = e.target.result;

            let data = FileUtils.parseContent(content, hasHeader);

            callback && callback(data);
        };

        fileReader.readAsText(file);
    }

    static exportToCSV(cells, fileName) {

        let content = "";

        for (const cell of cells.values()) {
            content += cell.toString() + "\n";
        }

        var file = new File([content], fileName, {type: "text/plain;charset=utf-8"});

        console.log(file);

        // var blob = new Blob([content], { type: "text/csv;charset=utf-8" });

        saveAs(file);
    }
}
