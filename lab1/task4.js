//Функція випадкового сортуванння масиву
function shuffle(array)
{
    //Цикл сортування
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    //Повернення відсортованого масиву
    return array;
}

let arr1 = [2,3,4,5,6,7,8,9,0];
let arr2 = ['a','v','g','d','e','y','o','q','e'];
let arr3 = ['d','s',3,'g',9,0,4,1,0];

console.log("Масив : " + arr1 + "\nРандомно відсортований масив : " + shuffle(arr1));
console.log("Масив : " + arr2 + "\nРандомно відсортований масив : " + shuffle(arr2));
console.log("Масив : " + arr3 + "\nРандомно відсортований масив : " + shuffle(arr3));