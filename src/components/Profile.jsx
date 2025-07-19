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
        <a href='/public/kka.pdf' download={'kka_resume.pdf'}>скачать резюме hh</a>
    </div>
  )
}

export default Profile
