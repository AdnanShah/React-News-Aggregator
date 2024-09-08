import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchArticlesAsync,
  fetchFiltersAsync,
  setPreferences,
  setShowPreferencePopup,
} from "../store/slices/articlesSlice";
import { SearchBar, ArticleList, PreferencesForm, Loader } from "../components";

const Home = () => {
  const dispatch = useDispatch();
  const [filtersLoader, setFiltersLoader] = useState(false);
  const {
    articles,
    searchKeyword,
    filters,
    preferences,
    status,
    error,
    showPreferencePopup,
    showMenuSearch,
  } = useSelector((state) => state.articles);

  const handleSavePreferences = (preferences) => {
    dispatch(setPreferences(preferences));
    dispatch(
      fetchArticlesAsync({ query: searchKeyword, filters: preferences })
    );
    dispatch(setShowPreferencePopup(false));
  };

  const handleClearPreferences = (preferences) => {
    dispatch(setShowPreferencePopup(false));
    dispatch(setPreferences(preferences));
    dispatch(
      fetchArticlesAsync({ query: searchKeyword, filters: preferences })
    );
  };

  const handleSearch = (e, p) => {
    dispatch(setPreferences(p));
    dispatch(fetchArticlesAsync({ query: e, filters: p }));
  };
  useEffect(() => {
    if (!filtersLoader) {
      setFiltersLoader(true);
      setTimeout(() => {
        dispatch(fetchFiltersAsync());
      }, 4000);
    }

    const savedPreferences = JSON.parse(localStorage.getItem("preferences"));
    if (savedPreferences) {
      dispatch(setShowPreferencePopup(false));
      dispatch(setPreferences(savedPreferences));
      dispatch(
        fetchArticlesAsync({ query: searchKeyword, filters: savedPreferences })
      );
    } else {
      dispatch(
        fetchArticlesAsync({ query: searchKeyword, filters: preferences })
      );
    }
  }, []);

  return (
    <main>
      <SearchBar
        visibility={showMenuSearch}
        searchKeyword={handleSearch}
        filters={filters}
      />
      {status === "loading" && <Loader />}
      {status === "failed" && <p>Error: {error}</p>}
      {showPreferencePopup && (
        <PreferencesForm
          filters={filters}
          onSavePreferences={handleSavePreferences}
          clearPrefenences={handleClearPreferences}
        />
      )}
      <ArticleList articles={articles} />
    </main>
  );
};

export default Home;
