# color-code-gcal
Color-code your Google Calendar similar to [Clockwise's](https://www.getclockwise.com/) color-coding feature. This runs entirely on [Google Apps Scripts](https://script.google.com/) so you don't have to agree to any permissions that your company is not cool with. 

## Color Coding (descending priority)
- Custom color coding
- Out-of-office
- Focus time
- External Meetings
- 1:1 Meeings
- Recurring Meetings

## Installation
1. Modify `Code.gs`
	1. Modify the `internalDomain` variable to match the email domain for internal guests at your company.  This is used to determine whether or not a meeting is internal or external.
	2. *(Optional)* Choose the colors for the non-custom color-coding by modifying the color variables.
	3. *(Optional)* Set up custom color-coding in the `titleLookup` variable. `titleLookup` is an array of length 2 arrays where the first value is a substring within the event title and the second value is the custom color.
2. Navigate to [Google Apps Scripts](https://script.google.com/home) and create a new project.
3. Name the project in the top left, and paste in your modified `Code.gs` content into the editor. Save and run the code.
4. On the left sidenav, select **Triggers** and create a new trigger. 
5. `ColorCodeEvents` > `Head` > `From Calendar` > `Calendar updated` > *{your email}*. This will run the script to color-code your email everytime you update your calendar. (I don't know if this works if someone sends you an invite yet.
