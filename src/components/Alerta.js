export default function Alerta({...props}) {
    return (
        <div className={`flex flex-col justify-center w-full h-24 p-4 fixed top-0 z-10 ${props.statusCode !== '200' ? 'bg-red-500' : 'bg-green-500'}  ${props.statusCode === '' ? 'hidden' : 'block'}`}>
            <div className='flex justify-start items-center gap-4'>
                <i className="fa-solid fa-circle-exclamation text-4xl"></i>
                <p className="text-xl">{props.message}</p>
            </div>
        </div>
    )
}