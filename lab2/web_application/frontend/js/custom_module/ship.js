// Необхідні змінні
let last_ship_id = 0;
let ships_list = new Array();
let cured_ships_list = new Array();

// Клас - ship
class Ship {

    // Конструктор класу
    constructor (name, country, tonnage, pier, port, id) {
    
        this.id = id;
        this.tonnage = tonnage;
        this.country = country;
        this.name = name;
        this.pier = pier;
        this.port = port;
        
        if (id === "" ||
            typeof id       === 'undefined') { this.id       = ++last_ship_id;   }
        if (tonnage === "" ||
            typeof tonnage      === 'undefined') { this.tonnage      = "Не встановлено";    }
        if (name === "" ||
            typeof name     === 'undefined') { this.name     = "Невідоме"; }
        if (pier === "" ||
            typeof pier   === 'undefined') { this.pier   = "Не призначено";     }
        if (port === "" ||
            typeof port === 'undefined') { this.port = "Не встановлено"; }
        if (country === "" ||
            typeof country === 'undefined') { this.country = "Не встановлено"; }
    
    }
}

// ...............................................................................................

// Додавання нового shipа
function add_ship(name, country, tonnage, pier, port, id) {


    let ship = new Ship(name, country, tonnage, pier, port, id);
    ships_list.push(ship);


    return ship;

}

// Додавання нового виписаного shipа
function add_cured_ship(name, country, tonnage, pier, port, id) {

    let ship = new Ship(name, country, tonnage, pier, port, id);
    cured_ships_list.push(ship);

    return ship;

}

// Видалити shipа з колекції
function remove_ship (id) {

    for (let z = 0; z < ships_list.length; z++) {

        let ship = ships_list[z];
        if (ship.id === id) {
            
            
            cured_ships_list.push(ship);
            remove_cured_ship(id + 1);
                                 ships_list.splice(z, 1);
                                 return 1; }

    }

    return -1;

}

// Видалити виписаного shipа з колекції
function remove_cured_ship (id) {

    for (let z = 0; z < cured_ships_list.length; z++) {

        let ship = cured_ships_list[z];
        if (ship.id === id) {
            
            cured_ships_list.splice(z, 1);
                                 return 1; }

    }

    return -1;

}

// ...............................................................................................

// Повертаємо список усіх shipів
function get_ships_list (cured) {

    if (cured) { return cured_ships_list; }
    else       { return ships_list; }

}

// Задаємо список усіх shipів
function set_ships_list (data, cured) {

    if (!data || data.length < 1) { return; }

    for (let element of data) {

        if (cured) {
            add_cured_ship(element.name,
                element.country,
                              element.tonnage,
                              element.pier,
                              element.port,
                              element.id);
        }

        else {
            add_ship(element.name,
                element.country,
                        element.tonnage,
                        element.pier,
                        element.port,
                        element.id);
        }
    }
}

// Повертає shipа по його id
function get_ship_by_id (id, cured) {

    let list = cured ? cured_ships_list : ships_list;

    for (let z = 0; z < list.length; z++) {

        let ship = list[z];
        if (ship.id === id) { return ship; }

    }

    return -1;

}

function get_ship_pier_count(pier) {

    let list = ships_list;
    let count=0;
    for (let z = 0; z < list.length; z++) {

        let ship = list[z];
        if (ship.pier === pier) { count++; }

    }
    
    return count;

}

// ...............................................................................................

// Редагувати ship в колекції
function edit_ship(id, new_name, new_country, new_tonnage, new_pier, new_port) {

    for (let z = 0; z < ships_list.length; z++) {

        let ship = ships_list[z];

        if (ship.id === id) {
            ship.tonnage = new_tonnage;
            ship.country = new_country;
                                 ship.name = new_name;
                                 ship.pier = new_pier;
                                 ship.port = new_port;
                                 return 1; }

    }

    return -1;

}

// ...............................................................................................

// Знайти ship в колекції
function find_ships (search, cured) {

    let result = [];
    let list = cured ? cured_ships_list : ships_list;

    search = search.toLowerCase();

    for (let ship of list) {

        let attributes = [ship.name,
            ship.country,
                           ship.pier,
                           ship.port ];

        for (let attr of attributes) {

            if (attr.toLowerCase().includes(search)) { result.push(ship);
                                                       break;
            }
        }
    }

    return result;

}

// ...............................................................................................

// Вивести в консоль список shipів
function print_ships_list (cured) {

    let type = cured ? "виписаних " : "";
    let list = cured ? cured_ships_list : ships_list;

    console.log("\n" + "Список усіх " + type + "shipів:");

    for (let z = 0; z < list.length; z++) {

        let item = list[z];
        console.log("\t" + "Назва корабля: " + item.name);
        console.log("\t" + "Тоннаж: "    + item.tonnage);
        console.log("\t" + "Пристань: "           + item.pier);
        console.log("\t" + "Порт: "         + item.port);
        console.log("\t" + "ID: "              + item.id);

    }
}