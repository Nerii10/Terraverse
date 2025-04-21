import { useEffect, useState } from 'react'
import './Home.css'
import { motion } from 'framer-motion'

import { TentTree, Type } from 'lucide-react'


export default function Home() {

        const [WindowSize, setWindowSize] = useState({ width: 0, height: 0 })
        const [Scroll, setScroll] = useState(0)


        const fadeInVariant = {
            initial: {
              y: 100,
              filter:'blur(5px)',
              opacity:0
            },
            animate: {
              y: 0,
              filter:'blur(0px)',
              opacity:1
            }
          }
          
          

        useEffect(() => {
            const handleScroll = () => {
                setScroll(window.scrollY)
            }
        
            handleScroll()
        
            window.addEventListener('scroll', handleScroll)
        
            return () => {
                window.removeEventListener('scroll', handleScroll)
            }
            }, [])

        useEffect(() => {
        const handleResize = () => {
            setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
            })
        }
    
        handleResize()
    
        window.addEventListener('resize', handleResize)
    
        return () => {
            window.removeEventListener('resize', handleResize)
        }
        }, [])

        useEffect(()=>{
            console.log(Scroll)
        },[Scroll])
        if(WindowSize.width >= 700){
            return (
                <>
                    
                    <div className="HomeBackgroundLandingContainer">
                        <div className='HomeGrassTop'></div>
                    </div>

                    <motion.div className='HomeDesc'
                    style={{overflow:'hidden'}}
                    >

                        <motion.h1  
                        style={{margin:0}}
                        variants={fadeInVariant}
                        transition={{delay:0,damping:20, type:'spring'}}
                        initial="initial"
                        animate="animate"
                        viewport={{once:true}}
                        >Terraverse</motion.h1>

                        <motion.p 
                        style={{margin:0}}
                        variants={fadeInVariant}
                        transition={{delay:0.2,damping:20, type:'spring'}}
                        initial="initial"
                        animate="animate"
                        viewport={{once:true}}
                        >Your personal Terraria wiki</motion.p>
                    </motion.div>

                <div className="HomePage">
            
                    <br></br>
                    <br></br>
                    <br></br>
            
                    <section className='HomePageMain'>
            
                        <motion.section className="Section"
                        variants={fadeInVariant}
                        transition={{delay:0.4,damping:20, type:'spring'}}
                        initial="initial"
                        animate="animate"
                        viewport={{once:true}}
                        >
            
                            <div className='SectionText'>
            
                                <h2>Welcome to Terraverse!</h2>
                                <p>
                                Terraria is more than just a game – it’s a world full of mysteries, bosses, biomes, and adventures waiting to be discovered.
                                Terraverse is your personal knowledge center about this unique universe. From underground caves to floating islands, from the Copper Shortsword to Zenith – we’re here to help you learn it all.
                                </p>
            
                            </div>
            
                            <div className='SectionAnimation'>
            
                                <motion.img src='/Terraverse/img_sprites/Cursor.png'
                                style={{position:"absolute", bottom:"25px", right:"30px",zIndex:2}}
                                animate={{x:[-10, 20], y:[-10, 15]}}
                                transition={{ease:"easeInOut",repeat:Infinity, repeatType:"reverse", duration:2}}                    
                                ></motion.img>
                                <img src={'/Terraverse/img_sprites/Archaeologists_Jacket.png'}
                                style={{position:"absolute", bottom:"15px", left:"20px"}}
                                ></img>
                                <img src={'/Terraverse/img_sprites/Wooden_Sword.png'}
                                style={{position:"absolute", bottom:"25px", left:"28px"}}
                                ></img>
                                <img src={'/Terraverse/img_sprites/zombie.png'}
                                style={{position:"absolute", bottom:"15px", right:"30px"}}
                                ></img>
            
                            </div>
                            
                        </motion.section>
                        
                        <br></br>
                        <br></br>
            
                        <motion.section className="Section"
                         variants={fadeInVariant}
                         transition={{delay:0.6,damping:20, type:'spring'}}
                         initial="initial"
                         whileInView="animate"
                         viewport={{once:true}}
                        >
                            
                            <div className='SectionAnimation'>
                              
                            <img src={'/Terraverse/img_sprites/Silver_Chainmail.png'}
                                style={{position:"absolute", bottom:"15px", left:"20px"}}
                                ></img>
            
                                <img src={'/Terraverse/img_sprites/guide.png'}
                                style={{position:"absolute", bottom:"15px", left:"80px"}}
                                ></img>
                                
                                <img src={'/Terraverse/img_sprites/bird.png'}
                                style={{position:"absolute", bottom:"150px", left:"180px",zIndex:2}}
                                ></img>
            
                                <img src={'/Terraverse/icon.png'}
                                style={{position:"absolute", bottom:"10px", left:"120px", width:"150px"}}
                                ></img>
                            </div>
                            
                            <div className='SectionText'>
                            <h2>What is Terraria?</h2>
                            <p>
                            Terraria is a 2D sandbox action game where exploration, combat, crafting, and survival all come together.
                            Each world is randomly generated – with unique biomes, NPCs, dungeons, and secrets. Will you survive the night? Can you defeat the King Slime or the Moon Lord?
                            </p>
                                
                            </div>
            
                        </motion.section>
            
                        <br></br>
                        <br></br>
            
                        <motion.section className="Section"
                         variants={fadeInVariant}
                         transition={{delay:0.8,damping:20, type:'spring'}}
                         initial="initial"
                         whileInView="animate"
                         viewport={{once:true}}
                        >

                            <div className='SectionText' style={{justifyContent:"start", alignItems:'start'}}>
                                <h2 style={{textAlign:'center',width:"100%"}}>Just getting started?</h2>
                                <p>
                                New players can easily feel overwhelmed – and that’s okay! Here are the basic steps:
                                </p>
                                <p style={{display:"flex", justifyContent:'start',alignItems:'center',flexDirection:'row', gap:"20px",width:"90%"}}><img src='/Terraverse/img_sprites/Wood.png' style={{width:"30px"}}></img> Gather wood and build a shelter before nightfall.</p>
                                    <p style={{display:"flex", justifyContent:'start',alignItems:'center',flexDirection:'row', gap:"20px",width:"90%"}}><img src='/Terraverse/img_sprites/blood_zombie.png' style={{width:"30px"}}></img>Avoid monsters after dark – unless you're looking for a challenge!</p>
                                    <p style={{display:"flex", justifyContent:'start',alignItems:'center',flexDirection:'row', gap:"20px",width:"90%"}}><img src='/Terraverse/img_sprites/Adamantite_Pickaxe.png' style={{width:"30px"}}></img> Dig deeper to find ores and treasures.</p>
                                    <p style={{display:"flex", justifyContent:'start',alignItems:'center',flexDirection:'row', gap:"20px",width:"90%"}}><img src='/Terraverse/img_sprites/Suspicious_Looking_Eye.png' style={{rotate:"180deg",width:"30px"}}></img>  Get ready for your first boss – the Eye of Cthulhu never sleeps for long.</p>
                            </div>
            
                            <div className='SectionAnimation'>
                              
                              <img src={'/Terraverse/img_sprites/Silver_Chainmail.png'}
                                  style={{position:"absolute", bottom:"15px", left:"20px"}}
                                  ></img>
              
           
                                  <motion.img src={'/Terraverse/img_sprites/eye_of_cthulhu.gif'}
                                    animate={{y:[0, 40], x:[-20, -15], rotate:[-10,0]}}
                                    transition={{repeat:Infinity, repeatType:"reverse", duration:2, ease:"easeInOut"}}
                                  style={{position:"absolute", top:"30px", right:"10px", width:"150px"}}
                                  ></motion.img>
                            </div>
                        </motion.section>
            
                     
                        <br></br>
                        <br></br>
    
                        <motion.section className="HomeMechanics"
                        variants={fadeInVariant}
                        transition={{delay:1,damping:20, type:'spring'}}
                        initial="initial"
                        whileInView="animate"
                        viewport={{once:true}}
                        >
                           
                            <div className='HomeMechanicsText'>
                               <motion.img src={'/Terraverse/img_sprites/Cog.png'}
                                  style={{position:"absolute", top:"-10px", left:"-10px", width:"30px",rotateZ:`${Scroll/2}deg`}}
                                  ></motion.img>
                            <h2>Core systems in Terraria</h2>
                            <p>Terraria offers endless possibilities – here are just a few of them:</p>
                            <p style={{display:"flex", justifyContent:'start',alignItems:'center',flexDirection:'row', gap:"20px",width:"90%"}}><img src='/Terraverse/img_sprites/Iron_Anvil.png' style={{width:"30px"}}></img> over 5000 items to create!</p>
                                    <p style={{display:"flex", justifyContent:'start',alignItems:'center',flexDirection:'row', gap:"20px",width:"90%"}}><img src='/Terraverse/img_sprites/guide.png' style={{width:"30px"}}></img>  build rooms to invite merchants and allies.</p>
                                    <p style={{display:"flex", justifyContent:'start',alignItems:'center',flexDirection:'row', gap:"20px",width:"90%"}}><img src='/Terraverse/img_sprites/Soul_of_Night.png' style={{width:"30px"}}></img> after defeating the Wall of Flesh, the world becomes tougher – and more thrilling.</p>
                                    <p style={{display:"flex", justifyContent:'start',alignItems:'center',flexDirection:'row', gap:"20px",width:"90%"}}><img src='/Terraverse/img_sprites/Bloody_Tear.png' style={{width:"30px"}}></img> Blood Moons, Goblin Invasions, Solar Eclipses… be prepared!</p>
                       </div>
            
                        </motion.section>
            
            
                        <motion.section className="QuoteSection"
                         variants={fadeInVariant}
                         transition={{delay:1.2,damping:20, type:'spring'}}
                         initial="initial"
                         whileInView="animate"
                         viewport={{once:true}}
                        >
                            <blockquote>
                            <p>“You feel vibrations from deep below…”</p>
                            <cite>— Terraria</cite>
                            </blockquote>
                        </motion.section>
            
                    </section>
        
                </div>
                </>
            )
        } else {
            return (

                <div className="HomePage">
            
                    <div className="HomeBackgroundLandingContainer">
                        <div className='HomeGrassTop'></div>
                    </div>

                    <div className='HomeDesc' style={{overflow:"hidden"}}>

                        <motion.h1 
                          variants={fadeInVariant}
                          transition={{delay:0,damping:20, type:'spring'}}
                          initial="initial"
                          animate="animate"
                          viewport={{once:true}}
                        style={{margin:0}}>Terraverse</motion.h1>

                        <motion.p 
                          variants={fadeInVariant}
                          transition={{delay:0.1,damping:20, type:'spring'}}
                          initial="initial"
                          animate="animate"
                          viewport={{once:true}}
                          style={{margin:0}}>Your personal Terraria wiki</motion.p>

                    </div>

                    <br></br>
            
                    <section className='HomePageMainMobile'>

                    <br></br>
                    <br></br>

                        <motion.section className="SectionMobile"
                      variants={fadeInVariant}
                      transition={{delay:0.2,damping:20, type:'spring'}}
                      initial="initial"
                      animate="animate"
                      viewport={{once:true}}
                      >
            
                            <div className='SectionMobileText'>
            
                                <h2>Welcome to Terraverse!</h2>
                                <p>
                                Terraria is more than just a game – it’s a world full of mysteries, bosses, biomes, and adventures waiting to be discovered.
                                Terraverse is your personal knowledge center about this unique universe. From underground caves to floating islands, from the Copper Shortsword to Zenith – we’re here to help you learn it all.
                                </p>
            
                            </div>
            
                            <div className='SectionMobileAnimation'>
            
                                <motion.img src='/Terraverse/img_sprites/Cursor.png'
                                style={{position:"absolute", top:"-30px", right:"40px",zIndex:2}}
                                animate={{x:[-10, 20], y:[-10, 15]}}
                                transition={{ease:"easeInOut",repeat:Infinity, repeatType:"reverse", duration:2}}                    
                                ></motion.img>
                                <img src={'/Terraverse/img_sprites/Archaeologists_Jacket.png'}
                                style={{position:"absolute", top:"-45px", left:"20px"}}
                                ></img>
                                <img src={'/Terraverse/img_sprites/Wooden_Sword.png'}
                                style={{position:"absolute", top:"-39px", left:"28px"}}
                                ></img>
                                <img src={'/Terraverse/img_sprites/zombie.png'}
                                style={{position:"absolute", top:"-45px", right:"30px"}}
                                ></img>
            
                            </div>
                            
                        </motion.section>
                        
                        <br></br>
                        <br></br>
            
                        <motion.section className="SectionMobile"
                      variants={fadeInVariant}
                      transition={{delay:0.3,damping:20, type:'spring'}}
                      initial="initial"
                      whileInView="animate"
                      viewport={{once:true}}>
                            
                            <div className='SectionMobileText'>
                            <h2>What is Terraria?</h2>
                            <p>
                            Terraria is a 2D sandbox action game where exploration, combat, crafting, and survival all come together.
                            Each world is randomly generated – with unique biomes, NPCs, dungeons, and secrets. Will you survive the night? Can you defeat the King Slime or the Moon Lord?
                            </p>
                                
                            </div>

                            <div className='SectionMobileAnimation'>
                              
                              <img src={'/Terraverse/img_sprites/Silver_Chainmail.png'}
                                style={{position:"absolute", top:"-45px", left:"30px"}}

                                  ></img>
              
                                  <img src={'/Terraverse/img_sprites/guide.png'}
                                style={{position:"absolute", top:"-45px", left:"90px"}}

                                  ></img>
                                  
                                  <img src={'/Terraverse/img_sprites/bird.png'}
                                  style={{position:"absolute", top:"-150px", left:"220px",zIndex:2}}
                                  ></img>
              
                                  <img src={'/Terraverse/icon.png'}
                                  style={{position:"absolute", top:"-147px", left:"160px", width:"150px"}}
                                  ></img>
                              </div>
                        </motion.section>
            
                        <br></br>
                        <br></br>
            
                        <motion.section className="SectionMobile"
                          variants={fadeInVariant}
                          transition={{delay:0.4,damping:20, type:'spring'}}
                          initial="initial"
                          whileInView="animate"
                          viewport={{once:true}}>
                            
                            <div className='SectionMobileText'>
                                <h2>Just getting started?</h2>
                                <p>
                                New players can easily feel overwhelmed – and that’s okay! Here are the basic steps:
                                </p>
                                <p style={{display:"flex", justifyContent:'start',alignItems:'center',flexDirection:'row', gap:"20px",width:"90%"}}><img src='/Terraverse/img_sprites/Wood.png' style={{width:"30px"}}></img> Gather wood and build a shelter before nightfall.</p>
                                    <p style={{display:"flex", justifyContent:'start',alignItems:'center',flexDirection:'row', gap:"20px",width:"90%"}}><img src='/Terraverse/img_sprites/blood_zombie.png' style={{width:"30px"}}></img>Avoid monsters after dark – unless you're looking for a challenge!</p>
                                    <p style={{display:"flex", justifyContent:'start',alignItems:'center',flexDirection:'row', gap:"20px",width:"90%"}}><img src='/Terraverse/img_sprites/Adamantite_Pickaxe.png' style={{width:"30px"}}></img> Dig deeper to find ores and treasures.</p>
                                    <p style={{display:"flex", justifyContent:'start',alignItems:'center',flexDirection:'row', gap:"20px",width:"90%"}}><img src='/Terraverse/img_sprites/Suspicious_Looking_Eye.png' style={{rotate:"180deg",width:"30px"}}></img>  Get ready for your first boss – the Eye of Cthulhu never sleeps for long.</p>

                            </div>
            
                            <div className='SectionMobileAnimation'>
                              
                              <img src={'/Terraverse/img_sprites/Silver_Chainmail.png'}
                                  style={{position:"absolute", top:"-45px", left:"20px"}}
                                  ></img>
              
              
                                  <motion.img src={'/Terraverse/img_sprites/eye_of_cthulhu.gif'}
                                  animate={{y:[0, 20], x:[-20, -15], rotate:[15,20]}}
                                  transition={{repeat:Infinity, repeatType:"reverse", duration:2, ease:"easeInOut"}}
                                  style={{position:"absolute", top:"-200px", right:"10px", width:"150px"}}
                                  ></motion.img>
                              </div>
                        </motion.section>
            
                     
                        <br></br>
                        <br></br>
    
                        <motion.section className="HomeMechanics"
                          variants={fadeInVariant}
                          transition={{delay:0.5,damping:20, type:'spring'}}
                          initial="initial"
                          whileInView="animate"
                          viewport={{once:true}}
                          >
                           
                            <div className='HomeMechanicsText'>
                               <motion.img src={'/Terraverse/img_sprites/Cog.png'}
                                  style={{position:"absolute", top:"-10px", left:"-10px", width:"30px", rotateZ:`${Scroll/2}deg`}}
                                  ></motion.img>
                            <h2>Core systems in Terraria</h2>
                            <p>Terraria offers endless possibilities – here are just a few of them:</p>
                            <p style={{display:"flex", justifyContent:'start',alignItems:'center',flexDirection:'row', gap:"20px",width:"90%"}}><img src='/Terraverse/img_sprites/Iron_Anvil.png' style={{width:"30px"}}></img> over 5000 items to create!</p>
                                    <p style={{display:"flex", justifyContent:'start',alignItems:'center',flexDirection:'row', gap:"20px",width:"90%"}}><img src='/Terraverse/img_sprites/guide.png' style={{width:"30px"}}></img>  build rooms to invite merchants and allies.</p>
                                    <p style={{display:"flex", justifyContent:'start',alignItems:'center',flexDirection:'row', gap:"20px",width:"90%"}}><img src='/Terraverse/img_sprites/Soul_of_Night.png' style={{width:"30px"}}></img> after defeating the Wall of Flesh, the world becomes tougher – and more thrilling.</p>
                                    <p style={{display:"flex", justifyContent:'start',alignItems:'center',flexDirection:'row', gap:"20px",width:"90%"}}><img src='/Terraverse/img_sprites/Bloody_Tear.png' style={{width:"30px"}}></img> Blood Moons, Goblin Invasions, Solar Eclipses… be prepared!</p>

                            </div>
            
                        </motion.section>
            
            
                        <motion.section className="QuoteSection"
                          variants={fadeInVariant}
                          transition={{delay:0.6,damping:20, type:'spring'}}
                          initial="initial"
                          whileInView="animate"
                          viewport={{once:true}}
                          >
                            <blockquote>
                            <p>“You feel an evil presence watching you...”</p>
                            <cite>— Terraria</cite>
                            </blockquote>
                        </motion.section>
            
                    </section>
        
                </div>
            )
        }
}