
# color-code-gcal

Automatically color-code your work Google Calendar events similar to [Clockwise's](https://support.getclockwise.com/hc/en-us/articles/360026978991-Color-Coding-Overview) color-coding feature. This feature was so helpful, and I missed it after going 1 day at my new job without it since Clockwise requires permission to your entire calendar. My version runs entirely on [Google Apps Scripts](https://script.google.com/) so you don't have to agree to any extension permissions that your company is not cool with.

  

![enter image description here](https://github.com/kevintrankt/color-code-gcal/blob/main/Photos/screenshot.png?raw=true)

  

## Color-Coding Options (in descending priority)

- Custom color-coding rules
- Out-of-office events
- Focus time
- External Meetings
- One-off meetings
- 1:1 Meeings
- Recurring Meetings

  

## Installation

1. Navigate to [Google Apps Scripts](https://script.google.com/home) and create a new project.
2. Name the project in the top left, and paste the contents of [`Code.gs`](https://github.com/kevintrankt/color-code-gcal/blob/main/Code.gs) into the editor.
3. *(Optional)* Modify `Code.gs`
	1.  *(Optional)* Modify the various variables to select which colors you want for the default events
	2.  *(Optional)* Set up custom color-coding in the `titleLookup` variable. 
4. Save and run the code. You will be prompted to grant permissions to the project you saved. Since this script uses the Calendar API, you will be granting Calendar permissions to the project. The script will only modify your calendar using the `e.setColor` method, and no data ever leaves the tool.
5. On the left sidenav, select **Triggers** and create a new trigger.
6.  `ColorCodeEvents` > `Head` > `From Calendar` > `Calendar updated` > *{your email}*. This will run the script to color-code your events every time you update your calendar.