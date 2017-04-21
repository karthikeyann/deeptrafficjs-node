//var window = self;
importScripts = function(file) { return require(__dirname+"/"+file); }
convnetjs     = importScripts("convnetjs/convnet.js");
cnnutil       = importScripts("convnetjs/util.js");
cnnvis        = importScripts("convnetjs/vis.js");
deepqlearn    = importScripts("convnetjs/deepqlearn.js");
importScripts("convnetjs/helperStuff.js");
headless = true;

function startEvalRun(code) {
    //console.log(code);
    eval(code);
    importScripts("gameopt.js");

    if (typeof brain != 'undefined') {
        brain.learning = false;
    }
    var runs = 10;
    var frames = 100000;
    var percent = 0;
    var mph = doEvalRun(runs, frames, function () {
        if(percent % 10 == 0)
        console.log(percent + "% done");
        percent++;
    }, runs * frames / 100);
    if (typeof brain != 'undefined') {
        brain.learning = true;
    }
    console.log("mph :" + mph);
}
//  MAIN FUNCTION - EVALUATE
if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " model.js");
    process.exit(-1);
}
var file = process.argv[2];
console.log('File: ' + file);
fs = require('fs');
code = fs.readFileSync(file, 'utf8');
//eval(code);
startEvalRun(code);
process.exit();
