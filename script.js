var info = [];
var subject = [];

function exec(btnClass, btnId) {
    var checkId = checkBtn(btnId);
    if (btnClass == "add") {
        addRow(btnId, checkId);
    } else if (btnClass == "save") {
        save(btnId, checkId);
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
    cell.innerHTML = "<td height=20px><select id='major'><option value='1'>교양</option><option value='2'>전공</option></select></td>";

    cell = row.insertCell();
    cell.innerHTML = "<td><select id='essential'><option value='1'>선택</option><option value='2'>필수</option></select></td>";

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

function save(btnId, tableId) {
    try {
        var table = document.getElementById(tableId);
        var range = table.rows.length - 3;
        var sumTotal = 0;
        var key = 0;
    } catch(e) {

    }
    /*
        각 입력값이 조건을 만족하는지 검사하고 과목의 정보를 배열로 저장
    */
    for (var i = 3; i < (range + 3); i++) {
        sumTotal = 0;
        subject = [];
        for (var j = 1; j < 9; j++) {
            if (j == 1 || j == 2) { //셀렉트 박스
                var selectValue = table.childNodes[2].childNodes[i].childNodes[j].childNodes[0].options[table.childNodes[2].childNodes[i].childNodes[j].childNodes[0].selectedIndex].text;
                subject.push(selectValue);
            } else if (j == 3) { //과목명
                var subjectName = table.childNodes[2].childNodes[i].childNodes[j].textContent;
                var flag = isNumeric(subjectName);
                if (flag == 1) {
                    alert("과목명을 입력해주세요");
                    return;
                }
                subject.push(subjectName);
            } else if (j == 4) { //학점
                var subjectCount = table.childNodes[2].childNodes[i].childNodes[j].textContent;
                var flag = isNumeric(subjectCount);
                if (flag == 2 || flag == 1) {
                    alert("올바른 학점을 입력해주세요");
                    return;
                } else if (flag == 0) {
                    subjectCount = parseInt(subjectCount);
                }
                subject.push(subjectCount);
            } else { //각 점수
                var tagValue = table.childNodes[2].childNodes[i].childNodes[j].textContent;
                var flag = isNumeric(tagValue);
                if (flag == 2) {
                    alert("올바른 숫자를 입력해주세요");
                    return;
                } else if (flag == 1) {
                    tagValue = 0;
                } else if (flag == 0) {
                    tagValue = parseInt(tagValue);
                    if (tagValue < 0 || tagValue > 40) {
                        alert("점수의 범위는 0~40점 사이입니다.");
                        return;
                    }
                }
                if (sumTotal > 100) {
                    alert("점수의 합은 100점을 초과할 수 없습니다.");
                    return;
                }
                subject.push(parseInt(tagValue));
                sumTotal += parseInt(tagValue);
            }
        }
        if (sumTotal != 0) {
            key += 1;
        }
        subject.push(sumTotal);
        info.push(subject);
    }

    /*
        배열 정렬
    */
    var sortInfo = info.sort();

    /*
        테이블에 정렬한대로 세팅 후 평균값에 따라 성적 매기기
    */
    try {
        var column = sortInfo.length;
        var row = sortInfo[0].length;
        for (var i = 1; i <= column; i++) {
            for (var j = 1; j <= row; j++) {
                if (j == 1 || j == 2) {
                    for (var k = 0; k < 3; k++) {
                        if (table.childNodes[2].childNodes[i + 2].childNodes[j].childNodes[0].options[k].text == sortInfo[i - 1][j - 1]) {
                            table.childNodes[2].childNodes[i + 2].childNodes[j].childNodes[0].options[k].selected = true;
                            break;
                        }
                    }
                } else if (j == 3 || j == 4) {
                    table.childNodes[2].childNodes[i + 2].childNodes[j].childNodes[0].textContent = sortInfo[i - 1][j - 1];
                } else {
                    if (sortInfo[i - 1][8] == 0) {
                        table.childNodes[2].childNodes[i + 2].childNodes[j].childNodes[0].textContent = "";
                        var subjectGrade = checkGrade(sortInfo[i - 1][8]);
                        table.childNodes[2].childNodes[i + 2].childNodes[11].innerHTML = subjectGrade;
                    } else {
                        table.childNodes[2].childNodes[i + 2].childNodes[j].childNodes[0].textContent = String(sortInfo[i - 1][j - 1]);
                        var subjectGrade = checkGrade(sortInfo[i - 1][8]);
                        table.childNodes[2].childNodes[i + 2].childNodes[11].innerHTML = subjectGrade;
                    }
                }
            }
        }

        /*
            점수별 합계 더하기
        */
        for (var j = 1; j < 7; j++) {
            var gradeSum = 0;
            for (var i = 3; i < (range + 3); i++) {
                var tagSum = table.childNodes[2].childNodes[i].childNodes[j + 3].textContent;
                if (tagSum == "") {
                    tagSum = 0;
                }
                gradeSum += parseInt(tagSum);
            }
            if (gradeSum == 0 && key == 0) continue;
            else table.childNodes[2].childNodes[range + 3].childNodes[j * 2].textContent = gradeSum;
        }
    } catch (e) {
        var empty = ['credit', 'attend', 'assignment', 'mid', 'final', 'sum', 'avg', 'grade'];
        for (var i = 0; i < empty.length; i++) {
            console.log(btnId);
            var emptyId = empty[i] + btnId;
            document.getElementById(emptyId).innerText = "";
        }
    } finally {

    }

    /*
    전체 평균 및 성적 구하기
    */
    var checking = table.childNodes[2].childNodes[range + 3].childNodes[12].textContent;
    var totalGrade = (parseInt(checking) / key).toFixed(2);
    if (!isNaN(totalGrade)) { //보통의 경우
        table.childNodes[2].childNodes[range + 3].childNodes[14].textContent = totalGrade; //전체평균
        getGrade = checkGrade(totalGrade);
        table.childNodes[2].childNodes[range + 3].childNodes[16].innerHTML = getGrade; //성적
    } else { //P만 있을 경우
        table.childNodes[2].childNodes[range + 3].childNodes[14].textContent = ""; //전체평균
        table.childNodes[2].childNodes[range + 3].childNodes[16].innerHTML = ""; //성적
    }
    info = [];
    subject = [];
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
            save(btnId, tableId);
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
