import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-ccokie";

export const Home = () => {
	const [recipe, setRecipe] = useState([]);
	const [savedRecipes, setSavedRecipes] = useState([]);
	const userID = useGetUserID();

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const response = await axios.get(
					"https://localhost:3001/recipes"
				);
				setRecipe(response.data);
			} catch (err) {
				console.error(err);
			}
		};

		const fetchSavedRecipes = async () => {
			try {
				const response = await axios.get(
					`https://localhost:3001/savedRecipes/ids/${userID}`
				);
				setSavedRecipes(response.data.savedRecipes);
			} catch (err) {
				console.error(err);
			}
		};

		fetchRecipes();
		if (cookies.access_token) fetchSavedRecipes();
	}, []);

	const saveRecipe = async (recipeID) => {
		try {
			const response = await axios.put(
				"https://localhost:3001/recipes",
				recipeID,
				userID
			);
			setSavedRecipes(response.data.savedRecipes);
		} catch (err) {
			console.error(err);
		}
	};

	const isRecipeSaved = (recipeID) => savedRecipes.includes(recipeID);

	return (
		<div>
			<h1>Recipes</h1>
			<ul>
				{recipe.map((recipe) => (
					<li key={recipe._id}>
						<div>
							<h2>{recipe.name}</h2>
							<button
								onClick={saveRecipe(recipe._id)}
								disabled={isRecipeSaved(recipe._id)}
							>
								{isRecipeSaved ? "Saved" : "Save"}
							</button>
							<div className="instructions">
								<p>{recipe.instructions}</p>
							</div>
							<img src={recipe.imageUrl} alt={recipe.name} />
							<p>Cooking Time: {recipe.cookingTime} minutes</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
