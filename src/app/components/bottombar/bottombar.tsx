import styled from "@emotion/styled";
import Image from "next/image";
import logo from "@/app/svg/logo.svg";
const Bottombar = () => {
  return (
    <SidebarLayout>
        <Image src={logo} alt="Logo" width={200} height={60} />
    </SidebarLayout>
  )

};

export default Bottombar;


const SidebarLayout = styled.div`
  width : 500px;
  height : 80px;
  background-color : white;
  border-radius : 20px;
  border : 1px solid #c4c4c4ff;
  z-index : 10;
  position : fixed;
  top : 80vh;
  display : flex;
  align-items : center;
  justify-content : center;
`   
