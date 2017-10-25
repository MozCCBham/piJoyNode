console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");

var joystick	= new VirtualJoystick({
        container	: document.getElementById('container'),
        mouseSupport	: true,
        limitStickTravel: true,
        stickRadius     : 50
});
joystick.addEventListener('touchStart', function(){
        console.log('down');
});
joystick.addEventListener('touchEnd', function(){
        console.log('up');
});

var xhr = new XMLHttpRequest();

setInterval(function(){
        var outputEl	= document.getElementById('result');
        outputEl.innerHTML	= '<b>Result:</b> '
                + ' dx:'+joystick.deltaX()
                + ' dy:'+joystick.deltaY()
                + (joystick.right()	? ' right'	: '')
                + (joystick.up()	? ' up'		: '')
                + (joystick.left()	? ' left'	: '')
                + (joystick.down()	? ' down' 	: '')	
	var address = ''
        if (joystick.up()) {
		address = 'forwards';
	}
        else if (joystick.down()) {
		address = 'backwards';
	}
        else if (joystick.right()) {
		address = 'right';
	}
        else if (joystick.left()) {
		address = 'left';
	}
        else {
		address = 'stop'
	}
	xhr.open('GET', address, true);
	xhr.send(null)
}, 1/30 * 1000);
