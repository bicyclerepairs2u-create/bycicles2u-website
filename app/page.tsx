import { BiLogoFacebookSquare } from 'react-icons/bi';
import { BiLogoGmail } from 'react-icons/bi';

export default function Home() {
  return (
    <div className="font-sans text-2xl min-h-screen flex flex-col justify-between p-8 pb-20 sm:p-20">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="font-bold text-6xl mb-20">Bicycles 2 u</div>
        <div className='mt-8'>Comming Soon.</div>
      </div>
      <div>
        <div className="text-center mb-4 text-xl text-gray-400">
          Website under construction
        </div>
        <div className="flex flex-row justify-center items-center gap-4 w-full">
          <a href="https://www.facebook.com/marketplace/profile/100015456158533/" target="_blank" rel="noopener noreferrer">
            <BiLogoFacebookSquare size={48} className="text-sky-500"/>
          </a>
          <a href="mailto:bicyclerepairs2u@gmail.com" target="_blank" rel="noopener noreferrer">
            <BiLogoGmail size={48} className="text-orange-600"/>
          </a>
        </div>
      </div>
    </div>
  );
}
