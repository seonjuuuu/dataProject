import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import styled from 'styled-components';
const DeleteButton = styled.button`
  display: block;
  color: white;
  background-color: #2c3e76;
  border: none;
  box-shadow: none;
  border-radius: 4px;
  padding: 8px 12px;
  overflow: visible;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: auto;
  margin-right: 10px;
`;

const SelectBox = styled.select`
  display: block;
  width: 100px;
  height: 25px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: 10px;
`;

const TableList = () => {
  const [pageSize, setPageSize] = useState(20);

  const handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    console.log(newPageSize);
    setPageSize(newPageSize);
  };
  return (
    <div>
      <DeleteButton>삭제</DeleteButton>
      <SelectBox value={pageSize} onChange={handlePageSizeChange}>
        <option value="20">20개보기</option>
        <option value="50">50개보기</option>
        <option value="100">100개보기</option>
      </SelectBox>
      <DataTable pageSize={pageSize} />
    </div>
  );
};

export default TableList;
