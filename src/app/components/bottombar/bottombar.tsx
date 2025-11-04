import styled from "@emotion/styled";
import Image from "next/image";
import logo from "@/app/svg/logo.svg";
import search from "@/app/svg/search.svg";
import chart from "@/app/svg/chart.svg";

type BottombarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Bottombar = ({open ,  setOpen} : BottombarProps ) => {
  return (
    <BottomBarLayout>
       <Image src={search} alt="Sidebar Icon" width={20} height={20} onClick={() => setOpen(!open)} />
        <Image src={logo} alt="Logo" width={200} height={60} />
        <Image src={chart} alt="Sidebar Icon" width={20} height={20} />
    </BottomBarLayout>
  )

};

export default Bottombar;


const BottomBarLayout = styled.div`
  max-width : 500px;
  width : 90%;
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
  gap:10%;
`   
