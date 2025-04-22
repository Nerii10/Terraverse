//Icons
import { Search } from "lucide-react"

//Frameworks
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

//Data
import Weapons from '../../data/json/items_data/items_weapon.json'

//Styles
import './Items.css'

export default function Items() {

    const Filters = [
        { category: "Tools", subcategories: ["Axe", "Pickaxe", "Hammer"] },
        { category: "Weapons", subcategories: ["Ranged", "Melee", "Magic", "Summon"] },
        { category: "Accessories", subcategories: [] },
        { category: "Potions", subcategories: [] },
        { category: "Armors", subcategories: [] },
        { category: "Ammo", subcategories: [] },
        { category: "Food", subcategories: [] }
    ];

    const [CurrentFilter, setCurrentFilter] = useState(Filters[0]);
    const [CurrentSubcategory, setCurrentSubcategory] = useState("");
    const [CurrentSearch, setCurrentSearch] = useState("");
    const [CurrentPick, setCurrentPick] = useState("")

    function Library({Type}){
        //Weapons
        if(Type == "Weapons") {
            const FilteredWeapons = Weapons;
            return(
            <>
                <div className="Library">
                    
                    {FilteredWeapons?.map((Weapon,index)=>{
                        return(
                            <>  
                                <motion.div 
                                className={CurrentPick == Weapon ? "ItemEntryActive" : "ItemEntry"}
                                onClick={()=>{setCurrentPick(Weapon)}}
                                whileTap={{scale:0.9}}
                                whileHover={{scale:1.1}}
                                >
                                    <img className="ItemEntryImage" src={`/Terraverse/img_sprites/${Weapon.Name.replace(/ /g, "_")}.png`}></img>
                                </motion.div>
                            </>
                        )
                    })}

                </div>
            </>
            )
        }
        //Tools
        if(Type == "Tools"){
        return(
            <>
                <div className="Library">
                        
                    <p>wi</p>
    
                </div>
            </>
        )
        }
    }

    useEffect(() => {
        if (CurrentFilter.subcategories.length > 0) {
            setCurrentSubcategory("");
        } else {
            setCurrentSubcategory(""); 
        }
    }, [CurrentFilter]);

    return (
        <>
            <div className="Title">
                <h1 style={{ margin: 0 }}>Items</h1>
                <p style={{ margin: 0 }}>Here you can find all informations about every item</p>
            </div>

            <div className="Controlls">
                <div className="SearchBarContainer">
                    <Search className='SearchTextIcon' stroke='rgb(153, 153, 153)' />
                    <input
                        type='text'
                        value={CurrentSearch}
                        onChange={(event) => setCurrentSearch(event.target.value)}
                        className='SearchText'
                    />
                </div>
            </div>

            <div className="MainContainer">
                <br />

                <div className='FilterBox'>
                    {Filters.map((filter, index) => (
                        <motion.input
                            key={filter.category}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type='button'
                            className={filter.category === CurrentFilter.category ? 'FilterButtonActive' : 'FilterButton'}
                            value={filter.category}
                            onClick={() => setCurrentFilter(filter)}
                        />
                    ))}
                </div>

                <br />

                {CurrentFilter.subcategories.length !== 0 && (
                    <div className='FilterBox'>
                        {CurrentFilter.subcategories.map((category, index) => (
                            <motion.input
                                key={category}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type='button'
                                className={category === CurrentSubcategory ? 'FilterButtonActive' : 'FilterButton'}
                                value={category}
                                onClick={() => setCurrentSubcategory(category)}
                            />
                        ))}
                    </div>
                )}

                {/* Info */}
                
                <br></br>

                <Library Type={CurrentFilter.category}/>


            </div>
        </>
    );
}
