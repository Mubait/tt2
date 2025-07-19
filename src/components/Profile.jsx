import { useState } from 'react'

function Profile() {
  const [firstName] = useState('Кирилл')
  const [middleName] = useState('Алексеевич')
  const [lastName] = useState('Кузьмин')

  return (
    <div className='profile'>
        <h3>
            {lastName} {firstName} {middleName}
        </h3>
    </div>
  )
}

export default Profile
