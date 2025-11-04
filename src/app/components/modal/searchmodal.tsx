import styled from "@emotion/styled";
import Image from "next/image";
import search from "@/app/svg/search.svg";
import { useState } from "react";
import { data } from "@/app/rollerskate_facilities";

type SearchModalProps = {
  setSelectedFacility: (facility: { lat: number; lng: number }) => void;
};

const SearchModal = ({ setSelectedFacility }: SearchModalProps) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <Searchmodallayout>
      <Title>검색</Title>
      <Searchlayout>
        <Input
          type="text"
          placeholder="검색어를 입력하세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Image
          src={search}
          alt="search"
          width={20}
          height={20}
          onClick={() => {
            console.log(inputValue);
          }}
        />
      </Searchlayout>

      <SearchResults>
        {data
          .filter((item) => item.FCLTY_NM.includes(inputValue))
          .map((filteredItem) => (
            <SearchResultItem
              key={filteredItem.RDNMADR_NM}
              onClick={() => {
                if (filteredItem.FCLTY_LA && filteredItem.FCLTY_LO) {
                    console.log("선택된 시설 좌표:", filteredItem.FCLTY_LA, filteredItem.FCLTY_LO);
                    setSelectedFacility({
                    lat: filteredItem.FCLTY_LA,
                    lng: filteredItem.FCLTY_LO,
                    });
                } else {
                    console.warn("좌표 정보가 없습니다:", filteredItem.FCLTY_NM);
                }
                }}
            >
              {filteredItem.FCLTY_NM}
            </SearchResultItem>
          ))}
      </SearchResults>
    </Searchmodallayout>
  );
};

export default SearchModal;


const Searchmodallayout = styled.div`
  max-width : 600px;
  width : 90%;
  height : 500px;
  background-color : white;
  border-radius : 20px;
  border : 1px solid #c4c4c4ff;
  z-index : 10;
  position : fixed;
  top : 20vh;
  display : flex;
  align-items : center;
  justify-content : center;
  flex-direction : column;
  gap : 20px;

  overflow-y : hidden;

`   

const Title = styled.p`
    font-size : 12px;
    font-weight : 400;
    color : black;
`

const Input = styled.input`
    width : 80%;
    height : 40px;
    border : 1px solid #c4c4c4ff;
    border-radius : 10px;
    padding : 10px;
    font-size : 14px;
    background-color : #ffffffff;
    color : black;

    ::placeholder {
        color : #434343;
        justify-content : center;
        align-items : center;
        font-size : 12px;
        text-align : center;
    }
    outline : none;
`   

const Searchlayout = styled.div`
    max-width : 100%;
    width : 90%;
    height : auto;
    justify-content : center;
    align-items : center;
    display : flex;
    flex-direction : row;
    gap : 10px;
`

const SearchResults = styled.div`
    width : 90%;
    height : 350px;
    border : 1px solid #c4c4c4ff;
    border-radius : 10px;
    overflow-y : scroll;
    padding : 10px;
`  

const SearchResultItem = styled.p`
    font-size : 12px;
    font-weight : 400;
    color : black;
`