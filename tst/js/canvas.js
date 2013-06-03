var MkLabs = MkLabs || {};

MkLabs.Tools = (function($){
	var methods = {};
	
	
	methods.draw = function(obj, canvasContext){
		// function setup(){
			// var canvas = document.getElementById("simple_sketch");
// 	
			// canvas.width = document.body.clientWidth;
			// canvas.height = document.body.clientHeight;
// 			
			// canvasContext = canvas.getContext("2d");
			// canvasContext.translate(canvas.width/2,canvas.height);
			// canvasContext.fillStyle = "rgba(0,0,0,0.7)";
		// };		
			var pointablesMap = obj.pointablesMap;
			
			console.error(obj);
			
	  		for (var i in pointablesMap) {
			    var pointable = pointablesMap[i];
			    var pos = pointable.tipPosition;
			    
			    var radius = Math.min(600/Math.abs(pos.z),20);
			    canvasContext.beginPath();
			    canvasContext.arc(pos.x-radius/2,-pos.y-radius/2,radius,0,2*Math.PI);
			    canvasContext.fill();
		 	}

	};
	
	return methods;
})(jQuery);
$(document).ready(function() {
	var controller = new Leap.Controller({enableGestures: true});
	var frame = controller.frame();
	var canvas = document.getElementById("simple_sketch");

	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	
	canvasContext = canvas.getContext("2d");
	canvasContext.translate(canvas.width/2,canvas.height);
	canvasContext.fillStyle = "rgba(0,0,0,0.7)";
		
	// //controller.on('frame', MkLabs.Tools.draw(
	// console.log("HI", controller.frame());
	// var draw = 	MkLabs.Tools.draw(frame, canvasContext);
	// console.error("DRAW", draw);
	// Leap.loop(draw);
	
	// controller.on('frame', function() {
		// console.log("hello frame");
	// });
// 	
	controller.on('animationFrame', function() {
  		MkLabs.Tools.draw(this.frame(), canvasContext);
})
	controller.connect();
});