interface ProfilePageProps {
  params: {
    username: string
  }
}

 const page=async({ params }: ProfilePageProps)=> {
  const { username } =await params

  return (
    <div>
      <h1>Profile: {username}</h1>
      {/* Your profile content */}
    </div>
  )
}

export default page