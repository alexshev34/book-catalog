import React, { useEffect, useState } from 'react'
import firebase from '../../firebase';
import {Link, useHistory} from 'react-router-dom';
const MainPage = () => {

    const [books1, setBooks] = useState([])
    let history = useHistory();

    const ref = firebase.firestore().collection('books1');

    const getBooksList = () => {
        ref.onSnapshot((querySnapshot)=> {
            const list = [];
            querySnapshot.forEach((doc)=>{
                list.push(doc.data());
            });
            setBooks(list)
        })
    };

    const deleteBook = (id) => {
        ref
            .doc(id)
            .delete()
            .catch((err) =>{
                console.error(err);
            })
    }

    const editBook = (id) => {
        history.push('/editbook/' + id)
    }



    useEffect(() => {
        getBooksList();
    }, [])

    console.log(books1)


    // function sort(){
    //     for(let i = 0; i < books1.length; i++){
    //         books1[i].Year = Number(books1[i].Year)
    //     }
    //     books1.sort((a, b) => a.Year > b.Year ? 1 : -1);
    // }
    // sort()

    

    // function unique() {
    //     let result = [];
      
    //     for (let str of year) {
    //       if (!result.includes(str)) {
    //         result.push(str);
    //       }
    //     }
    //     console.log(result)
    //     return result;
    //   }
      
    //   unique()



    return(
        <>
        <div>
            {books1.map((c) =>(
                <div>
                    <p>Год: </p>
                    <div key={c.id}>
                        <h5>{c.Name}</h5>
                        <p>Автор: {c.Author}</p>
                        <p>Год публикации: {c.Year}</p>
                        <p>Рейтинг: {c.Raiting}</p>
                        <p>ISBN: {c.ISBN}</p>
                        <button onClick={() => deleteBook(c.id)}>Удалить</button>
                        <button onClick={() => editBook(c.id)}>Изменить</button>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}

export default MainPage;
