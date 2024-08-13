import { useState } from 'react'
import './NavBar.css'



export default function NavBar() {
    return (
        <>
        <div className='bar'>
            <h1 className='Title'>NaviGator</h1>
            <form >
                <label className='options'>Dijstrka Algorithim <input type='radio' name='algo' required/></label>
                <label className='options'>A* Algorithim <input type='radio' name='algo'/></label>
                <label className='options'>Animate<input type='radio' name='animate'/></label>
            </form>
        </div>
        </>
    )
}