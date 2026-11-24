// =====================================================
// KRYEFAQJA (/)
// Shfaq: banerin, kategoritë dhe 12 shpalljet më të reja
// =====================================================
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { getErrorMessage } from "../api/axios";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import "../styles/Home.css";

function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect me [] ekzekutohet vetëm një herë, kur hapet faqja
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const categoriesResponse = await api.get("/categories");
      const productsResponse = await api.get("/products/latest");
      setCategories(categoriesResponse.data.data);
      setProducts(productsResponse.data.data);
    } catch (err) {
      setError(getErrorMessage(err));
    }
    setLoading(false);
  }

  return (
    <div>
      {/* BANERI */}
      <section className="hero">
        <div className="container">
          <h1>Bli dhe shit gjithçka, shpejt dhe lehtë</h1>
          <p>
            Mijëra shpallje nga njerëz si ti. Posto falas në më pak se 2 minuta.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-white">
              Shiko shpalljet
            </Link>
            <Link to="/post" className="btn btn-outline-white">
              + Posto shpallje
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        {loading && <Loading />}
        {error && <div className="alert alert-error">{error}</div>}

        {!loading && !error && (
          <>
            {/* KATEGORITË */}
            <section className="section">
              <h2 className="section-title">Kategoritë</h2>
              <div className="categories-grid">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={"/products?category=" + category.id}
                    className="category-card"
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">
                      {category.product_count} shpallje
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* SHPALLJET MË TË REJA */}
            <section className="section">
              <div className="section-header">
                <h2 className="section-title">Shpalljet më të reja</h2>
                <Link to="/products">Shiko të gjitha →</Link>
              </div>

              {products.length === 0 ? (
                <p className="empty-text">
                  Ende nuk ka shpallje. Bëhu i pari që poston!
                </p>
              ) : (
                <div className="products-grid">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
