
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
  const [params] = useSearchParams();

  const [category, setCategory] = useState(
    params.get("category") || "All"
  );
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(25);
  const [sort, setSort] = useState("default");

  // Filter and sort the available dishes
  const results = useMemo(() => {
    let filteredFoods = foods.filter(
      (food) =>
        food.isAvailable &&
        (category === "All" || food.category === category) &&
        food.name.toLowerCase().includes(search.trim().toLowerCase()) &&
        food.price <= price
    );

    if (sort === "low") {
      filteredFoods.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      filteredFoods.sort((a, b) => b.price - a.price);
    }

    if (sort === "popular") {
      filteredFoods.sort(
        (a, b) => Number(b.isPopular) - Number(a.isPopular)
      );
    }

    if (sort === "rating") {
      filteredFoods.sort((a, b) => b.rating - a.rating);
    }

    return filteredFoods;
  }, [category, search, price, sort]);

  // Reset all filters to their default values
  const resetFilters = () => {
    setCategory("All");
    setSearch("");
    setPrice(25);
    setSort("default");
  };

  return (
    <>
      <PageHeader
        title="Our Menu"
        subtitle="Explore delicious meals and find your next favorite dish."
      />

      <section className="container section pt-0">
        <CategoryFilter
          value={category}
          onChange={setCategory}
        />

        <div className="filter-row">
          <SearchBar
            value={search}
            onChange={setSearch}
          />

          <PriceFilter
            value={price}
            onChange={setPrice}
          />

          <SortDropdown
            value={sort}
            onChange={setSort}
          />
        </div>

        <p className="result-count">
          Showing {results.length}{" "}
          {results.length === 1 ? "dish" : "dishes"}
        </p>

        {search.trim() !== "" && (
          <button
            type="button"
            className="btn btn-outline-primary btn-sm mb-3"
            onClick={() => setSearch("")}
          >
            Clear Search
          </button>
        )}

        {results.length > 0 ? (
          <div className="food-grid">
            {results.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No matching dishes found</h3>

            <p>
              We couldn't find any meals matching your search.
              Try another keyword, category, or price range.
            </p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
