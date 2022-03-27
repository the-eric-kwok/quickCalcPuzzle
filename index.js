(function () {
    let obelusSign = "÷";
    let multiSign = "×";

    function obelusPuzzleGenerator() {
        let opr1 = 0, opr2 = 0;
        while (!(opr1 > 10000 && opr1 < 99999 && opr2 > 1)) {
            opr1 = parseFloat((Math.random() * 100000).toFixed(1));
            opr2 = parseFloat((Math.random() * 100).toFixed(1));
            if (opr2 > 10) {
                opr2 = parseInt(opr2);
            } else if (opr2 < 10 && opr2 % 1 === 0) {
                opr2 + parseFloat(((Math.random() + 0.1) * 0.9).toFixed(1));
            }
        }
        return [opr1, opr2];
    }

    function multiplyPuzzleGenerator() {
        let opr1 = 0, opr2 = 0;
        while (!(opr1 > 10 && opr1 < 99 && opr2 > 10 && opr2 < 99)) {
            opr1 = parseInt(Math.random() * 100);
            opr2 = parseInt(Math.random() * 100);
        }
        return [opr1, opr2];
    }

    function refreshPuzzle() {
        if (document.querySelector('input[name="type"]:checked').value === "multiply") {
            let puzzle = multiplyPuzzleGenerator();
            document.querySelector("#puzzle").innerHTML = puzzle[0] + " " + multiSign + " " + puzzle[1] + " =";
            document.querySelector("#answer").innerHTML = puzzle[0] * puzzle[1];
        } else {
            let puzzle = obelusPuzzleGenerator();
            document.querySelector("#puzzle").innerHTML = puzzle[0] + " " + obelusSign + " " + puzzle[1] + " =";
            document.querySelector("#answer").innerHTML = parseFloat((puzzle[0] / puzzle[1]).toFixed(1));
        }
    }

    window.onload = function () {
        document.querySelector("#show-answer").addEventListener("click", function () {
            document.getElementById("answer").style = "visibility: none;";
        });
        document.querySelector("#next").addEventListener("click", function () {
            refreshPuzzle();
            document.getElementById("answer").style = "visibility: hidden;";
        });
        document.querySelectorAll('input[name="type"]').forEach(elem => {
            elem.addEventListener("click", function () {
                refreshPuzzle();
                document.getElementById("answer").style = "visibility: hidden;";
            });
        })
        refreshPuzzle();
    };
})()


