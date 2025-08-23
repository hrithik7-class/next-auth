// import Image from "next/image";

import { Toaster } from "react-hot-toast";
import ProfilePage from "./profile/page";


export default function Home() {
  return (
    <div className="min-h-screen text-white bg-gray-900 relative overflow-hidden">
      <div className='absolute inset-0 overflow-hidden '>
          <ProfilePage/>
      </div>
      <Toaster/>
    </div>
  );
}
