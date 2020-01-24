var groups = document.getItems({
    type: Group,
    selected:true
});


var basepath = '/Users/carlodg/Documents/lavoro/DMI/DataSprint 2017/GET Memes/images/';

for(var i=0; i < groups.length; i++)
{
	var g = groups[i];
	var name = decodeURIComponent(g.children[0].content);
	var crop = g.children[1];
	/*
	name = name.replace(/%/g,"-");
	if(name.search(".jpg") == -1 && name.search(".JPG") == -1)
	{
		print("nome stronzo: "+name);
		if(name.search(".png") != -1)
		{
			name = name.replace(".png",".jpg");
		}
		else
		{
			name = name+".jpg";
		}
	}
	*/
	print(name);
	try{
		var file = new java.io.File(basepath+name);
		var raster = new Raster(file);
		var vscale = crop.bounds.width / raster.bounds.width;
		var hscale = crop.bounds.height / raster.bounds.height;
		var scale = vscale>hscale?vscale:hscale;
		raster.scale(scale);
		raster.position = crop.position;
		var ng = new Group();
		ng.appendChild(raster);
		ng.appendChild(crop);
		ng.clipped = true;
		ng.name = name;
		crop.clipMask = true;
		g.remove();
		print("["+name+"]"+": ok");
	}
	catch(e)
	{
		print("impossibile caricare "+name+" : "+e);
	}
}
