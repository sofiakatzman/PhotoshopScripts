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