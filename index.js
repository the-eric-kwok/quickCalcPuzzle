(function () {
    function obelusPuzzleGenerator() {
        let opr1 = 0, opr2 = 0;
        while (!(opr1 > 10000 && opr1 < 99999 && opr2 > 1)) {
            opr1 = parseFloat((Math.random() * 100000).toFixed(1));
            opr2 = parseFloat((Math.random() * 100).toFixed(1));
            if (opr2 > 10 && Math.random() > 0.5) {
                opr2 = parseInt(opr2);
            }
            if (opr2 < 10 && opr2 % 1 === 0) {
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

    function plusAndSubGenerator() {
        let opr1 = 0, opr2 = 0, opr3 = 0;
        while (!(opr1 > 100 && opr1 < 999 && opr2 > 100 && opr2 < 999 && opr3 > 100 && opr3 < 999)) {
            opr1 = parseInt(Math.random() * 1000);
            opr2 = parseInt(Math.random() * 1000);
            opr3 = parseInt(Math.random() * 1000);
        }
        return [opr1, opr2, opr3, Math.random() > 0.5 ? "+" : "-", Math.random() > 0.5 ? "+" : "-"];
    }

    function refreshPuzzle() {
        if (document.querySelector('input[name="type"]:checked').value === "multiply") {
            let puzzle = multiplyPuzzleGenerator();
            document.getElementById("puzzle").innerHTML = `${puzzle[0]} × ${puzzle[1]} = `;
            document.getElementById("answer").innerHTML = puzzle[0] * puzzle[1];
        } else if (document.querySelector('input[name="type"]:checked').value === "obelus") {
            let puzzle = obelusPuzzleGenerator();
            document.getElementById("puzzle").innerHTML = `${puzzle[0]} ÷ ${puzzle[1]} = `;
            document.getElementById("answer").innerHTML = parseFloat((puzzle[0] / puzzle[1]).toFixed(1));
        } else {
            let puzzle = plusAndSubGenerator();
            document.getElementById("puzzle").innerHTML = `${puzzle[0]} ${puzzle[3]} ${puzzle[1]} ${puzzle[4]} ${puzzle[2]} = `;
            let answer = puzzle[0];
            for (let i = 1; i < 3; i++) {
                if (puzzle[i + 2] === "+")
                    answer += puzzle[i];
                else
                    answer -= puzzle[i];
            }
            document.getElementById("answer").innerHTML = answer;
        }
    }

    window.onload = function () {
        document.getElementById("show-answer").addEventListener("click", function () {
            if (document.getElementById("show-answer").innerText === "显示答案") {
                document.getElementById("answer").style = "visibility: none;";
                document.getElementById("show-answer").innerText = "下一题";
            } else if (document.getElementById("show-answer").innerText === "下一题") {
                refreshPuzzle();
                document.getElementById("user-answer").value = "";
                document.getElementById("answer").style = "visibility: hidden;";
                document.getElementById("show-answer").innerText = "显示答案";
            }
        });
        document.querySelectorAll('input[name="type"]').forEach(elem => {
            elem.addEventListener("click", function () {
                refreshPuzzle();
                document.getElementById("answer").style = "visibility: hidden;";
                document.getElementById("show-answer").innerText = "显示答案";
            });
        });
        document.body.addEventListener("click", () => {
            // 点击答案输入框外面时让输入框失焦，以收起软键盘
            document.body.focus();
        })
        // 触摸板禁止手指缩放
        document.addEventListener('wheel', function (event) {
            event.preventDefault()
        }, { passive: false })
        refreshPuzzle();
    };
})()


