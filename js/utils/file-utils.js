class FileUtils {

    static parseContent(content, hasHeader=false) {

        var data = [];

        content.trim().split(/\r?\n/).forEach((rows, i) => {

            if (hasHeader && i == 0) {
                return;
            }

            rows = rows.trim();

            if (!rows) {
                return;
            }

            const parts = rows.split(",").map(e => e.trim());

            if (parts.length < 2) {
                return;
            }

            const iVal = parseInt(parts[0], 10);
            const jVal = parseInt(parts[1], 10);

            if (Number.isNaN(iVal) || Number.isNaN(jVal)) {
                return;
            }

            data.push({
                i: iVal,
                j: jVal,
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

    static exportToCSV(cells, fileName = "positions.csv") {

        let content = "";

        for (const cell of cells.values()) {
            content += cell.toString() + "\n";
        }

        var file = new File([content], fileName, { type: "text/csv;charset=utf-8" });

        saveAs(file);
    }
}

if (typeof module !== "undefined") {
    module.exports = FileUtils;
}
