// Необхідні змінні
let last_pier_id = 0;
let piers_list = new Array();

// Клас - пристань
class Pier {

    constructor (max_ships, port, id) {
    
        this.id = id;
        this.max_ships = max_ships;
        
        this.port = port;
        
        if (id === "" ||
            typeof id       === 'undefined') { this.id       = ++last_pier_id;  }
        if (max_ships === "" ||
            typeof max_ships      === 'undefined') { this.max_ships      = "Не встановлено";  }
        
        if (port === "" ||
            typeof port === 'undefined') { this.port = "Не встановлено";  }
    
    }
}

// ...............................................................................................

// Додавання нового пристанья
function add_pier (max_ships, port, id) {

    let pier = new Pier(max_ships, port, id);
    piers_list.push(pier);

    return pier;

}




// Видалити пристанья з колекції
function remove_pier (id) {

    for (let z = 0; z < piers_list.length; z++) {

        let pier = piers_list[z];
        if (pier.id === id) { piers_list.splice(z, 1);
                                return 1; }

    }

    return -1;

}

// ...............................................................................................

// Повертаємо список усіх пристаньів
function get_piers_list()
    { return piers_list; }

// Задаємо список усіх пристаньів
function set_piers_list (data) {

    if (!data || data.length < 1) { return; }

    for (let element of data) {
        add_pier(
                   element.max_ships,
                   element.port,
                   element.id);
    }
}

// Повертає пристанья по його id
function get_pier_by_id (id) {

    for (let z = 0; z < piers_list.length; z++) {

        let pier = piers_list[z];
        if (pier.id === id) { return pier; }

    }

    return -1;

}

// ...............................................................................................

// Редагувати пристанья в колекції
function edit_pier (id, new_max_ships, new_port) {

    for (let z = 0; z < piers_list.length; z++) {

        let pier = piers_list[z];

        if (pier.id === id) { pier.max_ships = new_max_ships;
                                
                                pier.port = new_port;
                                return 1; }

    }

    return -1;

}

// ...............................................................................................

// Знайти пристанья в колекції
function find_piers (search) {

    let result = [];
    search = search.toLowerCase();

    for (let pier of piers_list) {

        let attributes = [pier.id,
                           pier.port ];

        for (let attr of attributes) {

            if (attr.toLowerCase().includes(search)) { result.push(pier);
                                                       break;
            }
        }
    }

    return result;

}

// ...............................................................................................

// Вивести в консоль список пристаньів
function print_piers_list() {

    console.log("\n" + "Список усіх пристаньів:");

    for (let z = 0; z < piers_list.length; z++) {

        let pier = piers_list[z];
        
        console.log("\t" + "Місткість: "    + pier.max_ships);
        console.log("\t" + "Порт: "       + pier.port);
        console.log("\t" + "Номер: "            + pier.id);

    }
}