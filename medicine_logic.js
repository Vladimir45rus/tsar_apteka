// Логика управления запасами и сроками Царь-Аптечки (JS версия)
class MedicineManager {
    constructor() {
        this.inventory = [];
    }

    // Добавить лекарство
    addMedicine(name, expDate, quantity, threshold = 5) {
        const medicine = {
            name: name,
            expirationDate: new Date(expDate),
            totalQuantity: quantity,
            threshold: threshold
        };
        this.inventory.push(medicine);
        console.log(`Царь, ${name} добавлено.`);
    }

    // Проверка всей аптечки
    checkInventory() {
        const today = new Date();
        const monthLater = new Date();
        monthLater.setDate(today.getDate() + 30);

        return this.inventory.map(med => {
            let status = "ОК";
            if (med.expirationDate < today) status = "⚠️ ПРОСРОЧЕНО!";
            else if (med.expirationDate < monthLater) status = "🔔 СКОРО ПРОСРОЧИТСЯ";
            
            if (med.totalQuantity <= med.threshold) status += " | 📦 МАЛО ОСТАТКОВ";
            
            return `${med.name}: ${status}`;
        });
    }
}

export default new MedicineManager();
