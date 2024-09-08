import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "./Select";

const PreferencesForm = ({ filters, onSavePreferences, clearPrefenences }) => {
  const preferences = useSelector((state) => state.articles.preferences);

  const [authorSelections, setAuthorSelections] = useState("");
  const [sourceSelections, setSourceSelections] = useState("");
  const [categorySelections, setCategorySelections] = useState("");

  useEffect(() => {
    setAuthorSelections(preferences.author || "");
    setSourceSelections(preferences.source || "");
    setCategorySelections(preferences.category || "");
  }, [preferences]);

  const handleSavePreferences = (e) => {
    e.preventDefault();
    const newPreferences = {
      author: authorSelections,
      source: sourceSelections,
      category: categorySelections,
    };

    if (
      authorSelections != "" &&
      sourceSelections != "" &&
      categorySelections != ""
    ) {
      localStorage.setItem("preferences", JSON.stringify(newPreferences));
      onSavePreferences(newPreferences);
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("preferences");
    clearPrefenences({
      author: "",
      source: "",
      category: "",
    });
  };

  return (
    <form className={"search-panel"} onSubmit={handleSavePreferences}>
      <h3>Set Your Preferences</h3>
      <div className="filters-panel">
        <Select
          title="Select Preferred Authors"
          label="Select Preferred Authors"
          options={filters.authors}
          value={authorSelections}
          onChange={setAuthorSelections}
          multiple={false}
        />
        <Select
          title="Select Preferred Sources"
          label="Select Preferred Sources"
          options={filters.sources}
          value={sourceSelections}
          onChange={setSourceSelections}
        />
        <Select
          title="Select Preferred Categories"
          label="Select Preferred Categories"
          options={filters.categories}
          value={categorySelections}
          onChange={setCategorySelections}
        />
        <button type="submit">Save Preferences</button>
        <p onClick={clearLocalStorage}>Clear Settings</p>
      </div>
    </form>
  );
};

export default PreferencesForm;
