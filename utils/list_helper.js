const dummy = (blogs)=>{
    return 1
}
const totalLikes = (blogs)=>{
    let sum = 0
    blogs.forEach(item =>{
        const {likes} = item
        
        sum += likes
    })
    return sum
}
const favoriteBlog = (blogs)=>{
    if(typeof blogs === "undefined")
        return {}
    if(blogs.length === 0)
        return {}
    
    const favorite = blogs.reduce((favorite, item)=>{
        if(favorite.likes < item.likes){
            return item
        } 
        return favorite
    })
    return favorite
}
const mostBlogs = (blogs)=>{
    if(typeof blogs === "undefined"){
        return {}
    } 
    if(blogs.length === 0){
        return {}
    } 
    const authorBlogs ={}
    blogs.forEach((item)=>{
        const {author} = item
        if ( typeof  authorBlogs[author] === "undefined"){
            authorBlogs[author] = { author:author, blogs:1}
        }else{
            authorBlogs[author].blogs += 1
        }
    })
    const authorList = Object.values(authorBlogs)
    const result = authorList.reduce((mostAuthor, author )=>{
        if(mostAuthor.blogs < author.blogs)
            return author
        else
            return mostAuthor
    })
    
    return result

}
const mostLikes = (blogs)=>{
    if(typeof blogs === "undefined"){
        return {}
    } 
    if(blogs.length === 0){
        return {}
    } 
    const authorLikes = {}
    blogs.forEach((item)=>{
        const {author, likes} = item
        if(typeof authorLikes[author] ==="undefined"){
            authorLikes[author] = {author, likes}
        }else{
            authorLikes[author].likes += likes
        }
    })
    const likesList = Object.values(authorLikes)
    const result = likesList.reduce((authorLikes, author)=>{
        if(authorLikes.likes < author.likes){
            return author
        }else{
            return authorLikes
        }

    })
    return result
}
module.exports ={
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
