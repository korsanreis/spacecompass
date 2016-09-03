var gray_lighter='#eee';
var blue ='#337ab7';
var red =  '#d9534f';
var purple = '#BA55D3';

function Compass(){
	
	var radius = 140;
	
	this.drawCircle = function(){
		ctx.beginPath();
		ctx.arc(0, 0, 0.8*radius, 0, 2 * Math.PI, false);
	    ctx.lineWidth = 5;
		ctx.strokeStyle = gray_lighter;
		ctx.stroke();
	}

	this.drawMiniTicks = function(){
		for(i=0;i<180;i++){
			var angle = i*2;
			var radians = angle/180*Math.PI;
			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.rotate(radians);
			ctx.moveTo(0, -0.8*radius);
			ctx.lineTo(0, -0.89*radius);
	        ctx.strokeStyle = gray_lighter;
			ctx.stroke();
			ctx.rotate(-radians);
		};
	};

	this.drawMajorTicks = function(){
		for(i=0;i<12;i++){
			var angle = i*30;
			var radians = angle/180*Math.PI;
			ctx.beginPath();
			ctx.lineWidth = 3;
			ctx.rotate(radians);
			ctx.moveTo(0, -0.8*radius);
			ctx.lineTo(0, -1.0*radius);
	        ctx.strokeStyle = gray_lighter;
			ctx.stroke();
			ctx.rotate(-radians);
		};
	}

	this.drawNumbers = function(bearing){
		ctx.font = radius*0.15 + "px Calibri";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		for(i=0;i<12;i++){
			angle = i*30;
			radians = angle/180*Math.PI;
			ctx.rotate(radians);
			ctx.translate(0,-1.2*radius);
			ctx.rotate(-radians);
			ctx.rotate(-bearing);
			ctx.fillStyle = purple;
			ctx.fillText(angle.toString(),0,0)
			ctx.rotate(bearing);
			ctx.rotate(radians);
			ctx.translate(0, 1.2*radius);
			ctx.rotate(-radians);
		};
	};

	this.drawHeadings = function(bearing){
		ctx.font = radius*0.15 + "px Calibri";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		headings = ['N', 'E', 'S', 'W']
		for(i=0;i<4;i++){
			angle = i*90;
			radians = angle/180*Math.PI;
			ctx.rotate(radians);
			ctx.translate(0,-0.65*radius);
			ctx.rotate(-radians);
			ctx.rotate(-bearing);
			ctx.fillStyle = gray_lighter;
			ctx.fillText(headings[i].toString(),0,0)
			ctx.rotate(bearing);
			ctx.rotate(radians);
			ctx.translate(0, 0.65*radius);
			ctx.rotate(-radians);
		};
	}

	this.drawCompassHead = function(){
		ctx.beginPath();
		ctx.moveTo(-5, -(radius+2));
		ctx.lineTo(5,-(radius+2));
		ctx.lineTo(0, -(radius + 10));
		ctx.fillStyle=purple;
		ctx.fill();
	}

	this.drawBearing = function(bearing){
		ctx.font = radius*0.3 + "px Calibri";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		angle = Math.round(bearing*180/Math.PI);
		ctx.rotate(-bearing);
		ctx.fillStyle = red;
		ctx.fillText(angle.toString(),0,0)
		ctx.rotate(bearing);
	}	
	
	this.draw = function(bearing){
	ctx.translate(ctx.canvas.width/2, ctx.canvas.height/2);
	ctx.rotate(bearing);
  this.drawMiniTicks();
	this.drawCircle();	
	this.drawMajorTicks();
	this.drawCompassHead();
	this.drawNumbers(bearing);
	this.drawBearing(bearing);
	this.drawHeadings(bearing);
	ctx.rotate(-bearing);	
	ctx.translate(-ctx.canvas.width/2, -ctx.canvas.height/2);
	};
		
	this.update = function( event, ui){
		var value = $( "#slider" ).slider( "value" );
		degrees = 360*value/100;
		radians = degrees/180*Math.PI;
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
		this.draw(radians);
	}
}

