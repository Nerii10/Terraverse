//Styles
import './Bestiary.css'

//Data
import NpcData from '../../data/json/npc_data/npc.json'
import SellingList from '../../data/json/id_references/selling_list.json'
import items from '../../data/json/id_references/items.json'
import TreasureBag from '../../data/json/id_references/grab_bags.json'
import TreasureBagDrops from '../../data/json/id_references/grab_bags_drops.json'
import NpcLikeData from '../../data/json/npc_data/npcLike.json'

//Framework
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Bestiary(){

    const [CurrentNpc, setCurrentNpc] = useState(0)
    const [CurrentSearch,setCurrentSearch] = useState("")
    const [CurrentFilter,setCurrentFilter] = useState("Town NPC")
    const [FilteredData, setFilteredData] = useState(NpcData)
    const [Selling, setSelling] = useState()

    useEffect(()=>{
        if(CurrentFilter == 'all') {
            setFilteredData(NpcData.filter(d => d.Name.toLowerCase().includes(CurrentSearch.toLowerCase())))
        } else {
            setFilteredData((NpcData.filter(i=>i.Type == CurrentFilter)).filter(d => d.Name.toLowerCase().includes(CurrentSearch.toLowerCase())))
        }
    },[CurrentSearch,CurrentFilter])

    useEffect(() => {
        if(CurrentNpc && CurrentNpc.Type === "Town NPC"){
            setSelling(SellingList.filter(el => (el['NPC ID'] == CurrentNpc['NPC ID'])))
        } 
    }, [CurrentNpc])

    return(
        <>
            <div className="Title">
                <h1 style={{margin:0}}>Bestiary</h1>
                <p style={{margin:0}}>Here you can find all informations about every mob</p>
            </div>

            <div className="MainContainer">
                <div className="SearchBarContainer">
                    <input type='text' value={CurrentSearch} onChange={(event)=>{setCurrentSearch(event.target.value)}} className='SearchText'></input>
                </div>

                    <br></br>

                <div className='FilterBox'>
                    <motion.input 
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}
                    type='button' className={CurrentFilter == "all" ? 'FilterButtonActive' : 'FilterButton'} value={"All"} onClick={()=>setCurrentFilter("all")}></motion.input>
                    <motion.input 
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}
                    type='button' className={CurrentFilter == "Town NPC" ? 'FilterButtonActive' : 'FilterButton'}  value={"TownNpc"} onClick={()=>setCurrentFilter("Town NPC")}></motion.input>
                    <motion.input  
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}type='button'className={CurrentFilter == "Enemy" ? 'FilterButtonActive' : 'FilterButton'}  value={"Enemy"}onClick={()=>setCurrentFilter("Enemy")}></motion.input>
                    <motion.input  
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}type='button'className={CurrentFilter == "Critter" ? 'FilterButtonActive' : 'FilterButton'}   value={"Critter"}onClick={()=>setCurrentFilter("Critter")}></motion.input>
                    <motion.input  
                    whileHover={{scale:1.05}}
                    whileTap={{scale:0.95}}type='button'className={CurrentFilter == "Boss" ? 'FilterButtonActive' : 'FilterButton'}   value={"Boss"}onClick={()=>setCurrentFilter("Boss")}></motion.input>
                </div>
                
                    <br></br>

                <div style={{width:"90%"}}>

                    <div className="Library">
                        {FilteredData?.map((npc,index)=>{
                            const NpcNameLink = (npc.Name.replace(/ /g, "_")).toLowerCase()

                            return(
                                <motion.div className={npc['NPC ID'] == CurrentNpc['NPC ID'] ? 'NpcEntryActive' : 'NpcEntry'} onClick={()=>{setCurrentNpc(npc)}}
                                whileHover={{scale:1.05}}
                                whileTap={{scale:0.95}}
                                >
                                    <div className="NpcEntryImage">
                                    <motion.img 
                                    key={NpcNameLink}
                                    animate={{opacity:1, scale:npc?.Type == "Boss" ? 0.5 : 1, y:0}}
                                    viewport={{once:false}}
                                    transition={{duration:0.5, ease:"circInOut", delay:0.02*index, type:"spring"}}
                                    initial={{opacity:0, scale:0.2,y:100}}
                                    src={`/Terraverse/img_sprites/${NpcNameLink}.png`} 
                                    onError={(e) => { e.target.src = `/Terraverse/img_sprites/${NpcNameLink}.gif` }} 
                                    alt={NpcNameLink}
                                />

                                    </div>
                                    <p style={{margin:0, textAlign:"center",width:"100%", textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:'hidden'}}>{npc.Name}</p>
                                    <p style={{margin:0, color:"rgb(151, 151, 151)"}}>{npc.Type}</p>
                                </motion.div>
                            )
                        })}

                        {FilteredData?.length == 0 && 
                        <p>No results</p>
                        }
                    </div>

                    {CurrentNpc?.Type == "Town NPC" &&
                    <>
                    <div className='SellingList'>

                       
                        
                        {NpcLikeData.filter(i => i.name === CurrentNpc.Name).map((el, index) => {
                            const preferenceOrder = ["loves", "likes", "dislikes", "hates"];
                            
                            return (
                            <div key={index} style={{width:"100%"}}>
                                <br></br>
                                {preferenceOrder.map(pref => {
                                const npcList = el.neighbours[pref] || [];
                                const biomeList = el.biomes[pref] || [];

                                // Jeśli nie ma nic do pokazania, pomiń
                                if (npcList.length === 0 && biomeList.length === 0) return null;

                                return (
                                    <div
                                    key={pref}
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "start",
                                        backgroundColor:'var(--MainAccentColor)',
                                        padding:"10px",
                                        boxSizing:"border-box",
                                        borderRadius:'5px',
                                        border: "1px var(--AccentBorder) solid",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        gap: "5px",
                                        marginBottom: "8px",
                                    }}
                                    >
                                    <p style={{ width: "60px", margin: 0 }}>
                                        {pref.charAt(0).toUpperCase() + pref.slice(1)}:
                                    </p>

                                    {/* Najpierw biomy */}
                                    {biomeList.map((biome, idx) => (
                                        <img
                                        key={`biome-${idx}`}
                                        style={{ height: "100%" }}
                                        src={`/Terraverse/biome_icons/${biome}.webp`}
                                        alt={biome}
                                        />
                                    ))}

                                    {/* Potem NPC */}
                                    {npcList.map((npc, idx) => (
                                        <img
                                        key={`npc-${idx}`}
                                        style={{ height: "32px" }}
                                        src={`/Terraverse/img_sprites/${npc.replace(/ /g, "_").toLowerCase()}.png`}
                                        alt={npc}
                                        />
                                    ))}
                                    </div>
                                );
                                })}
                            </div>
                            );
                        })}
                         {Selling?.length != 0 ?
                        <p style={{width:"100%", textAlign:"center"}}> </p>
                        :
                        <p style={{width:"100%", textAlign:"center"}}>Nothing to sell</p>

                    }

                        <div style={{width:"100%", display:'flex',flexWrap:"wrap", justifyContent:'center', alignItems:'center', gap:"5px"}}>
                        {Selling?.map((sell,index)=>{
                            const item = items.filter(i => i.ID == sell['Selling Item'])
                            return(
                                <>
                                <motion.div className='SellingItem'
                                whileHover={{scale:1.05}}
                                >
                                    <img src={`/Terraverse/img_sprites/${(item[0]?.Name?.replace(/ /g, "_"))}.png`}></img>
                                </motion.div>
                                
                                <br></br>

                                </>
                            )
                        })}
                        </div>
                        
                      

                    </div>
                    
                   
                    </>
                    }
                
                    {CurrentNpc?.Type === "Boss" && (
                        <div className="SellingList">
                            <p style={{ width: "100%", textAlign: "center" }}>
                                {CurrentNpc?.Name} drops
                            </p>

                            <div style={{width:"100%", display:'flex',flexWrap:"wrap", justifyContent:'center', alignItems:'center', gap:"10px"}}>
                            {TreasureBagDrops
                                .filter(drop => 
                                    TreasureBag.some(bag =>
                                        bag.Name.includes(CurrentNpc.Name) &&
                                        bag['Bag ID'] === drop['Bag ID']
                                    )
                                )
                                .filter(drop =>
                                    items.some(item => item.ID === drop['Drop Result'])
                                )
                                .map(drop => {
                                    const foundItem = items.find(item => item.ID === drop['Drop Result']);
                                    if(CurrentNpc.Name != 'Eye of Cthulhu'){
                                        if(foundItem.Name.includes("Mask")){
                                            return
                                        } else {
                                            return (
                                                <div
                                                    key={`${drop['Bag ID']}-${foundItem.ID}`}
                                                    className="DropEntry"
                                                >
                                                    <div className="DropImage">
                                                        <img
                                                            src={`/Terraverse/img_sprites/${foundItem.Name.replace(/ /g, "_")}.png`}
                                                            alt={foundItem.Name}
                                                        />
                                                    </div>
                                                    <div className="DropQuantity">
                                                        <span style={{ margin: 0, color: "gray" }}>
                                                            {drop.Quantity !== 1 ? drop.Quantity : 1}
                                                        </span>
                                                    </div>
                                                    <div className="DropProbability">
                                                        <span style={{ margin: 0, color: "gray" }}>
                                                            {drop.Probability}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    } else {
                                        return (
                                            <div
                                                key={`${drop['Bag ID']}-${foundItem.ID}`}
                                                className="DropEntry"
                                            >
                                                <div className="DropImage">
                                                    <img
                                                        src={`/Terraverse/img_sprites/${foundItem.Name.replace(/ /g, "_")}.png`}
                                                        alt={foundItem.Name}
                                                    />
                                                </div>
                                                <div className="DropQuantity">
                                                    <span style={{ margin: 0, color: "gray" }}>
                                                        {drop.Quantity !== 1 ? drop.Quantity : 1}
                                                    </span>
                                                </div>
                                                <div className="DropProbability">
                                                    <span style={{ margin: 0, color: "gray" }}>
                                                        {drop.Probability}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                            
                        </div>
                    )}

                </div>

                <div style={{height:"150px"}}></div>

            </div>
        </>
    )
}