import {API_URL} from "./constanta.js"


class API{
    async fetchCategories () {
        try{
            const response = await fetch(`${API_URL}/api/category`)
            if(response.status === 200 || response.status === 201){
                const categories = await response.json()
                return categories
            }
            else{
                const error = await response.json()
                return error
            }
            
        }
        catch(error){
            return error
        }
    }
    async fetchCards (id) {
        try{
            const response = await fetch(`${API_URL}/api/category/${id}`)
            if(response.status === 200 || response.status === 201){
                const cards = await response.json()
                return cards
            }
            else{
                const error = await response.json()
                return error
            }
            
        }
        catch(error){
            return error
        }
    }
    async fetchEditCategory(id, data){
        try{
            const response = await fetch(`${API_URL}/api/category/${id}`,{
                method:'PATCH',
                body:JSON.stringify(data)
            })
            if(response.status === 200 || response.status === 201){
                const categories = await response.json()
                return categories
            }
            else{
                const error = await response.json()
                return error
            }
            
        }
        catch(error){
            return error
        }
    }
    async fetchCreateCategory(data){
        try{
            const response = await fetch(`${API_URL}/api/category`,{
                method:'POST',
                body:JSON.stringify(data)
            })
            if(response.status === 200 || response.status === 201){
                const categories = await response.json()
                return categories
            }
            else{
                const error = await response.json()
                return error
            }
            
        }
        catch(error){
            return error
        }
    }
    async fetchDeleteCategory(id){
        try{
            const response = await fetch(`${API_URL}/api/category/${id}`,{
                method:'DELETE'
            })
            if(response.status === 200 || response.status === 201){
                const categories = await response.json()
                return categories
            }
            else{
                const error = await response.json()
                return error
            }
            
        }
        catch(error){
            return error
        }
    }
}

const API_component = new API()
export {API_component}