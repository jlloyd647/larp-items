import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArtisanRecipe } from "@/types";

type ChildProps = {
  setSelectedRecipe: React.Dispatch<React.SetStateAction<ArtisanRecipe | null>>;
  recipes: ArtisanRecipe[];
}

const SearchableDropdown = ({recipes, setSelectedRecipe}: ChildProps) => {
  const [open, setOpen] = useState(false);
  const [recipeId, setRecipeId] = useState<number>();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    console.log(recipes);
  }, [recipes]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-64 justify-between"
        >
          {searchQuery
            ? recipes.find((recipe) => recipe.id === recipeId)?.name
            : "Select Recipe..."}
          <span className="ml-2 opacity-50">▼</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        {/* Search Input */}
        <div className="mb-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipe..."
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Options List */}
        <div className="max-h-60 overflow-auto">
          {filteredRecipes.length === 0 ? (
            <div className="py-2 text-sm text-gray-500">
              No framework found.
            </div>
          ) : (
            filteredRecipes.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => {
                  setRecipeId(recipe.name === searchQuery ? recipe.id : undefined);
                  setSelectedRecipe(recipe);
                  setOpen(false);
                  setSearchQuery("");
                }}
                className="flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100"
              >
                {/* <span className="mr-2 w-4">
                  {id === recipe.id ? "✓" : ""}
                </span> */}
                {recipe.name}
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SearchableDropdown;