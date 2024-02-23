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

// Mockup Script
// User selects the folder where everything is located. 
// Saves Asset folder as a variable
// Saves Template folder as a variable
// If TEMPLATES folder exists, proceed
// loops through every selected option
// if the selected option is true - option is = selected category 
// save template file for selected category
// save asset file for selected category
// if both a template and an asset exist for the file, then create a mockup
// open template file
// add new layer
// change layer name
// open the asset file 
// select layer using it's name 
// copy asset layer from opened asset file and place it in the template document as top layer
// close asset file without saving any changes
// resize layer
// move layer
// Apply background color for Collection Page Hero - This would need to be a rectangle of X color, placed in (x,y) of a specific size.
// create new solid color
// make color = user input
// add a layer
// change layer name to spill
// fill layer with color
// resize layer to x by y 
// move layer to x and y 
// save mockup as new file 
// close out psd without saving changes
// if template or assets don't match -     
// upon completion alert successful creation of mockups
// unless there's an error with the templates not ebing found in folder
// if no folder is selected - script ends

// MAIN USER INTERFACT SCRIPT - STARTS MOCKSCRIPT BASED ON OPTIONS 
// Save object of which banners are necessary
// ask user for background color
// ask user to make selections of what assets they want to mockup
// start if user says yes 
// ask user based on the current itteration of option
// create a mockup of x, and this is the background color you need 
// OR alert user if script failed

// run main script