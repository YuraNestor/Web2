//Функція що повертає кількість днів для заданого місяця та року
function daysInMonthMy(month, year)
{
    // if (month === 1)
    //     return 31;
    // if (month === 2)
    //     return year % 4 === 0 ? 29 : 28;
    // if (month === 3)
    //     return 31;
    // if (month === 4)
    //     return 30;
    // if (month === 5)
    //     return 31;
    // if (month === 6)
    //     return 30;
    // if (month === 7)
    //     return 31;
    // if (month === 8)
    //     return 31;
    // if (month === 9)
    //     return 30;
    // if (month === 10)
    //     return 31;
    // if (month === 11)
    //     return 30;
    // if (month === 12)
    //     return 31;
    if (month<=0){
        return 0;
    }
    if (month>12){
        return 0;
    }
    if(month>=8){
        month++;

    }
    if(month===2){
        if(year%100===0){
            if(year%400===0){
                return 29;
            }
            return 28;
        }
        return year % 4 === 0 ? 29 : 28;
    }
    if(month%2===0){
        return 30;
    }
    return 31;
}

console.log("Кількість днів в 4 місяці 2009 року = " + daysInMonthMy(4, 2009));
console.log("Кількість днів в 2 місяці 2020 року = " + daysInMonthMy(2, 2020));
console.log("Кількість днів в 2 місяці 100 року = " + daysInMonthMy(2, 100));
console.log("Кількість днів в 7 місяці 1999 року = " + daysInMonthMy(7, 1999));
console.log("Кількість днів в 8 місяці 1990 року = " + daysInMonthMy(8, 1990));
