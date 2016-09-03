var eventSource = new EventSource("/stream");

var angle_old = 0;

eventSource.onmessage = function(e) {
	if(e.data!=angle_old){
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
		radians = e.data/180*Math.PI;
		angle_old = e.data;
		radians_old = angle_old/180*Math.PI;
		drawCompass(radians);
	};
};
