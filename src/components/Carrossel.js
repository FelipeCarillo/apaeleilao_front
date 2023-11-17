import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Carrossel({data}) {
    const carousel = useRef()
    const [width, setWidth] = useState(0)

    useEffect(() => {
        // console.log(carousel.current?.scrollWidth, carousel.current?.offsetWidth)
        setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
    }, [])

    return (
        <div className="w-full mx-auto my-0 max-w-[900px] lg:max-w-[1200px] flex items-center justify-center">
            <motion.div ref={carousel} className='cursor-grab overflow-hidden' whileTap={{cursor: 'grabbing'}}>
                <motion.div className='flex gap-4' drag="x"  dragConstraints={{right: 0, left: -width}} initial={{x: 100}} animate={{x: 0}} transition={{ duration: 0.8}}>
                    {data.map(data => (
                        <motion.div key={data.nome} className={`border-2 text-black min-w-[250px] text-center bg-white rounded-2xl`}>
                        {/* Conteúdo do card */}
                        <img className="rounded-t-2xl shadow-lg mb-4 max-w-auto max-h-[250px]" src={data.img} alt={data.descImg}/>
                        <div className="px-2">
                            <h2 className="text-2xl">{data.nome}</h2>
                            <p className="font-bold text-xl">R${data.lance}</p>
                            <div>
                                <p>Abre:{data.date} - {data.timeStart}</p>
                                <p>Encerra:{data.date} - {data.timeEnd}</p>
                            </div>
                        </div>
                    </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    )
}