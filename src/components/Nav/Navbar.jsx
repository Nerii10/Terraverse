import './Navbar.css'
import { useState,useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar({setCurrentPage}){


    const [CurrentTab, SetCurrentTab] = useState("Home")

    const Navinputs = [
        {
            name: "Home",
        },
        {
            name: "Bestiary",
        },
        {
            name: "Items"
        },
        {
            name: "Biomes"
        },
        {
            name: "Wordle"
        },
    ]

    return(
        <>
            <div style={{height:"80px"}}>

            </div>
            <div className='NavbarConainer'>

                <div className='NavbarConainerLeft'>

                    <img src='/Terraverse/icon.png' className='NavbarIcon'></img>

                </div>
            
                <div className='NavbarConainerRight'>

                    {Navinputs.map((input,index)=>{{
                        return(
                            <>
                                <motion.div onClick={()=>{SetCurrentTab(input.name); setCurrentPage(input.name)}} className='NavbarInput'>
                                    <p className={CurrentTab == input.name ? 'NavbarInputTextActive' : 'NavbarInputTextInactive'}>{input.name}</p>
                                    <div className={CurrentTab == input.name ? 'NavbarSelectionActive' : 'NavbarSelectionInactive'}></div>
                                    <div className={CurrentTab == input.name ? 'NavbarSelectionBackgroundActive' : 'NavbarSelectionBackgroundInactive' }></div>
                                </motion.div>
                            </>
                        )
                    }})}
                
                </div>

            </div>
        </>
    )
}