
# color-code-gcal

Automatically color-code your work Google Calendar events similar to [Clockwise's](https://support.getclockwise.com/hc/en-us/articles/360026978991-Color-Coding-Overview) color-coding feature. This runs entirely on [Google Apps Scripts](https://script.google.com/) so you don't have to agree to any extension permissions that your company is not cool with.

  

![enter image description here](https://github.com/kevintrankt/color-code-gcal/blob/main/screenshot.png?raw=true)

  

## Color-Coding Options (in descending priority)

- Custom color-coding rules
- Out-of-office events
- Focus time
- External Meetings
- 1:1 Meeings
- Recurring Meetings

  

## Installation

1. Navigate to [Google Apps Scripts](https://script.google.com/home) and create a new project.
2. Name the project in the top left, and paste the contents of `Code.gs` into the editor.
3. Modify `Code.gs`
	1. Modify the `internalDomain` variable to match the email domain for internal guests at your company. This is used to determine whether or not a meeting is internal or external.
	2.  *(Optional)* Choose the colors for the non-custom color-coding by modifying the color variables.
	3.  *(Optional)* Set up custom color-coding in the `titleLookup` variable. `titleLookup` is an array of length 2 arrays where the first value is a substring within the event title and the second value is the custom color.
	4. Save and run the code.
4. On the left sidenav, select **Triggers** and create a new trigger.
5.  `ColorCodeEvents` > `Head` > `From Calendar` > `Calendar updated` > *{your email}*. This will run the script to color-code your email everytime you update your calendar. (I don't know if this works if someone sends you an invite yet.
