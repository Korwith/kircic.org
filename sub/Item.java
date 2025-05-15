public class Item {
    private String name;
    private String snack;
    private double price;
    private int inventory;

    public Item(String name, String snack, double price, int inventory) {
        this.name = name;
        this.snack = snack;
        this.price = price;
        this.inventory = inventory;
    }

    public void change(int amount) {
        this.inventory += amount;
    }

    public double getPrice() {
        return this.price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getCount() {
        return this.inventory;
    }

    public String getName() {
        return this.name;
    }

    public String getSnack() {
        return this.snack;
    }

    public String toString() {
        return this.name + " (" + this.snack + ") ($" + this.price + ")";
    }
}
