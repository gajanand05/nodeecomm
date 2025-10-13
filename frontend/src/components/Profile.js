import react, { useEffect } from 'react'
import { useState } from 'react'

const Profile = () => {
    const auth = localStorage.getItem('user')
    console.log(auth.name);
    return (
        <div className='re-container'>

            <div class="profile-contents">
                <div className='profile-image-content'>
                    <img src="/user.jpg" className='profile-image' />
                </div>

                <div className='profile-content-data'>
                    <h2>{JSON.parse(auth).name}</h2>
                    <h2>{JSON.parse(auth).email}</h2>
                </div>
            </div>

        </div>
    )
}
export default Profile;