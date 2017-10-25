var express = require("express");
var app = express();
var wpi = require("wiringpi-node")
var initialised = false;

wpi.wiringPiSetupGpio()

app.use(express.static(__dirname));

function initialise()
{
        wpi.pinMode(7, wpi.OUTPUT);
        wpi.pinMode(8, wpi.OUTPUT);
        wpi.pinMode(9, wpi.OUTPUT);
        wpi.pinMode(10, wpi.OUTPUT);
	initialised = true;
	console.log("Initialised");
}

app.get("/", function(req, res) {
        if (!initialised) {
                initialise();
        }
        res.sendFile("index.html", {root : __dirname});
})

app.get("/forwards", function(req, res) {
        if (!initialised) {
                initialise();
        }
	console.log("forwards")
        wpi.digitalWrite(7, wpi.HIGH);
        wpi.digitalWrite(8, wpi.LOW);
        wpi.digitalWrite(9, wpi.HIGH);
        wpi.digitalWrite(10, wpi.LOW);
})
app.get("/backwards", function(req, res) {
        if (!initialised) {
                initialise();
        }
	console.log("backwards")
        wpi.digitalWrite(7, wpi.LOW);
        wpi.digitalWrite(8, wpi.HIGH);
        wpi.digitalWrite(9, wpi.LOW);
        wpi.digitalWrite(10, wpi.HIGH);
})
app.get("/left", function(req, res) {
        if (!initialised) {
                initialise();
        }
        wpi.digitalWrite(7, wpi.HIGH);
        wpi.digitalWrite(8, wpi.LOW);
        wpi.digitalWrite(9, wpi.LOW);
        wpi.digitalWrite(10, wpi.HIGH);
	console.log("left")
})
app.get("/right", function(req, res) {
        if (!initialised) {
                initialise();
        }
	console.log("right")
        wpi.digitalWrite(7, wpi.LOW);
        wpi.digitalWrite(8, wpi.HIGH);
        wpi.digitalWrite(9, wpi.HIGH);
        wpi.digitalWrite(10, wpi.LOW);
})
app.get("/stop", function(req, res) {
	console.log("stop")
        wpi.digitalWrite(7, wpi.LOW);
        wpi.digitalWrite(8, wpi.LOW);
        wpi.digitalWrite(9, wpi.LOW);
        wpi.digitalWrite(10, wpi.LOW);
})

app.listen(3000)


