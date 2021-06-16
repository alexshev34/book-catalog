import React, { useEffect, useState, useMemo } from 'react'
import firebase from '../../firebase';
import {Link, useHistory} from 'react-router-dom';
import './MainPage.css'

const MainPage = () => {

    const [books1, setBooks] = useState([])
    const [loading, setLoading] = useState(false) //задержка на прогрузку данных
    let history = useHistory();

    const ref = firebase.firestore().collection('books1');

    const getBooksList = () => {
        ref.onSnapshot((querySnapshot)=> {
            setBooks(
              querySnapshot.docs.map((doc) =>({
                id: doc.id,
                Name: doc.data().Name,
                Author: doc.data().Author,
                Year: doc.data().Year,
                Raiting: doc.data().Raiting,
                ISBN: doc.data().ISBN
              }))
            )
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
        setTimeout(() =>{
          setLoading(true)
        }, 2000)
    }, [])

    //основа под выгрузку данных списка книг
    let list_copy = {
        books_copy:{
    
        }
    }


    let year = [] //массив под года

    let best_book = [] //массив по лучшие книги
    let recommendation_book; //под рекомендованную книгу
 
    //сортируем года по убыванию
  function sort(){
    for(let i = 0; i < books1.length; i++){
        books1[i].Year = Number(books1[i].Year)
    }
    books1.sort((a, b) => b.Year - a.Year);
  }

sort()
//заносим уникальные года и сортируем их в порядке на увеличение
  function year_array(){
    for(let i = 0; i < books1.length; i++){
      year.push(books1[i].Year)
    }
    year = year.filter((item, index) => year.indexOf(item) === index) //удаляем дубликаты
  }
year_array()

//добавяем массив с годами
  function sort_year(){
    for(let i = 0; i < year.length; i++){
      list_copy.books_copy[i] = [] //создаем пустой массив под каждый год
  }

//сортируем книги по годам
  for(let i = 0; i < year.length; i++){
    for(let j = 0; j < books1.length; j++){
      if(books1[j].Year == year[i]){
        list_copy.books_copy[i].push(books1[j])
      }
    }
  }
}

sort_year()


//сортировка по имени

  function sort_name(){
    for(let j = 0; j < Object.keys(list_copy.books_copy).length; j++){
      list_copy.books_copy[j].sort((a, b) => a.Name.localeCompare(b.Name));
    }
  }
sort_name()

  //находим книги изданные не менее 3 лет назад и добавляем в массив рекомендаций
  const reccomendation = () => {

    let date = new Date().getFullYear()

    let recommendation_array = []
      for(let i = 0; i < year.length; i++){
        if(year[i] < date - 3 && year[i] != 0){
          recommendation_array.push(list_copy.books_copy[i])
        }
      }

    // создаем новый массив под рейтинг 
    let new_raiting = []
      for(let i = 0; i < recommendation_array.length; i++){
        for(let j = 0; j < recommendation_array[i].length; j++){
          new_raiting.push(recommendation_array[i][j].Raiting);
        }
      }
    

    if(new_raiting.length === 0){
      recommendation_book = "На данный момент нет подходящих книг"
    }
    else{
      let maxNumber = Math.max.apply(null, new_raiting); //берем максимальное число из рейтинга
    //зная максимальное число находим книги с нашим максимальным рейтингом
      for(let i = 0; i < recommendation_array.length; i++){
        for(let j = 0; j < recommendation_array[i].length; j++){
          if(recommendation_array[i][j].Raiting == maxNumber){
            best_book.push(recommendation_array[i][j])
          }
        }
      }

    //делаем проверку на то сколько книг в массиве, и есть ли книги с одинаковым рейтингом
    if(best_book.length > 1){
      let number = Math.floor(Math.random() * best_book.length);
      recommendation_book = best_book[number]
    }
    else{
      recommendation_book = best_book[0]
    }
  }
}

reccomendation()


    const elements = useMemo(() => {
      const grouppedElements = [];
      for (const key in list_copy.books_copy) {
        const booksGroup = list_copy.books_copy[key];
        const group = (
          <div className="books">
              <div className="container">
                <p className="books__title">{`${year[key] == '0' ? 'Книги без указания года' :  'Год: ' + year[key]}`}</p>
                {booksGroup.map(book => (
                  <div key={book.id}>
                    <div className="books__list">
                        <h5 className="books__info">{book.Name}</h5>
                        <p className="books__info">Автор: {book.Author}</p>
                        <p className="books__info">Год публикации: {book.Year == '0' ? '-' : book.Year}</p>
                        <p className="books__info">Рейтинг: {book.Raiting}</p>
                        <p className="books__info">ISBN: {book.ISBN.length == '0' ? '-' : book.ISBN}</p>
                        <button className="books__delete" onClick={() => deleteBook(book.id)}>Удалить</button>
                        <button className="books__edit" onClick={() => editBook(book.id)}>Изменить</button>
                    </div>
                  </div>
                ))}
                <br />
              </div>
          </div>
        );
        grouppedElements.push(group)
    }
    return grouppedElements;
  }, [books1]);

  return(
    <>
    {loading ?
    <div>
      <div className="books">
        <div className="container">
          <div className="books__wrapper">
            <Link className="books__link" to="/addbook">Добавить книгу</Link>
          </div>
          {recommendation_book == 'На данный момент нет подходящих книг' ? 
            <p className="books__title">Рекомендации: {recommendation_book}</p>
            :
            <>
              <p className="books__title">Рекомендуемая книга: </p>
              <div className="books__recommendation">
                  <h5 className="books__info">{recommendation_book.Name}</h5>
                  <p className="books__info">Автор: {recommendation_book.Author}</p>
                  <p className="books__info">Год публикации: {recommendation_book.Year == '0' ? 'Не определен' : recommendation_book.Year}</p>
                  <p className="books__info">Рейтинг: {recommendation_book.Raiting}</p>
                  <p className="books__info">ISBN: {recommendation_book.ISBN}</p>
              </div>
            </>
        }
        </div>
      </div>
       {elements}
    </div>
    
    : <div>Loading...</div>
}
    </>
  )
}

export default MainPage;
