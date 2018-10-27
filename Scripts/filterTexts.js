/*

 Filter texts based on their size

*/

var title = "Rectangle Maker";
var thresholdSize = Number(prompt("Enter Minimum size", 4, title));


try {
	if (app.documents.length < 1) {
		alert("The documents seems to be empty");
	} else {
		var docRef = app.activeDocument;
		if (docRef.textFrames.length < 1) {
			alert("No textframes found");
		} else {
			var sel = docRef.selection;

			var slen = sel.length;

			for (var x = 0; x < slen; x++) {

				if (sel[x].typename == "TextFrame") {
					// get the size of the first character
					var textSize = sel[x].characters[0].characterAttributes.size;

					if (textSize < thresholdSize) {
						//delete the text
						sel[x].remove()
					}
				}
			}

		}
	}



} catch (e) {
	alert("Script Failed! Here's why:\n" + e);
}
