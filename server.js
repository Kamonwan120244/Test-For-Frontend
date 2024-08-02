const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom delete endpoint for removing an ingredient by index
server.delete("/recipes/:recipeId/ingredients/:ingredientIndex", (req, res) => {
  const { recipeId, ingredientIndex } = req.params;
  const db = router.db;

  // Find the recipe
  const recipe = db.get("recipes").find({ id: recipeId }).value();

  if (!recipe) {
    return res.status(404).send("Recipe not found");
  }

  // Ensure ingredientIndex is valid
  if (ingredientIndex < 0 || ingredientIndex >= recipe.detail.length) {
    return res.status(400).send("Invalid ingredient index");
  }

  // Remove ingredient from detail array
  recipe.detail.splice(Number(ingredientIndex), 1);

  // Update the recipe with modified detail array
  db.get("recipes").find({ id: recipeId }).assign(recipe).write();

  res.status(200).json(recipe);
});

server.use(router);
server.listen(4000, () => {
  console.log("JSON Server is running on port 4000");
});
