import NoteCard from "@/components/notes/note-card";
import EditProfileForm from "@/components/user/edit-profile-form";
import { getNotesByUser } from "@/src/services/notes.service";
import { getProfile } from "@/src/services/user.service";
import Image from "next/image";

export default async function ProfilePage({ params }: {
    params: { user: string}
}) {

  const {user} = await params
  
  const userData = await getProfile(user)
  const postData = await getNotesByUser(user)

  const postIsLoading = false

  return (
    <>
      <div className="min-h-screen max-w-5xl w-full mx-auto my-5 px-5 xl:px-0 space-y-5">
          <>
            <div className="relative aspect-3/1  mb-25">
              <div
                className="absolute left-1/2 -translate-x-1/2
                    -bottom-16 flex flex-col items-center"
              >
                {userData.isOwner ? (
                  <Image
                    alt={`User profile image for ${userData.user.username}`}
                    src={userData.user.image || "/logo-placeholder.jpg"}
                    className="w-24 h-24 rounded-full border border-border "
                    width={500}
                    height={500}
                  />
                ) : (
                  <Image
                    alt={`User profile image for ${userData.user.username}`}
                    src={userData.user.image || "/logo-placeholder.jpg"}
                    className="w-24 h-24 rounded-full border border-border"
                    width={500}
                    height={500}
                  />
                )}
                <p className="text-center font-bold">
                  @{userData.user.username}
                </p>
              </div>

              {userData.isOwner ? (
                <Image
                  alt={`User banner image for ${userData.user.username}`}
                  src={userData.user.banner || "/banner-placeholder.jpg"}
                  width={1960}
                  height={1080}
                  className="w-full h-full rounded-xl object-cover bg-primary"
                />
              ) : (
                <Image
                  alt={`User banner image for ${userData.user.username}`}
                  src={userData.user.banner || "/banner-placeholder.jpg"}
                  width={1960}
                  height={1080}
                  className="w-full h-full rounded-xl object-cover bg-primary"
                />
              )}
            </div>

            <div className="flex  justify-between items-end">
              <p className="text-4xl font-bold">Notes</p>
              {userData.isOwner && (
                <div className="flex  gap-2">
                  
                    <EditProfileForm                   
                    user={userData.user}
                  />
                  {/*
                  <NewNoteForm open={open} setOpen={setOpen} />
                    */
                  }
                </div>
              )}
            </div>

            {postIsLoading ? (
              <p className="text-primary font-medium">Loading notes...</p>
            ) : (
              <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {postData.posts.map((post : any) => (
                  <NoteCard
                    post={post}
                    key={post._id}
                    canDelete={userData ? userData.isOwner : false}
                    canLike={false}
                  />
                ))}

                {postData.posts.length == 0 && (
                  <p className="text-muted-foreground">No notes found yet</p>
                )}
              </div>
            )}
          </>

      </div>
    </>
  );
}
