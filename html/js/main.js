'use strict';

var listener = class listener {
    constructor() {
        // document.addEventListener('click', function (e) {
        //     console.log(e);
        // });
        this.initializedButton = this.initializedButton.bind(this);
        this.addActionBlock = this.addActionBlock.bind(this);
    }

    get getScanandsave() {
        return this.scanAndSave();
    }

    addActionBlock(e) {
        if (e.target.parentNode.nodeName.toLowerCase() == 'tr') {
            let actionFirstLetter = buttonClick.substring(0, 1);
            let actionBlock = document.createElement('div');
            let p = document.createElement('p');
            p.innerHTML = buttonClick;
            actionBlock.className = className;;
            actionBlock.classList.add(`${actionFirstLetter}_${e.target.className}`);
            actionBlock.appendChild(p);
            e.target.appendChild(actionBlock);
            if (className == "loopBlock") {
                let grid = document.querySelectorAll('td');
                let color = document.querySelector('.loopButton').classList[1];
                for (var i = 0; i < 6; i++) {
                    grid[i].style.backgroundColor = color;
                }
            } else if (className == "functionBlock") {
                let grid = document.querySelectorAll('td');
                let color = document.querySelector('.functionButton').classList[1];
                for (var i = 0; i < 6; i++) {
                    grid[i].style.backgroundColor = color;
                }
            }
        }
        table.removeEventListener('click', this.addActionBlock);
    }

    scanAndSave() {
        let grid = document.querySelectorAll('td');
        let scan = [];
        grid.forEach(function (element) {
            if (element.childNodes[0] != null) {
                scan.push(element);
                // element.style.backgroundColor = '#2ecc71';
            } else {
                // element.style.backgroundColor = '#FFEB3B';
            }
        }, this);
        return scan;
    }

    initializedButton(i, noItems) {
        let table = document.querySelector('.table');
        let tr = document.createElement('tr');
        tr.className = 'tr' + i;
        for (let i = 0; i < noItems; i++) {
            let td = document.createElement('td');
            td.className = `${tr.className}_td${i + 1}`;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
};

var codeBlocks = [];
var op = new listener();
var table;
var buttonClick;
var className;

window.addEventListener('load', function (e) {
    table = document.querySelector('table');
    let noItems = 12;
    for (var index = 0; index < 20; index++) {
        op.initializedButton(index + 1, noItems);
    }
    document.querySelector('.loopButton').classList.add("#7C4DFF");
    document.querySelector('.functionButton').classList.add("#FF3D00");
    document.addEventListener('click', function (e) {
        if (e.target.type == 'button' || e.target.tagName == 'BUTTON') {
            if (e.target.classList[0] == 'actionButton') {
                className = "actionBlock";
                buttonClick = e.target.value;
                table.addEventListener('click', op.addActionBlock);
            } else if (e.target.classList[0] == 'loopButton') {
                className = "loopBlock";
                buttonClick = e.target.value;
                table.addEventListener('click', op.addActionBlock);
            } else if (e.target.classList[0] == 'functionButton') {
                className = "functionBlock";
                buttonClick = e.target.value;
                table.addEventListener('click', op.addActionBlock);
            } else if (e.target.className == 'runButton') {
                codeBlocks = [];
                op.getScanandsave.forEach(function (element) {
                    let split = element.childNodes[0].classList[1].split('_');
                    codeBlocks.push(split[0]);
                }, this);

                //Send moves to PHP File using AJAX
                if (codeBlocks.length == 0) {
                    alert('Please insert Action Block');
                } else {
                    $.ajax({
                        type: "POST",
                        url: "../response.php",
                        data: {
                            codeBlock: codeBlocks
                        },
                        success: function (response) {
                            console.log(response);
                        }
                    });
                }
            } else if (e.target.className == 'uploadButton') {
                $.ajax({
                    type: "GET",
                    url: "../mqtt/getActionandSend.php",
                    data: {
                        message: 'U'
                    },
                    success: function (response) {
                        console.log(response);
                    }
                });
            } else if (e.target.className == 'bootButton') {
                $.ajax({
                    type: "GET",
                    url: "../mqtt/getActionandSend.php",
                    data: {
                        message: 'V'
                    },
                    success: function (response) {
                        console.log(response);
                    }
                });
            }
        }
    });
});