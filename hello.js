
const container = document.querySelector(".container");
const resultBox = document.querySelector(".result-box");
const recipeBox = document.querySelector(".recipe-box");
const input = document.querySelector("input");
const form = document.querySelector("form");
const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    fetch(`${url}${input.value}`)
    .then((response)=>response.json())
    .then((data)=>{

        resultBox.innerHTML =  `
            <img src="${data.meals[0].strMealThumb}" alt="">
            <div class="name">
                <h1>${data.meals[0].strMeal}</h1>
                <p>${data.meals[0].strArea}</p>
            </div>
            <ul id="ingredient-items">

            </ul>
            <button id="view-recipe-btn">View Recipe</button>
        `;

        const ingredientUnorderList = document.getElementById("ingredient-items");
        const ingredientitems = data.meals[0];

        ingredientLists(ingredientitems, ingredientUnorderList);


        const viewRecipeBtn = document.getElementById("view-recipe-btn");
        viewRecipe(viewRecipeBtn);

        recipeBox.innerHTML =  `
            <button id="cross-btn"><i class="fa-solid fa-xmark"></i></button>
            <pre>${data.meals[0].strInstructions}</pre>
        `;

        const crossBtn = document.getElementById("cross-btn");
        crossDetails(crossBtn);

    }).catch(()=>{
        if(input.value.length == 0){
            resultBox.innerHTML =  `
                <h3 id="error">Input Field Cannot Be Empty</h3>
            `;
        }else{
            resultBox.innerHTML = `
                <h3 id="error"> Invalid Input </h3>
            `;
        }
    });
})

const ingredientLists = (ingredientitems,ingredientUnorderList)=>{
    count = 1;
    let ingredients = [];
    for(let item in ingredientitems){
        var ingredient = "";
        var measure = "";
        if(item.startsWith("strIngredient") && !ingredientitems[item].length == 0){
            ingredient = ingredientitems[item];

            measure = ingredientitems['strMeasure'+ count];
            count++;

            ingredients.push(`${measure} ${ingredient}`);
        }
    }

    ingredients.forEach((element)=>{
        let list = document.createElement("li");
        list.innerHTML = `${element}`;
        ingredientUnorderList.appendChild(list);
    })
}

const viewRecipe = (viewRecipeBtn)=>{
    viewRecipeBtn.addEventListener("click", ()=>{
        container.style.display = "none";
        recipeBox.style.display = "block";
    })
}

const crossDetails =(crossBtn)=>{
    crossBtn.addEventListener("click", ()=>{
        container.style.display = "block";
        recipeBox.style.display = "none";
    })
}

