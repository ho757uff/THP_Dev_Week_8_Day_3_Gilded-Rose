class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];

      // Vérifier si l'article est "Conjured"
      const isConjured = currentItem.name.includes('Conjured');

      if (currentItem.name != 'Aged Brie' && currentItem.name != 'Backstage passes to a TAFKAL80ETC concert') {
        // Réduire la qualité de 1 pour les articles normaux, ou de 2 pour les articles "Conjured"
        currentItem.quality -= isConjured ? 2 : 1;
      } else {
        if (currentItem.quality < 50) {
          // Augmenter la qualité pour "Aged Brie" et "Backstage passes"
          currentItem.quality += 1;

          // Augmenter de 2 si la date de vente est dans les 10 jours, de 3 si dans les 5 jours pour "Backstage passes"
          if (currentItem.name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (currentItem.sellIn < 11) {
              currentItem.quality += 1;
            }
            if (currentItem.sellIn < 6) {
              currentItem.quality += 1;
            }
          }
        }
      }

      // Réduire la date de vente sauf pour "Sulfuras"
      if (currentItem.name != 'Sulfuras, Hand of Ragnaros') {
        currentItem.sellIn -= 1;
      }

      // Gérer la qualité après la date de vente
      if (currentItem.sellIn < 0) {
        if (currentItem.name != 'Aged Brie') {
          if (currentItem.name != 'Backstage passes to a TAFKAL80ETC concert') {
            // Réduire la qualité de 1 pour les articles normaux, sauf pour "Sulfuras"
            if (currentItem.name != 'Sulfuras, Hand of Ragnaros' && currentItem.quality > 0) {
              currentItem.quality -= isConjured ? 2 : 1;
            }
          } else {
            // Pour les "Backstage passes", la qualité tombe à 0 après la date de vente
            currentItem.quality = 0;
          }
        } else {
          // Augmenter la qualité pour "Aged Brie" même après la date de vente
          currentItem.quality += 1;
        }
      }

      // Limiter la qualité à 50
      if (currentItem.quality > 50) {
        currentItem.quality = 50;
      }

      // Limiter la qualité à 0
      if (currentItem.quality < 0) {
        currentItem.quality = 0;
      }


      // Pour "Sulfuras", la qualité doit rester inchangée
      if (currentItem.name == 'Sulfuras, Hand of Ragnaros') {
        currentItem.quality = 80;
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
};
