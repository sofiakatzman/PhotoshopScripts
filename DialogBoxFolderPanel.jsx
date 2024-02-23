(function () {

    // The script code goes inside this anonymous function.

    // Reusable UI variables
    var g; // group
    var p; // panel
    var w; // window

    // Permanent UI variables
    var btnCancel;
    var btnFolderInput;
    var btnOk;
    var txtFolderInput;

    // CREATE USER INTERFACE

    w = new Window("dialog", "Adobe Script Tutorial 1");
    p = w.add("panel");
    g = p.add("group");
    btnFolderInput = g.add("button", undefined, "Folder...");
    txtFolderInput = g.add("statictext", undefined, "", {
        truncate: "middle"
    });
    txtFolderInput.preferredSize = [200, -1];
    g = w.add("group");
    g.alignChildren = "center";
    btnOk = g.add("button", undefined, "OK");
    btnCancel = g.add("button", undefined, "Cancel");

    // UI EVENT HANDLERS

    btnFolderInput.onClick = function () {
        var f = Folder.selectDialog();
        if (f) {
            txtFolderInput.text = f.fullName;
        }
    };

    btnOk.onClick = function () {
        w.close(1);
    };

    btnCancel.onClick = function () {
        w.close(0);
    };

    // SHOW THE WINDOW

    // w.show();

    if (w.show() == 1) {
        // alert("OK was clicked");
        process();
    }

    function process() {
        alert("Do some work");
    }

})();