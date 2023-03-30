using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Back_End_Service.Identity.Migrations
{
    /// <inheritdoc />
    public partial class v3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Friend",
                table: "Friend");

            migrationBuilder.RenameColumn(
                name: "FriendId",
                table: "Friend",
                newName: "UserFriendId");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Friend",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Friend",
                table: "Friend",
                columns: new[] { "UserId", "UserFriendId" });

            migrationBuilder.CreateIndex(
                name: "IX_Friend_UserFriendId",
                table: "Friend",
                column: "UserFriendId");

            migrationBuilder.AddForeignKey(
                name: "FK_Friend_AspNetUsers_UserFriendId",
                table: "Friend",
                column: "UserFriendId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Friend_AspNetUsers_UserId",
                table: "Friend",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Friend_AspNetUsers_UserFriendId",
                table: "Friend");

            migrationBuilder.DropForeignKey(
                name: "FK_Friend_AspNetUsers_UserId",
                table: "Friend");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Friend",
                table: "Friend");

            migrationBuilder.DropIndex(
                name: "IX_Friend_UserFriendId",
                table: "Friend");

            migrationBuilder.RenameColumn(
                name: "UserFriendId",
                table: "Friend",
                newName: "FriendId");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Friend",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Friend",
                table: "Friend",
                column: "FriendId");
        }
    }
}
