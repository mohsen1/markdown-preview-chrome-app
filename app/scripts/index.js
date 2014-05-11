'use strict';
/* global markdown */

document.addEventListener('DOMContentLoaded', function() {
    
}, false);

function render(markdownStr){
    var output = document.getElementById('output');
    output.innerHTML = markdown.toHTML(markdownStr);
}

function readAsText(fileEntry, callback) {
    fileEntry.file(function(file) {
        var reader = new FileReader();

        reader.onerror = function(err){
            console.error('TODO', err);
        };
        reader.onload = function(e) {
            callback(e.target.result);
        };

        reader.readAsText(file);
    });
}


new DnDFileController('body', function(data){
    var item = null;
    if(data && data.items && data.items.length){
        item = data.items[0];
    } else {
        return;
    }
    if (item.kind == 'file' && item.webkitGetAsEntry) {
        readAsText(item.webkitGetAsEntry(), render);
    }
});

render('##Simply drop markdown files here!');