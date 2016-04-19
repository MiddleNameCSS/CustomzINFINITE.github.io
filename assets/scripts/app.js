/*!
 * Scripts For MiddleNameCSS.github.io
 * Author: Zack Daugherty
 * Github Name: MiddleNameCSS
 * Copyright (c) 2016 MiddleNameCSS
 */
;(function () {

    if (isAPIAvailable()) {
        $('#files').bind('change', handleFileSelect);
    }

});

function isAPIAvailable() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        return true;
    } else {
        document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
        document.writeln(' - Google Chrome: 13.0 or later<br />');
        document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
        document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
        document.writeln(' - Safari: Not supported<br />');
        document.writeln(' - Opera: Not supported');
        return false;
    }
}

function handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (event) {
        var csv = event.target.result;
        var data = $.csv.toArrays(csv);
        var html = '<thead>';
        var thend = '</thead>';
        var rowtag = 'th';

        for (var row in data) {
            html += '<tr>';
            for (var item in data[row]) {
                html += '<' + rowtag + '>' + data[row][item] + '</' + rowtag + '>';
            }
            html += '</tr>';
            html += thend;
            thend = '';
            rowtag = 'td';
        }
        $('#contents').html(html);
        $('#contents').DataTable();
    };
    reader.onerror = function () {
        alert('Unable to read ' + file.fileName);
    };
}