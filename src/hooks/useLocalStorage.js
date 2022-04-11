import { useEffect, useState } from 'react'

const PREFIX='codepen-clone'    //to prefix the key with the prefix value eg.codepen-clone so that when we're working on localhost 3000 which probably have tons of local storage variables stored in it'll be easy to see which one are corresponsind with your exact application.

function useLocalStorage(key,initialValue) {
    const prefixedKey=PREFIX + key

    const [value,setValue]=useState(()=>{       //getting the value
        const jsonValue=localStorage.getItem(prefixedKey)
        if(jsonValue !=null) return JSON.parse(jsonValue)
        if(typeof initialValue==='function'){
            return initialValue()
        }
        else{
            return initialValue
        }
    })

    useEffect(()=>{     //saving a value on local storage everytime we update it
        localStorage.setItem(prefixedKey,JSON.stringify(value))
    },[prefixedKey,value])

    return [value,setValue]
}

export default useLocalStorage
