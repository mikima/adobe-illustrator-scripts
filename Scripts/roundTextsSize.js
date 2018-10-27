/*

 Round texts sizes

*/


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
					var textSize = Math.round(sel[x].characters[0].characterAttributes.size);

					// for each character, set the size
					for (var c = 0; c < sel[x].characters.length; c++) {

						var singleChar = sel[x].characters[c];

						singleChar.characterAttributes.size = textSize;
					}
				}
			}
		}
	}



} catch (e) {
	alert("Script Failed! Here's why:\n" + e);
}
