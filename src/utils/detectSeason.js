export function detectSeason (month, lat) {
    if(lat >= 0) {
        if (month === 11 || month === 0 || month === 1) {
            return "winter";
        } else if (month === 2 || month === 3 || month === 4) {
            return "spring";
        } else if (month === 5 || month === 6 || month === 7) {
            return "summer";
        } else {
            return "fall";
        }
    } else {
        if (month === 11 || month === 0 || month === 1) {
            return "summer";
        } else if (month === 2 || month === 3 || month === 4) {
            return "fall";
        } else if (month === 5 || month === 6 || month === 7) {
            return "winter";
        } else {
            return "spring";
        }
    }
}