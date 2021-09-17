
// function ColorCodeEvents(){
//   eval(UrlFetchApp.fetch('https://raw.githubusercontent.com/kevintrankt/color-code-gcal/main/Code.gs').getContentText());
// }


function ColorCodeEvents() {
    /* ---------- MODIFY THE CODE BELOW ---------- */

    // The number of days in the future the script will color-code. Reduce this if you get rate limit errors
    var numberOfDays = 14;

    // The script runs on the first owned calendar in your account, which is usually your work calendar. 
    // You may have to change this if nothing changes on your work calendar.
    var calendarNumber = 0;


    /* COLORS CAN BE FOUND HERE https://developers.google.com/apps-script/reference/calendar/event-color  */

    // Focus/Holds        :     Events with no guests & no meeting URLs
    var focusColor = 'GRAY';
    // One on One         :     Recurring meetings with 2 guests (including yourself)
    var oneOnOneColor = 'YELLOW';
    // Recurring Meeting  :     Team syncs, stand ups, etc
    var recurringMtgColor = 'PALE_GREEN';
    // Out of Office      :     Event title contains "ooo" or "out of office" (not case sensitive)
    var outOfOfficeColor = 'RED';
    // External Meeting   :     Guestlist has someone not matching your email domain
    var externalMtgColor = 'PALE_RED';
    // One Off meeting    :    >1 guest and not recurring   
    var oneOffMtgColor = 'MAUVE';


    // Custom color-coding: if your event contains text from index 0, the script will set the event color to the color in index 1.
    var titleLookup = [
        ['👀', 'PALE_RED'],
        ['🔥', 'ORANGE'],
        ['all hands', 'PALE_BLUE']
    ];

    /* ---------- MODIFY THE CODE ABOVE ---------- */

    var userEmail = Session.getActiveUser().getEmail();
    var internalDomain = userEmail.match(/@(\w+)/g)[0].replace('@', '');

    var today = new Date();
    var nextweek = new Date();
    nextweek.setDate(nextweek.getDate() + numberOfDays);
    Logger.log(today + " " + nextweek);

    var calendars = CalendarApp.getAllOwnedCalendars();
    Logger.log("found number of calendars: " + calendars.length);

    var calendar = calendars[calendarNumber];
    var events = calendar.getEvents(today, nextweek);
    for (var j = 0; j < events.length; j++) {
        var e = events[j];
        var title = e.getTitle().toLowerCase();
        var description = e.getDescription().toLowerCase();
        var numberOfGuests = e.getGuestList(true).length;
        if (numberOfGuests > 0) {
            var guestList = e.getGuestList();
            var internal = true;
            for (guest of guestList) {
                if (!guest.getEmail().toLowerCase().includes(internalDomain)) {
                    internal = false;
                }
            }
        }
        var allDayEvent = e.isAllDayEvent();
        var recurringEvent = e.isRecurringEvent();
        var meetingContainsVideoMtg = description.includes('zoom.') || description.includes('meet.google') || description.includes('webex');

        if (numberOfGuests == 2 && recurringEvent && internal) {
            // 1:1
            e.setColor(CalendarApp.EventColor[oneOnOneColor]);
        } else if (numberOfGuests == 0) {
            // Focus/holds
            e.setColor(CalendarApp.EventColor[focusColor]);
        } else if (!internal) {
            // External
            e.setColor(CalendarApp.EventColor[externalMtgColor]);
        } else if (numberOfGuests == 0 && meetingContainsVideoMtg) {
            e.setColor(CalendarApp.EventColor[oneOffMtgColor]);
        } else if (numberOfGuests > 0 && !recurringEvent) {
            e.setColor(CalendarApp.EventColor[oneOffMtgColor]);
        } else if (recurringEvent) {
            e.setColor(CalendarApp.EventColor[recurringMtgColor]);
        } else if (title.includes('ooo') || title.includes('out of office')) {
            e.setColor(CalendarApp.EventColor[outOfOfficeColor]);
        }

        // Custom Color-coding
        for (inputTitle of titleLookup) {
            if (title.includes(inputTitle[0])) {
                e.setColor(CalendarApp.EventColor[inputTitle[1]]);
            }
        }


    }

}
