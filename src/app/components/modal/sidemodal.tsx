import styled from "@emotion/styled";


const SideModal = () => {
    return(
        <SidebarLayout>

        </SidebarLayout>
    );
}

export default SideModal;


const SidebarLayout = styled.div`
  max-width : 80px;
  width : 10%;
  height : 60vh;
  background-color : white;
  border-radius : 20px;
  border : 1px solid #c4c4c4ff;
  z-index : 10;
  position : fixed;
  top : 20vh;
  left : 5%;
  display : flex;
  align-items : center;
  justify-content : center;
` 