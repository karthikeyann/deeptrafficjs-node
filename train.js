//var window = self;
importScripts = function(file) { return require(__dirname+'/'+file); }
postMessage=console.log;
writeNet = function () {
    //var data = fs.readFileSync('net.js') + "\n/*###########*/\n";
    var data = code.split("\n/*###########*/\n")[0];
    if (brain) {
        data += "if (brain) {\nbrain.value_net.fromJSON(" + JSON.stringify(brain.value_net.toJSON()) + ");\n}";
    }
    const path = require('path');
    new_file = path.dirname(file) + "/" + "trained_" + path.basename(file);
    fs.writeFileSync(new_file, data );
    console.log("The file " + new_file + " was saved!");
}

convnetjs     = importScripts("convnetjs/convnet.js");
cnnutil       = importScripts("convnetjs/util.js");
cnnvis        = importScripts("convnetjs/vis.js");
deepqlearn    = importScripts("convnetjs/deepqlearn.js");
importScripts("convnetjs/helperStuff.js");
headless = true;

function startEvalRun(code) {
    eval(code);
    importScripts("gameopt.js");

    if (typeof brain != 'undefined') {
        brain.learning = true;
    }
    if (trainIterations > 0) {
        var totalFrames = 30 /*decisionFrequency*/ * trainIterations;
        var numRuns = totalFrames / 100000 + 1;
        var percent = 0;
        doEvalRun(numRuns, totalFrames / numRuns, function () {
            console.log(percent + "% done");
            //if (percent > 0 && percent % 10 == 0) {
            //postMessage({
            //    net: brain.value_net.toJSON()
            //});
            //}
            percent++;
        }, totalFrames / 100);
    }
    if (typeof brain != 'undefined') {
        brain.learning = false;
    }
    postMessage({
        net: brain.value_net.toJSON()
    });
    console.log("training done");
}
//  MAIN FUNCTION - TRAIN
if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " model.js");
    process.exit(-1);
}
file = process.argv[2];
console.log('File: ' + file);
fs = require('fs');
code = fs.readFileSync(file, 'utf8');
//eval(code);
startEvalRun(code);
writeNet(); 
process.exit();
