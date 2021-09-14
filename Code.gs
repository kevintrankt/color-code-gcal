function ColorCodeEvents() {

    /* ---------- MODIFY THE CODE BELOW ---------- 
    */



    /* COLORS CAN BE FOUND HERE https://developers.google.com/apps-script/reference/calendar/event-color  */

    // Focus = events with no guests
    var focusColor = CalendarApp.EventColor.GRAY;
    // One on One = meetings with 2 guests
    var oneOnOneColor = CalendarApp.EventColor.YELLOW;
    // Any recurring event
    var recurringMtgColor = CalendarApp.EventColor.PALE_GREEN;
    // Out of Office = event title contains OOO or out of office (not case sensitive)
    var outOfOfficeColor = CalendarApp.EventColor.RED;
    // guestlist has someone without @salesforce.com
    var externalMtgColor = CalendarApp.EventColor.PALE_RED;
    // one off meeting (>1 guest and not recurring)    
    var oneOffMtgColor = CalendarApp.EventColor.MAUVE;


    // if event title contains anything below, set the following color
    var titleLookup = [
        ['👀', CalendarApp.EventColor.PALE_RED],
        ['🔥', CalendarApp.EventColor.ORANGE],
    ];

    /* ---------- MODIFY THE CODE ABOVE ---------- 
    */

    var userEmail = Session.getActiveUser().getEmail();
    var internalDomain = userEmail.match(/@(\w+)/g)[0].replace('@', '');

    var today = new Date();
    var nextweek = new Date();
    nextweek.setDate(nextweek.getDate() + 14);
    Logger.log(today + " " + nextweek);

    var calendars = CalendarApp.getAllOwnedCalendars();
    Logger.log("found number of calendars: " + calendars.length);

    // this assumes your SF calendar is the first calendar. you may have to change the index below.
    var calendar = calendars[0];
    var events = calendar.getEvents(today, nextweek);
    for (var j = 0; j < events.length; j++) {
        var e = events[j];
        var title = e.getTitle().toLowerCase();
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



        // recurring meeting
        if (recurringEvent) {
            e.setColor(recurringMtgColor)
        }

        // 1:1 recurring meetings (internal)
        if (numberOfGuests == 2 && recurringEvent) {
            e.setColor(oneOnOneColor)
        }

        // one off meetings
        if (numberOfGuests > 0 && !recurringEvent) {
            e.setColor(oneOffMtgColor)
        }

        // External meeting
        if (!internal) {
            e.setColor(externalMtgColor)
        }

        // focus time
        if (numberOfGuests == 0) {
            e.setColor(focusColor)
        }

        //  OOO
        if (title.includes('OOO') || title.includes('out of office')) {
            e.setColor(outOfOfficeColor);
        }

        for (inputTitle of titleLookup) {
            if (title.includes(inputTitle[0])) {
                e.setColor(inputTitle[1]);
            }
        }


    }
}
