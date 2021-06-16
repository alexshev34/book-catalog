import React, { useEffect, useState } from 'react'
import firebase from '../../firebase'
import './EditBook.css'


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

            alert("Изменения успешно внесены")
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
        <section className="edit">
            <div className="container">
                <form className="edit__form" onSubmit={handleSubmit}>
                    <label>Название книги</label><br/>
                    <input className="edit__input" type="text" maxLength="100" onChange={(e) => handleChange('Name', e.target.value)} value={books1.Name} required/><br/>
                    <label>Автор</label><br/>
                    <input className="edit__input" type="text" onChange={(e) => handleChange('Author', e.target.value)} value={books1.Author} required/><br/>
                    <label>Год публикации</label><br/>
                    <input className="edit__input" type="number" min="1800" onChange={(e) => handleChange('Year', e.target.value)} value={books1.Year} /><br/>
                    <label>Рейтинг</label><br/>
                    <input className="edit__input" type="number" min="0" max="10" onChange={(e) => handleChange('Raiting', e.target.value)} value={books1.Raiting} /><br/>
                    <label>ISBN</label><br/>
                    <input className="edit__input" type="text" onChange={(e) => handleChange('ISBN', e.target.value)} value={books1.ISBN} /><br/>
                    <button className="edit__btn" type="submit">Изменить</button>
                </form>
            </div>
        </section>
    )
}

export default EditBook;