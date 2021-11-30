//Функція перетворення стрічки в масив слів
function StringToWord(array)
{
    //Майбутній масив слів
    let words = [];
    let word = "";
    //Цилк розбиття стрічки в масив слів
    for (let i = 0; i < array.length + 1; i++)
    {
        //Перевірка на пробіл
        if (array[i] === ' ' || i === array.length)
        {
            words.push(word);
            word = "";
        }
        else
            word += array[i];
    }
    //Повернення масиву слів
    return words;
}


let str1 = "Тарас купив собі вчора нову авдюху";
let str2 = "Хардкодер в душі та за покликанням";
let str3 = "Я люблю голубці";

console.log("Стрічки : \n" + str1 + "\n" + str2 + "\n"+ str3);
console.log("Масив слів із стрічок : \n" + StringToWord(str1) + "\n" + StringToWord(str2) + "\n"+ StringToWord(str3));