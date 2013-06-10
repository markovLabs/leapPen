$(document).ready(function() {
	/*
	var marker=$('#simple_sketch_mrkv').Sketch_mrkv();
	marker.startPainting();
	for(i=0;i<20;i++){
		marker.draw(i,i);
	}
	*/
	var controller = new Leap.Controller({enableGestures: true});
	var sheetOrigin={x:-4,y:94};
	var dims={x:500,y:500};
	var s=$('#simple_sketch_mrkv').sheet(sheetOrigin,dims,0);
	/*test sheet.js
	for(i=100;i<200;i++){
		s.update({x:i,y:i});
	}*/
    controller.loop(function(frame) {
		if(typeof frame!='undefined'){
			siz=frame.tools.length;
			if(typeof frame.tools!='undefined' && siz>0){
				//marker.draw(p.x,p.y);
				tool=frame.tools[0];
				p=tool.tipPosition;
				console.log('('+p.x+','+p.y+')');
				s.update(p);
				console.log('aft:update()');
			}
		}
	});
}); 