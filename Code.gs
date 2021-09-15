function ColorCodeEvents() {
    /* ---------- MODIFY THE CODE BELOW ---------- */


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
    nextweek.setDate(nextweek.getDate() + 14);
    Logger.log(today + " " + nextweek);

    var calendars = CalendarApp.getAllOwnedCalendars();
    Logger.log("found number of calendars: " + calendars.length);

    // this assumes your work calendar is the first calendar. you may have to change the index below.
    var calendar = calendars[0];
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
        var meetingContainsVideoMtg = description.includes('zoom.') || description.includes('meet.google');

        // recurring meeting
        if (recurringEvent) {
            e.setColor(CalendarApp.EventColor[recurringMtgColor])
        }

        // 1:1 recurring meetings (internal)
        if (numberOfGuests == 2 && recurringEvent) {
            e.setColor(CalendarApp.EventColor[oneOnOneColor])
        }

        // one off meetings
        if (numberOfGuests > 0 && !recurringEvent) {
            e.setColor(CalendarApp.EventColor[oneOffMtgColor])
        }

        // External meeting
        if (!internal) {
            e.setColor(CalendarApp.EventColor[externalMtgColor])
        }

        // Focus/Holds
        if (numberOfGuests == 0) {
            e.setColor(CalendarApp.EventColor[focusColor]);
        }

        // one off mtg w/ no guest (calendar invite or something)
        if (numberOfGuests == 0 && meetingContainsVideoMtg) {
            e.setColor(CalendarApp.EventColor[oneOffMtgColor])
        }

        //  OOO
        if (title.includes('ooo') || title.includes('out of office')) {
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
