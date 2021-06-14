const {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}  = require('../utils/list_helper')
const {mockBlogs} = require('./mockups')
test('dummy returns one', ()=>{
    const blogs = []
    const result = dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', ()=>{
    test('of the empty list is zero', ()=>{
        const result = totalLikes([])
        expect(result).toBe(0)
    })
    test('when list has only one blog equals the likes of that', ()=>{

        const result = totalLikes([mockBlogs[0]])
        expect(result).toBe(7)
    })

    test('of a bigger llist is calculated right', ()=>{

        const result = totalLikes(mockBlogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', ()=>{
    test('when list blog exists only one favorite blog', ()=>{
        const favorite = favoriteBlog(mockBlogs)
        const mockFavoriteBlog = {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        }
        expect(favorite).toEqual(mockFavoriteBlog)
    })
    test('when blog list is empty', ()=>{
        const favorite = favoriteBlog([])
        expect(favorite).toEqual({})
    })
    test('when blog list is undefined', ()=>{
        const favorite = favoriteBlog()
        expect(favorite).toEqual({})
    })
    test('when blog list exists only one row', ()=>{
        const favorite = favoriteBlog([mockBlogs[0]])
        const mockFavoriteBlog = {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        }
        expect(favorite).toEqual(mockFavoriteBlog)
    })

})

describe('most blogs', ()=>{
    test('when blog list exists one author has many blogs', ()=>{
        const result = mostBlogs(mockBlogs)
        const mostAuthor = { author: 'Robert C. Martin', blogs: 3 }
        expect(result).toEqual(mostAuthor)

    })
    test('when blog list is empty', ()=>{
        const result = mostBlogs([])
        const mostAuthor = { }
        expect(result).toEqual(mostAuthor)

    })
    test('when blog list is undefined', ()=>{
        const result = mostBlogs()
        const mostAuthor = { }
        expect(result).toEqual(mostAuthor)

    })
    test('when blog list exists one row', ()=>{
        const result = mostBlogs([mockBlogs[0]])
        const mostAuthor = {
            "author": "Michael Chan",
            "blogs": 1
        }
        expect(result).toEqual(mostAuthor)

    })
    test('when blog list exists two rows', ()=>{
        const result = mostBlogs([mockBlogs[0], mockBlogs[1]])
        const mostAuthor = {
            "author": "Michael Chan",
            "blogs": 1
        }
        expect(result).toEqual(mostAuthor)

    })
})

describe("most likes", ()=>{
    test("when blog list exists one author has many blogs", ()=>{
        const result = mostLikes(mockBlogs)
        const mostAuthor ={
            author: "Edsger W. Dijkstra",
            likes: 17
          }
        expect(result).toEqual(mostAuthor)
    })
    test('when blog list is empty', ()=>{
        const result = mostLikes([])
        const mostAuthor = { }
        expect(result).toEqual(mostAuthor)

    })
    test('when blog list is undefined', ()=>{
        const result = mostLikes()
        const mostAuthor = { }
        expect(result).toEqual(mostAuthor)

    })
    test('when blog list exists one row', ()=>{
        const result = mostLikes([mockBlogs[0]])
        const mostAuthor = {
            author: "Michael Chan",
            likes: 7
        }
        expect(result).toEqual(mostAuthor)

    })
    test('when blog list exists two rows', ()=>{
        const result = mostLikes([mockBlogs[0], mockBlogs[1]])
        const mostAuthor = {
            author: "Michael Chan",
            likes: 7
        }
        expect(result).toEqual(mostAuthor)

    })
})