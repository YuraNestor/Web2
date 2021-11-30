//Функція сортування букв у слові
function SortLetters(word)
{
    let words = [];
    let wd = "";
    //Цикл розбиття слова на масив букв
    for (let i = 0; i < word.length; i++)
        words.push(word[i]);
    //Цикл сортування
    for (let i = 0; i < words.length; i++)
    {
        for (let j = 0; j < words.length; j++)
        {
            if (words[i] < words[j]) {
                [words[i], words[j]] = [words[j], words[i]];
            }
        }
    }
    //Цикл перетворення масив літер в відсортоване слово
    for (let i = 0; i < words.length; i++)
        wd += words[i];
    //Повернення відсортованного слова
    return wd;
}

let word1 = "ДУМИНЕЦЬ";
let word2 = "тетрагідраканабіноїд";
let word3 = "Азербайджан";

console.log("Слово : " + word1 + "\nВідсортонаване слово : " + SortLetters(word1));
console.log("Слово : " + word2 + "\nВідсортонаване слово : " + SortLetters(word2));
console.log("Слово : " + word3 + "\nВідсортонаване слово : " + SortLetters(word3));