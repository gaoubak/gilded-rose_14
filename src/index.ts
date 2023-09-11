export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }

    updateQuality(): void { }
    updateSellIn(): void {
        this.sellIn -= 1;
    }
}

export class AgedBrie extends Item {
    updateQuality(): void {
        if (this.quality < 50) {
            this.quality += 1;
        }
    }
}

export class BackstagePasses extends Item {
    updateQuality(): void {
        if (this.sellIn <= 0) {
            this.quality = 0;
        } else if (this.sellIn <= 5) {
            this.quality = Math.min(50, this.quality + 3);
        } else if (this.sellIn <= 10) {
            this.quality = Math.min(50, this.quality + 2);
        } else if (this.quality < 50) {
            this.quality += 1;
        }
    }
}

export class Sulfuras extends Item {
    updateQuality(): void { }
    updateSellIn(): void { }
}

export class NormalItem extends Item {
    updateQuality(): void {
        if (this.sellIn <= 0) {
            this.quality = Math.max(0, this.quality - 2);
        } else {
            this.quality = Math.max(0, this.quality - 1);
        }
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items: Array<Item>) {
        this.items = items;
    }

    updateItems(): void {
        for (const item of this.items) {
            item.updateQuality();
            item.updateSellIn();
        }
    }
}