import React, {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import firebase from '../../firebase'
import './AddBook.css'

const AddBook = () => {
    const [books1, setBooks] = useState({
        id: uuidv4(),
        Name: '',
        Author: '',
        Year: '',
        Raiting: '0',
        ISBN: '',
    })

    const [authorError, setAuthorError] = useState('Поле не может быть пустым')

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
    }

    return(
        <section className="add">
            <div className="container">
                <form className="add__form" onSubmit={handleSubmit}>
                    <label>Название книги</label><br/>
                    <input className="add__input" type="text" maxLength="100" onChange={(e) => handleChange('Name', e.target.value)} value={books1.Name} required/><br/>
                    <label>Автор</label><br/>
                    <input className="add__input" type="text" onChange={(e) => handleChange('Author', e.target.value)} value={books1.Author} required/><br/>
                    <label>Год публикации</label><br/>
                    <input className="add__input" type="number" min="1800" onChange={(e) => handleChange('Year', e.target.value)} value={books1.Year} /><br/>
                    <label>Рейтинг</label><br/>
                    <input className="add__input" type="number" min="0" max="10" onChange={(e) => handleChange('Raiting', e.target.value)} value={books1.Raiting} /><br/>
                    <label>ISBN</label><br/>
                    <input className="add__input" type="text" onChange={(e) => handleChange('ISBN', e.target.value)} value={books1.ISBN} /><br/>
                    <button className="add__btn" type="submit">Добавить</button>
                </form>
            </div>
        </section>
    )
}

export default AddBook;