import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    //"about": "Burt is a Bear.",
    "about": "48hrs.",
    "mensj": "Obtenerlo Ahora!.",
  };


  constructor() {
    let items = [
      {
        "name": "Burt Bear",
        "profilePic": "assets/img/speakers/cineplanetofer.jpg",
        //"about": "Burt is a Bear.",
        "about": "48hrs.",
        "mensj": "Obtenerlo Ahora!.",
      },
      {
        "name": "Charlie Cheetah",
        "profilePic": "assets/img/speakers/cheetah.jpg",
        //"about": "Charlie is a Cheetah.",
        "about": "48hrs.",
        "mensj": "Obtenerlo Ahora!.",
      },
      {
        "name": "Donald Duck",
        "profilePic": "assets/img/speakers/duck.jpg",
        //"about": "Donald is a Duck.",
        "about": "48hrs.",
        "mensj": "Obtenerlo Ahora!.",
      },
      {
        "name": "Eva Eagle",
        "profilePic": "assets/img/speakers/eagle.jpg",
        //"about": "Eva is an Eagle.",
        "about": "48hrs.",
        "mensj": "Obtenerlo Ahora!.",
      },
      {
        "name": "Ellie Elephant",
        "profilePic": "assets/img/speakers/elephant.jpg",
        //"about": "Ellie is an Elephant.",
        "about": "48hrs.",
        "mensj": "Obtenerlo Ahora!.",
      },
      {
        "name": "Molly Mouse",
        "profilePic": "assets/img/speakers/mouse.jpg",
        //"about": "Molly is a Mouse.",
        "about": "48hrs.",
        "mensj": "Obtenerlo Ahora!.",
      },
      {
        "name": "Paul Puppy",
        "profilePic": "assets/img/speakers/puppy.jpg",
        //"about": "Paul is a Puppy.",
        "about": "48hrs.",
        "mensj": "Obtenerlo Ahora!.",
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
