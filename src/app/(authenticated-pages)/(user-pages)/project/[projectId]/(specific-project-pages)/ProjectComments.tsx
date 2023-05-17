import { Button } from "@/components/ui/Button"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"
import { T } from "@/components/ui/Typography"
import { useProjectContext } from "@/contexts/ProjectContext"
import { useAddProjectComment, useGetProjectComments } from "@/utils/react-queries/projects"
import { zodResolver } from "@hookform/resolvers/zod"
import { Edit, Play, PlayCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { BiConversation } from "react-icons/bi"
import { z } from "zod"

const addCommentSchema = z.object({
  text: z.string().min(1),
})

type AddCommentSchema = z.infer<typeof addCommentSchema>

const CommentInput = () => {
  const {
    projectId
  } = useProjectContext();
  const {
    mutate: addComment
  } = useAddProjectComment(projectId);

  const { handleSubmit, setValue, register } = useForm<AddCommentSchema>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      text: ''
    }
  })
  return <form onSubmit={handleSubmit((data) => {
    addComment({
      text: data.text,
    });
    setValue('text', '')
  })}>
    <div className="space-y-2">
      <Label htmlFor="text" className="space-x-2 flex items-center"> <Edit /> <span>New comment</span></Label>
      <Textarea id="text" placeholder="Add a comment" {...register('text')} />
      <div className="flex justify-end">
        <Button type="submit"><PlayCircle /></Button>
      </div>
    </div>

  </form>
}

const CommentsList = () => {
  const {
    projectId
  } = useProjectContext();
  const {
    data: comments,
    isLoading
  } = useGetProjectComments(projectId)
  if (isLoading || !comments) return <div className="space-y-2">
    <T.Subtle>Loading comments...</T.Subtle>
  </div>

  if (comments.length === 0) return <div className="space-y-2">
    <T.Subtle>No comments yet</T.Subtle>
  </div>

  return <div className="space-y-4">
    <div className="flex space-x-2 items-center">
      <BiConversation /> <T.Subtle>All Comments </T.Subtle>
    </div>
    {comments.map(comment => <div key={comment.id} className="space-y-2">
      <T.P>{comment.text}</T.P>
    </div>)}
  </div>
}

export const ProjectComments = () => {
  return <div className="space-y-4">
    <T.H4>Comments</T.H4>
    <div className="space-y-2">
      <CommentInput />
      <CommentsList />
    </div>
  </div>
}
