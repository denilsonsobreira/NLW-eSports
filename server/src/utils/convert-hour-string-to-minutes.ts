/**
 * @params hourString -> "18:30"
 * split -> ["18","30"]
 * map -> [18, 30]
 * (18*60) + 30
 * 1110 minutes
 */
export function convertHourFunctionsToMinutes(hourString:string) {
    const [hours,minutes] = hourString.split(':').map(Number)
    const minutesAmount = (hours*60) + minutes
    return minutesAmount
}