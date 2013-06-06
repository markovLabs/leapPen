$(document).ready(function() {
	var marker=$('#simple_sketch_mrkv').Sketch_mrkv();
	marker.startPainting();
	for(i=0;i<100;i++){
		marker.draw(i,i);
	}
}); 