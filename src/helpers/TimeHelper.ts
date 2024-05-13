export function getDateString(date: Date) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}

export function getDateFromDateString(dateString: string) {
    var parts = dateString.split('-');
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])); 
}

export function getCurrentDate() {
    //https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    const currentDate = new Date();
    return getDateString(currentDate);
}

export function getUserDate() {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    return params.get('date') || getCurrentDate();
}

export function subtractDays(date: Date, days: number) {
    date.setDate(date.getDate() - days);
    return date;
}

export function getMonday(dateString: string) {
    const date = getDateFromDateString(dateString);
    const day = date.getDay();
    if (day !== 1) {
        if (day === 0) {
            return getDateString(subtractDays(date, 6));
        } else {
            return getDateString(subtractDays(date, day - 1));
        }
    }
    
    return dateString;
}