using Back_End_Service.Identity.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Back_End_Service.Identity.Context;

public class DataContext : IdentityDbContext<User>
{
    public DbSet<Friend> Friend { get; set; }

    public DbSet<Message> Message { get; set; }

    public DbSet<ChatRoom> ChatRoom { get; set; }

    public DbSet<Posts> Post { get; set; }

    public DbSet<PostLike> PostLike { get; set; }

    public DbSet<Comment> Comment { get; set; }
    
    public DbSet<CommentLike> CommentLike { get; set; }

    public DbSet<Repost> Repost { get; set; }

    public DbSet<Photo> Photo { get; set; }

    public DbSet<Video> Video { get; set; }

    public DbSet<Audio> Audio { get; set; }


    public DataContext(DbContextOptions<DataContext> options) :
        base(options)
    {
    }


    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);


        builder.Entity<Friend>(b =>
        {
            b.HasKey(x => new { x.UserId, x.UserFriendId });

            b.HasOne(x => x.User)
                .WithMany(x => x.Friends)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            b.HasOne(x => x.UserFriend)
                .WithMany(x => x.FriendsOf)
                .HasForeignKey(x => x.UserFriendId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        builder.Entity<Message>()
            .HasOne<User>(m => m.Sender)
            .WithMany(u => u.SentMessages)
            .HasForeignKey(m => m.SenderId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Message>()
            .HasOne<User>(m => m.Receiver)
            .WithMany(u => u.ReceivedMessages)
            .HasForeignKey(m => m.ReceiverId)
            .OnDelete(DeleteBehavior.Restrict);
        
    }
}