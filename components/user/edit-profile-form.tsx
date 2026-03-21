"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPenIcon } from "lucide-react";
import InputForm from "../ui/input-form";
import Loading from "../ui/loading";
import { useActionState, useEffect, useState } from "react";
import { editProfileAction } from "@/actions/user/edit-profile-action";
import { useRouter } from "next/navigation";


export default function EditProfileForm({user} : { user:any}) {

  const [ open, setOpen ] = useState(false)

  const editProfileWithUsername = editProfileAction.bind(null, user.username)

  const [state, dispatch, isPending] = useActionState(editProfileWithUsername, {
    errors: [],
    success: {
      message: "",
      username: user
    }
  })  

  const router = useRouter()

  useEffect(()=>{
    console.log(state?.errors)
    if(state.success.message) router.push(`/${state.success.username}`)
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={"cursor-pointer"} variant={"secondary"} size={"sm"}>
          <UserPenIcon />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <form action={dispatch} className="space-y-5">
          <DialogHeader>
            <DialogTitle>Edit your personal data</DialogTitle>
            <DialogDescription>
              Edit your data here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <InputForm
              label={"First name"}
              name={"firstName"}
              required     
              defaultValue={user.firstName}         
              placeholder={"Enter your name"}              
            />
            <InputForm
              label={"Last name"}
              name={"lastName"}
              required
              placeholder={"Enter the last name"}               
              defaultValue={user.lastName}
            />
            <InputForm
              label={"Username"}
              name={"username"}
              required
              placeholder={"Enter the username"}
              defaultValue={user.username}                 
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {isPending ? (
                <Loading
                  color="border-white"
                  className={"w-4! h-4! border-2!"}
                />
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
