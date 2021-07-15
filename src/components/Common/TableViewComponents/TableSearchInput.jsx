import { Input } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDebounce } from "../../../hooks/useDebounce";

export function TableSearchInput({ onUpdate }) {
  const [searchInput, setSearchInput] = useState("");
  const searchText = useDebounce(searchInput, 200);
  useEffect(() => {
    onUpdate(searchText.toLowerCase());
  }, [onUpdate, searchText]);

  return (
    <Input
      margin="none"
      className="search-input"
      disableUnderline
      placeholder="Enter search keyword"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
    />
  );
}
