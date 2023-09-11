export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items: Array<Item> = []) {
        this.items = items;
    }

    updateQuality(): Array<Item> {
        for (const item of this.items) {
            this.processItem(item);
        }
        return this.items;
    }

    private processItem(item: Item): void {
        if (item.name !== "Sulfuras, Hand of Ragnaros") {
            item.sellIn -= 1;

            switch (item.name) {
                case "Aged Brie":
                    this.updateAgedBrie(item);
                    break;
                case "Backstage passes to a TAFKAL80ETC concert":
                    this.updateBackstagePass(item);
                    break;
                default:
                    this.updateNormalItem(item);
                    break;
            }

            if (item.sellIn < 0) {
                this.handleExpired(item);
            }
        }
    }


    private updateAgedBrie(item: Item): void {
        item.quality = item.quality < 50 ? item.quality + 1 : item.quality;
    }

    private updateBackstagePass(item: Item): void {
        if (item.sellIn <= 0) {
            item.quality = 0;
            return;
        }

        item.quality += item.sellIn < 6 ? 3 : item.sellIn < 11 ? 2 : 1;
        item.quality = Math.min(item.quality, 50);
    }

    private updateNormalItem(item: Item): void {
        item.quality = item.quality > 0 ? item.quality - 1 : item.quality;
    }

    private handleExpired(item: Item): void {
        if (item.name === "Aged Brie") {
            this.updateAgedBrie(item);
        } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
            item.quality = 0;
        } else {
            this.updateNormalItem(item);
        }
    }
}