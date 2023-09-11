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
        switch (item.name) {
            case "Aged Brie":
                this.updateAgedBrie(item);
                break;
            case "Backstage passes to a TAFKAL80ETC concert":
                this.updateBackstagePass(item);
                break;
            case "Sulfuras, Hand of Ragnaros":
                // Sulfuras ne change pas
                break;
            default:
                this.updateNormalItem(item);
                break;
        }

        // Réduire sellIn pour tous les articles sauf "Sulfuras"
        if (item.name !== "Sulfuras, Hand of Ragnaros") {
            item.sellIn -= 1;
        }

        // Traitement après la date de vente
        if (item.sellIn < 0) {
            this.handleExpired(item);
        }
    }

    private updateAgedBrie(item: Item): void {
        if (item.quality < 50) {
            item.quality += 1;
        }
    }

    private updateBackstagePass(item: Item): void {
        if (item.quality < 50) {
            item.quality += 1;

            if (item.sellIn < 11) {
                item.quality += 1;
            }

            if (item.sellIn < 6) {
                item.quality += 1;
            }
        }
    }

    private updateNormalItem(item: Item): void {
        if (item.quality > 0) {
            item.quality -= 1;
        }
    }

    private handleExpired(item: Item): void {
        if (item.name === "Aged Brie") {
            this.updateAgedBrie(item);
        } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
            item.quality = 0;
        } else if (item.quality > 0) {
            this.updateNormalItem(item);
        }
    }
}
