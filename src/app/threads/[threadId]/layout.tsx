export default function Layout({
  children,
  newCommentInput,
  comments,
}: {
  children: React.ReactNode
  newCommentInput: React.ReactNode
  comments: React.ReactNode
}) {
  return (
    <>
      {children}
      {newCommentInput}
      {comments}
    </>
  )
}
