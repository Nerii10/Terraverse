//Icons
import { Search } from "lucide-react"

//Frameworks
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

//Data
import Weapons from '../../data/json/items_data/items_weapon.json'
import Tools from '../../data/json/items_data/items_tool.json'

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

    //Utils

    const [CurrentFilter, setCurrentFilter] = useState(Filters[0]);
    const [CurrentSearch, setCurrentSearch] = useState("");
    const [CurrentPick, setCurrentPick] = useState("")

    //Data

    const [FilteredWeapons, setFilteredWeapons] = useState(Weapons)
    const [FilteredTools, setFilteredTools] = useState(Tools)

    useEffect(()=>{
        setFilteredWeapons(Weapons.filter(w => w.Name.toLowerCase().includes(CurrentSearch.toLowerCase())))
    },[CurrentSearch])

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

                {/* Info */}
                
                <br></br>

                <div className="Library">

                    {/* Weapons */}
                        {CurrentFilter.category === "Weapons" &&
                            FilteredWeapons?.map((Weapon,index)=>{
                                    return(
                                        <>  
                                            <motion.div 
                                            className={CurrentPick === Weapon ? "ItemEntryActive" : "ItemEntry"}
                                            onClick={()=>{setCurrentPick(Weapon)}}
                                            whileTap={{scale:0.9}}
                                            whileHover={{scale:1.1}}
                                            >
                                                <img className="ItemEntryImage" src={`/Terraverse/img_sprites/${Weapon.Name.replace(/ /g, "_")}.png`}></img>
                                            </motion.div>
                                        </>
                                    )
                            })
                        }

                    {/* Tools */}
                        {CurrentFilter.category === "Tools" &&
                            FilteredTools?.map((Tool,index)=>{
                                    return(
                                        <>  
                                            <motion.div 
                                            className={CurrentPick === Tool ? "ItemEntryActive" : "ItemEntry"}
                                            onClick={()=>{setCurrentPick(Tool)}}
                                            whileTap={{scale:0.9}}
                                            whileHover={{scale:1.1}}
                                            >
                                                <img className="ItemEntryImage" src={`/Terraverse/img_sprites/${Tool.Name.replace(/ /g, "_")}.png`}></img>
                                            </motion.div>
                                        </>
                                    )
                            })
                        }

                    {/* Accesories */}
                        {CurrentFilter.category === "Accessories" &&
                                FilteredTools?.map((Tool,index)=>{
                                        return(
                                            <>  
                                                <motion.div 
                                                className={CurrentPick === Tool ? "ItemEntryActive" : "ItemEntry"}
                                                onClick={()=>{setCurrentPick(Tool)}}
                                                whileTap={{scale:0.9}}
                                                whileHover={{scale:1.1}}
                                                >
                                                    <img className="ItemEntryImage" src={`/Terraverse/img_sprites/${Tool.Name.replace(/ /g, "_")}.png`}></img>
                                                </motion.div>
                                            </>
                                        )
                                })
                         }
                </div>








                
            </div>
        </>
    );
}
