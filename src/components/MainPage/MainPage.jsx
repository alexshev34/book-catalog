import React, { useEffect, useState, useMemo } from 'react'
import firebase from '../../firebase';
import {Link, useHistory} from 'react-router-dom';
const MainPage = () => {

    const [books1, setBooks] = useState([])
    const [loading, setLoading] = useState(false) //задержка на прогрузку данных
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
        setTimeout(() =>{
          setLoading(true)
        }, 2000)
    }, [])

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


const reccomendation = () => {
  //находим книги изданные не менее 3 лет назад и добавляем в массив рекомендаций
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
  
  let maxNumber = Math.max.apply(null, new_raiting); //берем максимальное число из рейтинга

  //зная максимальное число находим книги с нашим максимальным рейтингом
  for(let i = 0; i < recommendation_array.length; i++){
    for(let j = 0; j < recommendation_array[i].length; j++){
      if(recommendation_array[i][j].Raiting == maxNumber){
        best_book.push(recommendation_array[i][j])
      }
    }
  }
console.log(best_book)
  //делаем проверку на то сколько книг в массиве, и есть ли книги с одинаковым рейтингом
  if(best_book.length > 1){
    let number = Math.floor(Math.random() * best_book.length);
    recommendation_book = best_book[number]
  }
  else{
    recommendation_book = best_book[0]
  }
}

reccomendation()

    const elements = useMemo(() => {
      const grouppedElements = [];
      for (const key in list_copy.books_copy) {
        const booksGroup = list_copy.books_copy[key];
        const group = (
          <div>
            <span>Год: {year[key] == '0' ? 'Not defined' : year[key]}</span>
            {booksGroup.map(book => (
              <div key={book.id}>
              <div>
                  <h5>{book.Name}</h5>
                  <p>Автор: {book.Author}</p>
                  <p>Год публикации: {book.Year == '0' ? 'Не определен' : book.Year}</p>
                  <p>Рейтинг: {book.Raiting}</p>
                  <p>ISBN: {book.ISBN}</p>
                  <button onClick={() => deleteBook(book.id)}>Удалить</button>
                  <button onClick={() => editBook(book.id)}>Изменить</button>
              </div>
          </div>
            ))}
            <br />
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
      <div className="">Рекомендуемая книга: </div>
      <div>
          <h5>{recommendation_book.Name}</h5>
          <p>Автор: {recommendation_book.Author}</p>
          <p>Год публикации: {recommendation_book.Year == '0' ? 'Не определен' : recommendation_book.Year}</p>
          <p>Рейтинг: {recommendation_book.Raiting}</p>
          <p>ISBN: {recommendation_book.ISBN}</p>
      </div>
      {elements}
    </div>
    : <div>Loading...</div>
}
    </>
  )
}

export default MainPage;
