import { PostModel } from "../../database/models";

interface PostQuery {
    fileUrl?: string;
    content?: string;
    
}

class PostService {
    static async createPost(payload: PostQuery){
        const post = await PostModel.create(payload);
        return post;
    }
    static async delete(postId: any){
        const post = await PostModel.findByIdAndDelete(postId);
        return post;
    }

    static async updatePost(postId: any, payload: PostQuery){
        const post = await PostModel.findByIdAndUpdate(postId, payload);
        return post;
    }
}

export default PostService;