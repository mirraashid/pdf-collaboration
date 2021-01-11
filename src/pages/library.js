import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const LibraryPage = () => {

    const [redirect, setRedirect] = useState(null)

    let history = useHistory();

    const redirectToPdf = (uId) => {
       history.push('/book/' + uId);
    }


    //redirect to relevent PDF
    if(redirect){
        return <Redirect
        to={{
        pathname: '/book/' + redirect,
        }}
        />
    }

    const books = [
        {
            shelfName: 'Section 1',
            books: [
                {name: 'book1', date: 2020, uId: 1},
                {name: 'book2', date: 2019, uId: 2},
                {name: 'book3', date: 2015, uId: 3},
                {name: 'book4', date: 2020, uId: 4},
                {name: 'book5', date: 2019, uId: 2},
                {name: 'book6', date: 2015, uId: 3},
            ]
        },
        {
            shelfName: 'Section 2',
            books: [
                {name: 'book1', date: 2020, uId: 1},
                {name: 'book2', date: 2019, uId: 2},
                {name: 'book3', date: 2015, uId: 3},
            ]
        }

    ];

    const Shelf = (props) => {
        return(
            <div className="shelfHolder">
                    <h3>{props.data.shelfName}</h3>
                    <div className="bookContainer" >
                        {props.data.books.map((book) => {
                            return (
                                <div className="bookHolder" key={Math.random(0,100)} onClick={() => redirectToPdf(book.uId)}>
                                    <img src="./book.jpg"/>
                                    {book.name + '(' + book.date + ')'}
                                </div>
                            )
                        })}
                    </div>
            </div>
        )
    }

    return(
        <div className="container centerAlign">
            {
                books.map(item => {
                   return <Shelf data={item} key={Math.random(100,500)}/>
                })
            }
        </div>
    )
}

export default LibraryPage