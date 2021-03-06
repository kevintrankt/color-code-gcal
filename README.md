



# color-code-gcal

Automatically color-code your work Google Calendar events similar to [Clockwise's](https://support.getclockwise.com/hc/en-us/articles/360026978991-Color-Coding-Overview) color-coding feature. This feature was so helpful, and I missed it after going 1 day at my new job without it since Clockwise requires permission to your entire calendar. My version runs entirely on [Google Apps Scripts](https://script.google.com/) so you don't have to agree to any extension permissions that your company is not cool with.

 
  <img src="https://github.com/kevintrankt/color-code-gcal/blob/main/Photos/screenshot.png?raw=true" alt="screenshot" width="600"/>

## Color-Coding Options

- Custom color-coding rules
- Out-of-office events
- Focus time
- External Meetings
- One-off meetings
- 1:1 Meeings
- Recurring Meetings

  

## Installation


> **Note:** You will be creating a Google Apps Script project, and you must grant Calendar permissions to the project. The script will only modify your calendar using the `e.setColor` method (to change the color of an event), and no data ever leaves the script.

1. Navigate to [Google Apps Scripts](https://script.google.com/home) and create a new project.
2. Name the project in the top left, and paste the contents of [`Code.gs`](https://github.com/kevintrankt/color-code-gcal/blob/main/Code.gs) into the editor.
3. *(Optional)* Modify `Code.gs`
	1.  *(Optional)* Modify the various variables to select which colors you want for the default events
	2.  *(Optional)* Set up custom color-coding in the `titleLookup` variable. 
4. Save and run the code. You will be prompted to grant permissions to the project you saved. 
5. On the left sidenav, select **Triggers** and create a new trigger.
6.  `ColorCodeEvents` > `Head` > `From Calendar` > `Calendar updated` > *{your email}*. This will run the script to color-code your events every time you update your calendar.

### Error: Google hasn't verified this app
I didn't get this error on my work email, but I ran into it when testing things on my personal email. More info about verification can be found [here](https://developers.google.com/apps-script/guides/client-verification#requesting_verification). 

If you get this error, you can click **Advanced** followed by **Go to X Project (unsafe)** to bypass verification. As mentioned above, the script simply changes the color of your events and never sends data to any other tool. 

## Automatic Updates
If you'd like to install this script so it always uses the up to date version from this repo, follow the same steps above, but use the following snippet for **step 3**:

    function ColorCodeEventsAuto(){ eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/kevintrankt/color-code-gcal/main/Code.gs').getContentText()); ColorCodeEvents(); }

This automatically fetches the code from [`Code.gs`](https://github.com/kevintrankt/color-code-gcal/blob/main/Code.gs). You'll lose the ability to customize the script, and you'll have to accept permisions to allow your project to fetch external scripts.

## Known Issues
- If your calendar invite has a room, I guess that counts as a guest... I'll need to figure this out
- This grabs your email domain from your email address; if your company changed domains, this can screw up the external meetings coloring
- The script doesn't check for video links in the location


