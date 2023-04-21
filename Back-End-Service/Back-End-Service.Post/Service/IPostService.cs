public interface IPostService
{
    Task<Posts> CreatePost(CreatePostModel model);

    Task RepostPost(RepostPostModel model);

    Task DeletePost(DeletePostModel model);

    Task EditPost(EditPostModel model);

    Task GetPost(GetPostModel model);

    Task GetPosts(GetPostModel model);

    Task GetPostsByUser(GetPostsByUserModel model);

    Task AddLike(AddLikeModel model);

    Task RemoveLike(RemoveLikeModel model);

    Task AddComment(AddCommentModel model);

    Task RemoveComment(RemoveCommentModel model);

    Task EditComment(EditCommentModel model);

    Task GetComments(GetCommentsModel model);

    Task GetLikes(GetLikesModel model);

    Task GetLikesByUser(GetLikesByUserModel model);

    Task GetCommentsByUser(GetCommentsByUserModel model);
    
    Task GetReposts(GetRepostsModel model);
    
}