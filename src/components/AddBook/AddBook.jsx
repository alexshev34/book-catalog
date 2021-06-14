import React, {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import firebase from '../../firebase'

const AddBook = () => {
    const [books1, setBooks] = useState({
        id: uuidv4(),
        Name: '',
        Author: '',
        Year: '',
        Raiting: '',
        ISBN: '',
    })

    const [authorError, setAuthorError] = useState('Поле не может быть пустым')

    const ref = firebase.firestore().collection('books1');

    const handleChange = (userKey, value) => {
        setBooks({...books1, [userKey]: value})
    }

    // const handleChangeAuthor = (e) => {
        
    //     setBooks({...books1, ['Author']: e.target.value})
    // }

    const handleSubmit = async(e) => {
        e.preventDefault();

        ref
            .doc(books1.id)
            .set(books1)
            .then(()=>{
                setBooks({
                Name: '',
                Author: '',
                Year: '',
                Raiting: '',
                ISBN: ''
                })
            })
            .catch(function (error){
                console.log(error)
            })
            // setLoading(false)
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>Название книг</label>
            <input type="text" maxLength="100" onChange={(e) => handleChange('Name', e.target.value)} value={books1.Name} />
            <label>Автор</label>
            <input type="text" onChange={(e) => handleChange('Author', e.target.value)} value={books1.Author} />
            <label>Год публикации</label>
            <input type="number" onChange={(e) => handleChange('Year', e.target.value)} value={books1.Year} />
            <label>Рейтинг</label>
            <input type="text" onChange={(e) => handleChange('Raiting', e.target.value)} value={books1.Raiting} />
            <label>ISBN</label>
            <input type="text" onChange={(e) => handleChange('ISBN', e.target.value)} value={books1.ISBN} />
            <button type="submit">Добавить</button>
        </form>
    )
}

export default AddBook;