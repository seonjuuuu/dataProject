import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

const postCodeStyle = {
  display: 'block',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const Address = ({ onAddressChange }) => {
  const handleComplete = (data) => {
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      const fullAddress =
        extraAddress !== ''
          ? `${data.address} (${extraAddress})`
          : data.address;
      onAddressChange(fullAddress);
    }
  };

  return <DaumPostcode style={postCodeStyle} onComplete={handleComplete} />;
};

export default Address;
