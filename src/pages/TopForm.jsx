import React, { useRef, useState } from 'react';
import PlaceInfo from '../components/PlaceInfo';
import BasicForm from '../components/BasicForm';
import styled from 'styled-components';

const TopBox = styled.div`
  display: flex;
  align-items: flex-start;
`;

const AddPlaceButton = styled.button`
  margin: 12px;
  height: 311px;
  width: 350px;
  border: 1px solid #ced4da;
  color: #2c3e76;
  font-size: 40px;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
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
  margin-left: 10px;
`;

const TopForm = () => {
  const basicFormRef = useRef();
  const placeInfoRefs = useRef({});
  const [placeInfoIds, setPlaceInfoIds] = useState([{ id: Date.now() }]);

  const addPlaceInfo = () => {
    const newPlaceInfoIds = [
      ...placeInfoIds,
      { id: Date.now() + placeInfoIds.length + 1 },
    ];
    setPlaceInfoIds(newPlaceInfoIds);
  };

  const handleRegistration = () => {
    const isBasicFormValid =
      basicFormRef.current && basicFormRef.current.validate();
    const isPlaceInfoValid = Object.values(placeInfoRefs.current)
      .filter((ref) => ref)
      .every((ref) => ref && ref.validate());

    if (isBasicFormValid && isPlaceInfoValid) {
      console.log('등록버튼 눌림');
    } else {
      console.log('유효성검사실패 ');
    }
  };

  const handleValidation = (isValid) => {
    console.log('유효성 검사 결과:', isValid);
  };

  const handlePlaceInfoValidation = (isValid, id) => {
    console.log(`PlaceInfo ${id} 유효성 검사 결과:`, isValid);
  };

  const handleDeletePlaceInfo = (idToDelete) => {
    delete placeInfoRefs.current[idToDelete];
    const newPlaceInfoIds = placeInfoIds.filter((id) => id.id !== idToDelete);
    setPlaceInfoIds(newPlaceInfoIds);
  };

  return (
    <>
      <TopBox>
        <BasicForm ref={basicFormRef} onValidation={handleValidation} />
        {placeInfoIds.map((id, index) => (
          <PlaceInfo
            key={id.id}
            ref={(ref) => (placeInfoRefs.current[id.id] = ref)}
            onValidation={(isValid) =>
              handlePlaceInfoValidation(isValid, id.id)
            }
            onDelete={() => handleDeletePlaceInfo(id.id)}
            id={index + 1}
          />
        ))}
        {placeInfoIds.length < 3 && (
          <AddPlaceButton onClick={addPlaceInfo}>+</AddPlaceButton>
        )}
      </TopBox>
      <SubmitButton onClick={handleRegistration}>등록</SubmitButton>
    </>
  );
};

export default TopForm;
