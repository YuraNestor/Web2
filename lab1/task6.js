//Об'єкт юзер
class User
{
    constructor(name) {
        this.name = name;
    }
}

//Функція сортування масиву юзерів по іменні
function SortUsers(array)
{
    //Цикл сортування
    for (let i = 0; i < array.length; i++)
    {
        for (let j = 0; j < array.length; j++)
        {
            if (array[i].name < array[j].name) {
                [array[i], array[j]] = [array[j], array[i]];
            }

        }
    }
    //Повернення відсортованного масиву
    return array;
}

let arr1 = [new User("John"), new User("Roma"), new User("Ivan"), new User("Tom"), new User("Steve"), new User("Antony"), new User("Jack")];
let arr2 = [new User("Artur"), new User("Taras"), new User("Aavan"), new User("Stan"), new User("Igor"), new User("Anton"), new User("Jimmy")];
let arr3 = [new User("Jack"), new User("Petro"), new User("Oleg"), new User("Nazar"), new User("Denus"), new User("Ronald"), new User("Steve")];

console.log("Масив юзерів : ");
console.log(arr1);
console.log("Відсортованний масив юзерів : ");
console.log(SortUsers(arr1));

console.log("Масив юзерів : ");
console.log(arr2);
console.log("Відсортованний масив юзерів : ");
console.log(SortUsers(arr2));

console.log("Масив юзерів : ");
console.log(arr3);
console.log("Відсортованний масив юзерів : ");
console.log(SortUsers(arr3));