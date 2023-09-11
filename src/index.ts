import "./styles.css";

export default function App() {
  return "";
}

export class Item {
  static all: any = [];

  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    Item.all.push(this);
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = Item.all as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      if (
        item.name === "Aged Brie" ||
        item.name === "Backstage passes to a TAFKAL80ETC concert"
      ) {
        item.quality += 1;
      }
      if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        item.quality =
          item.sellIn <= 10
            ? (item.quality += 2)
            : item.quality <= 5
            ? (item.quality += 3)
            : item.quality;
        console.log(item);
      }
    });
  }

  handleQualityNumber() {
    this.items.forEach((item) => {
      if (item.quality > 50 && item.name !== "Sulfuras, Hand of Ragnaros") {
        item.quality = 50;
      }
      if (item.quality < 0) {
        item.quality = 0;
      }
      if (
        item.name === "Backstage passes to a TAFKAL80ETC concert" &&
        item.sellIn === 0
      ) {
        item.quality = 0;
      }
    });
  }

  updateItems() {
    this.updateQuality();
    this.handleQualityNumber();
    return this.items;
  }
}

new Item("Sulfuras, Hand of Ragnaros", 6, 80);
new Item("Aged Brie", 20, 59);
new Item("Backstage passes to a TAFKAL80ETC concert", 0, 40);
new Item("Test 01", 0, 0);

console.log("Update Quality : ", new GildedRose().updateItems());
