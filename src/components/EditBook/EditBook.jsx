import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'

const EditBook = (route) => {
    const id = route.match.params.id

    const [loading, setLoading] = useState(false)
    const [books1, setBooks] = useState({
        id: id,
        Name: '',
        Author: '',
        Year: '',
        Raiting: '',
        ISBN: '',
    })

    const ref = firebase.firestore().collection('books1');

    const handleChange = (userKey, value) => {
        setBooks({...books1, [userKey]: value})
    }

    const handleSubmit = async(e) => {
        // e.preventDefault();

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
    }

    const getBooksList = (id) => {
        ref
            .doc(id)
            .get()
            .then(function (doc){
                const d = doc.data();
                setBooks(d)
            })
            .catch(function (error){
                console.log(error)
            })
    }



    useEffect(() => {
        getBooksList(id);
    }, [])

    return(
        <form onSubmit={handleSubmit}>
            <label>Название книги</label>
            <input type="text" onChange={(e) => handleChange('Name', e.target.value)} value={books1.Name} />
            <label>Автор</label>
            <input type="text" onChange={(e) => handleChange('Author', e.target.value)} value={books1.Author} />
            <label>Год публикации</label>
            <input type="number" onChange={(e) => handleChange('Year', e.target.value)} value={books1.Year} />
            <label>Рейтинг</label>
            <input type="text" onChange={(e) => handleChange('Raiting', e.target.value)} value={books1.raiting} />
            <label>ISBN</label>
            <input type="text" onChange={(e) => handleChange('ISBN', e.target.value)} value={books1.ISBN} />
            <button type="submit">Изменить</button>
        </form>
    )
}

export default EditBook;