import items_weapon from '../data/json/items_data/items_weapon.json';
import recipes from '../data/json/id_references/recipes.json';
import items from '../data/json/id_references/items.json'


import NPCData from '../data/json/id_references/npc.json'
import selling_list from '../data/json/id_references/selling_list.json'

export default function TestPage() {
  return (
    <>
      {/* <h1>Crafting Receptury:</h1>
      {items_weapon.map((item, index) => (
        <div key={index}>
          <p style={{ fontSize: "15px", fontWeight: "bold" }}>{item.Name}</p>

          {item.Sources['Crafting Recipes']?.map((recipeId, recipeIndex) => {
            const recipe = recipes.find(r => r['Craft ID'] === recipeId);

            if (!recipe) return null;
            
            
            return (

              <div key={recipeIndex} style={{ paddingLeft: "100px" }}>
                <ul>
                {recipe.Recipe?.map((ingredient, ingIndex) => {
                    const RecipeItemData = items.find(i => i.ID === ingredient['Ingredient ID'])
                return (
                    <>
                    <img src={`/Terraverse/img_sprites/${RecipeItemData?.Name?.replace(/ /g, "_")}.png`}></img>
                    {(RecipeItemData?.Name)} | {ingredient.Quantity}
                    
                    </>
                );
                })}

                </ul>
              </div>
            );
          })}
        </div>
      ))} */}

        <h2>Npcs</h2>

        {NPCData.map((element,index)=>{
            if(element.Type==="Town NPC"){
                const sellable = selling_list.filter(i => i['NPC ID'] == element['NPC ID'])
                return(
                    <>
                        {element?.Name}

                        {sellable?.map((element,index)=>{
                            const itemName = items.find(i => i.ID == element['Selling Item'])
                          
                            return(
                                <>
                                <img src={`/Terraverse/img_sprites/${(itemName?.Name)?.replace(/ /g , '_')}.png`}></img>
                                </>
                            )
                        })}

                        <hr></hr>
                    </>
                )
            }
        })}

    </>
  );
}
