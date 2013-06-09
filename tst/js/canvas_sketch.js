$(document).ready(function() {
	/*var marker=$('#simple_sketch_mrkv').Sketch_mrkv();
	marker.startPainting();
	for(i=0;i<20;i++){
		marker.draw(i,i);
	}
	var controller = new Leap.Controller({enableGestures: true});
    controller.loop(function(frame) {
		siz=frame.tools.length;
		if(siz>0){
			for(i=0;i<siz;i++){
				tool=frame.tools[i];
				p=tool.tipPosition;
				marker.draw(p.x,p.y);
				console.log('('+p.x+','+p.y+')');
			}			
		}
	});
	*/
	var sheetOrigin={x:-4,y:94};
	var dims={x:500,y:500};
	$('#simple_sketch_mrkv').sheet(sheetOrigin,dims,0);
}); 