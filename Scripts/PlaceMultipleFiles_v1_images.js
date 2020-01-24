// Import Folder's Files as Layers - Illustrator CS3 script
// Description: Imports a series of images (from the designated folder) as named layers into a new document
// Author: Nathaniel V. KELSO (nathaniel@kelsocartography.com)
// Version: 1.0.0 on 10/March/2009

// Global script setting
var placement9pointAlignment = "mm";

function getFolder() {
	return Folder.selectDialog('Please select the folder to be imported:', Folder('~'));
}

function importFolderAsLayers(selectedFolder) {
	// if a folder was selected continue with action, otherwise quit
	var myDocument;

	if (selectedFolder) {
		myDocument = app.documents.add();

		var firstImageLayer = true;
		var newLayer ;
		var thisPlacedItem;

		// create document list from files in selected folder
		var imageList = selectedFolder.getFiles();

		for (var i = 0; i < imageList.length; i++) {
			// open each document in file list
			if (imageList[i] instanceof File) {
				// get the file name
				var fName = imageList[i].name.toLowerCase();
				// check for supported file formats
				//if( (fName.indexOf(".eps") == -1) ) {
				if( (fName.indexOf(".gif") == -1) && (fName.indexOf(".jpg") == -1) && (fName.indexOf(".png") == -1) && (fName.indexOf(".bmp") == -1) && (fName.indexOf(".tif") == -1) ) {
					// skip unsupported formats
					continue;
				} else {
					if( firstImageLayer ) {
						newLayer = myDocument.layers[0];
						firstImageLayer = false;
					} else {
						newLayer = myDocument.layers.add();
					}
				   // Give the layer the name of the image file
				   newLayer.name = fName.substring(0, fName.indexOf(".") );

				   // Place the image on the artboard
				   thisPlacedItem = newLayer.placedItems.add()
				   thisPlacedItem.file = imageList[i];

				   switch( placement9pointAlignment ) {
						default :
							break;
						case "ul" :
							thisPlacedItem.top = myDocument.height;
							thisPlacedItem.left = 0;
							break;
						case "ml" :
							thisPlacedItem.top = myDocument.height / 2 + thisPlacedItem.height / 2;
							thisPlacedItem.left = 0;
							break;
						case "ll" :
							thisPlacedItem.top = thisPlacedItem.height;
							thisPlacedItem.left = 0;
							break;
						case "ur" :
							thisPlacedItem.top = myDocument.height;
							thisPlacedItem.left = myDocument.width - thisPlacedItem.width;
							break;
						case "mr" :
							thisPlacedItem.top = myDocument.height / 2 + thisPlacedItem.height / 2;
							thisPlacedItem.left = myDocument.width - thisPlacedItem.width;
							break;
						case "lr" :
							thisPlacedItem.top = thisPlacedItem.height;
							thisPlacedItem.left = myDocument.width - thisPlacedItem.width;
							break;
						case "um" :
							thisPlacedItem.top = myDocument.height;
							thisPlacedItem.left = myDocument.width / 2 - thisPlacedItem.width / 2;
							break;
						case "mm" :
							thisPlacedItem.top = myDocument.height / 2 + thisPlacedItem.height / 2;
							thisPlacedItem.left = myDocument.width / 2 - thisPlacedItem.width / 2;
							break;
						case "lm" :
							thisPlacedItem.top = thisPlacedItem.height;
							thisPlacedItem.left = myDocument.width / 2 - thisPlacedItem.width / 2;
							break;
				   }
				}
			}
		}

		if( firstImageLayer ) {
			// alert("The action has been cancelled.");
			// display error message if no supported documents were found in the designated folder
			alert("Sorry, but the designated folder does not contain any recognized image formats.\n\nPlease choose another folder.");
			myDocument.close();
			importFolderAsLayers(getFolder());
		}

	} else {
		// alert("The action has been cancelled.");
		// display error message if no supported documents were found in the designated folder
		alert("Rerun the script and choose a folder with images.");
		//importFolderAsLayers(getFolder());
	}
}

// Start the script off
importFolderAsLayers( getFolder() );
