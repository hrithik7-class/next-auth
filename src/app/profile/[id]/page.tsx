"use client"
export default function UserProfile({params}:any) {
    return(
        <div className="flex flex-col items-center  justify-center min-h-screen  py-2 ">
            <h1>
                Profile
            </h1>
            <hr/>
            <p className="text-3xl">This is user secure profile as you know..{params.id}</p>
            
        </div>
    )
}