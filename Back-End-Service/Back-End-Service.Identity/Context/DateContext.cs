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

    public DbSet<FriendRequest> FriendRequest { get; set; }


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

        builder.Entity<PostLike>()
            .HasOne(pl => pl.User)
            .WithMany(u => u.PostLikes)
            .HasForeignKey(pl => pl.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<Comment>()
            .HasOne(c => c.Posts)
            .WithMany(p => p.Comments)
            .HasForeignKey(c => c.PostId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<Comment>()
            .HasOne(c => c.User)
            .WithMany(u => u.Comments)
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<CommentLike>()
            .HasOne(cl => cl.Comment)
            .WithMany(c => c.Likes)
            .HasForeignKey(cl => cl.CommentId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<CommentLike>()
            .HasOne(cl => cl.User)
            .WithMany(u => u.CommentLikes)
            .HasForeignKey(cl => cl.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<Repost>()
            .HasOne(r => r.User)
            .WithMany(u => u.Reposts)
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        // аватарка у юзера может быть null 

        builder.Entity<User>()
            .Property(u => u.Avatar)
            .IsRequired(false);

        builder.Entity<FriendRequest>()
            .HasOne(f => f.User)
            .WithMany()
            .HasForeignKey(f => f.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<FriendRequest>()
            .HasOne(f => f.UserFriend)
            .WithMany()
            .HasForeignKey(f => f.UserFriendId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<FriendRequest>()
            .HasIndex(f => new { f.UserId, f.UserFriendId })
            .IsUnique();
    }
    
    public override int SaveChanges()
    {
        foreach (var entry in ChangeTracker.Entries().Where(e => e.State == EntityState.Added && e.Properties.Any(p => p.Metadata.Name == "Id")))
        {
            entry.Property("Id").CurrentValue ??= Guid.NewGuid().ToString();
        }

        return base.SaveChanges();
    }

}