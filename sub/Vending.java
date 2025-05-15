import java.util.*;
import java.util.ArrayList;
import java.util.Scanner;

public class Vending {
    private static ArrayList<String> names;
    private static ArrayList<String> snacks;
    private static ArrayList<Item> items;
    private static String accept = "ABCDEF";
    private static Scanner scan = new Scanner(System.in);

    private static String possible_snacks[] = {
        "Cheeseburer",
        "Hotdog",
        "CHEEZ-IT",
        "Gummy Worms",
        "Hershy's",
        "Sour Patch Kids",
        "Twinkies",
        "Chips Ahoy",
        "Sweedish Fish",
        "Lays Chips",
        "UTZ Pretzels",
        "Cheetos",
        "Takis",
        "Wings",
        "Pizza",
        "Recees Cups",
        "Recees Pieces",
        "Veggie Straws",
        "Gum",
        "Clif Bar",
        "Snickers",
        "Kit-Kat",
        "Whopper",
        "M&Ms",
    };

    public static void main(String[] args) {
        System.out.println("Vending Machine");
        names = new ArrayList<String>();
        snacks = new ArrayList<String>();
        items = new ArrayList<Item>();

        for (int i = 0; i < 10; i++) {
            makeItem();
        }

        for (Item found : items) {
            System.out.println("Name: " + found.getName() + " (" + found.getSnack() + ")");
            System.out.println("Price: $" + getUpdatedPrice(found.getPrice()));
            System.out.println("Count: " + found.getCount());
            System.out.println();
        }

        askNext();
    }

    public static String getUpdatedPrice(double cash) {
        String price_string = cash + "";
        int dot_index = price_string.indexOf(".");
        String price_sub = price_string.substring(0, dot_index + 3);
        return price_sub;
    }

    public static void makeItem() {
        int random_letter_index =  (int) Math.floor(Math.random() * accept.length());
        String random_letter = accept.substring(random_letter_index, random_letter_index + 1);
        int random_number = (int) Math.floor(Math.random() * 9) + 1;
        String item_id = random_letter + random_number;
        String random_snack = possible_snacks[(int) Math.floor(Math.random() * possible_snacks.length)];

        if ((names.indexOf(item_id) != -1) || (snacks.indexOf(random_snack) != -1)) {
            makeItem();
            return;
        }

        double random_price = (Math.random() * 3) + 2;
        int random_inventory = (int) Math.floor(Math.random() * 7) + 2;

        Item new_item = new Item(item_id, random_snack, random_price, random_inventory);
        names.add(item_id);
        snacks.add(random_snack);
        items.add(new_item);
    }

    public static void askNext() {
        System.out.println("Enter item ID:");
        String target = scan.nextLine();

        if (names.indexOf(target) != -1) {
            System.out.println("Selected " + target);
            handleMenuSelect(target);
        } else {
            askNext();
        }
    }

    public static void handleMenuSelect(String target) {
        System.out.println("What would you like to do with " + target + " ?");
        System.out.println("1: Get Count");
        System.out.println("2: Get Price");
        System.out.println("3: Buy Item");
        System.out.println("4: Next Item");
        System.out.println("5: Vendor Options");
        int item_index = names.indexOf(target);
        Item found_item = items.get(item_index);

        int input = scan.nextInt();
        switch(input) {
            case 1:
                System.out.println(found_item.getCount());
                break;
            case 2:
                double current_price = found_item.getPrice();
                System.out.println("$" + getUpdatedPrice(current_price));
                break;
            case 3:
                if (found_item.getCount() == 0) {
                    System.out.println("Out of stock");
                    break;
                }

                System.out.println("How much money do you have?");
                double buy_input = scan.nextDouble();

                if (found_item.getPrice() > buy_input) {
                    System.out.println("Not enough money to buy " + target);
                } else {
                    found_item.change(-1);
                    System.out.println("Your change is: $" + getUpdatedPrice(buy_input - found_item.getPrice()));
                }
                break;
            case 4:
                System.out.println("Select next item");
                askNext();
                break;
            case 5:
                System.out.println("1: Increase Count");
                System.out.println("2: Decrease Count");
                System.out.println("3: Change Price");
                System.out.println("4: Exit");
                int vendor_input = scan.nextInt();
                switch(vendor_input) {
                    case 1:
                        found_item.change(1);
                        System.out.println("Updated inventory");
                        break;
                    case 2:
                        found_item.change(-1);
                        System.out.println("Updated inventory");
                        break;
                    case 3:
                        System.out.println("Enter updated price:");
                        double new_price = scan.nextDouble();
                        found_item.setPrice(new_price);
                        break;
                    case 4:
                        handleMenuSelect(target);
                        break;
                    default:
                        System.out.println("Invalid selection");
                }
                break;
            default:
                System.out.println("Invalid selection");
        }

        handleMenuSelect(target);
    }
}
