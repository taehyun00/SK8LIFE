import styled from "@emotion/styled";
import Image from "next/image";
import location from "@/app/svg/location.svg";


type LocationProps = {
  onClick: () => void;
};



const Location = ( { onClick }: LocationProps) => {
  return (
    <BottomBarLayout onClick={onClick}>
       <Image src={location} alt="Sidebar Icon" width={20} height={20} />
    </BottomBarLayout>
  )

};

export default Location;


const BottomBarLayout = styled.div`
  max-width : 80px;
  width : 90%;
  height : 80px;
  background-color : white;
  border-radius : 20px;
  border : 1px solid #c4c4c4ff;
  z-index : 10;
  position : fixed;
  top : 80vh;
  left : 90%;
  display : flex;
  align-items : center;
  justify-content : center;
  gap:10%;
`   
