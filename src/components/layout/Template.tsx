import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"
import { ReactNode, useState } from "react";

interface TemplateProps {
  children: ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const [isHide, setIsHide] = useState('');

  const toggleSidebar = () => {
    setIsHide((prevIsHide) => (prevIsHide === 'hide' ? '' : 'hide'));
  };

  return (
    <>
      <Sidebar isHide={isHide}></Sidebar>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Header onToggleSidebar={toggleSidebar}></Header>
        <div className="body flex-grow-1 px-3">
          {children}
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}