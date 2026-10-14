import { Rating } from "./rating/Rating";
import { Catalog, type Product } from "./catalog/Catalog";
import { ShoppingList } from "./shopping/ShoppingList";

const ratingExamples = [
  { id: "rating-1", value: 3 },
  { id: "rating-2", value: 4.6, max: 10, label: "Food" },
  { id: "rating-3", value: 2.5 },
  { id: "rating-4", value: -2 },
  { id: "rating-5", value: 9, max: 3 },
  { id: "rating-6", value: NaN, label: "Service" },
  { id: "rating-7", value: 2, max: 0 },
  { id: "rating-8", value: 2, max: 2.5 },
];

const PRODUCTS: Product[] = [
  { id: 1, name: "Milk", category: "Dairy", price: 32, inStock: true },
  { id: 2, name: "Apple", category: "Fruit", price: 45.5, inStock: true },
  { id: 3, name: "Cheese", category: "Dairy", price: 120, inStock: false },
  { id: 4, name: "Banana", category: "Fruit", price: 30, inStock: true },
  { id: 5, name: "Yogurt", category: "Dairy", price: 15, inStock: true },
  { id: 6, name: "Bread", category: "Bakery", price: 15, inStock: false },
];

const PRODUCTS_WITH_BUTTER: Product[] = [
  ...PRODUCTS,
  { id: 7, name: "Butter", category: "Dairy", price: 15, inStock: true },
];

const SOLD_OUT_PRODUCTS = PRODUCTS.filter(
  (product) => product.name === "Cheese" || product.name === "Bread"
);

function App() {
  return (
    <main>
      <h1>Day 07  -  React Intro</h1>

      <section>
        <h2>Problem 1  -  Star Rating</h2>
        {ratingExamples.map(({ id, ...props }) => (
          <Rating key={id} {...props} />
        ))}
      </section>

      <hr />

      <section>
        <h2>Problem 2  -  Product Catalog</h2>

        <h3>Example 1  -  showSoldOut: true</h3>
        <Catalog products={PRODUCTS} showSoldOut={true} />

        <h3>Example 2  -  showSoldOut: false</h3>
        <Catalog products={PRODUCTS} showSoldOut={false} />

        <h3>Example 3  -  with Butter</h3>
        <Catalog products={PRODUCTS_WITH_BUTTER} showSoldOut={false} />

        <h3>Example 4  -  empty products</h3>
        <Catalog products={[]} showSoldOut={true} />

        <h3>Example 5  -  all sold out</h3>
        <Catalog products={SOLD_OUT_PRODUCTS} showSoldOut={false} />
      </section>

      <hr />

      <section>
        <ShoppingList />
      </section>
    </main>
  );
}

export default App;
