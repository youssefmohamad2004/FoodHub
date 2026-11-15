import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import FoodCard from "../components/food/FoodCard";
import CategoryFilter from "../components/food/CategoryFilter";
import SearchBar from "../components/food/SearchBar";
import PriceFilter from "../components/food/PriceFilter";
import SortDropdown from "../components/food/SortDropdown";
import { foods } from "../data/foods";
export default function Menu() {
  const [params] = useSearchParams(),
    [category, setCategory] = useState(params.get("category") || "All"),
    [search, setSearch] = useState(""),
    [price, setPrice] = useState(25),
    [sort, setSort] = useState("default");
  const results = useMemo(() => {
    let a = foods.filter(
      (x) =>
        x.isAvailable &&
        (category === "All" || x.category === category) &&
        x.name.toLowerCase().includes(search.toLowerCase()) &&
        x.price <= price,
    );
    if (sort === "low") a.sort((x, y) => x.price - y.price);
    if (sort === "high") a.sort((x, y) => y.price - x.price);
    if (sort === "popular")
      a.sort((x, y) => Number(y.isPopular) - Number(x.isPopular));
    if (sort === "rating") a.sort((x, y) => y.rating - x.rating);
    return a;
  }, [category, search, price, sort]);
  return (
    <>
      <PageHeader
        title="Our Menu"
        subtitle="Find something delicious for every craving."
      />
      <section className="container section pt-0">
        <CategoryFilter value={category} onChange={setCategory} />
        <div className="filter-row">
          <SearchBar value={search} onChange={setSearch} />
          <PriceFilter value={price} onChange={setPrice} />
          <SortDropdown value={sort} onChange={setSort} />
        </div>
        <p className="result-count">Showing {results.length} dishes</p>
        {results.length ? (
          <div className="food-grid">
            {results.map((x) => (
              <FoodCard key={x.id} food={x} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No dishes found</h3>
            <p>Try a different search or price range.</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setCategory("All");
                setSearch("");
                setPrice(25);
                setSort("default");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
