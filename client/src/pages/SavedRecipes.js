import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

export const SavedRecipes = () => {
	const [savedRecipes, setSavedRecipes] = useState([]);
	const userID = useGetUserID([]);

	useEffect(() => {
		const fetchSavedRecipes = async () => {
			try {
				const response = await axios.get(
					"https://localhost:3000/savedRecipes/ids/${userID}"
				);
				setSavedRecipes = response.data.savedRecipes;
			} catch (err) {
				console.error(err);
			}
			fetchSavedRecipes();
		};
	}, []);

	return (
		<div>
			<h1>Saved Recipes</h1>
			<ul>
				{savedRecipes.map((recipe) => (
					<li key={recipe._id}>
						<div>
							<h2>{recipe.name}</h2>
						</div>
						<p>{recipe.description}</p>
						<img src={recipe.Url} alt={recipe.name} />
						<p>Cooking time: {recipe.cookingTime} minutes</p>
					</li>
				))}
			</ul>
		</div>
	);
};
