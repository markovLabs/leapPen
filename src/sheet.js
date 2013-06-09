(function($) {
//it must be passed with three params, in addition to the canvas selected. 
	$.fn.sheet=function(a,b,c){
		//size is witdh of the stroke in pixels, which is a number of points in the coord sys
		function Sketch(canvas) {
			this.context = canvas.getContext('2d');
			this.tool = {
				color:'#000000',
				size:5
			};
			this.a=3; //transformation parameter. Its used to convert from sheet coord to canvas coord
			this.x=0;
			this.y=0;
			this.context.moveTo(this.x, this.y);
		}
		
		//applys linear transformation to the incoming coordinates
		Sketch.prototype.transform=function(other_coord){
			xx=other_coord.x*this.a;
			yy=other_coord.y*this.a;
			return {x:xx,y:yy};
		}
	
		Sketch.prototype.download = function(format) {
			var mime;
			format || (format = "png");
			if (format === "jpg") {
				format = "jpeg";
			}
			mime = "image/" + format;
			return window.open(this.canvas.toDataURL(mime));
		}
	   
		//destination coord
		Sketch.prototype.draw = function(xx,yy) {
			coord=this.transform({x:xx,y:yy});
			this.context.lineJoin = "round";
			this.context.lineCap = "round";
			this.context.beginPath();
			this.context.moveTo(this.x,this.y);
			this.context.lineTo(coord.x,coord.y);
			this.context.strokeStyle = this.tool.color;
			this.context.lineWidth = this.tool.size;
			this.context.stroke();
			this.x=coord.x;this.y=coord.y;
		}
	
		//this is the guiToool
		Sketch.prototype.setTool = function(tool){
			this.tool=tool;
		}
		
		var gui=new Sketch(this.get(0));
		
		/*
			Params: sheet origin, dimensions of the board. The origin is measured from the leap Origin
			 x is the axis in the width direction, y in the long direction. 
			 Origin is the upper left corner of the sheet. 
			 option:width and longituted in mm if 1,pixel sizes otherwise
		*/
		function Sheet(sheetOrigin,dimensions,option){
			this.leapMotionResolution=5;   	//constant h, Xj-Xj-1=h; where X is any axis. its in mm.
			this.board=[];               	//2D grid where 0 means no paint, 1 otherwise. board[x][y]
			//2D coord origin of the sheet, they are parallell to leap motion
			this.Ox=sheetOrigin.x;
			this.Oy=sheetOrigin.y;
			this.height=sheetOrigin.z;
			this.dimX=0;this.dimY=0;
			if(option==1){
				this.dimX=Math.round(dimensions.x/this.leapMotionResolution);
				this.dimY=Math.round(dimensions.y/this.leapMotionResolution);
			}
			else{
				this.dimX=dimensions.x;
				this.dimY=dimensions.y;
			}
			this.x=0;this.y=0;
			//tool used to draw on the sheet
			this.tool={
				val:1,
				guiTool:gui.tool
			};
			for(i=0;i<dimensions.x;i++){
				this.board[i]=new Array(dimensions.y);
				for(j=0;j<dimensions.y;j++){
					this.board[i][j]=0;
				}
			}
		}
		
		Sheet.prototype.width=function(){
			return this.leapMotionResolution*this.dimX;
		}
		
		Sheet.prototype.large=function(){
			return this.leapMotionResolution*this.dimY;
		}
		
		//update the grid one position at a time, given the tipPosition of the pen, coming from the frame event
		Sheet.prototype.update=function(tipPos){
			var x=Math.round((tipPos.x-this.Ox)/this.leapMotionResolution);
			var y=Math.round((tipPos.y-this.Oy)/this.leapMotionResolution);
			board[x][y]=this.tool.val;
			gui.draw(x,y);
			this.x=x;this.y=y;
		}
		/*
		tool={ val:0 if draw blank, 1 otherwise
		       guiTool:{color,size}
			 }
		*/
		Sheet.prototype.setTool=function(tool){
			this.tool=tool;
		}
		
		return new Sheet(a,b,c);
	}
}(jQuery));