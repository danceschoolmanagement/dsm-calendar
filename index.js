const dsmCalendarApp = require('./source/dsm-calendar.app');

let port = process.env.PORT || 3000;

dsmCalendarApp.listen(port, () => console.log(`server started on port ${port}`));