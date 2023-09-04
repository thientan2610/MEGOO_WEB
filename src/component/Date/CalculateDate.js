
function CalculateDate(start, end) {
    let startDate = new Date(start);
    let endDate = new Date(end);

    let day = new Date(startDate - endDate)
    
    return day.getDate();
    
}

export default CalculateDate;