////////////////////////////////////////////////////////////////////////////////////////////
// Align TextFields (including grouped text) with User-Selectable Justification
// --------------------------------------
// Adds a UI panel to let the user choose alignment type (center, left, right, etc.).
// Udated 2025-02-25
////////////////////////////////////////////////////////////////////////////////////////////

var win = new Window("dialog", "Align Text Frames");
win.orientation = "column";
win.alignChildren = "fill";

var dropdown = win.add("dropdownlist", undefined, [
  "Center",
  "Left",
  "Right",
  "Full Justify",
  "Justify Last Line Center",
  "Justify Last Line Left",
  "Justify Last Line Right",
]);
dropdown.selection = 0;

var btnOK = win.add("button", undefined, "Apply");
btnOK.onClick = function () {
  var justificationOptions = [
    Justification.CENTER,
    Justification.LEFT,
    Justification.RIGHT,
    Justification.FULLJUSTIFY,
    Justification.FULLJUSTIFYLASTLINECENTER,
    Justification.FULLJUSTIFYLASTLINELEFT,
    Justification.FULLJUSTIFYLASTLINERIGHT,
  ];
  myJust = justificationOptions[dropdown.selection.index];
  win.close();
  applyAlignment();
};

win.show();

function applyAlignment() {
  var locArr = [];

  try {
    if (app.documents.length < 1) {
      alert("Open a document with text frames to align.");
    } else {
      var docRef = app.activeDocument;
      if (docRef.selection.length < 1) {
        alert("Select text frames or groups containing text frames.");
      } else {
        var sel = docRef.selection;
        for (var i = 0; i < sel.length; i++) {
          processItem(sel[i]);
        }

        for (var j = 0; j < locArr.length; j++) {
          locArr[j][0].story.textRange.justification = myJust;
          locArr[j][0].top = locArr[j][1];
          locArr[j][0].left = locArr[j][2];
        }
      }
    }
  } catch (e) {
    alert("Script Failed! Here's why:\n" + e);
  }

  function processItem(item) {
    if (item.typename === "TextFrame") {
      addToList(item);
    } else if (item.typename === "GroupItem") {
      for (var j = 0; j < item.pageItems.length; j++) {
        processItem(item.pageItems[j]);
      }
    }
  }

  function addToList(obj) {
    locArr.push([obj, obj.top, obj.left]);
  }
}
