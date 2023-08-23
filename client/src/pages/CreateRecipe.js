import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
	const userID = useGetUserID;
	const [cookies, _] = useState(["access_token"]);
	const [recipe, setRecipe] = useState({
		name: "",
		description: "",
		ingredients: [],
		instructions: "",
		imageUrl: "",
		cookingTime: 0,
		userOwner: userID,
	});

	const navigate = useNavigate();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setRecipe({ ...recipe, [name]: value });
	};

	const handleIngredientChange = (event, index) => {
		const { value } = event.target;
		const ingredients = recipe.ingredients;
		ingredients[index] = value;
		setRecipe({ ...recipe, ingredients });
		r;
	};

	const handleAddIngredient = () => {
		const ingredients = [...recipe.ingredients, ""];
		setRecipe({ ...recipe, ingredients });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post(
				"https://localhost:3001/recipes",
				{ ...recipe },
				{
					headers: { authorization: cookies.access_token },
				}
			);
		} catch (err) {
			console.error(err);
		}
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post("https://localhost:3001/recipes", recipe);
			navigate("/");
			alert("Recipe Created");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="create-recipe">
			<h2>Create Recipe</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					id="name"
					name="name"
					value={recipe.name}
					onChange={handleChange}
				/>
				<label htmlFor="description">Desciption</label>
				<textarea
					id="description"
					name="description"
					value={recipe.description}
					onChange={handleChange}
				/>
				<label htmlFor="ingredients">Ingredients</label>
				{recipe.ingredients.map((ingredient, index) => (
					<input
						type="text"
						key={index}
						name="ingredients"
						value={ingredient}
						onChange={(event) =>
							handleIngredientChange(event, index)
						}
					/>
				))}
				<button type="button" onClick={handleAddIngredient}>
					Add Ingredient
				</button>
				<label htmlFor="instructions">Instructions</label>
				<textarea
					id="instructions"
					name="instructions"
					value={recipe.instructions}
					onChange={handleChange}
				/>
				<label htmlFor="imageUrl">Image URL</label>
				<input
					type="text"
					name="imageUrl"
					id="imageUrl"
					value={recipe.imageUrl}
					onChange={handleChange}
				/>
				<label htmlFor="cookingTime">Cooking Time (minutes)</label>
				<input
					type="number"
					id="cookingTime"
					name="cookingTime"
					value={recipe.cookingTime}
					onChange={handleChange}
				/>
				<button type="submit">Create Recipe</button>
			</form>
		</div>
	);
};
