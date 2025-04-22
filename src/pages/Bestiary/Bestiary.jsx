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

//Icons
import { Search } from 'lucide-react'

export default function Bestiary(){

    const [CurrentNpc, setCurrentNpc] = useState(0)
    const [CurrentSearch,setCurrentSearch] = useState("")
    const [CurrentFilter,setCurrentFilter] = useState("Town NPC")

    const [FilteredData, setFilteredData] = useState(NpcData)
    const [Selling, setSelling] = useState()
    const [Dropping, setDropping] = useState()

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
        if(CurrentNpc && CurrentNpc.Type === "Boss"){
            setDropping(
                TreasureBag
                    .filter(d => d.Name.includes(CurrentNpc.Name))[0]
                    ['Grab Bag Loot List']
                    .map((drop, index) => {
                        const TreasureDrop = TreasureBagDrops.filter(d => d['Bag Drop ID'] == drop);
                        const item = items.filter(i => i.ID === TreasureDrop[0]['Drop Result']);
                        if (item.length === 0) return;
            
                        if (!item[0].Name.includes("Mask") && !item[0].Name.includes("Coin")) {
                            return TreasureDrop[0]; 
                        }
                    })
                    .filter(Boolean) 
            );
        }
    }, [CurrentNpc])

    return(
        <>
            <div className="Title">
                <h1 style={{margin:0}}>Bestiary</h1>
                <p style={{margin:0}}>Here you can find all informations about every mob</p>
            </div>

            <div className="Controlls">
                    <div className="SearchBarContainer">
                        <Search className='SearchTextIcon' stroke='rgb(153, 153, 153)'></Search>
                        <input type='text' value={CurrentSearch} onChange={(event)=>{setCurrentSearch(event.target.value)}} className='SearchText'></input>
                    </div>
                </div>

            <div className="MainContainer">

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

                        {/* NPC SELLING */}
                        {CurrentNpc?.Type == "Town NPC" &&
                        <>
                        <div className='SellingList'>

                        
                            
                        {NpcLikeData.filter(i => i.name === CurrentNpc.Name).map((el, index) => {
                        const preferenceOrder = ["loves", "likes", "dislikes", "hates"];

                        return (
                            <div style={{ width: "100%" }} key={CurrentNpc.Name + "-container"}>
                                <br />
                                {preferenceOrder.map((pref,index) => {
                                    const npcList = el.neighbours[pref] || [];
                                    const biomeList = el.biomes[pref] || [];

                                    if (npcList.length === 0 && biomeList.length === 0) return null;

                                    return (
                                        <motion.div
                                            key={CurrentNpc.Name + "-" + pref} 
                                            initial={{ opacity: 0, y: 100, filter: "blur(2px)" }}
                                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                            transition={{ type: "spring", damping: 20, delay:0.1*index}}
                                            style={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "start",
                                                backgroundColor: 'var(--MainAccentColor)',
                                                padding: "10px",
                                                boxSizing: "border-box",
                                                borderRadius: '5px',
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

                                            {biomeList.map((biome, idx) => (
                                                <img
                                                    key={`biome-${biome}-${idx}`}
                                                    style={{ height: "100%" }}
                                                    src={`/Terraverse/biome_icons/${biome}.webp`}
                                                    alt={biome}
                                                />
                                            ))}

                                            {npcList.map((npc, idx) => (
                                                <img
                                                    key={`npc-${npc}-${idx}`}
                                                    style={{ height: "32px" }}
                                                    src={`/Terraverse/img_sprites/${npc.replace(/ /g, "_").toLowerCase()}.png`}
                                                    alt={npc}
                                                />
                                            ))}
                                        </motion.div>
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
                                    key={Selling}
                                    initial={{ opacity: 0, y: 100, filter: "blur(2px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{ type: "spring", damping: 20, delay:0.025*index +0.4}}
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
                        
                    
                        </>}

                        {/* BOSS DROPS */}
                        {CurrentNpc?.Type === "Boss" && (
                            <div className="SellingList">
                            

                                <div style={{width:"100%", display:'flex',flexWrap:"wrap", justifyContent:'center', alignItems:'center', gap:"10px"}}>
                                {Dropping?.map((drop,index)=>{
                                    const item = items.filter(i => i.ID === drop['Drop Result'])
                                    
                                    return(
                                        <>
                                            <motion.div
                                                initial={{opacity:0,scale:0.9, y:50,filter:"blur(2px)"}}
                                                animate={{opacity:1, scale:1 ,y:0,filter:"blur(0px)"}}
                                                transition={{type:"spring", damping:20, delay:0.05*index}}
                                                    key={`${drop['Bag ID']}-${item[0].ID}`}
                                                    className="DropEntry"
                                                >
                                                    <div className="DropImage">
                                                        <img
                                                            src={`/Terraverse/img_sprites/${item[0].Name.replace(/ /g, "_")}.png`}      
                                                            alt={item[0].Name}
                                                        />
                                                    </div>
                                                    <div className="DropQuantity">
                                                        <span style={{ margin: 0, color: "gray" }}>
                                                            {drop.Quantity}
                                                        </span>
                                                    </div>
                                                    <div className="DropProbability">
                                                        <span style={{ margin: 0, color: "gray" }}>
                                                            {drop.Probability}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                        </>
                                    )
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