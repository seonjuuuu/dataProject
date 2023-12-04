import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import styled from 'styled-components';
import CustomModal from '../components/CustomModal';
import { useOrder } from '../contexts/Order';
import axios from 'axios';

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { selectRowNum } = useOrder();

  const handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
  };

  const handleDeleteTableRow = () => {
    if (selectRowNum.length === 0) {
      return alert('선택된 테이블행이 없습니다.');
    } else {
      const deleteData = async () => {
        try {
          await axios.delete(`/order`);
          setModalIsOpen(true);
        } catch (err) {
          console.error(err);
        }
      };
      deleteData();
    }
  };

  return (
    <div>
      <DeleteButton onClick={handleDeleteTableRow}>삭제</DeleteButton>
      <CustomModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <p>삭제가 완료 되었습니다</p>
        <p>{JSON.stringify(selectRowNum)}</p>
      </CustomModal>
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
