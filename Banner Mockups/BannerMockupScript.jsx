/* At time of script launch a few assumptions are made: 

- File structure is as required - as detailed in README.md 
- The designer has the color code for the background color handy.
- ? The designer knows what mockups are needed

FLOW: 
- designer creates folder as required 
- designer opens photoshop and runs script
- A dialog box asks the user to select required folder
- A dialog box asks the user to use a checkbox to select the mockups being required 
- An object is created that saves the selected options 
- The dialog then asks the user for a Hex color code for the background color (necessary for the collection page hero assets)
- PSD creates mockups for each category: 

        Iterate through the selected options object to call each necessary function
        each function has it's own variation of this flow: 
        ----------
        PSD opens mockup X (from mockup folder)
        PSD creates a new layer 
        PSD inserts asset x (from asset folder)
        PSD resizes asset to y 
        PSD repositions asset to (x, y)
        PSD saves file in mockup folder 
        ----------

- Dialog box confirms complete - user can click ok to exit out. 
- User can now use mockups as necessary

*/

// Function to create mockups
function createMockups(selectedOptions, backgroundColor) {
    // User selects the folder where everything is located. 
    var mockupFolder = Folder.selectDialog("Select folder containing mockup, asset, and template files");
    // Saves Asset folder as a variable
    var assetFolder = new Folder(mockupFolder + "/ASSETS");

    if (mockupFolder) {
        // Saves Template folder as a variable
        var templatesFolder = new Folder(mockupFolder + "/TEMPLATES");

        // If TEMPLATES folder exists, proceed
        if (templatesFolder.exists) {
            // loops through every selected option
            for (var option in selectedOptions) {
                // if the selected option is true - option is = selected category 
                if (selectedOptions[option]) {
                    // save template file for selected category
                    var templateFile = new File(templatesFolder + "/" + option + "Template.png");
                    // save asset file for selected category
                    var assetFile = new File(assetFolder + "/ASSETS/" + option + ".png");
                    // if both a template and an asset exist for the file, then create a mockup
                    if (templateFile.exists && assetFile.exists) {
                        // open template file
                        var doc = app.open(templateFile);
                        // add new layer
                        var assetLayer = doc.artLayers.add();
                        // change layer name
                        assetLayer.name = "Asset";
                        // open the asset file 
                        app.open(assetFile);
                        // select layer using it's name 
                        var asset = app.activeDocument.artLayers.getByName("Asset");
                        // copy asset layer from opened asset file and place it in the template document as top layer
                        asset.duplicate(doc, ElementPlacement.PLACEATBEGINNING);
                        // close asset file without saving any changes
                        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                        // resize layer
                        assetLayer.resize(50, 50); // These need to be adjusted, using as a test 
                        // move layer
                        assetLayer.translate(100, 100); // These need to be adjusted, using as a test 

                        // Apply background color for Collection Page Hero - This would need to be a rectangle of X color, placed in (x,y) of a specific size.
                        if (option === "Collection Page Hero") {
                            // create new solid color
                            var bgColor = new SolidColor();
                            // make color = user input
                            bgColor.rgb.hexValue = backgroundColor;
                            // add a layer
                            doc.backgroundLayer = doc.artLayers.add();
                            // change layer name to spill
                            doc.backgroundLayer.name = "Spill";
                            // fill layer with color
                            doc.backgroundLayer.fillSolidColor(bgColor);
                            // resize layer to x by y 
                            // move layer to x and y 
                        }
                        // save mockup as new file 
                        doc.saveAs(new File(mockupFolder + "/MOCKUPS/" + option + "Mockup.png"));
                        // close out psd without saving changes
                        doc.close(SaveOptions.DONOTSAVECHANGES);
                    // if template or assets don't match -     
                    } else {
                        alert("Template or asset file not found for " + option);
                    }
                }
            }
            // upon completion alert successful creation of mockups
            alert("Mockups created successfully!");
        } else {
            // unless there's an error with the templates not ebing found in folder
            alert("TEMPLATES folder not found in the selected folder.");
        }
        // if no folder is selected - script ends
    } else {
        alert("Folder not selected. Exiting script.");
    }
}

// Main function to execute script
function main() {
    // Save object of which banners are necessary
    var selectedOptions = {
        "Collection Page Hero": false,
        "Mobile Collection Page Hero": false,
        "Search Page Hero": false,
        "Half Promo": false,
        "Full Promo": false,
        "Square": false
    };

    // ask user for background color
    var backgroundColor = prompt("Enter background color (Hex):", "#FFFFFF");

    // ask user to make selections of what assets they want to mockup
    var dialogResult = confirm("Please select mockups to create in the following screens by answering yes or no:");

    // start if user says yes 
    if (dialogResult) {
        // ask user based on the current itteration of option
        for (var option in selectedOptions) {
            selectedOptions[option] = confirm("Create " + option + " mockup?");
        }
        // create a mockup of x, and this is the background color you need 
        createMockups(selectedOptions, backgroundColor);
    // OR alert user if script failed
    } else {
        alert("Script execution cancelled.");
    }
}

// run main script
main();