#target photoshop

function main() {
    // Prompt the user to start the process
    var start = confirm("Are you ready to start the image processing script?");
    if (!start) {
        alert("Script canceled. No action taken.");
        return;
    }

    // Prompt the user for the folder containing the images
    var inputFolder = Folder.selectDialog("Please select the folder where your images are located:");
    if (inputFolder == null) {
        alert("No folder selected. Script will now exit.");
        return;
    }

    // Prompt the user for the scaling factor
    var scaleFactor = prompt("Enter the scaling factor (e.g., 2 for half size):", "2");
    if (scaleFactor == null || isNaN(scaleFactor) || scaleFactor <= 0) {
        alert("Invalid scaling factor. Script will now exit.");
        return;
    }
    scaleFactor = parseFloat(scaleFactor);

    // Create the output folder
    var outputFolder = new Folder(inputFolder + "/Processed Images");
    if (!outputFolder.exists) {
        outputFolder.create();
    }

    // Get all image files in the input folder
    var imageFiles = inputFolder.getFiles(/\.(jpg|jpeg|png|tif|tiff)$/i);

    // Initialize counters
    var totalImages = imageFiles.length;
    var processedImages = 0;
    var failedImages = 0;

    // Process each image file
    for (var i = 0; i < imageFiles.length; i++) {
        var file = imageFiles[i];
        if (file instanceof File) {
            try {
                processImage(file, scaleFactor, outputFolder);
                processedImages++;
            } catch (e) {
                $.writeln("Failed to process " + file.name + ": " + e.message);
                failedImages++;
            }
        }
    }

    // Show summary
    var addedImages = processedImages - failedImages;
    alert("Processing complete.\n" +
          "Total images submitted: " + totalImages + "\n" +
          "Images processed successfully: " + processedImages + "\n" +
          "Images failed to process: " + failedImages + "\n" +
          "Images added to 'Processed Images' folder: " + addedImages);
}

function processImage(file, scaleFactor, outputFolder) {
    var doc = open(file);
    if (doc == null) return;

    // Resize the image
    var newWidth = doc.width / scaleFactor;
    var newHeight = doc.height / scaleFactor;
    doc.resizeImage(newWidth, newHeight);

    // Save the image to the output folder with highest quality
    var outputFilePath = outputFolder + "/" + file.name;
    var saveOptions = new JPEGSaveOptions();
    saveOptions.quality = 12;  // Highest quality setting
    doc.saveAs(new File(outputFilePath), saveOptions, true);

    // Close the document without saving
    doc.close(SaveOptions.DONOTSAVECHANGES);
}

main();