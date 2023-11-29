import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import styled, { css } from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InfoForm = styled.form`
  width: 600px;
  padding: 12px 12px;
  label {
    font-weight: 700;
  }
`;

const FormBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputBoxGroup = styled.div`
  width: 500px;
  margin: 0 0 1rem 0;
  font-size: 18px;

  .form-input {
    display: flex;
    gap: 10px;
    &.date {
      gap: 3px;
    }
  }
  .error {
    margin: 5px 0 0 0;
    display: inline-block;
    color: red;
    font-size: 14px;
  }
`;

const sharedStyles = css`
  width: 100%;
  height: 38px;
  box-sizing: border-box;
  border: 1px solid #ced4da;
  border-radius: 3px;
  outline-color: rgb(222, 226, 230);
  outline-width: 3px;
`;

const InputBox = styled.input.attrs((props) => ({
  disabled: props.disabled,
}))`
  ${sharedStyles}
  ${(props) =>
    props.disabled &&
    css`
      background-color: #c6c9cb;
      cursor: not-allowed;
    `}
`;

const DateRagePicker = styled(DatePicker)`
  ${sharedStyles}
  width: 242px;
  font-size: 16px;
  padding-left: 10px;
`;

const SelectBox = styled.select`
  ${sharedStyles}
`;

const BasicForm = forwardRef(({ onValidation }, ref) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [item, setItem] = useState('selectItem');
  const [isDirectInput, setIsDirectInput] = useState(false);
  const [directItem, setDirectItem] = useState('');
  const [supply, setSupply] = useState('selectSupply');
  const [isDirectSupply, setIsDirectSupply] = useState(false);
  const [supplyNumber, setSupplyNumber] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [dateError, setDateError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [itemError, setItemError] = useState('');
  const [placeError, setPlaceError] = useState('');
  const [supplyError, setSupplyError] = useState('');
  const [isClickSubmit, setIsClickSubmit] = useState(false);

  const handleNameChange = (value) => {
    setName(value);
  };

  useEffect(() => {
    if (isClickSubmit) {
      handleNameError();
      handlePhoneError();
      handleDateError();
      handleItemError();
      handleSupplyError();
    }
  }, [name, phoneNumber, startDate, endDate, item, supply]);

  const handlePhoneNumberChange = (value) => {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(value)) {
      setPhoneNumber(value);
    }
  };

  useEffect(() => {
    const cleanedValue = phoneNumber.replace(/\D/g, '');
    let formattedValue = '';
    if (cleanedValue.length < 4) {
      formattedValue = cleanedValue;
    } else if (cleanedValue.length < 8) {
      formattedValue = `${cleanedValue.slice(0, 3)}-${cleanedValue.slice(3)}`;
    } else {
      formattedValue = `${cleanedValue.slice(0, 3)}-${cleanedValue.slice(
        3,
        7
      )}-${cleanedValue.slice(7)}`;
    }
    setPhoneNumber(formattedValue);
  }, [phoneNumber]);

  const handleItemChange = (value) => {
    setItem(value);
    setIsDirectInput(value === 'directInput');
  };

  const handleSupplyChange = (value) => {
    setSupply(value);
    setIsDirectSupply(value !== 'selectSupply');
  };

  const handleNameError = () => {
    if (!name) {
      setNameError('값을 입력해주세요.');
    } else {
      const nameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z\s]+$/;
      const isValidName = nameRegex.test(name);

      if (!isValidName) {
        setNameError('한글, 영어, 공백만 입력 가능합니다');
      } else {
        setNameError('');
      }
    }
  };

  const handlePhoneError = useCallback(() => {
    if (!phoneNumber) {
      setPhoneError('값을 입력해주세요');
    } else {
      const phoneNumberRegex = /^\d{3}-\d{4}-\d{4}$/;
      const isValidPhone = phoneNumberRegex.test(phoneNumber);
      if (!isValidPhone) {
        setPhoneError('알맞은 핸드폰 번호 형식을 입력해 주세요');
      } else {
        setPhoneError('');
      }
    }
  }, [phoneNumber]);

  const handleDateError = () => {
    if (!startDate || !endDate) {
      setDateError('값을 입력해 주세요');
    }

    if (startDate && endDate) {
      if (startDate > endDate) {
        setDateError('시작일은 종료일보다 늦을 수 없습니다');
      } else {
        setDateError('');
      }
    }
  };

  const handleItemError = () => {
    if (item === 'selectItem' || (item === 'directInput' && !directItem)) {
      setItemError('값을 입력해 주세요');
    } else {
      setItemError('');
    }
  };

  const handleSupplyError = () => {
    if (supply !== 'selectSupply' && !supplyNumber) {
      setSupplyError('값을 입력해 주세요');
    } else {
      setSupplyError('');
    }
  };

  const validate = () => {
    setIsClickSubmit(true);
    handleNameError();
    handlePhoneError();
    handleDateError();
    handleItemError();
    handleSupplyError();

    if (!workplace) {
      setPlaceError('값을 입력해 주세요');
    }

    const isValid = true; // 예시로 true를 반환했다고 가정

    if (onValidation) {
      onValidation(isValid);
    }

    return isValid;
  };

  useImperativeHandle(ref, () => ({
    validate,
  }));

  return (
    <InfoForm>
      <FormBox>
        <label>이름</label>
        <InputBoxGroup>
          <InputBox
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
          {nameError && <p className="error">{nameError}</p>}
        </InputBoxGroup>
      </FormBox>
      <FormBox>
        <label>휴대폰 번호</label>
        <InputBoxGroup>
          <InputBox
            value={phoneNumber}
            onChange={(e) => handlePhoneNumberChange(e.target.value)}
          />
          {phoneError && <p className="error">{phoneError}</p>}
        </InputBoxGroup>
      </FormBox>
      <FormBox>
        <label>날짜</label>
        <InputBoxGroup>
          <div className="form-input date">
            <DateRagePicker
              dateFormat="yyyy-MM-dd"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <span>~ </span>
            <DateRagePicker
              dateFormat="yyyy-MM-dd"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
          {dateError && <p className="error">{dateError}</p>}
        </InputBoxGroup>
      </FormBox>
      <FormBox>
        <label>품목</label>
        <InputBoxGroup>
          <div className="form-input">
            <SelectBox
              value={item}
              onChange={(e) => handleItemChange(e.target.value)}
            >
              <option value="selectItem">선택</option>
              <option value="refrigeratedGoods">냉장품</option>
              <option value="frozenProducts">냉동품</option>
              <option value="directInput">직접입력</option>
            </SelectBox>
            <InputBox
              disabled={!isDirectInput}
              value={directItem}
              onChange={(e) => setDirectItem(e.target.value)}
            />
          </div>
          {itemError && <p className="error">{itemError}</p>}
        </InputBoxGroup>
      </FormBox>
      <FormBox>
        <label>물량</label>
        <InputBoxGroup>
          <div className="form-input">
            <SelectBox
              value={supply}
              onChange={(e) => handleSupplyChange(e.target.value)}
            >
              <option value="selectSupply">선택</option>
              <option value="plt">PLT</option>
              <option value="box">BOX</option>
              <option value="ea">EA</option>
            </SelectBox>
            <InputBox
              disabled={!isDirectSupply}
              value={supplyNumber}
              onChange={(e) => setSupplyNumber(e.target.value)}
            />
          </div>
          {supplyError && <p className="error">{supplyError}</p>}
        </InputBoxGroup>
      </FormBox>
      <FormBox>
        <label>출근지</label>
        <InputBoxGroup>
          <InputBox
            value={workplace}
            onChange={(e) => setWorkplace(e.target.value)}
          />
          {placeError && <p className="error">{placeError}</p>}
        </InputBoxGroup>
      </FormBox>
    </InfoForm>
  );
});

export default BasicForm;
