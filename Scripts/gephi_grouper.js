var paths = document.getItems({
    type: Path,
    selected:true
});
var texts = document.getItems({
    type: TextItem,
    selected:true
});
//test: draw a red circle on the text
for(var i = 0; i< texts.length; i++)
{
	//take the first text
	var t = texts[i];
	var position = t.bounds.center;
	
	for (var j = 0; j< paths.length; j++)
	{
		var p = paths[j];
		
		/*
		var c = new Path.Circle(p.bounds.center,1);
		c.fillColor = new CMYKColor(1,0,0,0);
		var c = new Path.Circle(t.bounds.center,1);
		c.fillColor = new CMYKColor(0,1,0,0);
		*/
		
		if(Math.round(t.bounds.center.x) == Math.round(p.bounds.center.x) && Math.round(t.bounds.center.y) == Math.round(p.bounds.center.y))
		{
			var g = new Group();
			g.appendTop(p);
			g.appendTop(t);
			g.name = t.content;
		}
	}
}