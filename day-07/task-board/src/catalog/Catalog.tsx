export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

interface CatalogProps {
  products: Product[];
  showSoldOut: boolean;
}

export function Catalog({ products, showSoldOut }: CatalogProps) {
  if (products.length === 0) {
    return <p>No products yet.</p>;
  }

  const visibleProducts = showSoldOut
    ? [...products]
    : products.filter((product) => product.inStock);

  if (visibleProducts.length === 0) {
    return <p>Everything is sold out.</p>;
  }

  const categories = [
    ...new Set(visibleProducts.map((product) => product.category)),
  ].sort();

  return (
    <div>
      {categories.map((category) => {
        const categoryProducts = visibleProducts
          .filter((product) => product.category === category)
          .sort(
            (a, b) =>
              a.price - b.price || a.name.localeCompare(b.name)
          );

        return (
          <section key={category}>
            <h2>
              {category} ({categoryProducts.length})
            </h2>
            <ul>
              {categoryProducts.map((product) => (
                <li key={product.id}>
                  {product.name} — {product.price.toFixed(2)} EGP
                  {!product.inStock && " · Sold out"}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      <p>
        Showing {visibleProducts.length} of {products.length} products
      </p>
    </div>
  );
}
