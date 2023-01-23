import Post from '../model/post.js'

export const createPost = async(request,response)=>{
    try {
        const post = await new Post(request.body)
        post.save();
        return response.status(200).json('Post Saved Successfully')
    } catch (error) {
        return response.status(500).json(error, "Error")
    }

}
export default createPost
