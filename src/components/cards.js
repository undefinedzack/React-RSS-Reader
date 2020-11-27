import React, {useState, useEffect} from 'react'

var htmlObject

const Card = ({ item }) => {


    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        htmlObject = document.createElement('div')
        htmlObject.innerHTML = item.content
        setIsLoaded(true)
        // console.log('htmlobj',htmlObject)
    },[])


    return(
        <>
            <div className="card mb-3 mt-4">
                <div className="card-body">
                    <h2 className="card-title">{item.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                    <a href={item.link}> Read more! </a>
                    <p className="card-text"><small className="text-muted">{new Date(item.isoDate).toDateString() }</small></p>
                </div>
            </div>
        </>
    )
}

export default Card
