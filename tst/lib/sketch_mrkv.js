(function($) {
  $.fn.Sketch_mrkv =function() {
    
	function Sketch(board) {
      var context = board.getContext('2d');
       var painting = false;
       var tool = {
	    color:'#000000',
		size:5
	  };
	   var x=0;
	   var y=0;
       var action = [];
	   context.moveTo( x, y);
    }
	
    Sketch.prototype.download = function(format) {
      var mime;
      format || (format = "png");
      if (format === "jpg") {
        format = "jpeg";
      }
      mime = "image/" + format;
      return window.open(this.canvas.toDataURL(mime));
    };
	
    Sketch.prototype.startPainting = function() {
      this.painting = true;
	};
	Sketch.prototype.stopPainting = function() {
      this.painting = false;
    };
    Sketch.prototype.isPainting = function() {
       return this.painting;
	};
    
	//destination coord
	Sketch.prototype.draw = function(x,y) {
	  if(this.isPainting()){
		this.context.lineJoin = "round";
		this.context.lineCap = "round";
		this.context.beginPath();
		this.context.strokeStyle = this.tool.color;
		this.context.lineWidth = this.tool.size;
		this.context.lineTo(x,y);
		this.x=x;this.y=y;
		this.context.moveTo(this.x,this.y); //move the origin of the vector to last coord
	  }
	};
	
	Sketch.prototype.setTool = function(tool){
		this.tool=tool;
	}
	
    this.data('Sketch_mrkv',new Sketch(this.get(0)));
	return this;
  }
}(jQuery));