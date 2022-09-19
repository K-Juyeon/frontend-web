var info = [];
var subject = [];

function exec(btnClass, btnId) {
    var checkId = checkBtn(btnId);
    if (btnClass == "add") {
        addRow(btnId, checkId);
    } else if (btnClass == "save") {
        save(checkId);
    } else if (btnClass == "delete") {
        delRow(btnId, checkId);
    }
}

function addRow(btnId, tableId) {
    var table = document.getElementById(tableId);
    var row = table.insertRow(table.rows.length - 1);
    var check = parseInt(btnId);

    var cell;

    cell = row.insertCell();
    cell.innerHTML = "<td><input type='checkbox' name='chkbox" + check + "'></td>"

    cell = row.insertCell();
    cell.innerHTML = "<td height=20px><select id='major'><option value='1'>전공</option><option value='2'>교양</option></select></td>";

    cell = row.insertCell();
    cell.innerHTML = "<td><select id='essential'><option value='1'>필수</option><option value='2'>선택</option></select></td>";

    cell = row.insertCell();
    cell.innerHTML = "<td><div contentEditable=true style='text-align:left'></div></td>";

    cell = row.insertCell();
    cell.innerHTML = "<td><div contentEditable=true style='text-align:center'></div></td>";

    cell = row.insertCell();
    cell.innerHTML = "<td><div contentEditable=true style='text-align:center'></div></td>";

    cell = row.insertCell();
    cell.innerHTML = "<td><div contentEditable=true style='text-align:center'></div></td>";

    cell = row.insertCell();
    cell.innerHTML = "<td><div contentEditable=true style='text-align:center'></div></td>";

    cell = row.insertCell();
    cell.innerHTML = "<td><div contentEditable=true style='text-align:center'></div></td>";

    cell = row.insertCell();
    cell.innerHTML = "<td><div style='width:90%; height:100%; border:none; text-align:center;'></div></td>";

    cell = row.insertCell();
    cell.innerHTML = "<td><div style='width:90%; height:100%; border:none; text-align:center;'></div></td>";

    cell = row.insertCell();
    cell.innerHTML = "<td><div style='width:90%; height:100%; border:none; text-align:center;'></div></td>";
}

function save(tableId) {
    var table = document.getElementById(tableId);
    var range = table.rows.length - 3;
    var sumTotal = 0;
    var key = 0;
    sorting(tableId);
    for (var i = 3; i < (range + 3); i++) {
        sumTotal = 0;
        for (var j = 5; j < 9; j++) {
            /*
                한 과목의 총점 더하기
            */
            var tagValue = table.childNodes[2].childNodes[i].childNodes[j].textContent;
            var flag = isNumeric(tagValue);
            if (flag == 2) {
                alert("!!올바른 숫자를 입력해주세요!!");
                return;
            } else if (flag == 1) {
                tagValue = 0;
            } else if (flag == 0) {
                tagValue = parseInt(tagValue);
                if (tagValue < 0 || tagValue > 40) {
                    console.log(tagValue);
                    alert("점수의 범위는 0~40점 사이입니다.");
                    return;
                }
            }
            sumTotal += parseInt(tagValue);
            if (sumTotal > 100) {
                alert("점수의 합은 100점을 초과할 수 없습니다.");
                return;
            }
        }
        if (sumTotal != 0) {
            table.childNodes[2].childNodes[i].childNodes[9].textContent = sumTotal;
            key += 1;
        }

        /*
        성적 구하기(A+, A0 등)
        */
        var subjectGrade = checkGrade(sumTotal);
        table.childNodes[2].childNodes[i].childNodes[11].innerHTML = subjectGrade;
    }

    /*
    점수별 합계 더하기
    */
    for (var j = 1; j < 7; j++) {
        var gradeSum = 0;
        for (var i = 3; i < (range + 3); i++) {
            var tagSum = table.childNodes[2].childNodes[i].childNodes[j + 3].textContent;
            var flag = isNumeric(tagSum);
            if (j != 6) {
                if (flag == 2) {
                    alert("!!올바른 숫자를 입력해주세요!!");
                    return;
                } else if (flag == 1) {
                    tagSum = 0;
                } else if (flag == 0) {
                    tagSum = parseInt(tagSum);
                    if (tagSum < 0 || tagSum > 40) {
                        alert("점수의 범위는 0~40점 사이입니다.");
                        return;
                    }
                }
            }
            gradeSum += parseInt(tagSum);
        }
        table.childNodes[2].childNodes[range + 3].childNodes[j * 2].textContent = gradeSum;
    }

    /*
    전체 평균 및 성적 구하기
    */
    var checking = table.childNodes[2].childNodes[range + 3].childNodes[12].textContent;
    var totalGrade = (parseInt(checking) / key).toFixed(2);
    table.childNodes[2].childNodes[range + 3].childNodes[14].textContent = totalGrade; //전체평균
    getGrade = checkGrade(totalGrade);
    table.childNodes[2].childNodes[range + 3].childNodes[16].innerHTML = getGrade; //성적
}

function sorting(tableId) {
    var table = document.getElementById(tableId);
    var range = table.rows.length - 3;

    for (var i = 3; i < (range + 3); i++) {
        subject = [];
        for (var j = 1; j < 9; j++) {
            if (j == 1 || j == 2) {
                var selectValue = table.childNodes[2].childNodes[3].childNodes[j].childNodes[0].options[table.childNodes[2].childNodes[3].childNodes[j].childNodes[0].selectedIndex].value
                subject.push(selectValue);
            } else if (i == 3) {
                var subjectName = table.childNodes[2].childNodes[3].childNodes[j].textContent;
                subject.push(subjectName);
            }
        }
    }
    console.log(subject);
}

function delRow(btnId, tableId) {
    /*
    선택한 행 삭제하기
    */
    var table = document.getElementById(tableId);
    var range = table.rows.length - 3;
    var check = parseInt(btnId);

    for (var i = 0; i < (range + 1); i++) {
        var chkbox = document.getElementsByName("chkbox" + check);
        try {
            if (chkbox[i].checked) {
                table.deleteRow(i + 2);
                i--;
            }
        } catch (e) {
            continue;
        } finally {
            save(tableId);
        }
    }
}

function checkGrade(grade) {
    /*
    점수 체크하여 성적 매기기
    */
    var getGrade = "";
    if (grade >= 95) getGrade = "A+";
    else if (grade >= 90) getGrade = "A0";
    else if (grade >= 85) getGrade = "B+";
    else if (grade >= 80) getGrade = "B0";
    else if (grade >= 75) getGrade = "C+";
    else if (grade >= 70) getGrade = "C0";
    else if (grade >= 65) getGrade = "D+";
    else if (grade >= 60) getGrade = "D0";
    else if (grade >= 1) getGrade = "<div style='color:red;'>F</div>";
    else getGrade = "P";
    return getGrade;
}

function checkBtn(btnId) {
    /*
        어느 테이블의 버튼이 클릭되었는지 확인
    */
    if (btnId == "1") {
        return "first";
    } else if (btnId == "2") {
        return "second";
    } else if (btnId == "3") {
        return "third";
    }
}

function isNumeric(val) {
    /*
        입력 값이 올바른 숫자인지 검사
    */
    if (val == "") {
        return 1;
    } else {
        if (isNaN(Number(val))) {
            return 2;
        } else {
            return 0;
        }
    }
}